"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode, type ComponentPropsWithoutRef } from "react";

/**
 * Sets data-inview="true" once the element's top passes 85% of the viewport
 * (playbook §5: margin 0px 0px -15% 0px). Children with `.reveal`, `.grow-x`,
 * `.grow-y`, `.hl-marker` animate in from CSS; reduced motion shows the final state.
 *
 * Uses a rAF-throttled scroll check rather than IntersectionObserver alone, so a
 * section jumped past by an anchor link or a fast fling is still revealed.
 */
type Props<T extends ElementType> = {
  as?: T;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

export function InView<T extends ElementType = "div">({ as, children, ...rest }: Props<T>) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const check = () => {
      raf = 0;
      if (el.getBoundingClientRect().top < window.innerHeight * 0.85) {
        setInView(true);
        stop();
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    const stop = () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    check();
    return stop;
  }, []);

  return (
    <Tag ref={ref} data-inview={inView ? "true" : "false"} {...rest}>
      {children}
    </Tag>
  );
}
