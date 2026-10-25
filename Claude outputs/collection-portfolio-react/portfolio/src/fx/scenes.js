// Every scroll / hover animation on the page, section by section.
// Runs once after fonts + images are loaded (see App.jsx).
import { gsap, ScrollTrigger, SplitText, motion } from './motion.js';

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => gsap.utils.toArray(root.querySelectorAll(sel));
const split = (el, type = 'chars') =>
  SplitText.create(el, { type: type === 'chars' ? 'chars,words' : type, mask: type === 'chars' ? 'chars' : type, linesClass: 'split-line' });
const onEnter = (trigger, start = 'top 80%') => ({ trigger, start, once: true });

export function initScenes() {
  hero();
  marquees();
  badges();
  brandIndex();
  approach();
  $$('.opener').forEach(opener);
  $$('.chapter').forEach(chapterBody);
  luyuan();
  kiaway();
  sakura();
  postcards();
  billboard();
  wall();
  closing();
  velocitySkew();
  tilt();
  magnets();
  ScrollTrigger.refresh();
}

/* ---------------- HERO ---------------- */
function hero() {
  const l1 = split($('.hero-l1'));
  const design = split($('.hero-design'));
  const intro = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });
  gsap.set(l1.chars, { yPercent: 120, rotationX: -90, transformOrigin: '50% 100%' });
  gsap.set(design.chars, { yPercent: -120 });
  gsap.set('.hero-the', { x: -300, opacity: 0, rotation: -25 });
  gsap.set('.hero-edit', { x: 300, opacity: 0, rotation: 25 });
  gsap.set('.hero-badge', { scale: 0, rotation: -540 });
  gsap.set('.hero-top span, .hero-foot > *', { yPercent: 120, opacity: 0 });
  const tapes = $$('#c01 .tape');
  gsap.set(tapes[0], { xPercent: -110 });
  gsap.set(tapes[1], { xPercent: 110 });

  intro
    .to(l1.chars, { yPercent: 0, rotationX: 0, duration: 1.6, stagger: 0.045 }, 0)
    .to(design.chars, { yPercent: 0, duration: 1.4, stagger: { each: 0.06, from: 'end' } }, 0.35)
    .to('.hero-the, .hero-edit', { x: 0, opacity: 1, rotation: 0, duration: 1.6 }, 0.7)
    .to('.hero-badge', { scale: 1, rotation: 0, duration: 2, ease: 'elastic.out(1,0.55)' }, 0.9)
    .to('.hero-top span, .hero-foot > *', { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.08 }, 0.9)
    .to(tapes, { xPercent: 0, duration: 1.8, ease: 'expo.inOut', stagger: 0.12 }, 0.4);
  window.addEventListener('site:intro', () => intro.play(), { once: true });

  // scroll away: the two lines split apart, badge rolls off, scroll cue bounces
  const out = { trigger: '#c01', start: 'top top', end: 'bottom top', scrub: 1 };
  gsap.to('.hero-l1', { x: -260, y: 260, scale: 0.9, ease: 'none', scrollTrigger: out });
  gsap.to('.hero-l2', { x: 260, y: 200, scale: 0.9, ease: 'none', scrollTrigger: out });
  gsap.to('.hero-badge', { y: 700, x: -200, rotation: 260, ease: 'none', scrollTrigger: out });
  gsap.to('.hero-scroll', { y: 8, repeat: -1, yoyo: true, duration: 0.6, ease: 'sine.inOut' });

  // glow chases the mouse
  const gx = gsap.quickTo('.hero-glow', 'x', { duration: 1.4, ease: 'power3' });
  const gy = gsap.quickTo('.hero-glow', 'y', { duration: 1.4, ease: 'power3' });
  window.addEventListener('pointermove', () => {
    gx(motion.mouse.nx * 380);
    gy(motion.mouse.ny * 220);
  });
}

