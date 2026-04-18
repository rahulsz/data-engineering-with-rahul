"use client";

import React from "react";
import CurriculumLab from "@/components/curriculum/CurriculumLab";
import { Beaker, CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export default function W1Section10Lab() {
  const taskData = [
    {
      title: "Create Jira Story GDP-12",
      steps: [
        "Write full User Story + 5 Acceptance Criteria",
        "Add to current sprint",
        "Set status to IN PROGRESS",
      ],
    },
    {
      title: "Create branch: feature/GDP-12-inventory-csv-reader",
      steps: [
        "git checkout -b feature/GDP-12-inventory-csv-reader",
      ],
    },
    {
      title: "Create sample dataset: data/raw/inventory.csv",
      steps: [
        "Add header: sku,product_name,category,quantity,unit_cost",
        "Add 6 rows including zero-quantity and negative cost rows",
      ],
    },
    {
      title: "Write: notebooks/week-01/inventory_csv_reader.py",
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
      steps: [
        'git add notebooks/week-01/inventory_csv_reader.py',
        'git commit -m "feat(week-1): add inventory CSV reader with reorder flagging  Refs: GDP-12"',
        "git push origin feature/GDP-12-inventory-csv-reader",
      ],
    },
    {
      title: "Challenge: Git-Tracked Orders Processor (GDP-13)",
      challenge: true,
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
    { icon: <CheckCircle2 className="w-3.5 h-3.5 inline" />, color: "text-[#22c55e]", text: "CLEAN       : SKU-88821 — qty=120, cost=$450.00" },
    { icon: <AlertTriangle className="w-3.5 h-3.5 inline" />, color: "text-[#f59e0b]", text: " REORDER    : SKU-32201 — quantity is zero" },
    { icon: <XCircle className="w-3.5 h-3.5 inline" />, color: "text-[#ef4444]", text: "SKIPPED     : SKU-11043 — negative unit_cost" },
    { icon: <CheckCircle2 className="w-3.5 h-3.5 inline" />, color: "text-[#22c55e]", text: "CLEAN       : SKU-55509 — qty=310, cost=$78.00" },
    { icon: <AlertTriangle className="w-3.5 h-3.5 inline" />, color: "text-[#f59e0b]", text: " REORDER    : SKU-77732 — quantity is zero" },
    { icon: <CheckCircle2 className="w-3.5 h-3.5 inline" />, color: "text-[#22c55e]", text: "CLEAN       : SKU-99001 — qty=88, cost=$22.00" },
  ];

  return (
    <CurriculumLab
      badgeText="Hands-On Lab"
      badgeIcon={<Beaker className="w-5 h-5" />}
      title="Lab 1: Inventory CSV Reader + Git-Tracked Order Processor"
      objective={<><span className="font-bold text-[#38bdf8]">Objective:</span> Build two Python scripts, commit both to GitHub following professional conventions, and link every commit to a Jira ticket.</>}
      duration="3–4 hours"
      tasks={taskData}
    >
      <div className="bg-[#0B111A] border border-[#253141] rounded-2xl p-5 shadow-lg mt-8">
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
      </div>
    </CurriculumLab>
  );
}
