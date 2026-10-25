// Wall WebGL scene: all posts wrapped onto a spinning globe.
// Spins with scroll, can be dragged/flung, wobbles with scroll velocity.
import * as THREE from 'three';
import { gsap, motion } from './motion.js';
import { loadPostTextures, postVertex, postFragment } from './textures.js';

const COUNT = 60;
const R = 5.2;

export function createPostGlobe(canvas, { width = 1400, height = 1200 } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 17);

  const globe = new THREE.Group();
  globe.rotation.x = 0.35;
  scene.add(globe);

  const shared = {
    uTime: { value: 0 },
    uVel: { value: 0 },
    uBend: { value: 1.2 },
    uNear: { value: 13 },
    uFar: { value: 24 },
    uAlpha: { value: 1 },
    uFog: { value: new THREE.Color('#1a0d08') },
    uBack: { value: 0.75 },
  };
  const geo = new THREE.PlaneGeometry(1.55, 1.55, 16, 16);
  const state = { spin: 0, drag: 0, dragging: false, scroll: 0, visible: false, alive: true, burst: 0 };

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
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const rr = Math.sqrt(1 - y * y);
      const th = golden * i;
      const m = new THREE.Mesh(geo, mats[i % mats.length]);
      const dir = new THREE.Vector3(Math.cos(th) * rr, y, Math.sin(th) * rr);
      m.userData.dir = dir;
      m.position.copy(dir).multiplyScalar(R);
      m.lookAt(dir.clone().multiplyScalar(R * 2));
      globe.add(m);
    }
  });

  // drag to spin
  let lastX = 0;
  const down = (e) => { state.dragging = true; lastX = e.clientX; canvas.setPointerCapture?.(e.pointerId); };
  const move = (e) => {
    if (!state.dragging) return;
    state.drag += (e.clientX - lastX) * 0.004;
    lastX = e.clientX;
  };
  const up = () => (state.dragging = false);
  canvas.addEventListener('pointerdown', down);
  window.addEventListener('pointermove', move);
  window.addEventListener('pointerup', up);

  const tick = (t, dt) => {
    if (!state.visible || !globe.children.length) return;
    shared.uTime.value = t;
    shared.uVel.value += (motion.velocity * 2 - shared.uVel.value) * 0.1;
    state.drag *= 0.94;
    state.spin += dt * 0.00025 + state.drag + motion.velocity * 0.03;
    globe.rotation.y = state.spin + state.scroll * 3;
    globe.rotation.x = 0.35 + motion.mouse.ny * 0.25 + Math.sin(t * 0.4) * 0.05;
    globe.rotation.z = motion.mouse.nx * 0.12;
    // breathing / explode with scroll speed
    const push = 1 + Math.abs(motion.velocity) * 0.35 + state.burst;
    for (const m of globe.children) {
      m.position.copy(m.userData.dir).multiplyScalar(R * push);
    }
    const s = 0.9 + state.scroll * 0.25;
    globe.scale.setScalar(s);
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
      canvas.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('resize', resize);
      io.disconnect();
      geo.dispose();
      renderer.dispose();
    },
  };
}
