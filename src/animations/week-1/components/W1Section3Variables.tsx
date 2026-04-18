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
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const rowReveal: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { ease: "easeOut" as const, duration: 0.3 } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { ease: "easeOut" as const, duration: 0.4 } },
};

const dtRows = [
  { type: "str", example: '"SKU-88821"', useCase: "Product IDs, names, labels" },
  { type: "int", example: "500", useCase: "Quantities, counts" },
  { type: "float", example: "12.75", useCase: "Prices, costs, ratios" },
  { type: "bool", example: "True / False", useCase: "is_active, is_late flags" },
  { type: "list", example: '["WH-01","WH-02"]', useCase: "Multiple warehouse IDs" },
  { type: "tuple", example: '("Bronze","Silver")', useCase: "Fixed layer names" },
  { type: "dict", example: '{"sku":"X","qty":500}', useCase: "A single order row" },
  { type: "None", example: "None", useCase: "Missing / null values" },
];

const codeLines = [
  { text: "# ── GlobalMart: Core Data Types in Action ──────────────", comment: true },
  { text: "", comment: false },
  { text: "# String — product identifier", comment: true },
  { text: 'sku = "SKU-88821"', comment: false },
  { text: 'warehouse_code = "WH-EAST-03"', comment: false },
  { text: "", comment: false },
  { text: "# Integer & Float — quantities and financials", comment: true },
  { text: "order_quantity = 500", comment: false },
  { text: "unit_cost      = 12.75", comment: false },
  { text: "total_cost     = order_quantity * unit_cost   # → 6375.0", comment: false },
  { text: "", comment: false },
  { text: "# Boolean — status flags", comment: true },
  { text: "is_active      = True", comment: false },
  { text: "is_late        = False", comment: false },
  { text: "", comment: false },
  { text: "# List — multiple warehouse IDs (ordered, mutable)", comment: true },
  { text: 'distribution_centers = ["WH-EAST-01", "WH-EAST-02",', comment: false },
  { text: '                        "WH-WEST-01", "WH-SOUTH-01"]', comment: false },
  { text: "", comment: false },
  { text: "# Tuple — fixed medallion layer names (immutable)", comment: true },
  { text: 'medallion_layers = ("bronze", "silver", "gold")', comment: false },
  { text: "", comment: false },
  { text: "# Dictionary — a single purchase order row", comment: true },
  { text: "purchase_order = {", comment: false },
  { text: '    "order_id"    : "PO-2024-00419",', comment: false },
  { text: '    "supplier_id" : "SUP-0042",', comment: false },
  { text: '    "sku"         : sku,', comment: false },
  { text: '    "quantity"    : order_quantity,', comment: false },
  { text: '    "unit_cost"   : unit_cost,', comment: false },
  { text: '    "total_cost"  : total_cost,', comment: false },
  { text: '    "warehouse"   : warehouse_code,', comment: false },
  { text: '    "is_received" : False', comment: false },
  { text: "}", comment: false },
  { text: "", comment: false },
  { text: "# None — missing supplier SLA data", comment: true },
  { text: "supplier_sla_days = None", comment: false },
  { text: "", comment: false },
  { text: 'print(f"Order {purchase_order[\'order_id\']} | "', comment: false },
  { text: '      f"Total: ${purchase_order[\'total_cost\']:,.2f}")', comment: false },
  { text: "# → Order PO-2024-00419 | Total: $6,375.00", comment: true },
];

