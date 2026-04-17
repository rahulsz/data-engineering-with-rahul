import React from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Settings,
  Upload,
  User,
  Bell,
  Terminal,
  ArrowRight,
  Check,
  Play,
  Lock,
} from "lucide-react";

export default function CurriculumPage() {
  return (
    <div className="min-h-screen bg-[#0F151B] text-[#E5E7EB] font-sans flex selection:bg-[#F97316]/30">
      
      {/* ─── LEFT SIDEBAR ─── */}
      <aside className="w-[280px] border-r border-[#1e293b] flex flex-col hidden lg:flex shrink-0 bg-[#0B111A]">
        <div className="p-8 pb-4">
          <h1 className="text-[22px] font-black text-[#F97316] tracking-tight">The Monolith</h1>
          <p className="text-xs text-[#9CA3AF] mt-1 font-medium">Technical Elite</p>
        </div>

        <nav className="flex-1 px-4 mt-8 space-y-2 relative">
          {/* Inactive Link */}
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#9CA3AF] font-medium hover:bg-[#1e293b]/50 hover:text-white transition-colors ml-1"
          >
            <LayoutDashboard className="w-5 h-5 opacity-80" />
            Dashboard
          </Link>

          {/* Active Link */}
          <Link
            href="/dashboard/curriculum"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#2A1D16] text-[#F97316] font-semibold border-l-4 border-[#F97316]"
          >
            <BookOpen className="w-5 h-5" />
            Curriculum
          </Link>

          {/* Inactive Links */}
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
      <main className="flex-1 overflow-y-auto bg-[#0F151B] flex flex-col">
        
        {/* Top Header Icons */}
        <header className="flex justify-end p-6 gap-6 items-center border-b border-[#1A232E]">
          <Bell className="w-5 h-5 text-[#9CA3AF] cursor-pointer hover:text-white transition-colors" />
          <Terminal className="w-5 h-5 text-[#9CA3AF] cursor-pointer hover:text-white transition-colors" />
          <div className="w-8 h-8 rounded-full bg-[#1A232E] border border-[#374151] flex items-center justify-center cursor-pointer hover:border-[#9CA3AF] transition-colors">
            <User className="w-4 h-4 text-[#E5E7EB]" />
          </div>
        </header>

        <div className="flex-1 p-8 lg:p-12 lg:pl-16 pb-24 max-w-6xl">
          
          {/* Page Title Area */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="text-[#F97316] text-[11px] font-mono font-bold tracking-[0.2em] uppercase mb-3">
                Milestones & Trajectory
              </div>
              <h1 className="text-4xl lg:text-[42px] font-bold text-white tracking-tight">Learning Path</h1>
            </div>
            
            <button className="flex items-center justify-center gap-3 px-6 py-3 bg-[#F97316] text-[#2A1D16] font-bold rounded-lg hover:bg-[#fb923c] transition-colors shadow-lg shadow-[#F97316]/10">
              Resume Learning
              <ArrowRight className="w-[18px] h-[18px]" />
            </button>
          </div>

          {/* Timeline Layout */}
          <div className="relative pl-[44px]">
            
            {/* Global Vertical Line */}
            <div className="absolute left-[20px] top-4 bottom-0 w-[1.5px] z-0">
              {/* Upper grey segment */}
              <div className="h-[200px] w-full bg-[#2A3441]"></div>
              {/* Lower orange segment */}
              <div className="absolute top-[200px] bottom-0 w-full bg-[#F97316]/50"></div>
            </div>

            {/* --- PHASE 00 : COMPLETED --- */}
            <div className="relative mb-16 flex">
              {/* Node */}
              <div className="absolute -left-[44px] top-2 w-[40px] h-[40px] rounded-xl bg-[#212A36] border border-[#374151] flex items-center justify-center z-10 shadow-lg cursor-pointer hover:border-[#9CA3AF] transition-colors">
                <Check className="w-5 h-5 text-[#9CA3AF]" />
              </div>

              {/* Content Card */}
              <div className="flex-1 ml-6 bg-[#141B23] rounded-xl border border-[#1e293b]/60 p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 text-[11px] font-mono tracking-[0.15em] text-[#9CA3AF] uppercase mb-4">
                      <span>Phase 00</span>
                      <span className="w-1 h-1 rounded-full bg-[#4B5563]"></span>
                      <span>1 Week</span>
                    </div>
                    <h3 className="text-[26px] font-semibold text-[#D1D5DB] mb-3 tracking-tight">Orientation</h3>
                    <p className="text-[#9CA3AF] text-[15px] leading-relaxed max-w-2xl">
                      System initialization, environment setup, and foundational principles of the elite technical architecture.
                    </p>
                  </div>
                  <div className="shrink-0 bg-[#1e293b]/50 text-[#9CA3AF] text-[10px] font-mono font-bold tracking-widest px-4 py-1.5 rounded-full border border-[#374151]/50">
                    COMPLETED
                  </div>
                </div>
              </div>
            </div>

            {/* --- PHASE 01 : CURRENT --- */}
            <div className="relative flex">
              {/* Node */}
              <div className="absolute -left-[44px] top-6 w-[40px] h-[40px] rounded-xl bg-[#1A110B] border-[1.5px] border-[#F97316] flex items-center justify-center z-10 shadow-[0_0_20px_rgba(249,115,22,0.15)] ring-4 ring-[#0F151B]">
                <div className="w-[6px] h-[6px] rounded-full bg-[#F97316]"></div>
              </div>

              {/* Content Card */}
              <div className="flex-1 ml-6 bg-[#19222E] rounded-xl border border-[#1e293b] flex flex-col overflow-hidden shadow-xl">
                
                {/* Header */}
                <div className="p-8 pb-10 border-b border-[#253141]">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-l-2 border-[#F97316] pl-6 -ml-8">
                    <div>
                      <div className="flex items-center gap-3 text-[11px] font-mono tracking-[0.15em] text-[#F97316] uppercase mb-5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#F97316]"></div> 
                        <span>Phase 01</span>
                        <span className="w-1 h-1 rounded-full bg-[#4B5563]"></span>
                        <span className="text-[#9CA3AF]">5 Weeks</span>
                      </div>
                      <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">DE Foundations</h3>
                      <p className="text-[#9CA3AF] text-[15px] leading-relaxed max-w-[600px]">
                        Core data engineering principles. Building robust, scalable pipelines using modern distributed systems and container orchestration.
                      </p>
                      {/* Progress Bar Mini */}
                      <div className="mt-8 h-[5px] bg-[#253141] rounded-full overflow-hidden max-w-[280px]">
                        <div className="h-full bg-[#F97316] w-[35%] rounded-full shadow-[0_0_8px_rgba(249,115,22,0.6)]"></div>
                      </div>
                    </div>
                    <div className="shrink-0 bg-[#F97316]/10 text-[#ea580c] text-[10px] font-mono font-bold tracking-widest px-4 py-1.5 rounded-full border border-[#F97316]/20">
                      CURRENT
                    </div>
                  </div>
                </div>

                {/* Sub-modules List */}
                <div className="bg-[#141B23]">
                  
                  {/* WK 01 */}
                  <div className="flex items-center justify-between p-6 px-10 border-b border-[#1e293b]/40 group hover:bg-[#1e293b]/30 transition-colors cursor-pointer">
                    <div className="flex items-center gap-6">
                      <div className="w-8 h-8 rounded-full bg-[#2A3441] flex items-center justify-center border border-transparent group-hover:border-[#4B5563] transition-colors">
                        <Check className="w-[14px] h-[14px] text-[#9CA3AF]" />
                      </div>
                      <span className="text-[#E5E7EB] font-medium text-[15px]">Data Modeling & SQL Mastery</span>
                    </div>
                    <div className="text-[11px] font-mono text-[#6B7280] tracking-widest">WK 01</div>
                  </div>

                  {/* WK 02 In Progress */}
                  <div className="relative flex items-center justify-between p-6 px-10 bg-[#1E2734] border-y border-[#374151]/50 shadow-inner group transition-colors cursor-pointer">
                    <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#F97316]"></div>
                    <div className="flex items-center gap-6">
                      <div className="w-8 h-8 rounded-full bg-[#F97316]/10 flex items-center justify-center border border-[#F97316]/30">
                        <Play className="w-[14px] h-[14px] text-[#F97316] ml-[2px] fill-current" />
                      </div>
                      <span className="text-white font-semibold text-[15px]">Python for Systems Engineering</span>
                    </div>
                    <div className="flex items-center gap-5">
                      <span className="bg-[#141B23] text-[#9CA3AF] text-[10px] font-mono border border-[#374151] px-2.5 py-1 rounded">IN PROGRESS</span>
                      <div className="text-[11px] font-mono text-[#D1D5DB] tracking-widest">WK 02</div>
                    </div>
                  </div>

                  {/* WK 03 */}
                  <div className="flex items-center justify-between p-6 px-10 group hover:bg-[#1e293b]/30 transition-colors cursor-pointer opacity-80">
                    <div className="flex items-center gap-6">
                      <div className="w-8 h-8 rounded-full bg-[#1A232E] flex items-center justify-center border border-[#374151]">
                        <Lock className="w-[14px] h-[14px] text-[#4B5563]" />
                      </div>
                      <span className="text-[#9CA3AF] font-medium text-[15px]">Docker & Containerization</span>
                    </div>
                    <div className="text-[11px] font-mono text-[#4B5563] tracking-widest group-hover:text-[#6B7280]">WK 03</div>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
