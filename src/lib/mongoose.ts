import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env.local");
}

let cached = (global as unknown as { mongoose: any }).mongoose;

if (!cached) {
  cached = (global as unknown as { mongoose: any }).mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      dbName: "data_engineering",
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      const dbName = mongoose.connection.db?.databaseName ?? "unknown";
      console.log(`🔥 Successfully connected to MongoDB Atlas — database: "${dbName}"`);
      return mongoose;
    }).catch((e) => {
      console.error("❌ MongoDB connection error:", e.message);
      throw e;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

