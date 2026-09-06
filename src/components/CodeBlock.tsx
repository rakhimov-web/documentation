import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { highlightJs } from "../lib/highlight";
import type { CodeExample } from "../data/types";

export function CodeBlock({ example }: { example: CodeExample }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(example.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // clipboard not available — silently ignore
    }
  };

  const html = highlightJs(example.code);

  return (
    <div className="border border-hairline bg-inverse-canvas text-inverse-ink">
      <div className="flex items-center justify-between px-4 py-2 border-b border-inverse-surface-1">
        <span className="text-xs text-inverse-ink-muted font-mono tracking-wide">
          {example.caption ?? example.language ?? "javascript"}
        </span>
        <button
          onClick={onCopy}
          className="flex items-center gap-1.5 text-xs text-inverse-ink-muted hover:text-inverse-ink transition-colors cursor-pointer"
          aria-label="Kodni nusxalash"
        >
          {copied ? (
            <>
              <Check size={14} strokeWidth={2} />
              Nusxalandi
            </>
          ) : (
            <>
              <Copy size={14} strokeWidth={2} />
              Nusxalash
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto overflow-y-auto max-h-[70vh] p-4 text-[13px] leading-6 font-mono m-0">
        <code dangerouslySetInnerHTML={{ __html: html }} />
      </pre>
    </div>
  );
}
