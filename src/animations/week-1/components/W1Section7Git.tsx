"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Lightbulb, AlertTriangle, GitBranch, XCircle, CheckCircle2 } from "lucide-react";

const fadeUp: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: 0.4 } } };
const stagger: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const scaleIn: Variants = { hidden: { opacity: 0, scale: 0.97 }, visible: { opacity: 1, scale: 1, transition: { ease: "easeOut" as const, duration: 0.4 } } };
const popIn: Variants = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 260, damping: 20 } } };
const slideFromLeft: Variants = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0, transition: { ease: "easeOut" as const, duration: 0.5 } } };
const slideFromRight: Variants = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { ease: "easeOut" as const, duration: 0.5 } } };

const gitSteps = [
  { cmd: "git status", desc: "See what files have changed since last commit" },
  { cmd: "git pull origin main", desc: "Fetch latest changes from GitHub before you start" },
  { cmd: "git checkout -b feature/GDP-12-inventory-csv-reader", desc: "Create a new branch for your task (named after Jira ticket)" },
  { cmd: "git add src/transformations/product_utils.py", desc: "Stage the specific file(s) you want to commit" },
  { cmd: 'git commit -m "feat(week-1): add CSV inventory reader pipeline\\n  Refs: GDP-12"', desc: "Commit with a meaningful message + Jira ticket reference" },
  { cmd: "git push origin feature/GDP-12-inventory-csv-reader", desc: "Push branch to GitHub → open Pull Request for review" },
];

const commitAnatomy = [
  { label: "TYPE", value: "feat / fix / refactor / docs / chore", color: "text-[#c084fc]" },
  { label: "SCOPE", value: "week-1 / silver / gold / pipeline", color: "text-[#38bdf8]" },
  { label: "DESC", value: "short imperative description", color: "text-[#22c55e]" },
  { label: "REF", value: "Refs: GDP-12  ← always link your ticket", color: "text-[#F97316]" },
];

const badCommits = ['"fixed stuff"', '"wip"', '"test"', '"asdfjkl"', '"final"', '"FINAL FINAL USE THIS ONE"'];
const goodCommits = [
  '"fix(silver): handle null supplier_id — GDP-17"',
  '"feat(week-1): add inventory CSV reader"',
  '"docs: add README for product_utils module"',
];

