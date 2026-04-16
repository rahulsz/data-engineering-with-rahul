"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useAuth, UserButton, SignInButton } from "@clerk/nextjs";
import {
  Code2, ArrowRight, Compass, Database, GitBranch, BarChart3, Rocket,
  Search, FileText, CheckCircle2, Zap, Package, Flame, Check
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useProgressStore } from "@/store/progressStore";
import CommandPalette from "@/components/search/CommandPalette";

// ─── SYNTAX HIGHLIGHTER (pure function, no React) ───

function highlightLine(line: string): string {
  if (line.startsWith("# ") || line.startsWith("-- ")) {
    return `<span class="text-[#8B949E]">${escapeHtml(line)}</span>`;
  }

  // Tokenize strings first to protect them from keyword replacement
  let counter = 0;
  const tokens: Record<string, string> = {};

  let result = line.replace(/(["'].*?["'])/g, (m) => {
    const tok = `___TOK${counter++}___`;
    tokens[tok] = `<span class="text-[#A5D6FF]">${escapeHtml(m)}</span>`;
    return tok;
  });

  // Keywords
  result = result.replace(
    /\b(from|import|def|return|class|if|else|while|for|in|as)\b/g,
    '<span class="text-[#FF7B72]">$1</span>'
  );

  // SQL / DAX keywords
  result = result.replace(
    /\b(SELECT|FROM|WHERE|SUM|OVER|PARTITION|BY|ORDER|ROWS|BETWEEN|PRECEDING|AND|CURRENT|ROW|RANK|DESC|AS|DIVIDE|CALCULATE|AVERAGEX|CALENDAR|MIN|MAX)\b/gi,
    '<span class="text-[#FF7B72]">$&</span>'
  );

  // Numbers
  result = result.replace(
    /\b(\d+)\b/g,
    '<span class="text-[#F8C555]">$1</span>'
  );

  // Builtins
  result = result.replace(
    /\b(col|to_date|dropDuplicates|getOrCreate|SparkSession|builder|read|format|load|filter|withColumn|write|mode|save)\b/g,
    '<span class="text-[#D2A8FF]">$1</span>'
  );

  // Restore protected string tokens
  for (const [tok, html] of Object.entries(tokens)) {
    result = result.replace(tok, html);
  }

  return `<span class="text-[#E6EDF3]">${result}</span>`;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// ─── TERMINAL SNIPPETS (static data) ───

const terminalSnippets = [
  {
    title: "pipeline.py — data-eng-notes",
    code: `# Week 5 · PySpark ETL Pipeline
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, to_date

spark = SparkSession.builder \\
    .appName("SupplyChainETL") \\
    .getOrCreate()

df = spark.read.format("delta") \\
    .load("/mnt/bronze/orders")

silver_df = df \\
    .filter(col("status") == "COMPLETE") \\
    .withColumn("order_date", to_date(col("created_at"))) \\
    .dropDuplicates(["order_id"])

silver_df.write.format("delta") \\
    .mode("overwrite") \\
    .save("/mnt/silver/orders_clean")`
  },
  {
    title: "analysis.sql — data-eng-notes",
    code: `-- Week 3 · Advanced SQL: Window Functions
SELECT
    product_id,
    order_date,
    quantity,
    SUM(quantity) OVER (
        PARTITION BY product_id
        ORDER BY order_date
        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
    ) AS rolling_7d_qty,
    RANK() OVER (
        PARTITION BY category
        ORDER BY revenue DESC
    ) AS revenue_rank
FROM supply_chain.fact_orders
WHERE order_date >= '2024-01-01';`
  },
  {
    title: "measures.dax — data-eng-notes",
    code: `-- Week 10 · Power BI: DAX Measures
Inventory Turns = 
DIVIDE(
    [Total COGS],
    CALCULATE(
        AVERAGEX(
            CALENDAR(MIN(Dates[Date]), MAX(Dates[Date])),
            [Avg Inventory Value]
        )
    ),
    0
)

Fill Rate % = 
DIVIDE([Orders Fulfilled], [Orders Total], 0)`
  }
];

// Pre-compute highlighted HTML at module level — avoids SSR/client mismatch
const precomputedSnippets = terminalSnippets.map((s) => ({
  title: s.title,
  lines: s.code.split("\n").map((line) => highlightLine(line)),
}));

// ─── ANIMATION VARIANTS ───

const navVariant: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

const heroWordVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

// ─── TERMINAL BLOCK ───

function TerminalBlock() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % precomputedSnippets.length), 4000);
    return () => clearInterval(id);
  }, []);

  const snippet = precomputedSnippets[active];

  return (
    <div className="flex flex-col w-full h-full lg:max-w-xl self-center justify-self-center lg:justify-self-end mt-12 lg:mt-0 relative group transform-gpu">
      <div className="absolute -inset-0.5 bg-home-glow rounded-[14px] blur-xl opacity-60 group-hover:opacity-100 transition duration-1000 will-change-opacity" />
      <div className="relative bg-home-surface border border-home-border rounded-xl shadow-2xl overflow-hidden flex flex-col hover:border-home-primary/50 transition-colors duration-500 min-h-[420px] transform-gpu">

        {/* Chrome bar */}
        <div className="h-10 border-b border-home-border flex items-center px-4 bg-[#11151A] shrink-0">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          <p className="flex-1 text-center text-xs font-mono text-home-text-secondary">
            {snippet.title}
          </p>
        </div>

        {/* Code body */}
        <div className="p-6 overflow-hidden flex-1 relative font-mono text-sm leading-relaxed">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 p-6 flex flex-col"
            >
              {snippet.lines.map((html, i) => (
                <div
                  key={i}
                  className="min-h-[1.5em]"
                  suppressHydrationWarning
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Stat pills */}
      <div className="flex justify-center flex-wrap gap-3 mt-6">
        <div className="flex items-center gap-2 px-3 py-1.5 border border-home-border bg-home-surface rounded-full text-xs font-mono text-home-text-secondary">
          <Zap className="text-home-primary w-3 h-3" />
          <span>15 Weeks</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 border border-home-border bg-home-surface rounded-full text-xs font-mono text-home-text-secondary">
          <Package className="text-home-primary w-3 h-3" />
          <span>4 Phases</span>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 border border-home-border bg-home-surface rounded-full text-xs font-mono text-home-text-secondary">
          <Flame className="text-home-primary w-3 h-3" />
          <span>60+ Topics</span>
        </div>
      </div>
    </div>
  );
}

// ─── PHASE OVERVIEW ───

const curriculumPhases = [
  { id: 0, title: "Orientation", weeks: "1 week", icon: Compass, accent: "border-zinc-500", glow: "text-zinc-400", topics: ["Environment Setup", "VS Code Mastery", "Git Basics"] },
  { id: 1, title: "DE Foundations", weeks: "Weeks 1–5", icon: Database, accent: "border-home-primary", glow: "text-home-primary", topics: ["Python Data Structures", "SQL Deep Dive", "Cloud Warehousing"] },
  { id: 2, title: "Advanced Engineering", weeks: "Weeks 6–8", icon: GitBranch, accent: "border-[#58A6FF]", glow: "text-[#58A6FF]", topics: ["PySpark & Databricks", "Delta Lake", "Airflow & Orchestration"] },
  { id: 3, title: "Data Analytics", weeks: "Weeks 9–11", icon: BarChart3, accent: "border-[#BC8CFF]", glow: "text-[#BC8CFF]", topics: ["Power BI Models", "DAX Formulas", "Visualization Patterns"] },
  { id: 4, title: "Capstone + AI", weeks: "Weeks 12–15", icon: Rocket, accent: "border-[#3FB950]", glow: "text-[#3FB950]", topics: ["Supply Chain Build", "OpenAI Integrations", "Resume Prep"] },
];

function PhaseOverview() {
  return (
    <section id="curriculum" className="w-full max-w-7xl mx-auto py-32 px-6">
      <div className="flex flex-col items-center mb-16 text-center">
        <p className="text-home-text-secondary font-mono tracking-widest text-sm mb-4">STRUCTURED LEARNING PATH</p>
        <h2 className="font-display text-4xl lg:text-5xl text-home-text-primary font-bold">Four Phases. One Pipeline.</h2>
      </div>

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="flex lg:grid lg:grid-cols-5 flex-nowrap overflow-x-auto lg:overflow-visible pb-12 lg:pb-0 gap-6 snap-x snap-mandatory"
      >
        {curriculumPhases.map((phase) => {
          const Icon = phase.icon;
          return (
            <motion.div
              key={phase.id}
              variants={fadeUp}
              className={cn(
                "snap-center shrink-0 w-[280px] lg:w-auto",
                "bg-home-surface border border-home-border p-6 rounded-xl flex flex-col relative group transition-all duration-300",
                "hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.15)]"
              )}
            >
              <div className="flex items-start justify-between mb-8">
                <span className="font-mono text-sm text-home-text-secondary">PHASE {phase.id}</span>
                <Icon className={cn("w-10 h-10 transition-colors", phase.glow)} />
              </div>

              <h3 className="font-display text-xl font-bold text-home-text-primary mb-2 group-hover:text-white transition-colors">{phase.title}</h3>
              <p className="font-mono text-xs text-home-text-secondary mb-6">{phase.weeks}</p>

              <ul className="mb-8 space-y-3 flex-1">
                {phase.topics.map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#8B949E]">
                    <span className="text-home-text-primary/30 mt-0.5">•</span>
                    {t}
                  </li>
                ))}
              </ul>

              <Link href="/curriculum" className={cn(
                "group/link flex items-center gap-2 text-sm font-medium transition-colors mt-auto",
                phase.glow
              )}>
                Explore Phase
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-rotate-12 transition-transform" />
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

// ─── WEEK PROGRESS STRIP ───

function WeekProgressStrip() {
  const { completedWeeks } = useProgressStore();
  const { userId, isLoaded } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalWeeks = 16;
  const timelineNodes = useMemo(() => Array.from({ length: totalWeeks }, (_, i) => i), []);
  const safeCompletedWeeks = mounted ? completedWeeks : [];
  const maxCompleted = Math.max(-1, ...safeCompletedWeeks);
  const currentWeek = maxCompleted + 1;

  return (
    <section className="w-full max-w-5xl mx-auto py-24 px-6 relative">
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[800px] h-full bg-home-glow opacity-30 blur-3xl rounded-full" />
      </div>

      <div className="relative text-center mb-12">
        <h2 className="font-display text-3xl font-bold text-home-text-primary">Your Learning Journey</h2>
      </div>

      <div className="relative bg-home-surface border border-home-border p-8 rounded-2xl overflow-hidden">

        {mounted && !userId && (
          <div className="absolute inset-0 z-10 backdrop-blur-md bg-home-bg/40 flex flex-col items-center justify-center p-6 text-center border border-home-border rounded-2xl">
            <Compass className="w-8 h-8 text-home-text-secondary mb-4" />
            <p className="font-display text-lg mb-4 text-home-text-primary">Ready to track your progress?</p>
            <SignInButton mode="modal">
              <button className="px-6 py-2.5 bg-white text-home-bg font-medium rounded-lg hover:bg-zinc-200 transition-colors">
                Sign in to track progress
              </button>
            </SignInButton>
          </div>
        )}

        <div className="relative w-full overflow-x-auto pb-6 scrollbar-hide shrink-0">
          <div className="flex items-center justify-between min-w-[800px] relative px-4">
            <div className="absolute top-1/2 left-8 right-8 h-[2px] bg-home-border -translate-y-1/2 z-0" />
            <div
              className="absolute top-1/2 left-8 h-[2px] bg-home-primary -translate-y-1/2 z-0 transition-all duration-1000 ease-out"
              style={{ width: `${Math.max(0, (maxCompleted / (totalWeeks - 1)) * 100 - 4)}%` }}
            />

            {timelineNodes.map((weekItem) => {
              const isCompleted = safeCompletedWeeks.includes(weekItem);
              const isCurrent = weekItem === currentWeek;

              return (
                <div key={weekItem} className="relative z-10 flex flex-col items-center group">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono transition-all duration-500",
                    isCompleted ? "bg-home-primary text-white shadow-[0_0_15px_rgba(249,115,22,0.5)] border border-home-primary" :
                    isCurrent ? "bg-home-bg border-2 border-home-primary text-home-primary ring-4 ring-home-glow animate-pulse" :
                    "bg-[#11151A] border border-home-border text-home-text-secondary"
                  )}>
                    {isCompleted ? <Check className="w-4 h-4" /> : weekItem}
                  </div>
                  <div className="absolute -bottom-8 whitespace-nowrap text-[10px] font-mono text-home-text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                    Week {weekItem}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-4 border-t border-home-border/50 pt-4">
          <p className="font-mono text-xs text-home-text-secondary">
            Week {safeCompletedWeeks.length} of {totalWeeks} complete <span className="text-home-primary mx-2">·</span> Est. {Math.max(0, totalWeeks - safeCompletedWeeks.length)} weeks remaining
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── FEATURE HIGHLIGHTS ───

function FeatureHighlights() {
  return (
    <section className="w-full max-w-7xl mx-auto py-24 px-6 relative">
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6">

        <motion.div variants={scaleUp} className="bg-home-surface border border-home-border rounded-2xl p-8 relative overflow-hidden group hover:border-home-primary/50 transition-colors">
          <div className="w-12 h-12 rounded-full bg-home-primary/10 flex items-center justify-center mb-6">
            <Search className="w-6 h-6 text-home-primary" />
          </div>
          <h3 className="font-display text-2xl font-bold text-home-text-primary mb-3">Fuzzy Search</h3>
          <p className="font-ui text-home-text-secondary leading-relaxed">
            Instantly find any concept, code snippet, or week across all 60+ topics. Powered by an optimized Fuse.js command palette.
          </p>
        </motion.div>

        <motion.div variants={scaleUp} className="bg-home-surface border border-home-border rounded-2xl p-8 relative overflow-hidden group hover:border-[#58A6FF]/50 transition-colors">
          <div className="w-12 h-12 rounded-full bg-[#58A6FF]/10 flex items-center justify-center mb-6">
            <FileText className="w-6 h-6 text-[#58A6FF]" />
          </div>
          <h3 className="font-display text-2xl font-bold text-home-text-primary mb-3">MDX-Powered Notes</h3>
          <p className="font-ui text-home-text-secondary leading-relaxed">
            Every week rendered from MDX with full syntax highlighting, architectural callouts, and embedded concept diagrams.
          </p>
        </motion.div>

        <motion.div variants={scaleUp} className="bg-home-surface border border-home-border rounded-2xl p-8 relative overflow-hidden group hover:border-[#3FB950]/50 transition-colors">
          <div className="w-12 h-12 rounded-full bg-[#3FB950]/10 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-6 h-6 text-[#3FB950]" />
          </div>
          <h3 className="font-display text-2xl font-bold text-home-text-primary mb-3">Progress Tracking</h3>
          <p className="font-ui text-home-text-secondary leading-relaxed">
            Mark weeks complete, track your streak, and see your mastery visually map across all phases backed by robust state.
          </p>
        </motion.div>

      </motion.div>
    </section>
  );
}

// ─── FOOTER ───

function Footer() {
  return (
    <footer className="w-full bg-[#05080A] border-t border-home-primary/20 pt-16 pb-8 px-6 mt-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-home-primary to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 mb-16">
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-6 h-6 text-home-primary" />
            <span className="font-display font-bold text-xl text-white">DE Notes</span>
          </div>
          <p className="font-ui text-home-text-secondary max-w-xs text-sm">
            A premium interactive knowledge base to master modern Data Engineering pipelines and analytics.
          </p>
        </div>

        <div className="col-span-1">
          <h4 className="font-mono text-xs text-white mb-6 tracking-widest">CURRICULUM</h4>
          <ul className="space-y-3 font-ui text-sm text-home-text-secondary">
            <li><Link href="/curriculum" className="hover:text-home-primary transition-colors">Phase 1: Foundations</Link></li>
            <li><Link href="/curriculum" className="hover:text-home-primary transition-colors">Phase 2: Spark &amp; Delta</Link></li>
            <li><Link href="/curriculum" className="hover:text-home-primary transition-colors">Phase 3: DAX &amp; Analytics</Link></li>
            <li><Link href="/curriculum" className="hover:text-home-primary transition-colors">Phase 4: Copilot &amp; Capstone</Link></li>
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="font-mono text-xs text-white mb-6 tracking-widest">LEGAL</h4>
          <ul className="space-y-3 font-ui text-sm text-home-text-secondary">
            <li><Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub Repository</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-home-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-mono text-xs text-home-text-secondary">Built for data engineers</p>
        <p className="font-mono text-xs text-home-text-secondary">© 2025 Data Engineering Notes</p>
      </div>
    </footer>
  );
}

// ─── MAIN PAGE ───

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { userId, isLoaded } = useAuth();

  const h1Title = ["Master", "Data"];
  const h1Sub = ["Engineering."];

  return (
    <main className="relative min-h-screen bg-home-bg overflow-x-hidden selection:bg-home-primary/30 text-home-text-primary pb-0">

      {/* Background atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden transform-gpu">
        <div className="absolute inset-0 bg-noise opacity-[0.04]" />
        <div
          className="absolute inset-0 opacity-[0.03] animate-drift"
          style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-home-glow rounded-full blur-[120px] transform-gpu" />
        <div className="absolute top-[5%] right-[-10%] w-[500px] h-[500px] bg-[#58A6FF]/[0.08] rounded-full blur-[100px] transform-gpu" />
        <div className="absolute top-[40%] left-[45%] w-[300px] h-[300px] bg-[#BC8CFF]/[0.05] rounded-full blur-[90px] transform-gpu" />
      </div>

      {/* Navbar */}
      <motion.nav
        variants={navVariant}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 w-full z-50 h-16 backdrop-blur-md bg-home-bg/80 border-b border-home-border px-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-home-primary" />
          <span className="font-display font-bold text-lg text-white tracking-wide">DE Notes</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-ui text-home-text-secondary">
          <Link href="/curriculum" className="hover:text-white transition-colors">Curriculum</Link>
          <Link href="#curriculum" className="hover:text-white transition-colors">Phases</Link>
          <button onClick={() => setIsSearchOpen(true)} className="flex items-center gap-2 hover:text-white transition-colors">
            Search
            <kbd className="px-1.5 py-0.5 rounded bg-home-border text-[10px] font-mono text-home-text-secondary border border-zinc-700">⌘K</kbd>
          </button>
        </div>

        <div className="flex items-center gap-4">
          {!isLoaded ? null : !userId ? (
            <>
              <SignInButton mode="modal">
                <button className="text-sm font-ui text-home-text-secondary hover:text-white transition-colors">Sign In</button>
              </SignInButton>
              <Link href="/curriculum" className="text-sm font-medium bg-home-primary text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                Start Learning &rarr;
              </Link>
            </>
          ) : (
            <>
              <Link href="/curriculum" className="text-sm font-medium bg-home-surface border border-home-border text-white px-4 py-1.5 rounded-md hover:border-home-primary transition-colors mr-2">
                Dashboard &rarr;
              </Link>
              <UserButton appearance={{ elements: { userButtonAvatarBox: "w-8 h-8" } }} />
            </>
          )}
        </div>
      </motion.nav>

      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Hero */}
      <section className="relative z-10 w-full max-w-7xl mx-auto pt-40 pb-20 px-6 min-h-screen flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          <div className="flex flex-col items-start max-w-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#3FB950] animate-[ping_2s_infinite]" />
              <p className="font-mono text-xs tracking-[0.2em] text-home-primary">
                [ COHORT 2025 · 15 WEEKS ]
              </p>
            </div>

            <h1 className="font-display font-[800] text-[48px] lg:text-[72px] leading-[1.05] text-home-text-primary mb-6 flex flex-col items-start overflow-hidden">
              <div className="flex flex-wrap gap-x-4">
                {h1Title.map((word, i) => (
                  <motion.span
                    key={word}
                    variants={heroWordVariant}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-4">
                {h1Sub.map((word, i) => (
                  <motion.span
                    key={word}
                    variants={heroWordVariant}
                    custom={h1Title.length + i}
                    initial="hidden"
                    animate="visible"
                  >
                    {word.includes(".") ? (
                      <span>
                        {word.replace(".", "")}
                        <span className="text-home-primary">.</span>
                      </span>
                    ) : word}
                  </motion.span>
                ))}
              </div>
            </h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-ui text-lg text-home-text-secondary max-w-md mb-10 leading-relaxed"
            >
              A structured 15-week curriculum covering Python, SQL, PySpark, Databricks, dbt, Azure, and Power BI — with interactive notes, progress tracking, and real supply chain capstone projects.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row items-center gap-5 w-full"
            >
              {!isLoaded ? null : !userId ? (
                <SignInButton mode="modal">
                  <button className="w-full sm:w-auto px-8 py-3.5 bg-home-primary hover:bg-orange-500 hover:scale-105 active:scale-95 transition-all text-white font-medium rounded-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                    Begin Week 0 <ArrowRight className="w-4 h-4" />
                  </button>
                </SignInButton>
              ) : (
                <Link href="/curriculum" className="w-full sm:w-auto px-8 py-3.5 bg-home-primary hover:bg-orange-500 hover:scale-105 active:scale-95 transition-all text-white font-medium rounded-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                  Resume Pipeline <ArrowRight className="w-4 h-4" />
                </Link>
              )}

              <Link href="#curriculum" className="w-full sm:w-auto px-8 py-3.5 bg-transparent border border-home-border text-home-text-primary font-medium rounded-lg hover:border-home-text-secondary transition-colors text-center">
                View Curriculum
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8 font-mono text-xs text-home-text-secondary flex items-center gap-2"
            >
              15 weeks <span className="text-home-primary">·</span> 4 phases <span className="text-home-primary">·</span> 60+ topics covered
            </motion.div>
          </div>

          <TerminalBlock />

        </div>
      </section>

      <PhaseOverview />
      <WeekProgressStrip />
      <FeatureHighlights />
      <Footer />

    </main>
  );
}
