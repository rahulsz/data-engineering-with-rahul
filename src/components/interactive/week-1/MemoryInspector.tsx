"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Code2, MousePointerClick } from "lucide-react";

const memoryData: Record<string, { type: string, value: string, mutable: boolean, desc: string, memory: string, pythonType: string }> = {
  sku: {
    type: "String (str)",
    pythonType: "str",
    value: '"SKU-88821"',
    mutable: false,
    desc: "A sequence of characters used for identifiers and names.",
    memory: "[ 'S' | 'K' | 'U' | '-' | '8' | '8' | '8' | '2' | '1' ]\nMemory: Continuous block of immutable chars.",
  },
  quantity: {
    type: "Integer (int)",
    pythonType: "int",
    value: "500",
    mutable: false,
    desc: "Whole numbers used for counts and exact math.",
    memory: "Value: 500\nBase 2: 00000001 11110100",
  },
  cost: {
    type: "Float (float)",
    pythonType: "float",
    value: "12.75",
    mutable: false,
    desc: "Used for precise decimal ratios (though not for exact monetary systems in banking).",
    memory: "Mantissa: 1.59375\nExponent: 3\nMemory: IEEE 754 Floating Point",
  },
  layers: {
    type: "Tuple (tuple)",
    pythonType: "tuple",
    value: '("bronze", "silver", "gold")',
    mutable: false,
    desc: "An ordered, unchangeable collection. Ideal for fixed architecture.",
    memory: "Index 0 -> 'bronze'\nIndex 1 -> 'silver'\nIndex 2 -> 'gold'",
  },
  warehouses: {
    type: "List (list)",
    pythonType: "list",
    value: '["WH-01", "WH-02"]',
    mutable: true,
    desc: "An ordered, dynamic collection. You can append to it.",
    memory: "Pointer Array -> [ PTR1, PTR2 ]\nPTR1 -> 'WH-01'\nPTR2 -> 'WH-02'\n(Can expand to hold more pointers)",
  },
  po: {
    type: "Dictionary (dict)",
    pythonType: "dict",
    value: '{"sku": "SKU-888", "qty": 500}',
    mutable: true,
    desc: "Key-value mapping. O(1) lookups. Matches JSON structure perfectly.",
    memory: "Hash Table:\nhash('sku') -> points to 'SKU-888'\nhash('qty') -> points to 500",
  }
};

