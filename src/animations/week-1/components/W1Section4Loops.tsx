"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Lightbulb, AlertTriangle } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: 0.4 } },
};
const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const rowReveal: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { ease: "easeOut" as const, duration: 0.3 } },
};
const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { ease: "easeOut" as const, duration: 0.4 } },
};
const nodeReveal: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 260, damping: 20 } },
};

const codeLines = [
  { t: "# ── GlobalMart: Inventory Row Processor ─────────────────", c: true },
  { t: "", c: false },
  { t: "inventory_rows = [", c: false },
  { t: '    {"sku": "SKU-88821", "quantity": 120,  "unit_cost": 450.00},', c: false },
  { t: '    {"sku": "SKU-32201", "quantity": 0,    "unit_cost": 85.00},', c: false },
  { t: '    {"sku": "SKU-11043", "quantity": 45,   "unit_cost": -32.00},', c: false },
  { t: '    {"sku": "SKU-55509", "quantity": 310,  "unit_cost": 78.00},', c: false },
  { t: '    {"sku": "SKU-77732", "quantity": 0,    "unit_cost": 8.50},', c: false },
  { t: "]", c: false },
  { t: "", c: false },
  { t: "clean_rows    = []", c: false },
  { t: "reorder_flags = []", c: false },
  { t: "corrupt_rows  = []", c: false },
  { t: "", c: false },
  { t: "for row in inventory_rows:", c: false },
  { t: '    sku      = row["sku"]', c: false },
  { t: '    quantity = row["quantity"]', c: false },
  { t: '    cost     = row["unit_cost"]', c: false },
  { t: "", c: false },
  { t: "    if quantity == 0:", c: false },
  { t: "        reorder_flags.append(sku)", c: false },
  { t: '        print(f"⚠️  REORDER FLAG : {sku} — quantity is zero")', c: false },
  { t: "", c: false },
  { t: "    elif cost < 0:", c: false },
  { t: "        corrupt_rows.append(sku)", c: false },
  { t: '        print(f"❌ CORRUPT ROW  : {sku} — negative unit cost")', c: false },
  { t: "", c: false },
  { t: "    else:", c: false },
  { t: "        clean_rows.append(row)", c: false },
  { t: '        print(f"✅ CLEAN        : {sku} — qty={quantity}, cost=${cost}")', c: false },
];

const outputLines = [
  { icon: "✅", color: "text-[#22c55e]", text: "CLEAN        : SKU-88821 — qty=120, cost=$450.0" },
  { icon: "⚠️", color: "text-[#f59e0b]", text: " REORDER FLAG : SKU-32201 — quantity is zero" },
  { icon: "❌", color: "text-[#ef4444]", text: "CORRUPT ROW  : SKU-11043 — negative unit cost" },
  { icon: "✅", color: "text-[#22c55e]", text: "CLEAN        : SKU-55509 — qty=310, cost=$78.0" },
  { icon: "⚠️", color: "text-[#f59e0b]", text: " REORDER FLAG : SKU-77732 — quantity is zero" },
  { icon: "📊", color: "text-[#D1D5DB]", text: "Summary → Clean: 2 | Reorder: 2 | Corrupt: 1" },
];

const treeNodes = [
  { label: "Read inventory row", color: "border-[#38bdf8]", bg: "bg-[#38bdf8]/10" },
  { label: "quantity == 0?", color: "border-[#f59e0b]", bg: "bg-[#f59e0b]/10" },
];

const branches = [
  { label: "YES → Flag for reorder", color: "text-[#f59e0b]" },
  { label: "NO → unit_cost < 0?", color: "text-[#9CA3AF]" },
];

const leafNodes = [
  { label: "Flag as corrupt", color: "text-[#ef4444]", border: "border-[#ef4444]/30" },
  { label: "Append to clean_rows", color: "text-[#22c55e]", border: "border-[#22c55e]/30" },
];

