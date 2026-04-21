"use client";

import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  Flame,
  Clock,
  Target,
  Zap,
  Award,
  CheckCircle2,
  ArrowUpRight,
  BarChart2,
  Loader2,
} from "lucide-react";

import ActivityHeatmap from "../_components/ActivityHeatmap";
import { fetchUserProgress } from "@/app/actions/progressSync";
import { cn } from "@/lib/cn";
import { useProgressStore } from "@/store/progressStore";
import { CURRICULUM } from "@/config/site-config";

/* ── Types ── */
interface ProgressData {
  completedWeeks: number[];
  xpTotal: number;
  currentStreak: number;
  longestStreak: number;
  totalStudyMinutes: number;
  phaseCompletion: Record<string, number>;
  achievements: {
    slug: string;
    title: string;
    description: string;
    icon: string;
    category: string;
    earnedAt: string | null;
    xpReward: number;
  }[];
}

/* ── Phase config ── */
const PHASES = [
  { key: "phase0", label: "Phase 0", title: "Orientation",   color: "#22c55e", weeks: [0] },
  { key: "phase1", label: "Phase 1", title: "DE Foundations", color: "#F97316", weeks: [1, 2, 3, 4, 5] },
  { key: "phase2", label: "Phase 2", title: "Advanced Eng.",  color: "#A855F7", weeks: [6, 7, 8] },
  { key: "phase3", label: "Phase 3", title: "Analytics",      color: "#38bdf8", weeks: [9, 10, 11] },
  { key: "phase4", label: "Phase 4", title: "Capstone",       color: "#F59E0B", weeks: [12, 13, 14] },
];

/* ── Skill mapping: which weeks contribute to which skill ── */
const SKILL_MAP = [
  { name: "SQL & Databases",    color: "#38bdf8", weeks: [3, 4, 6] },
  { name: "Python Engineering", color: "#F97316", weeks: [1, 2, 5] },
  { name: "Data Modeling",      color: "#22c55e", weeks: [6, 7] },
  { name: "Cloud & DevOps",     color: "#A855F7", weeks: [7, 8] },
  { name: "Analytics & BI",     color: "#F59E0B", weeks: [9, 10, 11] },
];

