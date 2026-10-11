import { defineConfig } from 'astro/config';

// Apex custom domain (niftrox.com) serves from root, so no `base` is needed.
export default defineConfig({
  site: 'https://niftrox.com',
  // Astro 7's default ('jsx') strips the whitespace between inline elements, which shifts the layout.
  compressHTML: true,
  vite: {
    build: {
      // Astro builds for 'esnext', so Lightning CSS would drop -webkit-backdrop-filter and rewrite
      // media queries into range syntax, which Safari before 16.4 ignores.
      cssTarget: ['chrome107', 'edge107', 'firefox104', 'safari16'],
    },
  },
});
