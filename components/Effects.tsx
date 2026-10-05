"use client";

import { useEffect, useRef } from "react";

/**
 * Page-wide, DOM-level polish that doesn't belong to any one section:
 * scroll reveals, reading progress, magnetic buttons and tile spotlights.
 * Reveal state is written to a data attribute (not className) so React re-renders never clobber it.
 */
export default function Effects() {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const cleanups: (() => void)[] = [];

    // Reveal on scroll, staggered among siblings
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (!en.isIntersecting) return;
        (en.target as HTMLElement).dataset.visible = "";
        io.unobserve(en.target);
      }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    const groups = new Map<Element | null, number>();
    document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
      const i = groups.get(el.parentElement) ?? 0;
      groups.set(el.parentElement, i + 1);
      el.style.setProperty("--d", `${Math.min(i, 6) * 0.08}s`);
      io.observe(el);
    });
    cleanups.push(() => io.disconnect());

    // Reading progress
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        progressRef.current!.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    if (fine && !reduce) {
      // Magnetic buttons + bento spotlight (event delegation)
      const onPointer = (e: PointerEvent) => {
        const t = e.target as Element;
        const mag = t.closest?.<HTMLElement>(".magnetic");
        if (mag) {
          const r = mag.getBoundingClientRect();
          mag.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.18}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
        }
        const tile = t.closest?.<HTMLElement>(".tile");
        if (tile) {
          const r = tile.getBoundingClientRect();
          tile.style.setProperty("--mx", `${e.clientX - r.left}px`);
          tile.style.setProperty("--my", `${e.clientY - r.top}px`);
        }
      };
      const onOut = (e: PointerEvent) => {
        const mag = (e.target as Element).closest?.<HTMLElement>(".magnetic");
        if (mag && !mag.contains(e.relatedTarget as Node)) mag.style.transform = "";
      };
      document.addEventListener("pointermove", onPointer);
      document.addEventListener("pointerout", onOut);
      cleanups.push(() => {
        document.removeEventListener("pointermove", onPointer);
        document.removeEventListener("pointerout", onOut);
      });
    }

    return () => cleanups.forEach((c) => c());
  }, []);

  return (
    <>
      <div className="progress" ref={progressRef} aria-hidden="true" />
    </>
  );
}
