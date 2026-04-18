import React from "react";
import {
  TrendingUp,
  Flame,
  Clock,
  Target,
  Zap,
  Award,
  CheckCircle2,
  ArrowUpRight,
  Activity,
  BarChart2,
} from "lucide-react";

/* ── tiny helpers ── */
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// 4 weeks × 7 days heat grid  (0 = none, 1 = low, 2 = med, 3 = high)
const heatData: number[][] = [
  [2, 3, 1, 3, 2, 0, 1],
  [3, 2, 3, 1, 3, 1, 0],
  [1, 3, 2, 3, 2, 2, 0],
  [3, 2, 0, 3, 1, 0, 0],
];
const heatColors: Record<number, string> = {
  0: "bg-[#1A232E]",
  1: "bg-[#F97316]/20",
  2: "bg-[#F97316]/50",
  3: "bg-[#F97316]",
};

// bar chart data for weekly hours
const weeklyHours = [
  { label: "Wk 1", value: 8 },
  { label: "Wk 2", value: 12 },
  { label: "Wk 3", value: 6 },
  { label: "Wk 4", value: 14 },
  { label: "Wk 5", value: 10 },
  { label: "Wk 6", value: 16 },
  { label: "Wk 7", value: 9 },
  { label: "Wk 8", value: 11 },
];
const maxHours = Math.max(...weeklyHours.map((w) => w.value));

// skill breakdown
const skills = [
  { name: "SQL & Databases", pct: 72, color: "#38bdf8" },
  { name: "Python Engineering", pct: 45, color: "#F97316" },
  { name: "Data Modeling", pct: 60, color: "#22c55e" },
  { name: "Cloud & DevOps", pct: 28, color: "#A855F7" },
  { name: "Analytics & BI", pct: 15, color: "#F59E0B" },
];

// achievements
const achievements = [
  { icon: "🏆", title: "First Blood", desc: "Completed first module", earned: true },
  { icon: "🔥", title: "Hot Streak", desc: "7-day login streak", earned: true },
  { icon: "⚡", title: "Speed Demon", desc: "Finish quiz under 5 min", earned: true },
  { icon: "🎯", title: "Sharpshooter", desc: "100% on any quiz", earned: false },
  { icon: "🧠", title: "Deep Thinker", desc: "Complete all bonus tasks", earned: false },
  { icon: "💎", title: "Diamond Hands", desc: "Finish all 14 weeks", earned: false },
];

