"use client";

import { useState, useEffect, useRef } from "react";
import Fuse from "fuse.js";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Search, X, ArrowRight } from "lucide-react";
import { SearchableNote } from "@/data/mdx-utils";
import { scaleIn } from "@/animations/variants";
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
            className="relative w-full max-w-lg bg-white dark:bg-zinc-950 rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 mx-4"
          >
            <div className="flex items-center px-4 py-3 border-b border-zinc-200 dark:border-zinc-800">
              <Search className="w-5 h-5 text-zinc-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search curriculum..."
                className="flex-1 bg-transparent border-none outline-none px-3 text-lg text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400"
              />
              <button onClick={onClose} className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2">
              {results.length > 0 ? (
                results.map((note, idx) => (
                  <div
                    key={note.href}
                    onClick={() => {
                      router.push(note.href);
                      onClose();
                    }}
                    className={cn(
                      "flex flex-col p-3 rounded-xl cursor-pointer transition-colors group",
                      idx === selectedIndex ? "bg-brand-50 dark:bg-brand-900/40" : "hover:bg-zinc-50 dark:hover:bg-zinc-900"
                    )}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                          Week {note.weekNumber}
                        </span>
                        <span className="font-medium text-zinc-900 dark:text-zinc-100">{note.title}</span>
                      </div>
                      <ArrowRight className={cn("w-4 h-4 text-brand-500 transition-opacity", idx === selectedIndex ? "opacity-100" : "opacity-0 group-hover:opacity-100")} />
                    </div>
                    {note.description && (
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1">{note.description}</p>
                    )}
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                  <Search className="w-10 h-10 text-zinc-300 dark:text-zinc-700 mb-3" />
                  <p className="text-zinc-500 dark:text-zinc-400">No results found for &quot;{query}&quot;</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
