"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth, SignInButton } from "@clerk/nextjs";
import { ArrowRight, ChevronDown, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/cn";
import ShaderBackground from "@/components/animations/ShaderBackground";

import { Variants } from "framer-motion";

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
  initial: {},
  animate: { transition: { staggerChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function HeroSection() {
  const { userId, isLoaded } = useAuth();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-6 lg:px-12 overflow-hidden bg-surface-deep">
      {/* WebGL Background Layer */}
      <div className="absolute inset-0 z-0">
        <ShaderBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-surface-deep/20 via-transparent to-surface-deep"></div>
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 w-full max-w-[600px] text-center lg:max-w-7xl flex flex-col lg:flex-row items-center gap-12 lg:text-left mt-8 lg:mt-0">
        {/* Headline & CTAs */}
        <div className="flex-1 space-y-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-4"
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 justify-center lg:justify-start mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-electric-cyan/30 bg-electric-cyan/5 text-electric-cyan font-mono text-xs tracking-widest uppercase">
                COHORT 2025 · 15 WEEKS
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="font-display font-bold text-[52px] lg:text-[72px] text-white leading-[1.05]">
              Master Data <br />
              Engineering. <span className="text-electric-cyan drop-shadow-[0_0_15px_rgba(6,182,212,0.4)]">For Free.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} className="font-ui text-lg text-terminal-gray max-w-[500px] mx-auto lg:mx-0 leading-relaxed mt-6">
              Interactive SQL playgrounds, animated visualizers, and real-world projects — everything you need to build scalable data pipelines.
            </motion.p>
          </motion.div>
          
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start"
          >
            {!isLoaded ? null : !userId ? (
              <SignInButton mode="modal">
                <button className="bg-electric-cyan text-black px-8 py-4 rounded-xl font-bold text-[15px] hover:brightness-110 transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.2)] active:scale-95 cursor-pointer">
                  Start Learning Free
                </button>
              </SignInButton>
            ) : (
              <Link
                href="/dashboard"
                className="bg-electric-cyan text-black px-8 py-4 rounded-xl font-bold text-[15px] hover:brightness-110 transition-all duration-200 shadow-[0_0_20px_rgba(6,182,212,0.2)] active:scale-95 text-center"
              >
                Go to Dashboard
              </Link>
            )}
            
            <Link
              href="#curriculum"
              className="border border-stroke-subtle bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-medium text-[15px] backdrop-blur-sm transition-all duration-200 flex items-center justify-center gap-2 active:scale-95"
            >
              Explore Curriculum
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
          
          {/* Trust Badges */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="pt-8 flex flex-wrap justify-center lg:justify-start gap-6 opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-500"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-electric-cyan" />
              <span className="font-mono text-xs text-terminal-gray">60+ Topics</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-electric-cyan" />
              <span className="font-mono text-xs text-terminal-gray">Hands-on SQL</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-electric-cyan" />
              <span className="font-mono text-xs text-terminal-gray">Real-world Projects</span>
            </div>
          </motion.div>
        </div>
        
        {/* Glassmorphic IDE Mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 w-full max-w-[540px] animate-float lg:ml-auto"
          style={{ animation: "float 6s ease-in-out infinite" }}
        >
          <div className="rounded-xl overflow-hidden shadow-2xl bg-surface-deep/40 backdrop-blur-xl border border-stroke-subtle shadow-[0_0_30px_rgba(6,182,212,0.1)] relative group">
            {/* Window Header */}
            <div className="bg-surface-container/50 px-4 py-3 flex items-center justify-between border-b border-stroke-subtle">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-error opacity-50" />
                <div className="w-3 h-3 rounded-full bg-secondary-fixed opacity-50" />
                <div className="w-3 h-3 rounded-full bg-green-500 opacity-50" />
              </div>
              <div className="text-terminal-gray font-mono text-[11px] flex items-center gap-2">
                pipeline_etl.py
              </div>
              <div className="w-8" />
            </div>
            
            {/* Code Content */}
            <div className="p-6 font-mono text-[13px] overflow-x-auto leading-relaxed">
              <pre>
                <span className="text-electric-cyan">from</span> pyspark.sql <span className="text-electric-cyan">import</span> SparkSession
                <br />
                <span className="text-electric-cyan">from</span> pyspark.sql.functions <span className="text-electric-cyan">import</span> col, to_date
                <br />
                <br />
                <span className="text-terminal-gray"># Initialize ETL Pipeline</span>
                <br />
                <span className="text-white">spark = SparkSession.builder \\</span>
                <br />
                <span className="text-white">    .appName(</span><span className="text-secondary-fixed">"SupplyChainETL"</span><span className="text-white">) \\</span>
                <br />
                <span className="text-white">    .getOrCreate()</span>
                <br />
                <br />
                <span className="text-white">df = spark.read.format(</span><span className="text-secondary-fixed">"delta"</span><span className="text-white">) \\</span>
                <br />
                <span className="text-white">    .load(</span><span className="text-secondary-fixed">"/mnt/bronze/orders"</span><span className="text-white">)</span>
                <br />
                <br />
                <span className="text-white">silver_df = df \\</span>
                <br />
                <span className="text-white">    .filter(col(</span><span className="text-secondary-fixed">"status"</span><span className="text-white">) == </span><span className="text-secondary-fixed">"COMPLETE"</span><span className="text-white">) \\</span>
                <br />
                <span className="text-white">    .dropDuplicates([</span><span className="text-secondary-fixed">"order_id"</span><span className="text-white">])</span>
              </pre>
            </div>
            
            {/* Bottom Status Bar */}
            <div className="bg-surface-container-high/40 px-4 py-2.5 flex items-center justify-between border-t border-stroke-subtle">
              <div className="flex items-center gap-4 text-terminal-gray text-[10px] font-mono">
                <span className="text-electric-cyan flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Success
                </span>
                <span>Ln 12, Col 24</span>
                <span>UTF-8</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-electric-cyan animate-pulse" />
                <span className="text-terminal-gray text-[10px] font-mono">PySpark</span>
              </div>
            </div>
          </div>
          
          {/* Floating Detail Card */}
          <div className="absolute -bottom-6 -left-6 bg-surface-deep/60 backdrop-blur-md p-4 rounded-xl border border-stroke-subtle hidden sm:block shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-electric-cyan/10 flex items-center justify-center border border-electric-cyan/20">
                <svg className="w-5 h-5 text-electric-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-bold">Pipeline Optimized</p>
                <p className="text-terminal-gray text-[11px] mt-0.5">Execution Time: 0.4s</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 cursor-pointer hover:opacity-100 transition-opacity"
        onClick={() => document.getElementById('social-proof')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-terminal-gray">Scroll to explore</span>
        <ChevronDown className="w-4 h-4 text-electric-cyan animate-bounce" />
      </motion.div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
      `}} />
    </section>
  );
}
