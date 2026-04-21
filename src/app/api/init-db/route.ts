import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import { UserProfile } from "@/models/UserProfile";
import { UserProgress } from "@/models/UserProgress";
import { ActivityLog } from "@/models/ActivityLog";
import { Achievement } from "@/models/Achievement";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    const dbName = conn.connection.db?.databaseName ?? "unknown";

    // Ensure indexes are created — this forces MongoDB to create the
    // database and collections if they don't exist yet.
    await UserProfile.createIndexes();
    await UserProgress.createIndexes();
    await ActivityLog.createIndexes();
    await Achievement.createIndexes();

    // Grab collection names to confirm everything is in place
    const collections = await conn.connection.db?.listCollections().toArray();
    const collectionNames = collections?.map((c: { name: string }) => c.name) ?? [];

    return NextResponse.json({
      success: true,
      database: dbName,
      collections: collectionNames,
      message: `Database "${dbName}" initialized with ${collectionNames.length} collections.`,
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("❌ Database init error:", msg);
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}
