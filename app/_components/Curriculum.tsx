"use client";

import { useState, type CSSProperties } from "react";
import { ApplyButton } from "@/components/apply/Apply";
import { Icon } from "@/components/ui/Icon";
import { InView } from "@/components/ui/InView";
import { cx, Eyebrow, Hl, Placeholder, SectionHeading } from "@/components/ui/primitives";
import { coreModules, mentorCompanies, totalLessons } from "@/data/content";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;
type Tab = "core" | "ai";

export function Curriculum() {
  const [tab, setTab] = useState<Tab>("core");
  const [open, setOpen] = useState<number | null>(1);

  return (
    <InView as="section" aria-labelledby="curriculum-title" id="curriculum" className="bg-white py-14 md:py-20">
      <div className="container-x">
        <SectionHeading
          id="curriculum-title"
          eyebrow={<Eyebrow>Curriculum</Eyebrow>}
          title={
            <>
              Here&apos;s what you&apos;ll be <Hl>learning.</Hl>
            </>
          }
          sub="Master full stack web development with practical projects and the concepts behind them."
        />

        <div className="grid-cols-1 mt-10 grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-10">
          {/* Summary rail */}
          <aside className="reveal lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-card border border-line bg-mist p-5 sm:p-6">
              <dl className="grid grid-cols-3 gap-3 lg:grid-cols-1 lg:gap-4">
                {[
                  { k: String(coreModules.length), v: "Core modules" },
                  { k: String(totalLessons), v: "Lessons" },
                  { k: "10+", v: "Real-time projects" },
                ].map((s) => (
                  <div key={s.v} className="flex flex-col gap-0.5 lg:flex-row lg:items-baseline lg:justify-between lg:border-b lg:border-line lg:pb-3 lg:last:border-0 lg:last:pb-0">
                    <dt className="order-2 text-xs text-ash sm:text-sm lg:order-1">{s.v}</dt>
                    <dd className="order-1 font-mono text-[1.75rem] leading-none tracking-tight lg:order-2">{s.k}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 hidden lg:block">
                <ApplyButton source="curriculum-brochure" variant="dark" icon="download" className="w-full justify-between">
                  Get the Full Curriculum
                </ApplyButton>
                <p className="mt-2.5 text-xs leading-relaxed text-ash">We&apos;ll send the brochure after a quick call-back request.</p>
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            {/* Tabs */}
            <div role="tablist" aria-label="Module type" className="reveal inline-flex rounded-xl border border-line bg-mist p-1">
              {(
                [
                  { id: "core", label: "Core Modules" },
                  { id: "ai", label: "AI Modules", badge: "New" },
                ] as const
              ).map((t) => (
                <button
                  key={t.id}
                  role="tab"
                  id={`tab-${t.id}`}
                  aria-selected={tab === t.id}
                  aria-controls={`panel-${t.id}`}
                  onClick={() => setTab(t.id)}
                  className={cx(
                    "inline-flex min-h-11 items-center gap-2 rounded-lg px-4 text-[0.9375rem] font-medium transition-colors sm:px-5",
                    tab === t.id ? "bg-ink text-white shadow-soft" : "text-slate hover:text-ink",
                  )}
                >
                  {t.id === "ai" && <Icon name="bot" size={17} />}
                  {t.label}
                  {"badge" in t && (
                    <span className={cx("rounded px-1.5 py-0.5 font-mono text-xs uppercase", tab === t.id ? "bg-mint text-ink" : "bg-sky-soft text-blue-deep")}>
                      {t.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {tab === "core" ? (
              <ol id="panel-core" role="tabpanel" aria-labelledby="tab-core" className="mt-5 overflow-hidden rounded-card border border-line bg-white">
                {coreModules.map((m, i) => {
                  const isOpen = open === m.n;
                  return (
                    <li key={m.n} className="reveal border-b border-line last:border-0" style={d(Math.min(i, 6) * 40)}>
                      <h3>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`mod-${m.n}`}
                          onClick={() => setOpen(isOpen ? null : m.n)}
                          className={cx(
                            "flex min-h-16 w-full items-center gap-3 px-4 py-3.5 text-left transition-colors sm:gap-4 sm:px-5",
                            isOpen ? "bg-ice/60" : "hover:bg-mist/70",
                          )}
                        >
                          <span
                            className={cx(
                              "grid size-9 shrink-0 place-items-center rounded-lg font-mono text-sm transition-colors",
                              isOpen ? "bg-ink text-mint" : "bg-mist text-slate",
                            )}
                          >
                            {String(m.n).padStart(2, "0")}
                          </span>
                          <span className="min-w-0 flex-1 text-[0.9875rem] font-medium leading-snug sm:text-base">{m.title}</span>
                          <span className="hidden shrink-0 items-center gap-1.5 text-sm text-ash sm:inline-flex">
                            <Icon name="book" size={15} /> {m.lessons} lessons
                          </span>
                          <Icon name="chevronDown" size={18} className={cx("shrink-0 text-ash transition-transform duration-300", isOpen && "rotate-180")} />
                        </button>
                      </h3>
                      <div
                        id={`mod-${m.n}`}
                        role="region"
                        aria-label={m.title}
                        hidden={!isOpen}
                        className="px-4 pb-5 pt-1 sm:pl-[4.25rem] sm:pr-5"
                      >
                        <p className="mb-3 text-sm text-ash sm:hidden">{m.lessons} lessons</p>
                        {m.topics ? (
                          <ul className="flex flex-col gap-2">
                            {m.topics.map((t) => (
                              <li key={t} className="flex items-center gap-3 rounded-lg border border-line bg-white px-3 py-2.5 text-[0.9375rem]">
                                <Icon name="video" size={17} className="shrink-0 text-blue" />
                                <span className="flex-1">{t}</span>
                                <span className="hidden rounded bg-sun/70 px-1.5 py-0.5 font-mono text-xs uppercase sm:inline">Lesson</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <Placeholder>[NEEDS INPUT: lesson list for module {m.n}]</Placeholder>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            ) : (
              <div id="panel-ai" role="tabpanel" aria-labelledby="tab-ai" className="mt-5 rounded-card border border-dashed border-fog bg-ice/60 p-6 sm:p-8">
                <span className="grid size-12 place-items-center rounded-xl bg-tile-blue text-white">
                  <Icon name="bot" size={24} />
                </span>
                <h3 className="mt-4 text-h3 font-medium">AI-integrated modules for modern development workflows</h3>
                <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-ash">
                  AI-assisted learning, smarter debugging, code optimisation and real workflow training run alongside the core modules.
                </p>
                <div className="mt-4">
                  <Placeholder>[NEEDS INPUT: AI Modules list from the live page]</Placeholder>
                </div>
              </div>
            )}

            <div className="mt-5 lg:hidden">
              <ApplyButton source="curriculum-brochure" variant="dark" icon="download" className="w-full justify-between sm:w-auto">
                Get the Full Curriculum
              </ApplyButton>
            </div>
          </div>
        </div>

        {/* Mentors' companies */}
        <div className="reveal mt-12 rounded-card border border-line bg-mist p-5 sm:p-7">
          <p className="text-center text-[0.9375rem] text-slate">
            Learn full stack web development from <strong className="font-medium text-ink">mentors who have worked with</strong> companies like
          </p>
          <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-7">
            {mentorCompanies.map((c) => (
              <li key={c} className="grid h-16 place-items-center rounded-xl border border-line bg-white px-3 text-center text-[0.9375rem] font-semibold tracking-tight text-slate">
                {/* Swap for the company logo (absolute 70%×88% box, object-contain) once supplied. */}
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </InView>
  );
}
