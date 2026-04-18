"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Home, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Section10Navigation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: 0.5 } }
  };

  return (
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full flex mt-24 mb-10 border-t border-[#1C2532] pt-12"
      variants={fadeUp}
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        {/* Left - Disabled Previous */}
        <div className="flex flex-col justify-center items-start p-4 rounded-xl border border-[#1e293b] bg-[#0B111A]/50 opacity-40 cursor-not-allowed">
           <span className="text-[#6B7280] text-[11px] font-mono tracking-widest uppercase mb-1">Previous</span>
           <span className="text-[#9CA3AF] font-bold text-sm">You&apos;re at the beginning</span>
        </div>

        {/* Center - Dashboard Link */}
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="text-[11px] font-mono tracking-widest uppercase text-[#9CA3AF]">
             Phase 0 <span className="text-[#6B7280]">›</span> Week 0
          </div>
          <Link href="/dashboard" className="px-5 py-2.5 rounded-full bg-[#141B23] border border-[#253141] text-[#D1D5DB] hover:text-[#F97316] hover:scale-105 transition-all flex items-center gap-2 group shadow-sm">
             <Home className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
             <span className="text-sm font-bold tracking-wide">Back to Dashboard</span>
          </Link>
        </div>

        {/* Right - Next Up */}
        <Link 
          href="/curriculum/foundations/week-1" 
          className="group flex flex-col justify-center items-end p-5 rounded-xl border border-[#253141] bg-[#141B23] hover:border-[#F97316]/50 hover:bg-[#F97316]/5 transition-all duration-300 relative overflow-hidden"
        >
           <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#F97316]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
           <span className="text-[#F97316] text-[11px] font-mono tracking-widest uppercase mb-2 flex items-center gap-2 transition-transform group-hover:-translate-x-1">
             NEXT UP <ArrowRight className="w-3.5 h-3.5" />
           </span>
           <span className="text-white font-bold text-right text-[15px] group-hover:text-[#F97316] transition-colors leading-tight">
             W1 — Python Basics + Git + Jira
           </span>
           <span className="text-[#6B7280] text-xs mt-1 transition-colors group-hover:text-[#9ca3af]">
             PHASE 1 — DATA ENGINEERING FOUNDATIONS
           </span>
        </Link>

      </div>
    </motion.section>
  );
}
