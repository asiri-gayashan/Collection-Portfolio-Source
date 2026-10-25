import { useRef } from 'react';
import { img } from '../lib/img.js';
import { BRANDS } from '../data/content.js';
import { STATIC } from '../fx/motion.js';
import { BrandStageCanvas } from '../fx/WebGL.jsx';

const FAN_TOP = [8, 0, 10, 2];
const FAN_ROT = [-8, -2, 4, 9];

function BrandRow({ b, last }) {
  return (
    <div
      className="row bi-row"
      data-cursor="OPEN"
      style={{
        '--rc': b.col,
        alignItems: 'center', padding: '30px 0', borderTop: '1.5px solid var(--ink)',
        borderBottom: last ? '1.5px solid var(--ink)' : undefined,
      }}
    >
      <span className="anton bi-num" style={{ width: 110, fontSize: 64, color: b.col }}>{b.n}</span>
      <span className="col" style={{ flex: 1, gap: 10 }}>
        <span className="anton bi-name" style={{ fontSize: 52, lineHeight: 1 }}>{b.name.toUpperCase()}</span>
        <span className="row" style={{ gap: 28, fontSize: 15 }}>
          <span style={{ opacity: 0.6 }}>{b.ind}</span>
          <b style={{ fontWeight: 600 }}>{b.role}</b>
        </span>
      </span>
      <span className="bi-thumbs" style={{ position: 'relative', width: 270, height: 120, flex: 'none' }}>
        {b.th.map((k, j) => (
          <img
            key={k}
            src={img(k)}
            alt=""
            style={{
              position: 'absolute', left: j * 52, top: FAN_TOP[j], width: 110, height: 110, objectFit: 'cover',
              borderRadius: 4, transform: `rotate(${FAN_ROT[j]}deg)`, boxShadow: '0 10px 24px rgba(0,0,0,.3)',
            }}
          />
        ))}
      </span>
      <span className="col" style={{ width: 90, alignItems: 'flex-end' }}>
        <span className="anton bi-count" data-to={b.c} style={{ fontSize: 52 }}>{b.c}</span>
        <span className="mono" style={{ fontSize: 10, opacity: 0.5 }}>posts</span>
      </span>
    </div>
  );
}

// Animated version: a pinned full-screen 3D stage where all 24 posts storm
// around the headline, then sort themselves into five brand decks as you scroll.
function Stage() {
  const labels = useRef([]);
  return (
    <div className="bi-pin" style={{ margin: '0 -120px' }}>
      <div className="bi-stage" data-cursor="PLAY">
        <BrandStageCanvas labels={labels} />
        <div className="bi-head">
          <div className="bi-title">
            <div className="anton" style={{ fontSize: 230, lineHeight: 0.84 }}>5 BRANDS</div>
            <div className="anton" style={{ fontSize: 230, lineHeight: 0.84 }}>
              <span className="serif" style={{ fontSize: 245, color: 'var(--sig)' }}>&amp;</span> 24 POSTS
            </div>
          </div>
        </div>
        {BRANDS.map((b, i) => (
          <div key={b.n} className="bi-label" ref={(el) => (labels.current[i] = el)}>
            <span className="mono" style={{ color: b.col, fontSize: 11 }}>{b.n} · {b.c} posts</span>
            <span className="anton" style={{ fontSize: 26, lineHeight: 1 }}>{b.name.split(' × ')[0].toUpperCase()}</span>
          </div>
        ))}
        <div className="bi-hint mono">Move the mouse through them · scroll to sort</div>
      </div>
    </div>
  );
}

export default function BrandIndex() {
  if (!STATIC) {
    return (
      <section id="c02" data-label="INDEX — 5 BRANDS" style={{ background: 'var(--paper)', color: 'var(--ink)', paddingTop: 0 }}>
        <Stage />
        <div className="row" style={{ justifyContent: 'flex-end', margin: '40px 0 90px' }}>
          <p className="bi-p" style={{ fontSize: 24, lineHeight: 1.55, opacity: 0.75, maxWidth: 640 }}>
            Most of my client work is built as post sets: one master template, then a series that stays recognisable
            week after week. This edit collects five of those systems and the thinking behind each one.
          </p>
        </div>
        <div className="bi-list">
          {BRANDS.map((b, i) => (
            <BrandRow key={b.n} b={b} last={i === BRANDS.length - 1} />
          ))}
        </div>
      </section>
    );
  }
  return (
    <section id="c02" data-label="INDEX — 5 BRANDS" style={{ background: 'var(--paper)', color: 'var(--ink)' }}>
      <div className="row" style={{ gap: 70, marginBottom: 90, alignItems: 'flex-end' }}>
        <div className="bi-title" style={{ flex: 'none', width: 600 }}>
          <div className="anton" style={{ fontSize: 150, lineHeight: 0.84 }}>5 BRANDS</div>
          <div className="anton" style={{ fontSize: 150, lineHeight: 0.84 }}>
            <span className="serif" style={{ fontSize: 160, color: 'var(--sig)' }}>&amp;</span> 24 POSTS
          </div>
        </div>
        <p className="bi-p" style={{ fontSize: 21, lineHeight: 1.6, opacity: 0.75, paddingBottom: 12 }}>
          Most of my client work is built as post sets: one master template, then a series that stays recognisable
          week after week. This edit collects five of those systems and the thinking behind each one.
        </p>
      </div>
      <div className="bi-list">
        {BRANDS.map((b, i) => (
          <BrandRow key={b.n} b={b} last={i === BRANDS.length - 1} />
        ))}
      </div>
    </section>
  );
}
