"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  };

  const isFullscreenRoute = pathname === "/" || pathname.startsWith("/dashboard");

  return (
    <div className={`flex min-h-screen transition-colors ${isFullscreenRoute ? 'bg-home-bg dark text-home-text-primary' : 'bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100'}`}>
      {!isFullscreenRoute && (
        <>
          <Navbar 
            onMobileSidebarToggle={() => setIsMobileOpen(true)} 
            toggleDarkMode={toggleDarkMode}
            isDark={isDark}
          />
          <Sidebar 
            isMobileOpen={isMobileOpen} 
            onMobileClose={() => setIsMobileOpen(false)} 
          />
        </>
      )}
      <main className={`flex-1 w-full flex flex-col ${isFullscreenRoute ? '' : 'md:pl-64 pt-14'}`}>
        {children}
      </main>
    </div>
  );
}
