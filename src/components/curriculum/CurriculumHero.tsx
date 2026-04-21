"use client";

import React, { useRef, useState } from "react";
import { motion, Variants, useMotionValue, useSpring, useTransform } from "framer-motion";

import { stagger, slideDown, slideLeft, fadeUp, scaleIn } from "@/lib/animations/variants";

interface Pill {
  icon?: React.ReactNode;
  text: string;
}

interface CurriculumHeroProps {
  phase: string;
  phaseIcon?: React.ReactNode;
  phaseBadgeBorderColor?: string;
  phaseBadgeTextColor?: string;
  phaseBadgeBgColor?: string;
  week: string;
  title: string;
  description: string;
  pills: Pill[];
  topics: string[];
  glowTopColor?: string;
  glowBottomColor?: string;
}

export default function CurriculumHero({
  phase,
  phaseIcon,
  phaseBadgeBorderColor = "border-[#F97316]/30",
  phaseBadgeTextColor = "text-[#F97316]",
  phaseBadgeBgColor = "bg-[#211713]",
  week,
  title,
  description,
  pills = [],
  topics = [],
  glowTopColor = "bg-[#F97316]",
  glowBottomColor = "bg-[#06b6d4]"
}: CurriculumHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // 3D Tilt configurations
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  // Subtle rotation for the giant week numbers
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // For flashlight effect
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });

    // Normalize for 3D tilt (-0.5 to 0.5)
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    
    x.set(normX);
    y.set(normY);
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      className="relative w-full mb-16 isolate perspective-1000"
    >
      {/* Dynamic Glass Container */}
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          x.set(0);
          y.set(0);
        }}
        className="relative w-full rounded-3xl border border-[#253141]/50 bg-[#0B111A]/80 backdrop-blur-3xl overflow-hidden transition-colors duration-500 hover:border-[#38bdf8]/30"
      >
        
        {/* Flashlight Spotlight Effect (Tracks Mouse) */}
        <motion.div
          animate={{
            background: isHovered 
              ? `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.04), transparent 40%)`
              : `radial-gradient(800px circle at 50% 50%, rgba(255,255,255,0.02), transparent 50%)`
          }}
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300"
        />

        {/* Engineering Dot Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#0B111A] to-transparent pointer-events-none" />

        {/* Ambient Morphing Glows */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.03, 0.08, 0.03],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className={`absolute top-0 right-0 w-[600px] h-[600px] ${glowTopColor} rounded-full blur-[120px] -z-10 mix-blend-screen translate-x-1/3 -translate-y-1/3 pointer-events-none`}
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1], 
            opacity: [0.02, 0.06, 0.02],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 1 }}
          className={`absolute bottom-0 left-0 w-[500px] h-[500px] ${glowBottomColor} rounded-full blur-[100px] -z-10 mix-blend-screen -translate-x-1/4 translate-y-1/4 pointer-events-none`}
        />

        {/* Main Content Area */}
        <div className="relative z-10 p-8 md:p-12 lg:p-14 min-h-[420px] flex flex-col justify-center">
          <motion.div variants={stagger}>
            
            {/* Phase Badge */}
            <motion.div
              variants={slideDown}
              className={`inline-flex items-center gap-2 mb-10 ${phaseBadgeBgColor} ${phaseBadgeTextColor} border ${phaseBadgeBorderColor} px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] uppercase shadow-lg shadow-black/20 backdrop-blur-md backdrop-saturate-150`}
            >
              {phaseIcon}
              {phase}
            </motion.div>

            {/* Title & Week Split */}
            <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-start">
              
              {/* 3D Interactive Week Element */}
              <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="hidden md:flex shrink-0 relative"
              >
                <motion.div
                  variants={slideLeft}
                  className="text-8xl lg:text-[140px] font-black tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-white/20 select-none drop-shadow-2xl"
                  style={{ transform: "translateZ(80px)" }}
                >
                  {week}
                </motion.div>
                {/* 3D Shadow/Reflection */}
                <span className="absolute inset-0 text-8xl lg:text-[140px] font-black tracking-tighter leading-none text-[#F97316] blur-[40px] opacity-30 select-none -z-10" style={{ transform: "translateZ(0px)" }}>
                  {week}
                </span>
              </motion.div>

              {/* Mobile Week Display */}
              <motion.div
                variants={slideLeft}
                className="md:hidden text-6xl font-black tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-br from-[#F97316] to-[#F97316]/60 select-none drop-shadow-lg"
              >
                {week}
              </motion.div>

              {/* Text Info */}
              <div className="flex flex-col flex-1 pl-2">
                <motion.h1
                  variants={fadeUp}
                  className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 drop-shadow-xl"
                >
                  {title}
                </motion.h1>
                <div className="w-16 h-1 bg-gradient-to-r from-[#F97316] to-transparent mb-6 rounded-full" />
                <motion.p
                  variants={fadeUp}
                  className="text-[#9CA3AF] text-lg sm:text-xl leading-relaxed max-w-2xl font-light"
                >
                  {description}
                </motion.p>
              </div>
            </div>

            {/* Bottom Row: Pills & Topics */}
            <div className="mt-12 flex flex-col lg:flex-row gap-8 lg:items-end justify-between border-t border-[#253141]/50 pt-8">
              
              {/* Meta Pills */}
              <motion.div variants={stagger} className="flex flex-wrap gap-3">
                {pills.map((pill, i) => (
                  <motion.div
                    key={i}
                    variants={scaleIn}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 rounded-xl bg-[#141B23]/80 border border-[#253141] text-[#E5E7EB] text-sm font-medium flex items-center gap-2.5 shadow-md shadow-black/20 backdrop-blur-xl hover:border-white/20 transition-colors"
                  >
                    {pill.icon}
                    {pill.text}
                  </motion.div>
                ))}
              </motion.div>

              {/* Topics */}
              <div className="flex flex-col items-start lg:items-end w-full lg:max-w-md shrink-0">
                <p className="text-[10px] font-mono tracking-[0.2em] text-[#6B7280] uppercase mb-3 px-1">Curriculum Topics</p>
                <motion.div variants={stagger} className="flex flex-wrap gap-2 lg:justify-end">
                  {topics.map((topic, i) => (
                    <motion.span
                      key={i}
                      variants={scaleIn}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05] text-[#9CA3AF] text-xs cursor-default hover:bg-[#F97316]/10 hover:text-[#F97316] hover:border-[#F97316]/30 transition-all font-mono"
                    >
                      {topic}
                    </motion.span>
                  ))}
                </motion.div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
