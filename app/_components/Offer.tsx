import type { CSSProperties } from "react";
import { ApplyButton } from "@/components/apply/Apply";
import { LeadForm } from "@/components/apply/LeadForm";
import { Icon } from "@/components/ui/Icon";
import { InView } from "@/components/ui/InView";
import { Eyebrow, Hl, IconTile, SectionHeading } from "@/components/ui/primitives";
import { inclusions, likedMost, softSkills } from "@/data/content";
import { contact, program } from "@/data/program";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/* ── Pricing (blue section, white card — playbook §4.25) ─────────────────── */
export function Pricing() {
  return (
    <InView as="section" aria-labelledby="pricing-title" id="pricing" className="relative overflow-hidden bg-blue py-14 text-white md:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(255_255_255/0.16)_1px,transparent_1.2px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_50%_0%,#000,transparent_70%)]" />
      <div className="container-x relative">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <Eyebrow tone="white" className="reveal">
            Fees &amp; structure
          </Eyebrow>
          <h2 id="pricing-title" className="reveal text-h2 font-normal" style={d(60)}>
            Know your course fees, <span className="rounded-[0.35em] bg-white px-[0.2em] text-blue">upfront.</span>
          </h2>
          <p className="reveal text-lead text-white/80" style={d(120)}>
            A clear picture of the total cost of the course, including all applicable charges.
          </p>
        </div>

        <div className="grid-cols-1 reveal mx-auto mt-10 grid max-w-5xl overflow-hidden rounded-[1.5rem] bg-white text-ink shadow-lift lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]" style={d(160)}>
          <div className="flex flex-col gap-6 p-6 sm:p-9">
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-sun px-3 py-1 text-xs font-medium">
                <Icon name="zap" size={13} /> Best offer
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-mint-soft px-3 py-1 text-xs font-medium text-teal">No-Cost EMI</span>
            </div>
            <div>
              <h3 className="text-h3 font-medium">{program.price.plan}</h3>
              <p className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-[clamp(2.5rem,1.6rem+3.4vw,3.5rem)] font-normal leading-none tracking-[-0.04em]">{program.price.current}</span>
                <span className="text-lg text-fog line-through decoration-2">
                  <span className="sr-only">Was </span>
                  {program.price.original}
                </span>
              </p>
              <p className="mt-3 text-[0.9375rem] text-ash">Total program fee · No-Cost EMI available</p>
            </div>
            <ApplyButton source="pricing" className="w-full justify-between">
              Secure Your Seat Today
            </ApplyButton>
            <a href={contact.phoneHref} className="-mt-2 inline-flex min-h-11 items-center gap-2 text-sm text-slate hover:text-ink">
              <Icon name="phone" size={16} /> Questions about EMI? Call {contact.phone}
            </a>
          </div>
          <div className="border-t border-line bg-mist/70 p-6 sm:p-9 lg:border-l lg:border-t-0">
            <p className="text-eyebrow font-medium uppercase text-ash">What&apos;s included</p>
            <ul className="grid-cols-1 mt-5 grid gap-x-6 gap-y-3.5 sm:grid-cols-2">
              {inclusions.map((x) => (
                <li key={x} className="flex gap-2.5 text-[0.9375rem] leading-snug">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-mint text-ink">
                    <Icon name="check" size={12} strokeWidth={3} />
                  </span>
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </InView>
  );
}

/* ── Ready to start + Soft Skill Training (was black — now white) ───────── */
export function SoftSkills() {
  return (
    <InView as="section" aria-labelledby="softskills-title" className="bg-white py-14 md:py-20">
      <div className="grid-cols-1 container-x grid items-start gap-10 lg:grid-cols-[25rem_minmax(0,1fr)] lg:gap-14">
        <div className="reveal order-2 rounded-[1.5rem] border border-line bg-mist p-5 sm:p-7 lg:order-1">
          <h3 className="text-[1.5rem] font-normal leading-tight tracking-tight">Ready to start your Full Stack journey?</h3>
          <p className="mb-5 mt-2 text-[0.9375rem] text-ash">Apply now and get a free consultation to see if it&apos;s the right fit for you.</p>
          <LeadForm source="softskills-form" compact />
        </div>
        <div className="order-1 flex flex-col gap-8 lg:order-2">
          <SectionHeading
            id="softskills-title"
            align="left"
            eyebrow={<Eyebrow>Our program</Eyebrow>}
            title={
              <>
                Soft skill <Hl>training.</Hl>
              </>
            }
            sub="Essential skills for personal and professional growth."
          />
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {softSkills.map((s, i) => (
              <li key={s.title} className="reveal flex flex-col gap-4 rounded-card border border-line bg-white p-4 shadow-soft sm:p-5" style={d(i * 60)}>
                <IconTile name={s.icon} tone={s.tone} size="sm" />
                <span className="text-[0.9375rem] font-medium leading-snug">{s.title}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </InView>
  );
}

/* ── Future-proof CTA (was dark — now mint gradient) ─────────────────────── */
export function FinalCta() {
  return (
    <InView as="section" aria-labelledby="final-title" className="relative overflow-hidden bg-[linear-gradient(160deg,#e9fbf2_0%,#bff8de_55%,#afe8ff_100%)] py-16 md:py-24">
      <div className="bg-dots" />
      <div className="container-x relative flex flex-col items-center gap-5 text-center">
        <Eyebrow live className="reveal">
          Next batch
        </Eyebrow>
        <h2 id="final-title" className="reveal max-w-3xl text-h1 font-normal" style={d(60)}>
          Future-proof your career <Hl as="marker">with AI.</Hl>
        </h2>
        <p className="reveal max-w-2xl text-lead text-slate" style={d(120)}>
          Developers who master AI tools will lead the next era of software engineering. This course prepares you for that shift —
          with real skills, real projects and real AI workflows.
        </p>
        <div className="reveal mt-2 flex flex-col gap-3 sm:flex-row" style={d(180)}>
          <ApplyButton source="final-cta">Start Your AI Journey</ApplyButton>
          <a href="#pricing" className="inline-flex min-h-11 items-center justify-center gap-2 px-2 font-medium underline decoration-ink/30 decoration-2 underline-offset-[6px] hover:decoration-ink">
            See fees &amp; EMI
          </a>
        </div>
      </div>
    </InView>
  );
}

/* ── What our students like most + phone ─────────────────────────────────── */
export function LikedMost() {
  return (
    <InView as="section" aria-labelledby="liked-title" className="bg-mist py-12 md:py-16">
      <div className="grid-cols-1 container-x grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <div>
          <h2 id="liked-title" className="reveal text-h2 font-normal">
            What our students like most about the program
          </h2>
          <p className="reveal mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-ash" style={d(60)}>
            Our support team is here to help you kick off your learning journey, and we&apos;re just a message away if you hit any bumps along the
            way.
          </p>
          <ul className="reveal mt-5 flex flex-wrap gap-2" style={d(120)}>
            {likedMost.map((l) => (
              <li key={l} className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-sm">
                <span className="size-1.5 rounded-full bg-mint-deep" /> {l}
              </li>
            ))}
          </ul>
        </div>
        <a
          href={contact.phoneHref}
          className="reveal group flex items-center gap-4 rounded-card bg-[linear-gradient(110deg,var(--color-sky-soft),var(--color-mint-soft)_55%,#fbf59a)] p-5 transition-transform hover:-translate-y-0.5 sm:p-6"
          style={d(160)}
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-ink text-mint">
            <Icon name="phone" size={22} />
          </span>
          <span className="flex flex-col">
            <span className="text-sm text-slate">For any doubts related to this course</span>
            <span className="text-xl font-medium tracking-tight">{contact.phone}</span>
          </span>
          <Icon name="arrowUpRight" size={20} className="ml-auto shrink-0 transition-transform group-hover:rotate-45" />
        </a>
      </div>
    </InView>
  );
}
