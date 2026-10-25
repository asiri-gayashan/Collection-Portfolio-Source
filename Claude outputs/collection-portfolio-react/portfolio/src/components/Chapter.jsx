import { Fragment } from 'react';
import { img } from '../lib/img.js';
import Tape from './Tape.jsx';
import LuyuanCards from './showcases/LuyuanCards.jsx';
import KiawayTags from './showcases/KiawayTags.jsx';
import SakuraSeries from './showcases/SakuraSeries.jsx';
import Postcards from './showcases/Postcards.jsx';
import Billboard from './showcases/Billboard.jsx';

const SHOWCASES = {
  cards: LuyuanCards,
  tags: KiawayTags,
  sakura: SakuraSeries,
  postcards: Postcards,
  billboard: Billboard,
};

// Full-bleed chapter opener: giant brand name, fanned posts, tape strip.
function Opener({ c }) {
  const fan = { x: [300, 520, 740], y: [300, 240, 300], z: [1, 3, 2], rot: [-14, 0, 14], ry: [-24, 0, 24] };
  return (
    <section id={`${c.id}o`} className="opener" style={{ background: c.obg, color: c.ofg }}>
      <div
        className="giant"
        style={{
          top: c.gtop || 120, fontSize: c.gsize,
          ...(c.gout ? { color: 'transparent', WebkitTextStroke: `3px ${c.ofg}` } : {}),
        }}
      >
        {c.gname}
      </div>
      <div className="row" style={{ position: 'absolute', left: 120, right: 120, top: 52, justifyContent: 'space-between', zIndex: 4 }}>
        <span className="mono">Chapter {c.num}</span>
        <span className="mono">{c.tag}</span>
        <span className="mono">{c.pc} posts</span>
      </div>
      {c.fan.map((k, i) => (
        <img
          key={k}
          className="post"
          src={img(k)}
          alt=""
          style={{
            position: 'absolute', left: fan.x[i], top: fan.y[i], width: 360, height: 360,
            transform: `perspective(1400px) rotateY(${fan.ry[i]}deg) rotate(${fan.rot[i]}deg)`,
            zIndex: fan.z[i], boxShadow: '0 50px 90px rgba(0,0,0,.45)',
          }}
        />
      ))}
      <div
        className="anton"
        style={{ position: 'absolute', left: 120, top: 735, fontSize: 150, lineHeight: 0.85, zIndex: 4, mixBlendMode: c.blend || 'normal' }}
      >
        {c.num}
      </div>
      <div style={{ position: 'absolute', right: 120, top: 770, width: 360, fontSize: 17, lineHeight: 1.5, zIndex: 4, textAlign: 'right' }}>
        {c.otext}
      </div>
      <Tape words={c.tw} top={880} background={c.tbg} color={c.tfg} rotate={-2.5} />
    </section>
  );
}

function Meta({ items, line }) {
  return (
    <div className="meta" style={{ borderColor: line }}>
      {items.map(([a, b]) => (
        <div key={a}>
          <span className="mono lbl">{a}</span>
          <b>{b}</b>
        </div>
      ))}
    </div>
  );
}

function Anatomy({ c }) {
  const a = c.anat;
  return (
    <div className="anat">
      <div className="pic">
        <img className="post" src={img(a.img)} alt="" style={{ width: 600, height: 600 }} />
        {a.mk.map(([x, y], i) => (
          <span
            key={i}
            className="mk"
            style={{ left: `${x * 100}%`, top: `${y * 100}%`, background: c.mkbg, color: c.mkfg, borderColor: c.mkbd }}
          >
            {i + 1}
          </span>
        ))}
      </div>
      <div className="col" style={{ flex: 1 }}>
        <span className="mono" style={{ color: c.accent, paddingBottom: 12 }}>Anatomy of the template</span>
        {a.notes.map(([x, y], i) => (
          <div key={x} className="note" style={{ borderColor: c.line }}>
            <span className="n" style={{ color: c.accent }}>{String(i + 1).padStart(2, '0')}</span>
            <span className="col" style={{ gap: 3 }}>
              <b>{x}</b>
              <span>{y}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Principles({ c }) {
  return (
    <div className="prin">
      {c.prin.map(([a, b]) => (
        <div key={a} style={{ borderColor: c.accent }}>
          <b>{a}</b>
          <span>{b}</span>
        </div>
      ))}
    </div>
  );
}

export default function Chapter({ c }) {
  const Showcase = SHOWCASES[c.custom];
  return (
    <>
      <Opener c={c} />
      <section id={c.id} style={{ background: c.bg, color: c.fg }}>
        <Meta items={c.meta} line={c.line} />
        <div className="lede">
          <div className="big">
            {c.big.map((line, i) => (
              <Fragment key={i}>{i > 0 && <br />}{line}</Fragment>
            ))}
          </div>
          <p>{c.lede}</p>
        </div>
        {c.anat && <Anatomy c={c} />}
        {Showcase && <Showcase c={c} />}
        <Principles c={c} />
      </section>
    </>
  );
}
