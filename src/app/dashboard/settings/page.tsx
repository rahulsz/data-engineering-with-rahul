import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Settings,
  Upload,
  User,
  Bell,
  Search,
  Pencil,
  Moon,
  Sun,
  Monitor,
  Shield,
  CheckCircle2,
  ArrowRight,
  Crown,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#0F151B] text-[#E5E7EB] font-sans flex selection:bg-[#F97316]/30">

      {/* ─── LEFT SIDEBAR ─── */}
      <aside className="w-[280px] border-r border-[#1e293b] flex flex-col hidden lg:flex shrink-0 bg-[#0B111A]">
        <div className="p-8 pb-4">
          <h1 className="text-[22px] font-black text-[#F97316] tracking-tight">The Monolith</h1>
          <p className="text-xs text-[#9CA3AF] mt-1 font-medium">Technical Elite</p>
        </div>

        <nav className="flex-1 px-4 mt-8 space-y-2 relative">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#9CA3AF] font-medium hover:bg-[#1e293b]/50 hover:text-white transition-colors ml-1">
            <LayoutDashboard className="w-5 h-5 opacity-80" />
            Dashboard
          </Link>
          <Link href="/dashboard/curriculum" className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#9CA3AF] font-medium hover:bg-[#1e293b]/50 hover:text-white transition-colors ml-1">
            <BookOpen className="w-5 h-5 opacity-80" />
            Curriculum
          </Link>
          <Link href="/dashboard/progress" className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#9CA3AF] font-medium hover:bg-[#1e293b]/50 hover:text-white transition-colors ml-1">
            <BarChart2 className="w-5 h-5 opacity-80" />
            Progress
          </Link>
          {/* Active */}
          <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-[#2A1D16] text-[#F97316] font-semibold border-l-4 border-[#F97316]">
            <Settings className="w-5 h-5" />
            Settings
          </Link>
        </nav>

        <div className="p-6 mt-auto">
          <button className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-[#1F2937]/70 text-[#E5E7EB] font-semibold hover:bg-[#374151] transition-colors border border-[#374151]">
            <Upload className="w-4 h-4" />
            Upgrade to Pro
          </button>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-1 overflow-y-auto bg-[#0F151B] flex flex-col">

        {/* Top bar */}
        <header className="flex items-center justify-between p-6 px-8 lg:px-12 border-b border-[#1A232E]">
          <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">System Configuration</h1>
          <div className="flex items-center gap-6">
            {/* Search */}
            <div className="hidden md:flex items-center gap-3 bg-[#141B23] border border-[#253141] rounded-lg px-4 py-2.5 w-[220px] hover:border-[#374151] transition-colors">
              <Search className="w-4 h-4 text-[#6B7280]" />
              <span className="text-[13px] text-[#6B7280]">Search settings...</span>
            </div>
            <Bell className="w-5 h-5 text-[#9CA3AF] cursor-pointer hover:text-white transition-colors" />
            <div className="w-8 h-8 rounded-full bg-[#1A232E] border border-[#374151] flex items-center justify-center cursor-pointer hover:border-[#9CA3AF] transition-colors overflow-hidden">
              <User className="w-4 h-4 text-[#E5E7EB]" />
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="px-8 lg:px-12 border-b border-[#1A232E]">
          <nav className="flex gap-1 -mb-px overflow-x-auto">
            {/* Active tab */}
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

        <div className="flex-1 p-8 lg:p-12 pb-24 max-w-7xl">

          {/* ── TOP SECTION : Avatar + Identity Form ── */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">

            {/* LEFT : Avatar Card + Theme Card */}
            <div className="xl:col-span-1 flex flex-col gap-8">

              {/* Operator Avatar */}
              <section className="bg-[#141B23] rounded-xl border-l-2 border-l-[#F97316]/40 border border-[#1e293b]/60 p-8 flex flex-col items-center">
                <div className="flex items-center gap-2 self-start mb-8">
                  <User className="w-4 h-4 text-[#9CA3AF]" />
                  <h3 className="text-[11px] font-mono font-bold tracking-[0.15em] text-[#9CA3AF] uppercase">Operator Avatar</h3>
                </div>

                <div className="relative mb-6 group">
                  <div className="w-[140px] h-[140px] rounded-xl overflow-hidden border-2 border-[#253141] group-hover:border-[#F97316]/50 transition-colors shadow-xl">
                    <Image
                      src="/avatar.png"
                      alt="Operator Avatar"
                      width={140}
                      height={140}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {/* Edit badge */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#F97316] flex items-center justify-center cursor-pointer hover:bg-[#fb923c] transition-colors shadow-lg">
                    <Pencil className="w-3.5 h-3.5 text-white" />
                  </div>
                </div>

                <h2 className="text-xl font-bold text-white mb-1 text-center">Alex Chen</h2>
                <p className="text-[12px] font-mono text-[#6B7280]">ID: OP-7729-A</p>
              </section>

              {/* Environment Theme */}
              <section className="bg-[#141B23] rounded-xl border-l-2 border-l-[#38bdf8]/30 border border-[#1e293b]/60 p-8">
                <div className="flex items-center gap-2 mb-8">
                  <Settings className="w-4 h-4 text-[#9CA3AF]" />
                  <h3 className="text-[11px] font-mono font-bold tracking-[0.15em] text-[#9CA3AF] uppercase">Environment Theme</h3>
                </div>

                <div className="flex gap-4 justify-center">
                  {/* Light */}
                  <button className="flex flex-col items-center gap-3 group">
                    <div className="w-[60px] h-[60px] rounded-xl bg-[#1A232E] border border-[#253141] flex items-center justify-center group-hover:border-[#374151] transition-colors">
                      <Sun className="w-6 h-6 text-[#6B7280]" />
                    </div>
                    <span className="text-[11px] font-mono text-[#6B7280]">Light</span>
                  </button>

                  {/* Dark (Active) */}
                  <button className="flex flex-col items-center gap-3">
                    <div className="w-[60px] h-[60px] rounded-xl bg-[#0B111A] border-2 border-[#38bdf8] flex items-center justify-center shadow-[0_0_16px_rgba(56,189,248,0.15)]">
                      <Moon className="w-6 h-6 text-[#38bdf8]" />
                    </div>
                    <span className="text-[11px] font-mono text-[#38bdf8] font-semibold">Dark</span>
                  </button>

                  {/* System */}
                  <button className="flex flex-col items-center gap-3 group">
                    <div className="w-[60px] h-[60px] rounded-xl bg-[#1A232E] border border-[#253141] flex items-center justify-center group-hover:border-[#374151] transition-colors">
                      <Monitor className="w-6 h-6 text-[#6B7280]" />
                    </div>
                    <span className="text-[11px] font-mono text-[#6B7280]">System</span>
                  </button>
                </div>
              </section>
            </div>

            {/* RIGHT : Identity Parameters Form */}
            <section className="xl:col-span-2 bg-[#141B23] rounded-xl border-l-2 border-l-[#F97316]/40 border border-[#1e293b]/60 p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#9CA3AF]" />
                  <h3 className="text-[11px] font-mono font-bold tracking-[0.15em] text-[#9CA3AF] uppercase">Identity Parameters</h3>
                </div>
                <div className="bg-[#F97316]/10 text-[#ea580c] text-[10px] font-mono font-bold tracking-widest px-3 py-1 rounded border border-[#F97316]/20">
                  UNSAVED CHANGES
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">

                {/* First + Last Name Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[12px] font-mono text-[#9CA3AF] mb-2.5">First Name</label>
                    <input
                      type="text"
                      defaultValue="Alex"
                      className="w-full bg-[#0F151B] border border-[#253141] rounded-lg px-4 py-3 text-[15px] text-white focus:outline-none focus:border-[#F97316]/50 transition-colors placeholder:text-[#4B5563]"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-mono text-[#9CA3AF] mb-2.5">Last Name</label>
                    <input
                      type="text"
                      defaultValue="Chen"
                      className="w-full bg-[#0F151B] border border-[#253141] rounded-lg px-4 py-3 text-[15px] text-white focus:outline-none focus:border-[#F97316]/50 transition-colors placeholder:text-[#4B5563]"
                    />
                  </div>
                </div>

                {/* Professional Bio */}
                <div>
                  <label className="block text-[12px] font-mono text-[#9CA3AF] mb-2.5">Professional Bio</label>
                  <textarea
                    rows={4}
                    defaultValue="Senior Systems Architect focused on distributed networks and high-performance computing. Building the next generation of scalable infrastructure."
                    className="w-full bg-[#0F151B] border border-[#253141] rounded-lg px-4 py-3 text-[15px] text-white leading-relaxed resize-none focus:outline-none focus:border-[#F97316]/50 transition-colors placeholder:text-[#4B5563]"
                  />
                  <div className="text-right mt-1.5">
                    <span className="text-[11px] font-mono text-[#6B7280]">142 / 300</span>
                  </div>
                </div>

                {/* GitHub + Portfolio Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[12px] font-mono text-[#9CA3AF] mb-2.5">GitHub Handle</label>
                    <div className="flex items-center bg-[#0F151B] border border-[#253141] rounded-lg overflow-hidden focus-within:border-[#F97316]/50 transition-colors">
                      <span className="text-[13px] text-[#6B7280] pl-4 font-mono shrink-0">github.com/</span>
                      <input
                        type="text"
                        defaultValue="alexc-arch"
                        className="flex-1 bg-transparent px-1 py-3 text-[15px] text-white focus:outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[12px] font-mono text-[#9CA3AF] mb-2.5">Portfolio URL</label>
                    <input
                      type="text"
                      defaultValue="https://alexchen.dev"
                      className="w-full bg-[#0F151B] border border-[#253141] rounded-lg px-4 py-3 text-[15px] text-white focus:outline-none focus:border-[#F97316]/50 transition-colors placeholder:text-[#4B5563]"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-4 pt-4">
                  <button className="px-6 py-2.5 text-[13px] font-semibold text-[#F97316] hover:text-[#fb923c] transition-colors">
                    Discard
                  </button>
                  <button className="px-6 py-2.5 text-[13px] font-bold text-white bg-[#F97316] rounded-lg hover:bg-[#fb923c] transition-colors shadow-lg shadow-[#F97316]/10">
                    Commit Changes
                  </button>
                </div>
              </div>
            </section>
          </div>

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
                    <CheckCircle2 className="w-5 h-5 text-[#22c55e] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-[14px] font-semibold text-white mb-0.5">Elite Discord Sandbox</div>
                      <div className="text-[12px] font-mono text-[#6B7280]">Connected as @alexc</div>
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

        </div>
      </main>
    </div>
  );
}
