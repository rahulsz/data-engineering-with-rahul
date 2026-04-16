"use client";

import { motion } from "framer-motion";
import { slideUp, staggerContainer } from "@/animations/variants";

export default function HeroSection() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center text-center max-w-4xl mx-auto z-10 relative"
    >
      <motion.h1 
        variants={slideUp}
        className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-4"
      >
        Master Data Engineering
      </motion.h1>
      <motion.p 
        variants={slideUp}
        className="text-xl md:text-2xl text-zinc-300 font-medium mb-12"
      >
        15 weeks. Real pipelines. Zero fluff.
      </motion.p>

      <motion.div variants={slideUp} className="flex flex-wrap justify-center gap-6 mb-12">
        {[
          { label: "Weeks", value: "15" },
          { label: "Phases", value: "5" },
          { label: "Concepts", value: "100+" }
        ].map((stat, i) => (
          <div key={i} className="bg-white/10 backdrop-blur-md rounded-xl p-6 min-w-[140px] border border-white/10">
            <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
            <div className="text-sm font-medium text-brand-200 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
