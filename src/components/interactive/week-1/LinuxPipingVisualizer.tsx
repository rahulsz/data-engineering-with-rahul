"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Filter, Play, ChevronRight, FileText, ArrowDown } from "lucide-react";

interface LogEntry {
  id: number;
  text: string;
  level: "INFO" | "WARN" | "ERROR";
}

const rawLogs: LogEntry[] = [
  { id: 1, text: "[INFO]  2026-04-22 08:01:22  Server started on port 8080", level: "INFO" },
  { id: 2, text: "[INFO]  2026-04-22 08:01:23  Fetching supplier manifest...", level: "INFO" },
  { id: 3, text: "[ERROR] 2026-04-22 08:01:24  Manifest missing 'supplier_id' — row 42", level: "ERROR" },
  { id: 4, text: "[WARN]  2026-04-22 08:01:25  Retrying DB connection (attempt 2/3)", level: "WARN" },
  { id: 5, text: "[INFO]  2026-04-22 08:01:26  Inventory sync: 4,821 rows processed", level: "INFO" },
  { id: 6, text: "[ERROR] 2026-04-22 08:01:27  Connection timed out (504) to warehouse-api", level: "ERROR" },
  { id: 7, text: "[WARN]  2026-04-22 08:01:28  Disk usage at 87% on /data/staging", level: "WARN" },
  { id: 8, text: "[INFO]  2026-04-22 08:01:29  Batch job completed successfully", level: "INFO" },
];

const pipeCommands = [
  { id: "grep-error", label: 'grep "ERROR"', filter: (l: LogEntry) => l.level === "ERROR", color: "#EF4444", desc: "Filter: only lines containing ERROR" },
  { id: "grep-warn", label: 'grep "WARN"', filter: (l: LogEntry) => l.level === "WARN", color: "#FACC15", desc: "Filter: only lines containing WARN" },
  { id: "wc-l", label: "wc -l", filter: null, color: "#38bdf8", desc: "Count: total number of lines in the stream" },
  { id: "tail-3", label: "tail -3", filter: null, color: "#C084FC", desc: "Slice: last 3 lines from the stream" },
];

