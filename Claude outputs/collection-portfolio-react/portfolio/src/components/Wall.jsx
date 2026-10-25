import ImageFloor from './ImageFloor.jsx';
import Tape from './Tape.jsx';
import { rep, tapes } from '../data/content.js';

export default function Wall() {
  return (
    <section id="c09" style={{ height: 1200, padding: 0, background: 'var(--sig)' }}>
      <ImageFloor
        keys={rep(56, 7)}
        size={240}
        floorStyle={{ left: -300, top: -200, width: 2000, height: 1600 }}
        planeTransform="rotateX(48deg) rotateZ(24deg) translate(40px,-120px)"
      />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center,rgba(13,13,14,.55) 0%,rgba(13,13,14,.82) 70%)' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 300, textAlign: 'center' }}>
        <div className="anton" style={{ fontSize: 240, lineHeight: 0.84 }}>24 POSTS.</div>
        <div className="anton out" style={{ fontSize: 240, lineHeight: 0.84, color: '#fff' }}>5 BRANDS.</div>
        <div className="serif" style={{ fontSize: 130, lineHeight: 1.05, color: 'var(--sig)' }}>one designer.</div>
      </div>
      <Tape words={tapes.wall} top={1060} background="var(--ink)" color="var(--sig)" rotate={-3} />
    </section>
  );
}
