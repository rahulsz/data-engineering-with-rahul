"use client";

import { useProgressStore } from "@/store/progressStore";
import { CheckCircle2, Circle } from "lucide-react";
import { motion } from "framer-motion";

export default function CompleteButton({ weekId }: { weekId: number }) {
  const { completedWeeks, toggleWeek } = useProgressStore();
  const isComplete = completedWeeks.includes(weekId);

  return (
    <button
      onClick={() => toggleWeek(weekId)}
      className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-all font-medium text-sm text-zinc-700 dark:text-zinc-300 shadow-sm"
    >
      <motion.div
        initial={false}
        animate={{ scale: isComplete ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        {isComplete ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
        ) : (
          <Circle className="w-5 h-5 text-zinc-400" />
        )}
      </motion.div>
      {isComplete ? "Completed" : "Mark as Complete"}
    </button>
  );
}
