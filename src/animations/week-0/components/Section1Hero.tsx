"use client";

import React from "react";
import CurriculumHero from "@/components/curriculum/CurriculumHero";

export default function Section1Hero() {
  return (
    <CurriculumHero
      phase="PHASE 0 — ORIENTATION"
      phaseIcon={<span className="text-sm">⚡</span>}
      week="W0"
      title="Setting the Stage"
      description="Before you write a single line of code, you need to understand the battlefield. This is Day 1."
      pills={[
        { text: "📅 Day 1 Only" },
        { text: "🟢 Beginner" },
        { text: "⏱ 3–4 Hours" },
        { text: "🛠 Databricks CE" }
      ]}
      topics={["Intro to DE", "Supply Chain", "Databricks Setup", "Course Structure", "Capstone Overview"]}
      glowTopColor="bg-[#F97316]"
      glowBottomColor="bg-[#06b6d4]"
    />
  );
}
