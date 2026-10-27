import Badge from './Badge.jsx';
import { designer, SKILLS } from '../data/content.js';

const VALUE = { fontSize: 19, fontWeight: 600, lineHeight: 1.4 };

function Contact({ label, children }) {
  return (
    <div className="col cl-contact" style={{ flex: 1, gap: 10 }}>
      <span className="mono lbl">{label}</span>
      <b className="magnet" data-cursor="HELLO" style={VALUE}>{children}</b>
    </div>
  );
}

export default function Closing() {
  return (
    <section id="c10" data-label="CONTACT — LET'S TALK" style={{ background: 'var(--paper)', color: 'var(--ink)', padding: '150px 120px 120px' }}>
      <span className="mono cl-cap" style={{ color: 'var(--sig)' }}>What I bring</span>
      <div className="row" style={{ gap: 20, margin: '30px 0 120px' }}>
        {SKILLS.map(([a, b]) => (
          <div key={a} className="col cl-skill" style={{ flex: 1, gap: 10, borderTop: '2px solid var(--ink)', paddingTop: 22 }}>
            <b style={{ fontSize: 21 }}>{a}</b>
            <span style={{ fontSize: 15, lineHeight: 1.55, opacity: 0.7 }}>{b}</span>
          </div>
        ))}
      </div>
      <div style={{ position: 'relative' }}>
        <div className="anton cl-thank" style={{ fontSize: 300, lineHeight: 0.82 }}>THANK</div>
        <div className="row" style={{ alignItems: 'flex-end', gap: 40, marginBottom: 80 }}>
          <div className="anton out cl-you" style={{ fontSize: 300, lineHeight: 0.82, color: 'var(--ink)' }}>YOU.</div>
          <div className="cl-msg" style={{ fontSize: 22, lineHeight: 1.5, opacity: 0.75, maxWidth: 460, paddingBottom: 24 }}>
            If one of these systems is what your brand's feed needs, hit Appreciate and let's talk.
          </div>
        </div>
        <Badge
          id="closing"
          size={210}
          text="AVAILABLE FOR WORK ✶ LET'S TALK ✶ 2026 ✶ "
          fg="#fff" bg="#FF4D1A" star="#fff"
          className="cl-badge"
          style={{ position: 'absolute', right: 0, top: 20 }}
        />
      </div>
      <div className="row cl-row" style={{ borderTop: '1px solid rgba(13,13,14,.2)', paddingTop: 30 }}>
        <Contact label="Designer">{designer.name}<br />{designer.title}</Contact>
        <Contact label="Based in">{designer.basedIn[0]}<br />{designer.basedIn[1]}</Contact>
        <Contact label="Email">{designer.email}</Contact>
        <Contact label="Behance">{designer.behance}</Contact>
      </div>
    </section>
  );
}
