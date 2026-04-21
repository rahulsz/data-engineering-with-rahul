"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Box, ArrowRight, XCircle, CheckCircle2, AlertTriangle } from "lucide-react";

type RowStatus = "idle" | "reading" | "validate_qty" | "validate_cost" | "clean" | "reorder" | "corrupt";

const inventoryData = [
  { sku: "SKU-88821", quantity: 120, unit_cost: 450.00 },
  { sku: "SKU-32201", quantity: 0, unit_cost: 85.00 },
  { sku: "SKU-11043", quantity: 45, unit_cost: -32.00 },
];

export default function ConveyorSimulator() {
  const [currentRowIndex, setCurrentRowIndex] = useState(-1);
  const [status, setStatus] = useState<RowStatus>("idle");
  const [bucketClean, setBucketClean] = useState<any[]>([]);
  const [bucketReorder, setBucketReorder] = useState<any[]>([]);
  const [bucketCorrupt, setBucketCorrupt] = useState<any[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    if (currentRowIndex >= inventoryData.length) {
      setIsPlaying(false);
      return;
    }

    let timer: NodeJS.Timeout;

    const row = inventoryData[currentRowIndex];

    if (status === "idle") {
      timer = setTimeout(() => setStatus("reading"), 600);
    } else if (status === "reading") {
      timer = setTimeout(() => setStatus("validate_qty"), 800);
    } else if (status === "validate_qty") {
      timer = setTimeout(() => {
        if (row.quantity === 0) setStatus("reorder");
        else setStatus("validate_cost");
      }, 1000);
    } else if (status === "validate_cost") {
      timer = setTimeout(() => {
        if (row.unit_cost < 0) setStatus("corrupt");
        else setStatus("clean");
      }, 1000);
    } else if (status === "reorder") {
      timer = setTimeout(() => {
        setBucketReorder(prev => [...prev, row]);
        setCurrentRowIndex(prev => prev + 1);
        setStatus("idle");
      }, 600);
    } else if (status === "corrupt") {
      timer = setTimeout(() => {
        setBucketCorrupt(prev => [...prev, row]);
        setCurrentRowIndex(prev => prev + 1);
        setStatus("idle");
      }, 600);
    } else if (status === "clean") {
      timer = setTimeout(() => {
        setBucketClean(prev => [...prev, row]);
        setCurrentRowIndex(prev => prev + 1);
        setStatus("idle");
      }, 600);
    }

    return () => clearTimeout(timer);
  }, [isPlaying, currentRowIndex, status]);

  const handleStart = () => {
    if (currentRowIndex >= inventoryData.length) {
      handleReset();
    }
    setIsPlaying(true);
    if (currentRowIndex === -1) setCurrentRowIndex(0);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentRowIndex(-1);
    setStatus("idle");
    setBucketClean([]);
    setBucketReorder([]);
    setBucketCorrupt([]);
  };

  return (
    <div className="w-full mt-8 bg-[#0B111A] border border-[#253141] rounded-2xl shadow-xl overflow-hidden">
      
      {/* Header Controls */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#253141] bg-[#141B23]">
        <div className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-[#9CA3AF]" />
          <h4 className="text-white font-bold text-sm tracking-wide">Pipeline Conveyor Simulator</h4>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={handleReset}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#253141] text-[#9CA3AF] hover:text-white transition-colors"
          >
            RESET
          </button>
          <button 
            onClick={handleStart}
            disabled={isPlaying || currentRowIndex >= inventoryData.length}
            className="px-4 py-1.5 rounded-lg text-xs font-bold bg-[#38bdf8]/10 border border-[#38bdf8]/50 text-[#38bdf8] hover:bg-[#38bdf8]/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            <Play className="w-3.5 h-3.5" /> {currentRowIndex >= inventoryData.length ? "COMPLETE" : "PROCESS NEXT"}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row min-h-[400px]">
        {/* Code / Row List */}
        <div className="w-full md:w-1/3 bg-[#1A2332] border-r border-[#253141] p-5 flex flex-col gap-3">
          <div className="text-[10px] text-[#6B7280] font-mono tracking-widest uppercase mb-2">Input Rows</div>
          {inventoryData.map((row, i) => {
            const isProcessing = i === currentRowIndex;
            const isDone = i < currentRowIndex;
            return (
              <div 
                key={i} 
                className={`flex flex-col p-3 rounded-lg border text-xs font-mono transition-all ${
                  isProcessing 
                  ? "border-[#38bdf8] bg-[#38bdf8]/10 text-white shadow-[0_0_15px_rgba(56,189,248,0.2)]" 
                  : isDone
                  ? "border-[#253141] bg-[#141B23] text-[#6B7280] opacity-50"
                  : "border-[#253141] bg-[#141B23] text-[#9CA3AF]"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={isProcessing ? "text-[#38bdf8] font-bold" : ""}>{row.sku}</span>
                  {isProcessing && <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }}><RotateCcw className="w-3 h-3 text-[#38bdf8]" /></motion.div>}
                  {isDone && <CheckCircle2 className="w-3 h-3 text-[#22c55e]" />}
                </div>
                <div className="flex justify-between">
                  <span>qty: {row.quantity}</span>
                  <span>cost: {row.unit_cost}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Visualizer */}
        <div className="flex-1 p-8 flex flex-col items-center justify-center relative overflow-hidden">
          
          <div className="flex flex-col items-center relative z-10 w-full max-w-[400px]">
            {/* Phase 1: Read */}
            <div className={`w-full text-center py-3 rounded-xl border-2 transition-all duration-300 ${status === "reading" ? "border-[#38bdf8] bg-[#38bdf8]/10 shadow-[0_0_20px_rgba(56,189,248,0.2)]" : "border-[#253141] bg-[#141B23]"}`}>
              <span className={`text-sm font-mono font-bold ${status === "reading" ? "text-[#38bdf8]" : "text-[#6B7280]"}`}>FOR ROW IN ROWS</span>
            </div>
            
            <div className={`w-1 h-8 transition-colors ${status === "validate_qty" ? "bg-[#f59e0b]" : "bg-[#253141]"}`} />

            {/* Phase 2: Check Qty */}
            <div className={`w-full text-center py-3 rounded-xl border-2 transition-all duration-300 ${status === "validate_qty" ? "border-[#f59e0b] bg-[#f59e0b]/10 shadow-[0_0_20px_rgba(245,158,11,0.2)]" : "border-[#253141] bg-[#141B23]"}`}>
              <span className={`text-sm font-mono font-bold ${status === "validate_qty" ? "text-[#f59e0b]" : "text-[#6B7280]"}`}>IF QUANTITY == 0:</span>
            </div>

            <div className="flex w-full">
              <div className="flex-1 border-r-2 border-t-2 rounded-tr-lg h-6 translate-y-6" style={{ borderColor: status === "reorder" ? "#f59e0b" : "#253141" }} />
              <div className="flex-1 border-t-2 h-6 translate-y-6" style={{ borderColor: status === "validate_cost" ? "#c084fc" : "#253141" }} />
            </div>

            {/* Split Level 1 */}
            <div className="flex w-full justify-between mt-6 gap-4">
              <div className={`flex-1 text-center py-2 rounded-lg border-2 transition-all ${status === "reorder" ? "border-[#f59e0b] bg-[#f59e0b]/10" : "border-[#253141] bg-[#141B23]"}`}>
                <span className={`text-[10px] uppercase font-bold tracking-widest ${status === "reorder" ? "text-[#f59e0b]" : "text-[#6B7280]"}`}>YES → REORDER</span>
              </div>
              <div className={`flex-1 text-center py-2 rounded-lg border-2 transition-all duration-300 ${status === "validate_cost" ? "border-[#c084fc] bg-[#c084fc]/10 shadow-[0_0_20px_rgba(192,132,252,0.2)]" : "border-[#253141] bg-[#141B23]"}`}>
                <span className={`text-[11px] font-mono font-bold ${status === "validate_cost" ? "text-[#c084fc]" : "text-[#6B7280]"}`}>ELIF COST {"<"} 0:</span>
              </div>
            </div>

            <div className="flex w-full">
              <div className="w-[50%]" />
              <div className="flex-1 flex">
                <div className="flex-1 border-r-2 border-t-2 rounded-tr-lg h-6 translate-y-6" style={{ borderColor: status === "corrupt" ? "#ef4444" : "#253141" }} />
                <div className="flex-1 border-t-2 h-6 translate-y-6" style={{ borderColor: status === "clean" ? "#22c55e" : "#253141" }} />
              </div>
            </div>

            {/* Split Level 2 */}
            <div className="flex w-full justify-end mt-6 gap-4 pl-[50%]">
              <div className={`flex-1 text-center py-2 rounded-lg border-2 transition-all ${status === "corrupt" ? "border-[#ef4444] bg-[#ef4444]/10" : "border-[#253141] bg-[#141B23]"}`}>
                <span className={`text-[10px] uppercase font-bold tracking-widest ${status === "corrupt" ? "text-[#ef4444]" : "text-[#6B7280]"}`}>YES → CORRUPT</span>
              </div>
              <div className={`flex-1 text-center py-2 rounded-lg border-2 transition-all duration-300 ${status === "clean" ? "border-[#22c55e] bg-[#22c55e]/10" : "border-[#253141] bg-[#141B23]"}`}>
                <span className={`text-[10px] uppercase font-bold tracking-widest ${status === "clean" ? "text-[#22c55e]" : "text-[#6B7280]"}`}>ELSE → CLEAN</span>
              </div>
            </div>

          </div>

          <AnimatePresence>
            {status !== "idle" && currentRowIndex >= 0 && currentRowIndex < inventoryData.length && (
              <motion.div
                layoutId="payload"
                key="payload"
                className="absolute shadow-2xl p-2 bg-[#1A2332] border border-[#38bdf8] rounded-md z-20 flex items-center gap-2 text-[10px] font-mono whitespace-nowrap"
                initial={{ top: "0%", left: "50%", x: "-50%", y: "-50%", opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 1, scale: 1,
                  top: status === "reading" ? "10%" :
                       status === "validate_qty" ? "30%" :
                       status === "reorder" ? "53%" :
                       status === "validate_cost" ? "53%" :
                       status === "corrupt" ? "76%" :
                       status === "clean" ? "76%" : "10%",
                  left: status === "reorder" ? "30%" :
                        status === "validate_cost" ? "70%" :
                        status === "corrupt" ? "58%" :
                        status === "clean" ? "82%" : "50%",
                  borderColor: status === "reorder" ? "#f59e0b" :
                               status === "validate_cost" ? "#c084fc" :
                               status === "corrupt" ? "#ef4444" :
                               status === "clean" ? "#22c55e" : "#38bdf8",
                  color: status === "reorder" ? "#f59e0b" :
                         status === "validate_cost" ? "#c084fc" :
                         status === "corrupt" ? "#ef4444" :
                         status === "clean" ? "#22c55e" : "#38bdf8"
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <Box className="w-3 h-3" />
                {inventoryData[currentRowIndex].sku}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* Buckets */}
      <div className="grid grid-cols-3 bg-[#141B23] border-t border-[#253141]">
        <div className="p-4 border-r border-[#253141] flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#f59e0b] text-[10px] tracking-widest font-bold uppercase mb-2">
            <AlertTriangle className="w-3 h-3" /> Reorder Flags ({bucketReorder.length})
          </div>
          {bucketReorder.map((r, i) => (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} key={i} className="text-[#9CA3AF] text-xs font-mono bg-[#0B111A] border border-[#253141] px-2 py-1 rounded">{r.sku}</motion.div>
          ))}
        </div>
        <div className="p-4 border-r border-[#253141] flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#ef4444] text-[10px] tracking-widest font-bold uppercase mb-2">
            <XCircle className="w-3 h-3" /> Corrupt ({bucketCorrupt.length})
          </div>
          {bucketCorrupt.map((r, i) => (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} key={i} className="text-[#9CA3AF] text-xs font-mono bg-[#0B111A] border border-[#253141] px-2 py-1 rounded">{r.sku}</motion.div>
          ))}
        </div>
        <div className="p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#22c55e] text-[10px] tracking-widest font-bold uppercase mb-2">
            <CheckCircle2 className="w-3 h-3" /> Clean Output ({bucketClean.length})
          </div>
          {bucketClean.map((r, i) => (
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} key={i} className="text-[#9CA3AF] text-xs font-mono bg-[#0B111A] border border-[#253141] px-2 py-1 rounded">{r.sku}</motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
