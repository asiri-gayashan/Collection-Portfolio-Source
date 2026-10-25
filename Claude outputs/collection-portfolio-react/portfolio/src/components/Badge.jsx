// Circular rotating-text badge with an 8-point star in the middle.
// .badge-ring spins forever (faster while scrolling), .badge-star counter-rotates.
export default function Badge({ id, text, fg, bg, star, size = 230, style, className = '' }) {
  const pathId = `badge-path-${id}`;
  return (
    <svg width={size} height={size} viewBox="0 0 230 230" style={style} className={`badge ${className}`} data-cursor="SPIN">
      <defs>
        <path id={pathId} d="M115,115 m-88,0 a88,88 0 1,1 176,0 a88,88 0 1,1 -176,0" />
      </defs>
      <circle cx="115" cy="115" r="112" fill={bg} />
      <g className="badge-ring">
        <text fontFamily="JBM" fontWeight="700" fontSize="15.5" letterSpacing="3.2" fill={fg}>
          <textPath href={`#${pathId}`}>{text}</textPath>
        </text>
      </g>
      <g transform="translate(115 115)">
        <g className="badge-star" fill={star}>
          {Array.from({ length: 8 }, (_, i) => (
            <path key={i} transform={`rotate(${i * 45})`} d="M0 -44 L7 -8 L0 0 L-7 -8Z" />
          ))}
        </g>
      </g>
    </svg>
  );
}
