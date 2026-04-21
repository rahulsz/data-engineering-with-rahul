import mongoose, { Document, Schema } from "mongoose";

// ─────────────────────────────────────────────────────────
// UserProgress — Granular curriculum progress tracking
// Tracks per-week AND per-lesson completion, skills, XP, streaks
// ─────────────────────────────────────────────────────────

/* ── Embedded sub-document: individual lesson completion ── */
export interface ILessonProgress {
  phase: string;          // e.g. "foundations"
  weekSlug: string;       // e.g. "week-1"
  weekNumber: number;     // e.g. 1
  completedAt: Date;
  timeSpentMinutes: number;
}

const LessonProgressSchema = new Schema<ILessonProgress>(
  {
    phase:              { type: String, required: true },
    weekSlug:           { type: String, required: true },
    weekNumber:         { type: Number, required: true },
    completedAt:        { type: Date,   default: Date.now },
    timeSpentMinutes:   { type: Number, default: 0 },
  },
  { _id: false }
);

/* ── Embedded sub-document: skill proficiency ── */
export interface ISkillProficiency {
  skillName: string;       // e.g. "SQL & Databases"
  percentage: number;      // 0–100
  color: string;           // hex color for UI
}

const SkillProficiencySchema = new Schema<ISkillProficiency>(
  {
    skillName:  { type: String, required: true },
    percentage: { type: Number, default: 0, min: 0, max: 100 },
    color:      { type: String, default: "#38bdf8" },
  },
  { _id: false }
);

/* ── Main UserProgress document ── */
export interface IUserProgress extends Document {
  userId: string;

  /* ── Week-level tracking (legacy-compatible) ── */
  completedWeeks: number[];

  /* ── Granular lesson tracking ── */
  lessons: ILessonProgress[];

  /* ── Phase completion percentages ── */
  phaseCompletion: Map<string, number>;   // e.g. { "orientation": 100, "foundations": 35 }

  /* ── Gamification ── */
  xpTotal: number;
  currentStreak: number;        // consecutive days active
  longestStreak: number;
  lastActiveDate: string;       // ISO date string "YYYY-MM-DD"

  /* ── Study hours tracking ── */
  totalStudyMinutes: number;
  weeklyStudyMinutes: Map<string, number>;  // e.g. { "2026-W16": 480 }

  /* ── Skills ── */
  skills: ISkillProficiency[];

  /* ── Timestamps (auto) ── */
  createdAt: Date;
  updatedAt: Date;
}

const UserProgressSchema = new Schema<IUserProgress>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    // Week-level (backwards compatible)
    completedWeeks: {
      type: [Number],
      default: [],
    },

    // Granular lessons
    lessons: {
      type: [LessonProgressSchema],
      default: [],
    },

    // Phase completion %
    phaseCompletion: {
      type: Map,
      of: Number,
      default: {},
    },

    // Gamification
    xpTotal:        { type: Number, default: 0 },
    currentStreak:  { type: Number, default: 0 },
    longestStreak:  { type: Number, default: 0 },
    lastActiveDate: { type: String, default: "" },

    // Study time
    totalStudyMinutes: { type: Number, default: 0 },
    weeklyStudyMinutes: {
      type: Map,
      of: Number,
      default: {},
    },

    // Skills
    skills: {
      type: [SkillProficiencySchema],
      default: [
        { skillName: "SQL & Databases",    percentage: 0, color: "#38bdf8" },
        { skillName: "Python Engineering",  percentage: 0, color: "#F97316" },
        { skillName: "Data Modeling",       percentage: 0, color: "#22c55e" },
        { skillName: "Cloud & DevOps",      percentage: 0, color: "#A855F7" },
        { skillName: "Analytics & BI",      percentage: 0, color: "#F59E0B" },
      ],
    },
  },
  { timestamps: true }
);

export const UserProgress =
  mongoose.models.UserProgress ||
  mongoose.model<IUserProgress>("UserProgress", UserProgressSchema);
