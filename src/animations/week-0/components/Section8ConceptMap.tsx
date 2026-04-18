"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Network, ArrowRight } from "lucide-react";

export default function Section8ConceptMap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: 0.4 } }
  };

  const staggerList = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const slideRow = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 260, damping: 28 } }
  };

  const connections = [
    { from: "What is Data Engineering", to: "Python + Pandas (W2)", desc: "Python is the primary language of the modern data engineer" },
    { from: "What is Data Engineering", to: "ETL/ELT Architecture (W8)", desc: "Pipelines you design conceptually here get built with CI/CD" },
    { from: "Supply Chain Case", to: "SQL Fundamentals (W3)", desc: "GlobalMart schemas are the dataset for all SQL labs" },
    { from: "Supply Chain Case", to: "Data Modelling (W7)", desc: "Business questions here drive the Star Schema you'll design" },
    { from: "Databricks Setup", to: "Delta Lake (W4)", desc: "The workspace and databases you create now extend in Week 4" },
    { from: "Capstone Overview", to: "Cloud Fundamentals (W6)", desc: "Capstone data sources live in Azure ADLS or AWS S3" }
  ];

  return (
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full flex flex-col gap-8 mt-16 mb-24"
    >
      {/* Header */}
      <motion.div variants={slideUp} className="flex flex-col gap-2">
        <h3 className="text-[#a855f7] text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          <span className="text-xl">🔗</span> Concept Connections
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
          How Week 0 Connects to Everything
        </h2>
      </motion.div>

      <motion.div variants={staggerList} className="flex flex-col gap-4 bg-[#0B111A] border border-[#253141] rounded-2xl p-6 lg:p-8 shadow-xl">
        {connections.map((item, idx) => {
          const isHovered = hoverIdx === idx;
          return (
            <motion.div 
              key={idx}
              variants={slideRow}
              onMouseEnter={() => setHoverIdx(idx)}
              onMouseLeave={() => setHoverIdx(null)}
              className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-transparent hover:border-[#253141] hover:bg-[#141B23] transition-colors duration-300 group cursor-default"
            >
              {/* Connection Vector */}
              <div className="flex items-center gap-3 md:w-[50%] shrink-0">
                <div className={`px-4 py-2 rounded-lg font-bold text-sm tracking-wide transition-all duration-300 ${isHovered ? 'bg-[#38bdf8]/20 text-[#38bdf8] shadow-[0_0_15px_rgba(56,189,248,0.2)]' : 'bg-[#1A232E] text-[#D1D5DB]'}`}>
                  {item.from}
                </div>
                
                <div className="flex-1 px-4 relative overflow-hidden flex items-center h-[20px]">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 0.5, delay: 0.2 + (idx * 0.1) }}
                    className="h-px bg-gradient-to-r from-[#38bdf8] via-[#a855f7] to-[#F97316] absolute left-0 right-4" 
                  />
                  <motion.div 
                     initial={{ x: -20, opacity: 0 }}
                     whileInView={{ x: 0, opacity: 1 }}
                     transition={{ duration: 0.3, delay: 0.4 + (idx * 0.1) }}
                     animate={isHovered ? { x: 5 } : { x: 0 }}
                     className="absolute right-0"
                  >
                     <ArrowRight className={`w-4 h-4 transition-colors ${isHovered ? 'text-[#F97316]' : 'text-[#6B7280]'}`} />
                  </motion.div>
                </div>

                <div className={`px-4 py-2 rounded-lg font-bold text-sm tracking-wide transition-all duration-300 whitespace-nowrap ${isHovered ? 'bg-[#F97316]/20 text-[#F97316] shadow-[0_0_15px_rgba(249,115,22,0.2)]' : 'bg-[#1A232E] text-[#D1D5DB]'}`}>
                  {item.to}
                </div>
              </div>

              {/* Relationship Label */}
              <div className="md:w-[50%] pl-2 md:pl-6 border-l-2 border-transparent md:group-hover:border-[#a855f7]/30 transition-colors duration-300">
                <p className={`text-sm leading-relaxed transition-colors duration-300 ${isHovered ? 'text-white' : 'text-[#9CA3AF]'}`}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

    </motion.section>
  );
}
