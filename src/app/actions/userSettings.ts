"use server";

import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongoose";
import { UserSettings } from "@/models/UserSettings";
import { revalidatePath } from "next/cache";

export async function getUserSettings() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await connectToDatabase();

    // Find the settings doc
    let settings = await UserSettings.findOne({ userId }).lean();
    
    if (!settings) {
      // If none exists, we just return empty string defaults
      // The frontend will merge this with Clerk's standard info
      settings = {
        firstName: "",
        lastName: "",
        bio: "",
        githubHandle: "",
        portfolioUrl: ""
      };
    }

    // We stringify/parse to ensure the lean document is a plain object safe for client components
    return { success: true, data: JSON.parse(JSON.stringify(settings)) };
  } catch (error: any) {
    console.error("getUserSettings error:", error);
    return { success: false, error: error.message };
  }
}

export async function updateUserSettings(formData: {
  firstName: string;
  lastName: string;
  bio: string;
  githubHandle: string;
  portfolioUrl: string;
}) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await connectToDatabase();

    await UserSettings.findOneAndUpdate(
      { userId },
      { 
        $set: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          bio: formData.bio,
          githubHandle: formData.githubHandle,
          portfolioUrl: formData.portfolioUrl,
        }
      },
      { upsert: true, returnDocument: "after" }
    );

    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (error: any) {
    console.error("updateUserSettings error:", error);
    return { success: false, error: error.message };
  }
}
