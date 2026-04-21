import mongoose, { Document, Schema } from "mongoose";

// ─────────────────────────────────────────────────────────
// ActivityLog — Powers the event log, activity heatmap,
// and study time analytics on the dashboard
// ─────────────────────────────────────────────────────────

export type ActivityType =
  | "lesson_complete"
  | "quiz_passed"
  | "quiz_failed"
  | "module_unlocked"
  | "badge_earned"
  | "streak_milestone"
  | "login"
  | "study_session";

export interface IActivityLog extends Document {
  userId: string;
  type: ActivityType;
  title: string;              // human-readable label, e.g. "Lesson Complete: SQL Fundamentals"
  metadata: Record<string, unknown>;  // flexible payload (weekNumber, quizScore, badgeId, etc.)
  date: string;               // ISO date "YYYY-MM-DD" — for heatmap aggregation
  createdAt: Date;
  updatedAt: Date;
}

const ActivityLogSchema = new Schema<IActivityLog>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        "lesson_complete",
        "quiz_passed",
        "quiz_failed",
        "module_unlocked",
        "badge_earned",
        "streak_milestone",
        "login",
        "study_session",
      ],
    },
    title: {
      type: String,
      required: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
    date: {
      type: String,
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Compound index for fetching user's recent activity efficiently
ActivityLogSchema.index({ userId: 1, createdAt: -1 });
// Compound index for heatmap queries (activity count per date)
ActivityLogSchema.index({ userId: 1, date: 1 });

export const ActivityLog =
  mongoose.models.ActivityLog ||
  mongoose.model<IActivityLog>("ActivityLog", ActivityLogSchema);
