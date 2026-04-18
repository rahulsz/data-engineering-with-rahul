"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { ExternalLink } from "lucide-react";

export interface ResourceItem {
  title: string;
  desc: string;
  url?: string;
  mono?: boolean;
}

export interface ResourceCategory {
  id: string; 
  label: string;
  icon: React.ReactNode;
  colorClass: string; // e.g. text-[#38bdf8]
  borderHoverClass?: string; // e.g. hover:border-[#38bdf8]/50
  bgHoverGradient?: string; // e.g. from-[#38bdf8] to-transparent
  items: ResourceItem[];
}

interface CurriculumResourcesProps {
  badgeText: string;
  badgeIcon?: React.ReactNode;
  title: string;
  categories: ResourceCategory[];
}

const slideUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: 0.4 } }
};

const staggerCategories: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const staggerItems: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
};

const slideItemUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: 0.35 } }
};

export default function CurriculumResources({
  badgeText,
  badgeIcon,
  title,
  categories
}: CurriculumResourcesProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full flex flex-col gap-10 mt-16 mb-24"
    >
      {/* Header */}
      <motion.div variants={slideUp} className="flex flex-col gap-2">
        <h3 className="text-[#9CA3AF] text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          {badgeIcon} {badgeText}
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
          {title}
        </h2>
      </motion.div>

      <motion.div variants={staggerCategories} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <motion.div 
            key={idx}
            variants={slideUp}
            className={`bg-[#141B23] border border-[#253141] rounded-2xl overflow-hidden flex flex-col transition-colors duration-300 ${cat.borderHoverClass || ''}`}
          >
            {/* Category Header */}
            <div className="p-5 border-b border-[#253141] bg-[#1A232E] flex items-center gap-3">
              <span className={cat.colorClass}>{cat.icon}</span>
              <h3 className={`font-bold tracking-widest text-sm uppercase ${cat.colorClass}`}>{cat.label}</h3>
            </div>

            {/* Links */}
            <motion.div variants={staggerItems} className="flex flex-col p-2 gap-2 h-full">
              {cat.items.map((item, iIdx) => {
                if (item.url) {
                  return (
                    <motion.a 
                      key={iIdx}
                      variants={slideItemUp}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-1 p-3 rounded-xl hover:bg-[#1A232E] transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between z-10 w-full pr-2">
                        <span className="font-bold text-white text-sm group-hover:underline decoration-2 underline-offset-4 decoration-[#4B5563] group-hover:decoration-[currentcolor] transition-all">
                          {item.title}
                        </span>
                        <ExternalLink className="w-4 h-4 text-[#6B7280] group-hover:text-white transition-all transform group-hover:translate-x-1 shrink-0 ml-2" />
                      </div>
                      <span className={`text-xs text-[#9CA3AF] mt-1 pr-4 ${item.mono ? "font-mono text-[#38bdf8]" : ""}`}>
                        {item.desc}
                      </span>
                      
                      {/* Hover bg line */}
                      {cat.bgHoverGradient && (
                         <div className={`absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity ${cat.bgHoverGradient}`} />
                      )}
                    </motion.a>
                  );
                } else {
                  return (
                    <motion.div key={iIdx} variants={slideItemUp} className="flex flex-col gap-1 p-3">
                      <span className="font-bold text-white text-sm">{item.title}</span>
                      <span className={`text-xs text-[#9CA3AF] mt-1 pr-4 ${item.mono ? "font-mono text-[#38bdf8]" : ""}`}>
                        {item.desc}
                      </span>
                    </motion.div>
                  );
                }
              })}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
