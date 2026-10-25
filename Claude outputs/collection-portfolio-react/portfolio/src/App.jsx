import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Hero from './components/Hero.jsx';
import BrandIndex from './components/BrandIndex.jsx';
import Approach from './components/Approach.jsx';
import Chapter from './components/Chapter.jsx';
import Wall from './components/Wall.jsx';
import Closing from './components/Closing.jsx';
import { CHAPTERS } from './data/content.js';
import { gsap, STATIC } from './fx/motion.js';
import { initScenes } from './fx/scenes.js';
import { Preloader, Cursor, Hud, Grain } from './fx/Overlays.jsx';

export default function App() {
  const [ready, setReady] = useState(false);

  // Build every scroll animation once fonts + images are in.
  useEffect(() => {
    if (!ready || STATIC) return;
    const ctx = gsap.context(() => initScenes());
    return () => ctx.revert();
  }, [ready]);

  return (
    <>
      <Hero />
      <BrandIndex />
      <Approach />
      {CHAPTERS.map((c) => (
        <Chapter key={c.id} c={c} />
      ))}
      <Wall />
      <Closing />
      {createPortal(
        <>
          <Grain />
          <Hud ready={ready} />
          <Cursor />
          <Preloader onLoaded={() => setReady(true)} />
        </>,
        document.getElementById('fx')
      )}
    </>
  );
}
