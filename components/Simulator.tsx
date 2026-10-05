"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon, type IconName } from "./Icon";

type Mode = "manual" | "auto";
type LogLine = { time: string; title: string; detail: string; done?: boolean };

const STEPS: { icon: IconName; b: string; s: string; log: string; detail: string }[] = [
  { icon: "inbox", b: "Request", s: "received", log: "New request via web form", detail: "#REQ-1042 · Priority: normal" },
  { icon: "scan", b: "Information", s: "captured", log: "Information captured", detail: "name, company, service & details extracted" },
  { icon: "check", b: "Task", s: "created", log: "Task created", detail: "added to the operations board" },
  { icon: "user", b: "Owner", s: "assigned", log: "Owner assigned", detail: "routed to Operations by request type" },
  { icon: "bell", b: "Customer", s: "notified", log: "Customer notified", detail: "confirmation sent by email + SMS" },
  { icon: "pulse", b: "Status", s: "tracked", log: "Status tracked", detail: "In progress · response timer started" },
  { icon: "chart", b: "Dashboard", s: "updated", log: "Dashboard updated", detail: "live metrics refreshed" },
  { icon: "doc", b: "Report", s: "generated", log: "Report generated", detail: "included in the weekly summary, automatically" },
];

const stamp = (offset: number) => new Date(Date.now() + offset).toTimeString().slice(0, 8);

export default function Simulator() {
  const [mode, setMode] = useState<Mode>("manual");
  const [active, setActive] = useState(-1);
  const [log, setLog] = useState<LogLine[]>([]);
  const [running, setRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const runId = useRef(0);

  useEffect(() => () => { runId.current++; }, []);

  const run = async () => {
    if (running) return;
    const id = ++runId.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wait = (ms: number) => new Promise((r) => setTimeout(r, reduce ? 0 : ms));
    setRunning(true);
    setHasRun(true);
    setActive(-1);
    setLog([]);
    let offset = 0;
    for (let i = 0; i < STEPS.length; i++) {
      await wait(i === 0 ? 200 : 650);
      if (id !== runId.current) return;
      offset += 300 + Math.random() * 900;
      const line = { time: stamp(offset), title: STEPS[i].log, detail: STEPS[i].detail };
      setActive(i);
      setLog((l) => [...l, line]);
    }
    await wait(500);
    if (id !== runId.current) return;
    setLog((l) => [...l, { time: stamp(offset + 400), title: "Done in seconds. No re-typing, no chasing, nothing to copy-paste.", detail: "", done: true }]);
    setRunning(false);
  };

  const switchTo = (m: Mode) => {
    setMode(m);
    if (m === "auto" && !hasRun) setTimeout(run, 500);
  };

  const progress = active < 0 ? 0 : active / (STEPS.length - 1);

  return (
    <section className="sim section" id="automation">
      <div className="container">
        <div className="section-head section-head--center">
          <p className="label reveal">04 — From manual to automated</p>
          <h2 className="h2 reveal">Watch a workflow <span className="serif gold-text">rebuild itself.</span></h2>
          <p className="section-sub reveal">A team gets requests by email, types them into spreadsheets, hands out work over chat, chases customers and builds reports by hand. Here&apos;s that same process after a redesign.</p>
        </div>

        <div className={`sim__switch reveal${mode === "auto" ? " is-auto" : ""}`} role="tablist" aria-label="Workflow mode">
          {(["manual", "auto"] as Mode[]).map((m) => (
            <button key={m} role="tab" type="button" className={`sim__tab${mode === m ? " is-active" : ""}`} aria-selected={mode === m} aria-controls={`sim-${m}`} onClick={() => switchTo(m)}>
              {m === "manual" ? "Manual workflow" : "Automated system"}
            </button>
          ))}
          <span className="sim__thumb" aria-hidden="true" />
        </div>

        <div className="sim__stage reveal" data-mode={mode}>
          <div className="sim__manual" id="sim-manual" role="tabpanel" aria-hidden={mode !== "manual"}>
            <svg className="tangle" viewBox="0 0 1000 440" preserveAspectRatio="none" aria-hidden="true">
              <path d="M160 110 C 400 20, 420 380, 640 120 S 900 300, 820 360" />
              <path d="M180 330 C 380 420, 520 60, 760 200 S 880 60, 860 110" />
              <path d="M150 120 C 260 300, 600 340, 500 220 S 300 60, 820 330" />
            </svg>
            <div className="chaos chaos--mail"><Icon name="inbox" /><div><b>Inbox</b><small>37 unread · &ldquo;Any update??&rdquo;</small></div></div>
            <div className="chaos chaos--sheet"><Icon name="grid" /><div><b>requests_FINAL_v3.xlsx</b><small>Last edited by ??? · conflict</small></div></div>
            <div className="chaos chaos--chat"><Icon name="chat" /><div><b>Team chat</b><small>&ldquo;Who&apos;s handling this one?&rdquo;</small></div></div>
            <div className="chaos chaos--note"><b>Report due Friday</b><small>Copy-paste from 4 sources</small></div>
            <div className="chaos chaos--phone"><Icon name="phone" /><div><b>Missed call</b><small>Customer · 3rd follow-up</small></div></div>
            <div className="manual__verdict"><span>Hours lost to</span><b>re-typing · chasing · copy-pasting</b></div>
          </div>

          <div className="sim__auto" id="sim-auto" role="tabpanel" aria-hidden={mode !== "auto"}>
            <div className="pipeline" style={{ "--p": progress } as CSSProperties}>
              {STEPS.map((s, i) => (
                <div key={s.b} className={`node${i <= active ? " is-on" : ""}`}>
                  <span className="node__ring"><Icon name={s.icon} /></span>
                  <b>{s.b}</b>
                  <small>{s.s}</small>
                </div>
              ))}
            </div>
            <div className="console">
              <div className="console__head">
                <span><i /><i /><i /></span>
                <b>automation.log</b>
                <button className="console__run" type="button" onClick={run} disabled={running}>
                  <Icon name="play" /> {hasRun && !running ? "Run again" : "Simulate a request"}
                </button>
              </div>
              <ol className="console__body" aria-live="polite">
                {log.length === 0 && <li className="idle"><span>// waiting for a request… press &ldquo;Simulate a request&rdquo;</span></li>}
                {log.map((l, i) => (
                  <li key={i}>
                    <time>{l.time}</time>
                    <span className={`ok${l.done ? " done" : ""}`}>{l.done ? "★" : "✓"}</span>
                    {l.done
                      ? <span className="done">{l.title}</span>
                      : <span><b>{l.title}</b> <span className="c-dim">· {l.detail}</span></span>}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        <p className="sim__note reveal">This is an illustration. The actual solution, whether a web app, workflow automation, AI agent, system integration or some mix, is chosen after discovery. We don&apos;t automate for its own sake. We cut unnecessary work, make the process easier to see, and make it easier to scale.</p>
      </div>
    </section>
  );
}
