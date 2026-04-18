"use client";

import React, { useState, useEffect } from "react";
import { Play, Database, Loader2 } from "lucide-react";

declare global {
  interface Window {
    initSqlJs: any;
  }
}

export default function LiveSqlBlock({ code, children }: { code: string, children: React.ReactNode }) {
  const [output, setOutput] = useState<{ columns: string[], values: any[][] }[] | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isInitializing, setIsInitializing] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  const initSqlMode = async () => {
    if (window.initSqlJs) {
      setIsReady(true);
      return window.initSqlJs;
    }

    if (!window.initSqlJs) {
      setIsInitializing(true);
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js";
        script.onload = async () => {
          setIsReady(true);
          setIsInitializing(false);
          resolve(window.initSqlJs);
        };
        document.body.appendChild(script);
      });
    }
    return null;
  };

  const handleRun = async () => {
    setIsRunning(true);
    setErrorMsg("");
    setOutput(null);
    
    try {
      const initSql = await initSqlMode();
      const SQL = await initSql({
        locateFile: (file: string) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}`
      });
      
      const db = new SQL.Database();
      
      // Execute the query
      const results = db.exec(code);
      
      if (results.length === 0) {
        setOutput([]); // Successful execution but no rows returned (e.g. CREATE TABLE)
      } else {
        setOutput(results);
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col rounded-md border border-[#253141] bg-[#0B111A] overflow-hidden my-6 shadow-lg shadow-black/20 group">
      
      {/* Editor Header with Run Button */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#141B23] border-b border-[#253141]">
        <div className="flex items-center space-x-2 text-[12px] font-mono text-[#9CA3AF] uppercase tracking-widest">
          <Database size={14} className="text-[#38bdf8]" />
          <span>Live SQLite Sandbox</span>
        </div>
        
        <button
          onClick={handleRun}
          disabled={isRunning || isInitializing}
          className="flex items-center space-x-1.5 bg-[#38bdf8]/10 hover:bg-[#38bdf8]/20 text-[#38bdf8] px-4 py-1.5 rounded text-[11px] uppercase tracking-widest font-bold transition-all duration-200 disabled:opacity-50 cursor-pointer border border-[#38bdf8]/20"
        >
          {isInitializing ? (
            <><Loader2 size={12} className="animate-spin" /> <span>Loading Engine...</span></>
          ) : isRunning ? (
            <><Loader2 size={12} className="animate-spin" /> <span>Executing...</span></>
          ) : (
            <><Play size={12} className="fill-current" /> <span>RUN QUERY</span></>
          )}
        </button>
      </div>

      {/* The raw code block passed through from MDX */}
      <div className="p-4 bg-[#0B111A] overflow-x-auto text-[13px] sm:text-sm custom-scrollbar">
        <pre className="m-0 break-words w-full">
          <code className="block hljs language-sql">{children}</code>
        </pre>
      </div>

      {/* Output Terminal */}
      {(output !== null || errorMsg) && (
        <div className="px-4 py-4 bg-[#05080b] border-t border-[#253141]">
          <div className="text-[#556070] mb-3 uppercase tracking-widest text-[10px] font-mono font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" /> Output Results:
          </div>
          
          {errorMsg ? (
            <pre className="text-red-400 font-mono text-[12px] whitespace-pre-wrap bg-red-400/5 p-3 rounded border border-red-400/20">
              ERROR: {errorMsg}
            </pre>
          ) : output !== null && output.length === 0 ? (
            <div className="text-[#22c55e] font-mono text-[12px] italic">
              ✅ Query executed successfully (0 rows returned)
            </div>
          ) : (
            <div className="overflow-x-auto custom-scrollbar">
              {output?.map((result, i) => (
                <table key={i} className="min-w-full text-left text-[12px] text-white border-collapse mb-4 last:mb-0">
                  <thead className="bg-[#141B23]">
                    <tr>
                      {result.columns.map((col, j) => (
                        <th key={j} className="px-4 py-2 border border-[#253141] font-mono text-[#F97316] whitespace-nowrap">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#253141]">
                    {result.values.map((row, j) => (
                      <tr key={j} className="hover:bg-[#1C2532] transition-colors">
                        {row.map((val, k) => (
                          <td key={k} className="px-4 py-2 border border-[#253141] font-mono whitespace-nowrap text-[#D1D5DB]">
                            {val !== null ? String(val) : <span className="text-[#6B7280] italic">NULL</span>}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
