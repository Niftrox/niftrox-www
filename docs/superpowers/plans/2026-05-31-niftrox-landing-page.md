# niftrox.com Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a single-page, fully-responsive, animated pre-launch landing page for ChangeOps at niftrox.com, built with Astro and deployed to GitHub Pages.

**Architecture:** One Astro static site. The page is composed of section components (`Hero`, `UseCases`, `HowItWorks`, `Delivery`, `UnderTheHood`, `Roadmap`, `SiteFooter`) rendered into a `BaseLayout`. Visual design is the approved "Incident Console" direction. The two approved mockups — `full-page-v5.html` (desktop) and `mobile-v1.html` (mobile) — are the canonical reference; the build **merges them into one responsive page** (CSS media queries at ~768px), it does not maintain two pages. Animation is plain JS (canvas correlation network + IntersectionObserver scroll-reveal); everything honors `prefers-reduced-motion`.

**Tech Stack:** Astro (static), `@fontsource/inter` + `@fontsource/jetbrains-mono`, vanilla CSS (custom properties) + vanilla JS, GitHub Pages + GitHub Actions (`withastro/action`).

**Reference mockups (source of truth for markup/CSS/animation):**
- Desktop: `/Users/pouyan/Desktop/Personal-Project/.superpowers/brainstorm/92778-1780233585/content/full-page-v5.html`
- Mobile: `/Users/pouyan/Desktop/Personal-Project/.superpowers/brainstorm/92778-1780233585/content/mobile-v1.html`

**Verification model:** This is a static animated site, so verification per task = (a) `npm run build` succeeds, and/or (b) `npm run dev` renders the section correctly in a browser at both desktop (≥1024px) and mobile (~390px) widths, and reduced-motion behaves. There is no unit-test suite; visual + build verification is the gate. A final Lighthouse/a11y pass is the acceptance test.

**Git note:** Per root CLAUDE.md, commits/push/DNS happen only when the user explicitly asks. Build locally first; commit steps below are prepared but executed only on the user's go. Conventional commits; **no AI/Claude attribution anywhere**.

---

### Task 0: Scaffold the Astro project

**Files:**
- Create: `niftrox-www/package.json`, `astro.config.mjs`, `tsconfig.json`, `src/`, `public/`

- [ ] **Step 1:** From `niftrox-www/`, scaffold a minimal Astro project (non-interactive), keeping the existing `docs/` folder:
```bash
cd /Users/pouyan/Desktop/Personal-Project/niftrox-www
npm create astro@latest . -- --template minimal --no-install --no-git --yes
```
- [ ] **Step 2:** Install deps + fonts (project-local `node_modules`, nothing global):
```bash
npm install
npm install @fontsource/inter @fontsource/jetbrains-mono
```
- [ ] **Step 3:** Configure `astro.config.mjs` for a custom-domain GitHub Pages site (apex domain → root base, static output):
```js
import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://niftrox.com',
  // apex custom domain serves from root, so no `base` needed
});
```
- [ ] **Step 4:** Verify the scaffold builds:
```bash
npm run build
```
Expected: build completes, `dist/` produced.

- [ ] **Step 5 (commit — on user go):** `chore: scaffold astro project for niftrox.com landing page`

---

### Task 1: Design tokens + global styles

**Files:**
- Create: `src/styles/global.css`

- [ ] **Step 1:** Create `src/styles/global.css` with: font imports (`@fontsource/inter` weights 400–900, `@fontsource/jetbrains-mono` 400–600), a `:root` block of CSS custom properties for the palette from the spec §3 (`--bg`, `--bg-2`, `--accent #35e0c8`, `--blue #3880ff`, `--indigo #6366f1`, `--med #f5b14c`, `--low #8a98b4`, `--text`, `--muted`, etc.), CSS reset (`*{box-sizing;margin;padding}`), base `body` (Inter, `--bg`, `--text`), and a global `@media (prefers-reduced-motion: reduce){ *{animation:none!important; transition:none!important} }`.
- [ ] **Step 2:** Port the shared keyframes used across sections from the mockups (aurora `blob*`/`ambdrift*`, `sweep`, `pulse`, `shimmer`, `spin`, `corepulse`, `ringexp`, `chipin`, `fill*`, `travel`/`vtravel`, `footline`, `blip`, `wheel`) into `global.css` so components reuse them.
- [ ] **Step 3:** Verify by importing `global.css` in a throwaway page and `npm run dev`; confirm fonts load (self-hosted, no Google CDN request in Network tab).
- [ ] **Step 4 (commit — on user go):** `style: add design tokens, fonts, and shared keyframes`

