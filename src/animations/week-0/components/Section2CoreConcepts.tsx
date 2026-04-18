"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Hammer, Repeat, PackageOpen, AlertTriangle, Lightbulb } from "lucide-react";
import CodeBlock from "@/components/mdx/CodeBlock";

export default function Section2CoreConcepts() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: 0.4 } }
  };

  const cardScale = {
    hidden: { opacity: 0, scale: 0.92, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 28 } }
  };

  const drawLine = {
    hidden: { strokeDashoffset: 100 },
    visible: { strokeDashoffset: 0, transition: { duration: 0.6, ease: "linear" } }
  };

  const rawPythonCode = `raw_purchase_order = {
    "order_id": "PO-2024-00419",
    "supplier_id": "SUP-0042",
    "sku": "SKU-88821",
    "quantity": 500,
    "unit_cost": 12.75,
    "order_date": "2024-11-01",
    "warehouse": "WH-EAST-03"
}

def ingest(raw):
    return {**raw, "_ingested_at": "2024-11-01T09:23Z", "_source": "erp_api"}

def transform(record):
    return {**record, "total_cost_usd": record["quantity"] * record["unit_cost"],
            "status": "OPEN"}

def serve(record, destination):
    print(f"Writing to {destination}: {record}")

ingested = ingest(raw_purchase_order)
cleaned  = transform(ingested)
serve(cleaned, "delta://globalmart/gold/fact_purchase_orders")`;

  return (
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="w-full flex flex-col gap-12 mt-16 mb-24"
    >
      
      {/* Header */}
      <motion.div variants={slideUp} className="flex flex-col gap-2">
        <h3 className="text-[#F97316] text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          <span className="text-xl">📚</span> Core Concepts
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          What Does a Data Engineer Actually Do?
        </h2>
      </motion.div>

      {/* 3 Icon Cards */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <Hammer className="w-6 h-6 text-[#F97316]" />, title: "BUILD", desc: "Pipelines, platforms & infrastructure" },
          { icon: <Repeat className="w-6 h-6 text-[#38bdf8]" />, title: "MOVE", desc: "Data from A to B reliably, at any scale" },
          { icon: <PackageOpen className="w-6 h-6 text-[#22c55e]" />, title: "SERVE", desc: "Clean, trusted data to every consumer" }
        ].map((card, idx) => (
          <motion.div 
            key={idx} 
            variants={cardScale}
            whileHover={{ y: -4, borderColor: "#F97316", boxShadow: "0 10px 30px -10px rgba(249,115,22,0.2)" }}
            className="flex flex-col gap-4 p-6 bg-[#141B23] border border-[#253141] rounded-xl transition-colors duration-300 group"
          >
            <div className="w-12 h-12 bg-[#1A232E] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              {card.icon}
            </div>
            <h4 className="text-xl font-bold text-white tracking-tight">{card.title}</h4>
            <p className="text-[#9CA3AF] leading-relaxed">{card.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Analogy Block */}
      <motion.div variants={slideUp} className="border-l-4 border-[#38bdf8] bg-[#38bdf8]/5 p-6 rounded-r-xl italic text-[#D1D5DB] text-lg leading-relaxed shadow-sm">
        "Think of a Data Engineer as the city's highway architect. Without well-designed roads, no vehicle — no matter how fast — reaches its destination."
      </motion.div>

      {/* Mental Model & DE vs DS Table Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 3-Layer Mental Model */}
        <motion.div variants={cardScale} className="flex flex-col justify-between p-8 bg-[#141B23] border border-[#253141] rounded-xl">
          <h4 className="text-[#9CA3AF] text-sm font-mono tracking-widest uppercase mb-6">The 3-Layer Mental Model</h4>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 h-full">
            
            {/* INGEST */}
            <div className="flex flex-col items-center gap-3 text-center w-full z-10">
              <div className="px-4 py-2 bg-[#253141] border border-[#374151] rounded text-[#E5E7EB] font-bold text-sm shadow-md">INGEST</div>
              <p className="text-[#9CA3AF] text-xs">Capture data as-is</p>
            </div>
            
            {/* Arrow 1 */}
            <div className="hidden sm:flex flex-1 items-center justify-center min-w-[40px] z-0 -mx-4 opacity-50">
               <svg width="100%" height="24" viewBox="0 0 100 24" preserveAspectRatio="none">
                 <motion.line 
                    x1="0" y1="12" x2="100" y2="12" 
                    stroke="#F97316" strokeWidth="2" strokeDasharray="100"
                    variants={drawLine} 
                 />
                 <polygon points="95,8 100,12 95,16" fill="#F97316" />
               </svg>
            </div>

            {/* TRANSFORM */}
            <div className="flex flex-col items-center gap-3 text-center w-full z-10">
              <div className="px-4 py-2 bg-[#F97316]/20 border border-[#F97316]/50 rounded text-[#F97316] font-bold text-sm shadow-[0_0_15px_rgba(249,115,22,0.15)]">TRANSFORM</div>
              <p className="text-[#9CA3AF] text-xs">Apply business logic & clean</p>
            </div>

            {/* Arrow 2 */}
            <div className="hidden sm:flex flex-1 items-center justify-center min-w-[40px] z-0 -mx-4 opacity-50">
               <svg width="100%" height="24" viewBox="0 0 100 24" preserveAspectRatio="none">
                 <motion.line 
                    x1="0" y1="12" x2="100" y2="12" 
                    stroke="#22c55e" strokeWidth="2" strokeDasharray="100"
                    variants={drawLine} 
                 />
                 <polygon points="95,8 100,12 95,16" fill="#22c55e" />
               </svg>
            </div>

            {/* SERVE */}
            <div className="flex flex-col items-center gap-3 text-center w-full z-10">
              <div className="px-4 py-2 bg-[#22c55e]/20 border border-[#22c55e]/50 rounded text-[#22c55e] font-bold text-sm shadow-[0_0_15px_rgba(34,197,94,0.15)]">SERVE</div>
              <p className="text-[#9CA3AF] text-xs">Deliver to consumers</p>
            </div>

          </div>
        </motion.div>

        {/* DE vs DS Clarity Card */}
        <motion.div variants={slideUp} className="bg-[#1A232E] border border-[#2A3645] rounded-xl overflow-hidden shadow-lg">
          <div className="grid grid-cols-2 bg-[#141B23] py-4 px-6 border-b border-[#2A3645]">
            <h4 className="text-[#F97316] font-bold text-[15px] tracking-tight">Data Engineer</h4>
            <h4 className="text-[#38bdf8] font-bold text-[15px] tracking-tight border-l border-[#2A3645] pl-6">Data Scientist</h4>
          </div>
          <div className="p-0">
            {[
              ["Builds the pipeline", "Uses what comes out"],
              ["Owns infrastructure", "Owns the model"],
              ["Works with raw data", "Works with clean data"],
              ["Your role in this course", "Not your role here"]
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-2 text-[13px] border-b border-[#2A3645] last:border-0 hover:bg-[#253141]/50 transition-colors">
                <div className="py-3 px-6 text-[#E5E7EB] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F97316]" /> {row[0]}
                </div>
                <div className="py-3 px-6 text-[#9CA3AF] border-l border-[#2A3645] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" /> {row[1]}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Callouts */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div variants={cardScale} className="flex gap-4 p-5 rounded-xl bg-[#22c55e]/5 border border-[#22c55e]/20">
          <Lightbulb className="w-6 h-6 text-[#22c55e] shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <h5 className="text-[#22c55e] font-bold text-sm tracking-wide">PRO TIP</h5>
            <p className="text-[#D1D5DB] text-[13px] leading-relaxed">
              If you internalize the 3-layer model in Week 0, every architecture diagram you see for the rest of your career will immediately make sense.
            </p>
          </div>
        </motion.div>

        <motion.div variants={cardScale} className="flex gap-4 p-5 rounded-xl bg-[#ef4444]/5 border border-[#ef4444]/20">
          <AlertTriangle className="w-6 h-6 text-[#ef4444] shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1">
            <h5 className="text-[#ef4444] font-bold text-sm tracking-wide">WARNING</h5>
            <p className="text-[#D1D5DB] text-[13px] leading-relaxed">
              Don't confuse Data Engineering with Data Science. You build the highway. They drive the car.
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Code Block Mental Model */}
      <motion.div variants={cardScale}>
        <h4 className="text-[#9CA3AF] text-sm font-mono tracking-widest uppercase mb-3">Python — Pipeline Mental Model</h4>
        <div className="rounded-xl overflow-hidden border border-[#253141] shadow-2xl">
          <CodeBlock language="python">{rawPythonCode}</CodeBlock>
        </div>
      </motion.div>

    </motion.section>
  );
}
