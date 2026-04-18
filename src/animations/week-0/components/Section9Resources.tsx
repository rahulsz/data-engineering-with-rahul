"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, FileText, Crosshair, Database } from "lucide-react";

export default function Section9Resources() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const slideUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: 0.4 } }
  };

  const staggerCategories = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const categories = [
    {
      id: "docs",
      icon: <FileText className="w-5 h-5 text-[#38bdf8]" />,
      title: "OFFICIAL DOCS",
      colorClass: "hover:border-[#38bdf8]/50 focus-within:border-[#38bdf8]/50",
      accent: "text-[#38bdf8]",
      links: [
        { title: "Databricks Getting Started", url: "https://docs.databricks.com/getting-started", desc: "Read: \"Quickstart: Run your first ETL workload\" (15 min)" },
        { title: "Delta Lake Documentation", url: "https://delta.io/learn", desc: "Skim: \"What is Delta Lake?\" and \"Quickstart\" pages" },
        { title: "Git Reference Manual", url: "https://git-scm.com/docs", desc: "Bookmark: git commit, git branch, git push pages" }
      ]
    },
    {
      id: "practice",
      icon: <Crosshair className="w-5 h-5 text-[#F97316]" />,
      title: "PRACTICE PLATFORMS",
      colorClass: "hover:border-[#F97316]/50 focus-within:border-[#F97316]/50",
      accent: "text-[#F97316]",
      links: [
        { title: "Databricks Academy", url: "https://academy.databricks.com", desc: "\"Data Engineering with Databricks\" learning path (Free)" },
        { title: "GitHub Learning Lab", url: "https://skills.github.com", desc: "\"Introduction to GitHub\" — 1 hour, eliminates Git confusion" }
      ]
    },
    {
      id: "datasets",
      icon: <Database className="w-5 h-5 text-[#22c55e]" />,
      title: "DATASETS FOR CAPSTONE",
      colorClass: "hover:border-[#22c55e]/50 focus-within:border-[#22c55e]/50",
      accent: "text-[#22c55e]",
      links: [
        { title: "UCI Online Retail Dataset", url: "https://archive.ics.uci.edu", desc: "500K real e-commerce transactions. Used as GlobalMart source." },
        { title: "Kaggle Supply Chain Dataset", url: "https://kaggle.com", desc: "Search: \"Supply Chain Analysis Kaggle\". Covers orders & shipping." }
      ]
    }
  ];

  return (
    <motion.section 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="w-full flex flex-col gap-10 mt-16 mb-24"
    >
      {/* Header */}
      <motion.div variants={slideUp} className="flex flex-col gap-2">
        <h3 className="text-[#9CA3AF] text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          <span className="text-xl">🔖</span> Resources
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">
          What to Read, Watch & Explore
        </h2>
      </motion.div>

      <motion.div variants={staggerCategories} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <motion.div 
            key={idx}
            variants={slideUp}
            className={`bg-[#141B23] border border-[#253141] rounded-2xl overflow-hidden flex flex-col transition-colors duration-300 ${cat.colorClass}`}
          >
            {/* Category Header */}
            <div className="p-5 border-b border-[#253141] bg-[#1A232E] flex items-center gap-3">
              {cat.icon}
              <h3 className={`font-bold tracking-widest text-sm uppercase ${cat.accent}`}>{cat.title}</h3>
            </div>

            {/* Links */}
            <div className="flex flex-col p-2">
              {cat.links.map((link, lIdx) => (
                <a 
                  key={lIdx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-1 p-4 rounded-xl hover:bg-[#1A232E] transition-all duration-300 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between z-10 w-full pr-4">
                    <span className="font-bold text-white group-hover:underline decoration-2 underline-offset-4 decoration-[#4B5563] group-hover:decoration-[currentcolor] transition-all">
                      {link.title}
                    </span>
                    <ExternalLink className="w-4 h-4 text-[#6B7280] group-hover:text-white transition-all transform group-hover:translate-x-1" />
                  </div>
                  <span className="text-xs text-[#9CA3AF] mt-1 pr-6">{link.desc}</span>
                  
                  {/* Hover bg line */}
                  <div className={`absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b opacity-0 group-hover:opacity-100 transition-opacity ${cat.id === 'docs' ? 'from-[#38bdf8] to-transparent' : cat.id === 'practice' ? 'from-[#F97316] to-transparent' : 'from-[#22c55e] to-transparent'}`} />
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
