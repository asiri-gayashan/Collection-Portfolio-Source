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


function Meta({ items, line }) {
  return (
    <div className="meta" style={{ borderColor: line }}>
      {items.map(([a, b]) => (
        <div key={a} className="meta-i">
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
        <div className="an-mask" style={{ width: 600, height: 600, overflow: 'clip' }}>
          <img className="post an-img" src={img(a.img)} alt="" data-cursor="VIEW" style={{ width: 600, height: 600 }} />
        </div>
        {a.mk.map(([x, y], i) => (
          <span
            key={i}
            className="mk"
            data-i={i}
            style={{ left: `${x * 100}%`, top: `${y * 100}%`, background: c.mkbg, color: c.mkfg, borderColor: c.mkbd }}
          >
            {i + 1}
          </span>
        ))}
      </div>
      <div className="col" style={{ flex: 1 }}>
        <span className="mono" style={{ color: c.accent, paddingBottom: 12 }}>Anatomy of the template</span>
        {a.notes.map(([x, y], i) => (
          <div key={x} className="note" data-i={i} style={{ borderColor: c.line }}>
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
      <section id={c.id} className="chapter" data-label={`CH.${c.num} — ${c.gname} / WORK`} style={{ background: c.bg, color: c.fg }}>
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
