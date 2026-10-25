import { img } from '../lib/img.js';
import { LAYERS, STEPS, ZONES } from '../data/content.js';

const SQ = { width: 400, height: 400 };

function ExplodedStack() {
  const layers = [
    {
      z: 0,
      el: <img src={img('l_fbq3')} alt="" style={{ ...SQ, objectFit: 'cover', boxShadow: '0 0 0 1px rgba(255,255,255,.2)' }} />,
    },
    {
      z: 130,
      el: (
        <div style={{ ...SQ, background: 'rgba(255,77,26,.08)', border: '1.5px solid rgba(255,77,26,.8)', position: 'relative' }}>
          {ZONES.map(([x, y, w, h], i) => (
            <div
              key={i}
              style={{ position: 'absolute', left: x, top: y, width: w, height: h, border: '2px dashed #FF4D1A', background: 'rgba(255,77,26,.15)' }}
            />
          ))}
        </div>
      ),
    },
    {
      z: 260,
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
    <div style={{ position: 'relative', width: 660, height: 760, flex: 'none', perspective: 2200 }}>
      <div
        style={{
          position: 'absolute', left: 150, top: 170, ...SQ, transformStyle: 'preserve-3d',
          transform: 'rotateX(56deg) rotateZ(-38deg)',
        }}
      >
        {layers.map((l) => (
          <div key={l.z} style={{ position: 'absolute', left: 0, top: 0, transform: `translateZ(${l.z}px)` }}>
            {l.el}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Approach() {
  return (
    <section id="c03" style={{ background: 'var(--ink)', padding: '140px 120px 150px' }}>
      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40 }}>
        <div className="anton" style={{ fontSize: 110, lineHeight: 0.88 }}>
          EVERY POST<br />IS A <span className="out" style={{ color: 'var(--sig)' }}>SYSTEM</span>
        </div>
        <span className="mono" style={{ opacity: 0.55, paddingBottom: 12 }}>Exploded view — Luyuan template</span>
      </div>
      <div className="row" style={{ alignItems: 'center', gap: 40 }}>
        <ExplodedStack />
        <div className="col" style={{ flex: 1 }}>
          {LAYERS.map(([n, c, a, b]) => (
            <div key={n} className="row" style={{ gap: 22, padding: '28px 0', borderTop: '1px solid rgba(255,255,255,.18)' }}>
              <span className="anton" style={{ fontSize: 64, color: c, width: 90 }}>{n}</span>
              <span className="col" style={{ gap: 8 }}>
                <b style={{ fontSize: 26 }}>{a}</b>
                <span style={{ fontSize: 16, lineHeight: 1.55, opacity: 0.65 }}>{b}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="row" style={{ gap: 20, marginTop: 70 }}>
        {STEPS.map(([n, a, b], i) => {
          const hot = i === 1;
          return (
            <div
              key={n}
              className="col"
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
