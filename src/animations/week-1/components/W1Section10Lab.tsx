"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import { CheckCircle2, ChevronRight, Check } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const fadeUp: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: 0.5 } } };
const staggerCards: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } };

const taskData = [
  {
    title: "Create Jira Story GDP-12",
    project: 1,
    steps: [
      "Write full User Story + 5 Acceptance Criteria",
      "Add to current sprint",
      "Set status to IN PROGRESS",
    ],
  },
  {
    title: "Create branch: feature/GDP-12-inventory-csv-reader",
    project: 1,
    steps: [
      "git checkout -b feature/GDP-12-inventory-csv-reader",
    ],
  },
  {
    title: "Create sample dataset: data/raw/inventory.csv",
    project: 1,
    steps: [
      "Add header: sku,product_name,category,quantity,unit_cost",
      "Add 6 rows including zero-quantity and negative cost rows",
    ],
  },
  {
    title: "Write: notebooks/week-01/inventory_csv_reader.py",
    project: 1,
    steps: [
      "Read inventory.csv with csv.DictReader",
      "Skip rows with negative unit_cost",
      "Flag rows with quantity == 0 to reorder_flags.json",
      "Write valid rows to inventory_clean.csv",
      "Print summary: clean / flagged / skipped counts",
    ],
  },
  {
    title: "Commit & push with proper message",
    project: 1,
    steps: [
      'git add notebooks/week-01/inventory_csv_reader.py',
      'git commit -m "feat(week-1): add inventory CSV reader with reorder flagging  Refs: GDP-12"',
      "git push origin feature/GDP-12-inventory-csv-reader",
    ],
  },
  {
    title: "Challenge: Git-Tracked Orders Processor (GDP-13)",
    project: 2,
    steps: [
      "Create: data/raw/purchase_orders.json",
      "Write: notebooks/week-01/orders_processor.py",
      "Read JSON file with json.load()",
      "Calculate total_cost = quantity × unit_cost",
      "Classify: HIGH_VALUE (>10k), STANDARD (>1k), SMALL",
      "Write classified orders to orders_classified.json",
      "Commit with proper message referencing GDP-13",
    ],
  },
];

const expectedOutput = [
  { icon: "✅", color: "text-[#22c55e]", text: "CLEAN       : SKU-88821 — qty=120, cost=$450.00" },
  { icon: "⚠️", color: "text-[#f59e0b]", text: " REORDER    : SKU-32201 — quantity is zero" },
  { icon: "❌", color: "text-[#ef4444]", text: "SKIPPED     : SKU-11043 — negative unit_cost" },
  { icon: "✅", color: "text-[#22c55e]", text: "CLEAN       : SKU-55509 — qty=310, cost=$78.00" },
  { icon: "⚠️", color: "text-[#f59e0b]", text: " REORDER    : SKU-77732 — quantity is zero" },
  { icon: "✅", color: "text-[#22c55e]", text: "CLEAN       : SKU-99001 — qty=88, cost=$22.00" },
];

