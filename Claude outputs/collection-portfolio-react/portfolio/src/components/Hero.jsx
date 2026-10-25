import Badge from './Badge.jsx';
import Tape from './Tape.jsx';
import ImageFloor from './ImageFloor.jsx';
import { HeroCanvas } from '../fx/WebGL.jsx';
import { STATIC } from '../fx/motion.js';
import { designer, rep, tapes } from '../data/content.js';

const FLOOR = (
  <ImageFloor
    keys={rep(48)}
    size={250}
    floorStyle={{ left: -200, top: 520, width: 1900, height: 1300 }}
    planeTransform="rotateX(58deg) rotateZ(-28deg) translate(-120px,-260px)"
  />
);

export default function Hero() {
  return (
    <section id="c01" data-label="INTRO" style={{ height: 1500, padding: 0 }}>
      {STATIC ? FLOOR : <HeroCanvas width={1400} height={1500} fallback={FLOOR} />}
      <div
        className="hero-shade"
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: STATIC
            ? 'linear-gradient(180deg,#0D0D0E 0%,#0D0D0E 30%,rgba(13,13,14,.55) 52%,rgba(13,13,14,0) 72%,rgba(13,13,14,.85) 100%)'
            : 'radial-gradient(ellipse 60% 40% at 50% 26%,rgba(13,13,14,.75) 0%,rgba(13,13,14,0) 70%),linear-gradient(180deg,rgba(13,13,14,0) 60%,rgba(13,13,14,.9) 100%)',
        }}
      />
      <div
        className="hero-glow"
        style={{
          position: 'absolute', left: 250, top: 160, width: 900, height: 700, borderRadius: '50%', pointerEvents: 'none',
          background: 'rgba(255,77,26,.35)', filter: 'blur(140px)', mixBlendMode: 'screen',
        }}
      />
      <div className="row hero-top" style={{ position: 'absolute', left: 120, right: 120, top: 52, justifyContent: 'space-between', zIndex: 6 }}>
        <span className="mono" style={{ opacity: 0.75 }}>{designer.name} — Designer</span>
        <span className="mono" style={{ opacity: 0.75 }}>Selected client work</span>
        <span className="mono" style={{ opacity: 0.75 }}>Behance · 2026</span>
      </div>
      <div className="hero-title" style={{ position: 'absolute', left: 0, right: 0, top: 150, textAlign: 'center', zIndex: 6, pointerEvents: 'none' }}>
        <div className="anton hero-l1" style={{ fontSize: 300, lineHeight: 0.82, letterSpacing: '-.01em' }}>SOCIAL MEDIA</div>
        <div className="row hero-l2" style={{ justifyContent: 'center', alignItems: 'center', gap: 30, marginTop: 4 }}>
          <span className="serif hero-the" style={{ fontSize: 140, lineHeight: 0.9, color: 'var(--sig)' }}>the</span>
          <span className="anton hero-design" style={{ fontSize: 270, lineHeight: 0.82, color: 'var(--sig)' }}>DESIGN</span>
          <span className="serif hero-edit" style={{ fontSize: 140, lineHeight: 0.9, color: 'var(--sig)' }}>edit</span>
        </div>
      </div>
      <div className="hero-badge" style={{ position: 'absolute', left: 1110, top: 170, zIndex: 7 }}>
        <Badge
          id="hero"
          text={`${designer.name.toUpperCase()} ✶ PORTFOLIO 2026 ✶ DESIGN ✶ `}
          fg="#0D0D0E" bg="#B5FF00" star="#0D0D0E"
          style={{ transform: 'rotate(-12deg)', display: 'block' }}
        />
      </div>
      <Tape words={tapes.heroA} top={1140} background="var(--sig)" color="var(--ink)" rotate={-4} />
      <Tape words={tapes.heroB} top={1250} background="#fff" color="var(--ink)" rotate={3} />
      <div className="row hero-foot" style={{ position: 'absolute', left: 120, right: 120, top: 1390, zIndex: 6, justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <span style={{ fontSize: 18, lineHeight: 1.5, opacity: 0.8, maxWidth: 560 }}>
          Template-driven post sets for five brands across Sri Lanka and Australia — EV, tools, spare parts, tourism and vehicles.
        </span>
        <span className="mono hero-scroll" style={{ opacity: 0.6 }}>Scroll ↓</span>
      </div>
    </section>
  );
}
