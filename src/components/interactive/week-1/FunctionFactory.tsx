"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, ArrowRight, Cog, ArrowDown } from "lucide-react";

export default function FunctionFactory() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputReady, setOutputReady] = useState(false);


  const handleRun = () => {
    if (isProcessing) return;
    setOutputReady(false);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setOutputReady(true);
    }, 2000);
  };

  return (
    <div className="w-full mt-8 bg-[#0B111A] border border-[#253141] rounded-2xl shadow-xl overflow-hidden p-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#c084fc]" />
          <h4 className="text-white font-bold text-sm tracking-wide">The Function Factory Machine</h4>
        </div>
        <button
          onClick={handleRun}
          disabled={isProcessing}
          className="px-4 py-2 rounded-lg text-xs font-bold bg-[#c084fc]/10 border border-[#c084fc]/50 text-[#c084fc] hover:bg-[#c084fc]/20 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {isProcessing ? "PROCESSING..." : "PROCESS ROW"} <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 min-h-[300px]">
        
        {/* Input */}
        <div className="flex flex-col gap-2 items-center w-full md:w-1/3">
          <div className="text-[10px] text-[#6B7280] font-bold tracking-widest uppercase">Input: Raw Row</div>
          <div className={`p-4 rounded-xl border border-[#253141] bg-[#141B23] w-full text-xs font-mono text-[#D1D5DB] transition-opacity duration-500 ${isProcessing ? 'opacity-50' : 'opacity-100'}`}>
            <span className="text-[#c084fc]">row</span> = {"{"}<br/>
            &nbsp;&nbsp;<span className="text-[#22c55e]">"sku"</span>: <span className="text-[#38bdf8]">"SKU-888"</span>,<br/>
            &nbsp;&nbsp;<span className="text-[#22c55e]">"unit_cost"</span>: <span className="text-[#eab308]">450</span>,<br/>
            &nbsp;&nbsp;<span className="text-[#22c55e]">"unit_price"</span>: <span className="text-[#eab308]">899</span><br/>
            {"}"}
          </div>
        </div>

        {/* Machine */}
        <div className="flex flex-col items-center justify-center relative">
          <div className="md:hidden"><ArrowDown className="w-6 h-6 text-[#253141] my-4" /></div>
          <div className="hidden md:block"><ArrowRight className="w-8 h-8 text-[#253141]" /></div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-10 w-48">
            <motion.div 
              className={`p-6 rounded-2xl border-2 shadow-2xl bg-[#141B23] flex flex-col items-center justify-center gap-3 transition-colors duration-300 ${isProcessing ? 'border-[#c084fc] shadow-[0_0_30px_rgba(192,132,252,0.3)]' : 'border-[#253141]'}`}
            >
              <div className="flex items-center justify-center relative w-16 h-16">
                <motion.div
                  animate={{ rotate: isProcessing ? 360 : 0 }}
                  transition={{ repeat: isProcessing ? Infinity : 0, duration: 2, ease: "linear" }}
                  className="absolute"
                >
                  <Cog className={`w-12 h-12 ${isProcessing ? 'text-[#c084fc]' : 'text-[#6B7280]'}`} />
                </motion.div>
                <motion.div
                  animate={{ rotate: isProcessing ? -360 : 0 }}
                  transition={{ repeat: isProcessing ? Infinity : 0, duration: 1.5, ease: "linear" }}
                  className="absolute translate-x-4 -translate-y-4"
                >
                  <Cog className={`w-8 h-8 ${isProcessing ? 'text-[#38bdf8]' : 'text-[#4b5563]'}`} />
                </motion.div>
              </div>
              <div className="text-[11px] font-mono font-bold text-[#D1D5DB]">
                enrich_product()
              </div>
            </motion.div>
          </div>
        </div>

        {/* Output */}
        <div className="flex flex-col gap-2 items-center w-full md:w-1/3">
          <div className="text-[10px] text-[#6B7280] font-bold tracking-widest uppercase">Output: Enriched Row</div>
          <div className="w-full relative min-h-[160px]">
            <AnimatePresence>
              {outputReady && (
                <motion.div 
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  className="p-4 rounded-xl border border-[#22c55e]/50 bg-[#22c55e]/10 w-full text-xs font-mono text-[#D1D5DB] absolute top-0 left-0"
                >
                  <span className="text-[#c084fc]">enriched</span> = {"{"}<br/>
                  &nbsp;&nbsp;<span className="text-[#22c55e]">"sku"</span>: <span className="text-[#38bdf8]">"SKU-888"</span>,<br/>
                  &nbsp;&nbsp;<span className="text-[#22c55e]">"unit_cost"</span>: <span className="text-[#eab308]">450</span>,<br/>
                  &nbsp;&nbsp;<span className="text-[#22c55e]">"unit_price"</span>: <span className="text-[#eab308]">899</span>,<br/>
                  <motion.div initial={{ opacity: 0, backgroundColor: 'rgba(34,197,94,0.5)' }} animate={{ opacity: 1, backgroundColor: 'transparent' }} transition={{ delay: 0.5, duration: 1 }} className="px-1 rounded">
                    &nbsp;&nbsp;<span className="text-[#22c55e]">"margin_pct"</span>: <span className="text-[#eab308]">49.94</span>,
                  </motion.div>
                  <motion.div initial={{ opacity: 0, backgroundColor: 'rgba(34,197,94,0.5)' }} animate={{ opacity: 1, backgroundColor: 'transparent' }} transition={{ delay: 0.8, duration: 1 }} className="px-1 rounded">
                    &nbsp;&nbsp;<span className="text-[#22c55e]">"margin_tier"</span>: <span className="text-[#38bdf8]">"MEDIUM"</span>,
                  </motion.div>
                  <motion.div initial={{ opacity: 0, backgroundColor: 'rgba(34,197,94,0.5)' }} animate={{ opacity: 1, backgroundColor: 'transparent' }} transition={{ delay: 1.1, duration: 1 }} className="px-1 rounded">
                    &nbsp;&nbsp;<span className="text-[#22c55e]">"is_profitable"</span>: <span className="text-[#c084fc]">True</span>
                  </motion.div>
                  {"}"}
                </motion.div>
              )}
            </AnimatePresence>
            {!outputReady && (
              <div className="p-4 rounded-xl border border-[#253141] bg-[#141B23] w-full text-xs font-mono text-[#6B7280] absolute top-0 left-0 h-full flex items-center justify-center border-dashed">
                Waiting for machine...
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
