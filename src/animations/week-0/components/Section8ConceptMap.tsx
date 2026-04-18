"use client";

import React from "react";
import CurriculumConceptMap, { ConceptGroup } from "@/components/curriculum/CurriculumConceptMap";

export default function Section8ConceptMap() {
  const groups: ConceptGroup[] = [
    {
      items: [
        { source: "What is Data Engineering", target: "Python + Pandas (W2)", desc: "Python is the primary language of the modern data engineer" },
        { source: "What is Data Engineering", target: "ETL/ELT Architecture (W8)", desc: "Pipelines you design conceptually here get built with CI/CD" },
        { source: "Supply Chain Case", target: "SQL Fundamentals (W3)", desc: "GlobalMart schemas are the dataset for all SQL labs" },
        { source: "Supply Chain Case", target: "Data Modelling (W7)", desc: "Business questions here drive the Star Schema you'll design" },
        { source: "Databricks Setup", target: "Delta Lake (W4)", desc: "The workspace and databases you create now extend in Week 4" },
        { source: "Capstone Overview", target: "Cloud Fundamentals (W6)", desc: "Capstone data sources live in Azure ADLS or AWS S3" }
      ]
    }
  ];

  return (
    <CurriculumConceptMap
      badgeText="Concept Connections"
      badgeIcon={<span className="text-xl">🔗</span>}
      title="How Week 0 Connects to Everything"
      groups={groups}
    />
  );
}
