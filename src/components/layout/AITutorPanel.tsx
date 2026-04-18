"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Terminal, Send, SearchCode, Database } from "lucide-react";
import { cn } from "@/lib/cn";

export default function AITutorPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "assistant", content: "Initializing Elite Sandbox Context...\n\nHow can I assist you with this curriculum module?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    
    // Mock AI Response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: `I've analyzed the current curriculum context regarding "${userMsg}". Here is a helpful tip: Make sure your SELECT statements match the required schema aliases! Drop a code block in here if you need me to debug it.`
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.3)] transition-all",
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100 bg-[#1A232E] border-2 border-[#38bdf8] text-[#38bdf8] hover:bg-[#38bdf8] hover:text-[#0B111A]"
        )}
      >
        <Sparkles className="w-6 h-6" />
      </motion.button>

      {/* Slide-out Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 z-[100] w-full sm:w-[400px] h-screen bg-[#0F151B]/95 backdrop-blur-xl border-l border-[#253141] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-[#1A232E] bg-[#141B23]">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#38bdf8]/10 rounded-lg text-[#38bdf8]">
                  <Terminal className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-white tracking-tight">AI Co-Pilot</h3>
                  <p className="text-[10px] font-mono text-[#38bdf8] tracking-widest uppercase">Context: Module 6.0</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-lg text-[#6B7280] hover:bg-[#1A232E] hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions */}
            <div className="px-5 py-3 border-b border-[#1A232E] flex gap-2 overflow-x-auto custom-scrollbar flex-shrink-0">
              <button onClick={() => setInput("Explain this concept")} className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1A232E] hover:bg-[#253141] text-[11px] font-mono text-[#9CA3AF] transition-colors whitespace-nowrap">
                <Sparkles className="w-3 h-3 text-[#F97316]" /> Explain Concept
              </button>
              <button onClick={() => setInput("Debug my SQL query")} className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1A232E] hover:bg-[#253141] text-[11px] font-mono text-[#9CA3AF] transition-colors whitespace-nowrap">
                <SearchCode className="w-3 h-3 text-[#22c55e]" /> Debug Query
              </button>
              <button onClick={() => setInput("Generate sample table")} className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1A232E] hover:bg-[#253141] text-[11px] font-mono text-[#9CA3AF] transition-colors whitespace-nowrap">
                <Database className="w-3 h-3 text-[#38bdf8]" /> Sample DB
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={cn("flex w-full", msg.role === "user" ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3 text-[13px] leading-relaxed",
                    msg.role === "user" 
                      ? "bg-[#38bdf8] text-[#05080b] font-semibold rounded-br-sm" 
                      : "bg-[#1A232E] border border-[#253141] text-[#D1D5DB] font-mono rounded-tl-sm whitespace-pre-wrap"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Footer */}
            <div className="p-4 border-t border-[#1A232E] bg-[#141B23]">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask the Co-Pilot..."
                  className="w-full bg-[#0B111A] border border-[#253141] rounded-xl pl-4 pr-12 py-3.5 text-[13px] text-white focus:outline-none focus:border-[#38bdf8]/50 transition-colors placeholder:text-[#4B5563]"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="absolute right-2 p-2 rounded-lg bg-[#38bdf8] text-[#0B111A] disabled:opacity-50 disabled:bg-[#1A232E] disabled:text-[#6B7280] transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
