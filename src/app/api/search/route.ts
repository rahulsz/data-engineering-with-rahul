import { NextResponse } from "next/server";
import { getAllNotesForSearch } from "@/data/mdx-utils";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const notes = await getAllNotesForSearch();
    const response = NextResponse.json(notes);
    response.headers.set("Cache-Control", "no-store, max-age=0");
    return response;
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
