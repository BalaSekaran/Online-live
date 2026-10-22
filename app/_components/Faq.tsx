"use client";

import { useState } from "react";
import { ApplyButton } from "@/components/apply/Apply";
import { Icon } from "@/components/ui/Icon";
import { InView } from "@/components/ui/InView";
import { Rich } from "@/components/ui/Rich";
import { cx, Eyebrow, Hl, SectionHeading } from "@/components/ui/primitives";
import { faqs } from "@/data/content";
import { contact } from "@/data/program";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <InView as="section" aria-labelledby="faqs-title" id="faqs" className="bg-mist py-14 md:py-20">
      <div className="grid-cols-1 container-x grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
        <div>
          <SectionHeading
            id="faqs-title"
            align="left"
            eyebrow={<Eyebrow>FAQs</Eyebrow>}
            title={
              <>
                Questions? <Hl>We&apos;ve got answers.</Hl>
              </>
            }
            sub="Everything you'd like to know about the program, the mentors and the fees."
          />
          <ul className="mt-8 border-t border-line">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <li key={f.q} className="reveal border-b border-line">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex min-h-16 w-full items-center gap-4 py-4 text-left text-base font-medium sm:text-[1.0625rem]"
                    >
                      <span className="flex-1">{f.q}</span>
                      <span className={cx("grid size-8 shrink-0 place-items-center rounded-full border transition-all duration-300", isOpen ? "rotate-45 border-ink bg-ink text-mint" : "border-line text-ash")}>
                        <Icon name="plus" size={16} />
                      </span>
                    </button>
                  </h3>
                  <div id={`faq-${i}`} role="region" hidden={!isOpen} className="pb-5 pr-12 text-[0.9375rem] leading-relaxed text-ash">
                    <Rich text={f.a} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <aside className="reveal flex h-fit flex-col gap-4 rounded-card border border-line bg-white p-6 shadow-soft lg:sticky lg:top-24">
          <span className="grid size-11 place-items-center rounded-xl bg-sky-soft">
            <Icon name="message" size={20} />
          </span>
          <h3 className="text-[1.375rem] font-normal leading-tight tracking-tight">Still have questions?</h3>
          <p className="text-[0.9375rem] text-ash">Our team is happy to help you decide.</p>
          <ApplyButton source="faq" variant="dark" className="justify-between">
            Ask Our Team
          </ApplyButton>
          <a href={contact.phoneHref} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium">
            <Icon name="phone" size={16} /> {contact.phone}
          </a>
        </aside>
      </div>
    </InView>
  );
}