---

### Task 2: Base layout + page shell + meta

**Files:**
- Create: `src/layouts/BaseLayout.astro`, `src/pages/index.astro`

- [ ] **Step 1:** `BaseLayout.astro`: `<html lang="en">`, `<head>` with charset, viewport, title `ChangeOps — find the change that broke production`, description, canonical, **OpenGraph + Twitter card** tags (title/description/image `/og.png`/url), favicon links, theme-color `#070b14`; import `global.css`; `<body>` with a `<slot/>`. Use semantic `<main>` wrapper.
- [ ] **Step 2:** `index.astro`: import `BaseLayout` and the seven section components (added in later tasks); render them in order: Hero → UseCases → HowItWorks → Delivery → UnderTheHood → Roadmap → SiteFooter. (Stub imports/components as empty for now so it builds.)
- [ ] **Step 3:** `npm run build` succeeds; `npm run dev` shows an empty themed page.
- [ ] **Step 4 (commit — on user go):** `feat: add base layout, page shell, and meta tags`

---

### Task 3: Hero — markup + styles (static)

**Files:**
- Create: `src/components/Hero.astro`

- [ ] **Step 1:** Port hero markup + CSS from `full-page-v5.html` `.hero-wrap`/`.fg` (nav with brand + `LAUNCHING 2027` pill; eyebrow; headline; subhead; trajectory chips; the 3-row ranked scorecard incl. the AKS-audit MED row; `// concept` tag; scroll cue). Scope styles to the component (`<style>` in the `.astro` file). Mark the background animation containers `aria-hidden="true"`.
- [ ] **Step 2:** Add responsive CSS: 2-col grid (text/scorecard) ≥768px → single column stacked <768px (port the stacking from `mobile-v1.html`); headline `clamp()` so it scales.
- [ ] **Step 3:** `npm run dev`; verify hero renders correctly at 1280px and 390px (text above scorecard on mobile). Background is static for now.
- [ ] **Step 4 (commit — on user go):** `feat: add hero section (responsive, static)`

---

### Task 4: Hero — background animation island

**Files:**
- Create: `src/components/HeroBackground.astro` (or inline `<script>` in Hero)

