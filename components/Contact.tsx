"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "./Icon";
import { CONTACT } from "@/lib/mark";

const NEEDS = [
  ["Custom Software", "Custom Software"],
  ["Website / E-Commerce", "Website"],
  ["Mobile App", "Mobile App"],
  ["AI Solution", "AI"],
  ["Automation", "Automation"],
  ["Integrations", "Integrations"],
  ["Data & Dashboards", "Dashboards"],
  ["Cloud & Support", "Support"],
] as const;

type Field = "name" | "email" | "message";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [invalid, setInvalid] = useState<Set<Field>>(new Set());
  const [status, setStatus] = useState<{ text: string; error: boolean }>({ text: "", error: false });

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (k: string) => String(data.get(k) ?? "").trim();
    const bad = new Set<Field>();
    if (!get("name")) bad.add("name");
    if (!EMAIL_RE.test(get("email"))) bad.add("email");
    if (!get("message")) bad.add("message");
    setInvalid(bad);
    if (bad.size) {
      setStatus({ text: "Please fill in your name, a valid email and the problem you want to solve.", error: true });
      return;
    }
    const needs = data.getAll("need").join(", ") || "Not sure yet";
    const company = get("company");
    const subject = `Project inquiry from ${get("name")}${company ? ` (${company})` : ""}`;
    const body = [
      `Name: ${get("name")}`,
      `Company: ${company || "-"}`,
      `Email: ${get("email")}`,
      `Interested in: ${needs}`,
      "",
      "Problem to solve:",
      get("message"),
    ].join("\n");
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus({ text: `Opening your email app. If nothing happens, email ${CONTACT.email} directly.`, error: false });
  };

  const clear = (k: Field) => invalid.has(k) && setInvalid((s) => { const n = new Set(s); n.delete(k); return n; });
  const fieldCls = (k: Field) => `field${invalid.has(k) ? " is-invalid" : ""}`;

  return (
    <section className="contact section" id="contact">
      <div className="contact__bg" aria-hidden="true" />
      <div className="container contact__grid">
        <div className="contact__copy">
          <p className="label reveal">08 — Start with the business problem</p>
          <h2 className="contact__title reveal">Let us build around <span className="serif gold-text">your business.</span></h2>
          <p className="section-sub reveal">Tell us the problem you want to solve. In a discovery discussion we&apos;ll look at your current workflow, pain points, desired outcome, users, existing systems and priorities. Then we&apos;ll prepare a recommended solution, scope, estimated timeline and commercial proposal.</p>
          <div className="contact__cards reveal">
            <a className="ccard" href={`mailto:${CONTACT.email}`}>
              <span className="ccard__icon"><Icon name="mail" /></span>
              <span><small>Email</small><b>{CONTACT.email}</b></span>
            </a>
            <a className="ccard" href={CONTACT.phoneHref}>
              <span className="ccard__icon"><Icon name="call" /></span>
              <span><small>Phone</small><b>{CONTACT.phoneDisplay}</b></span>
            </a>
          </div>
        </div>

        <form className="form reveal" noValidate onSubmit={onSubmit}>
          <h3 className="form__title">Tell us about your project</h3>
          <div className="form__row">
            <label className={fieldCls("name")}><span>Your name</span><input name="name" type="text" autoComplete="name" required placeholder="Juan Dela Cruz" onInput={() => clear("name")} /></label>
            <label className="field"><span>Company</span><input name="company" type="text" autoComplete="organization" placeholder="Company name" /></label>
          </div>
          <label className={fieldCls("email")}><span>Email</span><input name="email" type="email" autoComplete="email" required placeholder="you@company.com" onInput={() => clear("email")} /></label>
          <fieldset className="field">
            <legend>What do you need? <em>(choose any)</em></legend>
            <div className="tags">
              {NEEDS.map(([value, label]) => (
                <label key={value}><input type="checkbox" name="need" value={value} /><span>{label}</span></label>
              ))}
            </div>
          </fieldset>
          <label className={fieldCls("message")}><span>What problem do you want to solve?</span><textarea name="message" rows={4} required placeholder="E.g. our team tracks client requests across email and spreadsheets and we lose track of follow-ups…" onInput={() => clear("message")} /></label>
          <button className="btn btn--gold btn--block magnetic" type="submit">Send inquiry <Icon name="arrow" /></button>
          <p className={`form__status${status.error ? " is-error" : ""}`} role="status">{status.text}</p>
        </form>
      </div>
    </section>
  );
}
