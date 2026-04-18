import mongoose, { Document, Model, Schema } from "mongoose";

export interface IUserProgress extends Document {
  userId: string;
  completedWeeks: number[];
  lastActiveStamp: Date;
  badges: string[];
}

const UserProgressSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  completedWeeks: {
    type: [Number],
    default: [],
  },
  lastActiveStamp: {
    type: Date,
    default: Date.now,
  },
  badges: {
    type: [String],
    default: [],
  },
}, { timestamps: true });

export const UserProgress: Model<IUserProgress> = mongoose.models?.UserProgress || mongoose.model<IUserProgress>("UserProgress", UserProgressSchema);
