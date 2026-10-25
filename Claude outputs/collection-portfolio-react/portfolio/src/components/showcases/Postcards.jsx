import { img } from '../../lib/img.js';

const POS = { x: [30, 620, 80, 640], y: [0, 70, 720, 780], r: [-5, 4, 3, -4] };
const MAROON = '#8E1B2C';

// Chapter 04 — scattered postcards with stamp and postmark.
export default function Postcards({ c }) {
  return (
    <div style={{ position: 'relative', height: 1420, margin: '0 -40px' }}>
      {c.posts.map(([k, title, district, province], i) => (
        <div
          key={k}
          style={{
            position: 'absolute', left: POS.x[i], top: POS.y[i], width: 560, background: '#fff',
            padding: '18px 18px 22px', boxShadow: '0 30px 60px rgba(60,30,20,.25)', transform: `rotate(${POS.r[i]}deg)`,
          }}
        >
          <img src={img(k)} alt="" style={{ width: 524, height: 524, objectFit: 'cover' }} />
          <div className="row" style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: 14 }}>
            <div className="col" style={{ gap: 2 }}>
              <span className="serif" style={{ fontSize: 38, color: MAROON, lineHeight: 1 }}>{title}</span>
              <span className="mono" style={{ fontSize: 10, opacity: 0.6 }}>{district} · {province}</span>
            </div>
            <div
              style={{
                width: 64, height: 76, border: `2px dashed ${MAROON}`, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 2,
              }}
            >
              <span className="anton" style={{ fontSize: 20, color: MAROON }}>LK</span>
              <span className="mono" style={{ fontSize: 8, color: MAROON }}>{district}</span>
            </div>
          </div>
          <svg width="130" height="130" viewBox="0 0 130 130" style={{ position: 'absolute', right: 70, bottom: 40, opacity: 0.55 }}>
            <circle cx="65" cy="65" r="44" fill="none" stroke={MAROON} strokeWidth="2.5" />
            <circle cx="65" cy="65" r="34" fill="none" stroke={MAROON} strokeWidth="1" />
            <text x="65" y="62" textAnchor="middle" fontFamily="JBM" fontSize="10" fontWeight="700" fill={MAROON}>{district}</text>
            <text x="65" y="76" textAnchor="middle" fontFamily="JBM" fontSize="9" fill={MAROON}>SRI LANKA</text>
          </svg>
        </div>
      ))}
    </div>
  );
}
