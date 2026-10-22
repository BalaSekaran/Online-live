import type { CSSProperties } from "react";
import { ApplyButton } from "@/components/apply/Apply";
import { Icon } from "@/components/ui/Icon";
import { InView } from "@/components/ui/InView";
import { Eyebrow, Hl, IconTile, Placeholder, SectionHeading } from "@/components/ui/primitives";
import { aboutCards, aiAdvantage } from "@/data/content";
import { contact } from "@/data/program";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/* ── 2. "Confused about your next career move?" — intro video ─────────────── */
export function CareerMove() {
  return (
    <InView as="section" aria-labelledby="career-move-title" className="bg-white py-14 md:py-20">
      <div className="container-x flex flex-col items-center">
        <SectionHeading
          id="career-move-title"
          eyebrow={<Eyebrow>Watch before you decide</Eyebrow>}
          title={
            <>
              Confused about your next <Hl as="marker">career move?</Hl>
            </>
          }
        />
        <div className="reveal mt-9 w-full max-w-4xl" style={d(160)}>
          <div className="rounded-[1.5rem] border border-line bg-mist p-2 shadow-lift sm:p-3">
            {/* Replace with <video controls poster=…> or a YouTube embed once the file/URL is supplied. */}
            <div className="relative grid aspect-video place-items-center overflow-hidden rounded-[1.1rem] bg-ink">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgb(0_250_145/0.18),transparent_60%),radial-gradient(ellipse_at_80%_90%,rgb(0_137_255/0.22),transparent_55%)]" />
              <button
                type="button"
                aria-label="Play intro video (video not yet connected)"
                className="relative grid size-16 place-items-center rounded-full bg-mint text-ink shadow-[0_0_0_10px_rgb(0_250_145/0.18)] transition-transform hover:scale-105 sm:size-20"
              >
                <Icon name="play" size={28} className="translate-x-0.5" />
              </button>
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                <Placeholder>[VIDEO HERE — intro video, 6:07]</Placeholder>
              </div>
            </div>
          </div>
        </div>
        <div className="reveal mt-8" style={d(220)}>
          <ApplyButton source="career-move" variant="dark" icon="phone">
            Talk to an Expert
          </ApplyButton>
        </div>
      </div>
    </InView>
  );
}

/* ── 3. About the bootcamp ────────────────────────────────────────────────── */
export function About() {
  return (
    <InView as="section" aria-labelledby="about-title" id="about" className="bg-mist py-14 md:py-20">
      <div className="container-x">
        <SectionHeading
          id="about-title"
          eyebrow={<Eyebrow>About the bootcamp</Eyebrow>}
          title={
            <>
              EMC Full Stack Development Bootcamp, <Hl>with AI.</Hl>
            </>
          }
          sub="At Error Makes Clever, we make tech simple and unforgettable."
        />

        <div className="grid-cols-1 mt-10 grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-5">
          <ul className="grid-cols-1 grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
            {aboutCards.map((c, i) => (
              <li
                key={c.title}
                className="reveal flex gap-4 rounded-card border border-line bg-white p-5 shadow-soft sm:flex-col sm:gap-5"
                style={d(i * 60)}
              >
                <IconTile name={c.icon} tone={c.tone} />
                <div>
                  <h3 className="text-h3 font-medium">{c.title}</h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ash">{c.body}</p>
                </div>
              </li>
            ))}
          </ul>

          <aside className="reveal flex flex-col justify-between gap-6 rounded-card bg-sky-soft p-6 sm:p-7" style={d(200)}>
            <div>
              <span className="grid size-11 place-items-center rounded-xl bg-white text-ink">
                <Icon name="headset" size={22} />
              </span>
              <h3 className="mt-5 text-[1.5rem] font-normal leading-tight tracking-tight">I&apos;m interested.</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-slate">
                Leave your number and our team will call you back to walk you through the program.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <ApplyButton source="about-interested" variant="dark" icon="phone" className="justify-between">
                Request a Call Back
              </ApplyButton>
              <a href={contact.phoneHref} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink">
                <Icon name="phone" size={16} /> or call {contact.phone}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </InView>
  );
}

/* ── 4. The AI Learning Advantage (was a dark band — now ice, per palette) ── */
export function AiAdvantage() {
  return (
    <InView as="section" aria-labelledby="ai-title" className="relative overflow-hidden bg-ice py-14 md:py-20">
      <div className="glow -right-32 -top-20 size-[24rem] bg-sky-soft" />
      <div className="container-x relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="ai-title"
            align="left"
            eyebrow={<Eyebrow live>AI in your workflow</Eyebrow>}
            title={
              <>
                The AI Learning <Hl as="blue">Advantage.</Hl>
              </>
            }
            sub="Gain a competitive edge with AI-assisted learning, smarter debugging and faster development workflows."
          />
        </div>
        <ol className="grid-cols-1 mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {aiAdvantage.map((c, i) => (
            <li
              key={c.title}
              className="reveal group relative flex flex-col gap-5 rounded-card border border-sky-soft bg-white p-6 shadow-soft transition-transform duration-300 hover:-translate-y-1"
              style={d(i * 80)}
            >
              <div className="flex items-center justify-between">
                <IconTile name={c.icon} tone={c.tone} size="lg" />
                <span className="font-mono text-sm text-fog">0{i + 1}</span>
              </div>
              <div>
                <h3 className="text-h3 font-medium">{c.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-ash">{c.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </InView>
  );
}
