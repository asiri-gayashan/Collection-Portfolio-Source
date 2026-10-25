// "5 BRANDS & 24 POSTS" WebGL stage.
// Phase 0: all 24 posts float in a 3D storm around the headline and dodge the mouse.
// Phase 1 (scroll): they fly together into five brand decks.
// Phase 2 (scroll): each deck fans open like a hand of cards; brand labels appear.
import * as THREE from 'three';
import { gsap, motion } from './motion.js';
import { loadPostTextures, postVertex, postFragment } from './textures.js';
import { ALL } from '../data/content.js';

const ORDER = ['l', 'k', 's', 'r', 'g']; // brand order (matches BRANDS)
const SIZE = 2.5;
const GAP = 4.7;

const smooth = (t) => { t = Math.min(1, Math.max(0, t)); return t * t * (3 - 2 * t); };
const lerp = (a, b, t) => a + (b - a) * t;

function shadowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(64, 64, 10, 64, 64, 64);
  grd.addColorStop(0, 'rgba(0,0,0,.55)');
  grd.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
}

export function createBrandStage(canvas, { labels = [] } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1400 / 800, 0.1, 100);
  camera.position.set(0, 0, 22);

  const world = new THREE.Group();
  scene.add(world);

  const shared = {
    uTime: { value: 0 }, uVel: { value: 0 }, uBend: { value: 1.4 },
    uNear: { value: 24 }, uFar: { value: 60 }, uAlpha: { value: 1 },
    uFog: { value: new THREE.Color('#EFECE6') }, uBack: { value: 0.35 },
  };
  const geo = new THREE.PlaneGeometry(SIZE, SIZE, 12, 12);
  const shGeo = new THREE.PlaneGeometry(SIZE * 1.5, SIZE * 1.5);
  const shMat = new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false });

  const cards = [];
  const state = { p: 0, target: 0, visible: false, alive: true, hover: -1 };
  const counts = ORDER.map((b) => ALL.filter((k) => k[0] === b).length);
  const seen = ORDER.map(() => 0);

  loadPostTextures().then((textures) => {
    if (!state.alive) return;
    ALL.forEach((key, i) => {
      const mat = new THREE.ShaderMaterial({
        uniforms: { ...shared, uTex: { value: textures[i] } },
        vertexShader: postVertex, fragmentShader: postFragment,
        side: THREE.DoubleSide, transparent: true,
      });
      const card = new THREE.Group();
      const m = new THREE.Mesh(geo, mat);
      const sh = new THREE.Mesh(shGeo, shMat);
      sh.position.set(0.35, -0.45, -0.6);
      card.add(sh, m);
      const b = ORDER.indexOf(key[0]);
      const j = seen[b]++;
      // chaos position: a wide, deep storm, kept clear of the centre headline
      const a = Math.random() * Math.PI * 2;
      const r = 4.5 + Math.random() * 7;
      const chaos = new THREE.Vector3(Math.cos(a) * r * 1.6, Math.sin(a) * r * 0.8, -Math.random() * 9 + 4);
      const crot = new THREE.Euler((Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 2.2, (Math.random() - 0.5) * 1.4);
      card.userData = { b, j, n: counts[b], chaos, crot, delay: Math.random() * 0.18, push: new THREE.Vector3(), seed: Math.random() * 10 };
      world.add(card);
      cards.push(card);
    });
  });

  // mouse in world space (z = 0 plane)
  const ray = new THREE.Raycaster();
  const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const mWorld = new THREE.Vector3(999, 999, 0);
  const ndc = new THREE.Vector2();
  const onMove = (e) => {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    ray.ray.intersectPlane(plane, mWorld);
  };
  const onLeave = () => mWorld.set(999, 999, 0);
  window.addEventListener('pointermove', onMove);
  canvas.parentElement.addEventListener('pointerleave', onLeave);

  const pos = new THREE.Vector3();
  const tmp = new THREE.Vector3();
  const tilt = { x: 0, y: 0 };
  const tick = (t) => {
    if (!state.visible || !cards.length) return;
    state.p += (state.target - state.p) * 0.08;
    const p = state.p;
    shared.uTime.value = t;
    shared.uVel.value += (motion.velocity * 2 - shared.uVel.value) * 0.1;

    for (const c of cards) {
      const { b, j, n, chaos, crot, delay, push, seed } = c.userData;
      const k1 = smooth((p - delay) / 0.4);          // storm -> decks
      const k2 = smooth((p - 0.55 - delay * 0.5) / 0.3); // decks -> fans
      // storm: slow orbit + float
      const orbit = t * 0.08 + seed;
      const cx = chaos.x * Math.cos(t * 0.05) - chaos.z * Math.sin(t * 0.05) * 0.3;
      const sx = cx + Math.sin(orbit) * 0.6;
      const sy = chaos.y + Math.cos(orbit * 1.3) * 0.6;
      const sz = chaos.z + Math.sin(orbit * 0.7) * 0.8;
      // deck
      const bx = (b - 2) * GAP;
      const dx = bx + j * 0.06, dy = -0.4 + j * 0.1, dz = j * 0.22;
      // fan (a hand of cards pivoting from below)
      const ang = (j - (n - 1) / 2) * (n > 5 ? 0.13 : 0.24);
      const fx = bx + Math.sin(ang) * 2.6, fy = -2.2 + Math.cos(ang) * 2.9, fz = j * 0.08;

      pos.set(lerp(sx, dx, k1), lerp(sy, dy, k1), lerp(sz, dz, k1));
      pos.set(lerp(pos.x, fx, k2), lerp(pos.y, fy, k2), lerp(pos.z, fz, k2));

      // mouse repel
      tmp.copy(pos).sub(mWorld); tmp.z = 0;
      const d = tmp.length();
      const force = d < 4.2 ? (1 - d / 4.2) * 2.6 : 0;
      tmp.normalize().multiplyScalar(force);
      tmp.z = force * 1.4;
      push.lerp(tmp, 0.12);
      c.position.copy(pos).add(push);

      const wob = Math.sin(t * 0.9 + seed) * 0.08 * (1 - k1);
      c.rotation.set(
        lerp(crot.x + wob, 0, k1) + push.y * -0.12,
        lerp(crot.y + t * 0.35 * (1 - k1), 0, k1) + push.x * 0.12,
        lerp(lerp(crot.z, (j - (n - 1) / 2) * 0.03, k1), -ang, k2)
      );
      const s = 1 + force * 0.08;
      c.scale.setScalar(s);
    }

    tilt.x += (motion.mouse.ny * 0.12 - tilt.x) * 0.05;
    tilt.y += (motion.mouse.nx * 0.2 - tilt.y) * 0.05;
    world.rotation.set(tilt.x, tilt.y, 0);
    world.position.y = lerp(0, -1.2, smooth((p - 0.2) / 0.4));

    // brand labels follow their deck on screen
    const show = smooth((p - 0.6) / 0.25);
    labels.forEach((el, b) => {
      if (!el) return;
      tmp.set((b - 2) * GAP, -3.9, 0);
      world.localToWorld(tmp);
      tmp.project(camera);
      const x = (tmp.x * 0.5 + 0.5) * 1400;
      const y = (-tmp.y * 0.5 + 0.5) * motion.vh;
      el.style.transform = `translate(${x}px, ${y + (1 - show) * 40}px) translate(-50%, 0)`;
      el.style.opacity = show;
    });

    renderer.render(scene, camera);
  };

  const resize = () => {
    renderer.setPixelRatio(Math.min(1.5, window.devicePixelRatio * motion.fit));
    renderer.setSize(1400, motion.vh, false);
    camera.aspect = 1400 / motion.vh;
    // keep all five decks in frame on tall/narrow windows
    camera.position.z = Math.max(22, 26 / camera.aspect + 8);
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);
  const io = new IntersectionObserver(([e]) => (state.visible = e.isIntersecting), { rootMargin: '100px' });
  io.observe(canvas);

  const loop = () => tick(performance.now() / 1000);
  gsap.ticker.add(loop);

  return {
    setScroll(p) { state.target = p; },
    destroy() {
      state.alive = false;
      gsap.ticker.remove(loop);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', resize);
      io.disconnect();
      geo.dispose(); shGeo.dispose();
      renderer.dispose();
    },
  };
}
