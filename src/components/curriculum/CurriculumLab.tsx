"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import { CheckCircle2, ChevronRight, Check } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

import { slideUp, stagger } from "@/lib/animations/variants";

export interface LabTask {
  title: string;
  steps: string[];
  challenge?: boolean;
}

interface CurriculumLabProps {
  badgeText: string;
  badgeIcon?: React.ReactNode;
  title: string;
  objective: React.ReactNode;
  duration: string;
  tasks: LabTask[];
  children?: React.ReactNode;
}

export default function CurriculumLab({
  badgeText,
  badgeIcon,
  title,
  objective,
  duration,
  tasks = [],
  children,
}: CurriculumLabProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { width, height } = useWindowSize();

  const [completedTasks, setCompletedTasks] = useState<boolean[]>(
    new Array(tasks.length).fill(false)
  );
  const [showConfetti, setShowConfetti] = useState(false);

  const completedCount = completedTasks.filter(Boolean).length;
  const progressPercent = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  useEffect(() => {
    if (completedCount === tasks.length && completedCount > 0) {
      // eslint-disable-next-line
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [completedCount, tasks.length]);

  const toggleTask = (index: number) => {
    const next = [...completedTasks];
    next[index] = !next[index];
    setCompletedTasks(next);
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full flex flex-col gap-12 mt-16 mb-24 relative"
    >
      {/* Confetti Overlay */}
      {showConfetti && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          <Confetti
            width={width}
            height={height}
            numberOfPieces={300}
            gravity={0.15}
            colors={["#F97316", "#22c55e", "#38bdf8", "#a855f7", "#facc15"]}
          />
        </div>
      )}

      {/* Header */}
      <motion.div
        variants={slideUp}
        className="flex flex-col gap-3 bg-[#1A232E] border border-[#253141] p-6 lg:p-8 rounded-2xl shadow-xl"
      >
        <h3 className="text-[#22c55e] text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          {badgeIcon}
          {badgeText}
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
          {title}
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-[#D1D5DB] text-sm lg:text-[15px] leading-relaxed">
          <div className="flex-1">{objective}</div>
          <div className="px-4 py-2 bg-[#0F151B] border border-[#253141] rounded-lg shrink-0 font-mono text-[#F97316] font-bold">
            ⏱ Duration: {duration}
          </div>
        </div>

        {/* Progress Bar Container */}
        <div className="mt-6">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-mono tracking-widest uppercase text-[#9CA3AF]">
              Lab Progress
            </span>
            <span
              className={`text-xs font-bold ${
                progressPercent === 100 ? "text-[#22c55e]" : "text-[#F97316]"
              }`}
            >
              {Math.round(progressPercent)}%
            </span>
          </div>
          <div className="w-full h-3 bg-[#0F151B] rounded-full overflow-hidden border border-[#253141]">
            <motion.div
              className={`h-full ${
                progressPercent === 100
                  ? "bg-gradient-to-r from-[#22c55e] to-[#4ade80]"
                  : "bg-gradient-to-r from-[#F97316] to-[#fb923c]"
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeOut" as const }}
            />
          </div>
          <AnimatePresence>
            {progressPercent === 100 && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="mt-3 flex items-center justify-center gap-2 text-[#22c55e] font-bold tracking-wide"
              >
                <CheckCircle2 className="w-5 h-5" /> Lab Complete!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        variants={stagger}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {tasks.map((task, idx) => (
          <motion.div
            variants={slideUp}
            key={idx}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col ${
              completedTasks[idx]
                ? "bg-[#22c55e]/5 border-[#22c55e]/30"
                : "bg-[#141B23] border-[#253141]"
            }`}
          >
            {/* Task Header Button */}
            <button
              onClick={() => toggleTask(idx)}
              className={`w-full flex items-center gap-4 p-5 border-b transition-colors text-left ${
                completedTasks[idx]
                  ? "border-[#22c55e]/30 bg-[#22c55e]/10 hover:bg-[#22c55e]/20"
                  : "border-[#253141] bg-[#1A232E] hover:bg-[#1f2937]"
              }`}
            >
              <div
                className={`w-6 h-6 shrink-0 rounded flex items-center justify-center border transition-all ${
                  completedTasks[idx]
                    ? "bg-[#22c55e] border-[#22c55e]"
                    : "bg-transparent border-[#4B5563]"
                }`}
              >
                {completedTasks[idx] && (
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                )}
              </div>
              <div className="flex-1">
                <div
                  className={`text-xs font-mono font-bold uppercase tracking-widest mb-1 flex items-center gap-2 ${
                    completedTasks[idx] ? "text-[#22c55e]" : "text-[#9CA3AF]"
                  }`}
                >
                  Task {idx + 1} {task.challenge && "(Challenge)"}
                </div>
                <h4
                  className={`font-bold text-sm sm:text-base ${
                    completedTasks[idx]
                      ? "text-white/70 line-through"
                      : "text-white"
                  }`}
                >
                  {task.title}
                </h4>
              </div>
            </button>
            {/* Steps Content */}
            <div
              className={`p-5 flex-1 ${
                completedTasks[idx] ? "opacity-50" : "opacity-100"
              }`}
            >
              <ul className="space-y-3">
                {task.steps.map((step, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-[#6B7280] shrink-0" />
                    <span className="text-[#D1D5DB] text-sm leading-snug">
                      {step}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Code Blocks / Extra Output rendered at bottom */}
      {children}
    </motion.section>
  );
}
