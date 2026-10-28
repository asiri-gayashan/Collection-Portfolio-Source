import { createRoot } from 'react-dom/client';
import './styles/fonts.css';
import './styles/global.css';
import './styles/fx.css';
import App from './App.jsx';
import { fitToWindow, initSmoothScroll, ScrollTrigger, STATIC } from './fx/motion.js';

// The page is designed on a 1400px canvas and scaled to fill the window width.
fitToWindow();
window.addEventListener('resize', () => {
  fitToWindow();
  ScrollTrigger.refresh(); 
});
if (STATIC) document.documentElement.classList.add('static');
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
initSmoothScroll();

// (No StrictMode: it double-mounts effects, which would build every
// WebGL scene and scroll animation twice in development.)
createRoot(document.getElementById('root')).render(<App />);
