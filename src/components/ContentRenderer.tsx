import { AlertTriangle, CheckCircle2, Info } from "lucide-react";
import type { ContentBlock, Section } from "../data/types";
import { CodeBlock } from "./CodeBlock";

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
