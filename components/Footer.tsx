import { Brand } from "./Icon";
import { CONTACT } from "@/lib/mark";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Brand />
          <p>Technology built around your business.</p>
        </div>
        <div className="footer__col">
          <h4>Build</h4>
          <a href="#services">Custom Software</a>
          <a href="#services">Websites &amp; E-Commerce</a>
          <a href="#services">Mobile Apps</a>
          <a href="#services">AI Solutions</a>
        </div>
        <div className="footer__col">
          <h4>Connect</h4>
          <a href="#services">Automation</a>
          <a href="#services">Integrations &amp; APIs</a>
          <a href="#services">Data &amp; Dashboards</a>
          <a href="#services">Cloud &amp; Support</a>
        </div>
        <div className="footer__col">
          <h4>Talk to us</h4>
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <a href={CONTACT.phoneHref}>{CONTACT.phoneDisplay}</a>
          <a href="#contact">Start a project →</a>
        </div>
      </div>
      <div className="container footer__base">
        <span>© {new Date().getFullYear()} Aurevixa Technologies. All rights reserved.</span>
        <span>Custom Software | AI | Automation | Integrations | Cloud</span>
        <a href="#top" className="totop">Back to top ↑</a>
      </div>
    </footer>
  );
}
