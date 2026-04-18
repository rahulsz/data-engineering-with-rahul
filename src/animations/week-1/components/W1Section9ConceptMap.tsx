"use client";

import React from "react";
import CurriculumConceptMap, { ConceptGroup } from "@/components/curriculum/CurriculumConceptMap";
import { Link } from "lucide-react";

export default function W1Section9ConceptMap() {
  const groups: ConceptGroup[] = [
    {
      label: "↓ From Week 0",
      labelColor: "text-[#c084fc]",
      items: [
        { source: "Databricks Setup (W0)", target: "Python Notebooks (W1)", desc: "Every Databricks notebook runs Python — setup enables execution", srcColor: "text-[#c084fc]", tgtColor: "text-[#38bdf8]" },
        { source: "Capstone Overview (W0)", target: "File Handling (W1)", desc: "Raw CSV files are the first data source in the capstone ingestion layer", srcColor: "text-[#c084fc]", tgtColor: "text-[#38bdf8]" },
      ]
    },
    {
      label: "↑ To Future Weeks",
      labelColor: "text-[#22c55e]",
      items: [
        { source: "Variables & Datatypes", target: "Pandas DataFrames (W2)", desc: "DataFrames are dictionaries at scale — same mental model, bigger data", srcColor: "text-[#38bdf8]", tgtColor: "text-[#22c55e]" },
        { source: "Functions & Modules", target: "PySpark ETL (W5)", desc: "PySpark transformation logic is organized as Python functions and modules", srcColor: "text-[#38bdf8]", tgtColor: "text-[#22c55e]" },
        { source: "File Handling (CSV/JSON)", target: "Delta Lake Ingestion (W4)", desc: "Reading CSVs manually becomes automated Delta table writes in Week 4", srcColor: "text-[#38bdf8]", tgtColor: "text-[#22c55e]" },
        { source: "Git Fundamentals", target: "CI/CD Pipelines (W8)", desc: "Git branching strategy from Week 1 is the foundation of Week 8 automation", srcColor: "text-[#38bdf8]", tgtColor: "text-[#22c55e]" },
        { source: "Jira User Stories", target: "ETL Architecture (W8)", desc: "Every pipeline in Week 8 traces back to a User Story written in Week 1 format", srcColor: "text-[#38bdf8]", tgtColor: "text-[#22c55e]" },
        { source: "Loops & Conditions", target: "Data Validation Layer (W8)", desc: "The if/elif/else validation logic here scales to PySpark DataFrame filters", srcColor: "text-[#38bdf8]", tgtColor: "text-[#22c55e]" },
      ]
    }
  ];

  return (
    <CurriculumConceptMap
      badgeText="Concept Connections"
      badgeIcon={<Link className="w-5 h-5" />}
      title="How Week 1 Connects Forward & Backward"
      groups={groups}
    />
  );
}
