// React wrappers for the two Three.js scenes. Each canvas lives inside the
// scaled page, so it is sized in design pixels and scrolls with its section.
// If WebGL is unavailable, the original CSS image floor is shown instead.
import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from './motion.js';
import { createHeroTunnel } from './HeroTunnel.js';
import { createPostGlobe } from './PostGlobe.js';
import { createBrandStage } from './BrandStage.js';

function useScene(create, width, height, start, opts = {}) {
  const ref = useRef();
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let scene;
    try {
      scene = create(ref.current, { width, height, ...opts });
    } catch (e) {
      console.warn('WebGL unavailable, using the CSS fallback.', e);
      setFailed(true);
      return;
    }
    const st = ScrollTrigger.create({
      trigger: opts.trigger ? ref.current.closest(opts.trigger) : ref.current.closest('section'), start, end: opts.end || 'bottom top',
      onUpdate: (s) => scene.setScroll(s.progress),
    });
    return () => { st.kill(); scene.destroy(); };
  }, []);
  return [ref, failed];
}

export function HeroCanvas({ width, height, fallback }) {
  const [ref, failed] = useScene(createHeroTunnel, width, height, 'top top');
  if (failed) return fallback;
  return <canvas ref={ref} className="webgl" style={{ width, height }} />;
}

export function GlobeCanvas({ width, height, fallback }) {
  const [ref, failed] = useScene(createPostGlobe, width, height, 'top bottom');
  if (failed) return fallback;
  return <canvas ref={ref} className="webgl" data-cursor="DRAG" style={{ width, height, touchAction: 'pan-y' }} />;
}

export function BrandStageCanvas({ labels }) {
  const [ref, failed] = useScene((c, o) => createBrandStage(c, { labels: labels.current, ...o }), 1400, 0, 'top top', { trigger: '.bi-pin', end: 'bottom bottom' });
  if (failed) return null;
  return <canvas ref={ref} className="webgl" style={{ width: 1400, height: 'var(--vh)' }} />;
}