- [ ] **Step 1:** Add the layered background DOM (aurora blobs, masked grid, `<canvas id="net">`, light-sweep, cursor `#glow`, vignette), all `aria-hidden`.
- [ ] **Step 2:** Port the canvas JS from `full-page-v5.html` (correlation network: nodes + distance-faded links + evaluation pulse-waves + streak particles; cursor-follow glow). Wrap in a guard: read `prefers-reduced-motion`; if reduced, draw one static frame and skip intervals/RAF loop. Reduce node count on small viewports (port `mobile-v1.html`'s lighter seed).
- [ ] **Step 3:** `npm run dev`; verify the network animates on desktop, cursor glow follows pointer, and that toggling OS "reduce motion" freezes it. Confirm no layout shift.
- [ ] **Step 4 (commit — on user go):** `feat: add animated hero background (reduced-motion safe)`

---

### Task 5: Use-cases band

**Files:**
- Create: `src/components/UseCases.astro`

- [ ] **Step 1:** Port the 3 use-case items (triage / evidence packs / postmortems) with inline SVG icons + the ambient drifting glow. 3-col ≥768px → single column <768px.
- [ ] **Step 2:** `npm run dev`; verify layout + glow at both widths.
- [ ] **Step 3 (commit — on user go):** `feat: add use-cases section`

---

### Task 6: How-it-works pipeline (responsive horizontal↔vertical)

**Files:**
- Create: `src/components/HowItWorks.astro`

- [ ] **Step 1:** Port the 4 stages (Connect/cloud, Collect/chips, Evaluate/engine, Rank/evidence-pack) with their per-stage animations and roadmap notes ("Azure now · AWS & GCP next", "+ AI summary later").
- [ ] **Step 2:** Implement the responsive switch: **horizontal** pipeline with `.conn` connectors + rightward packets ≥768px (from `full-page-v5.html`); **vertical** stack with `.vconn` + downward packets <768px (from `mobile-v1.html`). Use CSS to show/hide the correct connector orientation per breakpoint (single markup, media-query-driven), or render both connector styles and toggle via media query.
- [ ] **Step 3:** `npm run dev`; verify horizontal at 1280px and vertical at 390px; packets travel correctly in both; stage animations loop.
- [ ] **Step 4 (commit — on user go):** `feat: add animated how-it-works pipeline (responsive)`

---

### Task 7: Delivery fan-out + real logos

**Files:**
- Create: `src/components/Delivery.astro`
- Create: `public/logos/{slack,teams,jira}.svg`

- [ ] **Step 1:** Add official Slack, Microsoft Teams, and Jira SVG logos to `public/logos/` (use brandfetch/official press-kit marks). Keep PDF/CSV as an icon/glyph.
- [ ] **Step 2:** Port the delivery section: evidence-pack **hub** → branches/spine → destination chips. Desktop = hub-left + vertical spine + branched chips on the right (from v5); mobile = hub-top + spine + 2-up chip grid (from mobile-v1). Slack/Teams/Jira/PDF animate "delivered ✓"; incident.io + PagerDuty dimmed "soon".
- [ ] **Step 3:** `npm run dev`; verify logos render crisply, packets/arrival pulses loop, responsive at both widths.
- [ ] **Step 4 (commit — on user go):** `feat: add delivery fan-out with integration logos`

---

### Task 8: Under-the-hood credibility section

**Files:**
- Create: `src/components/UnderTheHood.astro`

- [ ] **Step 1:** Port the 4 credibility cards (Deterministic / Honest / Traceable / Isolated) with exact spec-accurate copy. 4-col ≥980px → 2-col tablet → 1-col mobile. Hover lift.
- [ ] **Step 2:** `npm run dev`; verify grid reflow + hover.
- [ ] **Step 3 (commit — on user go):** `feat: add under-the-hood section`

---

### Task 9: Roadmap section

**Files:**
- Create: `src/components/Roadmap.astro`

- [ ] **Step 1:** Port NOW/NEXT/LATER cards + the animated connector (horizontal with traveling packet ≥768px; vertical `.vconn` <768px). Card hover lift.
- [ ] **Step 2:** `npm run dev`; verify reflow + connector animation at both widths.
- [ ] **Step 3 (commit — on user go):** `feat: add roadmap section`

---

### Task 10: Footer

**Files:**
- Create: `src/components/SiteFooter.astro`

- [ ] **Step 1:** Port footer: brand + "launching 2027" + badges (SOC 2 · GDPR · Read-only · Workload Identity) + animated accent line. Use `<footer>` landmark.
- [ ] **Step 2:** `npm run dev`; verify stack on mobile, accent line animates.
- [ ] **Step 3 (commit — on user go):** `feat: add site footer`

---

### Task 11: Site-wide scroll-reveal

**Files:**
- Create: `src/scripts/reveal.js` (or inline in BaseLayout)

- [ ] **Step 1:** Port the IntersectionObserver reveal: hide target elements (`.uc`, pipeline, `.deliver`, `.ecard`, `.rcard`, section heads, footer bits) with opacity/translateY + transition; reveal on intersect with a small stagger. Guard on `prefers-reduced-motion` (skip hiding entirely if reduced).
- [ ] **Step 2:** `npm run dev`; scroll desktop + mobile; verify sections rise in; verify reduced-motion shows everything immediately (no hidden content).
- [ ] **Step 3 (commit — on user go):** `feat: add scroll-reveal animations (reduced-motion safe)`

---

### Task 12: Responsive + cross-browser pass

- [ ] **Step 1:** Walk the full page at 390 / 768 / 1024 / 1440px. Fix any overflow, cramped grids, or font scaling issues. Confirm no horizontal scrollbar at any width.
- [ ] **Step 2:** Verify in Chromium + WebKit (Safari) — check `backdrop-filter`, `mask-image` (`-webkit-` prefixes present), `background-clip:text` gradients.
- [ ] **Step 3 (commit — on user go):** `fix: responsive and cross-browser polish`

---

### Task 13: Assets — favicon, OG image, CNAME

**Files:**
- Create: `public/favicon.svg`, `public/og.png`, `public/CNAME`

- [ ] **Step 1:** Favicon: a small teal `niftrox/` or correlation-node mark as `favicon.svg`.
- [ ] **Step 2:** OG share image (1200×630) reflecting the hero (dark, headline, scorecard) → `public/og.png`. Referenced by BaseLayout meta.
- [ ] **Step 3:** `public/CNAME` containing exactly `niftrox.com` (GitHub Pages custom domain).
- [ ] **Step 4:** `npm run build`; confirm assets land in `dist/`.
- [ ] **Step 5 (commit — on user go):** `chore: add favicon, OG image, and CNAME`

---

### Task 14: Accessibility + performance pass

- [ ] **Step 1:** Audit semantics: one `<h1>` (hero headline), logical heading order, landmarks (`header`/`main`/`footer`), `aria-hidden` on all decorative animation layers, `alt` on logos. Add `:focus-visible` styles. Verify text contrast ≥ AA against the dark bg.
- [ ] **Step 2:** Run Lighthouse (or `npx @lhci/cli autorun` / Chrome DevTools) on the built site; target Performance/Accessibility/Best-Practices/SEO all ≥ 90. Fix regressions (e.g., font preload, image sizing, canvas perf — pause RAF when hero offscreen).
- [ ] **Step 3 (commit — on user go):** `perf: accessibility and performance pass`

---

### Task 15: GitHub Pages deployment workflow (prepared; deploy on user go)

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1:** Add a workflow using the official Astro path: on push to `main`, `withastro/action` (builds) → `actions/deploy-pages`, with `permissions: { contents: read, pages: write, id-token: write }` and a `github-pages` environment.
- [ ] **Step 2 (on user go):** Create the public repo `Niftrox/niftrox-www`, push, enable Pages (source: GitHub Actions), set the custom domain to `niftrox.com`, and confirm the workflow deploys `dist/`.
- [ ] **Step 3 (on user go):** Provide the exact DNS records to add at the registrar (apex `A`/`AAAA` → GitHub Pages IPs, `www` `CNAME` → `niftrox.github.io`), then enable "Enforce HTTPS" once the cert provisions.
- [ ] **Step 4 (commit — on user go):** `ci: add github pages deploy workflow`

---

### Task 16: Final verification & handoff

- [ ] **Step 1:** Fresh `npm run build` + preview (`npm run preview`); click through the whole page at desktop and mobile widths; confirm: no inputs/pricing/demo anywhere, copy matches spec, all animations + reduced-motion behave, integrations honesty (soon tags) intact, SOC 2/GDPR badges present.
- [ ] **Step 2:** Add a concise `README.md` (what it is, `npm run dev/build`, deploy notes) following the repo's minimal-README norm.
- [ ] **Step 3:** Show the user the running site; get sign-off before any push/DNS.

---

## Self-Review

**Spec coverage:** Hero+scorecard (T3/T4) ✓ · use-cases (T5) ✓ · pipeline (T6) ✓ · delivery+logos+honesty (T7) ✓ · under-the-hood credibility (T8) ✓ · roadmap/trajectory (T6 notes + T9) ✓ · footer+compliance badges (T10) ✓ · motion system (T4/T6/T7/T9/T11) ✓ · reduced-motion (T1/T4/T11/T14) ✓ · responsive mobile-first (T3/T6/T7/T12) ✓ · fonts self-hosted (T1) ✓ · Astro+Pages+domain (T0/T15) ✓ · a11y/perf (T14) ✓ · no inputs/pricing/demo (T16 check) ✓ · honest SOC2/GDPR + soon tags (T7/T10/T16) ✓.

**Placeholder scan:** No "TBD"/"add error handling"-style gaps; each task names exact files and the canonical mockup region to port. (OG art direction is an asset-creation step in T13, not a logic placeholder.)

**Consistency:** Component names (`Hero`, `HeroBackground`, `UseCases`, `HowItWorks`, `Delivery`, `UnderTheHood`, `Roadmap`, `SiteFooter`) used consistently across T2 and their tasks. CSS token + keyframe names defined in T1 and reused throughout.
