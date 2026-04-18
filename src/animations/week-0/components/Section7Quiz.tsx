"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { HelpCircle, CheckCircle2, XCircle, Trophy, BookOpen, BrainCircuit } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

interface Question {
  q: string;
  options: string[];
  answer: number;
  explanation: string;
}

const quizData: Question[] = [
  {
    q: "What is the primary role of a Data Engineer?",
    options: [
      "Build machine learning models",
      "Create customer-facing web applications",
      "Design and maintain infrastructure that delivers data to consumers",
      "Write SQL reports for business stakeholders"
    ],
    answer: 2,
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
    answer: 2,
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
    answer: 2,
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
    answer: 1,
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
    answer: 1,
    explanation: "Databricks Delta Lake merges both concepts — the Lakehouse."
  }
];

export default function Section7Quiz() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { width, height } = useWindowSize();

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSelect = (qIndex: number, optionIndex: number) => {
    if (answers[qIndex] !== undefined) return; // already answered
    const newAnswers = { ...answers, [qIndex]: optionIndex };
    setAnswers(newAnswers);

    // Check if fully complete and perfect score sequence
    const answeredCount = Object.keys(newAnswers).length;
    if (answeredCount === quizData.length) {
      const score = Object.entries(newAnswers).reduce((acc, [idx, ans]) => acc + (ans === quizData[Number(idx)].answer ? 1 : 0), 0);
      if (score === 5) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    }
  };

  const answeredCount = Object.keys(answers).length;
  const score = Object.entries(answers).reduce((acc, [idx, ans]) => acc + (ans === quizData[Number(idx)].answer ? 1 : 0), 0);
  const isComplete = answeredCount === quizData.length;

  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: 0.5 } }
  };

  const staggerCards = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  return (
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full flex flex-col gap-8 mt-16 mb-24 relative"
    >
      {showConfetti && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          <Confetti width={width} height={height} numberOfPieces={400} gravity={0.2} colors={['#F97316', '#22c55e']} />
        </div>
      )}

      {/* Header */}
      <motion.div variants={slideUp} className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-[#F97316] text-sm font-bold tracking-widest uppercase flex items-center gap-2">
              <span className="text-xl">📝</span> Knowledge Check
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
              5 Questions — Test Your Understanding
            </h2>
          </div>

          {/* Live Score Display */}
          <div className={`flex items-center gap-3 px-5 py-3 rounded-xl border shadow-lg ${score === 5 ? 'bg-[#22c55e]/10 border-[#22c55e]/50' : 'bg-[#141B23] border-[#253141]'}`}>
             <span className="text-xs font-mono tracking-widest text-[#9CA3AF] uppercase">Score</span>
             <motion.span 
               key={score}
               initial={{ scale: 1.5, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               className={`text-3xl font-bold font-mono ${score === 5 ? 'text-[#22c55e]' : 'text-[#F97316]'}`}
             >
               {score}
             </motion.span>
             <span className="text-xl font-bold text-[#6B7280]">/ 5</span>
          </div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div variants={slideUp} className="w-full h-1.5 bg-[#141B23] rounded-full overflow-hidden">
         <motion.div 
            className={`h-full ${score === 5 ? 'bg-[#22c55e]' : 'bg-[#F97316]'}`}
            initial={{ width: 0 }}
            animate={{ width: `${(answeredCount / 5) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" as const }}
         />
      </motion.div>

      {/* Questions Stack */}
      <motion.div variants={staggerCards} className="flex flex-col gap-6 mt-4">
        {quizData.map((q, qIndex) => {
          const isAnswered = answers[qIndex] !== undefined;
          const selectedAnswer = answers[qIndex];
          const isCorrect = selectedAnswer === q.answer;

          return (
            <motion.div 
              key={qIndex} 
              variants={slideUp}
              className={`p-6 lg:p-8 rounded-2xl border transition-colors duration-500 ${isAnswered ? (isCorrect ? 'bg-[#22c55e]/5 border-[#22c55e]/30' : 'bg-[#ef4444]/5 border-[#ef4444]/30') : 'bg-[#0B111A] border-[#253141]'}`}
            >
              <h4 className="text-lg lg:text-xl font-bold text-white mb-6 flex items-start gap-3">
                 <span className="text-[#6B7280] font-mono mt-0.5">Q{qIndex + 1}.</span> {q.q}
              </h4>
              <div className="flex flex-col gap-3">
                {q.options.map((opt, optIndex) => {
                  const isThisSelected = selectedAnswer === optIndex;
                  const isThisCorrect = q.answer === optIndex;
                  let btnStateClass = "bg-[#141B23] border-[#2A3645] text-[#D1D5DB] hover:bg-[#1A232E]";
                  
                  if (isAnswered) {
                    if (isThisCorrect) btnStateClass = "bg-[#22c55e]/20 border-[#22c55e]/50 text-[#22c55e]";
                    else if (isThisSelected && !isThisCorrect) btnStateClass = "bg-[#ef4444]/20 border-[#ef4444]/50 text-[#ef4444]";
                    else btnStateClass = "bg-[#141B23] border-[#2A3645] text-[#6B7280] opacity-50";
                  }

                  return (
                    <button
                      key={optIndex}
                      disabled={isAnswered}
                      onClick={() => handleSelect(qIndex, optIndex)}
                      className={`w-full text-left p-4 rounded-xl border flex items-start gap-4 transition-all duration-300 ${!isAnswered && 'hover:-translate-y-0.5 shadow-sm'} ${btnStateClass}`}
                    >
                      <div className={`w-6 h-6 rounded-full border shrink-0 flex items-center justify-center mt-0.5 ${isAnswered && isThisCorrect ? 'bg-[#22c55e] border-[#22c55e]' : isAnswered && isThisSelected && !isThisCorrect ? 'bg-[#ef4444] border-[#ef4444]' : 'bg-transparent border-[#4B5563]'}`}>
                        {isAnswered && isThisCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                        {isAnswered && isThisSelected && !isThisCorrect && <XCircle className="w-4 h-4 text-white" />}
                      </div>
                      <span className="text-[15px] leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation Reveal */}
              <AnimatePresence>
                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 rounded-lg bg-[#38bdf8]/10 border border-[#38bdf8]/30 flex items-start gap-3">
                      <HelpCircle className="w-5 h-5 text-[#38bdf8] shrink-0 mt-0.5" />
                      <div className="flex flex-col gap-1">
                        <span className="text-[#38bdf8] font-bold text-xs uppercase tracking-widest">Explanation</span>
                        <span className="text-[#D1D5DB] text-sm leading-relaxed">{q.explanation}</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Final Score Card */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring" as const, stiffness: 260, damping: 20, delay: 0.5 }}
            className={`mt-4 p-8 rounded-2xl flex items-center gap-6 justify-center text-center sm:text-left sm:justify-start ${score === 5 ? 'bg-gradient-to-r from-[#22c55e]/20 to-[#141B23] border border-[#22c55e]/50' : score >= 3 ? 'bg-gradient-to-r from-[#38bdf8]/20 to-[#141B23] border border-[#38bdf8]/50' : 'bg-gradient-to-r from-[#ef4444]/20 to-[#141B23] border border-[#ef4444]/50'}`}
          >
            {score === 5 ? <Trophy className="w-12 h-12 text-[#22c55e] hidden sm:block" /> : score >= 3 ? <BrainCircuit className="w-12 h-12 text-[#38bdf8] hidden sm:block" /> : <BookOpen className="w-12 h-12 text-[#ef4444] hidden sm:block" />}
            <div>
               <h3 className={`text-2xl font-bold mb-1 ${score === 5 ? 'text-[#22c55e]' : score >= 3 ? 'text-[#38bdf8]' : 'text-[#ef4444]'}`}>
                 {score === 5 ? "🏆 Perfect Score! You're ready for Week 1." : score >= 3 ? "💪 Solid work." : "📖 Keep practicing."}
               </h3>
               <p className="text-[#D1D5DB]">
                 {score === 5 ? "All core concepts secured. Move on to the interactive Python and SQL setups." : "Take another pass through the content sections you missed to solidify your mental model."}
               </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.section>
  );
}
