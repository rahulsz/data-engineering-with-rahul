"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Terminal, Code, Rocket, Zap } from "lucide-react";
import { useProgressStore } from "@/store/progressStore";
import { CURRICULUM } from "@/config/site-config";

export default function ActiveModuleWidget() {
  const { completedWeeks } = useProgressStore();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line
  useEffect(() => setMounted(true), []);

  const flattened = CURRICULUM.flatMap(p => p.weeks.map(w => ({ ...w, phaseSlug: p.slug, phaseLabel: p.label })));
  
  // Skip Week 0 (Orientation) when finding next lesson if user has NOT completed it
  // but also hasn't completed anything — direct them to real content first
  const hasStarted = completedWeeks.length > 0;
  
  let nextLesson = flattened.find(w => w.status === "available" && !completedWeeks.includes(w.week));
  const isAllComplete = nextLesson === undefined;
  
  if (!nextLesson) {
    nextLesson = flattened[flattened.length - 1];
  }

  // Fresh user — no progress at all
  if (!hasStarted && mounted) {
    return (
      <section className="xl:col-span-2 bg-gradient-to-br from-[#19222E] to-[#151d28] rounded-xl border-l-[3px] border-l-[#F97316] p-8 flex flex-col relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute -top-20 -right-20 w-56 h-56 bg-[#F97316] rounded-full blur-[120px] opacity-[0.07] pointer-events-none" />
        
        <div className="flex items-center gap-3 mb-3">
          <Rocket className="w-5 h-5 text-[#F97316]" />
          <span className="text-xs font-mono text-[#F97316] border border-[#F97316]/30 bg-[#F97316]/10 px-3 py-1 rounded-full font-bold tracking-wider">
            ONBOARDING
          </span>
        </div>

        <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">
          Welcome to the Program
        </h2>
        <p className="text-[#9CA3AF] text-[15px] leading-relaxed mb-8 max-w-lg">
          Your 16-week Data Engineering journey begins here. Start with the orientation to verify your environment, 
          or jump straight into <span className="text-white font-medium">Phase 1: Python + Git</span> if you're already set up.
        </p>

        {/* Quick-start cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <Link 
            href="/curriculum/orientation/week-0"
            className="group p-5 rounded-xl bg-[#111823] border border-[#253141] hover:border-[#F97316]/40 transition-all hover:bg-[#141c28]"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-[#F97316]/10 border border-[#F97316]/20 flex items-center justify-center">
                <Terminal className="w-4 h-4 text-[#F97316]" />
              </div>
              <span className="text-[11px] font-mono font-bold text-[#556070] tracking-widest uppercase">Orientation</span>
            </div>
            <h3 className="text-[15px] font-bold text-white mb-1 group-hover:text-[#F97316] transition-colors">Setup & Verify</h3>
            <p className="text-[12px] text-[#6B7280] leading-relaxed">Environment check, run your first Python block in-browser</p>
          </Link>

          <Link 
            href="/curriculum/foundations/week-1"
            className="group p-5 rounded-xl bg-[#111823] border border-[#253141] hover:border-[#38bdf8]/40 transition-all hover:bg-[#141c28]"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-[#38bdf8]/10 border border-[#38bdf8]/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-[#38bdf8]" />
              </div>
              <span className="text-[11px] font-mono font-bold text-[#556070] tracking-widest uppercase">Phase 1</span>
            </div>
            <h3 className="text-[15px] font-bold text-white mb-1 group-hover:text-[#38bdf8] transition-colors">Skip to Engineering</h3>
            <p className="text-[12px] text-[#6B7280] leading-relaxed">Jump into Python + Git + Jira fundamentals directly</p>
          </Link>
        </div>

        <Link href="/curriculum" className="self-start px-5 py-2.5 font-semibold rounded-lg bg-transparent text-[#9CA3AF] border border-[#374151] hover:bg-[#1e293b] hover:text-white transition-colors text-sm">
          View Full Syllabus
        </Link>
      </section>
    );
  }

  return (
    <section className="xl:col-span-2 bg-[#19222E] rounded-xl border-l-[3px] border-l-[#F97316] p-8 flex flex-col">
      <div className="flex items-center gap-4 mb-4">
        <span className="text-xs font-mono text-[#F97316] border border-[#F97316]/30 bg-[#F97316]/10 px-3 py-1 rounded-full">
          {nextLesson?.phaseLabel || "Curriculum"}
        </span>
        <span className="text-sm font-medium text-[#9CA3AF]">
          {isAllComplete ? "All Training Complete" : "Active Module"}
        </span>
      </div>
      <h2 className="text-3xl font-bold text-white mb-6">
        {mounted ? (nextLesson?.title || "DE Foundations") : "Initializing..."}
      </h2>

      {/* Terminal Window */}
      <div className="bg-[#0B111A] rounded-lg p-5 border border-[#1e293b]/50 mb-8 relative font-mono text-[13px] leading-loose">
        <div className="absolute top-4 right-4 text-[#4b5563]">
          <Code className="w-5 h-5" />
        </div>
        <div className="flex items-center gap-3 text-[#38bdf8] mb-1">
          <Terminal className="w-4 h-4" />
          <span>Current Working Directory</span>
        </div>
        <div className="text-[#F3F4F6]">&gt; SELECT * FROM core_concepts WHERE week = {nextLesson ? nextLesson.week : '0'};</div>
        <div className="text-[#22c55e] mt-1">
          {mounted 
            ? `${completedWeeks.length} modules cleared. Status: In Progress.`
            : 'Connecting...'}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-auto">
        {nextLesson && !isAllComplete ? (
          <Link 
            href={`/curriculum/${nextLesson.phaseSlug}/${nextLesson.slug}`} 
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#F97316] text-[#050505] font-semibold rounded-lg hover:bg-[#fb923c] transition-colors"
          >
            Continue Module
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <div className="px-6 py-3 bg-[#22c55e]/10 text-[#22c55e] font-semibold rounded-lg border border-[#22c55e]/30">
            All Modules Complete
          </div>
        )}
        <Link href="/curriculum" className="px-6 py-3 font-semibold rounded-lg bg-transparent text-[#D1D5DB] border border-[#374151] hover:bg-[#1e293b] transition-colors">
          View Syllabus
        </Link>
      </div>
    </section>
  );
}
