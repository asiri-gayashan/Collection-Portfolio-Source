import { img } from '../../lib/img.js';

// Chapter 05 — roadside billboard mockup at sunset + the four posts.
export default function Billboard({ c }) {
  return (
    <>
      <div
        className="bb-scene"
        style={{
          position: 'relative', height: 760, margin: '0 -120px', overflow: 'hidden',
          background: 'linear-gradient(180deg,#0B1F3A 0%,#3B2A5C 38%,#E8743B 72%,#F6B26B 82%,#1A1410 82.2%,#0C0A08 100%)',
        }}
      >
        <div className="bb-sky" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,#05101f 0%,#0B1F3A 50%,#1a1430 82%)', mixBlendMode: 'multiply', opacity: 0 }} />
        <div className="bb-sun" style={{ position: 'absolute', left: 260, top: 360, width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle,#FFE3A3 0%,#F6B26B 35%,rgba(232,116,59,0) 70%)', filter: 'blur(4px)' }} />
        <div className="bb-ground" style={{ position: 'absolute', left: 0, right: 0, top: '82%', bottom: 0, background: 'linear-gradient(180deg,#1A1410,#0C0A08)' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 604, height: 2, background: 'rgba(255,200,140,.4)' }} />
        <div className="bb-board" style={{ position: 'absolute', left: 640, top: 96, width: 560 }}>
          <div style={{ background: '#111', padding: 14, boxShadow: '0 30px 80px rgba(0,0,0,.6)' }}>
            <img className="bb-img" data-cursor="VIEW" src={img('g_reliable')} alt="" style={{ width: 532, height: 532, objectFit: 'cover' }} />
          </div>
          <div className="row" style={{ justifyContent: 'space-around', marginTop: -2 }}>
            <i style={{ width: 22, height: 120, background: '#151515' }} />
            <i style={{ width: 22, height: 120, background: '#151515' }} />
          </div>
        </div>
        <div className="col bb-copy" style={{ position: 'absolute', left: 120, top: 150, width: 440 }}>
          <span className="mono" style={{ color: '#22C55E' }}>Mockup · out of home</span>
          <div className="anton" style={{ fontSize: 96, lineHeight: 0.9, marginTop: 16 }}>
            BIG ENOUGH<br />FOR A<br />BILLBOARD.
          </div>
          <div style={{ fontSize: 17, lineHeight: 1.55, opacity: 0.8, marginTop: 20 }}>
            The headline-first layout scales from a phone screen to the roadside without a single change.
          </div>
        </div>
      </div>
      <div className="row bb-row vskew" style={{ gap: 20, marginTop: 90 }}>
        {c.posts.map(([k, title]) => (
           <div key={k} className="col bb-item" style={{ flex: 1, gap: 14 }}>
            <img className="post" data-cursor="VIEW" src={img(k)} alt="" style={{ width: '100%', aspectRatio: '1' }} />
            <span className="anton" style={{ fontSize: 24 }}>{title.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </>
  );
}
