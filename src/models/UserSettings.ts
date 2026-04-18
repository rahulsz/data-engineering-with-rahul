import mongoose from "mongoose";

export interface IUserSettings {
  userId: string;
  firstName: string;
  lastName: string;
  bio: string;
  githubHandle: string;
  portfolioUrl: string;
}

const UserSettingsSchema = new mongoose.Schema<IUserSettings>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    githubHandle: {
      type: String,
      default: "",
    },
    portfolioUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const UserSettings =
  mongoose.models.UserSettings ||
  mongoose.model<IUserSettings>("UserSettings", UserSettingsSchema);
