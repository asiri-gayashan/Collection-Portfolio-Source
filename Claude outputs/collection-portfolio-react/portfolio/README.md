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

Run `npm run dev`, open the page in Chrome, then in DevTools (F12) set the width to 1400 and use
Ctrl+Shift+P → "Capture full size screenshot", or select one `<section>` and choose "Capture node screenshot".
Do the same with `/cover.html` for the thumbnail.
