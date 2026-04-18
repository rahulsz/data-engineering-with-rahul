"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const fadeUp: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: 0.5 } } };
const stagger: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const popIn: Variants = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 200, damping: 20 } } };

const previewItems = [
  "🐼 Pandas DataFrames from scratch",
  "🔍 EDA on GlobalMart inventory & orders data",
  "🧹 Data cleansing: nulls, duplicates, type casting",
  "🔗 Merging DataFrames like SQL JOINs",
  "📦 Projects: Procurement Pipeline + Inventory Summary",
];

export default function W1Section13Navigation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.section ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} className="w-full flex flex-col gap-10 mb-8">
      {/* What's Next */}
      <motion.div variants={fadeUp} className="flex flex-col gap-3">
        <h3 className="text-[#F97316] text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          <span className="text-lg">⏭️</span> What&apos;s Next
        </h3>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Week 2: Intermediate Python + Pandas
        </h2>
      </motion.div>

      <motion.div variants={fadeUp} className="text-[#D1D5DB] text-base leading-relaxed">
        <p>
          Week 2 takes everything you built this week and scales it. Instead of manually looping through 5 inventory rows with plain Python, you will load 50,000 rows into a Pandas DataFrame in a single line. The functions you wrote in product_utils.py this week will become the logic inside DataFrame .apply() calls next week. Come with your Week 1 code open — you&apos;ll refactor it into production-grade Pandas pipelines.
        </p>
      </motion.div>

      {/* Preview Card */}
      <motion.div variants={popIn} className="bg-[#141B23] border border-[#253141] rounded-2xl p-6 shadow-lg">
        <h4 className="text-[#F97316] font-bold text-xs tracking-widest uppercase mb-4">Week 2 Preview</h4>
        <motion.div variants={stagger} className="flex flex-col gap-2">
          {previewItems.map((item, i) => (
            <motion.div key={i} variants={popIn} className="flex items-center gap-2 text-[#D1D5DB] text-sm">
              <span className="text-[#22c55e]">✓</span> {item}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Footer Navigation */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-stretch gap-4 mt-4">
        <Link
          href="/curriculum/orientation/week-0"
          className="flex-1 flex items-center gap-3 px-5 py-4 bg-[#141B23] border border-[#253141] rounded-xl hover:border-[#374151] hover:-translate-x-1 transition-all group"
        >
          <ChevronLeft className="w-5 h-5 text-[#6B7280] group-hover:text-[#D1D5DB] transition-colors" />
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-[#6B7280] tracking-widest uppercase">Previous</span>
            <span className="text-white text-sm font-bold">W0 — Setting the Stage</span>
            <span className="text-[#6B7280] text-[10px]">PHASE 0 — ORIENTATION</span>
          </div>
        </Link>

        <Link
          href="/curriculum/foundations/week-2"
          className="flex-1 flex items-center justify-end gap-3 px-5 py-4 bg-[#141B23] border border-[#F97316]/30 rounded-xl hover:border-[#F97316]/60 hover:translate-x-1 hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] transition-all group text-right"
        >
          <div className="flex flex-col">
            <span className="text-[10px] font-mono text-[#6B7280] tracking-widest uppercase">Next</span>
            <span className="text-[#F97316] text-sm font-bold">W2 — Intermediate Python + Pandas</span>
            <span className="text-[#6B7280] text-[10px]">PHASE 1 — FOUNDATIONS</span>
          </div>
          <ChevronRight className="w-5 h-5 text-[#F97316] group-hover:text-[#fb923c] transition-colors" />
        </Link>
      </motion.div>

      {/* Breadcrumb center */}
      <motion.div variants={fadeUp} className="text-center text-[#6B7280] text-xs font-mono tracking-widest uppercase mt-2">
        PHASE 1 › Week 1 | <Link href="/dashboard" className="text-[#F97316] hover:underline">🏠 Dashboard</Link>
      </motion.div>
    </motion.section>
  );
}
