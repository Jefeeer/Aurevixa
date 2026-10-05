"use client";

import { useEffect, useState } from "react";
import { Brand } from "./Icon";

const LINKS = [
  { href: "#services", label: "Services" },
  { href: "#automation", label: "Automation" },
  { href: "#process", label: "Process" },
  { href: "#engage", label: "Engagement" },
  { href: "#about", label: "About" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastY && y > 600);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => en.isIntersecting && setActive("#" + en.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    LINKS.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) io.observe(el);
    });

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const mq = window.matchMedia("(min-width: 1025px)");
    const onMq = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    mq.addEventListener("change", onMq);

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, []);

  const cls = ["nav", scrolled && "is-scrolled", hidden && !open && "is-hidden", open && "is-open"].filter(Boolean).join(" ");

  return (
    <header className={cls}>
      <div className="nav__inner container">
        <Brand />
        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className={active === l.href ? "is-active" : undefined}>{l.label}</a>
          ))}
        </nav>
        <a className="btn btn--gold btn--sm nav__cta magnetic" href="#contact">Start a project</a>
        <button
          className="nav__toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobileMenu"
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span />
        </button>
      </div>
      <div className="mobile-menu" id="mobileMenu">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
        <a href="#contact" className="btn btn--gold" onClick={() => setOpen(false)}>Start a project</a>
      </div>
    </header>
  );
}
