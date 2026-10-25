import { img } from './lib/img.js';
import { ALL, designer } from './data/content.js';

// Behance cover thumbnail (808 × 632).
const SERIF = { fontFamily: "'Instrument Serif'", fontStyle: 'italic', fontSize: 76, color: '#FF4D1A' };
const CORNER = { top: 24, fontFamily: 'JBM', fontWeight: 700, fontSize: 10, letterSpacing: '.1em', opacity: 0.7 };

export default function Cover() {
  return (
    <>
      <div className="a" style={{ left: -180, top: 250, width: 1300, height: 700, perspective: 1000 }}>
        <div
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(8,150px)', gap: 14,
            transform: 'rotateX(58deg) rotateZ(-26deg) translate(-40px,-160px)',
          }}
        >
          {Array.from({ length: 40 }, (_, i) => (
            <img key={i} src={img(ALL[i % ALL.length])} alt="" style={{ width: 150, height: 150 }} />
          ))}
        </div>
      </div>
      <div className="a" style={{ inset: 0, background: 'linear-gradient(180deg,#0D0D0E 0%,#0D0D0E 34%,rgba(13,13,14,.4) 62%,rgba(13,13,14,.2) 100%)' }} />
      <div className="a" style={{ left: 300, top: 300, width: 520, height: 380, borderRadius: '50%', background: 'rgba(255,77,26,.35)', filter: 'blur(90px)' }} />
      <div className="a" style={{ left: 0, right: 0, top: 46, textAlign: 'center' }}>
        <div className="anton" style={{ fontSize: 158 }}>SOCIAL MEDIA</div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, marginTop: 2 }}>
          <span style={SERIF}>the</span>
          <span className="anton" style={{ fontSize: 150, color: '#FF4D1A' }}>DESIGN</span>
          <span style={SERIF}>edit</span>
        </div>
      </div>
      <div
        className="a"
        style={{
          left: -60, width: 1000, top: 470, background: '#FF4D1A', color: '#0D0D0E', fontFamily: 'Anton', fontSize: 30,
          padding: '12px 0', whiteSpace: 'nowrap', transform: 'rotate(-4deg)',
        }}
      >
        {'  24 POSTS ✶ 5 BRANDS ✶ TEMPLATE SYSTEMS ✶ 24 POSTS ✶ 5 BRANDS ✶ TEMPLATE SYSTEMS'}
      </div>
      <div
        className="a"
        style={{
          left: -60, width: 1000, top: 528, background: '#fff', color: '#0D0D0E', fontFamily: 'Anton', fontSize: 26,
          padding: '10px 0', whiteSpace: 'nowrap', transform: 'rotate(2.5deg)',
        }}
      >
        {'  LUYUAN EV ✶ KIAWAY TOOLS ✶ SAKURA ✶ RISING SRI LANKA ✶ SHANE GROUP AUTOHUB ✶ LUYUAN EV'}
      </div>
      <div className="a" style={{ ...CORNER, left: 40 }}>{designer.name.toUpperCase()}</div>
      <div className="a" style={{ ...CORNER, right: 40 }}>PORTFOLIO 2026</div>
    </>
  );
}