export default function W1Section4Loops() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.section ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} className="w-full flex flex-col gap-10 mb-24">
      <motion.div variants={fadeUp} className="flex flex-col gap-2">
        <h3 className="text-[#c084fc] text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          <span className="text-lg">📚</span> Core Concepts
        </h3>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Loops, Conditions &amp; Control Flow
        </h2>
      </motion.div>

      <motion.div variants={fadeUp} className="text-[#D1D5DB] text-base leading-relaxed space-y-4">
        <p>Loops and conditions are the decision engine of every pipeline. A loop says &ldquo;do this for every row.&rdquo; A condition says &ldquo;but only if this is true.&rdquo; Together they let you process thousands of inventory records with logic that would take a human hours to apply manually.</p>
      </motion.div>

      <motion.div variants={fadeUp} className="border-l-4 border-[#c084fc]/50 bg-[#c084fc]/5 pl-6 pr-4 py-4 rounded-r-lg text-[#D1D5DB] italic">
        Imagine a warehouse worker checking every box on a conveyor belt. For each box: if the label is damaged, put it in the reject pile. If the quantity is zero, flag it for reorder. Otherwise, shelve it. That manual process is exactly what a Python loop with conditions automates for your data files.
      </motion.div>

      {/* Decision Tree */}
      <motion.div variants={stagger} className="bg-[#0B111A] border border-[#253141] rounded-2xl p-6 md:p-8 shadow-2xl">
        <h4 className="text-[#9CA3AF] text-xs tracking-widest uppercase font-sans mb-6">Control Flow Decision Tree</h4>
        <div className="flex flex-col items-center gap-3">
          {treeNodes.map((n, i) => (
            <React.Fragment key={i}>
              <motion.div variants={nodeReveal} className={`px-5 py-2.5 rounded-lg border ${n.color} ${n.bg} text-[#D1D5DB] text-sm font-mono`}>
                {n.label}
              </motion.div>
              {i < treeNodes.length - 1 && (
                <motion.div variants={fadeUp} className="w-px h-6 bg-gradient-to-b from-[#38bdf8] to-[#f59e0b]" />
              )}
            </React.Fragment>
          ))}
          <motion.div variants={fadeUp} className="w-px h-4 bg-[#f59e0b]/40" />
          <div className="grid grid-cols-2 gap-8 w-full max-w-md">
            {branches.map((b, i) => (
              <motion.div key={i} variants={nodeReveal} className={`text-center text-xs font-mono ${b.color}`}>
                {b.label}
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-8 w-full max-w-md">
            {leafNodes.map((n, i) => (
              <motion.div key={i} variants={nodeReveal} className={`text-center px-4 py-2 rounded-lg border ${n.border} bg-[#141B23] text-sm font-mono ${n.color}`}>
                {n.label}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Code Block */}
      <motion.div variants={fadeUp} className="bg-[#0B111A] border border-[#253141] rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center gap-2 px-5 py-3 bg-[#141B23] border-b border-[#253141]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]/70" />
            <div className="w-3 h-3 rounded-full bg-[#eab308]/70" />
            <div className="w-3 h-3 rounded-full bg-[#22c55e]/70" />
          </div>
          <span className="text-[11px] font-mono text-[#6B7280] ml-2">inventory_processor.py</span>
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
        {/* Output */}
        <div className="border-t border-[#253141] bg-[#0a0f16]">
          <div className="px-5 py-2 text-[10px] font-mono text-[#6B7280] tracking-widest uppercase">Output</div>
          <motion.div variants={stagger} className="px-5 pb-4">
            {outputLines.map((line, i) => (
              <motion.div key={i} variants={rowReveal} className={`text-[13px] font-mono ${line.color} py-0.5`}>
                {line.icon} {line.text}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={scaleIn} className="border border-[#22c55e]/30 bg-[#22c55e]/5 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-[#22c55e]" />
            <h4 className="text-[#22c55e] font-bold text-sm uppercase tracking-wide">Pro Tip</h4>
          </div>
          <p className="text-[#D1D5DB] text-[13px] leading-relaxed">
            Always validate BEFORE you transform. In production pipelines, the order is: Read → Validate → Flag bad rows → Transform clean rows. Never transform first and validate after. Bad data that gets transformed becomes bad data that looks clean — the worst kind.
          </p>
        </motion.div>
        <motion.div variants={scaleIn} className="border border-[#ef4444]/30 bg-[#ef4444]/5 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-[#ef4444]" />
            <h4 className="text-[#ef4444] font-bold text-sm uppercase tracking-wide">Warning</h4>
          </div>
          <p className="text-[#D1D5DB] text-[13px] leading-relaxed">
            Watch for off-by-one errors in loops. If you use range(len(rows)) instead of iterating directly over the list, you&apos;re writing harder-to-read code with more bugs. In Python: always iterate over the collection directly — for row in rows — not by index.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
