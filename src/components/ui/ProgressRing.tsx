"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import { cn } from "@/lib/cn";

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  className?: string;
}

export default function ProgressRing({
  percentage,
  size = 56,
  strokeWidth = 4,
  color = "#6366f1",
  className,
}: ProgressRingProps) {
  const center = size / 2;
  const radius = center - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const dashoffset = useMotionValue(circumference);

  useEffect(() => {
    const validPercentage = Math.max(0, Math.min(100, percentage));
    const targetOffset = circumference - (validPercentage / 100) * circumference;

    const controls = animate(dashoffset, targetOffset, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (latest) => {
        const pct = ((circumference - latest) / circumference) * 100;
        setCurrentPercentage(Math.round(pct));
      }
    });

    return () => controls.stop();
  }, [percentage, circumference, dashoffset]);

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-zinc-200 dark:text-zinc-800"
        />
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: dashoffset }}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute font-mono text-xs font-semibold text-zinc-700 dark:text-zinc-300">
        {currentPercentage}%
      </span>
    </div>
  );
}
