"use client";

import React from "react";
import CurriculumResources, { ResourceCategory } from "@/components/curriculum/CurriculumResources";
import { FileText, Crosshair, Database } from "lucide-react";

export default function Section9Resources() {
  const categories: ResourceCategory[] = [
    {
      id: "docs",
      icon: <FileText className="w-5 h-5" />,
      label: "OFFICIAL DOCS",
      colorClass: "text-[#38bdf8]",
      borderHoverClass: "hover:border-[#38bdf8]/50 focus-within:border-[#38bdf8]/50",
      bgHoverGradient: "from-[#38bdf8]/20 to-transparent",
      items: [
        { title: "Databricks Getting Started", url: "https://docs.databricks.com/getting-started", desc: 'Read: "Quickstart: Run your first ETL workload" (15 min)' },
        { title: "Delta Lake Documentation", url: "https://delta.io/learn", desc: 'Skim: "What is Delta Lake?" and "Quickstart" pages' },
        { title: "Git Reference Manual", url: "https://git-scm.com/docs", desc: "Bookmark: git commit, git branch, git push pages" }
      ]
    },
    {
      id: "practice",
      icon: <Crosshair className="w-5 h-5" />,
      label: "PRACTICE PLATFORMS",
      colorClass: "text-[#F97316]",
      borderHoverClass: "hover:border-[#F97316]/50 focus-within:border-[#F97316]/50",
      bgHoverGradient: "from-[#F97316]/20 to-transparent",
      items: [
        { title: "Databricks Academy", url: "https://academy.databricks.com", desc: '"Data Engineering with Databricks" learning path (Free)' },
        { title: "GitHub Learning Lab", url: "https://skills.github.com", desc: '"Introduction to GitHub" — 1 hour, eliminates Git confusion' }
      ]
    },
    {
      id: "datasets",
      icon: <Database className="w-5 h-5" />,
      label: "DATASETS FOR CAPSTONE",
      colorClass: "text-[#22c55e]",
      borderHoverClass: "hover:border-[#22c55e]/50 focus-within:border-[#22c55e]/50",
      bgHoverGradient: "from-[#22c55e]/20 to-transparent",
      items: [
        { title: "UCI Online Retail Dataset", url: "https://archive.ics.uci.edu", desc: "500K real e-commerce transactions. Used as GlobalMart source." },
        { title: "Kaggle Supply Chain Dataset", url: "https://kaggle.com", desc: 'Search: "Supply Chain Analysis Kaggle". Covers orders & shipping.' }
      ]
    }
  ];

  return (
    <CurriculumResources
      badgeText="Resources"
      badgeIcon={<span className="text-xl">🔖</span>}
      title="What to Read, Watch & Explore"
      categories={categories}
    />
  );
}