export default function LinuxPipingVisualizer() {
  const [selectedCmd, setSelectedCmd] = useState(0);
  const [active, setActive] = useState(false);

  const cmd = pipeCommands[selectedCmd];

  const getFilteredOutput = (): { lines: string[], isCount: boolean } => {
    if (cmd.id === "grep-error") {
      return { lines: rawLogs.filter(l => l.level === "ERROR").map(l => l.text), isCount: false };
    }
    if (cmd.id === "grep-warn") {
      return { lines: rawLogs.filter(l => l.level === "WARN").map(l => l.text), isCount: false };
    }
    if (cmd.id === "wc-l") {
      return { lines: [`       ${rawLogs.length}  server.log`], isCount: true };
    }
    if (cmd.id === "tail-3") {
      return { lines: rawLogs.slice(-3).map(l => l.text), isCount: false };
    }
    return { lines: [], isCount: false };
  };

  const handleRun = () => {
    setActive(false);
    requestAnimationFrame(() => {
      setActive(true);
    });
  };

  const handleSelectCmd = (idx: number) => {
    setSelectedCmd(idx);
    setActive(false);
  };

  const getLogColor = (level: string) => {
    switch (level) {
      case "ERROR": return "text-[#EF4444]";
      case "WARN": return "text-[#FACC15]";
      default: return "text-[#6B7280]";
    }
  };

  const output = getFilteredOutput();

  return (
    <div className="my-10 border border-[#253141] bg-[#0B111A] rounded-2xl overflow-hidden shadow-xl relative">
      {/* Decorative */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#FACC15]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#EF4444]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="bg-[#141B23] border-b border-[#253141] px-5 py-3.5 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#FACC15]/10">
            <Terminal className="w-4 h-4 text-[#FACC15]" />
          </div>
          <div>
            <span className="font-bold text-[#E5E7EB] tracking-wide text-xs block">Piping &amp; Redirection</span>
            <span className="text-[9px] text-[#6B7280]">Chain commands with | to build data pipelines</span>
          </div>
        </div>
        <button
          onClick={handleRun}
          className="flex items-center gap-1.5 px-4 py-2 bg-[#FACC15]/10 text-[#FACC15] hover:bg-[#FACC15]/20 border border-[#FACC15]/30 rounded-lg text-xs font-bold transition-all hover:shadow-[0_0_15px_rgba(250,204,21,0.15)]"
        >
          <Play className="w-3 h-3" /> Run Pipeline
        </button>
      </div>

      {/* Command Selector */}
      <div className="px-5 pt-5 pb-3 relative z-10">
        <div className="text-[9px] tracking-widest uppercase text-[#556070] font-bold font-mono mb-2.5">Select Pipe Command</div>
        <div className="flex gap-2 flex-wrap">
          {pipeCommands.map((pc, idx) => (
            <button
              key={pc.id}
              onClick={() => handleSelectCmd(idx)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold border transition-all ${
                selectedCmd === idx
                  ? `border-[${pc.color}]/40 shadow-[0_0_10px_${pc.color}10]`
                  : "border-[#253141] hover:border-[#374151]"
              }`}
              style={{
                color: selectedCmd === idx ? pc.color : "#6B7280",
                backgroundColor: selectedCmd === idx ? `${pc.color}10` : "#141B23",
                borderColor: selectedCmd === idx ? `${pc.color}40` : undefined,
              }}
            >
              | {pc.label}
            </button>
          ))}
        </div>
      </div>

      {/* Full Command Preview */}
      <div className="px-5 pb-4 relative z-10">
        <div className="bg-[#141B23] border border-[#253141] rounded-lg px-4 py-3 font-mono text-xs flex items-center gap-2 flex-wrap">
          <span className="text-[#10B981]">$</span>
          <span className="text-[#D1D5DB]">cat</span>
          <span className="text-[#38bdf8]">server.log</span>
          <span className="text-[#F97316] font-bold">|</span>
          <span style={{ color: cmd.color }} className="font-bold">{cmd.label}</span>
          {cmd.id === "grep-error" && (
            <>
              <span className="text-[#F97316] font-bold">{">"}</span>
              <span className="text-[#C084FC]">errors_only.txt</span>
            </>
          )}
          <span className="ml-auto text-[#556070] text-[9px] font-normal">{cmd.desc}</span>
        </div>
      </div>

      {/* Main Visualization */}
      <div className="px-5 pb-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-4 items-stretch">

          {/* Source: Raw Logs */}
          <div className="flex-1 bg-[#141B23] border border-[#253141] rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#253141] bg-[#19222E]">
              <FileText className="w-3.5 h-3.5 text-[#9CA3AF]" />
              <span className="text-[10px] font-mono text-[#9CA3AF] font-bold uppercase tracking-widest">server.log</span>
              <span className="ml-auto text-[9px] text-[#556070] font-mono">{rawLogs.length} lines</span>
            </div>
            <div className="p-3 space-y-0.5 max-h-[240px] overflow-y-auto">
              {rawLogs.map((log) => (
                <motion.div
                  key={log.id}
                  className={`text-[10px] font-mono px-2 py-1.5 rounded transition-all leading-tight ${getLogColor(log.level)}`}
                  animate={
                    active && (
                      (cmd.id === "grep-error" && log.level === "ERROR") ||
                      (cmd.id === "grep-warn" && log.level === "WARN") ||
                      (cmd.id === "tail-3" && rawLogs.indexOf(log) >= rawLogs.length - 3) ||
                      (cmd.id === "wc-l")
                    )
                      ? { backgroundColor: `${cmd.color}10`, x: 4 }
                      : { backgroundColor: "transparent", x: 0 }
                  }
                  transition={{ duration: 0.3 }}
                >
                  {log.text}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pipe Node */}
          <div className="flex flex-col items-center justify-center shrink-0 gap-2 py-4 md:py-0">
            <motion.div
              className="w-12 h-12 rounded-full border-2 flex items-center justify-center relative"
              style={{
                borderColor: active ? cmd.color : "#374151",
                backgroundColor: active ? `${cmd.color}10` : "#141B23",
              }}
              animate={active ? {
                scale: [1, 1.1, 1],
                boxShadow: [`0 0 0px ${cmd.color}00`, `0 0 20px ${cmd.color}30`, `0 0 0px ${cmd.color}00`]
              } : {}}
              transition={{ duration: 0.6, repeat: active ? 2 : 0 }}
            >
              <Filter className="w-5 h-5" style={{ color: active ? cmd.color : "#556070" }} />
            </motion.div>
            <div className="hidden md:flex">
              <ChevronRight className="w-4 h-4" style={{ color: active ? cmd.color : "#374151" }} />
            </div>
            <div className="flex md:hidden">
              <ArrowDown className="w-4 h-4" style={{ color: active ? cmd.color : "#374151" }} />
            </div>
            <span className="text-[9px] font-mono font-bold" style={{ color: active ? cmd.color : "#556070" }}>
              | {cmd.label}
            </span>
          </div>

          {/* Output Stream */}
          <div className="flex-1 bg-[#141B23] border border-[#253141] rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#253141] bg-[#19222E]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FACC15]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              </div>
              <span className="text-[10px] font-mono text-[#6B7280] ml-2">output</span>
              {active && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="ml-auto text-[9px] font-mono font-bold"
                  style={{ color: cmd.color }}
                >
                  {output.lines.length} {output.isCount ? "result" : output.lines.length === 1 ? "line" : "lines"}
                </motion.span>
              )}
            </div>
            <div className="p-3 min-h-[240px] flex flex-col relative">
              <AnimatePresence mode="wait">
                {active ? (
                  <motion.div
                    key={`output-${cmd.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-1"
                  >
                    {output.lines.map((line, idx) => (
                      <motion.div
                        key={`${cmd.id}-${idx}`}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.12, duration: 0.25 }}
                        className="text-[10px] font-mono px-3 py-2 rounded-lg border flex items-center gap-2"
                        style={{
                          color: cmd.color,
                          borderColor: `${cmd.color}25`,
                          backgroundColor: `${cmd.color}08`,
                        }}
                      >
                        {!output.isCount && (
                          <span className="w-4 h-4 rounded text-[8px] font-bold flex items-center justify-center shrink-0"
                            style={{ backgroundColor: `${cmd.color}20`, color: cmd.color }}>
                            {idx + 1}
                          </span>
                        )}
                        <span className="leading-tight">{line}</span>
                      </motion.div>
                    ))}

                    {cmd.id === "grep-error" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: output.lines.length * 0.12 + 0.3 }}
                        className="mt-3 pt-3 border-t border-[#253141] text-[9px] font-mono text-[#556070] flex items-center gap-2"
                      >
                        <span className="text-[#F97316]">{">>"}</span> Redirected to <span className="text-[#C084FC]">errors_only.txt</span>
                      </motion.div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-[#374151] text-xs font-mono gap-2"
                  >
                    <Terminal className="w-6 h-6" />
                    <span>Click &quot;Run Pipeline&quot; to execute</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
