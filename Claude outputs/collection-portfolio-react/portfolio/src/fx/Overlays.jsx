// Fixed, full-window layers that sit outside the scaled page:
// preloader, custom cursor, scroll HUD and film grain.
import { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, motion, STATIC, TOUCH } from './motion.js';
import { img } from '../lib/img.js';
import { ALL, designer } from '../data/content.js';

/* ---------------- Preloader ---------------- */
export function Preloader({ onLoaded }) {
  const root = useRef();
  const [n, setN] = useState(0);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (STATIC) { onLoaded(); window.dispatchEvent(new Event('site:intro')); return; }
    motion.lenis?.stop();
    document.documentElement.classList.add('is-loading');

    // flip-book of posts while loading
    const flip = setInterval(() => setFrame((f) => (f + 1) % ALL.length), 90);

    let loaded = 0;
    const total = ALL.length + 1;
    const counter = { v: 0 };
    const bump = () => {
      loaded++;
      gsap.to(counter, { v: (loaded / total) * 100, duration: 0.6, ease: 'power2.out', onUpdate: () => setN(Math.round(counter.v)) });
    };
    const imgs = ALL.map((k) => new Promise((res) => { const i = new Image(); i.onload = i.onerror = () => { bump(); res(); }; i.src = img(k); }));
    const fonts = document.fonts.ready.then(bump);
    const minTime = new Promise((r) => setTimeout(r, 1400));

    Promise.all([...imgs, fonts, minTime]).then(() => {
      gsap.to(counter, {
        v: 100, duration: 0.4, onUpdate: () => setN(Math.round(counter.v)),
        onComplete: () => {
          clearInterval(flip);
          onLoaded();
          requestAnimationFrame(() => requestAnimationFrame(() => out()));
        },
      });
    });

    const out = () => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.classList.remove('is-loading');
          motion.lenis?.start();
          if (root.current) root.current.style.display = 'none';
          ScrollTrigger.refresh();
        },
      });
      tl.to('.pl-count, .pl-top span', { yPercent: -110, duration: 0.6, ease: 'power3.in', stagger: 0.04 })
        .to('.pl-flip', { scale: 7, rotate: 8, opacity: 0, duration: 1.1, ease: 'expo.in' }, 0.1)
        .add(() => window.dispatchEvent(new Event('site:intro')), 0.95)
        .to('.pl-panel', { yPercent: (i) => (i ? 100 : -100), duration: 1.1, ease: 'expo.inOut' }, 0.85);
    };
    return () => clearInterval(flip);
  }, []);

  if (STATIC) return null;
  return (
    <div className="pl" ref={root}>
      <div className="pl-panel" />
      <div className="pl-panel" />
      <div className="pl-top mono">
        <span>{designer.name}</span><span>Portfolio 2026</span><span>Loading the edit</span>
      </div>
      <div className="pl-flip">
        <img src={img(ALL[frame])} alt="" />
      </div>
      <div className="pl-count anton">{String(n).padStart(3, '0')}</div>
    </div>
  );
}

/* ---------------- Cursor ---------------- */
export function Cursor() {
  const dot = useRef();
  const ring = useRef();
  const label = useRef();
  useEffect(() => {
    if (STATIC || TOUCH) return;
    document.documentElement.classList.add('has-cursor');
    const xd = gsap.quickTo(dot.current, 'x', { duration: 0.08, ease: 'power3' });
    const yd = gsap.quickTo(dot.current, 'y', { duration: 0.08, ease: 'power3' });
    const xr = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' });
    const yr = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' });
    let shown = false;
    const move = (e) => {
      if (!shown) { shown = true; gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY }); gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.4 }); }
      xd(e.clientX); yd(e.clientY); xr(e.clientX); yr(e.clientY);
      const t = e.target.closest?.('[data-cursor]');
      const txt = t ? t.getAttribute('data-cursor') : '';
      if (txt !== ring.current.dataset.label) {
        ring.current.dataset.label = txt;
        label.current.textContent = txt;
        gsap.to(ring.current, { scale: txt ? 2.6 : 1, duration: 0.5, ease: 'expo.out' });
        gsap.to(label.current, { opacity: txt ? 1 : 0, duration: 0.25 });
        gsap.to(dot.current, { scale: txt ? 0 : 1, duration: 0.3 });
      }
    };
    const down = () => gsap.to(ring.current, { scale: '-=0.3', duration: 0.15, yoyo: true, repeat: 1 });
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerdown', down);
    // squash the ring with scroll speed
    const sq = () => ring.current && gsap.set(ring.current.firstChild, { scaleY: 1 - Math.min(0.5, Math.abs(motion.velocity) * 0.8), scaleX: 1 + Math.min(0.5, Math.abs(motion.velocity) * 0.8) });
    gsap.ticker.add(sq);
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerdown', down); gsap.ticker.remove(sq); };
  }, []);
  if (STATIC || TOUCH) return null;
  return (
    <>
      <div className="cur-dot" ref={dot} />
      <div className="cur-ring" ref={ring}>
        <i />
        <span ref={label} />
      </div>
    </>
  );
}

/* ---------------- HUD: progress + current section ---------------- */
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789✶#/';
function scramble(el, text) {
  if (!el) return;
  const o = { p: 0 };
  gsap.to(o, {
    p: 1, duration: 0.7, ease: 'none',
    onUpdate: () => {
      const k = Math.floor(o.p * text.length);
      el.textContent = text.slice(0, k) + Array.from(text.slice(k), (c) => (c === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join('');
    },
  });
}

export function Hud({ ready }) {
  const bar = useRef();
  const lab = useRef();
  const pct = useRef();
  useEffect(() => {
    if (!ready || STATIC) return;
    const st = ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (s) => {
        gsap.set(bar.current, { scaleX: s.progress });
        pct.current.textContent = String(Math.round(s.progress * 100)).padStart(3, '0') + '%';
      },
    });
    const secs = gsap.utils.toArray('section[data-label]');
    const sts = secs.map((sec) =>
      ScrollTrigger.create({
        trigger: sec, start: 'top 50%', end: 'bottom 50%',
        onToggle: (s) => s.isActive && scramble(lab.current, sec.dataset.label),
      })
    );
    return () => { st.kill(); sts.forEach((s) => s.kill()); };
  }, [ready]);
  if (STATIC) return null;
  return (
    <div className="hud">
      <div className="hud-bar" ref={bar} />
      <div className="hud-lab mono"><i />{' '}<span ref={lab}>INTRO</span></div>
      <div className="hud-pct mono" ref={pct}>000%</div>
    </div>
  );
}

export function Grain() {
  if (STATIC) return null;
  return <div className="grain" />;
}
