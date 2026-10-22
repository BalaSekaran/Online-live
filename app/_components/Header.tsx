"use client";

import { useEffect, useState } from "react";
import { ApplyButton } from "@/components/apply/Apply";
import { cx } from "@/components/ui/primitives";
import { nav } from "@/data/program";

export function Logo() {
  // Swap the mark for the official EMC logo file (e.g. /brand/emc-logo.svg) when available.
  return (
    <a href="#hero-title" className="flex min-h-11 items-center gap-2.5" aria-label="Error Makes Clever — Online Full Stack, back to top">
      <span className="grid size-9 place-items-center rounded-full border-2 border-ink font-mono text-[0.95rem] font-bold leading-none max-[359px]:size-8">
        E
      </span>
      <span className="text-[0.95rem] font-semibold tracking-tight max-[400px]:hidden">Error Makes Clever</span>
      <span aria-hidden className="h-6 w-px bg-line max-[400px]:hidden" />
      <span className="rounded-md bg-ink px-2 py-1 font-mono text-xs font-medium uppercase tracking-wider text-mint">Full Stack</span>
    </a>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={cx(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled ? "border-line bg-white/85 backdrop-blur-md" : "border-transparent bg-mist/0",
      )}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Page sections" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="inline-flex min-h-11 items-center rounded-md px-3 text-[0.9375rem] text-slate transition-colors hover:bg-ink/5 hover:text-ink">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ApplyButton source="header" variant="dark" className="h-11 py-1 pl-4">
          Apply Now
        </ApplyButton>
      </div>
    </header>
  );
}
