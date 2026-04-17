"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useAuth, SignInButton, UserButton } from "@clerk/nextjs";
import {
  Code2, ArrowRight, Compass, Database, GitBranch, BarChart3, Rocket,
  Search, FileText, CheckCircle2, Check
} from "lucide-react";
import { cn } from "@/lib/cn";
import { useProgressStore } from "@/store/progressStore";
import CommandPalette from "@/components/search/CommandPalette";

// ─── EFFECTS ───
function BackgroundEffects() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden>
      {/* Animated grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(#ffffff 1px, transparent 1px),
            linear-gradient(90deg, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          animation: "gridPan 25s linear infinite",
        }}
      />

      {/* Orange orb — bottom left */}
      <div
        className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Cyan orb — top right */}
      <div
        className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Purple orb — center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(139,92,246,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Noise grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />
    </div>
  );
}

// ─── TERMINAL SNIPPETS ───
const SNIPPETS = [
  {
    label: "Week 5 · PySpark ETL",
    lang: "python",
    lines: [
      { type: "comment", text: "# Week 5 · PySpark ETL Pipeline" },
      { type: "keyword", text: "from ", rest: "pyspark.sql ", suffix: "import ", tail: "SparkSession" },
      { type: "keyword", text: "from ", rest: "pyspark.sql.functions ", suffix: "import ", tail: "col, to_date" },
      { type: "blank" },
      { type: "default", text: "spark = SparkSession.builder \\" },
      { type: "default", text: '    .appName("SupplyChainETL") \\' },
      { type: "default", text: "    .getOrCreate()" },
      { type: "blank" },
      { type: "default", text: 'df = spark.read.format("delta") \\' },
      { type: "default", text: '    .load("/mnt/bronze/orders")' },
      { type: "blank" },
      { type: "default", text: "silver_df = df \\" },
      { type: "default", text: '    .filter(col("status") == "COMPLETE") \\' },
      { type: "default", text: '    .withColumn("order_date", to_date(col("created_at"))) \\' },
      { type: "default", text: '    .dropDuplicates(["order_id"])' },
    ],
  },
  {
    label: "Week 3 · SQL Window Functions",
    lang: "sql",
    lines: [
      { type: "comment", text: "-- Week 3 · Advanced SQL: Window Functions" },
      { type: "keyword", text: "SELECT" },
      { type: "default", text: "    product_id," },
      { type: "default", text: "    order_date," },
      { type: "default", text: "    quantity," },
      { type: "function", text: "    SUM", suffix: "(quantity) ", keyword: "OVER", rest: " (" },
      { type: "default", text: "        PARTITION BY product_id" },
      { type: "default", text: "        ORDER BY order_date" },
      { type: "default", text: "        ROWS BETWEEN 6 PRECEDING AND CURRENT ROW" },
      { type: "default", text: "    ) AS rolling_7d_qty," },
      { type: "function", text: "    RANK", suffix: "() ", keyword: "OVER", rest: " (" },
      { type: "default", text: "        PARTITION BY category" },
      { type: "default", text: "        ORDER BY revenue DESC" },
      { type: "default", text: "    ) AS revenue_rank" },
      { type: "keyword", text: "FROM ", rest: "supply_chain.fact_orders" },
    ],
  },
  {
    label: "Week 10 · Power BI DAX",
    lang: "dax",
    lines: [
      { type: "comment", text: "-- Week 10 · Power BI: DAX Measures" },
      { type: "blank" },
      { type: "function", text: "Inventory Turns", suffix: " = " },
      { type: "function", text: "DIVIDE", suffix: "(" },
      { type: "default", text: "    [Total COGS]," },
      { type: "function", text: "    CALCULATE", suffix: "(" },
      { type: "function", text: "        AVERAGEX", suffix: "(" },
      { type: "function", text: "            CALENDAR", suffix: "(" },
      { type: "default", text: "                MIN(Dates[Date]), MAX(Dates[Date])" },
      { type: "default", text: "            )," },
      { type: "default", text: "            [Avg Inventory Value]" },
      { type: "default", text: "        )" },
      { type: "default", text: "    ), 0" },
      { type: "default", text: ")" },
    ],
  },
];

