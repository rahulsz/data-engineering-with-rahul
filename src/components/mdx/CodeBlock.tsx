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
    <div className="my-8 overflow-hidden rounded-xl bg-[#0B111A] border border-[#1e293b]/50 relative group">
      <button
        onClick={handleCopy}
        className="absolute top-4 right-4 flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors focus:outline-none cursor-pointer opacity-0 group-hover:opacity-100"
        aria-label="Copy code"
      >
        {copied ? (
          <>
            <ClipboardCheck className="h-4 w-4 text-emerald-400" />
          </>
        ) : (
          <>
            <ClipboardCopy className="h-4 w-4" />
          </>
        )}
      </button>
      <div className="overflow-x-auto p-6 pt-6">
        <pre className="font-mono text-[13px] leading-loose text-zinc-300">
          <code className={language ? `language-${language}` : ""}>{children}</code>
        </pre>
      </div>
    </div>
  );
}