export default function W1Section10Lab() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { width, height } = useWindowSize();

  const [tasks, setTasks] = useState<boolean[]>(new Array(taskData.length).fill(false));
  const [showConfetti, setShowConfetti] = useState(false);

  const completedCount = tasks.filter(Boolean).length;
  const progressPercent = (completedCount / tasks.length) * 100;

  useEffect(() => {
    if (completedCount === tasks.length && completedCount > 0) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(t);
    }
  }, [completedCount, tasks.length]);

  const toggleTask = (i: number) => {
    const next = [...tasks];
    next[i] = !next[i];
    setTasks(next);
  };

  return (
    <motion.section ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} className="w-full flex flex-col gap-10 mt-16 mb-24 relative">
      {showConfetti && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          <Confetti width={width} height={height} numberOfPieces={300} gravity={0.15} colors={["#F97316","#22c55e","#38bdf8","#a855f7","#facc15"]} />
        </div>
      )}

      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col gap-3 bg-[#1A232E] border border-[#253141] p-6 lg:p-8 rounded-2xl shadow-xl">
        <h3 className="text-[#22c55e] text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          <span className="text-xl">🧪</span> Hands-On Lab
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
          Lab 1: Inventory CSV Reader + Git-Tracked Order Processor
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-[#D1D5DB] text-sm leading-relaxed">
          <div className="flex-1">
            <span className="font-bold text-[#38bdf8]">Objective:</span> Build two Python scripts, commit both to GitHub following professional conventions, and link every commit to a Jira ticket.
          </div>
          <div className="px-4 py-2 bg-[#0F151B] border border-[#253141] rounded-lg shrink-0 font-mono text-[#F97316] font-bold">
            ⏱ Duration: 3–4 hours
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-mono tracking-widest uppercase text-[#9CA3AF]">Lab Progress</span>
            <span className={`text-xs font-bold ${progressPercent === 100 ? "text-[#22c55e]" : "text-[#F97316]"}`}>{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-3 bg-[#0F151B] rounded-full overflow-hidden border border-[#253141]">
            <motion.div
              className={`h-full ${progressPercent === 100 ? "bg-gradient-to-r from-[#22c55e] to-[#4ade80]" : "bg-gradient-to-r from-[#F97316] to-[#fb923c]"}`}
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeOut" as const }}
            />
          </div>
          <AnimatePresence>
            {progressPercent === 100 && (
              <motion.div initial={{ opacity: 0, y: -10, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="mt-3 flex items-center justify-center gap-2 text-[#22c55e] font-bold tracking-wide">
                <CheckCircle2 className="w-5 h-5" /> Lab Complete!
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Task Cards */}
      <motion.div variants={staggerCards} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {taskData.map((task, idx) => (
          <motion.div
            variants={fadeUp}
            key={idx}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col ${tasks[idx] ? "bg-[#22c55e]/5 border-[#22c55e]/30" : "bg-[#141B23] border-[#253141]"}`}
          >
            <button
              onClick={() => toggleTask(idx)}
              className={`w-full flex items-center gap-4 p-5 border-b transition-colors text-left ${tasks[idx] ? "border-[#22c55e]/30 bg-[#22c55e]/10 hover:bg-[#22c55e]/20" : "border-[#253141] bg-[#1A232E] hover:bg-[#1f2937]"}`}
            >
              <div className={`w-6 h-6 shrink-0 rounded flex items-center justify-center border transition-all ${tasks[idx] ? "bg-[#22c55e] border-[#22c55e]" : "bg-transparent border-[#4B5563]"}`}>
                {tasks[idx] && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
              </div>
              <div className="flex-1">
                <div className={`text-xs font-mono font-bold uppercase tracking-widest mb-1 ${tasks[idx] ? "text-[#22c55e]" : "text-[#9CA3AF]"}`}>
                  Task {idx + 1} {idx === 5 && "(Challenge)"}
                </div>
                <h4 className={`font-bold text-sm ${tasks[idx] ? "text-white/70 line-through" : "text-white"}`}>{task.title}</h4>
              </div>
            </button>
            <div className={`p-5 flex-1 ${tasks[idx] ? "opacity-50" : "opacity-100"}`}>
              <ul className="space-y-2">
                {task.steps.map((step, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-[#6B7280] shrink-0 mt-0.5" />
                    <span className="text-[#D1D5DB] text-xs leading-snug font-mono">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Expected Output */}
      <motion.div variants={fadeUp} className="bg-[#0B111A] border border-[#253141] rounded-2xl p-5 shadow-lg">
        <h4 className="text-[#9CA3AF] text-xs tracking-widest uppercase font-mono mb-4">Expected Output (Project 1)</h4>
        <div className="font-mono text-[13px] space-y-1">
          {expectedOutput.map((line, i) => (
            <div key={i} className={line.color}>{line.icon} {line.text}</div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-[#253141] text-[#D1D5DB] text-xs font-mono space-y-1">
          <div>Clean rows    : 3  → written to inventory_clean.csv</div>
          <div>Reorder flags : 2  → written to reorder_flags.json</div>
          <div>Skipped rows  : 1  → logged, not written</div>
        </div>
      </motion.div>
    </motion.section>
  );
}
