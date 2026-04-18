"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Building2, XCircle, Search, HelpCircle, ShieldCheck } from "lucide-react";
import CodeBlock from "@/components/mdx/CodeBlock";

export default function Section3CaseStudy() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const slideLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 260, damping: 28 } }
  };

  const slideRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 260, damping: 28 } }
  };

  const staggerCards = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const popIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  const drawLineDown = {
    hidden: { height: 0 },
    visible: { height: "40px", transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const shake = {
    hidden: { x: 0 },
    visible: { 
      x: [0, -4, 4, -4, 4, 0], 
      transition: { duration: 0.5, delay: 1.2 } 
    }
  };

  const rawSQL = `-- SOURCE LAYER (raw — untouched)
erp_raw.purchase_orders
ecom_raw.online_orders
wms_raw.inventory_snapshots
logistics_raw.shipments

-- STAGING LAYER (cleaned & validated)
staging.stg_purchase_orders
staging.stg_online_orders
staging.stg_inventory_snapshots
staging.stg_shipments

-- WAREHOUSE LAYER (modelled, business-ready)
warehouse.dim_product      -- Product master & hierarchy
warehouse.dim_supplier     -- Supplier profiles & SLAs
warehouse.dim_warehouse    -- Distribution center data
warehouse.dim_date         -- Date spine 2020–2026
warehouse.fact_purchase_orders
warehouse.fact_inventory
warehouse.fact_shipments`;

  return (
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full flex flex-col gap-12 mt-16 mb-24"
    >
      {/* Header */}
      <motion.div variants={slideLeft} className="flex flex-col gap-2">
        <h3 className="text-[#38bdf8] text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          <span className="text-xl">🏢</span> The Client
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Meet GlobalMart — Your Client for 15 Weeks
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Company Profile Card */}
        <motion.div variants={slideLeft} className="bg-[#141B23] border border-[#253141] rounded-2xl overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 right-0 p-32 bg-[#38bdf8] blur-[150px] opacity-10 rounded-full" />
          <div className="p-6 border-b border-[#253141] flex items-center gap-3">
            <div className="p-2.5 bg-[#38bdf8]/10 text-[#38bdf8] rounded-xl border border-[#38bdf8]/20">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">GlobalMart</h3>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="flex justify-between border-b border-[#253141] pb-3">
              <span className="text-[#9CA3AF] font-mono text-sm">Industry</span>
              <span className="text-white font-medium">Omnichannel Retail</span>
            </div>
            <div className="flex justify-between border-b border-[#253141] pb-3">
              <span className="text-[#9CA3AF] font-mono text-sm">Revenue</span>
              <span className="text-[#22c55e] font-medium font-mono">$2.4 Billion / year</span>
            </div>
            <div className="flex justify-between border-b border-[#253141] pb-3">
              <span className="text-[#9CA3AF] font-mono text-sm">SKUs</span>
              <span className="text-white font-medium">50,000+</span>
            </div>
            <div className="flex justify-between border-b border-[#253141] pb-3">
              <span className="text-[#9CA3AF] font-mono text-sm">Warehouses</span>
              <span className="text-white font-medium">8 Regional Centers</span>
            </div>
            <div className="pt-2">
              <span className="text-[#9CA3AF] font-mono text-sm block mb-3">Source Systems</span>
              <div className="space-y-2">
                {[
                  { name: "SAP ERP", desc: "Purchase Orders" },
                  { name: "Shopify", desc: "Online Orders" },
                  { name: "WMS", desc: "Inventory Counts" },
                  { name: "Logistics App", desc: "Shipment Events" },
                ].map((s, i) => (
                  <div key={i} className="flex gap-3 items-center text-sm">
                    <span className="text-[#F97316]">→</span>
                    <span className="font-bold text-[#E5E7EB] min-w-[100px]">{s.name}</span>
                    <span className="text-[#6B7280] italic">({s.desc})</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 p-4 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/20 flex items-center justify-between">
              <span className="text-[#ef4444] font-bold text-sm tracking-wide">Current State:</span>
              <span className="text-red-200 font-mono text-sm bg-[#ef4444]/20 px-2 py-1 rounded">ZERO unified data visibility 😬</span>
            </div>
          </div>
        </motion.div>

        {/* 3 Urgent Business Questions */}
        <motion.div variants={staggerCards} className="flex flex-col gap-4 justify-center">
          {[
            { q: "Q1 — INVENTORY HEALTH", text: "Which SKUs are at stockout risk, and which are causing overstock costs?" },
            { q: "Q2 — SUPPLIER PERFORMANCE", text: "Which suppliers are consistently late or delivering damaged goods?" },
            { q: "Q3 — DEMAND FORECASTING", text: "How should we adjust purchase orders based on seasonal demand patterns?" }
          ].map((item, i) => (
            <motion.div 
              key={i} 
              variants={slideRight}
              whileHover={{ x: -5, borderColor: "#ef4444", backgroundColor: "rgba(239, 68, 68, 0.05)" }}
              className="p-5 border border-[#253141] bg-[#141B23] rounded-xl flex items-start gap-4 transition-all duration-300"
            >
              <HelpCircle className="w-6 h-6 text-[#ef4444] shrink-0 mt-0.5" />
              <div className="flex flex-col gap-1">
                <h4 className="text-[#ef4444] font-bold text-[13px] tracking-wider font-mono">{item.q}</h4>
                <p className="text-[#D1D5DB] text-sm leading-relaxed">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Mission Statement Banner */}
      <motion.div variants={popIn} className="w-full p-6 bg-gradient-to-r from-[#1A232E] to-[#253141] border border-[#38bdf8]/30 rounded-2xl flex items-center gap-6 shadow-[0_0_30px_rgba(56,189,248,0.1)] relative overflow-hidden group">
        <div className="absolute inset-0 bg-[#38bdf8]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="p-3 bg-[#38bdf8]/20 rounded-2xl text-[#38bdf8] shrink-0">
          <Search className="w-8 h-8" />
        </div>
        <div className="z-10">
          <h3 className="text-[#38bdf8] font-bold tracking-widest text-[13px] uppercase mb-1">🎯 Your Mission</h3>
          <p className="text-white text-lg lg:text-xl font-medium tracking-tight">Build the data platform that answers all 3 questions. <span className="text-[#F97316]">Deadline: Week 12.</span></p>
        </div>
      </motion.div>

      {/* Data Silo Interruption Diagram */}
      <motion.div variants={staggerCards} className="p-8 lg:p-12 border border-[#253141] bg-[#0B111A] rounded-2xl relative mt-8 flex flex-col items-center">
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full text-center relative z-10">
          {[
            { n: "SAP ERP", subtitle: "Purchase Orders" },
            { n: "Shopify", subtitle: "Customer Orders" },
            { n: "WMS", subtitle: "Inventory Counts" },
            { n: "Logistics", subtitle: "Shipment Events" }
          ].map((x, i) => (
            <motion.div key={i} className="flex flex-col items-center gap-3">
              <motion.div variants={popIn} className="w-full p-4 bg-[#141B23] border border-[#374151] rounded-xl shadow-md flex flex-col gap-1 items-center">
                <span className="font-bold text-white tracking-tight">{x.n}</span>
                <span className="text-xs text-[#9CA3AF]">{x.subtitle}</span>
              </motion.div>
              
              {/* Silo Error Tag */}
              <motion.div variants={slideRight} className="flex items-center gap-1.5 px-3 py-1 bg-[#ef4444]/10 border border-[#ef4444]/30 rounded-full mt-2">
                <XCircle className="w-3.5 h-3.5 text-[#ef4444]" />
                <span className="text-[11px] font-bold text-[#ef4444] uppercase tracking-widest">Silo</span>
              </motion.div>
              
              {/* Downward Line */}
              <motion.div variants={drawLineDown} className="w-px bg-gradient-to-b from-[#ef4444]/50 to-transparent my-2" />
            </motion.div>
          ))}
        </div>

        <motion.div variants={shake} className="w-full flex justify-center mt-2 relative z-10">
          <div className="px-6 py-3 bg-[#0F151B] border-2 border-[#ef4444]/40 rounded-xl text-center shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            <span className="text-white font-bold text-lg flex items-center gap-2">
              ❓ No Unified View
            </span>
          </div>
        </motion.div>

        {/* After State Teaser */}
        <motion.div variants={popIn} className="mt-16 w-full max-w-2xl mx-auto group relative cursor-help">
          <div className="absolute inset-0 z-20 flex pt-10 justify-center pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
            <span className="bg-[#0F151B] px-4 py-1.5 rounded-full border border-[#374151] text-[#9CA3AF] text-xs font-mono font-bold tracking-widest uppercase">Hover to unlock Week 12 Preview</span>
          </div>
          <div className="border border-[#22c55e]/20 bg-[#22c55e]/5 rounded-xl p-6 text-center filter blur-md opacity-50 group-hover:blur-none group-hover:opacity-100 transition-all duration-500">
            <ShieldCheck className="w-10 h-10 text-[#22c55e] mx-auto mb-3" />
            <span className="text-white font-bold text-xl block mb-2">✅ Unified Delta Lakehouse</span>
            <span className="text-[#D1D5DB] font-mono text-sm">Bronze → Silver → Gold → Power BI</span>
          </div>
        </motion.div>

      </motion.div>

      {/* SQL Code Block */}
      <motion.div variants={popIn}>
        <h4 className="text-[#9CA3AF] text-sm font-mono tracking-widest uppercase mb-3">GlobalMart Data Universe Target Model (SQL)</h4>
        <div className="rounded-xl overflow-hidden border border-[#253141] shadow-xl">
          <CodeBlock language="sql">{rawSQL}</CodeBlock>
        </div>
      </motion.div>

    </motion.section>
  );
}