/* ---------------- MARQUEES & BADGES ---------------- */
function marquees() {
  const loops = $$('.tape-track').map((t) => {
    const dir = Number(t.parentElement.dataset.dir) || 1;
    return gsap.fromTo(t, { xPercent: dir < 0 ? 0 : -50 }, { xPercent: dir < 0 ? -50 : 0, duration: 38, ease: 'none', repeat: -1 });
  });
  gsap.ticker.add(() => {
    const ts = (1 + Math.abs(motion.velocity) * 9) * (motion.direction < 0 ? -1 : 1);
    loops.forEach((l) => (l.timeScale(l.timeScale() + (ts - l.timeScale()) * 0.1)));
  });
}

function badges() {
  $$('.badge').forEach((b) => {
    const spin = gsap.timeline({ repeat: -1 })
      .to(b.querySelector('.badge-ring'), { rotation: 360, svgOrigin: '115 115', duration: 16, ease: 'none' }, 0)
      .to(b.querySelector('.badge-star'), { rotation: -360, svgOrigin: '0 0', duration: 16, ease: 'none' }, 0);
    let boost = 0;
    b.addEventListener('pointerdown', () => { boost = 25; });
    b.addEventListener('pointerenter', () => { boost = Math.max(boost, 6); });
    gsap.ticker.add(() => {
      boost *= 0.95;
      spin.timeScale(1 + Math.abs(motion.velocity) * 10 + boost);
    });
  });
}

/* ---------------- INDEX ---------------- */
function brandIndex() {
  const t = split($('.bi-title'));
  gsap.from(t.chars, { yPercent: 110, rotation: 12, duration: 1.2, stagger: 0.03, ease: 'expo.out', scrollTrigger: onEnter('#c02', 'top 60%') });
  // headline shrinks up out of the way while the posts sort into decks
  gsap.timeline({ scrollTrigger: { trigger: '.bi-pin', start: 'top top', end: 'bottom bottom', scrub: 1, invalidateOnRefresh: true } })
    .to('.bi-title', { y: () => -(motion.vh / 2 - 150), scale: 0.42, ease: 'power2.inOut', duration: 0.45 })
    .to('.bi-hint', { opacity: 0, duration: 0.2 }, 0)
    .to({}, { duration: 0.55 });
  const p = split($('.bi-p'), 'lines');
  gsap.from(p.lines, { yPercent: 110, duration: 1.1, stagger: 0.08, ease: 'expo.out', scrollTrigger: onEnter('.bi-p', 'top 85%') });

  $$('.bi-row').forEach((row) => {
    const tl = gsap.timeline({ scrollTrigger: onEnter(row, 'top 92%'), defaults: { ease: 'expo.out' } });
    tl.from(row, { clipPath: 'inset(0 100% 0 0)', duration: 1.2 })
      .from(row.querySelector('.bi-num'), { yPercent: 100, opacity: 0, duration: 0.9 }, 0.15)
      .from(row.querySelector('.bi-name'), { x: 120, opacity: 0, duration: 1.1 }, 0.2)
      .from(row.querySelectorAll('.bi-thumbs img'), { y: 140, scale: 0.3, rotation: () => gsap.utils.random(-50, 50), opacity: 0, duration: 1.1, stagger: 0.07, ease: 'back.out(1.6)' }, 0.25);
    const c = row.querySelector('.bi-count');
    const to = Number(c.dataset.to);
    const o = { v: 0 };
    tl.to(o, { v: to, duration: 1.4, ease: 'power2.out', onUpdate: () => (c.textContent = String(Math.round(o.v)).padStart(2, '0')) }, 0.2);
  });
}

