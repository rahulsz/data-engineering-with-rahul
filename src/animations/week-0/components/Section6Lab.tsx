"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Beaker, CheckCircle2, ChevronRight, Check } from "lucide-react";
import CodeBlock from "@/components/mdx/CodeBlock";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function Section6Lab() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const { width, height } = useWindowSize();
  
  const [tasks, setTasks] = useState([false, false, false, false]);
  const [showConfetti, setShowConfetti] = useState(false);

  const completedCount = tasks.filter(Boolean).length;
  const progressPercent = (completedCount / tasks.length) * 100;

  useEffect(() => {
    if (completedCount === tasks.length) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000); // 5 seconds of confetti
      return () => clearTimeout(timer);
    }
  }, [completedCount, tasks.length]);

  const toggleTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index] = !newTasks[index];
    setTasks(newTasks);
  };

  const slideUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: 0.5 } }
  };

  const staggerCards = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
  };

  const popScale = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 260, damping: 20 } }
  };

  const taskData = [
    {
      title: "Create Databricks Community Edition Account",
      steps: [
        "Navigate to community.cloud.databricks.com",
        "Create cluster: globalmart-dev-[yourname]",
        "Runtime: 14.3 LTS  |  Mode: Single Node",
        "Auto-terminate: 120 min"
      ]
    },
    {
      title: "Create GlobalMart Database Schema",
      steps: [
        "Create notebook: 00_setup_databases",
        "Run validation cell (code block above)",
        "Create Bronze / Silver / Gold databases",
        "Create raw_products table with 3 sample rows"
      ]
    },
    {
      title: "Initialize GitHub Repository",
      steps: [
        "Create repo: globalmart-data-platform (Private)",
        "Create folders: notebooks/ | src/ | tests/ | docs/ | config/",
        "Commit: feat(week-0): initialize project structure"
      ]
    },
    {
      title: "Connect Databricks Repos to GitHub (CHALLENGE)",
      steps: [
        "Go to Repos tab in Databricks sidebar",
        "Add Repo → connect globalmart-data-platform",
        "Create a notebook inside the Repo",
        "Commit via Databricks Repos UI",
        "Verify commit appears in GitHub ✅"
      ]
    }
  ];

  const rawPython = `from pyspark.sql import Row
from datetime import datetime, timezone

sample_products = [
    Row(product_id="P-001", sku="SKU-88821", product_name="UltraBook Pro 15",
        category="Electronics", subcategory="Laptops", unit_cost=450.00,
        unit_price=899.99, supplier_id="SUP-0042", is_active=True,
        _source_system="SAP_ERP", _ingested_at=datetime.now(timezone.utc)),

    Row(product_id="P-002", sku="SKU-32201", product_name="ErgoDesk Chair",
        category="Home", subcategory="Office Furniture", unit_cost=85.00,
        unit_price=249.99, supplier_id="SUP-0017", is_active=True,
        _source_system="SAP_ERP", _ingested_at=datetime.now(timezone.utc)),

    Row(product_id="P-003", sku="SKU-11043", product_name="CloudRun Sneakers",
        category="Apparel", subcategory="Footwear", unit_cost=32.00,
        unit_price=119.99, supplier_id="SUP-0031", is_active=True,
        _source_system="SAP_ERP", _ingested_at=datetime.now(timezone.utc)),
]

df = spark.createDataFrame(sample_products)
df.write.format("delta").mode("append").saveAsTable("globalmart_bronze.raw_products")

display(spark.table("globalmart_bronze.raw_products"))
print("✅ 3 sample products inserted into Bronze layer")`;

  return (
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full flex flex-col gap-12 mt-16 mb-24 relative"
    >
      {/* Confetti Overlay */}
      {showConfetti && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          <Confetti width={width} height={height} numberOfPieces={300} gravity={0.15} colors={['#F97316', '#22c55e', '#38bdf8', '#a855f7', '#facc15']} />
        </div>
      )}

      {/* Header */}
      <motion.div variants={slideUp} className="flex flex-col gap-3 bg-[#1A232E] border border-[#253141] p-6 lg:p-8 rounded-2xl shadow-xl">
        <h3 className="text-[#22c55e] text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          <span className="text-xl">🧪</span> Hands-On Lab
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
          Lab 0: Provisioning the Environment
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-[#D1D5DB] text-sm lg:text-[15px] leading-relaxed">
           <div className="flex-1">
             <span className="font-bold text-[#38bdf8]">Objective:</span> By the end, you have Databricks configured, GitHub repo initialized, and your workspace live — exactly like Day 1 at a real DE job.
           </div>
           <div className="px-4 py-2 bg-[#0F151B] border border-[#253141] rounded-lg shrink-0 font-mono text-[#F97316] font-bold">
             ⏱ Duration: 90m
           </div>
        </div>

        {/* Progress Bar Container */}
        <div className="mt-6">
          <div className="flex justify-between items-end mb-2">
            <span className="text-xs font-mono tracking-widest uppercase text-[#9CA3AF]">Lab Progress</span>
            <span className={`text-xs font-bold ${progressPercent === 100 ? 'text-[#22c55e]' : 'text-[#F97316]'}`}>{Math.round(progressPercent)}%</span>
         </div>
         <div className="w-full h-3 bg-[#0F151B] rounded-full overflow-hidden border border-[#253141]">
            <motion.div 
               className={`h-full ${progressPercent === 100 ? 'bg-gradient-to-r from-[#22c55e] to-[#4ade80]' : 'bg-gradient-to-r from-[#F97316] to-[#fb923c]'}`}
               initial={{ width: 0 }}
               animate={{ width: `${progressPercent}%` }}
               transition={{ duration: 0.5, ease: "easeOut" as const }}
            />
         </div>
         <AnimatePresence>
            {progressPercent === 100 && (
               <motion.div 
                 initial={{ opacity: 0, y: -10, scale: 0.9 }}
                 animate={{ opacity: 1, y: 0, scale: 1 }}
                 className="mt-3 flex items-center justify-center gap-2 text-[#22c55e] font-bold tracking-wide"
               >
                 <CheckCircle2 className="w-5 h-5" /> Lab Complete!
               </motion.div>
            )}
         </AnimatePresence>
        </div>
      </motion.div>

      {/* Task Cards Grid */}
      <motion.div variants={staggerCards} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {taskData.map((task, idx) => (
          <motion.div 
            variants={slideUp} 
            key={idx}
            className={`rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col ${tasks[idx] ? 'bg-[#22c55e]/5 border-[#22c55e]/30' : 'bg-[#141B23] border-[#253141]'}`}
          >
            {/* Task Header Button */}
            <button 
              onClick={() => toggleTask(idx)}
              className={`w-full flex items-center gap-4 p-5 border-b transition-colors text-left ${tasks[idx] ? 'border-[#22c55e]/30 bg-[#22c55e]/10 hover:bg-[#22c55e]/20' : 'border-[#253141] bg-[#1A232E] hover:bg-[#1f2937]'}`}
            >
              <div className={`w-6 h-6 shrink-0 rounded flex items-center justify-center border transition-all ${tasks[idx] ? 'bg-[#22c55e] border-[#22c55e]' : 'bg-transparent border-[#4B5563]'}`}>
                {tasks[idx] && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
              </div>
              <div className="flex-1">
                <div className={`text-xs font-mono font-bold uppercase tracking-widest mb-1 ${tasks[idx] ? 'text-[#22c55e]' : 'text-[#9CA3AF]'}`}>
                  Task {idx + 1} {idx === 3 && "(Challenge)"}
                </div>
                <h4 className={`font-bold ${tasks[idx] ? 'text-white/70 line-through' : 'text-white'}`}>{task.title}</h4>
              </div>
            </button>
            {/* Steps Content */}
            <div className={`p-5 flex-1 ${tasks[idx] ? 'opacity-50' : 'opacity-100'}`}>
              <ul className="space-y-3">
                {task.steps.map((step, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-[#6B7280] shrink-0" />
                    <span className="text-[#D1D5DB] text-sm leading-snug">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Code Block for Raw Products Insertion */}
      <motion.div variants={popScale} className="flex flex-col gap-4 mt-8">
        <h4 className="text-[#9CA3AF] text-sm font-mono tracking-widest uppercase flex items-center gap-2">
           <Beaker className="w-4 h-4" /> Raw Products Insert Script (PySpark)
        </h4>
        <div className="rounded-xl overflow-hidden shadow-2xl border border-[#253141]">
           <CodeBlock language="python">{rawPython}</CodeBlock>
        </div>
      </motion.div>

      {/* Expected Output Table */}
      <motion.div variants={slideUp} className="bg-[#141B23] border border-[#253141] rounded-2xl overflow-hidden p-6 shadow-xl">
         <h4 className="text-[#9CA3AF] text-sm font-mono tracking-widest uppercase mb-4">Expected Output Table</h4>
         <div className="overflow-x-auto rounded-lg border border-[#253141]">
            <table className="w-full text-left text-sm text-[#D1D5DB]">
              <thead className="text-[11px] font-mono tracking-wider uppercase bg-[#1A232E] text-[#9CA3AF]">
                <tr>
                  <th className="px-4 py-3 border-b border-[#253141]">product_id</th>
                  <th className="px-4 py-3 border-b border-[#253141]">sku</th>
                  <th className="px-4 py-3 border-b border-[#253141]">product_name</th>
                  <th className="px-4 py-3 border-b border-[#253141]">category</th>
                  <th className="px-4 py-3 border-b border-[#253141]">unit_price</th>
                  <th className="px-4 py-3 border-b border-[#253141]">is_active</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#253141]/50">
                <tr className="hover:bg-[#1A232E]/50">
                  <td className="px-4 py-3 font-mono text-[#F97316]">P-001</td><td className="px-4 py-3">SKU-88821</td><td className="px-4 py-3 font-bold text-white">UltraBook Pro 15</td><td className="px-4 py-3">Electronics</td><td className="px-4 py-3 font-mono">899.99</td><td className="px-4 py-3 text-[#22c55e]">true</td>
                </tr>
                <tr className="hover:bg-[#1A232E]/50">
                  <td className="px-4 py-3 font-mono text-[#F97316]">P-002</td><td className="px-4 py-3">SKU-32201</td><td className="px-4 py-3 font-bold text-white">ErgoDesk Chair</td><td className="px-4 py-3">Home</td><td className="px-4 py-3 font-mono">249.99</td><td className="px-4 py-3 text-[#22c55e]">true</td>
                </tr>
                <tr className="hover:bg-[#1A232E]/50">
                  <td className="px-4 py-3 font-mono text-[#F97316]">P-003</td><td className="px-4 py-3">SKU-11043</td><td className="px-4 py-3 font-bold text-white">CloudRun Sneakers</td><td className="px-4 py-3">Apparel</td><td className="px-4 py-3 font-mono">119.99</td><td className="px-4 py-3 text-[#22c55e]">true</td>
                </tr>
              </tbody>
            </table>
         </div>
      </motion.div>

    </motion.section>
  );
}
