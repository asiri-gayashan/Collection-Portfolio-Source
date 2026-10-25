import { img } from '../lib/img.js';
import { LAYERS, STEPS, ZONES } from '../data/content.js';

const SQ = { width: 400, height: 400 };

// The three layers of a post. While the section is pinned, scrolling lifts
// them apart (artwork -> zones -> grid) and tilts the stack into 3D.
function ExplodedStack() {
  const layers = [
    {
      key: 'art',
      el: <img src={img('l_fbq3')} alt="" style={{ ...SQ, objectFit: 'cover', boxShadow: '0 0 0 1px rgba(255,255,255,.2), 0 40px 80px rgba(0,0,0,.6)' }} />,
    },
    {
      key: 'zones',
      el: (
        <div style={{ ...SQ, background: 'rgba(255,77,26,.08)', border: '1.5px solid rgba(255,77,26,.8)', position: 'relative' }}>
          {ZONES.map(([x, y, w, h], i) => (
            <div
              key={i}
              className="ap-zone"
              style={{ position: 'absolute', left: x, top: y, width: w, height: h, border: '2px dashed #FF4D1A', background: 'rgba(255,77,26,.15)' }}
            />
          ))}
        </div>
      ),
    },
    {
      key: 'grid',
      el: (
        <div
          style={{
            ...SQ, border: '1.5px solid rgba(181,255,0,.9)',
            backgroundImage: 'linear-gradient(rgba(181,255,0,.45) 1px,transparent 1px),linear-gradient(90deg,rgba(181,255,0,.45) 1px,transparent 1px)',
            backgroundSize: '33.33px 33.33px',
          }}
        />
      ),
    },
  ];
  return (
    <div className="ap-scene" style={{ position: 'relative', width: 660, height: 760, flex: 'none', perspective: 2200 }}>
      <div
        className="ap-stack"
        style={{
          position: 'absolute', left: 130, top: 330, ...SQ, transformStyle: 'preserve-3d',
          transform: 'rotateX(56deg) rotateZ(-38deg)',
        }}
      >
        {layers.map((l, i) => (
          <div key={l.key} className={`ap-layer ap-${l.key}`} style={{ position: 'absolute', left: 0, top: 0, transform: `translateZ(${i * 130}px)` }}>
            {l.el}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Approach() {
  return (
    <section id="c03" data-label="APPROACH — THE SYSTEM" style={{ background: 'var(--ink)', padding: '140px 120px 150px' }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
        <div className="anton ap-title" style={{ fontSize: 110, lineHeight: 0.88 }}>
          EVERY POST<br />IS A <span className="out" style={{ color: 'var(--sig)' }}>SYSTEM</span>
        </div>
        <span className="mono ap-cap" style={{ opacity: 0.55, paddingBottom: 12 }}>Exploded view — Luyuan template</span>
      </div>
      <div className="ap-pin">
        <div className="ap-sticky">
          <div className="row" style={{ alignItems: 'center', gap: 40, width: '100%' }}>
            <ExplodedStack />
            <div className="col" style={{ flex: 1 }}>
              {LAYERS.map(([n, c, a, b]) => (
                <div key={n} className="row ap-item" style={{ gap: 22, padding: '28px 0', borderTop: '1px solid rgba(255,255,255,.18)' }}>
                  <span className="anton" style={{ fontSize: 64, color: c, width: 90 }}>{n}</span>
                  <span className="col" style={{ gap: 8 }}>
                    <b style={{ fontSize: 26 }}>{a}</b>
                    <span style={{ fontSize: 16, lineHeight: 1.55, opacity: 0.65 }}>{b}</span>
                  </span>
                </div>
              ))}
              <div className="ap-meter" style={{ height: 2, background: 'rgba(255,255,255,.12)', marginTop: 10 }}>
                <div className="ap-meter-fill" style={{ height: '100%', background: 'var(--sig)', transformOrigin: '0 50%', transform: 'scaleX(0)' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row ap-steps" style={{ gap: 20, marginTop: 70, perspective: 1200 }}>
        {STEPS.map(([n, a, b], i) => {
          const hot = i === 1;
          return (
            <div
              key={n}
              className="col step"
              style={{
                flex: 1, gap: 12, background: hot ? 'var(--sig)' : '#18181A', color: hot ? 'var(--ink)' : '#fff',
                borderRadius: 6, padding: '30px 28px 34px',
              }}
            >
              <span className="mono" style={{ fontSize: 12, opacity: 0.7 }}>Step {n}</span>
              <b className="anton" style={{ fontSize: 40, fontWeight: 400 }}>{a.toUpperCase()}</b>
              <span style={{ fontSize: 15, lineHeight: 1.55, opacity: 0.75 }}>{b}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
