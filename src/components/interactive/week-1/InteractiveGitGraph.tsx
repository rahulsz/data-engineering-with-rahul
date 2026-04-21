"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, GitCommit, GitMerge, RotateCcw } from "lucide-react";

type Node = {
  id: string;
  branch: "main" | "feature";
  x: number;
};

export default function InteractiveGitGraph() {
  const [nodes, setNodes] = useState<Node[]>([ { id: "init", branch: "main", x: 0 } ]);
  const [activeBranch, setActiveBranch] = useState<"main" | "feature">("main");
  const [featureOpen, setFeatureOpen] = useState(false);
  const [merged, setMerged] = useState(false);

  const mainNodes = nodes.filter(n => n.branch === "main" || n.id === "init");
  const featureNodes = nodes.filter(n => n.branch === "feature");

  const latestMainX = mainNodes[mainNodes.length - 1].x;
  const latestFeatureX = featureNodes.length > 0 ? featureNodes[featureNodes.length - 1].x : latestMainX;

  const handleCommit = () => {
    if (merged) return;
    const newX = activeBranch === "main" ? latestMainX + 40 : latestFeatureX + 40;
    setNodes([...nodes, { id: Math.random().toString(36).substr(2, 5), branch: activeBranch, x: newX }]);
  };

  const handleCheckout = () => {
    if (featureOpen || merged) return;
    setFeatureOpen(true);
    setActiveBranch("feature");
    setNodes([...nodes, { id: "branch", branch: "feature", x: latestMainX + 40 }]);
  };

  const handleMerge = () => {
    if (!featureOpen || merged) return;
    setMerged(true);
    setActiveBranch("main");
    setNodes([...nodes, { id: "merge", branch: "main", x: Math.max(latestMainX, latestFeatureX) + 40 }]);
  };

  const reset = () => {
    setNodes([ { id: "init", branch: "main", x: 0 } ]);
    setActiveBranch("main");
    setFeatureOpen(false);
    setMerged(false);
  };

  return (
    <div className="w-full mt-8 bg-[#0B111A] border border-[#253141] rounded-2xl shadow-xl overflow-hidden p-6 flex flex-col md:flex-row gap-6">
      
      {/* Console Input Side */}
      <div className="flex-1 bg-[#141B23] border border-[#253141] rounded-xl flex flex-col min-h-[250px]">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-[#253141] bg-[#19222E] justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ef4444]" />
            <span className="w-3 h-3 rounded-full bg-[#eab308]" />
            <span className="w-3 h-3 rounded-full bg-[#22c55e]" />
            <span className="text-xs font-mono text-[#9CA3AF] ml-2">bash ~ git simulator</span>
          </div>
          <button onClick={reset} className="text-[#6B7280] hover:text-white transition-colors">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
        
        <div className="p-4 flex flex-col gap-3 font-mono text-[13px]">
          <div className="flex items-center gap-2 text-[#9CA3AF]">
            <span className="text-[#38bdf8]">$</span> Git Commands
          </div>
          <button disabled={merged} onClick={handleCommit} className="text-left w-full px-3 py-2 bg-[#0B111A] hover:bg-[#253141]/50 border border-[#253141] rounded-lg text-[#22c55e] transition-colors disabled:opacity-50 flex items-center gap-2">
            <GitCommit className="w-4 h-4" /> git commit -m &quot;update files&quot;
          </button>
          <button disabled={featureOpen || merged} onClick={handleCheckout} className="text-left w-full px-3 py-2 bg-[#0B111A] hover:bg-[#253141]/50 border border-[#253141] rounded-lg text-[#c084fc] transition-colors disabled:opacity-50 flex items-center gap-2">
            <GitBranch className="w-4 h-4" /> git checkout -b feature
          </button>
          <button disabled={!featureOpen || merged} onClick={handleMerge} className="text-left w-full px-3 py-2 bg-[#0B111A] hover:bg-[#253141]/50 border border-[#253141] rounded-lg text-[#F97316] transition-colors disabled:opacity-50 flex items-center gap-2">
            <GitMerge className="w-4 h-4" /> git merge feature
          </button>
          <div className="mt-auto text-[10px] text-[#6B7280]">
            CURRENT BRANCH: <span className={activeBranch === "main" ? "text-[#22c55e]" : "text-[#c084fc]"}>{activeBranch}</span>
          </div>
        </div>
      </div>

      {/* Visual Graph Side */}
      <div className="flex-1 bg-[#1A2332] border border-[#253141] rounded-xl relative overflow-hidden flex items-center p-6 min-h-[250px] overflow-x-auto">
        <div className="relative w-full h-32 flex items-center min-w-[300px]">
          
          {/* Main Branch Line */}
          <div className="absolute top-[20%] left-4 h-1 bg-gradient-to-r from-[#22c55e] to-transparent w-full z-0 opacity-50" />
          
          {/* Main Nodes */}
          {mainNodes.map((n) => (
            <motion.div
              layout
              key={n.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, left: `${n.x + 20}px` }}
              className="absolute top-[20%] -translate-y-1/2 w-4 h-4 bg-[#22c55e] rounded-full border-2 border-[#141B23] z-10 shadow-[0_0_10px_rgba(34,197,94,0.5)]"
            />
          ))}

          {/* Feature Branch */}
          <AnimatePresence>
            {featureOpen && (
              <>
                {/* Feature Line */}
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 0.5, height: "60%" }}
                  className="absolute top-[20%] left-8 w-1 bg-[#c084fc] origin-top rounded-full z-0" 
                  style={{ left: `${mainNodes.find(n => n.id === "init" || mainNodes.indexOf(n) === mainNodes.length-(merged?2:1))?.x! + 26}px` }}
                />
                <motion.div 
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 0.5, width: "100%" }}
                  className="absolute top-[80%] left-8 h-1 bg-gradient-to-r from-[#c084fc] to-transparent z-0" 
                  style={{ left: `${mainNodes.find(n => n.id === "init" || mainNodes.indexOf(n) === mainNodes.length-(merged?2:1))?.x! + 26}px` }}
                />

                {/* Feature Nodes */}
                {featureNodes.map((n) => (
                  <motion.div
                    layout
                    key={n.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1, left: `${n.x + 20}px` }}
                    className="absolute top-[80%] -translate-y-1/2 w-4 h-4 bg-[#c084fc] rounded-full border-2 border-[#141B23] z-10 shadow-[0_0_10px_rgba(192,132,252,0.5)]"
                  />
                ))}

                {/* Merge Line */}
                {merged && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    className="absolute top-[20%] w-1 bg-[#F97316] origin-bottom rounded-full z-0 h-[60%]" 
                    style={{ left: `${latestMainX + 26}px` }}
                  />
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
      
    </div>
  );
}