export default function W1Section7Git() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.section ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} className="w-full flex flex-col gap-10 mb-24">
      <motion.div variants={fadeUp} className="flex flex-col gap-2">
        <h3 className="text-[#F97316] text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          <GitBranch className="w-4 h-4" /> Git Fundamentals
        </h3>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
          Git — Your Daily Work Routine
        </h2>
      </motion.div>

      <motion.div variants={fadeUp} className="text-[#D1D5DB] text-base leading-relaxed">
        <p>Git is a version control system that tracks every change you make to every file in your project. It lets you rewind to any previous state, work on experimental features without breaking the main codebase, and collaborate with teammates without overwriting each other&apos;s work.</p>
      </motion.div>

      <motion.div variants={fadeUp} className="border-l-4 border-[#F97316]/50 bg-[#F97316]/5 pl-6 pr-4 py-4 rounded-r-lg text-[#D1D5DB] italic">
        Think of Git like a time machine for your code. Every commit is a checkpoint you can teleport back to. Every branch is a parallel timeline where you can experiment. Every merge is timelines reuniting.
      </motion.div>

      {/* 6-Command Workflow */}
      <motion.div variants={stagger} className="bg-[#0B111A] border border-[#253141] rounded-2xl p-6 md:p-8 shadow-2xl">
        <h4 className="text-[#9CA3AF] text-xs tracking-widest uppercase font-sans mb-6">Daily Git Routine — 6 Commands</h4>
        <div className="flex flex-col gap-5">
          {gitSteps.map((step, i) => (
            <motion.div key={i} variants={popIn} className="flex gap-4 items-start group">
              <div className="w-8 h-8 rounded-full bg-[#141B23] border-2 border-[#253141] flex items-center justify-center font-bold text-[#F97316] text-sm shrink-0 group-hover:border-[#F97316] transition-colors">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-[#141B23] border border-[#253141] rounded-lg px-4 py-2.5 mb-1.5 overflow-x-auto">
                  <code className="text-[#38bdf8] text-[13px] font-mono whitespace-nowrap">$ {step.cmd}</code>
                </div>
                <p className="text-[#6B7280] text-xs pl-1">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Commit Anatomy */}
      <motion.div variants={fadeUp} className="bg-[#141B23] border border-[#253141] rounded-xl p-5">
        <h4 className="text-[#9CA3AF] text-xs tracking-widest uppercase font-sans mb-4">Commit Message Anatomy</h4>
        <div className="bg-[#0B111A] rounded-lg p-4 mb-4">
          <code className="text-[#D1D5DB] text-sm font-mono">feat(week-1): add CSV inventory reader pipeline</code>
        </div>
        <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {commitAnatomy.map((item, i) => (
            <motion.div key={i} variants={popIn} className="flex items-center gap-2 text-xs">
              <span className={`font-mono font-bold ${item.color} bg-[#0B111A] px-2 py-0.5 rounded`}>{item.label}</span>
              <span className="text-[#9CA3AF]">{item.value}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Good vs Bad Commits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={slideFromLeft} className="border border-[#ef4444]/30 bg-[#141B23] rounded-xl p-5">
          <h4 className="text-[#ef4444] font-bold text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
            <XCircle className="w-4 h-4" /> Bad Commits
          </h4>
          <div className="flex flex-col gap-2">
            {badCommits.map((c, i) => (
              <div key={i} className="text-[#9CA3AF] text-[13px] font-mono line-through decoration-[#ef4444]/50">{c}</div>
            ))}
          </div>
        </motion.div>
        <motion.div variants={slideFromRight} className="border border-[#22c55e]/30 bg-[#141B23] rounded-xl p-5">
          <h4 className="text-[#22c55e] font-bold text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> Good Commits
          </h4>
          <div className="flex flex-col gap-2">
            {goodCommits.map((c, i) => (
              <div key={i} className="text-[#22c55e] text-[13px] font-mono">{c}</div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Branch Diagram */}
      <motion.div variants={fadeUp} className="bg-[#0B111A] border border-[#253141] rounded-xl p-5 overflow-x-auto">
        <h4 className="text-[#9CA3AF] text-xs tracking-widest uppercase font-sans mb-4">Branching Strategy</h4>
        <div className="flex flex-col gap-4 min-w-[400px]">
          {/* main branch */}
          <div className="flex items-center gap-1">
            <span className="text-[#22c55e] font-mono font-bold text-xs w-12 shrink-0">main</span>
            <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-[#22c55e] to-[#22c55e]/60 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#22c55e] border-2 border-[#0B111A]" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#22c55e] border-2 border-[#0B111A]" />
            </div>
            <span className="text-[#22c55e] text-xs">▶</span>
          </div>
          {/* branch split */}
          <div className="flex items-center gap-1 pl-12 ml-8">
            <span className="text-[#c084fc] font-mono text-[10px] w-auto shrink-0">feature/GDP-12</span>
            <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-[#c084fc] to-[#c084fc]/40 relative">
              <div className="absolute left-[20%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#c084fc]" />
              <div className="absolute left-[50%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#c084fc]" />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[#c084fc] text-[10px]">PR → merge ↑</div>
            </div>
          </div>
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
            Commit early, commit often. A commit every 30–60 minutes of work is healthy. Small commits are easier to review, easier to revert, and create a clearer history.
          </p>
        </motion.div>
        <motion.div variants={scaleIn} className="border border-[#ef4444]/30 bg-[#ef4444]/5 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-[#ef4444]" />
            <h4 className="text-[#ef4444] font-bold text-sm uppercase tracking-wide">Warning</h4>
          </div>
          <p className="text-[#D1D5DB] text-[13px] leading-relaxed">
            Never commit directly to main. Always work on a feature branch. In professional teams, main is protected — direct pushes are blocked at the GitHub level.
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
}