const COLOR = {
  comment:  "#8B949E",
  keyword:  "#FF7B72",
  function: "#D2A8FF",
  string:   "#A5D6FF",
  default:  "#E6EDF3",
  suffix:   "#E6EDF3",
  rest:     "#79C0FF",
  tail:     "#D2A8FF",
};

function Line({ line }: { line: any }) {
  if (line.type === "blank") return <div className="h-3" />;
  if (line.type === "comment")
    return <div><span style={{ color: COLOR.comment }}>{line.text}</span></div>;
  if (line.type === "keyword")
    return (
      <div>
        <span style={{ color: COLOR.keyword }}>{line.text}</span>
        {line.rest && <span style={{ color: COLOR.rest }}>{line.rest}</span>}
        {line.suffix && <span style={{ color: COLOR.keyword }}>{line.suffix}</span>}
        {line.tail && <span style={{ color: COLOR.tail }}>{line.tail}</span>}
      </div>
    );
  if (line.type === "function")
    return (
      <div>
        <span style={{ color: COLOR.function }}>{line.text}</span>
        {line.suffix && <span style={{ color: COLOR.suffix }}>{line.suffix}</span>}
        {line.keyword && <span style={{ color: COLOR.keyword }}>{line.keyword}</span>}
        {line.rest && <span style={{ color: COLOR.rest }}>{line.rest}</span>}
      </div>
    );
  return <div><span style={{ color: COLOR.default }}>{line.text}</span></div>;
}

// ─── ANIMATION VARIANTS ───
const navVariant: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};

const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
  initial: {},
  animate: { transition: { staggerChildren: 0.1 } },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
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

