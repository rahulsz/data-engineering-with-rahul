"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { Cloud, Server, Database, TrendingUp, Link } from "lucide-react";

import { slideUp } from "@/lib/animations/variants";

const staggerTimeline: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const popScale: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 260, damping: 20 } }
};

const drawTimeline: Variants = {
  hidden: { height: 0 },
  visible: { height: "100%", transition: { duration: 1.5, ease: "easeOut" as const } }
};

const layers = [
  { layer: "BRONZE", colorCls: "text-[#f97316]", bgCls: "bg-[#f97316]/10", borderCls: "border-[#f97316]/25", desc: "Raw, unchanged ingestion", week: "W4" },
  { layer: "SILVER", colorCls: "text-[#94a3b8]", bgCls: "bg-[#94a3b8]/10", borderCls: "border-[#94a3b8]/25", desc: "Cleaned & validated",    week: "W5" },
  { layer: "GOLD",   colorCls: "text-[#fbbf24]", bgCls: "bg-[#fbbf24]/10", borderCls: "border-[#fbbf24]/25", desc: "Star Schema model",       week: "W7" },
];

const steps = [
  { num: 1, icon: <Cloud     className="w-5 h-5 text-[#38bdf8]" />, title: "Cloud Ingestion",          desc: "Raw data lands from SAP ERP, Shopify, WMS, and Logistics into ADLS Gen2 / AWS S3.", tool: "ADF",      week: "6" },
  { num: 2, icon: <Database  className="w-5 h-5 text-[#f97316]" />, title: "Databricks ETL — Bronze",  desc: "Raw files ingested into Delta tables unchanged. No transformation at this stage.",  tool: "Delta Lake", week: "4" },
  { num: 3, icon: <Server    className="w-5 h-5 text-[#a855f7]" />, title: "Databricks ETL — Silver",  desc: "Data cleaned, validated, and business rules applied. Nulls handled.",               tool: "PySpark",    week: "5 & 8" },
  { num: 4, icon: <Database  className="w-5 h-5 text-[#fbbf24]" />, title: "Gold Layer — Warehouse",   desc: "Dimensional model: Star Schema with Fact + Dim tables. SCD Type 2.",                 tool: "DBX SQL",    week: "7" },
  { num: 5, icon: <TrendingUp className="w-5 h-5 text-[#22c55e]"/>, title: "Power BI Dashboard",       desc: "Executive KPI dashboard: Inventory scorecard, Supplier performance.",               tool: "Power BI",   week: "10 & 11" },
];