export default function ProgressPage() {
  const [data, setData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const { completedWeeks: storeWeeks, getCompletionPercentage } = useProgressStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchUserProgress();
        if (res.success) {
          setData({
            completedWeeks: res.completedWeeks ?? [],
            xpTotal: res.xpTotal ?? 0,
            currentStreak: res.currentStreak ?? 0,
            longestStreak: res.longestStreak ?? 0,
            totalStudyMinutes: res.totalStudyMinutes ?? 0,
            phaseCompletion: (res.phaseCompletion ?? {}) as Record<string, number>,
            achievements: res.achievements ?? [],
          });
        }
      } catch (err) {
        console.error("Failed to load progress", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Use server data when available, fallback to Zustand store
  const completedWeeks = data?.completedWeeks ?? (mounted ? storeWeeks : []);
  const overallPct = mounted ? getCompletionPercentage() : 0;
  const totalHours = Math.round((data?.totalStudyMinutes ?? 0) / 60);
  const xpTotal = data?.xpTotal ?? 0;
  const currentStreak = data?.currentStreak ?? 0;
  const achievements = data?.achievements ?? [];

  // Compute phase completion percentages dynamically
  const phaseCompletions = PHASES.map((phase) => {
    const done = phase.weeks.filter((w) => completedWeeks.includes(w)).length;
    return { ...phase, pct: phase.weeks.length > 0 ? Math.round((done / phase.weeks.length) * 100) : 0 };
  });

  // Compute skill proficiency dynamically
  const skills = SKILL_MAP.map((skill) => {
    const done = skill.weeks.filter((w) => completedWeeks.includes(w)).length;
    return { ...skill, pct: skill.weeks.length > 0 ? Math.round((done / skill.weeks.length) * 100) : 0 };
  });

  // Compute weekly study hours from store data
  const totalWeeks = CURRICULUM.reduce((acc, p) => acc + p.weeks.length, 0);

  return (
    <div className="min-h-screen bg-[#0F151B] text-[#E5E7EB] font-sans selection:bg-[#F97316]/30">
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
            <div className="text-[34px] font-bold text-white leading-none tracking-tight">
              {loading ? <Loader2 className="w-8 h-8 animate-spin text-[#374151]" /> : <>{Math.round(overallPct)}<span className="text-lg text-[#9CA3AF] ml-0.5">%</span></>}
            </div>
            <div className="text-[12px] font-mono text-[#9CA3AF] tracking-wide">Overall Completion</div>
          </div>

          {/* Current Streak */}
          <div className="bg-[#19222E] rounded-xl border border-[#1e293b] p-6 flex flex-col gap-3 group hover:border-[#374151] transition-colors">
            <div className="flex items-center justify-between">
              <Flame className="w-5 h-5 text-[#F97316]" />
              <ArrowUpRight className="w-4 h-4 text-[#22c55e] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-[34px] font-bold text-white leading-none tracking-tight">
              {loading ? <Loader2 className="w-8 h-8 animate-spin text-[#374151]" /> : <>{currentStreak}<span className="text-lg text-[#9CA3AF] ml-1">days</span></>}
            </div>
            <div className="text-[12px] font-mono text-[#9CA3AF] tracking-wide">Current Streak</div>
          </div>

          {/* Total Hours */}
          <div className="bg-[#19222E] rounded-xl border border-[#1e293b] p-6 flex flex-col gap-3 group hover:border-[#374151] transition-colors">
            <div className="flex items-center justify-between">
              <Clock className="w-5 h-5 text-[#38bdf8]" />
              <ArrowUpRight className="w-4 h-4 text-[#22c55e] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-[34px] font-bold text-white leading-none tracking-tight">
              {loading ? <Loader2 className="w-8 h-8 animate-spin text-[#374151]" /> : <>{totalHours}<span className="text-lg text-[#9CA3AF] ml-1">hrs</span></>}
            </div>
            <div className="text-[12px] font-mono text-[#9CA3AF] tracking-wide">Total Study Hours</div>
          </div>

          {/* XP Earned */}
          <div className="bg-[#19222E] rounded-xl border border-[#1e293b] p-6 flex flex-col gap-3 group hover:border-[#374151] transition-colors">
            <div className="flex items-center justify-between">
              <Zap className="w-5 h-5 text-[#F59E0B]" />
              <ArrowUpRight className="w-4 h-4 text-[#22c55e] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-[34px] font-bold text-white leading-none tracking-tight">
              {loading ? <Loader2 className="w-8 h-8 animate-spin text-[#374151]" /> : <>{xpTotal.toLocaleString()}<span className="text-lg text-[#9CA3AF] ml-1">xp</span></>}
            </div>
            <div className="text-[12px] font-mono text-[#9CA3AF] tracking-wide">Experience Earned</div>
          </div>
        </div>

        {/* ── MID-ROW : Activity Heat + Skill Breakdown ── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
          <ActivityHeatmap />

          {/* Skill Proficiency */}
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
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${s.pct}%`,
                        backgroundColor: s.color,
                        boxShadow: s.pct > 0 ? `0 0 10px ${s.color}40` : "none",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── BOTTOM ROW : Achievements ── */}
        <div className="mb-12">
          <section className="bg-[#19222E] rounded-xl border border-[#1e293b] p-8">
            <div className="flex items-center gap-3 mb-8">
              <Award className="w-5 h-5 text-[#F59E0B]" />
              <h3 className="text-[15px] font-bold text-white">Achievements</h3>
              <span className="ml-auto text-[11px] font-mono text-[#6B7280]">
                {achievements.filter((a) => a.earnedAt).length}/{achievements.length} unlocked
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
              {loading ? (
                <div className="col-span-full text-xs font-mono text-[#6B7280] animate-pulse">Loading achievements...</div>
              ) : achievements.length === 0 ? (
                <div className="col-span-full text-xs font-mono text-[#6B7280]">No achievements yet. Start learning!</div>
              ) : (
                achievements.map((a) => (
                  <div
                    key={a.slug}
                    className={cn(
                      "flex flex-col items-center text-center p-4 rounded-lg border transition-colors cursor-default",
                      a.earnedAt
                        ? "bg-[#141B23] border-[#253141] hover:border-[#374151]"
                        : "bg-[#0F151B] border-[#1A232E] opacity-40 grayscale"
                    )}
                  >
                    <div className="text-2xl mb-2">{a.icon}</div>
                    <div className={cn("text-[12px] font-semibold mb-1", a.earnedAt ? "text-white" : "text-[#6B7280]")}>
                      {a.title}
                    </div>
                    <div className="text-[10px] font-mono text-[#6B7280] leading-snug">{a.description}</div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* ── PHASE COMPLETION TIMELINE ── */}
        <section className="bg-[#19222E] rounded-xl border border-[#1e293b] p-8">
          <div className="flex items-center gap-3 mb-8">
            <CheckCircle2 className="w-5 h-5 text-[#22c55e]" />
            <h3 className="text-[15px] font-bold text-white">Phase Completion</h3>
          </div>

          <div className="flex items-center gap-4">
            {phaseCompletions.map((phase, i) => (
              <React.Fragment key={phase.key}>
                {i > 0 && <div className="w-px h-10 bg-[#253141] shrink-0" />}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] font-mono text-[#D1D5DB]">{phase.label}</span>
                    <span
                      className="text-[10px] font-mono"
                      style={{ color: phase.pct > 0 ? phase.color : "#6B7280" }}
                    >
                      {phase.pct}%
                    </span>
                  </div>
                  <div className="h-2 bg-[#1A232E] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${phase.pct}%`,
                        backgroundColor: phase.color,
                        boxShadow: phase.pct > 0 ? `0 0 8px ${phase.color}40` : "none",
                      }}
                    />
                  </div>
                  <div className="text-[10px] font-mono text-[#6B7280] mt-2">{phase.title}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
