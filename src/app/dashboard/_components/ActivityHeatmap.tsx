"use client";

import React, { useState, useEffect } from "react";
import { ActivityCalendar, ThemeInput } from "react-activity-calendar";
import { Activity } from "lucide-react";
import { subDays, format } from "date-fns";

import { fetchActivityHeatmap, fetchUserProgress } from "@/app/actions/progressSync";

export default function ActivityHeatmap() {
  const [data, setData] = useState<{ date: string; count: number; level: number }[]>([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  useEffect(() => {
    async function loadActivity() {
      try {
        const [heatmapRes, progressRes] = await Promise.all([
          fetchActivityHeatmap(180),
          fetchUserProgress()
        ]);

        if (progressRes.success) {
          setCurrentStreak(progressRes.currentStreak || 0);
          setLongestStreak(progressRes.longestStreak || 0);
        }

        const hm = heatmapRes.success && heatmapRes.heatmap ? heatmapRes.heatmap : {};
        const realData = [];
        const today = new Date();
        
        for (let i = 180; i >= 0; i--) {
          const date = subDays(today, i);
          const dateStr = format(date, "yyyy-MM-dd");
          
          const count = hm[dateStr] || 0;
          let level = 0;
          if (count > 0) {
            level = Math.max(1, Math.min(Math.ceil(count / 2), 4));
          }
          
          realData.push({ date: dateStr, count, level });
        }
        
        setData(realData);
      } catch (err) {
        console.error("Failed to load activity data", err);
      }
    }
    
    loadActivity();
  }, []);

  const heatMapTheme: ThemeInput = {
    light: [
      '#1C2532',  // Level 0
      '#F9731640', // Level 1
      '#F9731680', // Level 2
      '#F97316C0', // Level 3
      '#F97316'    // Level 4
    ],
    dark: [
      '#1C2532',  // Level 0 (bg-[#1C2532])
      'rgba(249, 115, 22, 0.3)', // Level 1
      'rgba(249, 115, 22, 0.6)', // Level 2
      'rgba(249, 115, 22, 0.8)', // Level 3
      '#F97316'    // Level 4
    ]
  };

  return (
    <section className="bg-[#19222E] rounded-xl p-8 h-full border border-transparent hover:border-[#F97316]/30 transition-colors shadow-lg">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Activity className="w-6 h-6 text-[#F97316]" />
          <div>
            <h3 className="text-[18px] font-bold text-white tracking-tight">Activity Heatmap</h3>
            <p className="text-[11px] font-mono text-[#9CA3AF] tracking-widest mt-0.5">LAST 6 MONTHS</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4 text-[11px] font-mono whitespace-nowrap">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span className="text-[#9CA3AF]">Current Streak: <span className="text-white font-bold">{currentStreak} Days</span></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#38bdf8]" />
            <span className="text-[#9CA3AF]">Longest: <span className="text-white font-bold">{longestStreak} Days</span></span>
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
        <div className="min-w-[700px]">
          {data.length > 0 ? (
            <ActivityCalendar 
              data={data}
              theme={heatMapTheme}
              colorScheme="dark"
              labels={{
                legend: {
                  less: "Less",
                  more: "More"
                },
                months: [
                  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ],
                totalCount: "{{count}} modules mastered in 6 months",
              }}
              blockSize={13}
              blockMargin={4}
              fontSize={12}
              showWeekdayLabels={true}
            />
          ) : (
            <div className="h-[120px] bg-[#111823] animate-pulse rounded border border-[#253141]"></div>
          )}
        </div>
      </div>
    </section>
  );
}
