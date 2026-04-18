"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { Download, CheckCircle2 } from "lucide-react";

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const slideDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 28 } },
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 260, damping: 28 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: 0.4 } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 260, damping: 28 } },
};

export default function W1Section1Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const circ = 2 * Math.PI * 38;

  return (
    <div className="relative w-full rounded-2xl border border-[#253141] bg-[#0F151B] mb-16 isolate">
      <motion.div
        animate={{ opacity: [0.04, 0.07, 0.04] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#38bdf8] rounded-full blur-[120px] -z-10 mix-blend-screen translate-x-1/3 -translate-y-1/3 pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.04, 0.07, 0.04] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const, delay: 2 }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F97316] rounded-full blur-[100px] -z-10 mix-blend-screen -translate-x-1/3 translate-y-1/3 pointer-events-none"
      />

      <div className="grid grid-cols-1 md:grid-cols-[1fr_260px] gap-0 min-h-[420px]">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="p-8 md:p-10 lg:p-12">
          <motion.div variants={slideDown} className="inline-flex items-center gap-2 mb-8 bg-[#0d1a2e] text-[#38bdf8] border border-[#38bdf8]/30 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase">
            ⚡ PHASE 1 — DATA ENGINEERING FOUNDATIONS
          </motion.div>

          <div className="flex items-start gap-4 mb-5">
            <motion.div variants={slideLeft} className="text-[#F97316] text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter shrink-0 leading-none mt-1">
              W1
            </motion.div>
            <div className="flex flex-col">
              <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-white leading-tight mb-3">
                Python Basics + Git + Jira
              </motion.h1>
              <motion.p variants={fadeUp} className="text-[#9CA3AF] text-base sm:text-lg leading-relaxed max-w-2xl">
                Every data pipeline ever written started with someone opening a Python file. This is where yours begins.
              </motion.p>
            </div>
          </div>

          <motion.div variants={stagger} className="flex flex-wrap gap-2 mt-6">
            {["📅 Week 1", "🟢 Beginner", "⏱ 8–10 Hours", "🐍 Python", "🔀 Git", "📋 Jira"].map((pill, i) => (
              <motion.div key={i} variants={scaleIn} className="px-3 py-1.5 rounded-md bg-[#1A232E] border border-[#2A3645] text-[#D1D5DB] text-[13px] font-medium flex items-center shadow-sm">
                {pill}
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-6">
            <p className="text-[11px] font-mono tracking-widest text-[#6B7280] uppercase mb-3">Topics Covered</p>
            <motion.div variants={stagger} className="flex flex-wrap gap-2">
              {["Variables & Datatypes", "Lists, Tuples, Dicts", "Loops & Conditions", "Functions", "File Handling", "Git Fundamentals", "Jira User Stories"].map((t, i) => (
                <motion.span key={i} variants={scaleIn} className="px-3 py-1.5 rounded bg-[#1C2532]/60 text-[#9CA3AF] text-xs cursor-pointer hover:bg-[#F97316]/10 hover:text-[#F97316] transition-colors whitespace-nowrap">
                  {t}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" as const }}
          className="flex flex-col items-center justify-center gap-4 p-8 bg-[#141B23]/80 backdrop-blur-xl border-l border-[#253141] rounded-r-2xl"
        >
          <div className="relative w-24 h-24">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="38" fill="transparent" stroke="#1A232E" strokeWidth="8" />
              <motion.circle
                cx="50" cy="50" r="38" fill="transparent" stroke="url(#w1Grad)" strokeWidth="8" strokeLinecap="round"
                initial={{ strokeDasharray: circ, strokeDashoffset: circ }}
                animate={mounted ? { strokeDashoffset: circ } : {}}
                transition={{ duration: 1.2, ease: "easeOut" as const, delay: 0.5 }}
              />
              <defs>
                <linearGradient id="w1Grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#F97316" />
                  <stop offset="100%" stopColor="#fb923c" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold text-white">0%</span>
              <span className="text-[10px] text-[#6B7280] font-mono tracking-wider uppercase">Complete</span>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <button className="w-full py-2.5 px-4 rounded-lg bg-[#253141] text-[#D1D5DB] hover:bg-[#2A3645] hover:text-white transition-all flex items-center justify-center gap-2 text-sm font-semibold group cursor-not-allowed opacity-70" onClick={(e) => e.preventDefault()}>
              <CheckCircle2 className="w-4 h-4 text-[#6B7280] group-hover:text-green-400 transition-colors" />
              Mark Complete
            </button>
            <button className="w-full py-2.5 px-4 rounded-lg bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/20 hover:bg-[#F97316]/20 transition-all flex items-center justify-center gap-2 text-sm font-semibold active:scale-[0.98]">
              <Download className="w-4 h-4" />
              Download Notes
            </button>
          </div>
          <div className="w-full grid grid-cols-2 gap-2 pt-2 border-t border-[#253141] mt-2">
            {[{ label: "Duration", value: "8–10 hrs" }, { label: "Sections", value: "13" }].map(({ label, value }) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-white font-bold text-sm">{value}</span>
                <span className="text-[#6B7280] text-[10px] font-mono tracking-widest uppercase">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
