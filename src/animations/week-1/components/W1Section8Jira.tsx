"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Lightbulb, AlertTriangle, ClipboardList } from "lucide-react";

const fadeUp: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: 0.4 } } };
const stagger: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const scaleIn: Variants = { hidden: { opacity: 0, scale: 0.97 }, visible: { opacity: 1, scale: 1, transition: { ease: "easeOut" as const, duration: 0.4 } } };
const popIn: Variants = { hidden: { opacity: 0, y: 20, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 200, damping: 20 } } };
const colSlideUp: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 200, damping: 22 } } };

const stories = [
  {
    id: "GDP-12", title: "Inventory CSV Reader",
    asA: "supply chain analyst at GlobalMart",
    iWant: "a Python script that reads the daily inventory CSV snapshot and flags zero-quantity SKUs",
    soThat: "I can trigger reorder workflows before stockouts occur",
    criteria: [
      "Script reads inventory_snapshot_YYYY_MM_DD.csv",
      "Zero-quantity SKUs written to reorder_flags.json",
      "Clean rows written to inventory_clean.csv",
      "Script runs without errors on sample dataset",
      "Code committed to feature/GDP-12 branch",
    ],
  },
  {
    id: "GDP-13", title: "Git-Tracked Repository",
    asA: "data engineer on the GlobalMart team",
    iWant: "a Git-tracked project repository with a clear folder structure for all pipeline code",
    soThat: "the team can collaborate without conflicts and all changes have a full audit trail",
    criteria: [
      "Repo created: globalmart-data-platform (private)",
      "Folders: notebooks/ src/ tests/ docs/ config/",
      "README.md documents project purpose and structure",
      "First commit references GDP-13",
      "Branch protection enabled on main",
    ],
  },
];

const kanbanColumns = [
  { title: "TO DO", tickets: ["GDP-14", "GDP-15"], color: "border-[#6B7280]" },
  { title: "IN PROGRESS", tickets: ["GDP-13"], color: "border-[#38bdf8]" },
  { title: "IN REVIEW", tickets: ["GDP-12"], color: "border-[#f59e0b]" },
  { title: "DONE", tickets: ["GDP-11", "GDP-10"], color: "border-[#22c55e]" },
];

export default function W1Section8Jira() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.section ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} className="w-full flex flex-col gap-10 mb-24">
      <motion.div variants={fadeUp} className="flex flex-col gap-2">
        <h3 className="text-[#c084fc] text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          <ClipboardList className="w-4 h-4" /> Jira &amp; Agile
        </h3>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Jira — User Stories &amp; Sprint Boards
        </h2>
      </motion.div>

      <motion.div variants={fadeUp} className="text-[#D1D5DB] text-base leading-relaxed">
        <p>A User Story is a one-sentence description of a feature from the perspective of the person who needs it. It forces you to answer three questions before writing a single line of code: Who needs this? What do they need? Why do they need it?</p>
      </motion.div>

      {/* Formula Card */}
      <motion.div variants={popIn} className="bg-[#141B23] border border-[#c084fc]/30 rounded-xl p-6 text-center">
        <motion.div variants={stagger} className="flex flex-col gap-3 text-lg font-mono">
          <motion.div variants={fadeUp} className="text-[#c084fc]">AS A <span className="text-[#9CA3AF]">[role]</span></motion.div>
          <motion.div variants={fadeUp} className="text-[#38bdf8]">I WANT <span className="text-[#9CA3AF]">[capability or feature]</span></motion.div>
          <motion.div variants={fadeUp} className="text-[#22c55e]">SO THAT <span className="text-[#9CA3AF]">[business outcome or value]</span></motion.div>
        </motion.div>
      </motion.div>

      {/* Story Cards */}
      <motion.div variants={stagger} className="flex flex-col gap-6">
        {stories.map((story) => (
          <motion.div key={story.id} variants={popIn} className="bg-[#0B111A] border border-[#253141] rounded-2xl overflow-hidden shadow-lg group hover:border-[#374151] transition-colors">
            <div className="flex items-center gap-3 px-5 py-3 bg-[#141B23] border-b border-[#253141]">
              <span className="text-[11px] font-mono font-bold text-[#c084fc] bg-[#c084fc]/10 border border-[#c084fc]/30 px-2 py-0.5 rounded">{story.id}</span>
              <span className="text-white font-bold text-sm">{story.title}</span>
            </div>
            <div className="p-5 space-y-2">
              <p className="text-[#D1D5DB] text-sm"><span className="text-[#c084fc] font-bold">AS A</span> {story.asA}</p>
              <p className="text-[#D1D5DB] text-sm"><span className="text-[#38bdf8] font-bold">I WANT</span> {story.iWant}</p>
              <p className="text-[#D1D5DB] text-sm"><span className="text-[#22c55e] font-bold">SO THAT</span> {story.soThat}</p>
              <div className="mt-4 pt-3 border-t border-[#1e293b]">
                <p className="text-[10px] font-mono text-[#6B7280] tracking-widest uppercase mb-2">Acceptance Criteria</p>
                {story.criteria.map((c, i) => (
                  <div key={i} className="flex items-start gap-2 py-1 text-[#9CA3AF] text-xs">
                    <span className="text-[#6B7280] shrink-0">☐</span> {c}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Kanban Board */}
      <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kanbanColumns.map((col) => (
          <motion.div key={col.title} variants={colSlideUp} className={`border ${col.color} bg-[#141B23] rounded-xl p-4 flex flex-col gap-3`}>
            <h5 className="text-[#9CA3AF] text-[10px] font-mono font-bold tracking-widest uppercase">{col.title}</h5>
            <div className="flex flex-col gap-2">
              {col.tickets.map((t) => (
                <motion.div key={t} variants={popIn} className="bg-[#0B111A] border border-[#253141] rounded-lg px-3 py-2 text-xs font-mono text-[#c084fc] hover:border-[#c084fc]/40 transition-colors cursor-default">
                  {t}
                </motion.div>
              ))}
            </div>
          </motion.div>
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
            Write Acceptance Criteria before you start coding, not after. ACs are your definition of done. If you don&apos;t know what done looks like before you start, you&apos;ll either over-build or under-build.
          </p>
        </motion.div>
        <motion.div variants={scaleIn} className="border border-[#ef4444]/30 bg-[#ef4444]/5 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-[#ef4444]" />
            <h4 className="text-[#ef4444] font-bold text-sm uppercase tracking-wide">Warning</h4>
          </div>
          <p className="text-[#D1D5DB] text-[13px] leading-relaxed">
            User Stories are not technical tasks. &ldquo;Write a for loop to process CSV rows&rdquo; is a task. &ldquo;As a supply chain analyst, I want daily stockout flags so I can trigger reorders&rdquo; is a User Story. Tasks live inside stories as sub-tasks.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