export default function Week0Capstone() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full flex flex-col gap-12 mt-16 mb-24"
    >
      {/* Header */}
      <motion.div variants={slideUp} className="flex flex-col gap-2">
        <h3 className="text-[#facc15] text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          <span className="text-xl">🏆</span> North Star
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
          What You&apos;ll Build by Week 12
        </h2>
        <p className="text-[#D1D5DB] text-lg">Every week is a brick. This is the building.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* ── Left: Numbered Timeline ── */}
        <div className="col-span-1 lg:col-span-5 relative pl-4 md:pl-8">
          {/* Background rail */}
          <div className="absolute top-4 bottom-4 left-[31px] md:left-[47px] w-px bg-[#253141] z-0" />
          {/* Animated fill */}
          <motion.div
            variants={drawTimeline}
            className="absolute top-4 left-[31px] md:left-[47px] w-px bg-gradient-to-b from-[#facc15] via-[#a855f7] to-[#38bdf8] origin-top z-0"
          />

          <motion.div variants={staggerTimeline} className="flex flex-col gap-8 relative z-10 w-full pl-6 md:pl-8 py-2">
            {steps.map((step) => (
              <motion.div key={step.num} variants={slideUp} className="relative group">
                {/* Circle node */}
                <motion.div
                  variants={popScale}
                  className="absolute -left-[45px] md:-left-[53px] top-1 w-8 h-8 rounded-full bg-[#141B23] border-2 border-[#1e293b] flex items-center justify-center font-bold text-[#E5E7EB] text-sm group-hover:border-[#facc15] transition-colors shadow-lg z-10"
                >
                  {step.num}
                </motion.div>

                <div className="bg-[#141B23] border border-[#253141] p-5 rounded-xl transition-all duration-300 group-hover:border-[#374151] group-hover:-translate-y-1 shadow-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {step.icon}
                      <h4 className="font-bold text-white tracking-tight">{step.title}</h4>
                    </div>
                    <span className="bg-[#1A232E] border border-[#374151] px-2 py-0.5 rounded text-xs font-mono font-bold text-[#facc15] whitespace-nowrap">
                      W{step.week}
                    </span>
                  </div>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed mb-4">{step.desc}</p>
                  <div className="text-[11px] font-mono text-[#6B7280] tracking-widest uppercase">
                    TOOL:<span className="text-[#D1D5DB] font-sans font-medium tracking-normal ml-2 normal-case">{step.tool}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Right: Visual Architecture + Milestone ── */}
        <div className="col-span-1 lg:col-span-7 flex flex-col gap-8">

          {/* Visual Architecture Diagram */}
          <motion.div variants={slideUp} className="bg-[#0B111A] border border-[#253141] rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col gap-4">
            <h4 className="text-[#9CA3AF] text-xs tracking-widest uppercase font-sans mb-2">Architecture Overview</h4>

            {/* Row 1: Sources → Cloud */}
            <div className="flex items-stretch gap-3">
              <div className="flex-1 border border-[#2A3645] rounded-xl p-3 bg-[#111820]">
                <div className="text-[10px] font-mono text-[#E5E7EB] font-bold tracking-widest mb-2.5 uppercase">[Source Systems]</div>
                {["SAP ERP", "Shopify", "WMS", "Logistics App"].map((s) => (
                  <div key={s} className="text-[12px] text-[#9CA3AF] font-mono py-0.5 flex items-center gap-1.5">
                    <span className="text-[#F97316] text-[10px]">→</span>{s}
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center justify-center gap-1.5 px-1 shrink-0">
                <span className="text-[10px] font-mono font-bold text-[#38bdf8] border border-[#38bdf8]/30 bg-[#38bdf8]/5 px-2 py-0.5 rounded">W6</span>
                <div className="flex items-center">
                  <div className="w-6 h-px bg-[#38bdf8]/60" />
                  <span className="text-[#38bdf8] text-[10px] leading-none">▶</span>
                </div>
              </div>

              <div className="flex-1 border border-[#38bdf8]/30 rounded-xl p-3 bg-[#0a1e2e]">
                <div className="text-[10px] font-mono text-[#38bdf8] font-bold tracking-widest mb-2.5 uppercase">[Cloud Storage]</div>
                <div className="text-[12px] text-[#D1D5DB] font-mono py-0.5">ADLS Gen2 / S3</div>
                <div className="text-[12px] text-[#6B7280] font-mono py-0.5">Raw Landing Zone</div>
              </div>
            </div>

            {/* Down arrow */}
            <div className="flex justify-center">
              <div className="flex flex-col items-center gap-0">
                <div className="w-px h-5 bg-gradient-to-b from-[#38bdf8] to-[#facc15]" />
                <span className="text-[#facc15] text-xs leading-none">▼</span>
              </div>
            </div>

            {/* Row 2: Delta LakeHouse */}
            <div className="border border-[#facc15]/25 rounded-xl overflow-hidden">
              <div className="px-4 py-2 bg-[#facc15]/8 border-b border-[#facc15]/20 flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold text-[#facc15] tracking-widest uppercase">[Databricks Delta LakeHouse]</span>
              </div>
              <div className="divide-y divide-[#1e293b]">
                {layers.map((l) => (
                  <div key={l.layer} className="flex items-center justify-between px-4 py-3 hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-3">
                      <span className={`text-[11px] font-mono font-bold w-14 text-center ${l.colorCls} ${l.bgCls} ${l.borderCls} border px-2 py-0.5 rounded`}>
                        {l.layer}
                      </span>
                      <span className="text-[12px] text-[#9CA3AF]">{l.desc}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#6B7280] border border-[#2A3645] px-1.5 py-0.5 rounded shrink-0 ml-2">{l.week}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CI/CD label */}
            <div className="flex items-center gap-2 pl-2">
              <div className="w-3 h-px bg-[#6B7280]" />
              <span className="text-[11px] font-mono font-bold text-[#22c55e]">[GitHub Actions CI/CD]</span>
              <span className="text-[10px] font-mono text-[#6B7280] border border-[#2A3645] px-1.5 py-0.5 rounded">W8</span>
            </div>

            {/* Down arrow */}
            <div className="flex justify-center">
              <div className="flex flex-col items-center">
                <div className="w-px h-5 bg-gradient-to-b from-[#22c55e] to-[#eab308]" />
                <span className="text-[#eab308] text-xs leading-none">▼</span>
              </div>
            </div>

            {/* Row 3: Power BI */}
            <div className="border border-[#eab308]/25 rounded-xl overflow-hidden">
              <div className="px-4 py-2 bg-[#eab308]/8 border-b border-[#eab308]/20">
                <span className="text-[10px] font-mono font-bold text-[#eab308] tracking-widest uppercase">[Power BI Service]</span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex gap-6 text-[12px] text-[#9CA3AF]">
                  <span>Exec KPIs</span>
                  <span className="text-[#374151]">|</span>
                  <span>Inventory Board</span>
                </div>
                <span className="text-[10px] font-mono text-[#6B7280] border border-[#2A3645] px-2 py-0.5 rounded shrink-0 ml-2">W10–11</span>
              </div>
            </div>
          </motion.div>

          {/* Milestone Tracker */}
          <motion.div variants={slideUp} className="p-5 border border-[#253141] bg-[#141B23] rounded-xl flex flex-col gap-3">
            <span className="text-xs text-[#9CA3AF] tracking-widest uppercase font-mono mb-1">Milestone Tracker</span>
            <div className="flex justify-between items-center w-full gap-1 overflow-x-auto pb-1">
              {["W0", "W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"].map((w, i) => (
                <div key={i} className="flex flex-col items-center gap-2 shrink-0">
                  <span className={`text-[10px] font-mono font-bold ${i === 0 ? "text-[#facc15]" : "text-[#4B5563]"}`}>{w}</span>
                  <div className={`w-6 h-6 rounded flex items-center justify-center border transition-all duration-500 ${i === 0 ? "border-[#facc15] bg-[#facc15]/10 shadow-[0_0_10px_rgba(250,204,21,0.2)]" : "border-[#253141] bg-[#1A232E]"}`}>
                    {i === 0 && <span className="w-2 h-2 rounded-full bg-[#facc15] animate-pulse" />}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-[11px] text-[#facc15] font-bold uppercase tracking-widest mt-1">↑ You are here</div>
          </motion.div>

          {/* Connection Callout */}
          <motion.div variants={popScale} className="border border-[#F97316] bg-[#F97316]/5 rounded-xl p-5 shadow-[0_0_20px_rgba(249,115,22,0.1)] relative overflow-hidden group">
            <div className="absolute inset-0 bg-[#F97316]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="flex gap-4">
              <Link className="w-6 h-6 text-[#F97316] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-[#F97316] font-bold text-sm tracking-wide mb-2 uppercase">How Week 0 Feeds The Capstone</h4>
                <p className="text-[#D1D5DB] text-[13px] leading-relaxed">
                  The GlobalMart dataset you explore today becomes the Delta tables in Week 4, the warehouse model in Week 7, and the Power BI dashboard in Week 12. Every schema you define now travels the full 15 weeks with you.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
