"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ApplyButton } from "@/components/apply/Apply";
import { Icon } from "@/components/ui/Icon";
import { InView } from "@/components/ui/InView";
import { Rich } from "@/components/ui/Rich";
import { Eyebrow, Hl, MediaSlot, Placeholder, SectionHeading } from "@/components/ui/primitives";
import { hiringCompanies, linkedinPosts, recognition, testimonials } from "@/data/content";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/* ── Shared: horizontal snap scroller with prev/next + index ─────────────── */
function useScroller(count: number) {
  const ref = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const on = () => {
      const first = el.firstElementChild as HTMLElement | null;
      if (!first) return;
      const step = first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
      setIndex(Math.min(count - 1, Math.round(el.scrollLeft / step)));
    };
    el.addEventListener("scroll", on, { passive: true });
    return () => el.removeEventListener("scroll", on);
  }, [count]);
  const go = (dir: 1 | -1) => {
    const el = ref.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    const step = first.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };
  return { ref, index, go };
}

function ArrowBtn({ dir, onClick, label }: { dir: 1 | -1; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="grid size-11 place-items-center rounded-full border border-line bg-white text-ink transition-colors hover:border-ink"
    >
      <Icon name={dir === 1 ? "arrowRight" : "arrowLeft"} size={18} />
    </button>
  );
}

