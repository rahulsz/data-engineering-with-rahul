"use client";

import { useProgressStore } from "@/store/progressStore";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

export default function CompleteButton({ weekId }: { weekId: number }) {
  const { completedWeeks, toggleWeek } = useProgressStore();
  const isComplete = completedWeeks.includes(weekId);

  return (
    <button
      onClick={() => toggleWeek(weekId)}
      className="flex items-center gap-2 px-5 py-2.5 rounded hover:bg-[#fb923c] bg-[#F97316] transition-colors font-medium text-[13px] text-[#0B111A] shadow-md cursor-pointer"
    >
      {isComplete ? "Completed" : "Mark as Complete"}
      <motion.div
        initial={false}
        animate={{ scale: isComplete ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Check className="w-4 h-4 ml-1" />
      </motion.div>
    </button>
  );
}
