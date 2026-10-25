import { img } from '../../lib/img.js';

const ROT = [-3, 2, -2, 3];
const DROP = [0, 24, 6, 30];

// Chapter 01 — four audience cards, slightly scattered.
export default function LuyuanCards({ c }) {
  return (
    <div className="row sc-luyuan" style={{ gap: 22, justifyContent: 'center', perspective: 1400 }}>
      {c.posts.map(([k, audience, model, price], i) => (
        <div
          key={k}
          className="col lu-card"
          data-cursor="VIEW"
          style={{
            width: 275, background: '#fff', borderRadius: 14, padding: 12,
            boxShadow: '0 30px 60px rgba(13,59,30,.22)', transform: `rotate(${ROT[i]}deg) translateY(${DROP[i]}px)`,
          }}
        >
          <div className="row" style={{ justifyContent: 'space-between', padding: '4px 4px 10px' }}>
            <span className="mono" style={{ fontSize: 10, color: '#1E9E3E' }}>Audience 0{i + 1}</span>
            <span className="mono" style={{ fontSize: 10, opacity: 0.5 }}>{model}</span>
          </div>
          <img src={img(k)} alt="" style={{ width: 251, height: 251, borderRadius: 8, objectFit: 'cover' }} />
          <div style={{ background: '#1E9E3E', color: '#fff', borderRadius: 8, marginTop: 10, padding: '14px 14px 16px' }}>
            <div className="anton" style={{ fontSize: 30, lineHeight: 1 }}>{audience.toUpperCase()}</div>
            <div className="mono" style={{ fontSize: 11, marginTop: 8, opacity: 0.85 }}>{price}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
