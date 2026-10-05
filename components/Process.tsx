"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

const STEPS = [
  { t: "Discover", d: "We map your current process, goals, users, constraints and priorities.", o: "Recommended solution, scope, timeline & proposal" },
  { t: "Design", d: "We define the workflow, interface, architecture, integrations and solution scope.", o: "A blueprint everyone agrees on" },
  { t: "Build", d: "We develop in clear stages, keeping implementation aligned with agreed requirements.", o: "Working software, delivered incrementally" },
  { t: "Test", d: "Quality assurance plus client acceptance testing, so it works the way you work.", o: "Verified & signed off" },
  { t: "Launch", d: "We deploy the approved solution and support your team through rollout.", o: "Live, adopted, supported" },
  { t: "Improve", d: "We maintain, automate, optimize and expand the system as your business grows.", o: "Technology that keeps up with you" },
];

export default function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  const [fill, setFill] = useState(0);
  const [onCount, setOnCount] = useState(0);

  // Timeline fills and steps light up as you scroll past them
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const list = listRef.current!;
      const mid = window.innerHeight * 0.6;
      const r = list.getBoundingClientRect();
      setFill(Math.min(1, Math.max(0, (mid - r.top) / r.height)));
      const items = list.querySelectorAll<HTMLElement>(".step");
      let n = 0;
      items.forEach((s) => { if (s.getBoundingClientRect().top < mid) n++; });
      setOnCount(n);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section className="process section light" id="process">
      <div className="container process__grid">
        <div className="process__intro">
          <p className="label reveal">05 — How we work</p>
          <h2 className="h2 reveal">Six stages. <span className="serif">No surprises.</span></h2>
          <p className="section-sub reveal">We pick technology based on the business problem. You&apos;re not forced into a fixed product or template. Every stage has a clear purpose and a clear output.</p>
          <a className="btn btn--navy magnetic reveal" href="#contact">Begin with discovery <Icon name="arrow" /></a>
        </div>
        <div className="steps-wrap">
          <ol className="steps" ref={listRef}>
            {STEPS.map((s, i) => (
              <li key={s.t} className={`step${i < onCount ? " is-on" : ""}`}>
                <span className="step__n">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                  <span className="step__out">→ {s.o}</span>
                </div>
              </li>
            ))}
          </ol>
          <span className="steps__line" aria-hidden="true"><span style={{ height: `${fill * 100}%` }} /></span>
        </div>
      </div>
    </section>
  );
}
