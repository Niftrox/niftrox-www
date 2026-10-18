# niftrox-www

Pre-launch landing page for **ChangeOps** (by Niftrox), the change-evidence ledger for Azure estates — served at **niftrox.com**.
Single-page, fully responsive, animated. Astro static site, no backend, no inputs.

The copy follows the founder manual and MVP specification in `niftrox-docs/` (product, features, phases).

## Develop

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # static output -> dist/
npm run preview    # serve the built dist/
```

## Structure

- `src/pages/index.astro` — composes the section components
- `src/layouts/BaseLayout.astro` — `<head>`, meta/OG, fonts, scroll-reveal
- `src/components/` — `Hero`, `UseCases`, `HowItWorks`, `Interfaces`, `UnderTheHood`, `Roadmap`, `SiteFooter`
- `src/styles/global.css` — design tokens, shared keyframes, reduced-motion
- `public/` — favicons and PWA icons, `manifest.webmanifest`, `sw.js`, `og.png`, `logo.png`, `CNAME`

Fonts are self-hosted (`@fontsource`). All motion respects `prefers-reduced-motion`.

## Deploy

Push to `main` → `.github/workflows/deploy.yml` builds with `withastro/action` and
deploys to GitHub Pages. Custom domain `niftrox.com` is set via `public/CNAME`
(apex `A`/`AAAA` + `www` `CNAME` records at the registrar; enable "Enforce HTTPS"
once the certificate provisions).

Design spec and implementation plan live in `docs/superpowers/`.
