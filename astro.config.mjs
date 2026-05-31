import { defineConfig } from 'astro/config';

// Apex custom domain (niftrox.com) serves from root, so no `base` is needed.
export default defineConfig({
  site: 'https://niftrox.com',
});
