import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { format } from "date-fns";
import { formatReadingTime } from "@/lib/formatters";

export type NoteData = {
  title: string;
  description: string;
  weekNumber: number;
  phase: string;
  tags: string[];
  estimatedMinutes: number;
  lastUpdated: string;
  readingTime: string;
  content: string;
  href: string;
};

export type SearchableNote = Pick<NoteData, "title" | "description" | "tags" | "href" | "weekNumber">;

export async function getAllSlugs(): Promise<{ phase: string; week: string }[]> {
  const contentDir = path.join(process.cwd(), "content");
  if (!fs.existsSync(contentDir)) return [];

  const phases = fs.readdirSync(contentDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  const slugs: { phase: string; week: string }[] = [];

  for (const phase of phases) {
    const phaseDir = path.join(contentDir, phase);
    const files = fs.readdirSync(phaseDir).filter(file => file.endsWith(".mdx"));
    
    for (const file of files) {
      slugs.push({
        phase,
        week: file.replace(/\.mdx$/, "")
      });
    }
  }

  return slugs;
}

export async function getNoteBySlug(phase: string, week: string): Promise<NoteData> {
  const fullPath = path.join(process.cwd(), "content", phase, `${week}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  
  const { data, content } = matter(fileContents);
  const readingTime = formatReadingTime(content);

  let lastUpdated = "";
  if (data.lastUpdated) {
    try {
      lastUpdated = format(new Date(data.lastUpdated), "MMMM d, yyyy");
    } catch {
      lastUpdated = String(data.lastUpdated);
    }
  }

  return {
    title: data.title || "",
    description: data.description || "",
    weekNumber: data.weekNumber ?? parseInt(week.split("-")[1] || "0", 10),
    phase: data.phase || phase,
    tags: data.tags || [],
    estimatedMinutes: data.estimatedMinutes || 0,
    lastUpdated,
    readingTime,
    content,
    href: `/curriculum/${phase}/${week}`
  };
}

export async function getAllNotesForSearch(): Promise<SearchableNote[]> {
  const slugs = await getAllSlugs();
  const notesPromises = slugs.map(slug => getNoteBySlug(slug.phase, slug.week));
  const fullNotes = await Promise.all(notesPromises);

  const searchableNotes: SearchableNote[] = fullNotes.map(note => ({
    title: note.title,
    description: note.description,
    tags: note.tags,
    href: note.href,
    weekNumber: note.weekNumber
  }));

  return searchableNotes.sort((a, b) => a.weekNumber - b.weekNumber);
}
