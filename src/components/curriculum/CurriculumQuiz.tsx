"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence, Variants } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { CheckCircle2, XCircle } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: 0.4 } },
};
const staggerCards: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 200, damping: 20 },
  },
};

export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface QuizTier {
  minPercentage: number; 
  maxPercentage: number;
  icon: React.ReactNode;
  msg: string;
  desc?: string;
  colorClass: string; 
  borderColorClass?: string;
  bgGradientClass?: string;
}

interface CurriculumQuizProps {
  badgeText: string;
  badgeIcon?: React.ReactNode;
  title: string;
  questions: QuizQuestion[];
  resultTiers: QuizTier[];
}

export default function CurriculumQuiz({
  badgeText,
  badgeIcon,
  title,
  questions,
  resultTiers,
}: CurriculumQuizProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { width, height } = useWindowSize();

  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [showConfetti, setShowConfetti] = useState(false);

  const score = answers.reduce<number>(
    (acc, ans, i) => acc + (ans === questions[i].correct ? 1 : 0),
    0
  );
  const answered = answers.filter((a) => a !== null).length;
  const allAnswered = answered === questions.length;
  const scorePercentage = (score / questions.length) * 100;

  useEffect(() => {
    if (allAnswered && scorePercentage === 100) {
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(t);
    }
  }, [allAnswered, scorePercentage]);

  const selectAnswer = (qIdx: number, optIdx: number) => {
    if (answers[qIdx] !== null) return;
    const next = [...answers];
    next[qIdx] = optIdx;
    setAnswers(next);
  };

  const tier = resultTiers.find(
    (t) => scorePercentage >= t.minPercentage && scorePercentage <= t.maxPercentage
  );

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full flex flex-col gap-8 mt-16 mb-24 relative"
    >
      {showConfetti && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          <Confetti
            width={width}
            height={height}
            numberOfPieces={300}
            gravity={0.15}
            colors={["#F97316", "#22c55e", "#38bdf8", "#a855f7", "#facc15"]}
          />
        </div>
      )}

      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-[#F97316] text-sm font-bold tracking-widest uppercase flex items-center gap-2">
              {badgeIcon}
              {badgeText}
            </h3>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              {title}
            </h2>
          </div>

          <div
            className={`flex items-center gap-3 px-5 py-3 rounded-xl border shadow-lg ${
              allAnswered && scorePercentage === 100
                ? "bg-[#22c55e]/10 border-[#22c55e]/50"
                : "bg-[#141B23] border-[#253141]"
            }`}
          >
            <span className="text-xs font-mono tracking-widest text-[#9CA3AF] uppercase">
              Score
            </span>
            <motion.span
              key={score}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-3xl font-bold font-mono ${
                allAnswered && scorePercentage === 100
                  ? "text-[#22c55e]"
                  : "text-[#F97316]"
              }`}
            >
              {score}
            </motion.span>
            <span className="text-xl font-bold text-[#6B7280]">
              / {questions.length}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div
        variants={fadeUp}
        className="w-full h-1.5 bg-[#141B23] rounded-full overflow-hidden"
      >
        <motion.div
          className={`h-full ${
            allAnswered && scorePercentage === 100
              ? "bg-[#22c55e]"
              : "bg-[#F97316]"
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${(answered / questions.length) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
        />
      </motion.div>

      {/* Questions Stack */}
      <motion.div variants={staggerCards} className="flex flex-col gap-6 mt-4">
        {questions.map((q, qIndex) => {
          const selected = answers[qIndex];
          const isAnswered = selected !== null;
          const isCorrect = selected === q.correct;

          return (
            <motion.div
              key={qIndex}
              variants={fadeUp}
              className={`p-6 lg:p-8 rounded-2xl border transition-colors duration-500 shadow-lg ${
                isAnswered
                  ? isCorrect
                    ? "bg-[#22c55e]/5 border-[#22c55e]/30"
                    : "bg-[#ef4444]/5 border-[#ef4444]/30"
                  : "bg-[#0B111A] border-[#253141]"
              }`}
            >
              <h4 className="text-lg lg:text-xl font-bold text-white mb-6 flex items-start gap-3">
                <span className="text-[#F97316] font-mono mt-0.5">
                  Q{qIndex + 1}.
                </span>{" "}
                {q.q}
              </h4>
              <div className="flex flex-col gap-3">
                {q.options.map((opt, optIndex) => {
                  const isThisSelected = selected === optIndex;
                  const showCorrect = isAnswered && optIndex === q.correct;
                  const showWrong = isThisSelected && !showCorrect;

                  let btnStateClass =
                    "bg-[#141B23] border-[#2A3645] text-[#D1D5DB] hover:bg-[#1A232E]";

                  if (isAnswered) {
                    if (showCorrect)
                      btnStateClass =
                        "bg-[#22c55e]/20 border-[#22c55e]/50 text-[#22c55e]";
                    else if (showWrong)
                      btnStateClass =
                        "bg-[#ef4444]/20 border-[#ef4444]/50 text-[#ef4444]";
                    else btnStateClass = "bg-[#141B23] border-[#2A3645] text-[#6B7280] opacity-50";
                  }

                  return (
                    <button
                      key={optIndex}
                      disabled={isAnswered}
                      onClick={() => selectAnswer(qIndex, optIndex)}
                      className={`w-full text-left p-4 rounded-xl border flex items-start gap-4 transition-all duration-300 ${
                        !isAnswered ? "hover:-translate-y-0.5 shadow-sm cursor-pointer" : "cursor-default"
                      } ${btnStateClass}`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full border shrink-0 flex items-center justify-center mt-0.5 ${
                          showCorrect
                            ? "bg-[#22c55e] border-[#22c55e]"
                            : showWrong
                            ? "bg-[#ef4444] border-[#ef4444]"
                            : "bg-transparent border-[#4B5563]"
                        }`}
                      >
                        {showCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-white" />
                        )}
                        {showWrong && (
                          <XCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <span className="text-[15px] leading-relaxed">
                        {opt}
                      </span>
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
                    <div
                      className={`p-4 rounded-lg border flex items-start gap-3 ${
                        isCorrect
                          ? "bg-[#22c55e]/5 border-[#22c55e]/30"
                          : "bg-[#ef4444]/5 border-[#ef4444]/30"
                      }`}
                    >
                      <div className="flex flex-col gap-1">
                        <span
                          className={`font-bold text-xs uppercase tracking-widest flex items-center gap-2 ${
                            isCorrect ? "text-[#22c55e]" : "text-[#ef4444]"
                          }`}
                        >
                          {isCorrect ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : (
                            <XCircle className="w-4 h-4" />
                          )}
                          {isCorrect ? "Correct" : "Incorrect"}
                        </span>
                        <span className="text-[#D1D5DB] text-sm leading-relaxed mt-1">
                          {q.explanation}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Result Tier Card */}
      <AnimatePresence>
        {allAnswered && tier && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              type: "spring" as const,
              stiffness: 260,
              damping: 20,
              delay: 0.5,
            }}
            className={`mt-4 p-8 rounded-2xl flex items-center gap-6 justify-center text-center sm:text-left sm:justify-start bg-gradient-to-r border ${tier.bgGradientClass} ${tier.borderColorClass}`}
          >
            <div className="hidden sm:block shrink-0">{tier.icon}</div>
            <div>
              <h3 className={`text-2xl font-bold mb-1 ${tier.colorClass}`}>
                {tier.msg}
              </h3>
              {tier.desc && <p className="text-[#D1D5DB]">{tier.desc}</p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
