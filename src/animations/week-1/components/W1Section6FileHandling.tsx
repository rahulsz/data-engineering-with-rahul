"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Lightbulb, AlertTriangle, FileText, FileJson } from "lucide-react";

const fadeUp: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: 0.4 } } };
const stagger: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const rowReveal: Variants = { hidden: { opacity: 0, x: -10 }, visible: { opacity: 1, x: 0, transition: { ease: "easeOut" as const, duration: 0.3 } } };
const scaleIn: Variants = { hidden: { opacity: 0, scale: 0.97 }, visible: { opacity: 1, scale: 1, transition: { ease: "easeOut" as const, duration: 0.4 } } };
const nodeReveal: Variants = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 200, damping: 20 } } };

const codeLines = [
  { t: "# ── GlobalMart: CSV Inventory Reader Pipeline ───────────", c: true },
  { t: "import csv", c: false },
  { t: "import json", c: false },
  { t: "from datetime import datetime", c: false },
  { t: "", c: false },
  { t: 'INPUT_FILE  = "data/raw/inventory_snapshot_2024_11_01.csv"', c: false },
  { t: 'OUTPUT_CSV  = "data/clean/inventory_clean.csv"', c: false },
  { t: 'OUTPUT_JSON = "data/clean/reorder_flags.json"', c: false },
  { t: "", c: false },
  { t: "clean_rows    = []", c: false },
  { t: "reorder_flags = []", c: false },
  { t: "", c: false },
  { t: "# ── Step 1: Read raw CSV ─────────────────────────────────", c: true },
  { t: 'with open(INPUT_FILE, "r", encoding="utf-8") as f:', c: false },
  { t: "    reader = csv.DictReader(f)", c: false },
  { t: "    for row in reader:", c: false },
  { t: '        quantity  = int(row["quantity"])', c: false },
  { t: '        unit_cost = float(row["unit_cost"])', c: false },
  { t: "", c: false },
  { t: "        # ── Step 2: Validate ─────────────────────────────", c: true },
  { t: "        if quantity < 0 or unit_cost < 0:", c: false },
  { t: "            continue", c: false },
  { t: "", c: false },
  { t: "        if quantity == 0:", c: false },
  { t: "            reorder_flags.append({", c: false },
  { t: '                "sku"        : row["sku"],', c: false },
  { t: '                "flagged_at" : datetime.utcnow().isoformat(),', c: false },
  { t: '                "reason"     : "zero_quantity"', c: false },
  { t: "            })", c: false },
  { t: "", c: false },
  { t: "        # ── Step 3: Enrich ───────────────────────────────", c: true },
  { t: '        row["total_value"] = round(quantity * unit_cost, 2)', c: false },
  { t: '        row["is_active"]   = quantity > 0', c: false },
  { t: "        clean_rows.append(row)", c: false },
  { t: "", c: false },
  { t: "# ── Step 4: Write clean CSV ──────────────────────────────", c: true },
  { t: 'print(f"✅ Clean rows written  : {len(clean_rows)}")', c: false },
  { t: 'print(f"⚠️  Reorder flags saved : {len(reorder_flags)}")', c: false },
];

const pipelineSteps = [
  { label: "READ CSV", icon: "📄", color: "border-[#38bdf8] bg-[#38bdf8]/10 text-[#38bdf8]" },
  { label: "VALIDATE", icon: "🔍", color: "border-[#f59e0b] bg-[#f59e0b]/10 text-[#f59e0b]" },
  { label: "ENRICH", icon: "➕", color: "border-[#c084fc] bg-[#c084fc]/10 text-[#c084fc]" },
  { label: "WRITE CSV", icon: "📄", color: "border-[#22c55e] bg-[#22c55e]/10 text-[#22c55e]" },
  { label: "WRITE JSON", icon: "📋", color: "border-[#F97316] bg-[#F97316]/10 text-[#F97316]" },
];