/* ── Testimonials ─────────────────────────────────────────────────────────── */
export function Testimonials() {
  const { ref, index, go } = useScroller(testimonials.length);
  return (
    <InView as="section" aria-labelledby="testimonials-title" id="testimonials" className="bg-mist py-14 md:py-20">
      <div className="container-x">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            id="testimonials-title"
            align="left"
            eyebrow={<Eyebrow>Student stories</Eyebrow>}
            title={
              <>
                What our students <Hl>say.</Hl>
              </>
            }
          />
          <div className="reveal flex items-center gap-3">
            <span className="font-mono text-sm text-ash" aria-live="polite">
              {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </span>
            <ArrowBtn dir={-1} onClick={() => go(-1)} label="Previous testimonial" />
            <ArrowBtn dir={1} onClick={() => go(1)} label="Next testimonial" />
          </div>
        </div>

        <ul ref={ref} className="no-scrollbar -mx-4 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 sm:mx-0 sm:scroll-px-0 sm:px-0">
          {testimonials.map((t, i) => (
            <li
              key={t.name}
              className="grid-cols-1 reveal grid w-[88%] shrink-0 snap-start overflow-hidden rounded-card border border-line bg-white shadow-soft sm:w-[46rem] sm:grid-cols-[15rem_1fr]"
              style={d(i * 80)}
            >
              <MediaSlot src={t.photo} alt={`Photo of ${t.name}`} label="[PHOTO]" className="h-56 w-full sm:h-full" tone="sky" />
              <figure className="flex flex-col gap-4 p-5 sm:p-7">
                <div className="flex gap-1 text-blue" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Icon key={s} name="star" size={18} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <p className="text-h3 font-medium">
                  <Rich text={t.title} />
                </p>
                <blockquote className="text-[0.9375rem] leading-relaxed text-slate">
                  <Rich text={t.quote} />
                </blockquote>
                <figcaption className="mt-auto border-t border-line pt-4">
                  <span className="block font-medium">{t.name}</span>
                  <span className="text-sm text-ash">{t.role}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-ash">
          <Placeholder>[NEEDS INPUT: remaining 13 testimonials + photos from the live carousel]</Placeholder>
        </p>

        <div className="reveal mt-8 flex justify-center">
          <ApplyButton source="testimonials" variant="dark">
            Begin Your Journey Now
          </ApplyButton>
        </div>
      </div>
    </InView>
  );
}

/* ── Where do our students work? ─────────────────────────────────────────── */
export function Hiring() {
  const row = [...hiringCompanies, ...hiringCompanies];
  return (
    <InView as="section" aria-labelledby="hiring-title" className="bg-white py-12 md:py-16">
      <div className="container-x">
        <SectionHeading
          id="hiring-title"
          eyebrow={<Eyebrow>Alumni outcomes</Eyebrow>}
          title={
            <>
              Where do our students <Hl as="green">work?</Hl>
            </>
          }
        />
      </div>
      <div className="marquee reveal mt-8 overflow-hidden" style={d(120)}>
        <ul className="marquee-track flex w-max animate-marquee gap-3 py-1" aria-label="Companies where our students work">
          {row.map((c, i) => (
            <li
              key={`${c}-${i}`}
              aria-hidden={i >= hiringCompanies.length}
              className="grid h-16 min-w-[10.5rem] place-items-center rounded-xl border border-line bg-white px-6 text-[0.9375rem] font-semibold tracking-tight text-slate"
            >
              {c}
            </li>
          ))}
        </ul>
      </div>
      <p className="container-x mt-4 text-center">
        <Placeholder>[NEEDS INPUT: full company list + logos]</Placeholder>
      </p>
    </InView>
  );
}

/* ── Recognised by ───────────────────────────────────────────────────────── */
export function Recognition() {
  return (
    <InView as="section" aria-labelledby="recognition-title" className="bg-white py-14 md:py-20">
      <div className="container-x">
        <SectionHeading
          id="recognition-title"
          eyebrow={<Eyebrow>Awards</Eyebrow>}
          title={
            <>
              We are <Hl as="sun">recognised</Hl> by
            </>
          }
          sub={<Rich text={recognition.sub} />}
        />
        <ul className="grid-cols-1 mt-10 grid gap-4 sm:grid-cols-3">
          {recognition.cards.map((c, i) => (
            <li key={c} className="reveal group relative overflow-hidden rounded-card border border-line" style={d(i * 80)}>
              <MediaSlot alt={`${c} photo`} label="[PHOTO]" className="aspect-[4/3] w-full" tone={(["cream", "ice", "mint"] as const)[i]} />
              <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-xl bg-white/95 px-3.5 py-2.5 shadow-soft">
                <Icon name="award" size={18} className="text-mint-deep" />
                <span className="text-[0.9375rem] font-medium">{c}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </InView>
  );
}

/* ── LinkedIn activity (sun yellow) ─────────────────────────────────────── */
export function LinkedIn() {
  return (
    <InView as="section" aria-labelledby="linkedin-title" id="linkedin-activity" className="bg-sun py-14 md:py-20">
      <div className="container-x">
        <SectionHeading
          id="linkedin-title"
          eyebrow={<Eyebrow>In public</Eyebrow>}
          title={
            <>
              Our students&apos; <span className="rounded-[0.35em] bg-ink px-[0.22em] text-white">LinkedIn</span> activity
            </>
          }
          sub={<span className="text-slate">Our students actively share their learning journey and projects on LinkedIn.</span>}
        />
        <ul className="grid-cols-1 mt-10 grid gap-4 md:grid-cols-3">
          {linkedinPosts.map((p, i) => (
            <li key={p.name} className="reveal flex flex-col rounded-card border border-ink/10 bg-white p-5 shadow-soft sm:p-6" style={d(i * 80)}>
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-full bg-blue font-mono text-sm font-medium text-white">{p.initials}</span>
                <span className="flex flex-col leading-tight">
                  <span className="font-medium">{p.name}</span>
                  <span className="text-sm text-ash">{p.role}</span>
                </span>
                <span className="ml-auto grid size-8 place-items-center rounded-md bg-[#0a66c2] text-white">
                  <Icon name="linkedin" size={15} />
                </span>
              </div>
              <p className="mt-4 line-clamp-6 text-[0.9375rem] leading-relaxed text-slate">{p.text}</p>
              <div className="mt-auto pt-5">
                {p.href ? (
                  <a href={p.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 font-medium text-blue-deep underline-offset-4 hover:underline">
                    View post on LinkedIn <Icon name="arrowUpRight" size={16} />
                  </a>
                ) : (
                  <Placeholder>[LINK: LinkedIn post URL]</Placeholder>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </InView>
  );
}

