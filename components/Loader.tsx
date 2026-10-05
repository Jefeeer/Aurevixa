"use client";

import { useEffect, useState } from "react";
import { MARK_VIEWBOX, markPaths as p } from "@/lib/mark";

export const READY_EVENT = "aurevixa:ready";

export default function Loader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.body.classList.add("is-loading");
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      setDone(true);
      document.body.classList.remove("is-loading");
      document.body.classList.add("is-ready");
      window.dispatchEvent(new Event(READY_EVENT));
    };
    const t = setTimeout(finish, reduce ? 0 : 1400);
    const failsafe = setTimeout(finish, 3500);
    return () => { clearTimeout(t); clearTimeout(failsafe); };
  }, []);

  return (
    <div className={`loader${done ? " is-done" : ""}`} aria-hidden="true">
      <svg className="loader__mark" viewBox={MARK_VIEWBOX}>
        <path className="lm lm-teal" fill="url(#g-teal)" d={p.teal} />
        <path className="lm lm-navy" fill="url(#g-navy-bright)" d={p.navy} />
        <path className="lm lm-gold" fill="url(#g-gold)" stroke="url(#g-gold)" strokeWidth="14" strokeLinejoin="round" d={p.gold} />
      </svg>
      <div className="loader__word">Aurevixa</div>
      <div className="loader__bar"><span /></div>
    </div>
  );
}
