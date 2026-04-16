"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Search, Menu, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SITE_CONFIG } from "@/config/site-config";
import { fadeIn } from "@/animations/variants";
import CommandPalette from "@/components/search/CommandPalette";

interface NavbarProps {
  onMobileSidebarToggle?: () => void;
  toggleDarkMode: () => void;
  isDark: boolean;
}

export default function Navbar({ onMobileSidebarToggle, toggleDarkMode, isDark }: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <motion.nav
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="fixed top-0 left-0 w-full z-50 h-14 backdrop-blur-md bg-white/80 dark:bg-zinc-950/80 border-b border-zinc-200 dark:border-zinc-800 px-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <button className="md:hidden p-1 text-zinc-600 dark:text-zinc-400 cursor-pointer" onClick={onMobileSidebarToggle}>
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-brand-400 to-brand-600" />
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 hidden sm:inline-block">
              {SITE_CONFIG.shortName}
            </span>
          </Link>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center justify-between px-3 py-1.5 text-sm text-zinc-500 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-md hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4" />
              <span>Search curriculum...</span>
            </div>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-zinc-200 dark:bg-zinc-800 rounded">⌘K</kbd>
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={toggleDarkMode} className="p-1.5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md cursor-pointer">
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button className="md:hidden p-1.5 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md cursor-pointer" onClick={() => setIsSearchOpen(true)}>
            <Search className="w-5 h-5" />
          </button>
          <UserButton />
        </div>
      </motion.nav>

      <CommandPalette isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
