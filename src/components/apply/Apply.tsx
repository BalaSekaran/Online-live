"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Icon, type IconName } from "@/components/ui/Icon";
import { buttonClass, ButtonInner, cx, type ButtonVariant } from "@/components/ui/primitives";
import { LeadForm } from "./LeadForm";

type Ctx = { open: (source: string) => void };
const ApplyCtx = createContext<Ctx | null>(null);

export function useApply() {
  const ctx = useContext(ApplyCtx);
  if (!ctx) throw new Error("useApply must be used inside <ApplyProvider>");
  return ctx;
}

export function ApplyProvider({ children }: { children: ReactNode }) {
  const [source, setSource] = useState<string | null>(null);
  const returnFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((s: string) => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setSource(s);
  }, []);
  const close = useCallback(() => {
    setSource(null);
    requestAnimationFrame(() => returnFocus.current?.focus());
  }, []);

  return (
    <ApplyCtx.Provider value={{ open }}>
      {children}
      {source && <ApplyModal source={source} onClose={close} />}
    </ApplyCtx.Provider>
  );
}

function ApplyModal({ source, onClose }: { source: string; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])',
        );
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6">
      <button aria-label="Close form" tabIndex={-1} onClick={onClose} className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]" />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-title"
        className="relative max-h-[92dvh] w-full overflow-y-auto rounded-t-[1.5rem] bg-white p-5 shadow-lift sm:max-w-md sm:rounded-[1.5rem] sm:p-7"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-eyebrow font-medium uppercase text-mint-deep">Free consultation</p>
            <h2 id="apply-title" className="mt-2 text-h3 font-medium">
              Ready to start your Full Stack journey?
            </h2>
            <p className="mt-1.5 text-sm text-ash">
              Share your details and our team will call you to see if the program is the right fit for you.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid size-11 shrink-0 place-items-center rounded-full border border-line text-ash hover:text-ink"
          >
            <Icon name="x" size={18} />
          </button>
        </div>
        <LeadForm source={source} autoFocus />
      </div>
    </div>
  );
}

/** Every form CTA is an ApplyButton so submissions record which section converted. */
export function ApplyButton({
  source,
  children,
  variant = "primary",
  icon = "arrowUpRight",
  className,
}: {
  source: string;
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: IconName | null;
  className?: string;
}) {
  const { open } = useApply();
  return (
    <button type="button" onClick={() => open(source)} className={cx(buttonClass(variant), className)}>
      <ButtonInner variant={variant} icon={icon}>
        {children}
      </ButtonInner>
    </button>
  );
}
