import { img } from '../../lib/img.js';

const DROP = [60, 0, 80, 20];
const ROT = [-4, 2, -2, 4];
const SERIF = { fontFamily: "'Instrument Serif'" };

// Chapter 03 — Series A "Spec Spotlight" + Series B "Torque Times" newspaper.
export default function SakuraSeries({ c }) {
  const A = c.seriesA;
  const B = c.seriesB;
  return (
    <>
      <div style={{ position: 'relative', paddingTop: 20 }}>
        <div
          className="anton"
          style={{
            position: 'absolute', left: -120, right: -120, top: 120, fontSize: 340, lineHeight: 0.8,
            color: '#FFF200', textAlign: 'center', whiteSpace: 'nowrap', opacity: 0.95,
          }}
        >
          SPEC<br />SPOTLIGHT
        </div>
        <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 34, position: 'relative' }}>
          <span className="mono" style={{ color: '#FFF200' }}>Series A</span>
          <span style={{ fontSize: 16, opacity: 0.75, maxWidth: 520, textAlign: 'right', lineHeight: 1.5 }}>
            Bike-culture explainers: a black-and-white cut-out over giant yellow type, grain and a short Sinhala explainer.
          </span>
        </div>
        <div className="row" style={{ gap: 20, position: 'relative', padding: '60px 0 0' }}>
          {A.map(([k, name], i) => (
            <div key={k} className="col" style={{ flex: 1, gap: 12, transform: `translateY(${DROP[i]}px) rotate(${ROT[i]}deg)` }}>
              <img
                className="post"
                src={img(k)}
                alt=""
                style={{ width: '100%', aspectRatio: '1', boxShadow: '0 40px 80px rgba(0,0,0,.7)', border: '6px solid #0B0B0B' }}
              />
              <span className="mono" style={{ background: '#0B0B0B', color: '#FFF200', fontSize: 12, padding: '6px 10px', alignSelf: 'flex-start' }}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: 200, background: '#EDE6D6', color: '#151515', padding: '50px 54px 60px',
          boxShadow: '0 50px 100px rgba(0,0,0,.6)', transform: 'rotate(-1.2deg)',
        }}
      >
        <div className="row" style={{ justifyContent: 'space-between', borderBottom: '1px solid #151515', paddingBottom: 10 }}>
          <span className="mono" style={{ fontSize: 11 }}>Sakura · Hot News Edition</span>
          <span className="mono" style={{ fontSize: 11 }}>Series B</span>
          <span className="mono" style={{ fontSize: 11 }}>Sri Lanka · 2026</span>
        </div>
        <div style={{ ...SERIF, fontSize: 170, lineHeight: 0.95, textAlign: 'center', letterSpacing: '-.02em', padding: '14px 0 6px' }}>
          Torque Times
        </div>
        <div className="row" style={{ borderTop: '4px double #151515', borderBottom: '1px solid #151515', padding: '8px 0', marginBottom: 34 }}>
          <span className="mono" style={{ fontSize: 11, flex: 1 }}>A motoring-news format for the Sakura Facebook page</span>
          <span className="mono" style={{ fontSize: 11 }}>Headlines translated from Sinhala</span>
        </div>
        <div className="row" style={{ gap: 34 }}>
          <div className="col" style={{ width: 560, gap: 14, flex: 'none' }}>
            <img src={img(B[0][0])} alt="" style={{ width: 560, height: 560, objectFit: 'cover' }} />
            <div style={{ ...SERIF, fontSize: 40, lineHeight: 1.05 }}>{B[0][1]}</div>
            <div style={{ fontSize: 14, lineHeight: 1.55, opacity: 0.75 }}>
              Cinematic scene, Sakura tag, and a bold Sinhala headline with the key words in signal yellow — easy to read, hard to scroll past.
            </div>
          </div>
          <div className="col" style={{ flex: 1, gap: 22 }}>
            {B.slice(1).map(([k, t]) => (
              <div key={k} className="row" style={{ gap: 18, borderTop: '1px solid #151515', paddingTop: 18 }}>
                <img src={img(k)} alt="" style={{ width: 200, height: 200, objectFit: 'cover', flex: 'none' }} />
                <div style={{ ...SERIF, fontSize: 29, lineHeight: 1.08 }}>{t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
