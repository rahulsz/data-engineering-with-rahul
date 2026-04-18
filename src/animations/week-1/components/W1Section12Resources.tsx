"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { ExternalLink, Library, FileText, Target, Package, BookOpen } from "lucide-react";

const fadeUp: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: 0.4 } } };
const stagger: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const slideUp: Variants = { hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: 0.35 } } };

type ResourceLink = { title: string; desc: string; url?: string; mono?: boolean };

const sections: { label: string; icon: React.ReactNode; color: string; items: ResourceLink[] }[] = [
  {
    label: "Official Docs", icon: <FileText className="w-5 h-5" />, color: "text-[#38bdf8]",
    items: [
      { title: "Python Official Tutorial", desc: "Read chapters 3–5: Numbers, Strings, Lists, Control Flow, Functions", url: "https://docs.python.org/3/tutorial" },
      { title: "Python csv module", desc: "Read DictReader and DictWriter sections specifically", url: "https://docs.python.org/3/library/csv.html" },
      { title: "Python json module", desc: "Read json.load() and json.dump() with the indent parameter", url: "https://docs.python.org/3/library/json.html" },
      { title: "Git Cheat Sheet", desc: "Print this. Pin it. Use it daily for the first 3 weeks.", url: "https://education.github.com/git-cheat-sheet-education.pdf" },
    ],
  },
  {
    label: "Practice Platforms", icon: <Target className="w-5 h-5" />, color: "text-[#22c55e]",
    items: [
      { title: "HackerRank Python", desc: "Complete: Basic Data Types, Lists, Dictionaries (10 problems total)", url: "https://hackerrank.com/domains/python" },
      { title: "Learn Git Branching", desc: "Visual interactive Git — do Levels 1–4 of Main before Week 2", url: "https://learngitbranching.js.org" },
    ],
  },
  {
    label: "This Week's Datasets", icon: <Package className="w-5 h-5" />, color: "text-[#F97316]",
    items: [
      { title: "GlobalMart inventory_snapshot CSV", desc: "data/raw/inventory_snapshot_2024_11_01.csv", mono: true },
      { title: "GlobalMart purchase_orders JSON", desc: "data/raw/purchase_orders_2024_11.json", mono: true },
    ],
  },
  {
    label: "Recommended Reading", icon: <BookOpen className="w-5 h-5" />, color: "text-[#c084fc]",
    items: [
      { title: '"Clean Code" Chapter 3 — Functions', desc: "The single-responsibility principle explained for practitioners" },
      { title: '"Pro Git" Book', desc: "Read Chapter 2: Git Basics — the only chapter you need this week", url: "https://git-scm.com/book" },
    ],
  },
];

export default function W1Section12Resources() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.section ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} className="w-full flex flex-col gap-10 mb-24">
      <motion.div variants={fadeUp} className="flex flex-col gap-2">
        <h3 className="text-[#38bdf8] text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          <Library className="w-5 h-5" /> Resources
        </h3>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Week 1 Study Materials
        </h2>
      </motion.div>

      <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => (
          <motion.div key={section.label} variants={slideUp} className="bg-[#141B23] border border-[#253141] rounded-xl p-5">
            <h4 className={`${section.color} font-bold text-sm uppercase tracking-wide mb-4 flex items-center gap-2`}>
              {section.icon} {section.label}
            </h4>
            <motion.div variants={stagger} className="flex flex-col gap-3">
              {section.items.map((item) => (
                <motion.div key={item.title} variants={slideUp}>
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-0.5 hover:bg-white/[0.02] rounded-lg p-2 -mx-2 transition-colors"
                    >
                      <span className="text-white text-sm font-semibold flex items-center gap-1.5">
                        {item.title}
                        <ExternalLink className="w-3 h-3 text-[#6B7280] group-hover:text-[#F97316] group-hover:translate-x-0.5 transition-all" />
                      </span>
                      <span className={`text-[#6B7280] text-xs ${item.mono ? "font-mono text-[#38bdf8]" : ""}`}>{item.desc}</span>
                    </a>
                  ) : (
                    <div className="flex flex-col gap-0.5 p-2 -mx-2">
                      <span className="text-white text-sm font-semibold">{item.title}</span>
                      <span className={`text-[#6B7280] text-xs ${item.mono ? "font-mono text-[#38bdf8]" : ""}`}>{item.desc}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
