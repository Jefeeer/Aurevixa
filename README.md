# Aurevixa Technologies — Website

Company website for **Aurevixa Technologies**, *technology built around your business.*
Custom Software · AI · Automation · Integrations · Cloud.

Built with **Next.js (App Router) + TypeScript**. No UI libraries: hand-written CSS and a few small client components.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure

```
app/          layout (metadata, font), page, global styles, icons
components/   one component per section (Hero, Services, Simulator, Process, …)
lib/mark.ts   brand mark geometry + contact details
public/brand/ supplied logo files
docs/         company profile & proposal PDFs (source content)
```

## Highlights

- Live "data network" hero canvas with a layered, parallax version of the Aurevixa mark
- Flip cards for the problems we solve, plus a bento grid of the eight capabilities with animated mock UIs
- Interactive **manual → automated workflow simulator** with a live automation log
- Scroll-driven statement text and process timeline
- "Find your fit" picker for engagement models
- Contact form that drafts an email to the team (no backend required)
- Fully responsive (320px phones to wide desktops), keyboard accessible, respects `prefers-reduced-motion`

## Deploy

Deployed on Vercel at https://aurevixa.vercel.app
