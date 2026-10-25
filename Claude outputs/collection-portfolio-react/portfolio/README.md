# Social Media Design Collection 2026 — React source

Asiri Gayashan's Behance portfolio, built with React + Vite.
The original static HTML version is in this repo's git history.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173  (cover: /cover.html)
npm run build      # static site in dist/
npm run preview    # preview the built site
```

## Motion & WebGL

The page is fully animated with **GSAP + ScrollTrigger**, **Three.js** and **Lenis** smooth scrolling.
After pulling these changes run `npm install` once (adds `gsap`, `three`, `lenis`).

- **Preloader** – live 000→100 counter with a flip-book of posts, then the page splits open.
- **Hero** – WebGL tunnel built from all 24 posts: warps in, flies forward as you scroll,
  bends and RGB-splits with scroll speed, camera follows the mouse. Headline letters roll in.
- **Everywhere** – custom blend-mode cursor (labels: VIEW / SPIN / DRAG / OPEN / HELLO),
  scroll progress bar + live section name, film grain, marquee tapes that speed up and
  reverse with your scroll, badges that spin faster while scrolling.
- **Index** – rows wipe in, counters count up, hover floods the row in the brand colour and fans the posts.
- **Approach** – pinned: one post explodes into Artwork → Zones → Grid in 3D as you scroll.
- **Chapters** – openers iris open, giant brand names roll up letter by letter, posts fly in and
  follow the mouse; text reveals line by line; anatomy markers pop and link to their notes on hover.
- **Showcases** – cards deal in, price tags swing, SPEC/SPOTLIGHT slides across, newspaper slaps down,
  postcards fly in and get stamped, the billboard rises through a sunset.
- **Wall** – a WebGL globe of posts you can drag and fling.
- **Closing** – THANK YOU rolls in, contact details are magnetic.

Code: `src/fx/` (`motion.js` setup, `scenes.js` every scroll animation, `HeroTunnel.js` + `PostGlobe.js`
WebGL, `Overlays.jsx` preloader/cursor/HUD) and `src/styles/fx.css`.

**Static mode:** add `?static` to the URL (`http://localhost:5173/?static`) to switch every animation off
and get the original flat layout back. The same happens automatically when the OS "reduce motion" setting is on.

## Project layout

```
index.html              portfolio page entry (1400px wide)
cover.html              Behance cover entry (808 × 632)
src/
  data/content.js       ALL text, brands, chapters, colours: edit here
  App.jsx               page order: Hero → Index → Approach → 5 Chapters → Wall → Closing
  CoverPage.jsx         cover thumbnail
  components/
    Hero.jsx, BrandIndex.jsx, Approach.jsx, Chapter.jsx, Wall.jsx, Closing.jsx
    Badge.jsx, Tape.jsx, ImageFloor.jsx           shared pieces
    showcases/          per-brand layouts (LuyuanCards, KiawayTags, SakuraSeries, Postcards, Billboard)
  assets/images/        the 24 posts (file name = key used in content.js)
  assets/fonts/         Anton, Archivo, JetBrains Mono, Instrument Serif
  styles/               fonts.css, global.css, cover.css
```

## How to edit

- **Text, prices, chapters:** `src/data/content.js`.
- **Email / Behance link:** the `designer` object at the top of `content.js`.
- **Swap a post:** replace a file in `src/assets/images/` with one of the same name.
- **Add a post:** drop `my_post.jpg` into `src/assets/images/` and reference it as `'my_post'`.
- **Colours:** `--sig` (#FF4D1A) etc. in `src/styles/global.css`; brand colours per chapter in `content.js`.

## Export images for Behance

Run `npm run dev`, open `http://localhost:5173/?static` in Chrome (static mode, no animations), then in DevTools (F12) set the width to 1400 and use
Ctrl+Shift+P → "Capture full size screenshot", or select one `<section>` and choose "Capture node screenshot".
Do the same with `/cover.html` for the thumbnail.