/* ---------------- APPROACH (pinned) ---------------- */
function approach() {
  const t = split($('.ap-title'));
  gsap.from(t.chars, { yPercent: 110, duration: 1.1, stagger: 0.025, ease: 'expo.out', scrollTrigger: onEnter('#c03', 'top 70%') });

  const stack = $('.ap-stack');
  const [art, zones, grid] = $$('.ap-layer');
  const items = $$('.ap-item'); // 03 grid, 02 zones, 01 artwork
  // drive the stack through a proxy so the rotation order matches the CSS design
  // (rotateX first, then rotateZ), which GSAP's own transform order would flip.
  const view = { rx: 0, rz: 0, s: 1.15, ty: -150 };
  const paint = () => (stack.style.transform = `translateY(${view.ty}px) rotateX(${view.rx}deg) rotateZ(${view.rz}deg) scale(${view.s})`);
  paint();
  gsap.set([art, zones, grid], { clearProps: 'transform' });
  gsap.set([art, zones, grid], { z: 0 });
  gsap.set([zones, grid], { opacity: 0 });
  gsap.set(items, { opacity: 0.2, x: 0 });

  const tl = gsap.timeline({
    defaults: { ease: 'power2.inOut' },
    scrollTrigger: { trigger: '.ap-pin', start: 'top top', end: 'bottom bottom', scrub: 1 },
  });
  tl.to(items[2], { opacity: 1, x: 24, duration: 0.5 })
    .to(view, { rx: 56, rz: -38, s: 1, ty: 0, duration: 1.4, onUpdate: paint }, 0.2)
    .to(zones, { opacity: 1, z: 170, duration: 1.2 }, 1.2)
    .from('.ap-zone', { scale: 0, opacity: 0, stagger: 0.08, duration: 0.6, ease: 'back.out(2)' }, 1.4)
    .to(items[2], { opacity: 0.45, x: 0, duration: 0.4 }, 1.3)
    .to(items[1], { opacity: 1, x: 24, duration: 0.5 }, 1.3)
    .to(grid, { opacity: 1, z: 340, duration: 1.2 }, 2.4)
    .from(grid, { backgroundSize: '400px 400px', duration: 1.2 }, 2.4)
    .to(items[1], { opacity: 0.45, x: 0, duration: 0.4 }, 2.5)
    .to(items[0], { opacity: 1, x: 24, duration: 0.5 }, 2.5)
    .to(view, { rz: 322, duration: 2.2, ease: 'power1.inOut', onUpdate: paint }, 3.4)
    .to([zones, grid], { z: (i) => (i ? 200 : 100), duration: 1.1, yoyo: true, repeat: 1 }, 3.4)
    .to(items, { opacity: 1, x: 0, duration: 0.6 }, 4.6);
  gsap.to('.ap-meter-fill', { scaleX: 1, ease: 'none', scrollTrigger: { trigger: '.ap-pin', start: 'top top', end: 'bottom bottom', scrub: true } });

  gsap.from('.step', {
    rotationX: -95, y: 80, opacity: 0, transformOrigin: '50% 0%', duration: 1.3, stagger: 0.1, ease: 'expo.out',
    scrollTrigger: onEnter('.ap-steps', 'top 88%'),
  });
}

