import { Fragment } from 'react';

// Rotated tape strip: words separated by ✶. The track holds two identical halves
// so it can loop forever as a marquee (direction + speed follow the scroll).
export default function Tape({ words, top, background, color, rotate }) {
  const half = (h) =>
    Array.from({ length: 4 }, (_, r) =>
      words.map((w, i) => (
        <Fragment key={`${h}-${r}-${i}`}>
          <span>{w}</span>
          <span>✶</span>
        </Fragment>
      ))
    );
  return (
    <div className="tape" data-dir={rotate < 0 ? -1 : 1} style={{ top, background, color, transform: `rotate(${rotate}deg)` }}>
      <div className="tape-track">
        {half('a')}
        {half('b')}
      </div>
    </div>
  );
}
