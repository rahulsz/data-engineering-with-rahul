import mongoose, { Document, Schema } from "mongoose";

// ─────────────────────────────────────────────────────────
// UserProfile — Extended user identity & preferences
// (replaces the old UserSettings model)
// ─────────────────────────────────────────────────────────

export interface IUserProfile extends Document {
  userId: string;               // Clerk user ID (unique key)

  /* ── Identity ── */
  firstName: string;
  lastName: string;
  bio: string;
  avatarUrl: string;

  /* ── Social ── */
  githubHandle: string;
  portfolioUrl: string;
  linkedinUrl: string;
  discordHandle: string;

  /* ── Subscription ── */
  accessTier: "free" | "pro" | "enterprise";
  accessExpiresAt: Date | null;

  /* ── Preferences ── */
  preferredTheme: "dark" | "light" | "system";
  emailNotifications: boolean;
  weeklyDigest: boolean;

  /* ── Timestamps (auto) ── */
  createdAt: Date;
  updatedAt: Date;
}

const UserProfileSchema = new Schema<IUserProfile>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    // Identity
    firstName:    { type: String, default: "" },
    lastName:     { type: String, default: "" },
    bio:          { type: String, default: "", maxlength: 500 },
    avatarUrl:    { type: String, default: "" },

    // Social
    githubHandle:  { type: String, default: "" },
    portfolioUrl:  { type: String, default: "" },
    linkedinUrl:   { type: String, default: "" },
    discordHandle: { type: String, default: "" },

    // Subscription
    accessTier: {
      type: String,
      enum: ["free", "pro", "enterprise"],
      default: "free",
    },
    accessExpiresAt: { type: Date, default: null },

    // Preferences
    preferredTheme: {
      type: String,
      enum: ["dark", "light", "system"],
      default: "dark",
    },
    emailNotifications: { type: Boolean, default: true },
    weeklyDigest:       { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const UserProfile =
  mongoose.models.UserProfile ||
  mongoose.model<IUserProfile>("UserProfile", UserProfileSchema);
