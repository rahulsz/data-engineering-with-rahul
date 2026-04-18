"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useProgressStore } from "@/store/progressStore";
import { Check, ChevronRight, ArrowRight, Loader2, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface NextLessonProps {
  slug: string;
  title: string;
  phaseSlug: string;
}

export default function BottomNavPipeline({ 
  weekId, 
  nextLesson 
}: { 
  weekId: number; 
  nextLesson: NextLessonProps | null;
}) {
  const { completedWeeks, toggleWeek } = useProgressStore();
  const isComplete = completedWeeks.includes(weekId);
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleComplete = () => {
    if (!isComplete) {
      toggleWeek(weekId);
    }
  };

  const handleNextLesson = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!nextLesson) return;
    
    // We add a subtle loading state for UX while Next.js prefetches and transitions
    const element = e.currentTarget;
    e.preventDefault();
    setIsNavigating(true);
    setTimeout(() => {
      router.push(`/curriculum/${nextLesson.phaseSlug}/${nextLesson.slug}`);
    }, 150);
  };

  return (
    <div className="w-full flex flex-col mt-8 border-t border-[#1e293b] pt-8">
      
      {!isComplete ? (
        <div className="flex flex-col items-center justify-center p-8 bg-[#11161d] rounded-2xl border border-[#1e293b] shadow-2xl">
          <h3 className="text-xl font-bold text-white mb-2">Ready to move forward?</h3>
          <p className="text-[#9CA3AF] text-sm text-center mb-6 max-w-md">
            Verify you've grasped the core concepts of this module before syncing your state to the MongoDB registry.
          </p>
          <button
            onClick={handleComplete}
            className="group flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[#F97316] hover:bg-[#fb923c] transition-all duration-300 font-bold text-[15px] text-[#05080b] shadow-[0_4px_24px_rgba(249,115,22,0.25)] hover:shadow-[0_4px_32px_rgba(249,115,22,0.4)] hover:scale-105"
          >
            Mark Module as Complete
            <Check className="w-5 h-5 ml-2 border border-[#05080b]/20 rounded-full p-0.5 opacity-80 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center justify-between p-8 bg-[#1B2922] dark:bg-gradient-to-r dark:from-[#111823] dark:to-[#172422] rounded-2xl border-2 border-[#22c55e]/30 shadow-[0_0_40px_rgba(34,197,94,0.1)] relative overflow-hidden"
        >
          {/* Confetti / Glow Backdrop */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#22c55e] blur-[120px] rounded-full opacity-20 pointer-events-none" />

          <div className="flex items-center gap-6 mb-6 md:mb-0 z-10 w-full md:w-auto">
            <div className="w-16 h-16 rounded-full bg-[#22c55e]/20 border border-[#22c55e]/40 flex items-center justify-center shrink-0">
              <Award className="w-8 h-8 text-[#22c55e]" />
            </div>
            <div>
              <h3 className="text-[13px] font-mono font-bold tracking-widest text-[#22c55e] uppercase mb-1">
                Progression Saved
              </h3>
              <p className="text-xl font-bold text-white tracking-tight">
                Module {weekId}.0 Completed
              </p>
            </div>
          </div>

          <div className="z-10 w-full md:w-auto">
            {nextLesson ? (
              <Link
                href={`/curriculum/${nextLesson.phaseSlug}/${nextLesson.slug}`}
                onClick={handleNextLesson}
                className="group flex flex-col md:flex-row md:items-center justify-between md:justify-center w-full gap-4 px-6 md:px-8 py-4 rounded-xl bg-white text-[#05080b] hover:bg-zinc-200 transition-all duration-300 shadow-xl border border-black/10 hover:scale-[1.02]"
              >
                <div className="flex flex-col text-left">
                  <span className="text-[10px] font-bold tracking-widest text-zinc-500 uppercase">Up Next</span>
                  <span className="font-bold text-[15px] truncate max-w-[200px]">{nextLesson.title}</span>
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#05080b] text-white shrink-0 group-hover:bg-[#F97316] transition-colors">
                  {isNavigating ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                </div>
              </Link>
            ) : (
              <div className="flex items-center gap-3 px-8 py-4 rounded-xl bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30 font-bold">
                <Check className="w-5 h-5" /> All Curriculum Content Completed
              </div>
            )}
          </div>
        </motion.div>
      )}

    </div>
  );
}
