"use client";

import { useState, type CSSProperties } from "react";
import { InView } from "@/components/ui/InView";
import { cx, Eyebrow, Hl, Placeholder, SectionHeading } from "@/components/ui/primitives";
import { tools } from "@/data/content";

const FILTERS = ["All Tools", "Front-end", "Back-end", "Workflow"] as const;
type Filter = (typeof FILTERS)[number];

const tone = {
  yellow: "bg-tile-yellow text-ink",
  sky: "bg-sky-soft text-ink",
  mint: "bg-tile-mint text-ink",
  blue: "bg-tile-blue text-white",
  sun: "bg-sun text-ink",
  ink: "bg-ink text-mint",
  cream: "bg-cream text-ink",
  pink: "bg-[#ffd3e8] text-ink",
} as const;

export function Tools() {
  const [f, setF] = useState<Filter>("All Tools");
  const list = f === "All Tools" ? tools : tools.filter((t) => t.group === f);

  return (
    <InView as="section" aria-labelledby="tools-title" id="tools" className="bg-mist py-14 md:py-20">
      <div className="container-x">
        <SectionHeading
          id="tools-title"
          eyebrow={<Eyebrow>Tools covered</Eyebrow>}
          title={
            <>
              Technologies you&apos;ll <Hl as="marker">work with.</Hl>
            </>
          }
          sub="Master 12+ tools directly from top industry experts."
        />

        <div role="group" aria-label="Filter tools" className="reveal no-scrollbar -mx-4 mt-8 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:justify-center sm:px-0">
          {FILTERS.map((x) => {
            const count = x === "All Tools" ? tools.length : tools.filter((t) => t.group === x).length;
            return (
              <button
                key={x}
                type="button"
                aria-pressed={f === x}
                onClick={() => setF(x)}
                className={cx(
                  "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-[0.9375rem] font-medium transition-colors",
                  f === x ? "border-ink bg-ink text-white" : "border-line bg-white text-slate hover:border-fog",
                )}
              >
                {x}
                <span className={cx("font-mono text-xs", f === x ? "text-mint" : "text-fog")}>{count}</span>
              </button>
            );
          })}
        </div>

        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6" aria-live="polite">
          {list.map((t, i) => (
            <li
              key={t.name}
              className="reveal flex items-center gap-3 rounded-2xl border border-line bg-white p-3 shadow-soft sm:flex-col sm:items-start sm:gap-4 sm:rounded-card sm:p-4"
              style={{ "--d": `${i * 35}ms` } as CSSProperties}
            >
              {/* Monogram tile — replace with the tool's logo (SVG with viewBox) when available. */}
              <span className={cx("grid size-10 shrink-0 place-items-center rounded-xl font-mono text-sm font-semibold sm:size-11", tone[t.tone])}>{t.mono}</span>
              <span className="flex min-w-0 flex-col">
                <span className="truncate text-[0.9375rem] font-medium sm:text-[0.9875rem]">{t.name}</span>
                <span className="text-xs text-ash">{t.group}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-center">
          <Placeholder>[NEEDS INPUT: confirm full 12+ tool list — derived from module titles]</Placeholder>
        </p>
      </div>
    </InView>
  );
}
