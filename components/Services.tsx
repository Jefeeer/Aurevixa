import type { CSSProperties } from "react";
import { Icon } from "./Icon";
import ChatMock from "./ChatMock";

const BARS = [38, 52, 44, 63, 58, 74, 69, 86, 80, 94];

export default function Services() {
  return (
    <section className="services section" id="services">
      <div className="container">
        <div className="section-head">
          <p className="label reveal">03 — What we build</p>
          <h2 className="h2 reveal">Eight capabilities. <span className="serif gold-text">One partner.</span></h2>
          <p className="section-sub reveal">From a simple website to a complete internal platform, mobile app, AI assistant or automated workflow. Combine whatever your problem needs.</p>
        </div>

        <div className="bento">
          <article className="tile tile--wide reveal">
            <div className="tile__body">
              <div className="tile__icon"><Icon name="code" /></div>
              <h3>Custom Software</h3>
              <p>Web applications, internal systems, CRM, portals, dashboards, SaaS platforms and operational tools.</p>
              <ul className="chips"><li>Web apps</li><li>CRM</li><li>Portals</li><li>SaaS</li></ul>
            </div>
            <div className="mock mock--app" aria-hidden="true">
              <div className="mock__bar"><i /><i /><i /><span>app.yourcompany.com</span></div>
              <div className="mock__app">
                <div className="mock__side"><b /><b className="on" /><b /><b /><b /></div>
                <div className="mock__main">
                  <div className="mock__kpis">
                    <div><small>Open requests</small><strong>24</strong></div>
                    <div><small>In progress</small><strong>11</strong></div>
                    <div><small>Done today</small><strong>38</strong></div>
                  </div>
                  <div className="mock__rows">
                    <div><span className="pill pill--teal">New</span><b /><em /></div>
                    <div><span className="pill pill--gold">Assigned</span><b /><em /></div>
                    <div><span className="pill pill--blue">Review</span><b /><em /></div>
                    <div><span className="pill pill--teal">New</span><b /><em /></div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <article className="tile tile--wide tile--ai reveal">
            <div className="tile__body">
              <div className="tile__icon"><Icon name="spark" /></div>
              <h3>AI Solutions</h3>
              <p>AI chatbots, voice agents, knowledge assistants, document processing, enterprise search and AI copilots.</p>
              <ul className="chips"><li>Chatbots</li><li>Voice agents</li><li>Doc processing</li><li>Copilots</li></ul>
            </div>
            <ChatMock />
          </article>

          <article className="tile reveal">
            <div className="tile__icon"><Icon name="globe" /></div>
            <h3>Websites &amp; E-Commerce</h3>
            <p>Corporate sites, landing pages, online stores, booking sites, membership platforms and self-service experiences.</p>
          </article>
          <article className="tile reveal">
            <div className="tile__icon"><Icon name="phone" /></div>
            <h3>Mobile Applications</h3>
            <p>Customer, employee, field-service, delivery, booking, sales, inventory and internal mobile apps.</p>
          </article>
          <article className="tile reveal">
            <div className="tile__icon"><Icon name="flow" /></div>
            <h3>Automation</h3>
            <p>Workflow automation, follow-ups, approvals, onboarding, reporting, notifications and back-office tasks.</p>
          </article>
          <article className="tile reveal">
            <div className="tile__icon"><Icon name="plug" /></div>
            <h3>Integrations &amp; APIs</h3>
            <p>Connect CRM, ERP, accounting, payment, e-commerce, email, calendar, cloud storage and messaging.</p>
          </article>

          <article className="tile tile--wide reveal">
            <div className="tile__body">
              <div className="tile__icon"><Icon name="chart" /></div>
              <h3>Data &amp; Dashboards</h3>
              <p>Databases, reporting dashboards, data migration, synchronization, pipelines and business intelligence.</p>
              <ul className="chips"><li>BI</li><li>Pipelines</li><li>Migration</li></ul>
            </div>
            <div className="mock mock--chart" aria-hidden="true">
              <div className="bars">
                {BARS.map((h, i) => <i key={i} style={{ "--h": `${h}%` } as CSSProperties} />)}
              </div>
              <svg className="spark" viewBox="0 0 300 100" preserveAspectRatio="none">
                <path d="M0 80 C30 70 50 76 75 60 S120 52 150 46 S210 30 240 26 S280 12 300 8" />
              </svg>
            </div>
          </article>

          <article className="tile tile--wide reveal">
            <div className="tile__body">
              <div className="tile__icon"><Icon name="cloud" /></div>
              <h3>Cloud &amp; Support</h3>
              <p>Deployment, monitoring, maintenance, performance improvement, security updates and ongoing enhancements.</p>
              <ul className="chips"><li>Deploy</li><li>Monitor</li><li>Secure</li><li>Improve</li></ul>
            </div>
            <div className="mock mock--term" aria-hidden="true">
              <p><span className="c-dim">$</span> deploy --env production</p>
              <p><span className="c-teal">✓</span> build passed <span className="c-dim">· 42s</span></p>
              <p><span className="c-teal">✓</span> health checks green</p>
              <p><span className="c-gold">●</span> monitoring active<span className="caret" /></p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
