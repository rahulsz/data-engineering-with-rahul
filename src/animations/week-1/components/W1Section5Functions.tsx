"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Component, Folder, FileText } from "lucide-react";
import CurriculumCallout from "@/components/curriculum/CurriculumCallout";
import FunctionFactory from "./FunctionFactory";

const fadeUp: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: 0.4 } } };
const stagger: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const rowReveal: Variants = { hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0, transition: { ease: "easeOut" as const, duration: 0.3 } } };
const scaleIn: Variants = { hidden: { opacity: 0, scale: 0.97 }, visible: { opacity: 1, scale: 1, transition: { ease: "easeOut" as const, duration: 0.4 } } };
const slideFromLeft: Variants = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { ease: "easeOut" as const, duration: 0.5 } } };
const slideFromRight: Variants = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { ease: "easeOut" as const, duration: 0.5 } } };

const codeLines = [
  { t: "# ── src/transformations/product_utils.py ────────────────", c: true },
  { t: "# Module: reusable product transformation functions", c: true },
  { t: "", c: false },
  { t: "def calculate_margin(unit_cost: float, unit_price: float) -> float:", c: false },
  { t: '    """Calculate gross margin percentage for a product."""', c: true },
  { t: "    if unit_price == 0:", c: false },
  { t: "        return 0.0", c: false },
  { t: "    return round(((unit_price - unit_cost) / unit_price) * 100, 2)", c: false },
  { t: "", c: false },
  { t: "", c: false },
  { t: "def classify_margin(margin_pct: float) -> str:", c: false },
  { t: '    """Classify margin tier for reporting."""', c: true },
  { t: "    if margin_pct >= 60:", c: false },
  { t: '        return "HIGH"', c: false },
  { t: "    elif margin_pct >= 30:", c: false },
  { t: '        return "MEDIUM"', c: false },
  { t: "    else:", c: false },
  { t: '        return "LOW"', c: false },
  { t: "", c: false },
  { t: "", c: false },
  { t: "def enrich_product(row: dict) -> dict:", c: false },
  { t: '    """Add derived fields to a raw product row."""', c: true },
  { t: '    margin = calculate_margin(row["unit_cost"], row["unit_price"])', c: false },
  { t: "    return {", c: false },
  { t: "        **row,", c: false },
  { t: '        "margin_pct"   : margin,', c: false },
  { t: '        "margin_tier"  : classify_margin(margin),', c: false },
  { t: '        "is_profitable": margin > 0', c: false },
  { t: "    }", c: false },
];

const moduleTree = [
  { indent: 0, name: "src/", isDir: true },
  { indent: 1, name: "transformations/", isDir: true },
  { indent: 2, name: "__init__.py", isDir: false },
  { indent: 2, name: "product_utils.py", isDir: false, note: "← functions for products" },
  { indent: 2, name: "order_utils.py", isDir: false, note: "← functions for orders" },
  { indent: 2, name: "validation_utils.py", isDir: false, note: "← data quality checks" },
];

export default function W1Section5Functions() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.section ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} className="w-full flex flex-col gap-10 mb-24">
      <motion.div variants={fadeUp} className="flex flex-col gap-2">
        <h3 className="text-[#c084fc] text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          <Component className="w-5 h-5" /> Core Concepts
        </h3>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Writing Functions &amp; Organizing Modules
        </h2>
      </motion.div>

      <motion.div variants={fadeUp} className="text-[#D1D5DB] text-base leading-relaxed">
        <p>A function is a reusable block of logic with a name. Once written, you call it as many times as you need without rewriting the logic. In data engineering, functions are how you package transformations — clean_supplier_name(), calculate_lead_time(), validate_order_row() — so they can be tested independently and reused across pipelines.</p>
      </motion.div>

      <motion.div variants={fadeUp} className="border-l-4 border-[#c084fc]/50 bg-[#c084fc]/5 pl-6 pr-4 py-4 rounded-r-lg text-[#D1D5DB] italic">
        A function is a stamping machine on a factory floor. You design it once, quality-test it once, and then run every unit through it. You don&apos;t redesign the stamp for every product — you call the same function for every row. This is the core of scalable pipeline design.
      </motion.div>

      <motion.div variants={fadeUp}>
        <FunctionFactory />
      </motion.div>

      {/* Code Block */}
      <motion.div variants={fadeUp} className="bg-[#0B111A] border border-[#253141] rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center gap-2 px-5 py-3 bg-[#141B23] border-b border-[#253141]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]/70" />
            <div className="w-3 h-3 rounded-full bg-[#eab308]/70" />
            <div className="w-3 h-3 rounded-full bg-[#22c55e]/70" />
          </div>
          <span className="text-[11px] font-mono text-[#6B7280] ml-2">src/transformations/product_utils.py</span>
        </div>
        <motion.div variants={stagger} className="p-5 overflow-x-auto">
          <pre className="text-[13px] leading-relaxed font-mono">
            {codeLines.map((line, i) => (
              <motion.div key={i} variants={rowReveal} className={line.c ? "text-[#4b5563]" : "text-[#D1D5DB]"}>
                {line.t || "\u00A0"}
              </motion.div>
            ))}
          </pre>
        </motion.div>
      </motion.div>

      {/* Module Tree */}
      <motion.div variants={fadeUp} className="bg-[#0B111A] border border-[#253141] rounded-xl p-5">
        <h4 className="text-[#9CA3AF] text-xs tracking-widest uppercase font-sans mb-4">Module Structure</h4>
        <motion.div variants={stagger} className="font-mono text-[13px]">
          {moduleTree.map((item, i) => (
            <motion.div key={i} variants={rowReveal} className="py-0.5" style={{ paddingLeft: `${item.indent * 20}px` }}>
              <span className={item.isDir ? "text-[#38bdf8] flex items-center gap-1.5" : "text-[#22c55e] flex items-center gap-1.5"}>
                {item.isDir ? <Folder className="w-3.5 h-3.5" /> : <FileText className="w-3.5 h-3.5" />}{item.name}
              </span>
              {item.note && <span className="text-[#6B7280] ml-3 text-xs">{item.note}</span>}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CurriculumCallout type="tip">
          Write functions that do ONE thing. calculate_margin() calculates margin. It does not print, it does not write to a file, it does not send an email. Single-responsibility functions are testable, reusable, and debuggable.
        </CurriculumCallout>
        <CurriculumCallout type="warning">
          Always add type hints to your function signatures. def calculate_margin(unit_cost: float, unit_price: float) -&gt; float is infinitely better than def calculate_margin(a, b). Type hints are documentation.
        </CurriculumCallout>
      </div>
    </motion.section>
  );
}
