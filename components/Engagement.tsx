"use client";

import { useRef, useState } from "react";
import { Icon, type IconName } from "./Icon";

type Key = "fixed" | "mvp" | "retainer" | "team" | "support";

const OPTIONS: { key: Key; q: string }[] = [
  { key: "fixed", q: "I have a clear scope" },
  { key: "mvp", q: "I want to test an idea" },
  { key: "retainer", q: "I need continuous improvements" },
  { key: "team", q: "I need engineering capacity" },
  { key: "support", q: "My system is already live" },
];

const MODELS: { key: Key; icon: IconName; title: string; text: string }[] = [
  { key: "fixed", icon: "target", title: "Fixed Project", text: "Best when the scope and deliverables are clearly defined." },
  { key: "mvp", icon: "rocket", title: "MVP / Proof of Concept", text: "Validate a new product, workflow or AI use case before a larger investment." },
  { key: "retainer", icon: "loop", title: "Monthly Retainer", text: "Continuous development, automation, support and feature improvements." },
  { key: "team", icon: "team", title: "Dedicated Team", text: "Ongoing engineering capacity without building a full internal team." },
  { key: "support", icon: "shield", title: "Maintenance & Support", text: "Monitoring, fixes, upgrades and incremental enhancements after launch." },
];

export default function Engagement() {
  const [pick, setPick] = useState<Key | null>(null);
  const refs = useRef<Partial<Record<Key, HTMLElement | null>>>({});

  const choose = (k: Key) => {
    const next = pick === k ? null : k;
    setPick(next);
    if (next && window.innerWidth < 861) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      refs.current[next]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    }
  };

  return (
    <section className="engage section light light--alt" id="engage">
      <div className="container">
        <div className="section-head section-head--center">
          <p className="label reveal">06 — Ways to work together</p>
          <h2 className="h2 reveal">Pick the model that fits <span className="serif">where you are.</span></h2>
        </div>

        <div className="fit reveal" role="group" aria-label="Find your fit">
          <span className="fit__q">Where are you right now?</span>
          <div className="fit__opts">
            {OPTIONS.map((o) => (
              <button key={o.key} type="button" className={pick === o.key ? "is-active" : undefined} aria-pressed={pick === o.key} onClick={() => choose(o.key)}>
                {o.q}
              </button>
            ))}
          </div>
        </div>

        <div className={`models${pick ? " has-pick" : ""}`}>
          {MODELS.map((m) => (
            <article key={m.key} ref={(el) => { refs.current[m.key] = el; }} className={`model reveal${pick === m.key ? " is-pick" : ""}`}>
              <span className="model__badge">Best match</span>
              <Icon name={m.icon} className="model__icon" />
              <h3>{m.title}</h3>
              <p>{m.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
