import { img } from '../lib/img.js';
import { BRANDS } from '../data/content.js';

const FAN_TOP = [8, 0, 10, 2];
const FAN_ROT = [-8, -2, 4, 9];

function BrandRow({ b, last }) {
  return (
    <div
      className="row"
      style={{
        alignItems: 'center', padding: '30px 0', borderTop: '1.5px solid var(--ink)',
        borderBottom: last ? '1.5px solid var(--ink)' : undefined,
      }}
    >
      <span className="anton" style={{ width: 110, fontSize: 64, color: b.col }}>{b.n}</span>
      <span className="col" style={{ flex: 1, gap: 10 }}>
        <span className="anton" style={{ fontSize: 52, lineHeight: 1 }}>{b.name.toUpperCase()}</span>
        <span className="row" style={{ gap: 28, fontSize: 15 }}>
          <span style={{ opacity: 0.6 }}>{b.ind}</span>
          <b style={{ fontWeight: 600 }}>{b.role}</b>
        </span>
      </span>
      <span style={{ position: 'relative', width: 270, height: 120, flex: 'none' }}>
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
        <span className="anton" style={{ fontSize: 52 }}>{b.c}</span>
        <span className="mono" style={{ fontSize: 10, opacity: 0.5 }}>posts</span>
      </span>
    </div>
  );
}

export default function BrandIndex() {
  return (
    <section id="c02" style={{ background: 'var(--paper)', color: 'var(--ink)' }}>
      <div className="row" style={{ gap: 70, marginBottom: 90, alignItems: 'flex-end' }}>
        <div style={{ flex: 'none', width: 600 }}>
          <div className="anton" style={{ fontSize: 150, lineHeight: 0.84 }}>5 BRANDS</div>
          <div className="anton" style={{ fontSize: 150, lineHeight: 0.84 }}>
            <span className="serif" style={{ fontSize: 160, color: 'var(--sig)' }}>&amp;</span> 24 POSTS
          </div>
        </div>
        <p style={{ fontSize: 21, lineHeight: 1.6, opacity: 0.75, paddingBottom: 12 }}>
          Most of my client work is built as post sets: one master template, then a series that stays recognisable
          week after week. This edit collects five of those systems and the thinking behind each one.
        </p>
      </div>
      <div>
        {BRANDS.map((b, i) => (
          <BrandRow key={b.n} b={b} last={i === BRANDS.length - 1} />
        ))}
      </div>
    </section>
  );
}
