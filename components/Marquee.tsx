import { Fragment } from "react";

const ITEMS = [
  "Web Applications", "AI Chatbots", "Workflow Automation", "CRM & Portals", "Voice Agents", "Mobile Apps",
  "API Integrations", "Dashboards", "E-Commerce", "Document Processing", "SaaS Platforms", "Cloud & Support",
];

export default function Marquee() {
  return (
    <div className="marquee" aria-label="Capabilities">
      <div className="marquee__track">
        {[0, 1].map((copy) =>
          ITEMS.map((item) => (
            <Fragment key={`${copy}-${item}`}>
              <span aria-hidden={copy === 1 || undefined}>{item}</span>
              <i aria-hidden="true">◆</i>
            </Fragment>
          ))
        )}
      </div>
    </div>
  );
}
