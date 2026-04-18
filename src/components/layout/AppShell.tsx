"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ProgressHydrator from "./ProgressHydrator";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  // Force dark mode permanently — this platform is always dark themed
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const isFullscreenRoute = pathname === "/";

  return (
    <div className="flex min-h-screen bg-[#0F151B] text-[#E5E7EB]">
      <ProgressHydrator />
      {!isFullscreenRoute && (
        <>
          <Navbar 
            onMobileSidebarToggle={() => setIsMobileOpen(true)} 
          />
          <Sidebar 
            isMobileOpen={isMobileOpen} 
            onMobileClose={() => setIsMobileOpen(false)} 
          />
        </>
      )}
      <main className={`flex-1 w-full flex flex-col ${isFullscreenRoute ? '' : 'md:pl-[260px] pt-14'}`}>
        {children}
      </main>
    </div>
  );
}

