"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Wrench, BookHeart, Server, Database, Clock, CloudCog, Check, MonitorPlay } from "lucide-react";
import CurriculumCallout from "@/components/curriculum/CurriculumCallout";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import CodeBlock from "@/components/mdx/CodeBlock";

// --- Zustand Store for Checklists ---
interface SetupStore {
  checks: Record<string, boolean>;
  toggle: (id: string) => void;
}

const useSetupStore = create<SetupStore>()(
  persist(
    (set) => ({
      checks: {},
      toggle: (id) => set((state) => ({ 
        checks: { ...state.checks, [id]: !state.checks[id] } 
      })),
    }),
    { name: "week0-setup-checklist" }
  )
);

export default function Section4Setup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [activeTab, setActiveTab] = useState(0);
  
  // Hydration fix for zustand persist
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { checks, toggle } = useSetupStore();

  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: 0.4 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const tabs = [
    { id: "Workspace", icon: <BookHeart size={16} />, content: "Where notebooks & files live. This is your primary coding interface." },
    { id: "Compute", icon: <Server size={16} />, content: "Create & manage clusters. The engine that runs your Spark code." },
    { id: "Data", icon: <Database size={16} />, content: "Databases & Delta tables. Manage your schemas and tabular data here." },
    { id: "Workflows", icon: <Clock size={16} />, content: "Scheduled jobs (used heavily in Week 4 for orchestration)." },
    { id: "Repos", icon: <CloudCog size={16} />, content: "GitHub integration (We link this to your personal repo in Week 1)." }
  ];

  const checklistItems = [
    { id: "name", label: "Name", text: "globalmart-dev-[yourname]" },
    { id: "mode", label: "Mode", text: "Single Node" },
    { id: "runtime", label: "Runtime", text: "14.3 LTS (Spark 3.5.0, Scala 2.12)" },
    { id: "term", label: "Auto-term", text: "120 minutes" },
    { id: "nb", label: "Notebook", text: "00_setup_databases created" },
    { id: "dbs", label: "Databases", text: "Bronze / Silver / Gold created" },
  ];

  const rawPython = `import sys
from datetime import datetime

print("=" * 55)
print("  GlobalMart Data Platform — Environment Validation")
print("=" * 55)
print(f"  Python Version   : {sys.version.split()[0]}")
print(f"  PySpark Version  : {pyspark.__version__}")
print(f"  Timestamp        : {datetime.utcnow()} UTC")
print("=" * 55)

spark.sql("CREATE DATABASE IF NOT EXISTS globalmart_bronze")
spark.sql("CREATE DATABASE IF NOT EXISTS globalmart_silver")
spark.sql("CREATE DATABASE IF NOT EXISTS globalmart_gold")

print("✅ GlobalMart databases created!")
print("   bronze | silver | gold — ready to build.")`;

  return (
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full flex flex-col gap-12 mt-16 mb-24"
    >
      {/* Header */}
      <motion.div variants={slideUp} className="flex flex-col gap-2">
        <h3 className="text-[#a855f7] text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          <span className="text-xl">🛠️</span> Tool Setup
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Configuring Your Command Center — Databricks CE
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Column: Tabs & File Tree */}
        <div className="flex flex-col gap-8">
          
          {/* Tabs UI */}
          <motion.div variants={slideUp} className="bg-[#141B23] border border-[#253141] rounded-xl overflow-hidden p-3 shadow-md">
            <div className="flex flex-wrap gap-2 mb-4">
              {tabs.map((tab, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${activeTab === idx ? "bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/30" : "text-[#9CA3AF] hover:text-white hover:bg-[#1A232E]"}`}
                >
                  {tab.icon} {tab.id}
                </button>
              ))}
            </div>
            <div className="min-h-[80px] p-4 bg-[#0B111A] rounded-lg border border-[#1e293b]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="text-[#D1D5DB] text-[15px]"
                >
                  {tabs[activeTab].content}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Folder Tree */}
          <motion.div variants={slideUp} className="bg-[#0B111A] border border-[#253141] rounded-xl p-6 font-mono text-[13px] leading-relaxed shadow-xl overflow-x-auto">
            <h4 className="text-[#9CA3AF] mb-3 text-xs tracking-widest uppercase font-sans">Required Folder Structure</h4>
            <div className="text-[#38bdf8]">Workspace</div>
            <div className="text-[#D1D5DB] ml-4 border-l border-[#253141] pl-4">
              <div>Users</div>
              <div className="ml-4 border-l border-[#253141] pl-4">
                <div>your@email.com</div>
                <div className="ml-4 border-l border-[#253141] pl-4">
                  <div>GlobalMart</div>
                  <div className="ml-4 border-l border-[#253141] pl-4">
                    <div>Week-00-Orientation</div>
                    <div className="ml-4 border-l border-[#253141] pl-4 text-[#22c55e] flex items-center gap-2">
                       <span>00_setup_databases.py</span>
                       <span className="text-[#9CA3AF] italic text-[11px]">← create this notebook</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Interactive Checklist */}
        <motion.div variants={staggerContainer} className="bg-gradient-to-br from-[#141B23] to-[#0F151B] border border-[#253141] rounded-xl overflow-hidden shadow-2xl relative">
          <div className="p-5 border-b border-[#253141] bg-[#1A232E] flex items-center justify-between">
             <div className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-[#a855f7]" />
                <h4 className="font-bold text-white tracking-wide">Cluster Setup Checklist</h4>
             </div>
             {/* Progress */}
             {mounted && (
               <div className="text-xs font-mono text-[#9CA3AF] bg-[#0B111A] px-2 py-1 rounded">
                 {Object.values(checks).filter(Boolean).length} / {checklistItems.length}
               </div>
             )}
          </div>
          <div className="p-6 flex flex-col gap-3">
             {checklistItems.map((item) => {
               const isChecked = mounted ? !!checks[item.id] : false;
               return (
                 <motion.button 
                   variants={slideUp}
                   key={item.id} 
                   onClick={() => toggle(item.id)}
                   className={`w-full text-left p-3 rounded-lg border ${isChecked ? "bg-[#22c55e]/5 border-[#22c55e]/30" : "bg-[#0B111A] border-[#253141] hover:border-[#374151]"} flex items-center gap-4 transition-all duration-300 group`}
                 >
                    {/* Checkbox */}
                    <div className={`w-5 h-5 rounded border flex justify-center items-center shrink-0 transition-colors ${isChecked ? "bg-[#22c55e] border-[#22c55e]" : "bg-[#1A232E] border-[#374151] group-hover:border-[#4B5563]"}`}>
                       {isChecked && <Check size={14} className="text-white" strokeWidth={3} />}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 flex-1 overflow-hidden">
                      <span className={`text-sm font-mono tracking-wide ${isChecked ? "text-[#22c55e]" : "text-[#9CA3AF]"}`}>{item.label}:</span>
                      <span className={`text-sm truncate ${isChecked ? "text-white line-through opacity-50" : "text-[#D1D5DB]"}`}>{item.text}</span>
                    </div>
                 </motion.button>
               );
             })}
          </div>
        </motion.div>

      </div>

      {/* Callouts */}
      <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CurriculumCallout type="warning" title="COMMON MISTAKE">
          Clusters auto-terminate after 2 hours. Your notebook code is always safe — but all in-memory variables are gone. Always re-run cells from the top after a restart.
        </CurriculumCallout>
        
        <CurriculumCallout type="tip">
          Name your cluster intentionally: <code>globalmart-dev-[yourname]</code>. In real teams, clusters are named after the project they serve. This signals infrastructure awareness in interviews.
        </CurriculumCallout>
      </motion.div>

      {/* Setup Validation Code Block */}
      <motion.div variants={slideUp}>
        <h4 className="text-[#9CA3AF] text-sm font-mono tracking-widest uppercase mb-3 flex items-center gap-2">
           <MonitorPlay className="w-4 h-4" /> Notebook Validation Cell
        </h4>
        <div className="rounded-xl overflow-hidden border border-[#253141] shadow-2xl">
          <CodeBlock language="python">{rawPython}</CodeBlock>
        </div>
      </motion.div>

    </motion.section>
  );
}
