"use client";

import { useState } from "react";
import { Icon, type IconName } from "./Icon";

const PROBLEMS: { icon: IconName; title: string; text: string; fixTitle: string; fix: string }[] = [
  { icon: "keyboard", title: "Manual work", text: "Too much manual encoding, repetitive admin and hand-prepared reports.", fixTitle: "Automate the repetitive", fix: "Workflow automation, data capture and generated reports take the busywork off your team." },
  { icon: "unlink", title: "Disconnected tools", text: "Processes spread across spreadsheets, email, chat, and systems that don't talk to each other.", fixTitle: "Connect everything", fix: "APIs and integrations link CRM, ERP, accounting, payments, email and messaging, so data moves between them automatically." },
  { icon: "clock", title: "Slow customer response", text: "Slow follow-ups, delayed updates and inconsistent customer communication.", fixTitle: "Respond instantly", fix: "Automated follow-ups, notifications and AI assistants keep every customer informed without anyone having to remember." },
  { icon: "eye", title: "Limited visibility", text: "Hard to track projects, customers, orders, applications or performance in real time.", fixTitle: "See it live", fix: "Live dashboards and reporting turn scattered data into one clear picture of the business." },
  { icon: "legacy", title: "Legacy systems", text: "Software that's difficult to use, maintain, integrate or scale.", fixTitle: "Modernise with care", fix: "Rebuilt or extended systems that are usable, maintainable and ready to grow, with data migrated safely." },
  { icon: "rocket", title: "New digital products", text: "An idea that needs to become a working MVP, proof of concept or scalable product.", fixTitle: "Validate, then scale", fix: "An MVP or proof of concept tests the idea before a larger investment. Once it's proven, we scale it." },
];

export default function Problems() {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });

  return (
    <section className="problems section light" id="problems">
      <div className="container">
        <div className="section-head">
          <p className="label reveal">02 — The friction we remove</p>
          <h2 className="h2 reveal">Problems that slow teams down <span className="serif">and hide what&apos;s happening.</span></h2>
          <p className="section-sub reveal">Tap a card to see how we&apos;d approach it.</p>
        </div>
        <div className="problems__grid">
          {PROBLEMS.map((pr, i) => (
            <button key={pr.title} type="button" className="pcard reveal" aria-pressed={flipped.has(i)} onClick={() => toggle(i)}>
              <span className="pcard__face pcard__front">
                <span className="pcard__num">{String(i + 1).padStart(2, "0")}</span>
                <Icon name={pr.icon} className="pcard__icon" />
                <span className="pcard__title">{pr.title}</span>
                <span className="pcard__text">{pr.text}</span>
                <span className="pcard__hint">See the fix <Icon name="arrow" /></span>
              </span>
              <span className="pcard__face pcard__back">
                <span className="pcard__tag">How we fix it</span>
                <span className="pcard__title">{pr.fixTitle}</span>
                <span className="pcard__text">{pr.fix}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
