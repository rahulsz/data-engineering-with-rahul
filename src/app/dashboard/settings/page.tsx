import React from "react";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { getUserSettings } from "@/app/actions/userSettings";
import SettingsProfile from "./_components/SettingsProfile";
import {
  Search,
  CheckCircle2,
  ArrowRight,
  Crown,
} from "lucide-react";

export default async function SettingsPage() {
  const user = await currentUser();
  const dbSettingsRes = await getUserSettings();
  
  // Base initial data, mixing Clerk info if DB is empty
  const initialData = dbSettingsRes.success && dbSettingsRes.data
    ? dbSettingsRes.data
    : {
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        bio: "",
        githubHandle: "",
        portfolioUrl: ""
      };

  return (
    <div className="min-h-screen bg-[#0F151B] text-[#E5E7EB] font-sans selection:bg-[#F97316]/30">

      {/* ─── MAIN CONTENT ─── */}
      <main className="p-8 lg:p-12 pb-24 max-w-7xl">

        {/* Page Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">System Configuration</h1>
          <div className="hidden md:flex items-center gap-3 bg-[#141B23] border border-[#253141] rounded-lg px-4 py-2.5 w-[220px] hover:border-[#374151] transition-colors">
            <Search className="w-4 h-4 text-[#6B7280]" />
            <span className="text-[13px] text-[#6B7280]">Search settings...</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-[#1A232E] mb-10">
          <nav className="flex gap-1 -mb-px overflow-x-auto">
            <button className="px-5 py-4 text-[13px] font-semibold text-[#F97316] border-b-2 border-[#F97316] whitespace-nowrap">
              Identity & Profile
            </button>
            <button className="px-5 py-4 text-[13px] font-medium text-[#9CA3AF] hover:text-white transition-colors border-b-2 border-transparent whitespace-nowrap">
              Security Details
            </button>
            <button className="px-5 py-4 text-[13px] font-medium text-[#9CA3AF] hover:text-white transition-colors border-b-2 border-transparent whitespace-nowrap">
              Notifications
            </button>
            <button className="px-5 py-4 text-[13px] font-medium text-[#9CA3AF] hover:text-white transition-colors border-b-2 border-transparent whitespace-nowrap">
              Preferences
            </button>
            <button className="px-5 py-4 text-[13px] font-medium text-[#9CA3AF] hover:text-white transition-colors border-b-2 border-transparent whitespace-nowrap">
              Subscription
            </button>
          </nav>
        </div>

        <SettingsProfile 
          initialData={initialData} 
          clerkAvatarUrl={user?.imageUrl || ""} 
          clerkId={user?.id || "unknown"} 
        />

        {/* ── ACCESS TIER ── */}
        <section className="bg-[#141B23] rounded-xl border-l-2 border-l-[#22c55e]/40 border border-[#1e293b]/60 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left : Access Tier */}
            <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-[#1e293b]/50">
              <div className="flex items-center gap-2 mb-8">
                <Crown className="w-4 h-4 text-[#F59E0B]" />
                <h3 className="text-[11px] font-mono font-bold tracking-[0.15em] text-[#9CA3AF] uppercase">Access Tier</h3>
              </div>

              <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Pro Access</h2>

              <div className="inline-flex items-center gap-2 bg-[#22c55e]/10 text-[#22c55e] text-[11px] font-mono font-bold px-3 py-1.5 rounded border border-[#22c55e]/20 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]"></div>
                Active until Nov 2024
              </div>

              <div className="mt-4">
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-[13px] font-mono text-[#9CA3AF] underline underline-offset-4 decoration-[#374151] hover:text-white hover:decoration-[#9CA3AF] transition-colors"
                >
                  Manage Billing
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right : Entitlements */}
            <div className="p-8 lg:p-10 bg-[#111820]">
              <h4 className="text-[13px] font-semibold text-white mb-6">Current Cohort Entitlements</h4>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-[#22c55e] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[14px] font-semibold text-white mb-0.5">Advanced System Design Curriculum</div>
                    <div className="text-[12px] font-mono text-[#6B7280]">Full read/write access to all modules</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-[#22c55e] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-[14px] font-semibold text-white mb-0.5">1-on-1 Architectural Review</div>
                    <div className="text-[12px] font-mono text-[#6B7280]">2 sessions remaining this month</div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle2 className={initialData.githubHandle ? "w-5 h-5 text-[#22c55e] shrink-0 mt-0.5" : "w-5 h-5 text-[#4B5563] shrink-0 mt-0.5"} />
                  <div>
                    <div className="text-[14px] font-semibold text-white mb-0.5">Elite Discord Sandbox</div>
                    <div className="text-[12px] font-mono text-[#6B7280]">
                      {initialData.githubHandle ? `Connected as @${initialData.githubHandle}` : "GitHub Not Connected"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="mt-16 pt-8 border-t border-[#1A232E]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <p className="text-[11px] font-mono text-[#4B5563] uppercase tracking-wider">
              © 2024 The Technical Elite. Built for Performance.
            </p>
            <div className="flex items-center gap-8">
              <Link href="#" className="text-[11px] font-mono text-[#6B7280] uppercase tracking-wider hover:text-white transition-colors">Documentation</Link>
              <Link href="#" className="text-[11px] font-mono text-[#6B7280] uppercase tracking-wider hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="text-[11px] font-mono text-[#6B7280] uppercase tracking-wider hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="text-[11px] font-mono text-[#6B7280] uppercase tracking-wider hover:text-white transition-colors">System Status</Link>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