function TerminalCard() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % SNIPPETS.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  const snippet = SNIPPETS[active];

  return (
    <div className="flex flex-col w-full h-full lg:max-w-xl self-center justify-self-center lg:justify-self-end mt-12 lg:mt-0 relative group transform-gpu">
      <div className="absolute -inset-0.5 bg-home-glow rounded-[14px] blur-xl opacity-60 group-hover:opacity-100 transition duration-1000 will-change-opacity" />
      <div
        className={cn(
          "relative rounded-xl overflow-hidden shadow-2xl flex flex-col transform-gpu min-h-[420px]",
          "border border-[#21262D]",
          "bg-[#0D1117]",
          "shadow-[0_0_60px_rgba(0,0,0,0.6)]"
        )}
      >
        {/* Window chrome */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#21262D] shrink-0">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <span className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>
          <span className="text-xs text-[#8B949E] font-mono">
            pipeline.py — data-eng-notes
          </span>
          <div className="flex items-center gap-2">
            {SNIPPETS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                  i === active
                    ? "bg-[#F97316] scale-125"
                    : "bg-[#21262D] hover:bg-[#8B949E]"
                )}
              />
            ))}
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex border-b border-[#21262D] px-4 shrink-0">
          {SNIPPETS.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "text-[10px] font-mono px-3 py-2 border-b-2 transition-all duration-200 cursor-pointer",
                i === active
                  ? "border-[#F97316] text-[#F97316]"
                  : "border-transparent text-[#8B949E] hover:text-[#E6EDF3]"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Code body */}
        <div className="p-5 flex-1 w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="font-mono text-[12px] leading-[1.75] space-y-0"
            >
              {snippet.lines.map((line, i) => (
                <Line key={i} line={line} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer stat pills */}
        <div className="flex items-center gap-3 px-5 py-3 border-t border-[#21262D] shrink-0">
          {[
            { icon: "⚡", label: "15 Weeks" },
            { icon: "📦", label: "4 Phases" },
            { icon: "🔥", label: "60+ Topics" },
          ].map(({ icon, label }) => (
            <span
              key={label}
              className={cn(
                "flex items-center gap-1.5 text-[10px] font-mono",
                "px-2.5 py-1 rounded-md",
                "border border-[#21262D] text-[#8B949E]"
              )}
            >
              <span className="text-[#F97316]">{icon}</span>
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PHASE OVERVIEW ───
const PHASE_ACCENTS: Record<string, string> = {
  "PHASE 0": "#64748B",  // slate
  "PHASE 1": "#F97316",  // orange
  "PHASE 2": "#22D3EE",  // cyan
  "PHASE 3": "#A855F7",  // purple
  "PHASE 4": "#4ADE80",  // green
};

const curriculumPhases = [
  { id: 0, title: "Orientation", weeks: "1 week", phase: "PHASE 0", icon: Compass, accent: "border-slate-500", glow: "text-[#64748B]", topics: ["Environment Setup", "VS Code Mastery", "Git Basics"] },
  { id: 1, title: "DE Foundations", weeks: "Weeks 1–5", phase: "PHASE 1", icon: Database, accent: "border-home-primary", glow: "text-[#F97316]", topics: ["Python Data Structures", "SQL Deep Dive", "Cloud Warehousing"] },
  { id: 2, title: "Advanced Engineering", weeks: "Weeks 6–8", phase: "PHASE 2", icon: GitBranch, accent: "border-[#22D3EE]", glow: "text-[#22D3EE]", topics: ["Cloud Fundamentals (Azure/AWS/GCP)", "Data Modelling & Warehousing", "ETL/ELT + CI/CD Pipelines"] },
  { id: 3, title: "Data Analytics", weeks: "Weeks 9–11", phase: "PHASE 3", icon: BarChart3, accent: "border-[#A855F7]", glow: "text-[#A855F7]", topics: ["Power BI Models", "DAX Formulas", "Visualization Patterns"] },
  { id: 4, title: "Capstone + AI", weeks: "Weeks 12–15", phase: "PHASE 4", icon: Rocket, accent: "border-[#4ADE80]", glow: "text-[#4ADE80]", topics: ["Supply Chain Build", "OpenAI Integrations", "Resume Prep"] },
];

function PhaseOverview() {
  return (
    <section id="curriculum" className="w-full max-w-7xl mx-auto py-32 px-6 relative z-10">
      <div className="flex flex-col items-center mb-16 text-center">
        <p className="text-[#8B949E] font-mono tracking-widest text-sm mb-4">STRUCTURED LEARNING PATH</p>
        <h2 className="font-display text-4xl lg:text-5xl text-[#E6EDF3] font-bold">Four Phases. One Pipeline.</h2>
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
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative p-6 rounded-xl bg-[#0D1117] border border-[#21262D] transition-all duration-300 cursor-pointer snap-center shrink-0 w-[280px] lg:w-auto overflow-hidden flex flex-col"
              style={{
                "--phase-accent": PHASE_ACCENTS[phase.phase],
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = PHASE_ACCENTS[phase.phase] + "60";
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px ${PHASE_ACCENTS[phase.phase]}18`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#21262D";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-start justify-between mb-8 relative z-20">
                <span className="font-mono text-[10px] text-[#8B949E]">{phase.phase}</span>
                <Icon className={cn("w-8 h-8 transition-colors", phase.glow)} />
              </div>

              <h3 className="font-display text-lg font-bold text-[#E6EDF3] mb-2 group-hover:text-white transition-colors">{phase.title}</h3>
              <p className="font-mono text-xs text-[#8B949E] mb-6">{phase.weeks}</p>

              <ul className="mb-8 space-y-3 flex-1">
                {phase.topics.map((t, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#8B949E]">
                    <span className="text-home-primary/30 mt-0.5">•</span>
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
  const [mounted, setMounted] = useState(false);
  const { userId, isLoaded } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalWeeks = 15;
  const timelineNodes = useMemo(() => Array.from({ length: totalWeeks + 1 }, (_, i) => i), []); // Weeks 0-15 = 16 nodes
  const safeCompletedWeeks = mounted ? completedWeeks : [];
  const maxCompleted = Math.max(-1, ...safeCompletedWeeks);
  const currentWeek = maxCompleted + 1;

  return (
    <section className="w-full max-w-5xl mx-auto py-24 px-6 relative z-10">
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[800px] h-full bg-home-glow opacity-30 blur-3xl rounded-full" />
      </div>

      <div className="relative text-center mb-12">
        <h2 className="font-display text-3xl font-bold text-[#E6EDF3]">Your Learning Journey</h2>
      </div>

      <div className="relative bg-[#0D1117] border border-[#21262D] p-8 rounded-2xl overflow-hidden shadow-xl">

        {!isLoaded ? null : !userId && mounted ? (
            <div className="absolute inset-0 z-20 backdrop-blur-md bg-[#080C10]/60 flex flex-col items-center justify-center p-6 text-center border border-[#21262D] rounded-2xl">
              <Compass className="w-8 h-8 text-[#8B949E] mb-4" />
              <p className="font-display text-lg mb-4 text-[#E6EDF3]">Ready to track your progress?</p>
              <SignInButton mode="modal">
                <button className="px-6 py-2.5 bg-white text-[#080C10] font-medium rounded-lg hover:bg-zinc-200 transition-colors cursor-pointer">
                  Sign in to track progress
                </button>
              </SignInButton>
            </div>
        ) : null}

        <div className="relative w-full overflow-hidden pb-8 pt-4 shrink-0 group px-2 lg:px-4">
          <div className="flex items-center justify-between w-full relative">
            <div className="absolute top-1/2 left-5 right-5 lg:left-6 lg:right-6 h-[2px] bg-[#21262D] -translate-y-1/2 z-0" />
            <div
              className="absolute top-1/2 left-5 lg:left-6 h-[2px] bg-[#F97316] -translate-y-1/2 z-0 transition-all duration-1000 ease-out"
              style={{ width: `${Math.max(0, (maxCompleted / (timelineNodes.length - 1)) * 100 - 3)}%` }}
            />

            {timelineNodes.map((weekItem) => {
              const isCompleted = safeCompletedWeeks.includes(weekItem);
              const isCurrent = weekItem === currentWeek;

              return (
                <div key={weekItem} className="relative z-10 flex flex-col items-center group/node">
                  <div className={cn(
                    "w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center text-sm lg:text-base font-mono transition-all duration-500 relative z-10",
                    isCompleted ? "bg-[#F97316] text-[#080C10] shadow-[0_0_20px_rgba(249,115,22,0.7)] border border-[#F97316]/80" :
                    isCurrent ? "bg-[#0D1117] border-[3px] border-[#F97316] text-[#F97316] shadow-[0_0_25px_rgba(249,115,22,0.4)] animate-pulse" :
                    "bg-[#080C10] shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)] border border-[#21262D] text-[#8B949E]/50 group-hover/node:text-[#8B949E]"
                  )}>
                    {isCompleted ? <Check className="w-5 h-5 lg:w-6 lg:h-6 text-[#080C10]" /> : weekItem}
                  </div>
                  <div className="absolute -bottom-8 whitespace-nowrap text-[10px] lg:text-xs font-mono text-[#8B949E] opacity-0 group-hover/node:opacity-100 transition-opacity">
                    Week {weekItem}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-4 border-t border-[#21262D] pt-4">
          <p className="font-mono text-xs text-[#8B949E]">
            Week {safeCompletedWeeks.length} of {totalWeeks} complete <span className="text-[#F97316] mx-2">·</span> Est. {Math.max(0, totalWeeks - safeCompletedWeeks.length)} weeks remaining
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── FEATURE HIGHLIGHTS ───
const FEATURES = [
  {
    icon: Search,
    accent: "#F97316",
    title: "Fuzzy Search",
    body: "Instantly find any concept, code snippet, or week across all 60+ topics. Powered by an optimized Fuse.js command palette.",
    shortcut: "⌘K",
  },
  {
    icon: FileText,
    accent: "#22D3EE",
    title: "MDX-Powered Notes",
    body: "Every week rendered from MDX with full syntax highlighting, architectural callouts, and embedded concept diagrams.",
  },
  {
    icon: CheckCircle2,
    accent: "#4ADE80",
    title: "Progress Tracking",
    body: "Mark weeks complete, track your streak, and see your mastery visually map across all phases backed by robust state.",
  },
];

function FeatureHighlights() {
  return (
    <section className="w-full max-w-7xl mx-auto py-24 px-6 relative z-10">
      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6">

        {FEATURES.map((f) => (
          <motion.div
            key={f.title}
            variants={scaleUp}
            whileHover={{ y: -5 }}
            className={cn(
              "group relative p-6 rounded-xl",
              "bg-[#0D1117] border border-[#21262D]",
              "hover:border-[#21262D]/0",
              "transition-all duration-300",
              "before:absolute before:inset-0 before:rounded-xl before:p-[1px]",
              "before:bg-gradient-to-br before:from-transparent before:via-transparent",
              "before:to-transparent before:opacity-0",
              "hover:before:opacity-100",
              "overflow-hidden shadow-xl"
            )}
            style={{
              "--accent": f.accent,
            } as React.CSSProperties}
          >
            {/* Icon circle */}
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110"
              style={{ background: `${f.accent}18`, border: `1px solid ${f.accent}30` }}
            >
              <f.icon className="w-5 h-5" style={{ color: f.accent }} />
            </div>

            <h3 className="font-syne font-semibold text-[#E6EDF3] mb-2 flex items-center gap-2">
              {f.title}
              {f.shortcut && (
                <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-[#21262D] text-[#8B949E]">
                  {f.shortcut}
                </kbd>
              )}
            </h3>
            <p className="text-sm text-[#8B949E] leading-relaxed">{f.body}</p>

            {/* Hover glow accent */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `linear-gradient(90deg, transparent, ${f.accent}60, transparent)` }}
            />
          </motion.div>
        ))}

      </motion.div>
    </section>
  );
}

// ─── FOOTER ───
const footerCurriculumLinks = [
  { label: "Phase 0: Orientation",            href: "/curriculum" },
  { label: "Phase 1: DE Foundations",         href: "/curriculum" },
  { label: "Phase 2: Advanced Engineering",   href: "/curriculum" },
  { label: "Phase 3: Data Analytics",         href: "/curriculum" },
  { label: "Phase 4: Capstone + AI",          href: "/curriculum" },
];

function Footer() {
  return (
    <footer className="w-full bg-[#05080A] border-t border-[#F97316]/20 pt-16 pb-8 px-6 mt-12 relative overflow-hidden z-10">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-[#F97316] to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 mb-16">
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <Code2 className="w-6 h-6 text-[#F97316]" />
            <span className="font-display font-bold text-xl text-white">DE Notes</span>
          </div>
          <p className="font-ui text-[#8B949E] max-w-xs text-sm">
            A premium interactive knowledge base to master modern Data Engineering pipelines and analytics.
          </p>
        </div>

        <div className="col-span-1">
          <h4 className="font-mono text-xs text-white mb-6 tracking-widest">CURRICULUM</h4>
          <ul className="space-y-3 font-ui text-sm text-[#8B949E]">
            {footerCurriculumLinks.map(link => (
              <li key={link.label}>
                <Link href={link.href} className="hover:text-[#F97316] transition-colors">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1">
          <h4 className="font-mono text-xs text-white mb-6 tracking-widest">LEGAL</h4>
          <ul className="space-y-3 font-ui text-sm text-[#8B949E]">
            <li><Link href="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub Repository</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-[#21262D] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-mono text-xs text-[#8B949E]">Built for data engineers</p>
        <p className="font-mono text-xs text-[#8B949E]">© 2025 Data Engineering Notes</p>
      </div>
    </footer>
  );
}

// ─── MAIN PAGE ───
export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { userId, isLoaded } = useAuth();

  return (
    <main className="relative min-h-screen bg-[#080C10] overflow-x-hidden selection:bg-[#F97316]/30 text-[#E6EDF3] pb-0">

      {/* Background atmosphere */}
      <BackgroundEffects />

      {/* Navbar */}
      <motion.nav
        variants={navVariant}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 w-full z-50 h-16 backdrop-blur-md bg-[#080C10]/80 border-b border-[#21262D] px-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-[#F97316]" />
          <span className="font-display font-bold text-lg text-white tracking-wide">DE Notes</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-ui text-[#8B949E]">
          <Link href="/curriculum" className="hover:text-white transition-colors">Curriculum</Link>
          <Link href="#curriculum" className="hover:text-white transition-colors">Phases</Link>
          <Link href="/progress" className="hover:text-white transition-colors">Progress</Link>
          <button onClick={() => setIsSearchOpen(true)} className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
            Search
            <kbd className="px-1.5 py-0.5 rounded bg-[#21262D] text-[10px] font-mono text-[#8B949E] border border-zinc-700">⌘K</kbd>
          </button>
        </div>

        <div className="flex items-center gap-3">
          {!isLoaded ? null : !userId ? (
            <>
              <SignInButton mode="modal">
                <button
                  className={cn(
                    "text-sm text-[#8B949E] hover:text-[#E6EDF3] transition-colors duration-150",
                    "px-3 py-1.5 rounded-lg border border-[#21262D]",
                    "hover:border-[#F97316]/30 hover:bg-[#F97316]/5 cursor-pointer hidden sm:flex text-center items-center justify-center whitespace-nowrap"
                  )}
                >
                  Sign In
                </button>
              </SignInButton>
              <SignInButton mode="modal">
                <button
                  className={cn(
                    "text-sm font-medium px-4 py-1.5 rounded-lg border-transparent",
                    "bg-[#F97316] text-[#080C10] hover:bg-[#fb923c]",
                    "transition-all duration-150 hover:scale-[1.02]",
                    "shadow-[0_0_20px_rgba(249,115,22,0.25)] cursor-pointer hidden sm:flex text-center items-center justify-center whitespace-nowrap"
                  )}
                >
                  Start Learning →
                </button>
              </SignInButton>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className={cn(
                  "text-sm font-medium px-4 py-1.5 rounded-lg border-transparent",
                  "bg-[#F97316] text-[#080C10] hover:bg-[#fb923c]",
                  "transition-all duration-150 cursor-pointer hidden sm:flex text-center items-center justify-center whitespace-nowrap mr-2"
                )}
              >
                Dashboard →
              </Link>
              <UserButton />
            </>
          )}
        </div>
      </motion.nav>

      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Hero */}
      <section className="relative z-10 w-full max-w-7xl mx-auto pt-40 pb-20 px-6 min-h-[90vh] flex flex-col justify-center">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          <div className="flex flex-col items-start max-w-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#3FB950] animate-[ping_2s_infinite]" />
              <p className="font-mono text-xs tracking-[0.2em] text-[#F97316]">
                [ COHORT 2025 · 15 WEEKS ]
              </p>
            </div>

            <motion.h1
              className="flex flex-wrap gap-x-[0.25em] leading-[1.05] font-display font-[800] text-[52px] lg:text-[80px] mb-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              {["Master", "Data", "Engineering."].map((word) => (
                <motion.span
                  key={word}
                  variants={fadeInUp}
                  className={cn(
                    "inline-block",
                    word === "Engineering." ? "text-[#F97316] drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]" : "text-[#E6EDF3]"
                  )}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-ui text-lg text-[#8B949E] max-w-md mb-10 leading-relaxed font-light"
            >
              A structured 15-week curriculum covering Python, SQL, PySpark, Databricks, dbt, Azure, and Power BI — with interactive notes, progress tracking, and real supply chain capstone projects.
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-4 w-full"
            >
              {!isLoaded ? null : !userId ? (
                <SignInButton mode="modal">
                  <button
                    className={cn(
                      "group flex items-center justify-center sm:justify-start gap-2 px-6 py-3 rounded-xl",
                      "bg-[#F97316] text-[#080C10] font-medium text-sm border-transparent",
                      "hover:bg-[#fb923c] transition-all duration-150",
                      "shadow-[0_0_30px_rgba(249,115,22,0.3)]",
                      "hover:shadow-[0_0_40px_rgba(249,115,22,0.45)]",
                      "hover:scale-[1.02] cursor-pointer w-full sm:w-auto text-center"
                    )}
                  >
                    Begin Week 0
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </SignInButton>
              ) : (
                <Link
                  href="/dashboard"
                  className={cn(
                    "group flex items-center justify-center sm:justify-start gap-2 px-6 py-3 rounded-xl",
                    "bg-[#F97316] text-[#080C10] font-medium text-sm border-transparent",
                    "hover:bg-[#fb923c] transition-all duration-150",
                    "shadow-[0_0_30px_rgba(249,115,22,0.3)] cursor-pointer w-full sm:w-auto text-center"
                  )}
                >
                  Continue Learning
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              )}

              <Link
                href="#curriculum"
                className={cn(
                  "flex items-center justify-center sm:justify-start gap-2 px-5 py-3 rounded-xl text-sm",
                  "border border-[#21262D] text-[#8B949E]",
                  "hover:border-[#F97316]/30 hover:text-[#E6EDF3]",
                  "transition-all duration-150 w-full sm:w-auto text-center"
                )}
              >
                View Curriculum
              </Link>
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-2 text-xs font-mono text-[#8B949E] mt-6"
            >
              <span>15 weeks</span>
              <span className="text-[#F97316]">·</span>
              <span>4 phases</span>
              <span className="text-[#F97316]">·</span>
              <span>60+ topics covered</span>
            </motion.p>
          </div>

          <TerminalCard />

        </div>
      </section>

      <PhaseOverview />
      <WeekProgressStrip />
      <FeatureHighlights />
      <Footer />

    </main>
  );
}
