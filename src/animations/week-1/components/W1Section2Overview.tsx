"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeOut" as const, duration: 0.5 } },
};

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const statPop: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring" as const, stiffness: 200, damping: 20 } },
};

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const [display, setDisplay] = useState("0");
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(target.replace(/[^0-9]/g, ""));
    if (isNaN(num)) { setDisplay(target); return; }
    let frame = 0;
    const total = 30;
    const timer = setInterval(() => {
      frame++;
      const val = Math.round((frame / total) * num);
      setDisplay(val + suffix);
      if (frame >= total) { clearInterval(timer); setDisplay(target); }
    }, 26);
    return () => clearInterval(timer);
  }, [inView, target, suffix]);

  return <span ref={ref}>{display}</span>;
}

const stats = [
  { value: "#1", label: "Language used in Data Engineering worldwide" },
  { value: "90%+", label: "of DE job posts require Git proficiency" },
  { value: "100%", label: "of your future commits will need a ticket" },
];

const paragraphs = [
  "Python is the lingua franca of modern data engineering. Every tool you will use in this course — PySpark, Pandas, Delta Lake, MLflow — is either written in Python or exposes a Python API. Before you can orchestrate a pipeline that processes 10 million inventory records, you need to understand how Python thinks: how it stores data, how it makes decisions, how it reads files. Week 1 builds that foundation from scratch, with zero assumptions about prior programming experience.",
  "Git is not optional. In every data engineering team on the planet, code that isn\u2019t in version control doesn\u2019t exist. Git is how you save your work safely, collaborate without destroying each other\u2019s code, and create an auditable history of every change to a pipeline. By the end of this week, every Python script you write will be committed to a repository — exactly the habit that separates professionals from hobbyists.",
  "Jira closes the loop between code and business intent. A pipeline you built for no documented reason is a pipeline nobody can maintain. In this week you learn to write User Stories — the professional format for describing what needs to be built, why, and for whom. Every lab task from Week 1 onward maps to a Jira ticket. This is not busywork. It is the daily workflow of every data engineering team at every company you will interview at.",
];

export default function W1Section2Overview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.section ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} className="w-full flex flex-col gap-12 mb-24">
      <motion.div variants={fadeUp} className="flex flex-col gap-2">
        <h3 className="text-[#38bdf8] text-sm font-bold tracking-widest uppercase flex items-center gap-2">
          <span className="text-lg">🎯</span> Week Overview
        </h3>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
          Why Python + Git + Jira Before Anything Else?
        </h2>
      </motion.div>

      <motion.div variants={stagger} className="flex flex-col gap-6">
        {paragraphs.map((p, i) => (
          <motion.p key={i} variants={fadeUp} className="text-[#D1D5DB] text-base leading-relaxed">
            {p}
          </motion.p>
        ))}
      </motion.div>

      <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <motion.div key={i} variants={statPop} className="bg-[#141B23] border border-[#253141] rounded-xl p-6 flex flex-col gap-2 group hover:border-[#374151] hover:-translate-y-1 transition-all duration-300 shadow-lg">
            <span className="text-3xl font-bold text-[#F97316] tracking-tight">
              <AnimatedCounter target={s.value} />
            </span>
            <span className="text-[#9CA3AF] text-sm leading-relaxed">{s.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
