"use client";

import { useState } from "react";
import { CURRICULUM } from "@/config/site-config";
import { useProgressStore } from "@/store/progressStore";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { CircleCheckBig, CircleDashed, ChevronDown, LockKeyhole, GraduationCap } from "lucide-react";
import Badge from "@/components/ui/Badge";
import ProgressRing from "@/components/ui/ProgressRing";
import { cn } from "@/lib/cn";

interface SidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function Sidebar({ isMobileOpen, onMobileClose }: SidebarProps) {
  const pathname = usePathname();
  const { completedWeeks, getCompletionPercentage } = useProgressStore();
  const completionPercentage = getCompletionPercentage();

  const [openPhases, setOpenPhases] = useState<Record<number, boolean>>({ 1: true });

  const togglePhase = (phase: number) => {
    setOpenPhases(prev => ({ ...prev, [phase]: !prev[phase] }));
  };

  const sidebarContent = (
    <div className="h-full flex flex-col pt-14">
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex items-center gap-4">
        <ProgressRing percentage={completionPercentage} size={48} strokeWidth={4} color="#6366f1" />
        <div>
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-brand-500" />
            Course Progress
          </h3>
          <p className="text-xs text-zinc-500">{completedWeeks.length} / 14 weeks</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {CURRICULUM.map((phase) => (
          <div key={phase.phase} className="space-y-1">
            <button
              onClick={() => togglePhase(phase.phase)}
              className="w-full flex items-center justify-between p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 rounded-md transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: phase.color === 'violet' ? '#8b5cf6' : phase.color === 'blue' ? '#3b82f6' : phase.color === 'emerald' ? '#10b981' : phase.color === 'amber' ? '#f59e0b' : phase.color === 'rose' ? '#f43f5e' : '#6366f1' }} />
                <span className="font-medium text-sm text-zinc-800 dark:text-zinc-200">{phase.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-zinc-400">{phase.weeks.length} modules</span>
                <ChevronDown className={cn("w-4 h-4 text-zinc-400 transition-transform duration-200", openPhases[phase.phase] ? "rotate-180" : "")} />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {openPhases[phase.phase] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="pl-6 pr-2 py-1 space-y-1">
                    {phase.weeks.map((week) => {
                      const href = `/curriculum/${phase.slug}/${week.slug}`;
                      const isActive = pathname === href;
                      const isCompleted = completedWeeks.includes(week.week);
                      const isAvailable = week.status === "available";

                      if (!isAvailable) {
                        return (
                          <div key={week.week} className="flex items-center justify-between p-2 text-sm text-zinc-400 opacity-60">
                            <div className="flex items-center gap-3">
                              <Badge className="bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400 border-none">
                                {week.week}
                              </Badge>
                              <span className="truncate max-w-[130px]">{week.title}</span>
                            </div>
                            <LockKeyhole className="w-4 h-4" />
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={week.week}
                          href={href}
                          onClick={onMobileClose}
                          className={cn(
                            "flex items-center justify-between p-2 text-sm rounded-md transition-colors border-l-2",
                            isActive 
                              ? "bg-brand-50 dark:bg-brand-900/30 border-brand-500 text-brand-700 dark:text-brand-300"
                              : "border-transparent text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <Badge className={cn("border-none", isActive ? "bg-brand-100 dark:bg-brand-800 text-brand-700 dark:text-brand-200" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400")}>
                              {week.week}
                            </Badge>
                            <span className="truncate max-w-[130px]">{week.title}</span>
                          </div>
                          {isCompleted ? <CircleCheckBig className="w-4 h-4 text-emerald-500" /> : <CircleDashed className="w-4 h-4 text-zinc-300 dark:text-zinc-700" />}
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:block fixed left-0 top-0 w-64 h-screen border-r border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl z-40">
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {isMobileOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-64 h-full bg-white dark:bg-zinc-950 flex shadow-2xl"
            >
              <div className="flex-1 w-full bg-white dark:bg-zinc-950">
                {sidebarContent}
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
