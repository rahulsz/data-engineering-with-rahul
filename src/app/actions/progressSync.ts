"use server";

import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongoose";
import { UserProgress } from "@/models/UserProgress";

export async function fetchUserProgress() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await connectToDatabase();

    const progress = await UserProgress.findOne({ userId }).lean();
    
    if (!progress) {
      // Create an empty progress record if they log in for the first time
      const newUser = await UserProgress.create({ userId, completedWeeks: [] });
      return { success: true, completedWeeks: newUser.completedWeeks };
    }

    return { success: true, completedWeeks: progress.completedWeeks };
  } catch (error: any) {
    console.error("fetchUserProgress error:", error);
    return { success: false, error: error.message };
  }
}

export async function syncUserProgress(completedWeeks: number[]) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await connectToDatabase();

    await UserProgress.findOneAndUpdate(
      { userId },
      { 
        $set: { 
          completedWeeks,
          lastActiveStamp: new Date(),
        } 
      },
      { upsert: true, returnDocument: 'after' }
    );

    return { success: true };
  } catch (error: any) {
    console.error("syncUserProgress error:", error);
    return { success: false, error: error.message };
  }
}
