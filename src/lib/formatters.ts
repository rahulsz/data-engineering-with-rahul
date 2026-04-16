export function formatWeekLabel(week: number): string {
  return `Week ${week.toString().padStart(2, "0")}`
}

export function formatPhaseLabel(slug: string): string {
  if (!slug.includes("-")) return slug;
  const parts = slug.split("-");
  const phaseWord = parts[0];
  const phaseNum = parts[1];
  const rest = parts.slice(2).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  
  return `${phaseWord.charAt(0).toUpperCase() + phaseWord.slice(1)} ${phaseNum} \u00B7 ${rest}`
}

export function formatReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).length;
  const time = Math.max(1, Math.ceil(words / 200));
  return `~${time} min read`;
}
