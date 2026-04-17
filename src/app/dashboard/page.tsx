import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Settings,
  Upload,
  Calendar,
  ArrowRight,
  Terminal,
  CheckCircle2,
  Clock,
  MessageSquare,
  Video,
  Code
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0F151B] text-[#E5E7EB] font-sans flex selection:bg-[#F97316]/30">
      
      {/* ─── LEFT SIDEBAR ─── */}
      <aside className="w-[280px] border-r border-[#1e293b] flex flex-col hidden lg:flex shrink-0 bg-[#0B111A]">
        <div className="p-8 pb-4">
          <h1 className="text-[22px] font-black text-[#F97316] tracking-tight">The Monolith</h1>
          <p className="text-xs text-[#9CA3AF] mt-1 font-medium">Technical Elite</p>
        </div>

        <nav className="flex-1 px-4 mt-8 space-y-2 relative">
          {/* Active Link */}
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#2A1D16] text-[#F97316] font-semibold border-l-4 border-[#F97316]"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>

          {/* Inactive Links */}
          <Link
            href="/dashboard/curriculum"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#9CA3AF] font-medium hover:bg-[#1e293b]/50 hover:text-white transition-colors ml-1"
          >
            <BookOpen className="w-5 h-5" />
            Curriculum
          </Link>
          <Link
            href="/dashboard/progress"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#9CA3AF] font-medium hover:bg-[#1e293b]/50 hover:text-white transition-colors ml-1"
          >
            <BarChart2 className="w-5 h-5 opacity-80" />
            Progress
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#9CA3AF] font-medium hover:bg-[#1e293b]/50 hover:text-white transition-colors ml-1"
          >
            <Settings className="w-5 h-5 opacity-80" />
            Settings
          </Link>
        </nav>

        <div className="p-6 mt-auto">
          <button className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-[#1F2937]/70 text-[#E5E7EB] font-semibold hover:bg-[#374151] transition-colors border border-[#374151]">
            <Upload className="w-4 h-4" />
            Upgrade to Pro
          </button>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-[#ea580c] text-xs font-bold tracking-[0.15em] uppercase mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#ea580c]"></div>
              Live System
            </div>
            <h1 className="text-4xl lg:text-[40px] font-bold text-white tracking-tight">Command Center</h1>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#9CA3AF]">
            <Calendar className="w-3.5 h-3.5" />
            Week 2 / 16
          </div>
        </header>

        {/* Top Grid (Active Module & System Load) */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          
          {/* Active Module Card */}
          <section className="xl:col-span-2 bg-[#19222E] rounded-xl border-l-[3px] border-l-[#F97316] p-8 flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs font-mono text-[#F97316] border border-[#F97316]/30 bg-[#F97316]/10 px-3 py-1 rounded-full">Phase 1</span>
              <span className="text-sm font-medium text-[#9CA3AF]">Active Module</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">DE Foundations</h2>

            {/* Terminal Window */}
            <div className="bg-[#0B111A] rounded-lg p-5 border border-[#1e293b]/50 mb-8 relative font-mono text-[13px] leading-loose">
              <div className="absolute top-4 right-4 text-[#4b5563]">
                <Code className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-3 text-[#38bdf8] mb-1">
                <Terminal className="w-4 h-4" />
                <span>Current Working Directory</span>
              </div>
              <div className="text-[#F3F4F6]">&gt; SELECT * FROM core_concepts WHERE week = 2;</div>
              <div className="text-[#22c55e] mt-1">4 rows returned. Status: In Progress.</div>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-auto">
              <button className="flex items-center justify-center gap-2 px-6 py-3 bg-[#F97316] text-[#050505] font-semibold rounded-lg hover:bg-[#fb923c] transition-colors">
                Continue Module
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="px-6 py-3 font-semibold rounded-lg bg-transparent text-[#D1D5DB] border border-[#374151] hover:bg-[#1e293b] transition-colors">
                View Syllabus
              </button>
            </div>
          </section>

          {/* System Load Card */}
          <section className="xl:col-span-1 bg-[#19222E] rounded-xl p-8 flex flex-col items-center justify-center relative border-t-2 border-t-[#22C55E]/50">
            <h3 className="absolute top-6 left-6 text-xs font-bold tracking-[0.15em] text-[#9CA3AF] uppercase">System Load</h3>
            
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
                  strokeDasharray="502.65" 
                  strokeDashoffset="442" /* 12% of 502 = ~60. 502 - 60 = 442 */
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_12px_rgba(34,197,94,0.6)]"
                />
              </svg>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div className="text-[42px] font-bold tracking-tighter text-white flex items-end leading-none">
                  12<span className="text-2xl text-[#9CA3AF] mb-1">%</span>
                </div>
                <div className="text-[10px] uppercase font-mono text-[#22c55e] mt-2 tracking-widest drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]">
                  14 weeks remain
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Bottom Grid (Operations & Meta) */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Upcoming Operations */}
          <section className="xl:col-span-2 bg-[#19222E] rounded-xl p-8">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#253141]">
              <CheckCircle2 className="w-6 h-6 text-[#38bdf8]" />
              <h3 className="text-[18px] font-bold text-white">Upcoming Operations</h3>
            </div>

            <ul className="space-y-2">
              {/* Task 1 */}
              <li className="flex gap-4 p-4 hover:bg-[#1e2836] rounded-lg transition-colors border border-transparent hover:border-[#253141]">
                <div className="w-[18px] h-[18px] mt-[3px] border-[1.5px] border-[#4B5563] rounded-[3px] opacity-80 cursor-pointer hover:border-[#F97316] transition-colors shrink-0"></div>
                <div>
                  <div className="text-[#E5E7EB] font-medium text-[15px] leading-tight mb-2.5">Complete SQL Deep Dive quiz</div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#fca5a5]">
                      <Clock className="w-[13px] h-[13px]" />
                      Due Today
                    </div>
                    <span className="text-[10px] font-mono bg-[#111827] text-[#9CA3AF] px-2 py-[2px] rounded border border-[#253141]">Assessment</span>
                  </div>
                </div>
              </li>

              {/* Task 2 */}
              <li className="flex gap-4 p-4 hover:bg-[#1e2836] rounded-lg transition-colors border border-transparent hover:border-[#253141]">
                <div className="w-[18px] h-[18px] mt-[3px] border-[1.5px] border-[#4B5563] rounded-[3px] opacity-80 cursor-pointer hover:border-[#F97316] transition-colors shrink-0"></div>
                <div>
                  <div className="text-[#E5E7EB] font-medium text-[15px] leading-tight mb-2.5">Submit Python data structure project</div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#9CA3AF]">
                      <Calendar className="w-[13px] h-[13px]" />
                      Due in 3 days
                    </div>
                    <span className="text-[10px] font-mono bg-[#111827] text-[#9CA3AF] px-2 py-[2px] rounded border border-[#253141]">Project</span>
                  </div>
                </div>
              </li>

              {/* Task 3 */}
              <li className="flex gap-4 p-4 hover:bg-[#1e2836] rounded-lg transition-colors border border-transparent hover:border-[#253141]">
                <div className="w-[18px] h-[18px] mt-[3px] border-[1.5px] border-[#4B5563] rounded-[3px] opacity-80 cursor-pointer hover:border-[#F97316] transition-colors shrink-0"></div>
                <div>
                  <div className="text-[#E5E7EB] font-medium text-[15px] leading-tight mb-2.5">Review peer code submissions</div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#9CA3AF]">
                      <Calendar className="w-[13px] h-[13px]" />
                      Due in 5 days
                    </div>
                    <span className="text-[10px] font-mono bg-[#111827] text-[#9CA3AF] px-2 py-[2px] rounded border border-[#253141]">Peer Review</span>
                  </div>
                </div>
              </li>
            </ul>
          </section>

          <div className="xl:col-span-1 flex flex-col gap-8">
            
            {/* Uplinks */}
            <section className="bg-[#19222E] rounded-xl p-8">
              <h3 className="text-[11px] font-bold tracking-[0.15em] text-[#9CA3AF] uppercase mb-6">Uplinks</h3>
              <div className="flex gap-4">
                <button className="flex-1 flex flex-col items-center justify-center p-5 bg-[#212C3A] rounded-lg hover:bg-[#283542] hover:border-[#38bdf8]/50 group transition-all">
                  <MessageSquare className="w-7 h-7 text-[#38bdf8] mb-3 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-[#E5E7EB]">Discord Server</span>
                </button>
                <button className="flex-1 flex flex-col items-center justify-center p-5 bg-[#212C3A] rounded-lg hover:bg-[#283542] hover:border-[#38bdf8]/50 group transition-all">
                  <Video className="w-7 h-7 text-[#38bdf8] mb-3 group-hover:scale-110 transition-transform" />
                  <span className="text-xs font-semibold text-[#E5E7EB]">Office Hours</span>
                </button>
              </div>
            </section>

            {/* Event Log */}
            <section className="bg-[#19222E] rounded-xl p-8 flex-1 border-t-2 border-t-transparent">
              <h3 className="text-[11px] font-bold tracking-[0.15em] text-[#9CA3AF] uppercase mb-6">Event Log</h3>
              
              <div className="relative border-l border-[#374151] ml-2 pb-4 space-y-8 mt-2">
                {/* Event 1 */}
                <div className="relative pl-6">
                  <div className="absolute w-[11px] h-[11px] bg-[#22c55e] rounded-full -left-[6px] top-1 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                  <div className="text-[13px] font-semibold text-white">Lesson Complete: Relational Databases</div>
                  <div className="text-[11px] font-mono text-[#9CA3AF] mt-1.5 opacity-80">2 hours ago</div>
                </div>

                {/* Event 2 */}
                <div className="relative pl-6">
                  <div className="absolute w-[11px] h-[11px] bg-[#4b5563] rounded-full -left-[6px] top-1"></div>
                  <div className="text-[13px] font-semibold text-[#D1D5DB]">Quiz Passed: Data Types 101</div>
                  <div className="text-[11px] font-mono text-[#9CA3AF] mt-1.5 opacity-80">Yesterday</div>
                </div>

                {/* Event 3 */}
                <div className="relative pl-6">
                  <div className="absolute w-[11px] h-[11px] bg-[#4b5563] rounded-full -left-[6px] top-1"></div>
                  <div className="text-[13px] font-semibold text-[#D1D5DB]">Module Unlocked: Phase 1 Week 2</div>
                  <div className="text-[11px] font-mono text-[#9CA3AF] mt-1.5 opacity-80">Oct 12</div>
                </div>
              </div>
            </section>

          </div>
        </div>

      </main>
    </div>
  );
}
