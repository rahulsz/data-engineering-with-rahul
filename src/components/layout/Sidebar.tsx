"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CURRICULUM } from "@/config/site-config";
import { useProgressStore } from "@/store/progressStore";
import { useSidebarStore } from "@/store/sidebarStore";
import { cn } from "@/lib/cn";
import { 
  CheckCircle2, 
  Code2, 
  Database, 
  Cloud, 
  LayoutDashboard, 
  BarChart2, 
  Settings,
  LockKeyhole,
  Network,
  ChevronRight,
  BookOpen
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

function SectionLabel({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <div className="px-7 mb-3 mt-8">
      <span className={cn(
        "text-[10px] font-mono font-bold tracking-[0.15em] uppercase",
        active ? "text-[#F97316]" : "text-[#556070]"
      )}>
        {children}
      </span>
    </div>
  );
}

function NavItem({ 
  href, 
  isActive, 
  icon: Icon, 
  label, 
  onClick 
}: { 
  href: string; 
  isActive: boolean; 
  icon: any; 
  label: string; 
  onClick?: () => void; 
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3.5 px-7 py-[9px] text-[13px] font-medium transition-all group border-l-[3px]",
        isActive
          ? "bg-[#211713] text-[#F97316] border-[#F97316]"
          : "text-[#9CA3AF] border-transparent hover:text-[#E5E7EB] hover:bg-[#141B23]"
      )}
    >
      <Icon className={cn(
        "w-[16px] h-[16px] shrink-0 transition-colors", 
        isActive ? "text-[#F97316]" : "text-[#556070] group-hover:text-[#9CA3AF]"
      )} />
      <span className="truncate tracking-wide">{label}</span>
    </Link>
  );
}


