"use client";

import { useEffect } from "react";
import { useSidebarStore, Heading } from "@/store/sidebarStore";

export default function SidebarHydrator({ headings }: { headings: Heading[] }) {
  const setHeadings = useSidebarStore((state) => state.setHeadings);

  useEffect(() => {
    setHeadings(headings);
    
    // Cleanup when leaving the page (so the global sidebar returns)
    return () => setHeadings([]);
  }, [headings, setHeadings]);

  return null;
}
