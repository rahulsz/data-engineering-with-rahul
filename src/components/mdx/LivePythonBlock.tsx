"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Terminal, Loader2 } from "lucide-react";

declare global {
  interface Window {
    loadPyodide: any;
    pyodide: any;
  }
}

export default function LivePythonBlock({ code, children }: { code: string, children: React.ReactNode }) {
  const [output, setOutput] = useState<string>("");
  const [isInitializing, setIsInitializing] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  const initPyodide = async () => {
    if (window.pyodide) {
      setIsReady(true);
      return window.pyodide;
    }

    if (!window.loadPyodide) {
      setIsInitializing(true);
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
        script.onload = async () => {
          const pyodideInstance = await window.loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
          });
          window.pyodide = pyodideInstance;
          setIsReady(true);
          setIsInitializing(false);
          resolve(pyodideInstance);
        };
        document.body.appendChild(script);
      });
    }
    return null;
  };

  const handleRun = async () => {
    setIsRunning(true);
    let pyodide = window.pyodide;
    
    if (!pyodide) {
      pyodide = await initPyodide();
    }

    // Capture standard output
    let currentOutput = "";
    pyodide.setStdout({ batched: (msg: string) => { currentOutput += msg + "\n"; } });
    pyodide.setStderr({ batched: (msg: string) => { currentOutput += "ERROR: " + msg + "\n"; } });

    try {
      await pyodide.runPythonAsync(code);
      setOutput(currentOutput || "✅ [Execution complete, no output]");
    } catch (err: any) {
      setOutput(currentOutput + "\n" + err.message);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col rounded-md border border-home-border bg-home-surface overflow-hidden my-6 shadow-lg shadow-black/20 group">
      
      {/* Editor Header with Run Button */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0B111A] border-b border-home-border/50">
        <div className="flex items-center space-x-2 text-xs text-home-text-secondary">
          <Terminal size={14} className="text-[#38bdf8]" />
          <span>Interactive Python Kernel</span>
        </div>
        
        <button
          onClick={handleRun}
          disabled={isRunning || isInitializing}
          className="flex items-center space-x-1.5 bg-[#F97316]/10 hover:bg-[#F97316]/20 text-[#F97316] px-3 py-1.5 rounded-md text-xs font-semibold transition-all duration-200 disabled:opacity-50"
        >
          {isInitializing ? (
            <><Loader2 size={12} className="animate-spin" /> <span>Loading Kernel...</span></>
          ) : isRunning ? (
            <><Loader2 size={12} className="animate-spin" /> <span>Running...</span></>
          ) : (
            <><Play size={12} className="fill-current" /> <span>RUN</span></>
          )}
        </button>
      </div>

      {/* The raw code block passed through from MDX */}
      <div className="p-4 bg-[#0B111A] overflow-x-auto text-[13px] sm:text-sm">
        <pre className="m-0 break-words w-full">
          <code className="block hljs language-python">{children}</code>
        </pre>
      </div>

      {/* Output Terminal */}
      {output && (
        <div className="px-4 py-3 bg-[#05080b] border-t border-home-border/50 font-mono text-xs">
          <div className="text-home-text-secondary mb-1 uppercase tracking-wider text-[10px]">Console Output:</div>
          <pre className={`whitespace-pre-wrap ${output.includes("ERROR:") ? "text-red-400" : "text-[#22c55e]"}`}>
            {output}
          </pre>
        </div>
      )}
    </div>
  );
}
