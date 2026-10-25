// Shared motion state: smooth scroll (Lenis) wired into GSAP ScrollTrigger,
// page scaling (1400px canvas -> window width) and live scroll velocity
// that the WebGL scenes, marquees and badges all react to.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);

export const DESIGN_WIDTH = 1400;

// ?static in the URL (or OS "reduce motion") turns every animation off.
// Use it for Behance screenshots: http://localhost:5173/?static
const params = new URLSearchParams(location.search);
export const STATIC =
  params.has('static') || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const TOUCH = window.matchMedia('(hover: none)').matches;

export const motion = {
  fit: 1,        // page scale factor
  vh: 900,       // viewport height in design (1400-canvas) pixels
  velocity: 0,   // smoothed scroll velocity, roughly -1..1
  direction: 1,
  mouse: { x: 0, y: 0, nx: 0, ny: 0 }, // client px + normalised -1..1
  lenis: null,
};

export function fitToWindow() {
  const de = document.documentElement;
  motion.fit = de.clientWidth / DESIGN_WIDTH;
  motion.vh = window.innerHeight / motion.fit;
  de.style.setProperty('--fit', String(motion.fit));
  de.style.setProperty('--vh', `${motion.vh}px`);
  de.style.setProperty('--vhn', String(motion.vh));
}

export function initSmoothScroll() {
  window.addEventListener('pointermove', (e) => {
    motion.mouse.x = e.clientX;
    motion.mouse.y = e.clientY;
    motion.mouse.nx = (e.clientX / window.innerWidth) * 2 - 1;
    motion.mouse.ny = (e.clientY / window.innerHeight) * 2 - 1;
  });

  if (STATIC) return;

  const lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true });
  motion.lenis = lenis;
  lenis.on('scroll', (l) => {
    ScrollTrigger.update();
    motion.direction = l.direction || motion.direction;
  });
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
    const target = gsap.utils.clamp(-1, 1, (lenis.velocity || 0) / 60);
    motion.velocity += (target - motion.velocity) * 0.12;
  });
  gsap.ticker.lagSmoothing(0);
}

export { gsap, ScrollTrigger, SplitText };
