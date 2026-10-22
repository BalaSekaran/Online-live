import type { CSSProperties } from "react";
import { ApplyButton } from "@/components/apply/Apply";
import { Icon } from "@/components/ui/Icon";
import { InView } from "@/components/ui/InView";
import { Eyebrow, Hl, IconTile, MediaSlot, Placeholder, SectionHeading } from "@/components/ui/primitives";
import { certBenefits, internship, overview } from "@/data/content";
import { duration, program } from "@/data/program";

const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/* ── Build Real Projects, Yourself (mint gradient, like "Beyond a Job") ─── */
const code: Array<[number, string]> = [
  [0, "export default function Home() {"],
  [1, "const [city, setCity] = useState(\"Chennai\");"],
  [1, "const [weather, setWeather] = useState(null);"],
  [0, ""],
  [1, "useEffect(() => {"],
  [2, "fetchWeather(city).then(setWeather);"],
  [1, "}, [city]);"],
  [0, ""],
  [1, "return <Dashboard data={weather} />;"],
  [0, "}"],
];

export function Projects() {
  return (
    <InView
      as="section"
      aria-labelledby="projects-title"
      id="projects"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#e9fbf2_0%,#c8fbe3_100%)] py-14 md:py-20"
    >
      <div className="bg-dots opacity-60" />
      <div className="grid-cols-1 container-x relative grid items-center gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-14">
        <div className="flex flex-col items-start gap-6">
          <SectionHeading
            id="projects-title"
            align="left"
            eyebrow={<Eyebrow>Hands-on</Eyebrow>}
            title={
              <>
                Build real projects, <Hl as="marker">yourself.</Hl>
              </>
            }
            sub="Work in live coding sessions and turn your ideas into fully working apps from scratch."
          />
          <ul className="reveal flex flex-wrap gap-2" style={d(160)}>
            {["Udemy clone", "Greenden e-commerce", "Weather app", "Actodo (React)", "Capstone"].map((p) => (
              <li key={p} className="rounded-full border border-ink/10 bg-white/80 px-3 py-1.5 text-sm text-slate">
                {p}
              </li>
            ))}
          </ul>
          <div className="reveal" style={d(220)}>
            <ApplyButton source="projects" variant="dark" icon="phone">
              Talk to an Expert
            </ApplyButton>
          </div>
        </div>

        {/* Editor mock — illustrative, built in CSS so it stays crisp at every width */}
        <div className="reveal relative" style={d(120)}>
          <div className="overflow-hidden rounded-2xl border border-ink/80 bg-[#0f1416] shadow-lift">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 truncate rounded-md bg-white/10 px-2.5 py-1 font-mono text-xs text-white/70">Home.tsx</span>
              <span className="ml-auto hidden rounded-md bg-mint px-2 py-1 font-mono text-xs font-medium text-ink sm:inline">Live</span>
            </div>
            <div className="grid grid-cols-[auto_minmax(0,1fr)]">
              <ul className="hidden w-40 flex-col gap-1.5 border-r border-white/10 p-4 font-mono text-xs text-white/50 sm:flex">
                {["src", "  components", "  pages", "  hooks", "package.json", "README.md"].map((f) => (
                  <li key={f} className="whitespace-pre">
                    {f}
                  </li>
                ))}
              </ul>
              <pre className="overflow-hidden p-4 font-mono text-[0.75rem] leading-6 text-white/85 sm:text-[0.8125rem]">
                {code.map(([indent, line], i) => (
                  <div key={i} className="flex gap-4">
                    <span className="w-4 shrink-0 select-none text-right text-white/25">{i + 1}</span>
                    <span className="truncate" style={{ paddingLeft: `${indent * 1.25}rem` }}>
                      {line.split(/(useState|useEffect|export|default|function|return|const)/).map((t, j) =>
                        /^(useState|useEffect)$/.test(t) ? (
                          <span key={j} className="text-sky-soft">{t}</span>
                        ) : /^(export|default|function|return|const)$/.test(t) ? (
                          <span key={j} className="text-[#ff9ad5]">{t}</span>
                        ) : (
                          <span key={j}>{t}</span>
                        ),
                      )}
                      {i === 8 && <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-blink bg-mint" />}
                    </span>
                  </div>
                ))}
              </pre>
            </div>
          </div>
          <span className="absolute -left-2 top-[38%] animate-float rounded-md bg-tile-blue px-2.5 py-1 text-xs font-medium text-white shadow-soft sm:-left-4">
            You
          </span>
          <span className="absolute -right-1 bottom-[22%] animate-float rounded-md bg-[#ff9ad5] px-2.5 py-1 text-xs font-medium text-ink shadow-soft [animation-delay:-3s] sm:-right-3">
            Mentor
          </span>
        </div>
      </div>
    </InView>
  );
}

/* ── Bootcamp Overview ───────────────────────────────────────────────────── */
export function Overview() {
  return (
    <InView as="section" aria-labelledby="overview-title" className="bg-mist py-14 md:py-20">
      <div className="container-x">
        <SectionHeading
          id="overview-title"
          eyebrow={<Eyebrow>What&apos;s inside</Eyebrow>}
          title={
            <>
              Bootcamp <Hl>overview.</Hl>
            </>
          }
          sub="A complete, structured and practical learning experience designed to take you from beginner to job-ready full stack developer with clarity and confidence."
        />
        <ul className="grid-cols-1 mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {overview.map((c, i) => (
            <li key={c.title} className="reveal group overflow-hidden rounded-card border border-line bg-white shadow-soft" style={d(i * 60)}>
              <div className="relative grid h-32 place-items-center overflow-hidden bg-[linear-gradient(135deg,var(--color-ice),#fff)] sm:h-36">
                <div className="bg-dots opacity-70" />
                <span className="relative transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-[-4deg]">
                  <IconTile name={c.icon} tone={c.tone} size="lg" />
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-h3 font-medium">{c.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ash">{c.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </InView>
  );
}

/* ── Internship (ice) ────────────────────────────────────────────────────── */
export function Internship() {
  const steps = [
    { label: "All learners", w: "100%" },
    { label: "Top performers", w: "72%" },
    { label: `${duration.internship} internship`, w: "48%" },
    { label: "Full-time role*", w: "30%" },
  ];
  return (
    <InView as="section" aria-labelledby="internship-title" id="internship" className="bg-ice py-14 md:py-20">
      <div className="grid-cols-1 container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="reveal relative order-2 lg:order-1">
          <MediaSlot alt="Error Makes Clever internship ID card" label="[PHOTO — internship ID card]" className="aspect-[4/3] w-full rounded-card" tone="cream" />
          <div className="absolute -bottom-6 right-3 w-[min(19rem,85%)] rounded-2xl border border-line bg-white p-4 shadow-lift sm:right-6">
            <p className="text-eyebrow font-medium uppercase text-ash">How you get there</p>
            <ol className="mt-3 flex flex-col gap-2">
              {steps.map((s, i) => (
                <li key={s.label} className="flex items-center gap-3">
                  <span className="h-6 rounded-md bg-sky-soft grow-x" style={{ width: s.w, transitionDelay: `${200 + i * 180}ms` }} />
                  <span className="shrink-0 text-xs font-medium text-slate">{s.label}</span>
                </li>
              ))}
            </ol>
            <p className="mt-2 text-xs text-ash">*Based on performance and availability.</p>
          </div>
        </div>

        <div className="order-1 flex flex-col gap-7 lg:order-2">
          <SectionHeading
            id="internship-title"
            align="left"
            eyebrow={<Eyebrow>Internship</Eyebrow>}
            title={
              <>
                Get into our <Hl as="blue">internship</Hl> program.
              </>
            }
            sub={
              <>
                <strong className="font-medium text-ink">Top-performing students</strong> will be eligible for a{" "}
                <strong className="font-medium text-ink">{duration.internship} internship</strong>.
              </>
            }
          />
          <dl className="flex flex-col gap-3">
            {[
              { icon: "check" as const, t: "What you'll work on", b: internship.work, tone: "sun" as const },
              { icon: "users" as const, t: "How we support you", b: internship.support, tone: "pink" as const },
            ].map((r, i) => (
              <div key={r.t} className="reveal flex gap-4 rounded-2xl border border-sky-soft bg-white p-5" style={d(120 + i * 80)}>
                <IconTile name={r.icon} tone={r.tone} size="sm" />
                <div>
                  <dt className="font-medium">{r.t}</dt>
                  <dd className="mt-1 text-[0.9375rem] leading-relaxed text-ash">{r.b}</dd>
                </div>
              </div>
            ))}
          </dl>
          <div className="reveal" style={d(280)}>
            <ApplyButton source="internship">Earn Your Internship Spot</ApplyButton>
          </div>
        </div>
      </div>
    </InView>
  );
}

/* ── Certificate (#e9fbf2) ───────────────────────────────────────────────── */
export function Certification() {
  return (
    <InView as="section" aria-labelledby="cert-title" id="certification" className="bg-cert py-14 md:py-20">
      <div className="grid-cols-1 container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-7">
          <SectionHeading
            id="cert-title"
            align="left"
            eyebrow={<Eyebrow>Proof of success</Eyebrow>}
            title={
              <>
                Finish strong. <Hl as="green">Get certified.</Hl>
              </>
            }
            sub={`Earn your certificate after successfully completing ${program.completionThreshold} of the course content.`}
          />
          <div className="reveal rounded-2xl border border-mint-soft bg-white p-5" style={d(140)}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Course completion</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-mint px-2.5 py-1 text-xs font-medium text-ink">
                <Icon name="award" size={14} /> Certificate unlocked
              </span>
            </div>
            <div className="relative mt-4 h-3 overflow-hidden rounded-full bg-mist" role="img" aria-label={`Certificate unlocks at ${program.completionThreshold} completion`}>
              <span className="absolute inset-y-0 left-0 rounded-full bg-mint-border grow-x" style={{ width: program.completionThreshold }} />
            </div>
            <div className="relative mt-2 h-4 font-mono text-xs text-ash">
              <span className="absolute left-0">0%</span>
              <span className="absolute -translate-x-1/2 font-medium text-ink" style={{ left: program.completionThreshold }}>
                {program.completionThreshold}
              </span>
              <span className="absolute right-0">100%</span>
            </div>
          </div>
          <ul className="flex flex-col gap-4">
            {certBenefits.map((b, i) => (
              <li key={b.title} className="reveal flex gap-3.5" style={d(200 + i * 70)}>
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-mint text-ink">
                  <Icon name="check" size={15} strokeWidth={2.75} />
                </span>
                <div>
                  <p className="font-medium">{b.title}</p>
                  <p className="mt-0.5 text-[0.9375rem] leading-relaxed text-ash">{b.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Certificate mock — replace with the official certificate image if preferred */}
        <div className="reveal [perspective:1200px]" style={d(160)}>
          <figure className="relative mx-auto aspect-[1.414/1] w-full max-w-[34rem] min-h-[16rem] rotate-[-2deg] rounded-xl border border-line bg-white p-[5%] shadow-lift transition-transform duration-500 hover:rotate-0 hover:scale-[1.01]">
            <div className="absolute inset-[3%] rounded-lg border border-[#d9c58a]" aria-hidden />
            <div className="relative flex h-full flex-col items-center text-center">
              <div className="flex w-full items-center justify-between">
                <span className="grid size-9 place-items-center rounded-full bg-blue text-white sm:size-11">
                  <Icon name="award" size={20} />
                </span>
                <span className="font-mono text-[clamp(0.875rem,2.6vw,1.1rem)] font-bold tracking-tight text-blue">emc</span>
                <span className="rounded-full border-2 border-mint-deep px-2 py-0.5 font-mono text-xs font-bold text-mint-deep">ISO 9001</span>
              </div>
              <p className="mt-[3%] font-serif text-[clamp(1rem,3.6vw,1.75rem)] text-slate">Certificate of Excellence</p>
              <p className="mt-[3%] font-serif text-[clamp(1.1rem,4.4vw,2rem)] italic">[Student Name]</p>
              <p className="mt-[1.5%] text-xs text-ash">has successfully achieved the certification</p>
              <p className="mt-[2%] font-serif text-[clamp(0.8rem,2.7vw,1.25rem)]">Full Stack Web Development</p>
              <div className="mt-auto flex w-full items-end justify-between text-xs leading-tight text-slate">
                <span className="flex flex-col items-center border-t border-ink/40 px-2 pt-1">
                  Agnel John<span className="text-ash">Founder &amp; CEO</span>
                </span>
                <span className="flex flex-col items-center border-t border-ink/40 px-2 pt-1">
                  Vijay Anand<span className="text-ash">Mentor</span>
                </span>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </InView>
  );
}

/* ── Eligibility for Graduation ──────────────────────────────────────────── */
export function Graduation() {
  return (
    <InView as="section" aria-labelledby="graduation-title" className="bg-white py-14 md:py-20">
      <div className="container-x">
        <SectionHeading
          id="graduation-title"
          eyebrow={<Eyebrow>Graduation day</Eyebrow>}
          title={
            <>
              Eligibility for <Hl>graduation.</Hl>
            </>
          }
          sub={`Complete ${program.completionThreshold} of the program and all assignments and tasks.`}
        />
        <ul className="no-scrollbar -mx-4 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <li
              key={i}
              className="reveal w-[72%] shrink-0 snap-start sm:w-auto"
              style={d(i * 70)}
            >
              <MediaSlot
                alt={`Graduation day photo ${i + 1}`}
                label="[PHOTO]"
                tone={(["ice", "cream", "mint", "sky"] as const)[i]}
                className={`aspect-[4/5] w-full rounded-card ${i % 2 ? "sm:translate-y-4" : ""}`}
              />
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center">
          <Placeholder>[NEEDS INPUT: graduation photos from the live page]</Placeholder>
        </p>
      </div>
    </InView>
  );
}
