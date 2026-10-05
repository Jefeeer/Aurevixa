import { MARK_VIEWBOX, markPaths as p } from "@/lib/mark";

/** Shared gradients, the brand mark symbol and the icon sprite, rendered once per page. */
export default function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <linearGradient id="g-navy-bright" x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0" stopColor="#0d3d78" />
          <stop offset="0.55" stopColor="#1477d0" />
          <stop offset="1" stopColor="#0d4a8f" />
        </linearGradient>
        <linearGradient id="g-teal" x1="0.6" y1="0" x2="0.2" y2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="0.5" stopColor="#0aa1c0" />
          <stop offset="1" stopColor="#056f8e" />
        </linearGradient>
        <linearGradient id="g-gold" x1="0.2" y1="0.1" x2="0.9" y2="1">
          <stop offset="0" stopColor="#fbe2a0" />
          <stop offset="0.5" stopColor="#d4a545" />
          <stop offset="1" stopColor="#93620d" />
        </linearGradient>

        <symbol id="mark" viewBox={MARK_VIEWBOX}>
          <path fill="url(#g-teal)" d={p.teal} />
          <path fill="#000" opacity=".14" d={p.tealShade} />
          <path fill="url(#g-navy-bright)" d={p.navy} />
          <path fill="#000" opacity=".22" d={p.navyShade} />
          <path fill="url(#g-gold)" stroke="url(#g-gold)" strokeWidth="14" strokeLinejoin="round" d={p.gold} />
        </symbol>

        <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></symbol>
        <symbol id="i-inbox" viewBox="0 0 24 24"><path d="M3 13l2.5-7.5A2 2 0 0 1 7.4 4h9.2a2 2 0 0 1 1.9 1.5L21 13v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M3 13h5l1.5 3h5L16 13h5" /></symbol>
        <symbol id="i-user" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></symbol>
        <symbol id="i-chart" viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></symbol>
        <symbol id="i-keyboard" viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10" /></symbol>
        <symbol id="i-unlink" viewBox="0 0 24 24"><path d="M9 7H7a5 5 0 0 0 0 10h2M15 7h2a5 5 0 0 1 2.5 9.3M8 12h3M3 3l18 18" /></symbol>
        <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></symbol>
        <symbol id="i-eye" viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" /><circle cx="12" cy="12" r="3" /></symbol>
        <symbol id="i-legacy" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="12" rx="1" /><path d="M8 20h8M12 16v4M7 8h4M7 11h7" /></symbol>
        <symbol id="i-rocket" viewBox="0 0 24 24"><path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2M9 18l-3-3M14.5 4.5C17 3 21 3 21 3s0 4-1.5 6.5L13 16l-5-5z" /><circle cx="15.5" cy="8.5" r="1.5" /></symbol>
        <symbol id="i-code" viewBox="0 0 24 24"><path d="M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" /></symbol>
        <symbol id="i-spark" viewBox="0 0 24 24"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" /></symbol>
        <symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" /></symbol>
        <symbol id="i-phone" viewBox="0 0 24 24"><rect x="6" y="2" width="12" height="20" rx="2.5" /><path d="M11 18h2" /></symbol>
        <symbol id="i-flow" viewBox="0 0 24 24"><rect x="3" y="3" width="6" height="6" rx="1.5" /><rect x="15" y="15" width="6" height="6" rx="1.5" /><path d="M9 6h4a3 3 0 0 1 3 3v6" /><path d="M14 12l2 3 2-3" /></symbol>
        <symbol id="i-plug" viewBox="0 0 24 24"><path d="M9 2v5M15 2v5M6 7h12v4a6 6 0 0 1-12 0zM12 17v5" /></symbol>
        <symbol id="i-cloud" viewBox="0 0 24 24"><path d="M7 18a5 5 0 0 1-.6-10A6 6 0 0 1 18 9a4.5 4.5 0 0 1-.5 9z" /></symbol>
        <symbol id="i-grid" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18" /></symbol>
        <symbol id="i-chat" viewBox="0 0 24 24"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /></symbol>
        <symbol id="i-scan" viewBox="0 0 24 24"><path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3M7 12h10" /></symbol>
        <symbol id="i-check" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M8 12l3 3 5-6" /></symbol>
        <symbol id="i-bell" viewBox="0 0 24 24"><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4zM10 21h4" /></symbol>
        <symbol id="i-pulse" viewBox="0 0 24 24"><path d="M3 12h4l3-7 4 14 3-7h4" /></symbol>
        <symbol id="i-doc" viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></symbol>
        <symbol id="i-play" viewBox="0 0 24 24"><path d="M7 4l13 8-13 8z" /></symbol>
        <symbol id="i-target" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></symbol>
        <symbol id="i-loop" viewBox="0 0 24 24"><path d="M17 2l3 3-3 3" /><path d="M4 11V9a4 4 0 0 1 4-4h12M7 22l-3-3 3-3" /><path d="M20 13v2a4 4 0 0 1-4 4H4" /></symbol>
        <symbol id="i-team" viewBox="0 0 24 24"><circle cx="9" cy="8" r="3.5" /><path d="M2 20c1-3.5 3.8-5.5 7-5.5s6 2 7 5.5" /><circle cx="17" cy="9" r="2.5" /><path d="M17 14c2.5 0 4.2 1.6 5 4" /></symbol>
        <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></symbol>
        <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></symbol>
        <symbol id="i-call" viewBox="0 0 24 24"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></symbol>
        <symbol id="i-facebook" viewBox="0 0 24 24"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v7h4v-7h3l1-4h-4V8z" /></symbol>
      </defs>
    </svg>
  );
}
