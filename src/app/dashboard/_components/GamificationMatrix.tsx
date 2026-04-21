"use client";

import React, { useEffect, useState } from "react";
import { Award } from "lucide-react";
import { cn } from "@/lib/cn";
import { fetchUserProgress } from "@/app/actions/progressSync";
import type { IAchievement } from "@/models/Achievement";

export default function GamificationMatrix() {
  const [achievements, setAchievements] = useState<IAchievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAchievements() {
      try {
        const res = await fetchUserProgress();
        if (res.success && res.achievements) {
          setAchievements(res.achievements);
        }
      } catch (err) {
        console.error("Failed to load achievements", err);
      } finally {
        setLoading(false);
      }
    }
    loadAchievements();
  }, []);

  const getBadgeStyles = (category: string) => {
    switch (category) {
      case "streak":
        return { color: "text-[#F97316]", bg: "bg-[#F97316]/10", border: "border-[#F97316]/20" }; // Orange
      case "quiz":
        return { color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" }; // Green
      case "speed":
        return { color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" }; // Blue
      case "completion":
        return { color: "text-[#A855F7]", bg: "bg-[#A855F7]/10", border: "border-[#A855F7]/20" }; // Purple
      case "bonus":
        return { color: "text-pink-400", bg: "bg-pink-400/10", border: "border-pink-400/20" }; // Pink
      case "progress":
      default:
        return { color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" }; // Amber
    }
  };

  return (
    <section className="bg-[#19222E] rounded-xl p-8 h-full border border-transparent hover:border-[#374151]/50 transition-colors">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[#253141]">
        <Award className="w-6 h-6 text-[#F97316]" />
        <h3 className="text-[18px] font-bold text-white tracking-tight">Gamification Matrix</h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-2 gap-4">
        {loading ? (
          <div className="col-span-2 text-xs font-mono text-[#6B7280] animate-pulse">Loading achievements...</div>
        ) : achievements.length === 0 ? (
          <div className="col-span-2 text-xs font-mono text-[#6B7280]">No achievements seeded.</div>
        ) : (
          achievements.map((badge) => {
            const isUnlocked = badge.earnedAt !== null;
            const styles = getBadgeStyles(badge.category);

            return (
              <div 
                key={badge.slug}
                className={cn(
                  "p-4 rounded-xl border flex flex-col items-center text-center transition-all duration-300",
                  isUnlocked 
                    ? `${styles.bg} ${styles.border} shadow-[0_0_15px_rgba(0,0,0,0.1)] scale-100 opacity-100` 
                    : "bg-[#111823] border-[#253141] scale-[0.98] opacity-50 grayscale hover:grayscale-[50%] hover:opacity-80"
                )}
              >
                <div className={cn(
                  "w-12 h-12 flex items-center justify-center rounded-full mb-3 text-2xl",
                  isUnlocked ? styles.bg : "bg-[#1C2532]"
                )}>
                  {badge.icon || "🏆"}
                </div>
                <h4 className={cn("text-[13px] font-bold tracking-wide mb-1", isUnlocked ? "text-white" : "text-[#9CA3AF]")}>
                  {badge.title}
                </h4>
                <p className="text-[11px] text-[#556070] font-mono leading-tight max-w-[120px] mb-auto">
                  {badge.description}
                </p>
                
                {isUnlocked ? (
                  <div className="mt-3 px-2 py-0.5 rounded text-[9px] font-bold font-mono tracking-widest uppercase bg-[#212C3A] text-white border border-[#374151]">
                    Unlocked
                  </div>
                ) : (
                  <div className="mt-3 px-2 py-0.5 rounded text-[9px] font-bold font-mono tracking-widest uppercase bg-transparent text-[#4B5563] border border-[#253141]">
                    Locked
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