export default function W1Section6FileHandling() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.section ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} className="w-full flex flex-col gap-10 mb-24">
      <motion.div variants={fadeUp} className="flex flex-col gap-2">
        <h3 className="text-[#c084fc] text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          <span className="text-lg">📚</span> Core Concepts
        </h3>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          File Handling — Reading &amp; Writing Data Files
        </h2>
      </motion.div>

      <motion.div variants={fadeUp} className="text-[#D1D5DB] text-base leading-relaxed">
        <p>Before cloud storage and Delta Lake, data engineering started with files. CSVs, JSONs, and text logs are still the most common raw data formats you will receive from source systems. Python&apos;s built-in file handling lets you read any file, process every row, and write clean output.</p>
      </motion.div>

      <motion.div variants={fadeUp} className="border-l-4 border-[#c084fc]/50 bg-[#c084fc]/5 pl-6 pr-4 py-4 rounded-r-lg text-[#D1D5DB] italic">
        Reading a CSV in Python is like opening a filing cabinet drawer, pulling out one sheet at a time, reading it, and placing it in either the &ldquo;keep&rdquo; pile or the &ldquo;shred&rdquo; pile. Every pipeline on the planet does this at its core.
      </motion.div>

      {/* File type cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={scaleIn} className="border border-[#253141] bg-[#141B23] rounded-xl p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-5 h-5 text-[#38bdf8]" />
            <h4 className="text-white font-bold text-sm">CSV — Comma Separated</h4>
          </div>
          <pre className="text-[12px] font-mono text-[#22c55e] leading-relaxed bg-[#0B111A] p-3 rounded-lg">
{`order_id,sku,quantity
PO-001,SKU-88821,500
PO-002,SKU-32201,200`}
          </pre>
          <span className="text-[#6B7280] text-xs">Used for: tabular exports from ERP, WMS, Shopify</span>
        </motion.div>
        <motion.div variants={scaleIn} className="border border-[#253141] bg-[#141B23] rounded-xl p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2 mb-2">
            <FileJson className="w-5 h-5 text-[#f59e0b]" />
            <h4 className="text-white font-bold text-sm">JSON — Key-Value Pairs</h4>
          </div>
          <pre className="text-[12px] font-mono text-[#22c55e] leading-relaxed bg-[#0B111A] p-3 rounded-lg">
{`{
  "order_id": "PO-001",
  "sku": "SKU-88821",
  "quantity": 500
}`}
          </pre>
          <span className="text-[#6B7280] text-xs">Used for: API responses, config files, nested data</span>
        </motion.div>
      </div>

      {/* Code Block */}
      <motion.div variants={fadeUp} className="bg-[#0B111A] border border-[#253141] rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center gap-2 px-5 py-3 bg-[#141B23] border-b border-[#253141]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]/70" />
            <div className="w-3 h-3 rounded-full bg-[#eab308]/70" />
            <div className="w-3 h-3 rounded-full bg-[#22c55e]/70" />
          </div>
          <span className="text-[11px] font-mono text-[#6B7280] ml-2">inventory_csv_reader.py</span>
        </div>
        <motion.div variants={stagger} className="p-5 overflow-x-auto">
          <pre className="text-[13px] leading-relaxed font-mono">
            {codeLines.map((line, i) => (
              <motion.div key={i} variants={rowReveal} className={line.c ? "text-[#F97316]" : "text-[#D1D5DB]"}>
                {line.t || "\u00A0"}
              </motion.div>
            ))}
          </pre>
        </motion.div>
      </motion.div>

      {/* 5-Step Pipeline */}
      <motion.div variants={stagger} className="flex flex-wrap items-center justify-center gap-2">
        {pipelineSteps.map((step, i) => (
          <React.Fragment key={i}>
            <motion.div variants={nodeReveal} className={`flex flex-col items-center gap-1.5 px-4 py-3 rounded-xl border ${step.color} text-xs font-mono font-bold`}>
              <span className="text-lg">{step.icon}</span>
              {step.label}
            </motion.div>
            {i < pipelineSteps.length - 1 && (
              <motion.span variants={fadeUp} className="text-[#6B7280] text-sm">──→</motion.span>
            )}
          </React.Fragment>
        ))}
      </motion.div>

      {/* Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={scaleIn} className="border border-[#22c55e]/30 bg-[#22c55e]/5 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-[#22c55e]" />
            <h4 className="text-[#22c55e] font-bold text-sm uppercase tracking-wide">Pro Tip</h4>
          </div>
          <p className="text-[#D1D5DB] text-[13px] leading-relaxed">
            Always use &apos;with open()&apos; — never open() without it. The &apos;with&apos; statement guarantees the file is closed even if your code crashes mid-processing.
          </p>
        </motion.div>
        <motion.div variants={scaleIn} className="border border-[#ef4444]/30 bg-[#ef4444]/5 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-[#ef4444]" />
            <h4 className="text-[#ef4444] font-bold text-sm uppercase tracking-wide">Warning</h4>
          </div>
          <p className="text-[#D1D5DB] text-[13px] leading-relaxed">
            Never hardcode file paths as strings in your pipeline logic. Use a config dictionary or environment variable at the top of the file.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
