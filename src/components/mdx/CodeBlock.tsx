"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

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
        <div className="flex items-center gap-4">
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
          className="text-zinc-400 hover:text-zinc-100 transition-colors focus:outline-none cursor-pointer"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
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
