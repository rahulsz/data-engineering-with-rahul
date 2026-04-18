"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import { User, Pencil, Settings, Sun, Moon, Monitor, Shield } from "lucide-react";
import { updateUserSettings } from "@/app/actions/userSettings";

interface SettingsProfileProps {
  initialData: {
    firstName: string;
    lastName: string;
    bio: string;
    githubHandle: string;
    portfolioUrl: string;
  };
  clerkAvatarUrl: string;
  clerkId: string;
}

export default function SettingsProfile({ initialData, clerkAvatarUrl, clerkId }: SettingsProfileProps) {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    firstName: initialData.firstName,
    lastName: initialData.lastName,
    bio: initialData.bio,
    githubHandle: initialData.githubHandle,
    portfolioUrl: initialData.portfolioUrl,
  });

  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setHasUnsavedChanges(true);
  };

  const handleDiscard = () => {
    setFormData({
      firstName: initialData.firstName,
      lastName: initialData.lastName,
      bio: initialData.bio,
      githubHandle: initialData.githubHandle,
      portfolioUrl: initialData.portfolioUrl,
    });
    setHasUnsavedChanges(false);
  };

  const handleCommit = () => {
    startTransition(async () => {
      const res = await updateUserSettings(formData);
      if (res.success) {
        setHasUnsavedChanges(false);
      } else {
        alert("Failed to save settings: " + res.error);
      }
    });
  };

  // Mock clerkId display
  const displayId = "OP-" + (clerkId.slice(-6).toUpperCase());

  return (
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
                src={clerkAvatarUrl || "/avatar.png"}
                alt="Operator Avatar"
                width={140}
                height={140}
                className="object-cover w-full h-full"
              />
            </div>
            {/* Edit badge (Disabled / read-only since it's driven by Clerk) */}
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#111823] border border-[#253141] flex items-center justify-center shadow-lg">
              <Pencil className="w-3.5 h-3.5 text-[#6B7280]" />
            </div>
          </div>

          <h2 className="text-xl font-bold text-white mb-1 text-center">
            {formData.firstName || "Unknown"} {formData.lastName}
          </h2>
          <p className="text-[12px] font-mono text-[#6B7280]">ID: {displayId}</p>
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
              <div className="w-[60px] h-[60px] rounded-xl bg-[#1A232E] border border-[#253141] flex items-center justify-center transition-colors opacity-50 cursor-not-allowed">
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
              <div className="w-[60px] h-[60px] rounded-xl bg-[#1A232E] border border-[#253141] flex items-center justify-center transition-colors opacity-50 cursor-not-allowed">
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
          {hasUnsavedChanges && (
            <div className="bg-[#F97316]/10 text-[#ea580c] text-[10px] font-mono font-bold tracking-widest px-3 py-1 rounded border border-[#F97316]/20 animate-pulse">
              UNSAVED CHANGES
            </div>
          )}
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[12px] font-mono text-[#9CA3AF] mb-2.5">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Alex"
                className="w-full bg-[#0F151B] border border-[#253141] rounded-lg px-4 py-3 text-[15px] text-white focus:outline-none focus:border-[#F97316]/50 transition-colors placeholder:text-[#4B5563]"
              />
            </div>
            <div>
              <label className="block text-[12px] font-mono text-[#9CA3AF] mb-2.5">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Chen"
                className="w-full bg-[#0F151B] border border-[#253141] rounded-lg px-4 py-3 text-[15px] text-white focus:outline-none focus:border-[#F97316]/50 transition-colors placeholder:text-[#4B5563]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-mono text-[#9CA3AF] mb-2.5">Professional Bio</label>
            <textarea
              rows={4}
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Tell us about your background..."
              className="w-full bg-[#0F151B] border border-[#253141] rounded-lg px-4 py-3 text-[15px] text-white leading-relaxed resize-none focus:outline-none focus:border-[#F97316]/50 transition-colors placeholder:text-[#4B5563]"
            />
            <div className="text-right mt-1.5">
              <span className={`text-[11px] font-mono ${formData.bio.length > 300 ? 'text-red-500' : 'text-[#6B7280]'}`}>
                {formData.bio.length} / 300
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[12px] font-mono text-[#9CA3AF] mb-2.5">GitHub Handle</label>
              <div className="flex items-center bg-[#0F151B] border border-[#253141] rounded-lg overflow-hidden focus-within:border-[#F97316]/50 transition-colors">
                <span className="text-[13px] text-[#6B7280] pl-4 font-mono shrink-0">github.com/</span>
                <input
                  type="text"
                  name="githubHandle"
                  value={formData.githubHandle}
                  onChange={handleChange}
                  placeholder="username"
                  className="flex-1 bg-transparent px-1 py-3 text-[15px] text-white focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-mono text-[#9CA3AF] mb-2.5">Portfolio URL</label>
              <input
                type="text"
                name="portfolioUrl"
                value={formData.portfolioUrl}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full bg-[#0F151B] border border-[#253141] rounded-lg px-4 py-3 text-[15px] text-white focus:outline-none focus:border-[#F97316]/50 transition-colors placeholder:text-[#4B5563]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4 pt-4">
            {hasUnsavedChanges && (
              <button 
                onClick={handleDiscard}
                className="px-6 py-2.5 text-[13px] font-semibold text-[#F97316] hover:text-[#fb923c] transition-colors disabled:opacity-50"
                disabled={isPending}
              >
                Discard
              </button>
            )}
            <button 
              onClick={handleCommit}
              disabled={!hasUnsavedChanges || isPending || formData.bio.length > 300}
              className="px-6 py-2.5 text-[13px] font-bold text-white bg-[#F97316] rounded-lg hover:bg-[#fb923c] transition-all shadow-lg shadow-[#F97316]/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? "Committing..." : "Commit Changes"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
