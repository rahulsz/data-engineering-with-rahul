"use client";

import { motion, Variants } from "framer-motion";
import { Calendar, Zap, Clock, Terminal, GitBranch, ClipboardList } from "lucide-react";

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

      <div className="w-full">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="p-8 md:p-10 lg:p-12">
          <motion.div variants={slideDown} className="inline-flex items-center gap-2 mb-8 bg-[#0d1a2e] text-[#38bdf8] border border-[#38bdf8]/30 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase">
            <Zap className="w-3 h-3 fill-current" /> PHASE 1 — DATA ENGINEERING FOUNDATIONS
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
            {[
              { icon: <Calendar className="w-3.5 h-3.5" />, text: "Week 1" },
              { icon: <Zap className="w-3.5 h-3.5 text-green-400" />, text: "Beginner" },
              { icon: <Clock className="w-3.5 h-3.5" />, text: "8–10 Hours" },
              { icon: <Terminal className="w-3.5 h-3.5 text-blue-400" />, text: "Python" },
              { icon: <GitBranch className="w-3.5 h-3.5 text-orange-400" />, text: "Git" },
              { icon: <ClipboardList className="w-3.5 h-3.5 text-white" />, text: "Jira" },
            ].map((pill, i) => (
              <motion.div key={i} variants={scaleIn} className="px-3 py-1.5 rounded-md bg-[#1A232E] border border-[#2A3645] text-[#D1D5DB] text-[13px] font-medium flex items-center gap-2 shadow-sm">
                {pill.icon}
                {pill.text}
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
      </div>
    </div>
  );
}
