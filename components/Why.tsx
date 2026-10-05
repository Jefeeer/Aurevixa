const PROMISES = [
  <>Solutions designed around <b>your process</b>, not a pre-built template.</>,
  <>Software, AI, automation, integrations, data and cloud, <b>combined in one solution</b>.</>,
  <>A focus on <b>practical outcomes</b>: faster processing, fewer manual tasks, better visibility.</>,
  <>Systems designed for <b>scalability, usability and maintainability</b>.</>,
  <>Support across the <b>full lifecycle</b>, from discovery to continuous improvement.</>,
];

export default function Why() {
  return (
    <section className="why section" id="why">
      <div className="container">
        <div className="why__grid">
          <div>
            <p className="label reveal">07 — What you can expect</p>
            <h2 className="h2 reveal">Built for outcomes, <span className="serif gold-text">not for show.</span></h2>
            <ul className="promises">
              {PROMISES.map((p, i) => (
                <li key={i} className="reveal"><span>{String(i + 1).padStart(2, "0")}</span><p>{p}</p></li>
              ))}
            </ul>
          </div>

          <aside className="name reveal" aria-label="Brand meaning">
            <div className="name__mark"><svg aria-hidden="true"><use href="#mark" /></svg></div>
            <p className="name__kicker">The name</p>
            <p className="name__word">Aurevixa</p>
            <p className="name__text">An invented name built around four ideas. We apply technology where it creates practical value, and we design around the client instead of around a single product.</p>
            <ul className="name__ideas">
              <li><b>Value</b></li>
              <li><b>Innovation</b></li>
              <li><b>Adaptability</b></li>
              <li><b>Forward movement</b></li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
