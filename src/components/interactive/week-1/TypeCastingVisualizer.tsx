"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Braces, Play, RotateCcw, Zap, AlertTriangle, CheckCircle2 } from "lucide-react";

interface CastExample {
  id: string;
  raw: string;
  rawType: string;
  castFn: string;
  result: string;
  resultType: string;
  success: boolean;
  desc: string;
  rawColor: string;
  resultColor: string;
}

const examples: CastExample[] = [
  { id: "str-int", raw: '"450"', rawType: "str", castFn: "int()", result: "450", resultType: "int", success: true, desc: "String → Integer: Strip quotes, parse digits into numeric value", rawColor: "#8B5CF6", resultColor: "#10B981" },
  { id: "str-float", raw: '"12.75"', rawType: "str", castFn: "float()", result: "12.75", resultType: "float", success: true, desc: "String → Float: Parse decimal notation into IEEE 754 representation", rawColor: "#8B5CF6", resultColor: "#38bdf8" },
  { id: "int-str", raw: "500", rawType: "int", castFn: "str()", result: '"500"', resultType: "str", success: true, desc: "Integer → String: Wrap numeric value in character sequence for display", rawColor: "#10B981", resultColor: "#8B5CF6" },
  { id: "bad-cast", raw: '"NULL"', rawType: "str", castFn: "int()", result: "ValueError!", resultType: "error", success: false, desc: "⚠ Invalid Cast: Non-numeric string cannot be parsed into integer", rawColor: "#8B5CF6", resultColor: "#EF4444" },
  { id: "bool-int", raw: "True", rawType: "bool", castFn: "int()", result: "1", resultType: "int", success: true, desc: "Boolean → Integer: True maps to 1, False maps to 0 in Python", rawColor: "#FACC15", resultColor: "#10B981" },
];

