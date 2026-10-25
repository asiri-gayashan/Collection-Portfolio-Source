import { img } from '../../lib/img.js';

const ROT = [10, -8, 12, -6];

// Chapter 02 — posts with hanging price tags.
export default function KiawayTags({ c }) {
  return (
    <div className="row" style={{ gap: 24 }}>
      {c.posts.map(([k, name, price], i) => (
        <div key={k} style={{ position: 'relative', flex: 1 }}>
          <img className="post" src={img(k)} alt="" style={{ width: '100%', aspectRatio: '1' }} />
          <div style={{ position: 'absolute', right: -14, top: -30, transform: `rotate(${ROT[i]}deg)`, transformOrigin: 'top center' }}>
            <div style={{ width: 2, height: 40, background: '#fff', margin: '0 auto' }} />
            <div
              style={{
                position: 'relative', background: '#fff', color: '#0D0D0E', padding: '22px 18px 16px',
                clipPath: 'polygon(50% 0,100% 14%,100% 100%,0 100%,0 14%)', minWidth: 150, textAlign: 'center',
              }}
            >
              <i style={{ position: 'absolute', left: '50%', top: 9, width: 9, height: 9, marginLeft: -4.5, borderRadius: '50%', background: '#7D0A0A' }} />
              <div className="mono" style={{ fontSize: 10, opacity: 0.6, marginTop: 6 }}>{name}</div>
              <div className="anton" style={{ fontSize: 32, color: '#E31E24', marginTop: 4 }}>{price}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
