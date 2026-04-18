"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProgressState {
  completedWeeks: number[];
  markComplete: (week: number) => void;
  markIncomplete: (week: number) => void;
  toggleWeek: (week: number) => void;
  isComplete: (week: number) => boolean;
  getCompletionPercentage: () => number;
  resetProgress: () => void;
  hydrateFromServer: (weeks: number[]) => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedWeeks: [],
      
      markComplete: (week: number) => set((state) => ({
        completedWeeks: state.completedWeeks.includes(week)
          ? state.completedWeeks
          : [...state.completedWeeks, week]
      })),
      
      markIncomplete: (week: number) => set((state) => ({
        completedWeeks: state.completedWeeks.filter((w) => w !== week)
      })),
      
      toggleWeek: (week: number) => {
        const { isComplete, markComplete, markIncomplete } = get();
        if (isComplete(week)) {
          markIncomplete(week);
        } else {
          markComplete(week);
        }
      },
      
      isComplete: (week: number) => get().completedWeeks.includes(week),
      
      getCompletionPercentage: () => {
        const count = get().completedWeeks.length;
        const raw = (count / 14) * 100;
        return Math.round(raw * 10) / 10;
      },
      
      resetProgress: () => set({ completedWeeks: [] }),
      
      hydrateFromServer: (weeks: number[]) => set({ completedWeeks: weeks })
    }),
    {
      name: "de-rahul-progress"
    }
  )
);
