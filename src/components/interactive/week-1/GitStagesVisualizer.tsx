"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, GitCommit, Upload, FileCode, FolderOpen, ChevronRight, RotateCcw, Check } from "lucide-react";

interface GitFile {
  name: string;
  status: "modified" | "staged" | "committed";
}

const initialFiles: GitFile[] = [
  { name: "ingest_orders.py", status: "modified" },
  { name: "config.yaml", status: "modified" },
  { name: "utils/validators.py", status: "modified" },
];

export default function GitStagesVisualizer() {
  const [stage, setStage] = useState<0 | 1 | 2>(0);
  const [files, setFiles] = useState<GitFile[]>(initialFiles);

  const handleAdd = () => {
    setStage(1);
    setFiles(prev => prev.map(f => ({ ...f, status: "staged" as const })));
  };

  const handleCommit = () => {
    setStage(2);
    setFiles(prev => prev.map(f => ({ ...f, status: "committed" as const })));
  };

  const handleReset = () => {
    setStage(0);
    setFiles(initialFiles);
  };

  const stages = [
    { label: "Working Directory", icon: FolderOpen, color: "#3B82F6", desc: "Files with unsaved changes", stage: 0 },
    { label: "Staging Area", icon: Upload, color: "#10B981", desc: "Queued for next commit", stage: 1 },
    { label: "Local Repository", icon: GitCommit, color: "#D946EF", desc: "Permanently snapshot", stage: 2 },
  ];

  const getFileStatusColor = (status: string) => {
    switch (status) {
      case "modified": return { text: "text-[#FACC15]", bg: "bg-[#FACC15]/10", border: "border-[#FACC15]/20", label: "M" };
      case "staged": return { text: "text-[#10B981]", bg: "bg-[#10B981]/10", border: "border-[#10B981]/20", label: "S" };
      case "committed": return { text: "text-[#D946EF]", bg: "bg-[#D946EF]/10", border: "border-[#D946EF]/20", label: "C" };
      default: return { text: "text-[#6B7280]", bg: "bg-[#6B7280]/10", border: "border-[#6B7280]/20", label: "?" };
    }
  };

  return (
    <div className="my-10 border border-[#253141] bg-[#0B111A] rounded-2xl overflow-hidden shadow-xl relative">
      {/* Decorative */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-[#3B82F6]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#D946EF]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="bg-[#141B23] border-b border-[#253141] px-5 py-3.5 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-[#3B82F6]/10">
            <GitBranch className="w-4 h-4 text-[#3B82F6]" />
          </div>
          <div>
            <span className="font-bold text-[#E5E7EB] tracking-wide text-xs block">Git Stage Tracker</span>
            <span className="text-[9px] text-[#6B7280]">Follow the file lifecycle through Git&apos;s three stages</span>
          </div>
        </div>
        {stage === 2 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#D946EF]/10 text-[#D946EF] hover:bg-[#D946EF]/20 border border-[#D946EF]/30 rounded-lg text-xs font-bold transition-all"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        )}
      </div>

      <div className="p-6 relative z-10">
        {/* Three-Stage Pipeline Header */}
        <div className="flex items-stretch gap-3 mb-6">
          {stages.map((s, idx) => {
            const isActive = stage === s.stage;
            const isPast = stage > s.stage;
            const StageIcon = s.icon;

            return (
              <React.Fragment key={s.label}>
                <motion.div
                  className="flex-1 p-4 rounded-xl border transition-all duration-300 relative overflow-hidden"
                  style={{
                    borderColor: isActive ? `${s.color}50` : "#253141",
                    backgroundColor: isActive ? `${s.color}08` : "#141B23",
                  }}
                  animate={isActive ? { boxShadow: `0 0 25px ${s.color}15` } : { boxShadow: "0 0 0px transparent" }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute top-0 left-0 w-full h-[2px]"
                      style={{ backgroundColor: s.color }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                  )}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center transition-all"
                      style={{
                        backgroundColor: isActive || isPast ? `${s.color}15` : "#1C2532",
                        border: `1px solid ${isActive || isPast ? `${s.color}30` : "#253141"}`
                      }}
                    >
                      <StageIcon className="w-5 h-5" style={{ color: isActive || isPast ? s.color : "#556070" }} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[#E5E7EB] font-mono">{s.label}</p>
                      <p className="text-[9px] text-[#6B7280] mt-0.5">{s.desc}</p>
                    </div>
                  </div>

                  {isPast && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${s.color}15` }}
                    >
                      <Check className="w-3 h-3" style={{ color: s.color }} />
                    </motion.div>
                  )}
                </motion.div>

                {idx < 2 && (
                  <div className="flex items-center shrink-0">
                    <ChevronRight className="w-4 h-4" style={{ color: stage > idx ? stages[idx + 1].color : "#374151" }} />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Connector Progress Line */}
        <div className="relative h-1.5 bg-[#1C2532] rounded-full mb-6 overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full rounded-full"
            style={{
              background: stage === 0
                ? `linear-gradient(to right, #3B82F6, #3B82F6)`
                : stage === 1
                ? `linear-gradient(to right, #3B82F6, #10B981)`
                : `linear-gradient(to right, #3B82F6, #10B981, #D946EF)`
            }}
            initial={{ width: "0%" }}
            animate={{ width: stage === 0 ? "5%" : stage === 1 ? "50%" : "100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </div>

        {/* File List and Action */}
        <div className="flex flex-col md:flex-row gap-5">
          {/* File List */}
          <div className="flex-1 bg-[#141B23] border border-[#253141] rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#253141] bg-[#19222E]">
              <FileCode className="w-3.5 h-3.5 text-[#9CA3AF]" />
              <span className="text-[10px] font-mono text-[#9CA3AF] font-bold uppercase tracking-widest">Tracked Files</span>
            </div>
            <div className="p-3 space-y-1.5">
              <AnimatePresence mode="popLayout">
                {files.map((file, fi) => {
                  const st = getFileStatusColor(file.status);
                  return (
                    <motion.div
                      key={file.name}
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0, transition: { delay: fi * 0.08 } }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border ${st.border} ${st.bg} transition-all`}
                    >
                      <span className={`w-5 h-5 rounded text-[9px] font-bold flex items-center justify-center ${st.text} bg-black/20`}>
                        {st.label}
                      </span>
                      <span className="text-xs font-mono text-[#D1D5DB]">{file.name}</span>
                      <span className={`ml-auto text-[9px] font-mono ${st.text} uppercase tracking-wider`}>
                        {file.status}
                      </span>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Terminal Command Panel */}
          <div className="flex-1 bg-[#141B23] border border-[#253141] rounded-xl overflow-hidden flex flex-col">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#253141] bg-[#19222E]">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FACC15]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              </div>
              <span className="text-[10px] font-mono text-[#6B7280] ml-2">terminal</span>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-center gap-3 font-mono text-xs">
              {/* git status */}
              <div className="text-[#6B7280]">
                <span className="text-[#10B981]">$</span> git status
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="pl-2 border-l-2 py-1"
                  style={{ borderColor: stages[stage].color + "50" }}
                >
                  {stage === 0 && (
                    <div className="text-[#FACC15] text-[11px] leading-relaxed">
                      modified: ingest_orders.py<br />
                      modified: config.yaml<br />
                      modified: utils/validators.py<br />
                      <span className="text-[#6B7280] text-[10px]"># 3 files changed, not staged</span>
                    </div>
                  )}
                  {stage === 1 && (
                    <div className="text-[#10B981] text-[11px] leading-relaxed">
                      staged: ingest_orders.py<br />
                      staged: config.yaml<br />
                      staged: utils/validators.py<br />
                      <span className="text-[#6B7280] text-[10px]"># 3 files ready for commit</span>
                    </div>
                  )}
                  {stage === 2 && (
                    <div className="text-[#D946EF] text-[11px] leading-relaxed">
                      [main abc1234] feat: add order ingestion<br />
                      3 files changed, 142 insertions(+)<br />
                      <span className="text-[#6B7280] text-[10px]"># commit saved to local history</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Action Button */}
              <div className="mt-2">
                {stage === 0 && (
                  <button
                    onClick={handleAdd}
                    className="w-full px-4 py-2.5 rounded-lg text-[11px] font-bold font-mono border transition-all bg-[#3B82F6]/10 text-[#3B82F6] border-[#3B82F6]/30 hover:bg-[#3B82F6]/20 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                  >
                    <span className="text-[#10B981]">$</span> git add .
                  </button>
                )}
                {stage === 1 && (
                  <button
                    onClick={handleCommit}
                    className="w-full px-4 py-2.5 rounded-lg text-[11px] font-bold font-mono border transition-all bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30 hover:bg-[#10B981]/20 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                  >
                    <span className="text-[#10B981]">$</span> git commit -m &quot;feat: add order ingestion&quot;
                  </button>
                )}
                {stage === 2 && (
                  <div className="w-full px-4 py-2.5 rounded-lg text-[11px] font-bold font-mono border bg-[#D946EF]/10 text-[#D946EF] border-[#D946EF]/30 text-center flex items-center justify-center gap-2">
                    <Check className="w-3.5 h-3.5" /> Committed Successfully
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
