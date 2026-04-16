"use client";

import { useState } from "react";
import { ClipboardCopy, ClipboardCheck, FileCode2 } from "lucide-react";

interface CodeBlockProps {
  children: string;
  language?: string;
  filename?: string;
}

export default function CodeBlock({ children, language, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code segment", err);
    }
  };

  return (
    <div className="my-6 overflow-hidden rounded-xl bg-zinc-950 ring-1 ring-white/10">
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800/50 bg-zinc-900/50">
        <div className="flex items-center gap-3">
          <FileCode2 className="w-4 h-4 text-zinc-500" />
          {language && (
            <span className="text-xs font-medium text-zinc-400 capitalize">
              {language}
            </span>
          )}
          {filename && (
            <span className="text-xs font-mono text-zinc-500">
              {filename}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-zinc-100 transition-colors focus:outline-none cursor-pointer px-2 py-1 rounded-md hover:bg-zinc-800"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <ClipboardCheck className="h-4 w-4 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <ClipboardCopy className="h-4 w-4" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="overflow-x-auto p-4">
        <pre className="font-mono text-sm leading-relaxed text-zinc-50">
          <code>{children}</code>
        </pre>
      </div>
    </div>
  );
}