export default function Sidebar({ isMobileOpen, onMobileClose }: { isMobileOpen?: boolean; onMobileClose?: () => void }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  
  // eslint-disable-next-line
  React.useEffect(() => setMounted(true), []);

  const { completedWeeks, getCompletionPercentage } = useProgressStore();
  const headings = useSidebarStore(state => state.headings);

  // Guarantee matching values for the first hydration pass
  const completionPercentage = mounted ? getCompletionPercentage() : 0;

  const allWeeks = CURRICULUM.flatMap(p =>
    p.weeks.map(w => ({ ...w, phaseSlug: p.slug }))
  );

  const nextWeek = mounted 
    ? allWeeks.find(w => w.status === "available" && !completedWeeks.includes(w.week))
    : allWeeks.find(w => w.status === "available");

  const currentPhaseSlug = CURRICULUM.find(p =>
    p.weeks.some(w => pathname === `/curriculum/${p.slug}/${w.slug}`)
  )?.slug;

  const sidebarContent = (
    <div className="h-full flex flex-col pt-14 md:pt-0 bg-[#0B111A]">
      
      {/* ── Brand / Header ── */}
      <div className="px-6 pt-8 pb-4">
        <Link href="/" onClick={onMobileClose} className="flex items-center gap-4 group">
          <div className="w-[36px] h-[36px] rounded-xl bg-[#141B23] border border-[#253141] flex flex-wrap gap-[3px] p-[8px] shadow-lg shrink-0 group-hover:border-[#374151] transition-colors">
            <div className="w-[7px] h-[7px] bg-[#F97316] rounded-sm" />
            <div className="w-[7px] h-[7px] bg-transparent" />
            <div className="w-[7px] h-[7px] bg-[#4B5563] rounded-sm" />
            <div className="w-[7px] h-[7px] bg-[#F97316] rounded-sm" />
          </div>
          <div className="min-w-0">
            <h2 className="text-[15px] font-bold text-white tracking-tight leading-none mb-1.5 truncate">Tech Elite</h2>
            <p className="text-[9px] font-mono text-[#556070] tracking-[0.1em] uppercase leading-none truncate">High Performance Eng.</p>
          </div>
        </Link>
      </div>

      {/* ── Scrollable Nav ── */}
      <nav className="flex-1 overflow-y-auto pb-4 custom-scrollbar">
        {headings.length > 0 && pathname.includes("/curriculum/") ? (
          <>
            {/* Breadcrumb Context */}
            <div className="px-7 mt-8 mb-4">
              <div className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-[#556070] mb-2">
                <span className="truncate">{CURRICULUM.find(p => pathname.includes(p.slug))?.label || "Course"}</span>
                <ChevronRight className="w-3 h-3 shrink-0" />
              </div>
              <h3 className="text-sm font-bold text-white tracking-tight leading-tight">
                {CURRICULUM.flatMap(p => p.weeks).find(w => pathname.includes(w.slug))?.title || "Lesson"}
              </h3>
            </div>

            <SectionLabel>Table of Contents</SectionLabel>
            {headings.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                onClick={onMobileClose}
                className="flex items-center gap-3.5 px-7 py-[9px] text-[13px] font-medium text-[#9CA3AF] border-l-[3px] border-transparent hover:text-[#E5E7EB] hover:bg-[#141B23] transition-all group"
              >
                <ChevronRight className="w-[14px] h-[14px] shrink-0 text-[#556070] group-hover:text-[#F97316]" />
                <span className="truncate tracking-wide">{heading.title}</span>
              </a>
            ))}
            <div className="mt-6 pt-6 border-t border-[#1C2532] mx-7">
              <NavItem href="/dashboard" isActive={false} icon={LayoutDashboard} label="Back to Dashboard" onClick={onMobileClose} />
            </div>
          </>
        ) : (
          <>
            <SectionLabel>General</SectionLabel>
            <NavItem href="/dashboard" isActive={pathname === "/dashboard"} icon={LayoutDashboard} label="Dashboard" onClick={onMobileClose} />
            <NavItem href="/curriculum" isActive={pathname === "/curriculum"} icon={BookOpen} label="Curriculum Map" onClick={onMobileClose} />
            <NavItem href="/dashboard/progress" isActive={pathname === "/dashboard/progress"} icon={BarChart2} label="Progress" onClick={onMobileClose} />
            <NavItem href="/dashboard/settings" isActive={pathname === "/dashboard/settings"} icon={Settings} label="Settings" onClick={onMobileClose} />
          </>
        )}
      </nav>

      {/* ── Pinned Bottom: Current Progress ── */}
      <div className="p-5 mt-auto">
        <div className="bg-[#111823] border border-[#1e293b] rounded-xl p-4 shadow-xl">
          <div className="flex items-center justify-between mb-3.5">
            <span className="text-[9px] font-mono font-bold tracking-[0.1em] text-[#9CA3AF] uppercase">Current Progress</span>
            <span className="text-[11px] font-mono font-bold text-[#F97316]">{Math.round(completionPercentage)}%</span>
          </div>
          <div className="h-[3px] bg-[#0B111A] rounded-full mb-5 overflow-hidden border border-[#253141]/50">
            <div 
              className="h-full bg-[#F97316] rounded-full shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-500" 
              style={{ width: `${completionPercentage}%` }} 
            />
          </div>
          {nextWeek ? (
            <Link
              href={`/curriculum/${nextWeek.phaseSlug}/${nextWeek.slug}`}
              onClick={onMobileClose}
              className="flex items-center justify-center w-full py-2.5 bg-[#F97316] text-[#0B111A] text-[11px] font-bold tracking-widest uppercase rounded flex-shrink-0 hover:bg-[#fb923c] transition-colors shadow-[0_4px_12px_rgba(249,115,22,0.2)]"
            >
              Resume Lesson
            </Link>
          ) : (
            <div className="flex items-center justify-center w-full py-2.5 bg-[#1e293b] text-[#9CA3AF] text-[11px] font-bold tracking-widest uppercase rounded cursor-default">
              All Complete
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:block fixed left-0 top-0 w-[260px] h-screen border-r border-[#1C2532] bg-[#0B111A] z-40">
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {isMobileOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-[260px] h-full bg-[#0B111A] shadow-[4px_0_24px_rgba(0,0,0,0.5)]"
            >
              {sidebarContent}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
