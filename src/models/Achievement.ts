import mongoose, { Document, Schema } from "mongoose";

// ─────────────────────────────────────────────────────────
// Achievement — Gamification badges & milestones
// ─────────────────────────────────────────────────────────

export interface IAchievement extends Document {
  userId: string;
  slug: string;            // unique identifier for the achievement, e.g. "first_blood"
  title: string;           // display name
  description: string;     // how it's earned
  icon: string;            // emoji or icon key
  category: "progress" | "streak" | "quiz" | "speed" | "completion" | "bonus";
  earnedAt: Date | null;   // null = not yet earned (locked)
  xpReward: number;        // XP granted when earned
  createdAt: Date;
  updatedAt: Date;
}

const AchievementSchema = new Schema<IAchievement>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "🏆",
    },
    category: {
      type: String,
      enum: ["progress", "streak", "quiz", "speed", "completion", "bonus"],
      default: "progress",
    },
    earnedAt: {
      type: Date,
      default: null,
    },
    xpReward: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: true }
);

// Each user can only have one of each achievement
AchievementSchema.index({ userId: 1, slug: 1 }, { unique: true });

// ── Default achievements to seed for new users ──
export const DEFAULT_ACHIEVEMENTS = [
  { slug: "first_blood",    title: "First Blood",    description: "Completed first module",       icon: "🏆", category: "progress",   xpReward: 100 },
  { slug: "hot_streak",     title: "Hot Streak",     description: "7-day login streak",           icon: "🔥", category: "streak",     xpReward: 200 },
  { slug: "speed_demon",    title: "Speed Demon",    description: "Finish quiz under 5 min",      icon: "⚡", category: "speed",      xpReward: 150 },
  { slug: "sharpshooter",   title: "Sharpshooter",   description: "100% on any quiz",             icon: "🎯", category: "quiz",       xpReward: 250 },
  { slug: "deep_thinker",   title: "Deep Thinker",   description: "Complete all bonus tasks",     icon: "🧠", category: "bonus",      xpReward: 300 },
  { slug: "diamond_hands",  title: "Diamond Hands",  description: "Finish all 14 weeks",          icon: "💎", category: "completion", xpReward: 500 },
  { slug: "phase_clear_1",  title: "Phase 1 Clear",  description: "Complete DE Foundations",       icon: "🎖️", category: "completion", xpReward: 300 },
  { slug: "phase_clear_2",  title: "Phase 2 Clear",  description: "Complete Advanced Engineering", icon: "🎖️", category: "completion", xpReward: 300 },
  { slug: "phase_clear_3",  title: "Phase 3 Clear",  description: "Complete Data Analytics",       icon: "🎖️", category: "completion", xpReward: 300 },
  { slug: "night_owl",      title: "Night Owl",      description: "Study after midnight",          icon: "🦉", category: "bonus",      xpReward: 50 },
] as const;

export const Achievement =
  mongoose.models.Achievement ||
  mongoose.model<IAchievement>("Achievement", AchievementSchema);
