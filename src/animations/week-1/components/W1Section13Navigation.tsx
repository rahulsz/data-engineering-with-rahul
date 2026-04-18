"use client";

import React from "react";
import CurriculumNavigation from "@/components/curriculum/CurriculumNavigation";
import { Search, Eraser, Link as LinkIcon, Package } from "lucide-react";

export default function W1Section13Navigation() {
  return (
    <CurriculumNavigation
      whatsNext={{
        title: "Week 2: Intermediate Python + Pandas",
        description: (
          <p>
            Week 2 takes everything you built this week and scales it. Instead of manually looping through 5 inventory rows with plain Python, you will load 50,000 rows into a Pandas DataFrame in a single line. The functions you wrote in product_utils.py this week will become the logic inside DataFrame .apply() calls next week. Come with your Week 1 code open — you&apos;ll refactor it into production-grade Pandas pipelines.
          </p>
        ),
        previewTitle: "Week 2 Preview",
        previewItems: [
          { icon: <Search className="w-4 h-4 text-[#38bdf8]" />, text: "Pandas DataFrames from scratch" },
          { icon: <Search className="w-4 h-4 text-[#f59e0b]" />, text: "EDA on GlobalMart inventory & orders data" },
          { icon: <Eraser className="w-4 h-4 text-[#ef4444]" />, text: "Data cleansing: nulls, duplicates, type casting" },
          { icon: <LinkIcon className="w-4 h-4 text-[#c084fc]" />, text: "Merging DataFrames like SQL JOINs" },
          { icon: <Package className="w-4 h-4 text-[#22c55e]" />, text: "Projects: Procurement Pipeline + Inventory Summary" },
        ]
      }}
      previous={{
        href: "/curriculum/orientation/week-0",
        phase: "PHASE 0 — ORIENTATION",
        label: "W0 — Setting the Stage"
      }}
      next={{
        href: "/curriculum/foundations/week-2",
        phase: "PHASE 1 — FOUNDATIONS",
        label: "W2 — Intermediate Python + Pandas"
      }}
      breadcrumb="PHASE 1 › Week 1"
    />
  );
}
