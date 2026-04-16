import { cn } from "@/lib/cn";
import React from "react";

interface BadgeProps {
  variant?: "default" | "phase" | "status" | "tag";
  color?: "violet" | "blue" | "emerald" | "amber" | "rose" | "slate";
  children: React.ReactNode;
  className?: string;
}

const colorMap: Record<string, string> = {
  violet: "bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 border-violet-200 dark:border-violet-800/50",
  blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800/50",
  emerald: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50",
  amber: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200 dark:border-amber-800/50",
  rose: "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300 border-rose-200 dark:border-rose-800/50",
  slate: "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300 border-slate-200 dark:border-slate-800/50",
};

export default function Badge({
  color = "slate",
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-medium border px-2.5 py-0.5 rounded-full text-xs",
        colorMap[color],
        className
      )}
    >
      {children}
    </span>
  );
}
