import type { CSSProperties, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/* ── Button ────────────────────────────────────────────────────────────────
   Playbook §5: 8px radius; primary = mint + dark ↗ chip; dark = teal + mint
   chip; ghost = underlined. Min height 44px, never wraps mid-label.        */
export type ButtonVariant = "primary" | "dark" | "ghost" | "light";

const base =
  "group inline-flex min-h-[2.75rem] items-center justify-center gap-3 whitespace-nowrap rounded-[var(--radius-btn)] text-[0.9375rem] font-medium transition-[background-color,box-shadow,transform,color] duration-200 active:translate-y-px max-[359px]:text-sm";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border border-mint-border bg-mint pl-5 pr-1.5 py-1.5 text-ink shadow-[0_8px_22px_-12px_rgb(0_174_90/0.9)] hover:bg-[#2dffa6]",
  dark: "border border-teal bg-teal pl-5 pr-1.5 py-1.5 text-white hover:bg-[#033d3b]",
  light: "border border-line bg-white pl-5 pr-1.5 py-1.5 text-ink hover:border-fog",
  ghost: "px-1 text-ink underline decoration-fog decoration-2 underline-offset-[6px] hover:decoration-ink",
};

const chip: Record<ButtonVariant, string> = {
  primary: "bg-ink text-mint",
  dark: "bg-mint text-ink",
  light: "bg-ink text-white",
  ghost: "",
};

export function buttonClass(variant: ButtonVariant = "primary", extra?: string) {
  return cx(base, variants[variant], extra);
}

export function ButtonInner({
  children,
  variant = "primary",
  icon = "arrowUpRight",
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: IconName | null;
}) {
  if (variant === "ghost") {
    return (
      <>
        <span>{children}</span>
        {icon && <Icon name={icon} size={16} />}
      </>
    );
  }
  return (
    <>
      <span>{children}</span>
      {icon && (
        <span
          className={cx(
            "grid size-8 shrink-0 place-items-center rounded-md transition-transform duration-200 group-hover:rotate-45 max-[359px]:hidden",
            icon !== "arrowUpRight" && "group-hover:rotate-0 group-hover:translate-x-0.5",
            chip[variant],
          )}
        >
          <Icon name={icon} size={16} strokeWidth={2.25} />
        </span>
      )}
    </>
  );
}

/** Plain <a> for #anchors, files and external URLs (playbook §5). */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon,
  className,
  external,
  download,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  icon?: IconName | null;
  className?: string;
  external?: boolean;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      className={buttonClass(variant, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download ? { download: true } : {})}
    >
      <ButtonInner variant={variant} icon={icon === undefined ? "arrowUpRight" : icon}>
        {children}
      </ButtonInner>
    </a>
  );
}

/* ── Eyebrow ─────────────────────────────────────────────────────────────── */
export function Eyebrow({
  children,
  live,
  tone = "ink",
  className,
}: {
  children: ReactNode;
  live?: boolean;
  tone?: "ink" | "white";
  className?: string;
}) {
  return (
    <p
      className={cx(
        "inline-flex items-center gap-2 text-eyebrow font-medium uppercase sm:text-sm sm:tracking-[0.08em]",
        tone === "ink" ? "text-slate" : "text-white/80",
        className,
      )}
    >
      <span
        aria-hidden
        className={cx("size-1.5 rounded-full bg-mint-deep", live && "animate-pulse-dot bg-mint-border")}
      />
      {children}
    </p>
  );
}

/* ── Section heading block ───────────────────────────────────────────────── */
export function SectionHeading({
  id,
  eyebrow,
  title,
  sub,
  align = "center",
  size = "h2",
  className,
}: {
  id: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  align?: "center" | "left";
  size?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div
      className={cx(
        "flex flex-col gap-4",
        align === "center" ? "mx-auto max-w-3xl items-center text-center" : "max-w-2xl items-start",
        className,
      )}
    >
      {eyebrow && <div className="reveal">{eyebrow}</div>}
      <h2
        id={id}
        className={cx("reveal font-normal", size === "h1" ? "text-h1" : "text-h2")}
        style={{ "--d": "60ms" } as CSSProperties}
      >
        {title}
      </h2>
      {sub && (
        <p className="reveal max-w-2xl text-lead text-ash" style={{ "--d": "120ms" } as CSSProperties}>
          {sub}
        </p>
      )}
    </div>
  );
}

/* ── Highlight (one per headline) ────────────────────────────────────────── */
export function Hl({ children, as = "pill" }: { children: ReactNode; as?: "pill" | "marker" | "blue" | "green" | "sun" }) {
  const cls = {
    pill: "hl-pill",
    marker: "hl-marker",
    blue: "text-blue",
    green: "text-mint-deep",
    sun: "hl-sun",
  }[as];
  return <span className={cls}>{children}</span>;
}

/* ── Placeholder (visible, never a guess — playbook §1, §9) ──────────────── */
export function Placeholder({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded border border-dashed border-[#c98a00] bg-[#fff6d6] px-1.5 py-0.5 font-mono text-xs font-medium text-[#7a5200]",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Image slot that shows a labelled placeholder until a real `src` exists. */
export function MediaSlot({
  src,
  alt,
  label,
  className,
  tone = "mist",
}: {
  src?: string | null;
  alt: string;
  label: string;
  className?: string;
  tone?: "mist" | "ice" | "cream" | "mint" | "sky";
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} loading="lazy" className={cx("object-cover", className)} />;
  }
  const bg = {
    mist: "bg-[#e6e9e9]",
    ice: "bg-ice",
    cream: "bg-cream",
    mint: "bg-mint-soft/50",
    sky: "bg-sky-soft/60",
  }[tone];
  return (
    <div
      role="img"
      aria-label={alt}
      className={cx(
        "relative grid place-items-center overflow-hidden",
        bg,
        "bg-[repeating-linear-gradient(135deg,transparent_0_10px,rgb(13_17_17/0.035)_10px_20px)]",
        className,
      )}
    >
      <Placeholder>{label}</Placeholder>
    </div>
  );
}

/** Icon tile used across cards (coloured square + icon). */
export function IconTile({
  name,
  tone,
  size = "md",
}: {
  name: IconName;
  tone: "yellow" | "sky" | "mint" | "blue" | "sun" | "ink" | "cream" | "pink";
  size?: "sm" | "md" | "lg";
}) {
  const t = {
    yellow: "bg-tile-yellow text-ink",
    sky: "bg-sky-soft text-ink",
    mint: "bg-tile-mint text-ink",
    blue: "bg-tile-blue text-white",
    sun: "bg-sun text-ink",
    ink: "bg-ink text-mint",
    cream: "bg-cream text-ink",
    pink: "bg-[#ffd3e8] text-ink",
  }[tone];
  const s = { sm: "size-9 rounded-lg", md: "size-11 rounded-xl", lg: "size-14 rounded-2xl" }[size];
  const i = { sm: 18, md: 20, lg: 24 }[size];
  return (
    <span className={cx("grid shrink-0 place-items-center", t, s)}>
      <Icon name={name} size={i} />
    </span>
  );
}
