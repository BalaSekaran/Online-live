"use client";

import { useEffect, useState } from "react";
import { ApplyButton } from "@/components/apply/Apply";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cx } from "@/components/ui/primitives";
import { footer } from "@/data/content";
import { contact } from "@/data/program";

const socials: { label: string; icon: IconName; href: string | null }[] = [
  { label: "YouTube", icon: "youtube", href: null },
  { label: "Instagram", icon: "instagram", href: null },
  { label: "LinkedIn", icon: "linkedin", href: null },
  { label: "Facebook", icon: "facebook", href: null },
];

function FLink({ label, href }: { label: string; href: string | null }) {
  if (!href) {
    // Link target not supplied yet — rendered as text so there is no href="#".
    return (
      <span className="inline-flex min-h-11 cursor-default items-center text-white/70 underline decoration-[#c98a00] decoration-dashed underline-offset-4" title="[NEEDS INPUT: link]">
        {label}
      </span>
    );
  }
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="inline-flex min-h-11 items-center text-white/70 transition-colors hover:text-mint"
    >
      {label}
    </a>
  );
}

export function Footer() {
  const word = "ERROR MAKES CLEVER";
  return (
    <footer className="relative overflow-hidden bg-black pb-28 pt-14 text-white md:pb-10 md:pt-20">
      <div className="container-x">
        <div className="relative rounded-[1.25rem] border border-white/10 p-6 sm:p-9">
          {/* corner brackets */}
          {["left-0 top-0 border-l-2 border-t-2", "right-0 top-0 border-r-2 border-t-2", "bottom-0 left-0 border-b-2 border-l-2", "bottom-0 right-0 border-b-2 border-r-2"].map((c) => (
            <span key={c} aria-hidden className={cx("absolute size-5 border-mint", c)} />
          ))}

          <div className="grid-cols-1 grid gap-10 md:grid-cols-[repeat(3,minmax(0,1fr))_15rem]">
            {footer.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="text-sm font-medium text-white">{col.title}</p>
                <ul className="mt-3 flex flex-col text-[0.9375rem]">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <FLink {...l} />
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 rounded-xl border border-white/15 px-4 py-3">
                <Icon name="award" size={22} className="text-mint" />
                <span className="text-sm leading-tight">
                  Featured
                  <br />
                  <span className="text-white/60">by Social Eagle</span>
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/15 px-4 py-3">
                <span className="flex gap-0.5 text-sun">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} name="star" size={14} fill="currentColor" strokeWidth={0} />
                  ))}
                </span>
                <span className="text-sm">Google (4.8)</span>
              </div>
              <ApplyButton source="footer-brochure" variant="dark" icon="download" className="mt-1 justify-between border-white/15">
                Download Brochure
              </ApplyButton>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 md:flex-row md:items-center md:justify-between">
            <a href={contact.phoneHref} className="inline-flex min-h-11 items-center gap-3">
              <span className="grid size-10 place-items-center rounded-lg bg-mint text-ink">
                <Icon name="phone" size={18} />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="text-xs text-white/60">For any doubts related to this course</span>
                <span className="font-medium">{contact.phone}</span>
              </span>
            </a>
            <div className="flex flex-wrap items-center gap-2">
              <a href={contact.emailHref} className="inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-sm text-white/80 hover:text-mint">
                <Icon name="mail" size={16} /> {contact.email}
              </a>
              {socials.map((s) =>
                s.href ? (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="grid size-11 place-items-center rounded-lg border border-white/15 hover:border-mint hover:text-mint">
                    <Icon name={s.icon} size={18} />
                  </a>
                ) : (
                  <span key={s.label} aria-label={`${s.label} (link needed)`} title="[NEEDS INPUT: link]" className="grid size-11 place-items-center rounded-lg border border-dashed border-[#c98a00]/70 text-white/60">
                    <Icon name={s.icon} size={18} />
                  </span>
                ),
              )}
            </div>
          </div>

          <p className="mt-6 flex flex-wrap gap-x-4 gap-y-1 text-xs text-white/50">
            <span>© {new Date().getFullYear()} Nxtspire Education Private Limited</span>
            <span>Terms of Use</span>
            <span>Privacy</span>
          </p>
        </div>
      </div>

      <div aria-hidden className="mt-10 overflow-hidden">
        <div className="marquee-track flex w-max animate-marquee whitespace-nowrap">
          {[0, 1].map((k) => (
            <span key={k} className="pr-[0.4em] text-[clamp(4rem,14vw,11rem)] font-semibold leading-none tracking-[-0.04em] text-mint">
              {word} · {word} ·
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

/** Sticky call + apply bar on phones once the hero has scrolled away. */
export function MobileBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > window.innerHeight * 0.9);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div
      className={cx(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur transition-transform duration-300 md:hidden",
        show ? "translate-y-0" : "translate-y-full",
      )}
      inert={!show}
    >
      <div className="flex gap-2">
        <a
          href={contact.phoneHref}
          aria-label={`Call ${contact.phone}`}
          className="grid size-11 shrink-0 place-items-center rounded-[var(--radius-btn)] border border-line"
        >
          <Icon name="phone" size={18} />
        </a>
        <ApplyButton source="mobile-bar" className="flex-1 justify-between">
          Talk to an Expert
        </ApplyButton>
      </div>
    </div>
  );
}
