"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ApplyButton } from "@/components/apply/Apply";
import { InView } from "@/components/ui/InView";
import { cx, Eyebrow, Hl, IconTile, SectionHeading } from "@/components/ui/primitives";
import { journey } from "@/data/content";
import { duration, program } from "@/data/program";

/** Three phases group the 11 steps from the live page (no steps added or removed). */
const PHASES = [
  { label: "Before you join", from: 0, to: 3 },
  { label: "While you learn", from: 3, to: 8 },
  { label: "After you finish", from: 8, to: 11 },
];

export function Journey() {
  const listRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [lit, setLit] = useState(-1);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const anchor = window.innerHeight * 0.55;
        const p = Math.max(0, Math.min(1, (anchor - r.top) / r.height));
        setProgress(p);
        const nodes = el.querySelectorAll<HTMLElement>("[data-node]");
        let last = -1;
        nodes.forEach((n, i) => {
          if (n.getBoundingClientRect().top < anchor) last = i;
        });
        setLit(last);
      });
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      setLit(journey.length - 1);
      return;
    }
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  return (
    <InView as="section" aria-labelledby="journey-title" id="journey" className="bg-white py-14 md:py-20">
      <div className="container-x">
        <SectionHeading
          id="journey-title"
          eyebrow={<Eyebrow>Your journey</Eyebrow>}
          title={
            <>
              How the journey <Hl as="marker">looks.</Hl>
            </>
          }
          sub={`A cohort-based program of ${duration.sentence}, with a lifelong community to help you reach your goals.`}
        />

        <div ref={listRef} className="relative mx-auto mt-12 max-w-3xl" style={{ "--p": progress } as CSSProperties}>
          {/* Rail */}
          <div aria-hidden className="absolute bottom-6 left-[1.375rem] top-2 w-0.5 rounded-full bg-line sm:left-[1.625rem]">
            <div
              className="w-full origin-top rounded-full bg-[linear-gradient(180deg,var(--color-mint-border),var(--color-blue))] motion-reduce:!h-full"
              style={{ height: `${progress * 100}%`, transition: "height 120ms linear" }}
            />
          </div>

          {PHASES.map((ph) => (
            <div key={ph.label} className="relative">
              <p className="relative mb-4 ml-[3.75rem] mt-2 font-mono text-xs uppercase tracking-[0.12em] text-ash sm:ml-[4.75rem]">{ph.label}</p>
              <ol className="mb-8 flex flex-col gap-3" start={ph.from + 1}>
                {journey.slice(ph.from, ph.to).map((s, k) => {
                  const i = ph.from + k;
                  const on = i <= lit;
                  return (
                    <li key={s.title} data-node className="relative flex gap-4 sm:gap-6">
                      <span
                        aria-hidden
                        className={cx(
                          "relative z-10 mt-4 grid size-11 shrink-0 place-items-center rounded-full border-2 font-mono text-sm transition-all duration-500 sm:size-[3.25rem]",
                          on ? "border-mint-border bg-mint text-ink shadow-[0_0_0_6px_rgb(0_250_145/0.18)]" : "border-line bg-white text-fog",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div
                        className={cx(
                          "flex flex-1 flex-col gap-3 rounded-card border p-4 transition-[border-color,box-shadow,background-color] duration-500 sm:flex-row sm:items-start sm:gap-5 sm:p-5",
                          on ? "border-line bg-white shadow-soft" : "border-transparent bg-mist/70",
                        )}
                      >
                        <IconTile name={s.icon} tone={s.tone} />
                        <div className="min-w-0">
                          <h3 className="flex flex-wrap items-center gap-2 text-h3 font-medium">
                            {s.title}
                            {s.tag && <span className="rounded-full bg-mint px-2 py-0.5 text-xs font-medium">{s.tag}</span>}
                          </h3>
                          <p className="mt-1 text-[0.9375rem] leading-relaxed text-ash">{s.body}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col items-center gap-3 text-center">
          <ApplyButton source="journey">Begin Step 1: Book Your Call</ApplyButton>
          <p className="text-sm text-ash">Batches of {program.batchSize} learners · limited seats per batch</p>
        </div>
      </div>
    </InView>
  );
}
