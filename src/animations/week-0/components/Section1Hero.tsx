"use client";

import { motion, Variants } from "framer-motion";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
};

const slideDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 28 } }
};

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 260, damping: 28 } }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: 0.4 } }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 260, damping: 28 } }
};

export default function Section1Hero() {

  return (
    <div className="relative w-full rounded-2xl border border-[#253141] bg-[#0F151B] mb-16 isolate">
      {/* Background Glows */}
      <motion.div
        animate={{ opacity: [0.04, 0.07, 0.04] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F97316] rounded-full blur-[120px] -z-10 mix-blend-screen translate-x-1/3 -translate-y-1/3 pointer-events-none"
      />
      <motion.div
        animate={{ opacity: [0.04, 0.07, 0.04] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const, delay: 2 }}
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#06b6d4] rounded-full blur-[100px] -z-10 mix-blend-screen -translate-x-1/3 translate-y-1/3 pointer-events-none"
      />

      {/* Main Grid — two columns at md+, single column below */}
      <div className="w-full min-h-[400px]">

        {/* ── Left: Content ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="p-8 md:p-10 lg:p-12"
        >
          {/* Phase Badge */}
          <motion.div
            variants={slideDown}
            className="inline-flex items-center gap-2 mb-8 bg-[#211713] text-[#F97316] border border-[#F97316]/30 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase"
          >
            ⚡ PHASE 0 — ORIENTATION
          </motion.div>

          {/* W0 + Title row */}
          <div className="flex items-start gap-4 mb-5">
            <motion.div
              variants={slideLeft}
              className="text-[#F97316] text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter shrink-0 leading-none mt-1"
            >
              W0
            </motion.div>
            <div className="flex flex-col">
              <motion.h1
                variants={fadeUp}
                className="text-3xl sm:text-4xl lg:text-[44px] font-bold tracking-tight text-white leading-tight mb-3"
              >
                Setting the Stage
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-[#9CA3AF] text-base sm:text-lg leading-relaxed max-w-2xl"
              >
                Before you write a single line of code, you need to understand the battlefield. This is Day&nbsp;1.
              </motion.p>
            </div>
          </div>

          {/* Meta Pills */}
          <motion.div variants={staggerContainer} className="flex flex-wrap gap-2 mt-6">
            {["📅 Day 1 Only", "🟢 Beginner", "⏱ 3–4 Hours", "🛠 Databricks CE"].map((pill, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                className="px-3 py-1.5 rounded-md bg-[#1A232E] border border-[#2A3645] text-[#D1D5DB] text-[13px] font-medium flex items-center shadow-sm"
              >
                {pill}
              </motion.div>
            ))}
          </motion.div>

          {/* Topics */}
          <div className="mt-6">
            <p className="text-[11px] font-mono tracking-widest text-[#6B7280] uppercase mb-3">Topics Covered</p>
            <motion.div variants={staggerContainer} className="flex flex-wrap gap-2">
              {["Intro to DE", "Supply Chain", "Databricks Setup", "Course Structure", "Capstone Overview"].map((topic, i) => (
                <motion.span
                  key={i}
                  variants={scaleIn}
                  className="px-3 py-1.5 rounded bg-[#1C2532]/60 text-[#9CA3AF] text-xs cursor-pointer hover:bg-[#F97316]/10 hover:text-[#F97316] transition-colors whitespace-nowrap"
                >
                  {topic}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
