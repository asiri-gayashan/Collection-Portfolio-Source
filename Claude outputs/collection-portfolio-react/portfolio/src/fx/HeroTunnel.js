// Hero WebGL scene: an endless spiral tunnel built from every post.
// Warps in on load, flies forward with scroll, bends + RGB-splits with scroll speed,
// and the camera leans toward the mouse.
import * as THREE from 'three';
import { gsap, motion } from './motion.js';
import { loadPostTextures, postVertex, postFragment } from './textures.js';

const PER_RING = 7;
const RINGS = 12;
const GAP = 3.4;      // distance between rings
const RADIUS = 4.6;
const DEPTH = RINGS * GAP;

export function createHeroTunnel(canvas, { width = 1400, height = 1500, centerY = 0.3 } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  // Shift the vanishing point up to sit behind the headline.
  const fullH = 2 * height * (1 - centerY);
  const camera = new THREE.PerspectiveCamera(62, width / fullH, 0.1, 100);
  camera.setViewOffset(width, fullH, 0, fullH / 2 - height * centerY, width, height);
  camera.position.set(0, 0, 6);

  const group = new THREE.Group();
  scene.add(group);

  const shared = {
    uTime: { value: 0 },
    uVel: { value: 0 },
    uBend: { value: 1.6 },
    uNear: { value: 6 },
    uFar: { value: DEPTH - 2 },
    uAlpha: { value: 1 },
    uFog: { value: new THREE.Color('#0D0D0E') },
    uBack: { value: 0.6 },
  };

  const geo = new THREE.PlaneGeometry(2.7, 2.7, 24, 24);
  const planes = [];
  const state = { travel: 0, boost: 0, reveal: 0, scroll: 0, alive: true, visible: true };

  loadPostTextures().then((textures) => {
    if (!state.alive) return;
    const mats = textures.map(
      (t) =>
        new THREE.ShaderMaterial({
          uniforms: { ...shared, uTex: { value: t } },
          vertexShader: postVertex,
          fragmentShader: postFragment,
          side: THREE.DoubleSide,
          transparent: true,
        })
    );
    for (let r = 0; r < RINGS; r++) {
      for (let i = 0; i < PER_RING; i++) {
        const m = new THREE.Mesh(geo, mats[(r * PER_RING + i * 3) % mats.length]);
        const a = (i / PER_RING) * Math.PI * 2 + r * 0.45;
        m.userData = { a, base: -r * GAP, jitter: (Math.random() - 0.5) * 0.6 };
        planes.push(m);
        group.add(m);
      }
    }
  });

  // Warp-speed intro, triggered by the preloader.
  const intro = () => {
    gsap.fromTo(state, { boost: 70, reveal: 0 }, { boost: 0, reveal: 1, duration: 2.6, ease: 'expo.out' });
  };
  window.addEventListener('site:intro', intro);

  const mouse = { x: 0, y: 0 };
  const tmp = new THREE.Vector3();
  const tick = (time, dt) => {
    if (!state.visible || !planes.length) return;
    const t = time;
    const vel = motion.velocity;
    shared.uTime.value = t;
    shared.uVel.value += (vel * 2.2 - shared.uVel.value) * 0.1;

    state.travel += dt * 0.0012 + Math.abs(vel) * 0.25 + state.boost * dt * 0.001;
    const travel = state.travel + state.scroll * 26;

    group.rotation.z = t * 0.06 + state.scroll * 1.6;
    for (const m of planes) {
      const { a, base, jitter } = m.userData;
      let z = ((base + travel) % DEPTH + DEPTH) % DEPTH; // 0..DEPTH
      z = z - DEPTH + 5; // -DEPTH+5 .. 5
      const rad = RADIUS + jitter + Math.sin(t * 0.7 + a * 3) * 0.15;
      m.position.set(Math.cos(a) * rad, Math.sin(a) * rad, z);
      tmp.set(0, 0, z);
      m.lookAt(tmp);
      m.rotateZ(a + Math.PI / 2);
      const s = state.reveal * (0.85 + 0.15 * Math.sin(t + a));
      m.scale.setScalar(Math.max(0.0001, s));
    }

    mouse.x += (motion.mouse.nx - mouse.x) * 0.05;
    mouse.y += (motion.mouse.ny - mouse.y) * 0.05;
    camera.position.x = mouse.x * 1.1;
    camera.position.y = -mouse.y * 0.8;
    camera.lookAt(0, 0, -12);
    camera.rotation.z += mouse.x * 0.08;

    renderer.render(scene, camera);
  };

  const resize = () => {
    renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio * motion.fit));
    renderer.setSize(width, height, false);
  };
  resize();
  window.addEventListener('resize', resize);

  const io = new IntersectionObserver(([e]) => (state.visible = e.isIntersecting), { rootMargin: '100px' });
  io.observe(canvas);

  let last = performance.now();
  const loop = () => {
    const now = performance.now();
    tick(now / 1000, now - last);
    last = now;
  };
  gsap.ticker.add(loop);

  return {
    state,
    setScroll(p) { state.scroll = p; },
    destroy() {
      state.alive = false;
      gsap.ticker.remove(loop);
      window.removeEventListener('resize', resize);
      window.removeEventListener('site:intro', intro);
      io.disconnect();
      geo.dispose();
      renderer.dispose();
    },
  };
}