export default function ProgressPage() {
  return (
    <div className="min-h-screen bg-[#0F151B] text-[#E5E7EB] font-sans selection:bg-[#F97316]/30">

      {/* ─── MAIN CONTENT ─── */}
      <main className="p-8 lg:p-12 pb-24 max-w-7xl">

        {/* Page Title */}
        <div className="mb-14">
          <div className="text-[#F97316] text-[11px] font-mono font-bold tracking-[0.2em] uppercase mb-3">
            Performance Telemetry
          </div>
          <h1 className="text-4xl lg:text-[42px] font-bold text-white tracking-tight">Progress & Analytics</h1>
        </div>

        {/* ── KPI STAT CARDS ── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mb-12">

          {/* Overall Completion */}
          <div className="bg-[#19222E] rounded-xl border border-[#1e293b] p-6 flex flex-col gap-3 group hover:border-[#374151] transition-colors">
            <div className="flex items-center justify-between">
              <Target className="w-5 h-5 text-[#F97316]" />
              <ArrowUpRight className="w-4 h-4 text-[#22c55e] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-[34px] font-bold text-white leading-none tracking-tight">12<span className="text-lg text-[#9CA3AF] ml-0.5">%</span></div>
            <div className="text-[12px] font-mono text-[#9CA3AF] tracking-wide">Overall Completion</div>
          </div>

          {/* Current Streak */}
          <div className="bg-[#19222E] rounded-xl border border-[#1e293b] p-6 flex flex-col gap-3 group hover:border-[#374151] transition-colors">
            <div className="flex items-center justify-between">
              <Flame className="w-5 h-5 text-[#F97316]" />
              <ArrowUpRight className="w-4 h-4 text-[#22c55e] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-[34px] font-bold text-white leading-none tracking-tight">7<span className="text-lg text-[#9CA3AF] ml-1">days</span></div>
            <div className="text-[12px] font-mono text-[#9CA3AF] tracking-wide">Current Streak</div>
          </div>

          {/* Total Hours */}
          <div className="bg-[#19222E] rounded-xl border border-[#1e293b] p-6 flex flex-col gap-3 group hover:border-[#374151] transition-colors">
            <div className="flex items-center justify-between">
              <Clock className="w-5 h-5 text-[#38bdf8]" />
              <ArrowUpRight className="w-4 h-4 text-[#22c55e] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-[34px] font-bold text-white leading-none tracking-tight">86<span className="text-lg text-[#9CA3AF] ml-1">hrs</span></div>
            <div className="text-[12px] font-mono text-[#9CA3AF] tracking-wide">Total Study Hours</div>
          </div>

          {/* XP Earned */}
          <div className="bg-[#19222E] rounded-xl border border-[#1e293b] p-6 flex flex-col gap-3 group hover:border-[#374151] transition-colors">
            <div className="flex items-center justify-between">
              <Zap className="w-5 h-5 text-[#F59E0B]" />
              <ArrowUpRight className="w-4 h-4 text-[#22c55e] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-[34px] font-bold text-white leading-none tracking-tight">2,450<span className="text-lg text-[#9CA3AF] ml-1">xp</span></div>
            <div className="text-[12px] font-mono text-[#9CA3AF] tracking-wide">Experience Earned</div>
          </div>
        </div>

        {/* ── MID-ROW : Activity Heat + Weekly Hours ── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">

          {/* Activity Heatmap */}
          <section className="bg-[#19222E] rounded-xl border border-[#1e293b] p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-[#F97316]" />
                <h3 className="text-[15px] font-bold text-white">Activity Heatmap</h3>
              </div>
              <span className="text-[10px] font-mono text-[#6B7280]">Last 4 weeks</span>
            </div>

            {/* Day labels */}
            <div className="flex gap-2 mb-3 ml-[52px]">
              {weekDays.map((d) => (
                <div key={d} className="flex-1 text-center text-[10px] font-mono text-[#6B7280]">{d}</div>
              ))}
            </div>

            {/* Grid */}
            <div className="space-y-2">
              {heatData.map((week, wi) => (
                <div key={wi} className="flex items-center gap-2">
                  <div className="w-[48px] text-right text-[10px] font-mono text-[#6B7280] shrink-0">Wk {wi + 1}</div>
                  {week.map((val, di) => (
                    <div
                      key={di}
                      className={`flex-1 aspect-square rounded-[5px] ${heatColors[val]} transition-colors hover:ring-1 hover:ring-[#F97316]/50 cursor-pointer`}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 mt-6 justify-end">
              <span className="text-[10px] font-mono text-[#6B7280]">Less</span>
              {[0, 1, 2, 3].map((v) => (
                <div key={v} className={`w-3 h-3 rounded-[3px] ${heatColors[v]}`} />
              ))}
              <span className="text-[10px] font-mono text-[#6B7280]">More</span>
            </div>
          </section>

          {/* Weekly Hours Bar Chart */}
          <section className="bg-[#19222E] rounded-xl border border-[#1e293b] p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-[#22c55e]" />
                <h3 className="text-[15px] font-bold text-white">Weekly Study Hours</h3>
              </div>
              <span className="text-[10px] font-mono text-[#6B7280]">All time</span>
            </div>

            {/* Bars */}
            <div className="flex items-end gap-3 h-[180px]">
              {weeklyHours.map((w, i) => {
                const heightPct = (w.value / maxHours) * 100;
                const isMax = w.value === maxHours;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer">
                    <span className="text-[11px] font-mono text-[#6B7280] opacity-0 group-hover:opacity-100 transition-opacity">
                      {w.value}h
                    </span>
                    <div
                      className={`w-full rounded-t-md transition-all ${
                        isMax
                          ? "bg-[#F97316] shadow-[0_0_16px_rgba(249,115,22,0.3)]"
                          : "bg-[#253141] group-hover:bg-[#F97316]/60"
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                    <span className="text-[10px] font-mono text-[#6B7280]">{w.label}</span>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* ── BOTTOM ROW : Skill Breakdown + Achievements ── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {/* Skill Breakdown */}
          <section className="bg-[#19222E] rounded-xl border border-[#1e293b] p-8">
            <div className="flex items-center gap-3 mb-8">
              <BarChart2 className="w-5 h-5 text-[#A855F7]" />
              <h3 className="text-[15px] font-bold text-white">Skill Proficiency</h3>
            </div>

            <div className="space-y-6">
              {skills.map((s) => (
                <div key={s.name}>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[13px] font-medium text-[#D1D5DB]">{s.name}</span>
                    <span className="text-[12px] font-mono text-[#9CA3AF]">{s.pct}%</span>
                  </div>
                  <div className="h-[6px] bg-[#1A232E] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${s.pct}%`,
                        backgroundColor: s.color,
                        boxShadow: `0 0 10px ${s.color}40`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Achievements */}
          <section className="bg-[#19222E] rounded-xl border border-[#1e293b] p-8">
            <div className="flex items-center gap-3 mb-8">
              <Award className="w-5 h-5 text-[#F59E0B]" />
              <h3 className="text-[15px] font-bold text-white">Achievements</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {achievements.map((a) => (
                <div
                  key={a.title}
                  className={`flex items-start gap-4 p-4 rounded-lg border transition-colors cursor-pointer ${
                    a.earned
                      ? "bg-[#141B23] border-[#253141] hover:border-[#374151]"
                      : "bg-[#0F151B] border-[#1A232E] opacity-40"
                  }`}
                >
                  <div className="text-2xl shrink-0 mt-0.5">{a.icon}</div>
                  <div>
                    <div className={`text-[13px] font-semibold mb-1 ${a.earned ? "text-white" : "text-[#6B7280]"}`}>
                      {a.title}
                    </div>
                    <div className="text-[11px] font-mono text-[#6B7280] leading-snug">{a.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── PHASE COMPLETION TIMELINE ── */}
        <section className="bg-[#19222E] rounded-xl border border-[#1e293b] p-8 mt-12">
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle2 className="w-5 h-5 text-[#22c55e]" />
            <h3 className="text-[15px] font-bold text-white">Phase Completion</h3>
          </div>

          <div className="flex items-center gap-4">
            {/* Phase 0 */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-mono text-[#D1D5DB]">Phase 0</span>
                <span className="text-[10px] font-mono text-[#22c55e]">100%</span>
              </div>
              <div className="h-2 bg-[#1A232E] rounded-full overflow-hidden">
                <div className="h-full bg-[#22c55e] rounded-full w-full shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
              </div>
              <div className="text-[10px] font-mono text-[#6B7280] mt-2">Orientation</div>
            </div>

            {/* Divider */}
            <div className="w-px h-10 bg-[#253141] shrink-0"></div>

            {/* Phase 1 */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-mono text-[#D1D5DB]">Phase 1</span>
                <span className="text-[10px] font-mono text-[#F97316]">35%</span>
              </div>
              <div className="h-2 bg-[#1A232E] rounded-full overflow-hidden">
                <div className="h-full bg-[#F97316] rounded-full w-[35%] shadow-[0_0_8px_rgba(249,115,22,0.4)]" />
              </div>
              <div className="text-[10px] font-mono text-[#6B7280] mt-2">DE Foundations</div>
            </div>

            <div className="w-px h-10 bg-[#253141] shrink-0"></div>

            {/* Phase 2 */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-mono text-[#D1D5DB]">Phase 2</span>
                <span className="text-[10px] font-mono text-[#6B7280]">0%</span>
              </div>
              <div className="h-2 bg-[#1A232E] rounded-full overflow-hidden">
                <div className="h-full bg-[#A855F7] rounded-full w-[0%]" />
              </div>
              <div className="text-[10px] font-mono text-[#6B7280] mt-2">Advanced Eng.</div>
            </div>

            <div className="w-px h-10 bg-[#253141] shrink-0"></div>

            {/* Phase 3 */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-mono text-[#D1D5DB]">Phase 3</span>
                <span className="text-[10px] font-mono text-[#6B7280]">0%</span>
              </div>
              <div className="h-2 bg-[#1A232E] rounded-full overflow-hidden">
                <div className="h-full bg-[#38bdf8] rounded-full w-[0%]" />
              </div>
              <div className="text-[10px] font-mono text-[#6B7280] mt-2">Analytics</div>
            </div>

            <div className="w-px h-10 bg-[#253141] shrink-0"></div>

            {/* Phase 4 */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-mono text-[#D1D5DB]">Phase 4</span>
                <span className="text-[10px] font-mono text-[#6B7280]">0%</span>
              </div>
              <div className="h-2 bg-[#1A232E] rounded-full overflow-hidden">
                <div className="h-full bg-[#F59E0B] rounded-full w-[0%]" />
              </div>
              <div className="text-[10px] font-mono text-[#6B7280] mt-2">Capstone</div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
