"use client";

import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, FastForward, Home } from "lucide-react";
import Link from "next/link";

import { stagger, fadeUp, popIn } from "@/lib/animations/variants";

export interface PreviewItem {
  icon: React.ReactNode;
  text: string;
}

export interface WhatsNextConfig {
  badgeText?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  description: React.ReactNode;
  previewTitle?: string;
  previewItems: PreviewItem[];
}

export interface NavLinkConfig {
  href: string;
  phase: string;
  label: string;
  disabled?: boolean;
}

interface CurriculumNavigationProps {
  whatsNext?: WhatsNextConfig;
  previous?: NavLinkConfig;
  next?: NavLinkConfig;
  homePath?: string;
  breadcrumb?: React.ReactNode;
}

export default function CurriculumNavigation({
  whatsNext,
  previous,
  next,
  homePath = "/dashboard",
  breadcrumb
}: CurriculumNavigationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.section 
      ref={ref} 
      initial="hidden" 
      animate={isInView ? "visible" : "hidden"} 
      className={`w-full flex flex-col gap-10 mb-8 border-t border-[#1C2532] pt-12 ${!whatsNext ? 'mt-24' : ''}`}
    >
      {/* What's Next Section */}
      {whatsNext && (
        <>
          <motion.div variants={fadeUp} className="flex flex-col gap-3">
            <h3 className="text-[#F97316] text-sm font-bold tracking-widest uppercase flex items-center gap-2">
              {whatsNext.badgeIcon || <FastForward className="w-5 h-5" />}
              {whatsNext.badgeText || "What's Next"}
            </h3>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
              {whatsNext.title}
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="text-[#D1D5DB] text-base leading-relaxed">
            {whatsNext.description}
          </motion.div>

          {whatsNext.previewItems && whatsNext.previewItems.length > 0 && (
            <motion.div variants={popIn} className="bg-[#141B23] border border-[#253141] rounded-2xl p-6 shadow-lg">
              <h4 className="text-[#F97316] font-bold text-xs tracking-widest uppercase mb-4">
                {whatsNext.previewTitle || "Preview"}
              </h4>
              <motion.div variants={stagger} className="flex flex-col gap-3">
                {whatsNext.previewItems?.map((item, i) => (
                  <motion.div key={i} variants={popIn} className="flex items-center gap-3 text-[#D1D5DB] text-sm group">
                    <span className="shrink-0">{item.icon}</span>
                    <span className="group-hover:text-white transition-colors">{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </>
      )}

      {/* Footer Navigation Buttons */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-stretch gap-4">
        {/* Previous Button */}
        {previous?.disabled ? (
          <div className="flex-1 flex items-center gap-3 px-5 py-4 bg-[#0B111A]/50 border border-[#1e293b] rounded-xl opacity-50 cursor-not-allowed">
            <ChevronLeft className="w-5 h-5 text-[#6B7280]" />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-[#6B7280] tracking-widest uppercase">Previous</span>
              <span className="text-[#9CA3AF] text-sm font-bold">{previous.label}</span>
              <span className="text-[#6B7280] text-[10px]">{previous.phase}</span>
            </div>
          </div>
        ) : previous ? (
          <Link
            href={previous.href}
            className="flex-1 flex items-center gap-3 px-5 py-4 bg-[#141B23] border border-[#253141] rounded-xl hover:border-[#374151] hover:-translate-x-1 transition-all group"
          >
            <ChevronLeft className="w-5 h-5 text-[#6B7280] group-hover:text-[#D1D5DB] transition-colors" />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-[#6B7280] tracking-widest uppercase">Previous</span>
              <span className="text-white text-sm font-bold">{previous.label}</span>
              <span className="text-[#6B7280] text-[10px]">{previous.phase}</span>
            </div>
          </Link>
        ) : <div className="flex-1" />}

        {/* Back to Dashboard center button (only if no what's next, match week-0 style) */}
        {!whatsNext && (
          <div className="flex flex-col items-center justify-center gap-3 p-4">
            <Link href={homePath} className="px-5 py-2.5 rounded-full bg-[#141B23] border border-[#253141] text-[#D1D5DB] hover:text-[#F97316] hover:scale-105 transition-all flex items-center gap-2 group shadow-sm">
               <Home className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
               <span className="text-sm font-bold tracking-wide">Back to Dashboard</span>
            </Link>
          </div>
        )}

        {/* Next Button */}
        {next ? (
          <Link
            href={next.href}
            className="flex-1 flex items-center justify-end gap-3 px-5 py-4 bg-[#141B23] border border-[#F97316]/30 rounded-xl hover:border-[#F97316]/60 hover:translate-x-1 hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] transition-all group text-right"
          >
            <div className="flex flex-col">
              <span className="text-[10px] font-mono text-[#6B7280] tracking-widest uppercase">Next</span>
              <span className="text-[#F97316] text-sm font-bold">{next.label}</span>
              <span className="text-[#6B7280] text-[10px]">{next.phase}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-[#F97316] group-hover:text-[#fb923c] transition-colors" />
          </Link>
        ) : <div className="flex-1" />}
      </motion.div>

      {/* Breadcrumb bottom */}
      {breadcrumb && (
        <motion.div variants={fadeUp} className="text-center text-[#6B7280] text-xs font-mono tracking-widest uppercase mt-2 flex items-center justify-center gap-2">
          {breadcrumb} | <Link href={homePath} className="text-[#F97316] hover:underline flex items-center gap-1"><Home className="w-3 h-3" /> Dashboard</Link>
        </motion.div>
      )}
    </motion.section>
  );
}
