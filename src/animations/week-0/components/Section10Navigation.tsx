"use client";

import React from "react";
import CurriculumNavigation from "@/components/curriculum/CurriculumNavigation";

export default function Section10Navigation() {
  return (
    <CurriculumNavigation
      previous={{
        href: "",
        phase: "",
        label: "You're at the beginning",
        disabled: true
      }}
      next={{
        href: "/curriculum/foundations/week-1",
        phase: "PHASE 1 — DATA ENGINEERING FOUNDATIONS",
        label: "W1 — Python Basics + Git + Jira"
      }}
      breadcrumb={<>Phase 0 <span className="text-[#6B7280]">›</span> Week 0</>}
    />
  );
}
