"use client";

import React from "react";
import CurriculumHero from "@/components/curriculum/CurriculumHero";
import { Zap, Calendar, Clock, Terminal, GitBranch, ClipboardList } from "lucide-react";

export default function W1Section1Hero() {
  return (
    <CurriculumHero
      phase="PHASE 1 — DATA ENGINEERING FOUNDATIONS"
      phaseIcon={<Zap className="w-3 h-3 fill-current" />}
      phaseBadgeBgColor="bg-[#0d1a2e]"
      phaseBadgeTextColor="text-[#38bdf8]"
      phaseBadgeBorderColor="border-[#38bdf8]/30"
      week="W1"
      title="Python Basics + Git + Jira"
      description="Every data pipeline ever written started with someone opening a Python file. This is where yours begins."
      pills={[
        { icon: <Calendar className="w-3.5 h-3.5" />, text: "Week 1" },
        { icon: <Zap className="w-3.5 h-3.5 text-green-400" />, text: "Beginner" },
        { icon: <Clock className="w-3.5 h-3.5" />, text: "8–10 Hours" },
        { icon: <Terminal className="w-3.5 h-3.5 text-blue-400" />, text: "Python" },
        { icon: <GitBranch className="w-3.5 h-3.5 text-orange-400" />, text: "Git" },
        { icon: <ClipboardList className="w-3.5 h-3.5 text-white" />, text: "Jira" }
      ]}
      topics={["Variables & Datatypes", "Lists, Tuples, Dicts", "Loops & Conditions", "Functions", "File Handling", "Git Fundamentals", "Jira User Stories"]}
      glowTopColor="bg-[#38bdf8]"
      glowBottomColor="bg-[#F97316]"
    />
  );
}
