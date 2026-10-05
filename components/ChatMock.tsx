"use client";

import { useEffect, useRef, useState } from "react";

/** A tiny AI-assistant exchange that "types" its answer once scrolled into view. */
export default function ChatMock() {
  const ref = useRef<HTMLDivElement>(null);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(([en]) => {
      if (!en.isIntersecting) return;
      t = setTimeout(() => setAnswered(true), reduce ? 0 : 1800);
      io.disconnect();
    }, { threshold: 0.6 });
    io.observe(ref.current!);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);

  return (
    <div className={`mock mock--chat${answered ? " is-answered" : ""}`} ref={ref} aria-hidden="true">
      <div className="bubble bubble--user">Where&apos;s my order #4821?</div>
      <div className="bubble bubble--bot">
        <span className="typing"><i /><i /><i /></span>
        <span className="bubble__text">It shipped this morning and should arrive Thursday. I&apos;ve sent you the tracking link by SMS.</span>
      </div>
    </div>
  );
}
