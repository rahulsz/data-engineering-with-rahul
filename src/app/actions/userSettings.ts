"use server";

import { auth } from "@clerk/nextjs/server";
import { connectToDatabase } from "@/lib/mongoose";
import { UserProfile } from "@/models/UserProfile";
import { revalidatePath } from "next/cache";

export async function getUserSettings() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await connectToDatabase();

    // Find the profile doc
    let settings = await UserProfile.findOne({ userId }).lean();
    
    if (!settings) {
      // If none exists, return empty string defaults
      // The frontend will merge this with Clerk's standard info
      settings = {
        firstName: "",
        lastName: "",
        bio: "",
        githubHandle: "",
        portfolioUrl: "",
        linkedinUrl: "",
        discordHandle: "",
        accessTier: "free",
        preferredTheme: "dark",
        emailNotifications: true,
        weeklyDigest: true,
      };
    }

    // Stringify/parse to ensure the lean document is a plain object safe for client components
    return { success: true, data: JSON.parse(JSON.stringify(settings)) };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("getUserSettings error:", msg);
    return { success: false, error: msg };
  }
}

export async function updateUserSettings(formData: {
  firstName: string;
  lastName: string;
  bio: string;
  githubHandle: string;
  portfolioUrl: string;
  linkedinUrl?: string;
  discordHandle?: string;
}) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    await connectToDatabase();

    await UserProfile.findOneAndUpdate(
      { userId },
      { 
        $set: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          bio: formData.bio,
          githubHandle: formData.githubHandle,
          portfolioUrl: formData.portfolioUrl,
          linkedinUrl: formData.linkedinUrl ?? "",
          discordHandle: formData.discordHandle ?? "",
        }
      },
      { upsert: true, returnDocument: "after" }
    );

    revalidatePath("/dashboard/settings");
    return { success: true };
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("updateUserSettings error:", msg);
    return { success: false, error: msg };
  }
}
