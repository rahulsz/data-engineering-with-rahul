"use client";

import React from "react";
import CurriculumResources, { ResourceCategory } from "@/components/curriculum/CurriculumResources";
import { FileText, Target, Package, BookOpen, Library } from "lucide-react";

export default function W1Section12Resources() {
  const categories: ResourceCategory[] = [
    {
      id: "docs",
      label: "Official Docs",
      icon: <FileText className="w-5 h-5" />,
      colorClass: "text-[#38bdf8]",
      borderHoverClass: "hover:border-[#38bdf8]/50",
      bgHoverGradient: "from-[#38bdf8]/20 to-transparent",
      items: [
        { title: "Python Official Tutorial", desc: "Read chapters 3–5: Numbers, Strings, Lists, Control Flow, Functions", url: "https://docs.python.org/3/tutorial" },
        { title: "Python csv module", desc: "Read DictReader and DictWriter sections specifically", url: "https://docs.python.org/3/library/csv.html" },
        { title: "Python json module", desc: "Read json.load() and json.dump() with the indent parameter", url: "https://docs.python.org/3/library/json.html" },
        { title: "Git Cheat Sheet", desc: "Print this. Pin it. Use it daily for the first 3 weeks.", url: "https://education.github.com/git-cheat-sheet-education.pdf" },
      ],
    },
    {
      id: "practice",
      label: "Practice Platforms",
      icon: <Target className="w-5 h-5" />,
      colorClass: "text-[#22c55e]",
      borderHoverClass: "hover:border-[#22c55e]/50",
      bgHoverGradient: "from-[#22c55e]/20 to-transparent",
      items: [
        { title: "HackerRank Python", desc: "Complete: Basic Data Types, Lists, Dictionaries (10 problems total)", url: "https://hackerrank.com/domains/python" },
        { title: "Learn Git Branching", desc: "Visual interactive Git — do Levels 1–4 of Main before Week 2", url: "https://learngitbranching.js.org" },
      ],
    },
    {
      id: "datasets",
      label: "This Week's Datasets",
      icon: <Package className="w-5 h-5" />,
      colorClass: "text-[#F97316]",
      borderHoverClass: "hover:border-[#F97316]/50",
      bgHoverGradient: "from-[#F97316]/20 to-transparent",
      items: [
        { title: "GlobalMart inventory_snapshot CSV", desc: "data/raw/inventory_snapshot_2024_11_01.csv", mono: true },
        { title: "GlobalMart purchase_orders JSON", desc: "data/raw/purchase_orders_2024_11.json", mono: true },
      ],
    },
    {
      id: "reading",
      label: "Recommended Reading",
      icon: <BookOpen className="w-5 h-5" />,
      colorClass: "text-[#c084fc]",
      borderHoverClass: "hover:border-[#c084fc]/50",
      bgHoverGradient: "from-[#c084fc]/20 to-transparent",
      items: [
        { title: '"Clean Code" Chapter 3 — Functions', desc: "The single-responsibility principle explained for practitioners" },
        { title: '"Pro Git" Book', desc: "Read Chapter 2: Git Basics — the only chapter you need this week", url: "https://git-scm.com/book" },
      ],
    },
  ];

  return (
    <CurriculumResources
      badgeText="Resources"
      badgeIcon={<Library className="w-5 h-5" />}
      title="Week 1 Study Materials"
      categories={categories}
    />
  );
}