export default function W1Section3Variables() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.section ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} className="w-full flex flex-col gap-10 mb-24">
      <motion.div variants={fadeUp} className="flex flex-col gap-2">
        <h3 className="text-[#c084fc] text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          <span className="text-lg">📚</span> Core Concepts
        </h3>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Variables, Datatypes &amp; Collections
        </h2>
      </motion.div>

      <motion.div variants={fadeUp} className="text-[#D1D5DB] text-base leading-relaxed space-y-4">
        <p>A variable is a named container for a value. In data engineering, variables hold everything from a single SKU code to an entire list of 50,000 product records. Python gives you four core collection types — lists, tuples, dicts, and sets — each with specific strengths for different data shapes.</p>
      </motion.div>

      {/* Analogy */}
      <motion.div variants={fadeUp} className="border-l-4 border-[#c084fc]/50 bg-[#c084fc]/5 pl-6 pr-4 py-4 rounded-r-lg text-[#D1D5DB] italic">
        Think of a Python dictionary like a row in a database table. The keys are the column names, the values are the cell data. When you later read a CSV file row-by-row, each row becomes a dictionary automatically — the mental model transfers perfectly.
      </motion.div>

      {/* Datatype Table */}
      <motion.div variants={stagger} className="overflow-x-auto rounded-xl border border-[#253141]">
        <table className="w-full text-sm">
          <thead className="bg-[#19222E] text-left">
            <tr>
              <th className="px-5 py-3 text-[11px] font-mono font-bold tracking-widest uppercase text-[#9CA3AF] border-b border-[#253141]">Type</th>
              <th className="px-5 py-3 text-[11px] font-mono font-bold tracking-widest uppercase text-[#9CA3AF] border-b border-[#253141]">Example</th>
              <th className="px-5 py-3 text-[11px] font-mono font-bold tracking-widest uppercase text-[#9CA3AF] border-b border-[#253141]">DE Use Case</th>
            </tr>
          </thead>
          <tbody>
            {dtRows.map((r, i) => (
              <motion.tr key={i} variants={rowReveal} className="border-b border-[#1e293b]/50 hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-3 text-[#c084fc] font-mono font-bold">{r.type}</td>
                <td className="px-5 py-3 text-[#22c55e] font-mono text-xs">{r.example}</td>
                <td className="px-5 py-3 text-[#9CA3AF]">{r.useCase}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Code Block */}
      <motion.div variants={fadeUp} className="bg-[#0B111A] border border-[#253141] rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center gap-2 px-5 py-3 bg-[#141B23] border-b border-[#253141]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ef4444]/70" />
            <div className="w-3 h-3 rounded-full bg-[#eab308]/70" />
            <div className="w-3 h-3 rounded-full bg-[#22c55e]/70" />
          </div>
          <span className="text-[11px] font-mono text-[#6B7280] ml-2">globalmart_datatypes.py</span>
        </div>
        <motion.div variants={stagger} className="p-5 overflow-x-auto">
          <pre className="text-[13px] leading-relaxed font-mono">
            {codeLines.map((line, i) => (
              <motion.div key={i} variants={rowReveal} className={line.comment ? "text-[#4b5563]" : "text-[#D1D5DB]"}>
                {line.text || "\u00A0"}
              </motion.div>
            ))}
          </pre>
        </motion.div>
      </motion.div>

      {/* Callouts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={scaleIn} className="border border-[#22c55e]/30 bg-[#22c55e]/5 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-[#22c55e]" />
            <h4 className="text-[#22c55e] font-bold text-sm uppercase tracking-wide">Pro Tip</h4>
          </div>
          <p className="text-[#D1D5DB] text-[13px] leading-relaxed">
            Always store monetary values as float, not string. &apos;12.75&apos; looks like a number but Python can&apos;t do math on it. This is one of the top 3 bugs in beginner data pipelines — a price field that accidentally got stored as a string and silently broke every calculation downstream.
          </p>
        </motion.div>
        <motion.div variants={scaleIn} className="border border-[#ef4444]/30 bg-[#ef4444]/5 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-[#ef4444]" />
            <h4 className="text-[#ef4444] font-bold text-sm uppercase tracking-wide">Warning</h4>
          </div>
          <p className="text-[#D1D5DB] text-[13px] leading-relaxed">
            Lists are mutable — you can change them after creation. Tuples are immutable — you cannot. Never store pipeline layer names or config constants in lists. Use tuples. Accidental mutation of config data causes silent, catastrophic bugs in production pipelines.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
