import type { CSSProperties, ReactNode } from "react";
import { ApplyButton } from "@/components/apply/Apply";
import { LeadForm } from "@/components/apply/LeadForm";
import { Icon } from "@/components/ui/Icon";
import { InView } from "@/components/ui/InView";
import { IconTile } from "@/components/ui/primitives";
import { heroFacts } from "@/data/content";
import { program } from "@/data/program";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <InView as="section" aria-labelledby="hero-title" className="relative overflow-hidden bg-mist pb-14 pt-8 md:pb-20 md:pt-12">
      <div className="bg-dots" />
      <div className="glow -left-24 top-10 size-[22rem] bg-sky-soft" />
      <div className="glow -right-24 bottom-0 size-[20rem] bg-mint-soft [animation-delay:-6s]" />

      <div className="grid-cols-1 container-x relative grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_25rem] lg:gap-12">
        {/* ── Left: promise ─────────────────────────────────────────── */}
        <div className="flex flex-col items-start">
          <p className="reveal inline-flex items-center gap-2.5 rounded-full border border-line bg-white py-1.5 pl-1.5 pr-4 text-sm font-medium shadow-soft">
            <span className="grid size-7 place-items-center rounded-full bg-blue text-white">
              <Icon name="wifi" size={15} strokeWidth={2.5} />
            </span>
            {program.mode}
            <span aria-hidden className="size-1.5 animate-pulse-dot rounded-full bg-mint-border" />
          </p>

          <h1 id="hero-title" className="reveal mt-6 text-[clamp(2.2rem,1.2rem+3.6vw,4rem)] font-normal leading-[1.06] tracking-[-0.035em]" style={d(80)}>
            Become an{" "}
            <span className="whitespace-nowrap">
              <span className="hl-pill relative inline-flex items-center gap-[0.08em] align-baseline">
                <Icon name="sparkles" className="size-[0.62em] -translate-y-[0.04em]" strokeWidth={2.25} />
                AI
              </span>‑Powered
            </span>{" "}
            <span className="whitespace-nowrap">Full Stack</span> Developer in{" "}
            <NumTile tone="bg-sun">{program.trainingMonths}</NumTile> Months{" "}
            <NumTile tone="bg-mint">+{program.internshipMonths}</NumTile>{" "}
            <span className="whitespace-nowrap">Month Internship.</span>
          </h1>

          <p className="reveal mt-5 max-w-xl text-lead text-ash" style={d(160)}>
            A live online program in Tamil. Learn full stack development with AI built into your workflow — through
            real-time projects, weekend sessions with industry mentors and a path to an internship.
          </p>

          <ul className="reveal mt-7 grid w-full grid-cols-2 gap-2.5 sm:grid-cols-3" style={d(220)}>
            {heroFacts.map((f) => (
              <li key={f.title} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-2.5 pr-3 shadow-soft">
                <IconTile name={f.icon} tone={f.tone} size="sm" />
                <span className="flex min-w-0 flex-col leading-tight">
                  <span className="text-[0.8125rem] font-semibold sm:text-sm">{f.title}</span>
                  <span className="text-xs text-ash">{f.sub}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="reveal mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center" style={d(280)}>
            <ApplyButton source="hero-primary" className="justify-between sm:justify-center">
              Start Your Full Stack Journey
            </ApplyButton>
            <ApplyButton source="hero-consultation" variant="light" icon="phone" className="justify-between sm:justify-center">
              Book a Free Consultation Call
            </ApplyButton>
          </div>
          <p className="reveal mt-4 text-sm text-ash" style={d(320)}>
            Talk to our team first — see the curriculum, projects and fees before you decide.
          </p>
        </div>

        {/* ── Right: lead form (kept from the live page) ─────────────── */}
        <div className="reveal lg:sticky lg:top-24" style={d(200)}>
          <div className="rounded-[1.5rem] border border-line bg-white p-5 shadow-lift sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <h2 className="text-h3 font-medium">Want to know more?</h2>
              <span className="rounded-full bg-mint-soft/60 px-2.5 py-1 text-xs font-medium text-teal">Free call</span>
            </div>
            <LeadForm source="hero-form" compact />
          </div>
          <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate">
            {program.languages.map((l) => (
              <li key={l} className="flex items-center gap-1.5">
                <Icon name="check" size={16} className="text-mint-deep" strokeWidth={2.75} />
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </InView>
  );
}

function NumTile({ children, tone }: { children: ReactNode; tone: string }) {
  return (
    <span
      className={`${tone} inline-grid h-[0.95em] min-w-[0.95em] -translate-y-[0.06em] place-items-center rounded-[0.18em] border border-ink/10 px-[0.14em] align-middle font-mono text-[0.72em] font-medium leading-none shadow-[0_0.06em_0_rgb(13_17_17/0.35)]`}
    >
      {children}
    </span>
  );
}
