"use client";

import React from "react";
import CurriculumQuiz, { QuizQuestion, QuizTier } from "@/components/curriculum/CurriculumQuiz";
import { Trophy, BrainCircuit, BookOpen } from "lucide-react";

export default function Week0Quiz() {
  const quizData: QuizQuestion[] = [
    {
      q: "What is the primary role of a Data Engineer?",
      options: [
        "Build machine learning models",
        "Create customer-facing web applications",
        "Design and maintain infrastructure that delivers data to consumers",
        "Write SQL reports for business stakeholders"
      ],
      correct: 2,
      explanation: "A Data Engineer builds the highways. Other roles drive on them."
    },
    {
      q: "In the GlobalMart Medallion Architecture, where do you land a record with a NULL supplier_id from the source file?",
      options: [
        "Drop it — nulls should never enter the platform",
        "Fix it before landing with a default value",
        "Land it in Bronze unchanged, flag it in Silver validation",
        "Land it directly into Silver with the null corrected"
      ],
      correct: 2,
      explanation: "Bronze is a crime scene photograph — never alter the evidence."
    },
    {
      q: "Which layer would Power BI connect to for an executive KPI dashboard?",
      options: [
        "Bronze — to ensure raw accuracy",
        "Silver — for clean transactions",
        "Gold — pre-aggregated, business-ready",
        "The source SAP ERP system directly"
      ],
      correct: 2,
      explanation: "Gold is purpose-built for BI consumption. Always."
    },
    {
      q: "You commit with message 'fixed stuff'. A senior engineer asks you to amend it. Why?",
      options: [
        "Databricks notebooks can't be committed to GitHub",
        "The message lacks a ticket reference and change description",
        "The branching strategy is wrong",
        "The file format is incompatible"
      ],
      correct: 1,
      explanation: "Commit messages are a letter to your future self and your team."
    },
    {
      q: "What is the key difference between a Data Lake and a Data Warehouse?",
      options: [
        "Data Lakes store only structured data",
        "Data Lakes store raw data at low cost; Warehouses store clean structured data for querying",
        "Data Lakes are only for Data Scientists",
        "Data Warehouses require schema-on-read"
      ],
      correct: 1,
      explanation: "Databricks Delta Lake merges both concepts — the Lakehouse."
    }
  ];


  return (
    <CurriculumQuiz
      badgeText="Knowledge Check"
      badgeIcon={<span className="text-xl">📝</span>}
      title="5 Questions — Test Your Understanding"
      questions={quizData}
    />
  );
}
