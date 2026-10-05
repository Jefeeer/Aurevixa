"use client";

import { useEffect, useRef, useState } from "react";

const TEXT =
  "We begin by understanding the workflow, the pain points, the people and the goals. Then we pick the right mix of software, AI, automation, integrations, data and cloud, and turn operational challenges and new product ideas into technology that people actually use and that scales.";
const KEY = new Set(["workflow,", "software,", "AI,", "automation,", "integrations,", "data", "cloud,", "use", "scales."]);
const WORDS = TEXT.split(" ");

export default function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [lit, setLit] = useState(0);

  // Words light up as the paragraph scrolls through the viewport
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setLit(WORDS.length); return; }
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = ref.current!.getBoundingClientRect();
      const start = window.innerHeight * 0.85, end = window.innerHeight * 0.3;
      const p = Math.min(1, Math.max(0, (start - r.top) / (r.height + start - end)));
      setLit(Math.round(p * WORDS.length * 1.05));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="statement section" id="about">
      <div className="container">
        <p className="label reveal">01 — Who we are</p>
        <p className="statement__text" ref={ref} aria-label={TEXT}>
          {WORDS.map((w, i) => (
            <span key={i} aria-hidden="true" className={`w${KEY.has(w) ? " is-key" : ""}${i < lit ? " is-lit" : ""}`}>
              {w}{i < WORDS.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
        <div className="statement__foot reveal">
          <div><b>Not a template.</b><span>Every solution is designed around your process.</span></div>
          <div><b>Not a single product.</b><span>The technology is chosen for the problem.</span></div>
          <div><b>Not a hand-off.</b><span>From discovery through launch and continuous improvement.</span></div>
        </div>
      </div>
    </section>
  );
}
