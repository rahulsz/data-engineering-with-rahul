import { create } from "zustand";

export interface Heading {
  id: string;
  title: string;
}

interface SidebarState {
  headings: Heading[];
  setHeadings: (headings: Heading[]) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  headings: [],
  setHeadings: (headings) => set({ headings }),
}));
