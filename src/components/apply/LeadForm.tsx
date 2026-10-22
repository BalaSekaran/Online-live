"use client";

import { useId, useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { buttonClass, ButtonInner, cx } from "@/components/ui/primitives";
import { contact, program } from "@/data/program";

export const PROFESSIONS = [
  "Student",
  "Working Professional",
  "Fresh Graduate / Fresher",
  "Career Gapper",
  "Freelancer",
  "Business Owner",
  "Other",
] as const;

const COUNTRY_CODES = [
  { code: "+91", label: "IN +91" },
  { code: "+971", label: "AE +971" },
  { code: "+65", label: "SG +65" },
  { code: "+1", label: "US +1" },
  { code: "+44", label: "UK +44" },
  { code: "+61", label: "AU +61" },
];

type Status = "idle" | "sending" | "sent" | "error";
type Errors = Partial<Record<"name" | "email" | "phone" | "profession", string>>;

const inputBase =
  "h-12 rounded-[var(--radius-btn)] border border-line bg-white px-3.5 text-[0.9375rem] text-ink placeholder:text-fog outline-none transition-[border-color,box-shadow] focus:border-ink focus:ring-4 focus:ring-mint/25 aria-[invalid=true]:border-danger";
const inputCls = `${inputBase} w-full`;

export function LeadForm({
  source,
  submitLabel = "Request a Call Back",
  autoFocus,
  compact,
}: {
  source: string;
  submitLabel?: string;
  autoFocus?: boolean;
  compact?: boolean;
}) {
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Errors>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const cc = String(fd.get("cc") ?? "+91");
    const phone = String(fd.get("phone") ?? "").replace(/[^\d]/g, "");
    const profession = String(fd.get("profession") ?? "");

    const next: Errors = {};
    if (name.length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email.";
    if (phone.length < 7 || phone.length > 15) next.phone = "Please enter a valid phone or WhatsApp number.";
    if (!profession) next.profession = "Please choose your current profession.";
    setErrors(next);
    if (Object.keys(next).length) {
      const first = e.currentTarget.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_APPLY_ENDPOINT;
    if (!endpoint) {
      // Playbook §6: with no endpoint configured, send nothing.
      console.warn("[LeadForm] NEXT_PUBLIC_APPLY_ENDPOINT is not set — submission not sent.", { source });
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phoneOrWhatsapp: `${cc} ${phone}`,
          profession,
          program: program.name,
          source,
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex flex-col items-center gap-3 py-8 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-mint text-ink">
          <Icon name="check" size={26} strokeWidth={2.5} />
        </span>
        <p className="text-h3">Thanks — we&apos;ve got your details.</p>
        <p className="max-w-xs text-sm text-ash">
          Our team will call you to answer your questions about the program. Can&apos;t wait? Call{" "}
          <a className="font-medium text-ink underline" href={contact.phoneHref}>
            {contact.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  const field = (key: keyof Errors) => ({
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${uid}-${key}-err` : undefined,
  });

  return (
    <form noValidate onSubmit={onSubmit} className={cx("flex flex-col", compact ? "gap-3.5" : "gap-4")}>
      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${uid}-name`} className="text-sm font-medium text-slate">
          Name <span className="text-danger">*</span>
        </label>
        <input
          id={`${uid}-name`}
          name="name"
          autoComplete="name"
          placeholder="Your full name"
          className={inputCls}
          autoFocus={autoFocus}
          {...field("name")}
        />
        {errors.name && <Err id={`${uid}-name-err`}>{errors.name}</Err>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${uid}-email`} className="text-sm font-medium text-slate">
          Email <span className="text-danger">*</span>
        </label>
        <input
          id={`${uid}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          className={inputCls}
          {...field("email")}
        />
        {errors.email && <Err id={`${uid}-email-err`}>{errors.email}</Err>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${uid}-phone`} className="text-sm font-medium text-slate">
          Phone or WhatsApp number <span className="text-danger">*</span>
        </label>
        <div className="flex gap-2">
          <label htmlFor={`${uid}-cc`} className="sr-only">
            Country code
          </label>
          <select id={`${uid}-cc`} name="cc" defaultValue="+91" className={cx(inputBase, "w-[6.5rem] shrink-0 px-2.5")}>
            {COUNTRY_CODES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            placeholder="98765 43210"
            className={cx(inputBase, "min-w-0 flex-1")}
            {...field("phone")}
          />
        </div>
        {errors.phone && <Err id={`${uid}-phone-err`}>{errors.phone}</Err>}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${uid}-profession`} className="text-sm font-medium text-slate">
          What is your current profession? <span className="text-danger">*</span>
        </label>
        <div className="relative">
          <select
            id={`${uid}-profession`}
            name="profession"
            defaultValue=""
            className={cx(inputCls, "appearance-none pr-10")}
            {...field("profession")}
          >
            <option value="" disabled>
              Select your field
            </option>
            {PROFESSIONS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
          <Icon name="chevronDown" size={18} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ash" />
        </div>
        {errors.profession && <Err id={`${uid}-profession-err`}>{errors.profession}</Err>}
      </div>

      <button type="submit" disabled={status === "sending"} className={buttonClass("dark", "mt-1 w-full justify-between disabled:opacity-60")}>
        <ButtonInner variant="dark" icon="phone">
          {status === "sending" ? "Sending…" : submitLabel}
        </ButtonInner>
      </button>

      {status === "error" && (
        <p role="alert" className="rounded-lg bg-[#fff1f1] px-3 py-2.5 text-sm text-[#9b1c1c]">
          We couldn&apos;t send your details right now. Please call us on{" "}
          <a className="font-medium underline" href={contact.phoneHref}>
            {contact.phone}
          </a>
          .
        </p>
      )}
    </form>
  );
}

function Err({ id, children }: { id: string; children: string }) {
  return (
    <p id={id} className="text-sm text-danger">
      {children}
    </p>
  );
}
