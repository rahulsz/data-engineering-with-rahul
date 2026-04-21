"use server";

import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongoose";
import { UserProgress } from "@/models/UserProgress";
import { ActivityLog } from "@/models/ActivityLog";
import { Achievement, DEFAULT_ACHIEVEMENTS } from "@/models/Achievement";

/**
 * Helper: get today's ISO date string
 */
function todayISO(): string {
  return new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"
}

/**
 * Helper: get current ISO week string like "2026-W16"
 */
function currentWeekKey(): string {
  const now = new Date();
  const oneJan = new Date(now.getFullYear(), 0, 1);
  const weekNum = Math.ceil(
    ((now.getTime() - oneJan.getTime()) / 86400000 + oneJan.getDay() + 1) / 7
  );
  return `${now.getFullYear()}-W${weekNum.toString().padStart(2, "0")}`;
}

/**
 * Seed default achievements for a new user (if they don't exist yet)
 */
async function seedAchievements(userId: string) {
  const existing = await Achievement.countDocuments({ userId });
  if (existing === 0) {
    const docs = DEFAULT_ACHIEVEMENTS.map((a) => ({
      userId,
      slug: a.slug,
      title: a.title,
      description: a.description,
      icon: a.icon,
      category: a.category,
      xpReward: a.xpReward,
      earnedAt: null,
    }));
    await Achievement.insertMany(docs, { ordered: false }).catch(() => {
      // ignore duplicate key errors in race conditions
    });
  }
}

/**
 * Fetch the user's full progress record + achievements
 */
export async function fetchUserProgress() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await connectToDatabase();

    let progress = await UserProgress.findOne({ userId }).lean();

    if (!progress) {
      // First login — create empty progress record
      const newUser = await UserProgress.create({ userId, completedWeeks: [] });
      progress = newUser.toObject();

      // Seed achievements for new user
      await seedAchievements(userId);

      // Log first login activity
      await ActivityLog.create({
        userId,
        type: "login",
        title: "First Login — Welcome!",
        date: todayISO(),
        metadata: { firstLogin: true },
      });
    }

    // Also fetch achievements
    const achievements = await Achievement.find({ userId }).lean();

    return {
      success: true,
      completedWeeks: progress.completedWeeks ?? [],
      xpTotal: progress.xpTotal ?? 0,
      currentStreak: progress.currentStreak ?? 0,
      longestStreak: progress.longestStreak ?? 0,
      totalStudyMinutes: progress.totalStudyMinutes ?? 0,
      skills: progress.skills ?? [],
      phaseCompletion: progress.phaseCompletion ?? {},
      achievements: JSON.parse(JSON.stringify(achievements)),
    };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("fetchUserProgress error:", msg);
    return { success: false, error: msg };
  }
}

/**
 * Sync completed weeks + update streak/XP/study time
 */
export async function syncUserProgress(completedWeeks: number[]) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await connectToDatabase();

    const today = todayISO();
    const weekKey = currentWeekKey();

    // Get current progress to calculate streak
    const current = await UserProgress.findOne({ userId });
    let newStreak = 1;
    let longestStreak = current?.longestStreak ?? 0;

    if (current?.lastActiveDate) {
      const lastDate = new Date(current.lastActiveDate);
      const todayDate = new Date(today);
      const diffDays = Math.floor(
        (todayDate.getTime() - lastDate.getTime()) / 86400000
      );

      if (diffDays === 0) {
        newStreak = current.currentStreak; // same day
      } else if (diffDays === 1) {
        newStreak = current.currentStreak + 1; // consecutive
      }
      // else: streak resets to 1
    }

    longestStreak = Math.max(longestStreak, newStreak);

    // Calculate XP: 100 XP per completed week
    const xpTotal = completedWeeks.length * 100;

    await UserProgress.findOneAndUpdate(
      { userId },
      {
        $set: {
          completedWeeks,
          lastActiveDate: today,
          currentStreak: newStreak,
          longestStreak,
          xpTotal,
        },
        $inc: {
          [`weeklyStudyMinutes.${weekKey}`]: 0, // ensure key exists
        },
      },
      { upsert: true, returnDocument: "after" }
    );

    return { success: true };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("syncUserProgress error:", msg);
    return { success: false, error: msg };
  }
}

