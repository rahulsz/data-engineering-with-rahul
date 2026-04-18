"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Lightbulb, AlertTriangle } from "lucide-react";

export type CalloutType = "tip" | "warning";

interface CurriculumCalloutProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const cardScale: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 28 } }
};

export default function CurriculumCallout({ type, title, children }: CurriculumCalloutProps) {
  const isTip = type === "tip";
  const icon = isTip ? <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-[#22c55e] shrink-0 mt-0.5" /> : <AlertTriangle className="w-5 h-5 md:w-6 md:h-6 text-[#ef4444] shrink-0 mt-0.5" />;
  const colorClass = isTip ? "text-[#22c55e]" : "text-[#ef4444]";
  const bgClass = isTip ? "bg-[#22c55e]/5" : "bg-[#ef4444]/5";
  const borderClass = isTip ? "border-[#22c55e]/20" : "border-[#ef4444]/20";
  const defaultTitle = isTip ? "PRO TIP" : "WARNING";

  return (
    <motion.div variants={cardScale} className={`flex gap-3 md:gap-4 p-4 md:p-5 rounded-xl border ${bgClass} ${borderClass}`}>
      {icon}
      <div className="flex flex-col gap-1">
        <h5 className={`${colorClass} font-bold text-xs md:text-sm tracking-wide uppercase`}>{title || defaultTitle}</h5>
        <div className="text-[#D1D5DB] text-[13px] md:text-sm leading-relaxed">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