/* ---------------- CHAPTER OPENERS ---------------- */
function opener(sec) {
  // the whole section irises open as it arrives
  gsap.fromTo(sec, { clipPath: 'inset(14% 8% 14% 8% round 80px)' }, {
    clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
    scrollTrigger: { trigger: sec, start: 'top bottom', end: 'top 15%', scrub: true },
  });

  const giant = $('.op-giant', sec);
  const g = split(giant);
  gsap.fromTo(g.chars, { yPercent: 105, rotationX: -80, scaleY: 1.6 }, {
    yPercent: 0, rotationX: 0, scaleY: 1, stagger: 0.06, ease: 'power3.out',
    scrollTrigger: { trigger: sec, start: 'top 85%', end: 'top 5%', scrub: 1 },
  });
  gsap.to(giant, { xPercent: -14, ease: 'none', scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom top', scrub: true } });

  const fans = $$('.op-fan', sec);
  fans.forEach((f, i) => {
    const ry = Number(f.dataset.ry), rot = Number(f.dataset.rot);
    gsap.set(f, { clearProps: 'transform' });
    gsap.fromTo(f,
      { y: 900, rotation: rot * 4 + (i - 1) * 30, rotationY: 0, scale: 0.4, transformPerspective: 1400 },
      { y: 0, rotation: rot, rotationY: ry, scale: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sec, start: `top ${95 - i * 6}%`, end: 'top 10%', scrub: 1.2 } });
    gsap.to(f, { yPercent: -40 - i * 25, ease: 'none', scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom top', scrub: true } });
  });
  // fans drift toward the mouse
  const qs = fans.map((f) => [gsap.quickTo(f, 'xPercent', { duration: 1, ease: 'power3' }), gsap.quickTo(f, 'rotationX', { duration: 1, ease: 'power3' })]);
  sec.addEventListener('pointermove', () => qs.forEach(([x, rx], i) => { x(motion.mouse.nx * (8 + i * 5)); rx(-motion.mouse.ny * 14); }));

  const num = split($('.op-num', sec));
  gsap.from(num.chars, { yPercent: 110, duration: 1.3, stagger: 0.12, ease: 'expo.out', scrollTrigger: onEnter(sec, 'top 30%') });
  const txt = split($('.op-text', sec), 'lines');
  gsap.from(txt.lines, { yPercent: 110, duration: 1.2, stagger: 0.1, ease: 'expo.out', scrollTrigger: onEnter(sec, 'top 30%') });
  gsap.from($$('.op-top > *', sec), { y: -40, opacity: 0, duration: 1, stagger: 0.1, ease: 'expo.out', scrollTrigger: onEnter(sec, 'top 60%') });
}

/* ---------------- CHAPTER BODIES ---------------- */
function chapterBody(sec) {
  const meta = $('.meta', sec);
  gsap.from(meta, { clipPath: 'inset(0 100% 0 0)', duration: 1.6, ease: 'expo.inOut', scrollTrigger: onEnter(meta, 'top 88%') });
  gsap.from($$('.meta-i', sec), { y: 40, opacity: 0, duration: 1, stagger: 0.1, ease: 'expo.out', delay: 0.4, scrollTrigger: onEnter(meta, 'top 88%') });

  const big = split($('.lede .big', sec), 'lines');
  gsap.from(big.lines, { yPercent: 115, rotation: 4, duration: 1.3, stagger: 0.12, ease: 'expo.out', scrollTrigger: onEnter($('.lede', sec), 'top 80%') });
  const p = SplitText.create($('.lede p', sec), { type: 'words' });
  gsap.fromTo(p.words, { opacity: 0.08 }, { opacity: 1, stagger: 0.05, ease: 'none', scrollTrigger: { trigger: $('.lede p', sec), start: 'top 85%', end: 'bottom 55%', scrub: true } });

  const anat = $('.anat', sec);
  if (anat) {
    const tl = gsap.timeline({ scrollTrigger: onEnter(anat, 'top 75%') });
    tl.from($('.an-mask', anat), { clipPath: 'inset(100% 0 0 0)', duration: 1.4, ease: 'expo.inOut' })
      .from($('.an-img', anat), { scale: 1.5, duration: 1.8, ease: 'expo.out' }, 0.3)
      .from($$('.mk', anat), { scale: 0, rotation: -180, duration: 0.8, stagger: 0.09, ease: 'back.out(3)' }, 0.9)
      .from($$('.note', anat), { x: 80, opacity: 0, duration: 1, stagger: 0.07, ease: 'expo.out' }, 0.6);
    // hover a note -> its marker pops (and vice-versa)
    const marks = $$('.mk', anat), notes = $$('.note', anat);
    const on = (i, v) => { marks[i]?.classList.toggle('on', v); notes[i]?.classList.toggle('on', v); };
    [...marks, ...notes].forEach((el) => {
      el.addEventListener('pointerenter', () => on(+el.dataset.i, true));
      el.addEventListener('pointerleave', () => on(+el.dataset.i, false));
    });
  }

  gsap.from($$('.prin > div', sec), { y: 100, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'expo.out', scrollTrigger: onEnter($('.prin', sec), 'top 88%') });
}

/* ---------------- SHOWCASES ---------------- */
function luyuan() {
  const cards = $$('.lu-card');
  if (!cards.length) return;
  gsap.from(cards, {
    y: 600, x: (i) => (1.5 - i) * 260, rotation: (i) => (i - 1.5) * 30, opacity: 0, duration: 1.6,
    stagger: 0.12, ease: 'expo.out', scrollTrigger: onEnter('.sc-luyuan', 'top 85%'),
  });
}

function kiaway() {
  const items = $$('.ki-item');
  if (!items.length) return;
  gsap.from($$('.ki-img'), { y: 160, scale: 0.7, opacity: 0, duration: 1.2, stagger: 0.1, ease: 'expo.out', scrollTrigger: onEnter('.sc-kiaway', 'top 85%') });
  $$('.ki-tag').forEach((tag, i) => {
    const r = Number(tag.dataset.rot);
    gsap.set(tag, { transformOrigin: '50% 0%' });
    gsap.from(tag, { rotation: -100, opacity: 0, duration: 2.4, delay: 0.5 + i * 0.12, ease: 'elastic.out(1,0.25)', scrollTrigger: onEnter('.sc-kiaway', 'top 85%') });
    const sway = gsap.to(tag, { rotation: r + 7, duration: 1.4 + i * 0.25, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 3 });
    items[i].addEventListener('pointerenter', () => {
      sway.pause();
      gsap.fromTo(tag, { rotation: r - 35 }, { rotation: r, duration: 1.8, ease: 'elastic.out(1.2,0.2)', onComplete: () => sway.play() });
    });
  });
}

function sakura() {
  if (!$('.sk-big')) return;
  const sec = $('.sk-big').closest('section');
  gsap.fromTo('.sk-big1', { x: 700 }, { x: -500, ease: 'none', scrollTrigger: { trigger: '.sk-big', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.fromTo('.sk-big2', { x: -700 }, { x: 500, ease: 'none', scrollTrigger: { trigger: '.sk-big', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.from('.sk-item', {
    y: 500, rotation: () => gsap.utils.random(-30, 30), opacity: 0, duration: 1.5, stagger: 0.1, ease: 'expo.out',
    scrollTrigger: onEnter('.sk-row', 'top 90%'),
  });
  gsap.from('.sk-paper', { y: 400, rotation: -16, scale: 0.6, opacity: 0, duration: 1.3, ease: 'back.out(1.3)', scrollTrigger: onEnter('.sk-paper', 'top 90%') });
  const mast = split($('.sk-mast'));
  gsap.from(mast.chars, { yPercent: 100, opacity: 0, duration: 0.6, stagger: 0.04, ease: 'power3.out', scrollTrigger: onEnter('.sk-paper', 'top 60%') });
  gsap.from('.sk-story', { x: 120, opacity: 0, duration: 1.1, stagger: 0.12, ease: 'expo.out', scrollTrigger: onEnter('.sk-paper', 'top 50%') });
  return sec;
}

function postcards() {
  const cards = $$('.pc-card');
  if (!cards.length) return;
  cards.forEach((c, i) => {
    const side = i % 2 ? 1 : -1;
    const tl = gsap.timeline({ scrollTrigger: onEnter(c, 'top 92%') });
    tl.from(c, { x: side * 900, rotation: side * 45, opacity: 0, duration: 1.5, ease: 'expo.out' })
      .from(c.querySelector('.pc-mark'), { scale: 3.5, rotation: -60, opacity: 0, duration: 0.45, ease: 'power4.in' }, 0.9)
      .to(c, { x: '+=6', y: '+=4', duration: 0.06, yoyo: true, repeat: 3 }, 1.35);
    gsap.to(c, { y: i % 2 ? -160 : -40, ease: 'none', scrollTrigger: { trigger: '.sc-post', start: 'top bottom', end: 'bottom top', scrub: true } });
  });
}

function billboard() {
  if (!$('.bb-scene')) return;
  const scrub = { trigger: '.bb-scene', start: 'top bottom', end: 'center 40%', scrub: 1 };
  gsap.fromTo('.bb-sky', { opacity: 1 }, { opacity: 0, ease: 'none', scrollTrigger: scrub });
  gsap.fromTo('.bb-sun', { y: 330, scale: 0.7 }, { y: 0, scale: 1, ease: 'none', scrollTrigger: scrub });
  gsap.fromTo('.bb-board', { y: 640 }, { y: 0, ease: 'power2.out', scrollTrigger: scrub });
  const copy = split($('.bb-copy .anton'), 'lines');
  gsap.from(copy.lines, { yPercent: 115, duration: 1.2, stagger: 0.12, ease: 'expo.out', scrollTrigger: onEnter('.bb-scene', 'top 50%') });
  gsap.from('.bb-item', { y: 200, opacity: 0, rotationY: -60, transformPerspective: 1000, duration: 1.3, stagger: 0.1, ease: 'expo.out', scrollTrigger: onEnter('.bb-row', 'top 90%') });
}

/* ---------------- WALL ---------------- */
function wall() {
  const a = split($('.wall-l1'));
  const b = split($('.wall-l2'));
  const tl = gsap.timeline({ scrollTrigger: onEnter('#c09', 'top 55%'), defaults: { ease: 'expo.out' } });
  tl.from(a.chars, { yPercent: 110, duration: 1.3, stagger: 0.05 })
    .from(b.chars, { yPercent: -110, duration: 1.3, stagger: { each: 0.05, from: 'end' } }, 0.15)
    .from('.wall-l3', { clipPath: 'inset(0 100% 0 0)', duration: 1.6, ease: 'expo.inOut' }, 0.5);
  gsap.to('.wall-text', { y: -120, ease: 'none', scrollTrigger: { trigger: '#c09', start: 'top bottom', end: 'bottom top', scrub: true } });
}

/* ---------------- CLOSING ---------------- */
function closing() {
  gsap.from('.cl-skill', { y: 80, opacity: 0, duration: 1.1, stagger: 0.1, ease: 'expo.out', scrollTrigger: onEnter('#c10', 'top 75%') });
  const th = split($('.cl-thank'));
  const you = split($('.cl-you'));
  const tl = gsap.timeline({ scrollTrigger: onEnter('.cl-thank', 'top 85%'), defaults: { ease: 'expo.out' } });
  tl.from(th.chars, { yPercent: 115, rotation: 15, duration: 1.4, stagger: 0.06 })
    .from(you.chars, { yPercent: -115, rotation: -15, duration: 1.4, stagger: 0.06 }, 0.2)
    .from('.cl-msg', { x: 120, opacity: 0, duration: 1.2 }, 0.6)
    .from('.cl-badge', { scale: 0, rotation: 720, duration: 2, ease: 'elastic.out(1,0.5)' }, 0.4);
  gsap.from('.cl-contact', { y: 60, opacity: 0, duration: 1, stagger: 0.08, ease: 'expo.out', scrollTrigger: onEnter('.cl-row', 'top 95%') });
}

/* ---------------- GLOBAL EFFECTS ---------------- */
// Rows of posts lean into the scroll like jelly.
function velocitySkew() {
  const rows = $$('.vskew');
  const setters = rows.map((r) => gsap.quickSetter(r, 'skewY', 'deg'));
  gsap.ticker.add(() => setters.forEach((s) => s(motion.velocity * -5)));
}

// 3D tilt toward the cursor on posts and cards.
function tilt() {
  $$('.an-img, .ki-img, .sk-img, .bb-item img, .bb-img, .lu-card, .pc-card img').forEach((el) => {
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.6, ease: 'power3' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.6, ease: 'power3' });
    gsap.set(el, { transformPerspective: 900 });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 22);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 22);
    });
    el.addEventListener('pointerenter', () => gsap.to(el, { scale: 1.04, duration: 0.5, ease: 'power3' }));
    el.addEventListener('pointerleave', () => { rx(0); ry(0); gsap.to(el, { scale: 1, duration: 0.6, ease: 'power3' }); });
  });
}

// Contact details pull toward the cursor.
function magnets() {
  $$('.magnet').forEach((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' });
    const y = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' });
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      x(((e.clientX - r.left - r.width / 2) * 0.4) / motion.fit);
      y(((e.clientY - r.top - r.height / 2) * 0.6) / motion.fit);
    });
    el.addEventListener('pointerleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 1.2, ease: 'elastic.out(1,0.3)' });
    });
  });
}