/**
 * Log a study session (called when user finishes reading a lesson)
 */
export async function logStudySession(minutes: number, lessonTitle: string) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await connectToDatabase();

    const today = todayISO();
    const weekKey = currentWeekKey();

    // Update cumulative study time
    await UserProgress.findOneAndUpdate(
      { userId },
      {
        $inc: {
          totalStudyMinutes: minutes,
          [`weeklyStudyMinutes.${weekKey}`]: minutes,
        },
        $set: { lastActiveDate: today },
      },
      { upsert: true }
    );

    // Log activity
    await ActivityLog.create({
      userId,
      type: "study_session",
      title: `Study Session: ${lessonTitle}`,
      date: today,
      metadata: { minutes, lessonTitle },
    });

    return { success: true };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("logStudySession error:", msg);
    return { success: false, error: msg };
  }
}

/**
 * Fetch recent activity for the event log
 */
export async function fetchRecentActivity(limit = 10) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await connectToDatabase();

    const activities = await ActivityLog.find({ userId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return { success: true, activities: JSON.parse(JSON.stringify(activities)) };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("fetchRecentActivity error:", msg);
    return { success: false, error: msg };
  }
}

/**
 * Fetch activity heatmap data (last N days)
 */
export async function fetchActivityHeatmap(days = 28) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await connectToDatabase();

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startISO = startDate.toISOString().split("T")[0];

    const pipeline = [
      { $match: { userId, date: { $gte: startISO } } },
      { $group: { _id: "$date", count: { $sum: 1 } } },
      { $sort: { _id: 1 as const } },
    ];

    const results = await ActivityLog.aggregate(pipeline);
    const heatmap: Record<string, number> = {};
    for (const r of results) {
      heatmap[r._id] = r.count;
    }

    return { success: true, heatmap };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("fetchActivityHeatmap error:", msg);
    return { success: false, error: msg };
  }
}

/**
 * Log a daily login — idempotent (only one login event per day).
 * Called from ProgressHydrator on every session start so the heatmap
 * lights up based on real daily visits.
 */
export async function logDailyLogin() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await connectToDatabase();

    const today = todayISO();

    // Check if we already logged a login today
    const existingLogin = await ActivityLog.findOne({
      userId,
      type: "login",
      date: today,
    });

    if (existingLogin) {
      return { success: true, alreadyLogged: true };
    }

    // Log the daily login
    await ActivityLog.create({
      userId,
      type: "login",
      title: "Daily Login",
      date: today,
      metadata: { timestamp: new Date().toISOString() },
    });

    // Update streak
    const current = await UserProgress.findOne({ userId });
    let newStreak = 1;
    let longestStreak = current?.longestStreak ?? 0;

    if (current?.lastActiveDate) {
      const lastDate = new Date(current.lastActiveDate);
      const todayDate = new Date(today);
      const diffDays = Math.floor(
        (todayDate.getTime() - lastDate.getTime()) / 86400000
      );

      if (diffDays === 0) {
        newStreak = current.currentStreak;
      } else if (diffDays === 1) {
        newStreak = current.currentStreak + 1;
      }
    }

    longestStreak = Math.max(longestStreak, newStreak);

    await UserProgress.findOneAndUpdate(
      { userId },
      {
        $set: {
          lastActiveDate: today,
          currentStreak: newStreak,
          longestStreak,
        },
      },
      { upsert: true }
    );

    return { success: true, alreadyLogged: false, currentStreak: newStreak };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("logDailyLogin error:", msg);
    return { success: false, error: msg };
  }
}
