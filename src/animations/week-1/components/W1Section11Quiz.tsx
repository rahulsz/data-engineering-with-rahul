"use client";

import React from "react";
import CurriculumQuiz, { QuizQuestion, QuizTier } from "@/components/curriculum/CurriculumQuiz";
import { FileText, Trophy, Brain, BookOpen } from "lucide-react";

export default function W1Section11Quiz() {
  const questions: QuizQuestion[] = [
    {
      q: "You have a list of 50,000 inventory rows in a Python list. Which structure would you use to store a single row?",
      options: [
        "A list — because it's ordered",
        "A tuple — because it's immutable",
        "A dictionary — because it maps column names to values",
        "A string — because rows come from CSV text files",
      ],
      correct: 2,
      explanation: "Each CSV row is key→value pairs. dict is the natural fit — and it's exactly what csv.DictReader gives you automatically.",
    },
    {
      q: "Your pipeline crashes on row 1,847 because unit_cost is stored as the string \"12.75\" instead of float 12.75. What caused this?",
      options: [
        "Python cannot handle decimals",
        "The CSV file is corrupt",
        "unit_cost was never explicitly cast to float()",
        "The csv module doesn't support decimal values",
      ],
      correct: 2,
      explanation: "csv.DictReader returns every value as a string. Always cast: quantity=int(row['quantity']), unit_cost=float(row['unit_cost']).",
    },
    {
      q: "You're about to start working on Jira story GDP-12. What is the first Git command you run?",
      options: [
        'git commit -m "starting GDP-12"',
        "git checkout -b feature/GDP-12-inventory-reader",
        "git push origin main",
        "git merge main",
      ],
      correct: 1,
      explanation: "Always create a feature branch before you start. Never work directly on main. Branch name should include the Jira ticket ID.",
    },
    {
      q: "Which commit message follows professional conventions?",
      options: [
        '"done"',
        '"inventory script working finally"',
        '"feat(week-1): add CSV inventory reader with reorder flagging  Refs: GDP-12"',
        '"INVENTORY CSV READER COMPLETE DO NOT TOUCH"',
      ],
      correct: 2,
      explanation: "Professional commits follow type(scope): description and always reference the Jira ticket.",
    },
    {
      q: "A function named process_order() reads a CSV, validates fields, calculates total cost, logs the result, and emails the warehouse team. What is wrong with this?",
      options: [
        "Nothing — functions should do as much as possible",
        "It violates single-responsibility — it does 5 separate things",
        "Functions cannot send emails",
        "Logging should happen outside of functions",
      ],
      correct: 1,
      explanation: "One function, one job. Split into: read_csv(), validate_order(), calculate_total(), log_result(), notify_warehouse(). Each is now testable, reusable, and debuggable in isolation.",
    },
  ];

  const resultTiers: QuizTier[] = [
    {
      minPercentage: 100,
      maxPercentage: 100,
      icon: <Trophy className="w-12 h-12 text-[#22c55e]" />,
      msg: "🏆 Pythonista unlocked. Week 2 awaits.",
      colorClass: "text-[#22c55e]",
      borderColorClass: "border-[#22c55e]/50",
      bgGradientClass: "from-[#22c55e]/20 to-[#141B23]"
    },
    {
      minPercentage: 60,
      maxPercentage: 99,
      icon: <Brain className="w-12 h-12 text-[#f59e0b]" />,
      msg: "💪 Strong base. Review functions and Git sections.",
      colorClass: "text-[#f59e0b]",
      borderColorClass: "border-[#f59e0b]/50",
      bgGradientClass: "from-[#f59e0b]/20 to-[#141B23]"
    },
    {
      minPercentage: 0,
      maxPercentage: 59,
      icon: <BookOpen className="w-12 h-12 text-[#ef4444]" />,
      msg: "📖 Re-read Loops and File Handling — then retry.",
      colorClass: "text-[#ef4444]",
      borderColorClass: "border-[#ef4444]/50",
      bgGradientClass: "from-[#ef4444]/20 to-[#141B23]"
    }
  ];

  return (
    <CurriculumQuiz
      badgeText="Knowledge Check"
      badgeIcon={<FileText className="w-5 h-5" />}
      title="Week 1 Quiz"
      questions={questions}
      resultTiers={resultTiers}
    />
  );
}
