import {
  Calendar,
  MessageSquare,
  Video,
} from "lucide-react";
import GamificationMatrix from "./_components/GamificationMatrix";
import SystemLoadWidget from "./_components/SystemLoadWidget";
import ActiveModuleWidget from "./_components/ActiveModuleWidget";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0F151B] text-[#E5E7EB] font-sans selection:bg-[#F97316]/30">

      {/* ─── MAIN CONTENT ─── */}
      <main className="p-8 lg:p-12 overflow-y-auto">
        
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
            Active Session
          </div>
        </header>

        {/* Top Grid (Active Module & System Load) */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          <ActiveModuleWidget />
          <SystemLoadWidget />
        </div>

        {/* Bottom Grid (Operations & Meta) */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Gamification Matrix - Replaces Upcoming Operations */}
          <div className="xl:col-span-2">
            <GamificationMatrix />
          </div>

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
