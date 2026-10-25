import { img } from '../lib/img.js';

// A tilted 3D grid of post images (used in the hero and the wall).
export default function ImageFloor({ keys, size, floorStyle, planeTransform, columns = 8 }) {
  return (
    <div className="floor" style={floorStyle}>
      <div
        className="plane"
        style={{ gridTemplateColumns: `repeat(${columns},${size}px)`, transform: planeTransform }}
      >
        {keys.map((k, i) => (
          <img key={i} src={img(k)} alt="" style={{ width: size, height: size }} />
        ))}
      </div>
    </div>
  );
}
