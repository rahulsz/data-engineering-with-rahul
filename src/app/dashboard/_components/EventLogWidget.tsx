"use client";

import React, { useEffect, useState } from "react";
import { fetchRecentActivity } from "@/app/actions/progressSync";
import { formatDistanceToNow } from "date-fns";
import type { IActivityLog } from "@/models/ActivityLog";
import { cn } from "@/lib/cn";

export default function EventLogWidget() {
  const [activities, setActivities] = useState<IActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLogs() {
      try {
        const res = await fetchRecentActivity(5);
        if (res.success && res.activities) {
          setActivities(res.activities);
        }
      } catch (err) {
        console.error("Failed to fetch activity log", err);
      } finally {
        setLoading(false);
      }
    }
    loadLogs();
  }, []);

  // Helper to map ActivityType to accent colors
  const getColorClasses = (type: string) => {
    switch (type) {
      case "lesson_complete":
      case "quiz_passed":
      case "module_unlocked":
        return "bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.6)]"; // Green
      case "badge_earned":
      case "streak_milestone":
        return "bg-[#A855F7] shadow-[0_0_8px_rgba(168,85,247,0.6)]"; // Purple
      case "study_session":
        return "bg-[#F97316] shadow-[0_0_8px_rgba(249,115,22,0.6)]"; // Orange
      case "quiz_failed":
        return "bg-[#ef4444] shadow-[0_0_8px_rgba(239,68,68,0.6)]"; // Red
      case "login":
      default:
        return "bg-[#38bdf8] shadow-[0_0_8px_rgba(56,189,248,0.6)]"; // Blue
    }
  };

  return (
    <section className="bg-[#19222E] rounded-xl p-8 flex-1 border-t-2 border-t-transparent hover:border-[#38bdf8]/30 transition-colors">
      <h3 className="text-[11px] font-bold tracking-[0.15em] text-[#9CA3AF] uppercase mb-6">Event Log</h3>
      
      <div className="relative border-l border-[#374151] ml-2 pb-4 space-y-8 mt-2 min-h-[150px]">
        {loading ? (
          <div className="text-xs font-mono text-[#6B7280] pl-6 animate-pulse">Syncing uplinks...</div>
        ) : activities.length === 0 ? (
          <div className="text-xs font-mono text-[#6B7280] pl-6">No recent communications.</div>
        ) : (
          activities.map((activity) => (
            <div key={activity._id as string} className="relative pl-6">
              <div 
                className={cn(
                  "absolute w-[11px] h-[11px] rounded-full -left-[6px] top-1",
                  getColorClasses(activity.type)
                )}
              />
              <div className="text-[13px] font-semibold text-[#E5E7EB]">{activity.title}</div>
              <div className="text-[11px] font-mono text-[#9CA3AF] mt-1.5 opacity-80">
                {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
