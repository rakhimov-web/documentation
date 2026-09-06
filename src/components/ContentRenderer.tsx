import { useState } from "react";
import { AlertTriangle, CheckCircle2, ChevronDown, Info } from "lucide-react";
import type { ContentBlock, MethodDoc, Section } from "../data/types";
import { CodeBlock } from "./CodeBlock";

function MethodItem({ method }: { method: MethodDoc }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-hairline">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left cursor-pointer hover:bg-surface-1 transition-colors"
        aria-expanded={open}
      >
        <div className="flex flex-col gap-0.5 min-w-0">
          <code className="text-[14px] font-mono text-primary truncate">
            {method.signature}
          </code>
          <span className="text-[12.5px] text-ink-subtle truncate">
            {method.summary}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {!method.hasFullDoc && (
            <span className="text-[10px] uppercase tracking-wide text-ink-subtle border border-hairline px-1.5 py-0.5">
              Qisqacha
            </span>
          )}
          <ChevronDown
            size={16}
            className={`text-ink-subtle transition-transform ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {open && (
        <div className="px-4 py-4 border-t border-hairline flex flex-col gap-3 bg-canvas">
          {method.detail && (
            <p className="text-[15px] leading-[1.65] text-ink-muted m-0">
              {method.detail}
            </p>
          )}

          {method.params && method.params.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] uppercase tracking-wide text-ink-subtle">
                Parametrlar
              </span>
              <ul className="flex flex-col gap-1.5">
                {method.params.map((p, i) => (
                  <li key={i} className="text-[14px] leading-[1.5] text-ink-muted">
                    <code className="text-primary font-mono text-[13px]">{p.name}</code>
                    {" — "}
                    {p.desc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {method.returns && (
            <div className="flex flex-col gap-1">
              <span className="text-[11px] uppercase tracking-wide text-ink-subtle">
                Qaytaradi
              </span>
              <p className="text-[14px] text-ink-muted m-0">{method.returns}</p>
            </div>
          )}

          {method.example && <CodeBlock example={method.example} />}
        </div>
      )}
    </div>
  );
}

function MethodGroup({ methods }: { methods: MethodDoc[] }) {
  return (
    <div className="flex flex-col gap-2">
      {methods.map((m) => (
        <MethodItem key={m.id} method={m} />
      ))}
    </div>
  );
}

function Note({
  variant,
  text,
}: {
  variant: "info" | "warning" | "success";
  text: string;
}) {
  const config = {
    info: {
      icon: Info,
      border: "border-l-primary",
      bg: "bg-surface-1",
      iconColor: "text-primary",
    },
    warning: {
      icon: AlertTriangle,
      border: "border-l-warning",
      bg: "bg-surface-1",
      iconColor: "text-[#b28600]",
    },
    success: {
      icon: CheckCircle2,
      border: "border-l-success",
      bg: "bg-surface-1",
      iconColor: "text-success",
    },
  }[variant];

  const Icon = config.icon;

  return (
    <div
      className={`flex gap-3 ${config.bg} ${config.border} border-l-4 p-4`}
    >
      <Icon size={18} className={`shrink-0 mt-0.5 ${config.iconColor}`} />
      <p className="text-[15px] leading-relaxed text-ink-muted m-0">{text}</p>
    </div>
  );
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-[16px] leading-[1.65] text-ink-muted">
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul className="flex flex-col gap-2 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-[16px] leading-[1.6] text-ink-muted">
              <span className="text-primary font-semibold shrink-0 select-none">
                {block.ordered ? `${i + 1}.` : "—"}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "code":
      return <CodeBlock example={block.example} />;
    case "note":
      return <Note variant={block.variant} text={block.text} />;
    case "methodGroup":
      return <MethodGroup methods={block.methods} />;
    case "table":
      return (
        <div className="border border-hairline overflow-x-auto">
          <table className="w-full border-collapse text-[14px]">
            <thead>
              <tr className="bg-surface-1 border-b border-hairline">
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="text-left px-4 py-3 font-semibold text-ink whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr
                  key={ri}
                  className={ri % 2 === 1 ? "bg-surface-1" : ""}
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-4 py-3 align-top text-ink-muted border-b border-hairline last:border-b-0"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    default:
      return null;
  }
}

export function SectionView({ section }: { section: Section }) {
  return (
    <section id={section.id} className="flex flex-col gap-4 scroll-mt-24">
      <h2 className="text-[24px] leading-tight font-normal text-ink border-b border-hairline pb-3">
        {section.heading}
      </h2>
      <div className="flex flex-col gap-4">
        {section.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </section>
  );
}