export default function MemoryInspector() {
  const [activeToken, setActiveToken] = useState<string>("sku");

  const act = memoryData[activeToken];

  return (
    <div className="w-full flex-col md:flex-row flex gap-6 mt-8 p-4 bg-[#0B111A] border border-[#253141] rounded-2xl shadow-xl">
      
      {/* Code Editor Side */}
      <div className="flex-1 bg-[#141B23] border border-[#253141] rounded-xl overflow-hidden flex flex-col">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-[#253141] bg-[#19222E]">
          <Code2 className="w-4 h-4 text-[#9CA3AF]" />
          <span className="text-xs font-mono text-[#9CA3AF]">globalmart_memory.py</span>
          <span className="ml-auto text-[10px] text-[#38bdf8] flex items-center gap-1"><MousePointerClick className="w-3 h-3"/> Click variables</span>
        </div>
        
        <div className="p-5 font-mono text-[13px] leading-relaxed select-none">
          <div className="text-[#6B7280]"># Click on the highlighted variables below!</div>
          <br/>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#c084fc]">sku</span> = 
            <button onClick={() => setActiveToken("sku")} className={`px-1.5 py-0.5 rounded transition-colors ${activeToken === "sku" ? "bg-[#c084fc]/20 text-[#c084fc] outline outline-1 outline-[#c084fc]" : "text-[#22c55e] hover:bg-white/5"}`}>"SKU-88821"</button>
          </div>
          
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#c084fc]">order_quantity</span> = 
            <button onClick={() => setActiveToken("quantity")} className={`px-1.5 py-0.5 rounded transition-colors ${activeToken === "quantity" ? "bg-[#38bdf8]/20 text-[#38bdf8] outline outline-1 outline-[#38bdf8]" : "text-[#eab308] hover:bg-white/5"}`}>500</button>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#c084fc]">unit_cost</span> = 
            <button onClick={() => setActiveToken("cost")} className={`px-1.5 py-0.5 rounded transition-colors ${activeToken === "cost" ? "bg-[#38bdf8]/20 text-[#38bdf8] outline outline-1 outline-[#38bdf8]" : "text-[#eab308] hover:bg-white/5"}`}>12.75</button>
          </div>
          
          <br/>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#c084fc]">medallion_layers</span> = 
            <button onClick={() => setActiveToken("layers")} className={`px-1.5 py-0.5 rounded transition-colors ${activeToken === "layers" ? "bg-[#f59e0b]/20 text-[#f59e0b] outline outline-1 outline-[#f59e0b]" : "text-[#D1D5DB] hover:bg-white/5"}`}>("bronze", "silver", "gold")</button>
          </div>
          
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#c084fc]">distribution_centers</span> = 
            <button onClick={() => setActiveToken("warehouses")} className={`px-1.5 py-0.5 rounded transition-colors ${activeToken === "warehouses" ? "bg-[#f59e0b]/20 text-[#f59e0b] outline outline-1 outline-[#f59e0b]" : "text-[#D1D5DB] hover:bg-white/5"}`}>["WH-01", "WH-02"]</button>
          </div>
          
          <br/>
          <div className="flex flex-col mb-1">
            <div><span className="text-[#c084fc]">purchase_order</span> = \b 
            <button onClick={() => setActiveToken("po")} className={`ml-2 px-1.5 py-0.5 rounded transition-colors ${activeToken === "po" ? "bg-[#22c55e]/20 text-[#22c55e] outline outline-1 outline-[#22c55e]" : "text-[#D1D5DB] hover:bg-white/5"}`}>{"{"}</button></div>
            <div className={`ml-4 pl-2 text-[#D1D5DB] transition-all border-l ${activeToken === "po" ? "border-l border-[#22c55e]/50" : "border-transparent"}`}>
              <span className="text-[#22c55e]">"sku"</span>: sku,<br/>
              <span className="text-[#22c55e]">"qty"</span>: order_quantity
            </div>
            <div>
              <button onClick={() => setActiveToken("po")} className={`ml-[34px] mt-1 px-1.5 py-0.5 rounded transition-colors ${activeToken === "po" ? "bg-[#22c55e]/20 text-[#22c55e] outline outline-1 outline-[#22c55e]" : "text-[#D1D5DB] hover:bg-white/5"}`}>{"}"}</button>
            </div>
          </div>

        </div>
      </div>

      {/* Memory Inspector Side */}
      <div className="flex-1 bg-[#1A2332] border border-[#253141] rounded-xl flex flex-col relative overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-[#253141] bg-[#19222E]">
          <Database className="w-4 h-4 text-[#c084fc]" />
          <span className="text-xs font-mono font-bold tracking-widest text-[#c084fc] uppercase">Memory Inspector</span>
        </div>
        
        <div className="p-6 flex flex-col h-full relative z-10 w-[300px]">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={activeToken}
              initial={{ opacity: 0, x: 20, filter: "blur(4px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(4px)" }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full gap-4"
            >
              <div className="flex items-start justify-between">
                <h4 className="text-xl font-bold text-white font-mono">{act.type}</h4>
                <div className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded border ${act.mutable ? "border-[#ef4444]/50 bg-[#ef4444]/10 text-[#ef4444]" : "border-[#38bdf8]/50 bg-[#38bdf8]/10 text-[#38bdf8]"}`}>
                  {act.mutable ? "Mutable" : "Immutable"}
                </div>
              </div>

              <div className="text-sm text-[#9CA3AF] leading-relaxed">
                {act.desc}
              </div>

              <div className="mt-auto bg-[#0B111A] border border-[#253141] rounded-lg p-4">
                <div className="text-[10px] text-[#6B7280] uppercase tracking-widest mb-2 font-bold font-mono">RAM Allocation Preview</div>
                <pre className="text-xs text-[#22c55e] font-mono whitespace-pre-wrap leading-relaxed">{act.memory}</pre>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#D1D5DB] bg-white/5 py-2 px-3 rounded-lg border border-white/5">
                <span className="text-[#6B7280]">type(value) → </span> <span className="text-[#c084fc]">{`<class '${act.pythonType}'>`}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Decorative background blur */}
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-[#c084fc]/10 rounded-full blur-3xl pointer-events-none" />
      </div>
      
    </div>
  );
}
