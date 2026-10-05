"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { READY_EVENT } from "./Loader";
import { MARK_VIEWBOX, markPaths as p } from "@/lib/mark";

type Node = { x: number; y: number; vx: number; vy: number; r: number; gold: boolean };
type Packet = { a: Node; b: Node; t: number };

/** Drifting data network: nodes link up when close and gold "packets" travel between them. */
function useNetworkCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>, heroRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current!;
    const hero = heroRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, nodes: Node[] = [], packets: Packet[] = [], visible = true, raf = 0;
    const mouse = { x: -9999, y: -9999 };

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(90, Math.max(28, (W * H) / 16000)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.6, gold: Math.random() < 0.12,
      }));
      packets = [];
    };

    const draw = () => {
      const link = W < 640 ? 110 : 150;
      ctx.clearRect(0, 0, W, H);
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        const dx = mouse.x - n.x, dy = mouse.y - n.y;
        if (Math.hypot(dx, dy) < 180) { n.x -= dx * 0.004; n.y -= dy * 0.004; }
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < link) {
            ctx.strokeStyle = `rgba(80,170,230,${(1 - d / link) * 0.22})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            if (packets.length < 14 && Math.random() < 0.0009) packets.push({ a, b, t: 0 });
          }
        }
      }
      for (const n of nodes) {
        ctx.fillStyle = n.gold ? "rgba(246,217,143,.9)" : "rgba(120,200,240,.7)";
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      }
      packets = packets.filter((pk) => {
        pk.t += 0.012;
        if (pk.t >= 1) return false;
        const x = pk.a.x + (pk.b.x - pk.a.x) * pk.t, y = pk.a.y + (pk.b.y - pk.a.y) * pk.t;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 8);
        g.addColorStop(0, "rgba(246,217,143,1)"); g.addColorStop(1, "rgba(246,217,143,0)");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 8, 0, Math.PI * 2); ctx.fill();
        return true;
      });
    };

    const loop = () => { if (visible) draw(); raf = requestAnimationFrame(loop); };
    size();
    if (reduce) draw(); else raf = requestAnimationFrame(loop);

    let resizeT: ReturnType<typeof setTimeout>;
    let lastW = window.innerWidth;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(() => {
        // Ignore height-only changes from mobile URL bars
        if (window.innerWidth !== lastW || Math.abs(canvas.offsetHeight - H) > 120) {
          lastW = window.innerWidth; size(); if (reduce) draw();
        }
      }, 200);
    };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; };
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting));
    io.observe(hero);
    window.addEventListener("resize", onResize);
    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf); io.disconnect(); clearTimeout(resizeT);
      window.removeEventListener("resize", onResize);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
    };
  }, [canvasRef, heroRef]);
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [toastsOn, setToastsOn] = useState(0);

  useNetworkCanvas(canvasRef, heroRef);

  // Mouse parallax on the logo layers (desktop only)
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    const hero = heroRef.current!;
    const onMove = (e: PointerEvent) =>
      setTilt({ x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 });
    hero.addEventListener("pointermove", onMove);
    return () => hero.removeEventListener("pointermove", onMove);
  }, []);

  // Notification toasts appear one by one once the loader lifts
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const start = () => [1, 2, 3].forEach((n, i) => timers.push(setTimeout(() => setToastsOn(n), 600 + i * 700)));
    if (document.body.classList.contains("is-ready")) start();
    else window.addEventListener(READY_EVENT, start, { once: true });
    return () => { timers.forEach(clearTimeout); window.removeEventListener(READY_EVENT, start); };
  }, []);

  const layer = (depth: number) => ({ transform: `translate(${tilt.x * depth * 18}px, ${tilt.y * depth * 14}px)` });
  const toast = (n: number) => (toastsOn >= n ? " is-on" : "");

  return (
    <section className="hero" id="top" ref={heroRef}>
      <canvas className="hero__canvas" ref={canvasRef} aria-hidden="true" />
      <div className="hero__glow" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="eyebrow reveal"><span className="dot" /> Custom Software · AI · Automation · Integrations · Cloud</p>
          <h1 className="hero__title">
            <span className="line"><span>Technology</span></span>
            <span className="line"><span>built around</span></span>
            <span className="line"><span className="serif gold-text">your business.</span></span>
          </h1>
          <p className="hero__lede reveal">
            Aurevixa designs and builds custom digital systems around how your team <em>actually</em> works: software,
            AI, automation, integrations, data and cloud, combined into one solution that fits.
          </p>
          <div className="hero__ctas reveal">
            <a className="btn btn--gold magnetic" href="#contact">Start with a discovery call <Icon name="arrow" /></a>
            <a className="btn btn--ghost magnetic" href="#automation">See it in action</a>
          </div>
        </div>

        <div className="hero__visual" aria-hidden="true">
          <div className="orbit orbit--1" />
          <div className="orbit orbit--2" />
          <svg className="hero__mark" viewBox={MARK_VIEWBOX}>
            <g className="layer" style={layer(0.6)}>
              <path fill="url(#g-teal)" d={p.teal} />
              <path fill="#000" opacity=".14" d={p.tealShade} />
            </g>
            <g className="layer" style={layer(1)}>
              <path fill="url(#g-navy-bright)" d={p.navy} />
              <path fill="#000" opacity=".22" d={p.navyShade} />
            </g>
            <g className="layer" style={layer(1.6)}>
              <path fill="url(#g-gold)" stroke="url(#g-gold)" strokeWidth="14" strokeLinejoin="round" d={p.gold} />
            </g>
          </svg>
          <div className={`toast toast--a${toast(1)}`}><span className="toast__icon t-teal"><Icon name="inbox" /></span><div><b>Request received</b><small>Web form · just now</small></div></div>
          <div className={`toast toast--b${toast(2)}`}><span className="toast__icon t-gold"><Icon name="user" /></span><div><b>Owner assigned</b><small>Operations team</small></div></div>
          <div className={`toast toast--c${toast(3)}`}><span className="toast__icon t-blue"><Icon name="chart" /></span><div><b>Report generated</b><small>Auto-sent · 08:00</small></div></div>
        </div>
      </div>
      <div className="hero__scroll" aria-hidden="true"><span />Scroll</div>
    </section>
  );
}
