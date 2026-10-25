import Hero from './components/Hero.jsx';
import BrandIndex from './components/BrandIndex.jsx';
import Approach from './components/Approach.jsx';
import Chapter from './components/Chapter.jsx';
import Wall from './components/Wall.jsx';
import Closing from './components/Closing.jsx';
import { CHAPTERS } from './data/content.js';

export default function App() {
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
    </>
  );
}
