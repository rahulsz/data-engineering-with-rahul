// ─────────────────────────────────────────────────────────
// Model barrel export — import all models from here
// ─────────────────────────────────────────────────────────
export { UserProfile } from "./UserProfile";
export type { IUserProfile } from "./UserProfile";

export { UserProgress } from "./UserProgress";
export type { IUserProgress, ILessonProgress, ISkillProficiency } from "./UserProgress";

export { ActivityLog } from "./ActivityLog";
export type { IActivityLog, ActivityType } from "./ActivityLog";

export { Achievement, DEFAULT_ACHIEVEMENTS } from "./Achievement";
export type { IAchievement } from "./Achievement";

// Legacy re-export for backwards compatibility
export { UserProfile as UserSettings } from "./UserProfile";
