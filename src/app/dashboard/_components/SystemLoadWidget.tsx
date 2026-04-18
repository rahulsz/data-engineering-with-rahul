"use client";

import React, { useEffect, useState } from "react";
import { useProgressStore } from "@/store/progressStore";
import { CURRICULUM } from "@/config/site-config";

export default function SystemLoadWidget() {
  const { completedWeeks, getCompletionPercentage } = useProgressStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const totalWeeks = CURRICULUM.reduce((acc, phase) => acc + phase.weeks.length, 0);
  const remainingWeeks = totalWeeks - completedWeeks.length;
  
  // To avoid hydration mismatch on random math, fallback to 0 before mount
  const percentage = mounted ? getCompletionPercentage() : 0;
  
  // Calculate SVG stroke array for full circle (2 * PI * r = 2 * 3.1415 * 80 = 502.65)
  // Dashboard offset calculation: offset = circumference - (percentage / 100) * circumference
  const circumference = 502.65;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <section className="xl:col-span-1 bg-[#19222E] rounded-xl p-8 flex flex-col items-center justify-center relative">
      <h3 className="absolute top-6 left-6 text-[11px] font-bold tracking-[0.15em] text-[#9CA3AF] uppercase">System Load</h3>
      
      {/* Radial Progress Chart SVG */}
      <div className="relative mt-8 mb-2">
        <svg width="180" height="180" viewBox="0 0 200 200" className="rotate-[-90deg]">
          {/* Background Track */}
          <circle cx="100" cy="100" r="80" fill="none" stroke="#253141" strokeWidth="12" />
          {/* Active Progress Segment */}
          <circle 
            cx="100" cy="100" r="80" 
            fill="none" 
            stroke="#22c55e" 
            strokeWidth="12" 
            strokeDasharray={circumference} 
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="drop-shadow-[0_0_12px_rgba(34,197,94,0.6)] transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="text-[42px] font-bold tracking-tighter text-white flex items-end leading-none">
            {Math.round(percentage)}<span className="text-2xl text-[#9CA3AF] mb-1">%</span>
          </div>
          <div className="text-[10px] uppercase font-mono text-[#22c55e] mt-2 tracking-widest drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">
            {remainingWeeks} weeks remain
          </div>
        </div>
      </div>
    </section>
  );
}
