import ImageFloor from './ImageFloor.jsx';
import Tape from './Tape.jsx';
import { GlobeCanvas } from '../fx/WebGL.jsx';
import { STATIC } from '../fx/motion.js';
import { rep, tapes } from '../data/content.js';

const FLOOR = (
  <>
    <ImageFloor
      keys={rep(56, 7)}
      size={240}
      floorStyle={{ left: -300, top: -200, width: 2000, height: 1600 }}
      planeTransform="rotateX(48deg) rotateZ(24deg) translate(40px,-120px)"
    />
    <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center,rgba(13,13,14,.55) 0%,rgba(13,13,14,.82) 70%)' }} />
  </>
);

export default function Wall() {
  return (
    <section id="c09" data-label="THE WALL — DRAG IT" style={{ height: 1200, padding: 0, background: STATIC ? 'var(--sig)' : 'radial-gradient(ellipse at center,#5a2410 0%,#2a120a 55%,#120a08 100%)' }}>
      {STATIC ? FLOOR : <GlobeCanvas width={1400} height={1200} fallback={FLOOR} />}
      <div className="wall-text" style={{ position: 'absolute', left: 0, right: 0, top: 300, textAlign: 'center', pointerEvents: 'none' }}>
        <div className="anton wall-l1" style={{ fontSize: 240, lineHeight: 0.84 }}>24 POSTS.</div>
        <div className="anton out wall-l2" style={{ fontSize: 240, lineHeight: 0.84, color: '#fff' }}>5 BRANDS.</div>
      </div>
      <div className="serif wall-l3" style={{ position: 'absolute', left: 0, right: 0, top: 300 + 403, textAlign: 'center', pointerEvents: 'none', fontSize: 130, lineHeight: 1.05, color: 'var(--sig)' }}>one designer.</div>
      <Tape words={tapes.wall} top={1060} background="var(--ink)" color="var(--sig)" rotate={-3} />
    </section>
  );
}
