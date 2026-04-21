"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Link } from "lucide-react";

import { stagger, fadeUp, slideLeft as rowSlide, popIn as pop } from "@/lib/animations/variants";

export interface ConceptConnection {
  source: string;
  target: string;
  desc: string;
  srcColor?: string; // e.g. "text-[#c084fc]"
  tgtColor?: string; // e.g. "text-[#38bdf8]"
  arrowColor?: string; // e.g. "text-[#F97316]"
}

export interface ConceptGroup {
  label?: string; // e.g. "↓ From Week 0"
  labelColor?: string; // e.g. "text-[#c084fc]"
  items: ConceptConnection[];
}

interface CurriculumConceptMapProps {
  badgeText: string;
  badgeIcon?: React.ReactNode;
  title: string;
  groups: ConceptGroup[];
}

export default function CurriculumConceptMap({
  badgeText,
  badgeIcon = <Link className="w-5 h-5" />,
  title,
  groups = []
}: CurriculumConceptMapProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.section ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} className="w-full flex flex-col gap-10 mb-24">
      <motion.div variants={fadeUp} className="flex flex-col gap-2">
        <h3 className="text-[#38bdf8] text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          {badgeIcon} {badgeText}
        </h3>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          {title}
        </h2>
      </motion.div>

      <motion.div variants={stagger} className="flex flex-col gap-0">
        {groups.map((group, grpIdx) => (
          <React.Fragment key={grpIdx}>
            {group.label && (
              <motion.div variants={fadeUp} className={`text-[10px] font-mono font-bold tracking-widest uppercase mb-3 ${grpIdx > 0 ? "mt-6" : "mt-2"} ${group.labelColor || "text-[#9CA3AF]"}`}>
                {group.label}
              </motion.div>
            )}
            
            <div className="flex flex-col bg-[#0B111A] border border-[#253141] rounded-2xl shadow-xl overflow-hidden">
              {group.items.map((c, i) => (
                <motion.div key={i} variants={rowSlide} className="flex flex-col lg:flex-row lg:items-center gap-3 py-4 px-5 hover:bg-[#141B23] transition-colors group border-b border-[#253141] last:border-0 relative">
                  
                  {/* From -> To */}
                  <div className="flex items-center gap-3 shrink-0">
                    <motion.div variants={pop} className={`${c.srcColor || "text-[#D1D5DB]"} text-[11px] sm:text-xs font-mono font-bold bg-[#1A232E] border border-[#253141] px-2.5 py-1.5 rounded whitespace-nowrap`}>
                      {c.source}
                    </motion.div>
                    
                    {/* Animated Line / Arrow Container */}
                    <div className="flex-1 w-8 sm:w-12 relative flex items-center justify-center shrink-0">
                      <div className="h-px bg-gradient-to-r from-transparent via-[#4B5563] to-transparent w-full opacity-50" />
                      <span className={`absolute ${c.arrowColor || "text-[#6B7280]"} text-xs transition-transform group-hover:translate-x-1 duration-300`}>→</span>
                    </div>

                    <motion.div variants={pop} className={`${c.tgtColor || "text-[#D1D5DB]"} text-[11px] sm:text-xs font-mono font-bold bg-[#1A232E] border border-[#253141] px-2.5 py-1.5 rounded whitespace-nowrap`}>
                      {c.target}
                    </motion.div>
                  </div>

                  {/* Description */}
                  <span className="text-[#9CA3AF] group-hover:text-[#D1D5DB] text-[13px] leading-relaxed lg:border-l lg:border-[#253141] lg:pl-4 transition-colors duration-300 mt-2 lg:mt-0">
                    {c.desc}
                  </span>
                </motion.div>
              ))}
            </div>
          </React.Fragment>
        ))}
      </motion.div>
    </motion.section>
  );
}
