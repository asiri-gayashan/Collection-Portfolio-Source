import { Fragment } from 'react';

// Rotated marquee-style tape strip: words separated by ✶, repeated to fill the width.
export default function Tape({ words, top, background, color, rotate }) {
  return (
    <div className="tape" style={{ top, background, color, transform: `rotate(${rotate}deg)` }}>
      {Array.from({ length: 6 }, (_, r) =>
        words.map((w, i) => (
          <Fragment key={`${r}-${i}`}>
            <span>{w}</span>
            <span>✶</span>
          </Fragment>
        ))
      )}
    </div>
  );
}
