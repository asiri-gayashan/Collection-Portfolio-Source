import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Two pages: the full portfolio (index.html) and the Behance cover (cover.html).
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cover: resolve(__dirname, 'cover.html'),
      },
    },
  },
});
