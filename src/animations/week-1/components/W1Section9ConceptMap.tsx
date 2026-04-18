"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

const fadeUp: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: 0.4 } } };
const stagger: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const rowSlide: Variants = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { ease: "easeOut" as const, duration: 0.4 } } };
const pop: Variants = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 260, damping: 20 } } };

const connections = [
  { dir: "from", source: "Databricks Setup (W0)", target: "Python Notebooks (W1)", desc: "Every Databricks notebook runs Python — setup enables execution", srcColor: "text-[#c084fc]", tgtColor: "text-[#38bdf8]" },
  { dir: "from", source: "Capstone Overview (W0)", target: "File Handling (W1)", desc: "Raw CSV files are the first data source in the capstone ingestion layer", srcColor: "text-[#c084fc]", tgtColor: "text-[#38bdf8]" },
  { dir: "to", source: "Variables & Datatypes", target: "Pandas DataFrames (W2)", desc: "DataFrames are dictionaries at scale — same mental model, bigger data", srcColor: "text-[#38bdf8]", tgtColor: "text-[#22c55e]" },
  { dir: "to", source: "Functions & Modules", target: "PySpark ETL (W5)", desc: "PySpark transformation logic is organized as Python functions and modules", srcColor: "text-[#38bdf8]", tgtColor: "text-[#22c55e]" },
  { dir: "to", source: "File Handling (CSV/JSON)", target: "Delta Lake Ingestion (W4)", desc: "Reading CSVs manually becomes automated Delta table writes in Week 4", srcColor: "text-[#38bdf8]", tgtColor: "text-[#22c55e]" },
  { dir: "to", source: "Git Fundamentals", target: "CI/CD Pipelines (W8)", desc: "Git branching strategy from Week 1 is the foundation of Week 8 automation", srcColor: "text-[#38bdf8]", tgtColor: "text-[#22c55e]" },
  { dir: "to", source: "Jira User Stories", target: "ETL Architecture (W8)", desc: "Every pipeline in Week 8 traces back to a User Story written in Week 1 format", srcColor: "text-[#38bdf8]", tgtColor: "text-[#22c55e]" },
  { dir: "to", source: "Loops & Conditions", target: "Data Validation Layer (W8)", desc: "The if/elif/else validation logic here scales to PySpark DataFrame filters", srcColor: "text-[#38bdf8]", tgtColor: "text-[#22c55e]" },
];

export default function W1Section9ConceptMap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.section ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} className="w-full flex flex-col gap-10 mb-24">
      <motion.div variants={fadeUp} className="flex flex-col gap-2">
        <h3 className="text-[#38bdf8] text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          <span className="text-lg">🔗</span> Concept Connections
        </h3>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          How Week 1 Connects Forward &amp; Backward
        </h2>
      </motion.div>

      <motion.div variants={stagger} className="flex flex-col gap-0">
        {/* FROM W0 header */}
        <motion.div variants={fadeUp} className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#c084fc] mb-3 mt-2">↓ From Week 0</motion.div>
        {connections.filter(c => c.dir === "from").map((c, i) => (
          <motion.div key={i} variants={rowSlide} className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-white/[0.02] transition-colors group border-b border-[#1e293b]/50 last:border-0">
            <motion.div variants={pop} className={`${c.srcColor} text-xs font-mono font-bold bg-[#141B23] border border-[#253141] px-2.5 py-1 rounded whitespace-nowrap shrink-0`}>
              {c.source}
            </motion.div>
            <span className="text-[#6B7280] text-xs shrink-0 group-hover:text-[#F97316] transition-colors">──→</span>
            <motion.div variants={pop} className={`${c.tgtColor} text-xs font-mono font-bold bg-[#141B23] border border-[#253141] px-2.5 py-1 rounded whitespace-nowrap shrink-0`}>
              {c.target}
            </motion.div>
            <span className="text-[#6B7280] text-[11px] ml-2 hidden md:inline">{c.desc}</span>
          </motion.div>
        ))}

        {/* TO future weeks header */}
        <motion.div variants={fadeUp} className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#22c55e] mb-3 mt-6">↑ To Future Weeks</motion.div>
        {connections.filter(c => c.dir === "to").map((c, i) => (
          <motion.div key={i} variants={rowSlide} className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-white/[0.02] transition-colors group border-b border-[#1e293b]/50 last:border-0">
            <motion.div variants={pop} className={`${c.srcColor} text-xs font-mono font-bold bg-[#141B23] border border-[#253141] px-2.5 py-1 rounded whitespace-nowrap shrink-0`}>
              {c.source}
            </motion.div>
            <span className="text-[#6B7280] text-xs shrink-0 group-hover:text-[#F97316] transition-colors">──→</span>
            <motion.div variants={pop} className={`${c.tgtColor} text-xs font-mono font-bold bg-[#141B23] border border-[#253141] px-2.5 py-1 rounded whitespace-nowrap shrink-0`}>
              {c.target}
            </motion.div>
            <span className="text-[#6B7280] text-[11px] ml-2 hidden md:inline">{c.desc}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
