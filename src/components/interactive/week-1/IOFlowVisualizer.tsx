"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ArrowRight, FileText, Search, Plus, ClipboardCheck, Hexagon, FileJson, Download } from "lucide-react";

type FlowStatus = "idle" | "reading" | "validating" | "enriching" | "writing";

export default function IOFlowVisualizer() {
  const [status, setStatus] = useState<FlowStatus>("idle");

  const handleRun = () => {
    if (status !== "idle") return;
    setStatus("reading");
    setTimeout(() => setStatus("validating"), 1200);
    setTimeout(() => setStatus("enriching"), 2400);
    setTimeout(() => setStatus("writing"), 3600);
    setTimeout(() => setStatus("idle"), 5000);
  };

  const steps = [
    { key: "reading", label: "READ CSV", icon: <FileText className="w-5 h-5" />, color: "border-[#38bdf8]", bg: "bg-[#38bdf8]/10", text: "text-[#38bdf8]", detail: "load rows into memory" },
    { key: "validating", label: "VALIDATE", icon: <Search className="w-5 h-5" />, color: "border-[#f59e0b]", bg: "bg-[#f59e0b]/10", text: "text-[#f59e0b]", detail: "check quantity & cost" },
    { key: "enriching", label: "ENRICH", icon: <Plus className="w-5 h-5" />, color: "border-[#c084fc]", bg: "bg-[#c084fc]/10", text: "text-[#c084fc]", detail: "calculate total value" },
    { key: "writing", label: "WRITE I/O", icon: <Download className="w-5 h-5" />, color: "border-[#22c55e]", bg: "bg-[#22c55e]/10", text: "text-[#22c55e]", detail: "save to disk" },
  ];

  return (
    <div className="w-full mt-8 bg-[#0B111A] border border-[#253141] rounded-2xl shadow-xl overflow-hidden p-6 relative">
      
      <div className="flex items-center justify-between mb-10 relative z-10">
        <div className="flex items-center gap-2">
          <Hexagon className="w-5 h-5 text-[#f59e0b]" />
          <h4 className="text-white font-bold text-sm tracking-wide">I/O Pipeline Flow</h4>
        </div>
        <button
          onClick={handleRun}
          disabled={status !== "idle"}
          className="px-4 py-2 rounded-lg text-xs font-bold bg-[#f59e0b]/10 border border-[#f59e0b]/50 text-[#f59e0b] hover:bg-[#f59e0b]/20 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <Play className="w-4 h-4" /> {status === "idle" ? "START PIPELINE" : "RUNNING..."}
        </button>
      </div>

      {/* Main Flow Area */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 relative z-10 min-h-[200px]">
        
        {steps.map((step, i) => {
          const isActive = status === step.key;
          const isPast = ["reading", "validating", "enriching", "writing"].indexOf(status) > i || (status === "idle" && false); // Simplified logic

          return (
            <React.Fragment key={step.key}>
              <div className="flex flex-col items-center gap-3 relative">
                <motion.div 
                  className={`w-20 h-20 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${isActive ? `${step.border} ${step.bg} shadow-[0_0_20px_rgba(255,255,255,0.1)] scale-110` : "border-[#253141] bg-[#141B23] grayscale opacity-50"}`}
                  animate={{ 
                    borderColor: isActive ? step.color.split("-")[1] : "#253141",
                    scale: isActive ? 1.05 : 1
                  }}
                >
                  <div className={isActive ? step.text : "text-[#6B7280]"}>{step.icon}</div>
                  
                  {/* Active Document Indicator */}
                  <AnimatePresence>
                    {isActive && i < 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: -20, scale: 0.5 }}
                        animate={{ opacity: 1, x: 40, scale: 1 }}
                        exit={{ opacity: 0, x: 80, scale: 0.5 }}
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className="absolute text-white z-20 pointer-events-none"
                      >
                        <FileText className="w-6 h-6 shadow-xl" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.div>
                <div className="text-center">
                  <div className={`text-xs font-bold font-mono ${isActive ? step.text : "text-[#6B7280]"}`}>{step.label}</div>
                  <div className="text-[9px] text-[#6B7280] uppercase tracking-widest mt-1">{step.detail}</div>
                </div>
              </div>

              {/* Connector */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex w-12 h-0.5 bg-[#253141] relative">
                  {status !== "idle" && (
                    <motion.div 
                      className="absolute top-0 left-0 h-full bg-[#f59e0b]"
                      initial={{ width: "0%" }}
                      animate={{ width: ["reading", "validating", "enriching", "writing"].indexOf(status) > i ? "100%" : "0%" }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                  <ArrowRight className="w-3 h-3 text-[#253141] absolute -right-1.5 -top-1.5" />
                </div>
              )}
            </React.Fragment>
          );
        })}

        {/* Output Split */}
        <div className="hidden md:flex flex-col gap-4 ml-8 relative h-32 justify-center">
          {/* Top branch */}
          <div className="absolute left-[-20px] top-[14%] w-[20px] h-0.5 bg-[#253141]">
             {status === "writing" && <motion.div className="h-full bg-[#22c55e]" initial={{ width: "0%" }} animate={{ width: "100%" }} />}
          </div>
          <div className="absolute left-[-20px] top-[14%] w-0.5 h-[36%] bg-[#253141]">
             {status === "writing" && <motion.div className="w-full bg-[#22c55e]" initial={{ height: "0%" }} animate={{ height: "100%" }} />}
          </div>
          <div className="absolute left-[-20px] top-[50%] w-[20px] h-0.5 bg-[#253141]">
             {status === "writing" && <motion.div className="h-full bg-[#22c55e]" initial={{ width: "0%" }} animate={{ width: "100%" }} />}
          </div>
          
          <motion.div 
            animate={{ opacity: status === "writing" ? 1 : 0.4 }}
            className="flex items-center gap-3 bg-[#141B23] border border-[#253141] p-2 pr-4 rounded-xl translate-y-[-10px]"
          >
            <div className="p-2 bg-[#22c55e]/10 rounded-lg"><FileText className="w-4 h-4 text-[#22c55e]" /></div>
            <div className="flex flex-col">
              <span className="text-xs font-mono font-bold text-[#D1D5DB]">inventory_clean.csv</span>
              <span className="text-[9px] text-[#6B7280] uppercase tracking-widest">Valid Rows</span>
            </div>
          </motion.div>

          <motion.div 
            animate={{ opacity: status === "writing" ? 1 : 0.4 }}
            className="flex items-center gap-3 bg-[#141B23] border border-[#253141] p-2 pr-4 rounded-xl translate-y-[10px]"
          >
            <div className="p-2 bg-[#F97316]/10 rounded-lg"><FileJson className="w-4 h-4 text-[#F97316]" /></div>
            <div className="flex flex-col">
              <span className="text-xs font-mono font-bold text-[#D1D5DB]">reorder_flags.json</span>
              <span className="text-[9px] text-[#6B7280] uppercase tracking-widest">Actionable Alerts</span>
            </div>
          </motion.div>
          
          {/* Bottom branch connector */}
          <div className="absolute left-[-20px] bottom-[14%] w-[20px] h-0.5 bg-[#253141]">
            {status === "writing" && <motion.div className="h-full bg-[#F97316]" initial={{ width: "0%" }} animate={{ width: "100%" }} />}
          </div>
          <div className="absolute left-[-20px] bottom-[14%] w-0.5 h-[36%] bg-[#253141]">
            {status === "writing" && <motion.div className="w-full bg-[#F97316]" initial={{ height: "0%" }} animate={{ height: "100%" }} />}
          </div>
        </div>

      </div>

    </div>
  );
}
