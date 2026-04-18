"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Search, PanelLeft, FolderClosed, Bell } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { fadeIn } from "@/animations/variants";
import CommandPalette from "@/components/search/CommandPalette";
import { CURRICULUM } from "@/config/site-config";

interface NavbarProps {
  onMobileSidebarToggle?: () => void;
}

export default function Navbar({ onMobileSidebarToggle }: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  // Find the current phase for breadcrumbs
  const currentPhase = CURRICULUM.find(p =>
    p.weeks.some(w => pathname.includes(`/curriculum/${p.slug}`))
  );

  return (
    <>
      <motion.nav
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="fixed top-0 md:left-[260px] w-full md:w-[calc(100%-260px)] z-30 h-14 backdrop-blur-md bg-[#0B111A]/90 border-b border-[#1C2532] px-4 md:px-8 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <button 
            className="md:hidden p-1.5 text-[#9CA3AF] cursor-pointer hover:bg-[#1e293b] hover:text-white rounded-md transition-colors border border-transparent" 
            onClick={onMobileSidebarToggle}
          >
            <PanelLeft className="w-5 h-5" />
          </button>
          
          {/* Mobile Brand (hidden on Desktop) */}
          <Link href="/" className="md:hidden flex items-center gap-2.5">
            <div className="w-[26px] h-[26px] rounded bg-[#141B23] border border-[#253141] grid grid-cols-2 gap-[2px] p-[5px]">
              <div className="bg-[#F97316] rounded-sm" />
              <div className="bg-transparent" />
              <div className="bg-[#4B5563] rounded-sm" />
              <div className="bg-[#F97316] rounded-sm" />
            </div>
            <span className="font-bold text-white text-[14px] tracking-tight">
              Tech Elite
            </span>
          </Link>

          {/* Desktop Breadcrumbs (hidden on Mobile) */}
          {currentPhase && (
            <div className="hidden md:flex flex-row items-center gap-2 text-[12px] font-medium text-[#9CA3AF]">
              <Link href="/curriculum" className="hover:text-white transition-colors">Curriculum</Link>
              <span className="text-[#4B5563]">&rsaquo;</span>
              <span className="text-[#F97316]">{currentPhase.label}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4 text-[#9CA3AF]">
            <Link href="#" className="hover:text-white transition-colors">
              <FolderClosed className="w-[18px] h-[18px]" />
            </Link>
            <button className="hover:text-white transition-colors relative cursor-pointer">
              <Bell className="w-[18px] h-[18px]" />
              <span className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#F97316] rounded-full border border-[#0B111A]"></span>
            </button>
            <button onClick={() => setIsSearchOpen(true)} className="hover:text-white transition-colors cursor-pointer">
              <Search className="w-[18px] h-[18px]" />
            </button>
          </div>


          <button className="md:hidden p-1.5 text-[#9CA3AF] hover:bg-[#1e293b] hover:text-white rounded-md cursor-pointer transition-colors" onClick={() => setIsSearchOpen(true)}>
            <Search className="w-5 h-5" />
          </button>
          <div className="pl-2 border-l border-[#1e293b] hidden md:block">
            <UserButton />
          </div>
          <div className="md:hidden">
            <UserButton />
          </div>
        </div>
      </motion.nav>

      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
