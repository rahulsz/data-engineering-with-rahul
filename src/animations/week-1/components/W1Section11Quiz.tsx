"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

const fadeUp: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: 0.4 } } };
const stagger: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const popIn: Variants = { hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 200, damping: 20 } } };

type Question = {
  q: string;
  options: string[];
  correct: number;
  explanation: string;
};

const questions: Question[] = [
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

const resultTiers = [
  { min: 5, max: 5, msg: "🏆 Pythonista unlocked. Week 2 awaits.", color: "text-[#22c55e]" },
  { min: 3, max: 4, msg: "💪 Strong base. Review functions and Git sections.", color: "text-[#f59e0b]" },
  { min: 0, max: 2, msg: "📖 Re-read Loops and File Handling — then retry.", color: "text-[#ef4444]" },
];

export default function W1Section11Quiz() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { width, height } = useWindowSize();

  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showConfetti, setShowConfetti] = useState(false);

  const score = answers.reduce<number>((acc, ans, i) => acc + (ans === questions[i].correct ? 1 : 0), 0);
  const answered = answers.filter((a) => a !== null).length;
  const allAnswered = answered === questions.length;

  useEffect(() => {
    if (allAnswered && score === questions.length) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(t);
    }
  }, [allAnswered, score]);

  const selectAnswer = (qIdx: number, optIdx: number) => {
    if (answers[qIdx] !== null) return;
    const next = [...answers];
    next[qIdx] = optIdx;
    setAnswers(next);
  };

  const tier = resultTiers.find((t) => score >= t.min && score <= t.max);

  return (
    <motion.section ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} className="w-full flex flex-col gap-10 mb-24 relative">
      {showConfetti && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          <Confetti width={width} height={height} numberOfPieces={250} gravity={0.15} colors={["#F97316","#22c55e","#38bdf8","#a855f7","#facc15"]} />
        </div>
      )}

      <motion.div variants={fadeUp} className="flex flex-col gap-3">
        <h3 className="text-[#F97316] text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          <span className="text-lg">📝</span> Knowledge Check
        </h3>
        <div className="flex items-center gap-4">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Week 1 Quiz
          </h2>
          <div className={`px-3 py-1 rounded-lg font-mono font-bold text-sm border ${allAnswered && score === questions.length ? "bg-[#22c55e]/10 border-[#22c55e]/40 text-[#22c55e]" : "bg-[#141B23] border-[#253141] text-[#F97316]"}`}>
            {score} / {questions.length}
          </div>
        </div>
        <div className="w-full h-2 bg-[#0F151B] rounded-full overflow-hidden border border-[#253141]">
          <motion.div
            className={`h-full ${score === questions.length && allAnswered ? "bg-[#22c55e]" : "bg-[#F97316]"}`}
            animate={{ width: `${(score / questions.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" as const }}
          />
        </div>
      </motion.div>

      <motion.div variants={stagger} className="flex flex-col gap-8">
        {questions.map((q, qIdx) => {
          const selected = answers[qIdx];
          const isCorrect = selected === q.correct;
          return (
            <motion.div key={qIdx} variants={popIn} className="bg-[#141B23] border border-[#253141] rounded-2xl p-5 shadow-lg">
              <p className="text-white font-bold text-sm mb-4">
                <span className="text-[#F97316] font-mono mr-2">Q{qIdx + 1}.</span>
                {q.q}
              </p>
              <div className="grid grid-cols-1 gap-2 mb-3">
                {q.options.map((opt, optIdx) => {
                  const isSelected = selected === optIdx;
                  const showCorrect = selected !== null && optIdx === q.correct;
                  const showWrong = isSelected && !isCorrect;
                  let borderColor = "border-[#253141] hover:border-[#374151]";
                  let bgColor = "bg-[#0B111A]";
                  if (showCorrect) { borderColor = "border-[#22c55e]/50"; bgColor = "bg-[#22c55e]/5"; }
                  if (showWrong) { borderColor = "border-[#ef4444]/50"; bgColor = "bg-[#ef4444]/5"; }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => selectAnswer(qIdx, optIdx)}
                      disabled={selected !== null}
                      className={`text-left px-4 py-3 rounded-lg border text-[13px] transition-all ${borderColor} ${bgColor} ${selected !== null ? "cursor-default" : "cursor-pointer"}`}
                    >
                      <span className={`font-mono mr-2 ${showCorrect ? "text-[#22c55e]" : showWrong ? "text-[#ef4444]" : "text-[#6B7280]"}`}>
                        {String.fromCharCode(65 + optIdx)})
                      </span>
                      <span className={showCorrect ? "text-[#22c55e]" : showWrong ? "text-[#ef4444]" : "text-[#D1D5DB]"}>
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>
              <AnimatePresence>
                {selected !== null && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.3, ease: "easeOut" as const }}
                    className={`mt-3 p-3 rounded-lg border text-[13px] ${isCorrect ? "border-[#22c55e]/30 bg-[#22c55e]/5 text-[#D1D5DB]" : "border-[#ef4444]/30 bg-[#ef4444]/5 text-[#D1D5DB]"}`}
                  >
                    <span className="font-bold text-xs uppercase tracking-wider mr-2" style={{ color: isCorrect ? "#22c55e" : "#ef4444" }}>
                      {isCorrect ? "✅ Correct" : "❌ Incorrect"}
                    </span>
                    {q.explanation}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Result tier */}
      <AnimatePresence>
        {allAnswered && tier && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-center py-6 px-4 bg-[#141B23] border border-[#253141] rounded-2xl ${tier.color} text-lg font-bold`}
          >
            {tier.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
