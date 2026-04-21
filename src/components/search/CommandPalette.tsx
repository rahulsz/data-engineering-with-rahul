"use client";

import { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { SearchableNote } from "@/data/mdx-utils";
import { scaleIn } from "@/lib/animations/variants";
import { cn } from "@/lib/cn";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [notes, setNotes] = useState<SearchableNote[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery("");
      // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedIndex(0);
      fetch("/api/search")
        .then(res => res.json())
        .then(data => setNotes(data))
        .catch(console.error);

      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const fuse = new Fuse(notes, {
    keys: ["title", "description", "tags"],
    threshold: 0.35,
  });

  const results = query ? fuse.search(query).map(r => r.item) : notes;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        router.push(results[selectedIndex].href);
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, router]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
            onClick={onClose}
          />
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="relative w-full max-w-lg bg-[#0F151B] rounded-2xl shadow-2xl overflow-hidden border border-[#253141] mx-4 shadow-[0_0_40px_rgba(249,115,22,0.1)]"
          >
            <div className="flex items-center px-4 py-4 border-b border-[#1A232E]">
              <Search className="w-5 h-5 text-[#F97316]/70 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search the curriculum..."
                className="flex-1 bg-transparent border-none outline-none px-4 text-[15px] font-mono text-white placeholder:text-[#4B5563]"
              />
              <button onClick={onClose} className="p-1 rounded-md text-[#6B7280] hover:text-[#E5E7EB] cursor-pointer transition-colors border border-transparent hover:border-[#374151] hover:bg-[#1A232E]">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-3 custom-scrollbar">
              {results.length > 0 ? (
                results.map((note, idx) => (
                  <div
                    key={note.href}
                    onClick={() => {
                      router.push(note.href);
                      onClose();
                    }}
                    className={cn(
                      "flex flex-col p-3 rounded-xl cursor-pointer transition-colors group mb-1",
                      idx === selectedIndex ? "bg-[#141B23] border border-[#F97316]/30" : "hover:bg-[#141B23] border border-transparent"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-3">
                        <span className={cn(
                          "text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-widest",
                          idx === selectedIndex ? "bg-[#F97316]/10 text-[#F97316]" : "bg-[#1e293b] text-[#9CA3AF]"
                        )}>
                          Week {note.weekNumber}
                        </span>
                        <span className={cn(
                          "font-semibold text-[14px]",
                          idx === selectedIndex ? "text-white" : "text-[#E5E7EB]"
                        )}>{note.title}</span>
                      </div>
                      <ArrowRight className={cn(
                        "w-4 h-4 transition-all", 
                        idx === selectedIndex ? "opacity-100 text-[#F97316] translate-x-1" : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-[#6B7280]"
                      )} />
                    </div>
                    {note.description && (
                      <p className="text-[13px] text-[#6B7280] line-clamp-1 mt-1 font-mono tracking-tight">{note.description}</p>
                    )}
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <div className="w-[48px] h-[48px] rounded-xl bg-[#141B23] border border-[#253141] flex items-center justify-center mb-4">
                    <Search className="w-6 h-6 text-[#4B5563]" />
                  </div>
                  <p className="text-[13px] font-mono text-[#6B7280]">No matching records found for <span className="text-white">"{query}"</span></p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