export default function TypeCastingVisualizer() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [stage, setStage] = useState<"idle" | "casting" | "done">("idle");

  const current = examples[selectedIdx];

  const handleCast = () => {
    if (stage === "done") {
      setStage("idle");
      return;
    }
    setStage("casting");
    setTimeout(() => setStage("done"), 900);
  };

  const handleSelect = (idx: number) => {
    setSelectedIdx(idx);
    setStage("idle");
  };

  return (
    <div className="my-10 border border-[#253141] bg-[#0B111A] rounded-2xl overflow-hidden shadow-xl relative">
      {/* Decorative glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#F97316]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="bg-[#141B23] border-b border-[#253141] px-5 py-3.5 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#F97316]/10">
            <Braces className="w-4 h-4 text-[#F97316]" />
          </div>
          <div>
            <span className="font-bold text-[#E5E7EB] tracking-wide text-xs block">Type Casting Engine</span>
            <span className="text-[9px] text-[#6B7280]">Click examples below, then Execute</span>
          </div>
        </div>
        <button
          onClick={handleCast}
          disabled={stage === "casting"}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#F97316]/10 text-[#F97316] hover:bg-[#F97316]/20 border border-[#F97316]/30 rounded-lg text-xs font-bold transition-all disabled:opacity-50 hover:shadow-[0_0_15px_rgba(249,115,22,0.15)]"
        >
          {stage === "done" ? <><RotateCcw className="w-3 h-3" /> Reset</> : <><Play className="w-3 h-3" /> Execute Cast</>}
        </button>
      </div>

      {/* Example Selector Row */}
      <div className="flex gap-2 px-5 pt-5 pb-2 overflow-x-auto relative z-10">
        {examples.map((ex, idx) => (
          <button
            key={ex.id}
            onClick={() => handleSelect(idx)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold border transition-all ${
              selectedIdx === idx
                ? "bg-[#F97316]/10 text-[#F97316] border-[#F97316]/40 shadow-[0_0_10px_rgba(249,115,22,0.1)]"
                : "bg-[#141B23] text-[#6B7280] border-[#253141] hover:border-[#374151] hover:text-[#9CA3AF]"
            }`}
          >
            {ex.rawType} → {ex.resultType === "error" ? "⚠" : ex.resultType}
          </button>
        ))}
      </div>

      {/* Main Visualization Area */}
      <div className="p-6 pt-4 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col md:flex-row items-center gap-6"
          >
            {/* Source Block */}
            <div className="flex-1 w-full">
              <div className="text-[9px] tracking-widest uppercase font-bold text-[#556070] mb-2 font-mono">Raw Input</div>
              <div
                className="relative p-5 rounded-xl border-2 border-dashed transition-all duration-300"
                style={{ borderColor: `${current.rawColor}40`, backgroundColor: `${current.rawColor}08` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center font-bold text-lg font-mono" style={{ color: current.rawColor, backgroundColor: `${current.rawColor}15`, border: `1px solid ${current.rawColor}30` }}>
                    {current.raw}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-mono font-bold text-[#E5E7EB]">type({current.raw})</span>
                    <span className="text-xs font-mono mt-1" style={{ color: current.rawColor }}>
                      {"<"}class &apos;{current.rawType}&apos;{">"}
                    </span>
                    <span className="text-[9px] text-[#6B7280] mt-2 uppercase tracking-widest">Source Value</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cast Function Arrow */}
            <div className="flex flex-col items-center gap-1 shrink-0 py-2">
              <motion.div
                className="px-4 py-2 rounded-xl font-mono text-xs font-bold border relative overflow-hidden transition-all"
                style={{
                  color: "#F97316",
                  borderColor: stage === "casting" ? "#F97316" : "#F9731630",
                  backgroundColor: stage === "casting" ? "#F9731615" : "#F9731608",
                  boxShadow: stage === "casting" ? "0 0 20px rgba(249,115,22,0.2)" : "none"
                }}
                animate={stage === "casting" ? { scale: [1, 1.05, 1] } : {}}
                transition={{ duration: 0.45, repeat: stage === "casting" ? 1 : 0 }}
              >
                {current.castFn}
                {stage === "casting" && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F97316]/20 to-transparent"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 0.8, ease: "linear" }}
                  />
                )}
              </motion.div>
              <ArrowRight className="w-4 h-4 text-[#374151] mt-1" />
              {stage === "casting" && (
                <motion.div
                  className="flex items-center gap-1 text-[#F97316] text-[9px] font-mono"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.9, ease: "linear" }}
                >
                  <Zap className="w-3 h-3" /> Converting...
                </motion.div>
              )}
            </div>

            {/* Result Block */}
            <div className="flex-1 w-full">
              <div className="text-[9px] tracking-widest uppercase font-bold text-[#556070] mb-2 font-mono">Output</div>
              <div
                className="relative p-5 rounded-xl border transition-all duration-300 min-h-[92px]"
                style={{
                  borderColor: stage === "done" ? `${current.resultColor}40` : "#253141",
                  backgroundColor: stage === "done" ? `${current.resultColor}08` : "#141B23",
                }}
              >
                <AnimatePresence mode="wait">
                  {stage === "done" ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                      className="flex items-center gap-4"
                    >
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center font-bold font-mono relative"
                        style={{
                          color: current.resultColor,
                          backgroundColor: `${current.resultColor}15`,
                          border: `1px solid ${current.resultColor}30`,
                          fontSize: current.success ? "18px" : "11px",
                          boxShadow: `0 0 20px ${current.resultColor}15`
                        }}
                      >
                        {current.result}
                      </div>
                      <div className="flex flex-col">
                        {current.success ? (
                          <>
                            <span className="text-[11px] font-mono font-bold text-[#E5E7EB] flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" /> Cast Successful
                            </span>
                            <span className="text-xs font-mono mt-1" style={{ color: current.resultColor }}>
                              {"<"}class &apos;{current.resultType}&apos;{">"}
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-[11px] font-mono font-bold text-[#EF4444] flex items-center gap-1.5">
                              <AlertTriangle className="w-3.5 h-3.5" /> ValueError
                            </span>
                            <span className="text-[10px] font-mono mt-1 text-[#EF4444]/70">
                              invalid literal for int()
                            </span>
                          </>
                        )}
                        <span className="text-[9px] text-[#6B7280] mt-2 uppercase tracking-widest">Result Value</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center h-16 text-[#374151] text-xs font-mono"
                    >
                      {stage === "casting" ? "Processing..." : "Awaiting execution..."}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Description Bar */}
        <motion.div
          key={`desc-${current.id}-${stage}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-5 px-4 py-3 bg-[#141B23] border border-[#253141] rounded-lg text-[11px] font-mono text-[#9CA3AF]"
        >
          {current.desc}
        </motion.div>
      </div>
    </div>
  );
}
