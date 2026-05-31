# Design Spec — niftrox.com pre-launch landing page

**Date:** 2026-05-31
**Status:** Approved (design locked via visual brainstorming)
**Product:** ChangeOps (by Niftrox) — Azure-first incident investigation platform
**Domain:** niftrox.com (public)
**Repo (proposed):** `Niftrox/niftrox-www`

---

## 1. Purpose

A single-page, **pre-launch** marketing site for ChangeOps. The product is **not yet available** (target launch **2027**). The page exists to communicate — at a high level — what ChangeOps will be and to make a sophisticated, credible impression on a technical audience. It is **information + motion only**.

### Goals
- Communicate the product thesis at a high level: *find the change that broke production, fast.*
- Make a skeptical **platform/SRE engineer** believe this is a serious engine, not a trivial SaaS.
- Convey trajectory (Azure-first → multi-cloud → AI) and use cases (incident triage, evidence packs, postmortems/audits).
- Be **fully responsive** (mobile-first) with rich-but-tasteful animation throughout.

### Non-goals (hard constraints)
- **No inputs / forms** of any kind (no email capture, no waitlist field).
- **No pricing**, **no demo**, **no "request access" / "see how it works"** — nothing implying a usable product exists today.
- No login, no app, no backend. Static only.
- Do not overclaim: integrations and compliance reflect the **launch state**, with not-yet-built items clearly marked.

---

## 2. Positioning & messaging

Sourced from `niftrox-docs/changeops-mvp-spec-v2.pdf` (MVP spec v2). Authority order per root CLAUDE.md: shipped code → MVP spec → blueprint.

- **One-liner:** ChangeOps turns Azure's scattered change history into a ranked, evidence-backed shortlist — so on-call goes from 40 minutes of portal-hopping to under five.
- **Headline:** "Find the change that broke production. Fast."
- **Eyebrow:** "Azure-first incident investigation"
- **Trajectory (honest roadmap):** Azure today · AWS & GCP next · AI summaries later.
  - Multi-cloud: spec says the evidence model is cloud-agnostic by design; AWS/GCP are Phase 2.
  - AI: spec §5 — Phase 2 AI reads the *trusted* evidence pack to summarize/suggest; it sits **on top of** the deterministic engine, never replacing it.
- **Use cases (made explicit):** triage live incidents in minutes · package attributable evidence · power blameless postmortems, compliance audits & vendor escalations.
- **Credibility signals ("real engine"):** deterministic correlation on `correlationId` with bounded-time-window fallback; calibrated/honest confidence (HIGH deterministic, MED heuristic); source-attributed provenance; 0–100 ranked scoring; tenant isolation + workload identity + read-only.

### Honesty rules (apply in copy)
- Integrations delivered today: **Slack, Microsoft Teams, Jira, PDF / JSON-CSV** (in MVP spec). **incident.io** and **PagerDuty** shown dimmed/"soon" — not claimed as built.
- Compliance shown as clean badges **SOC 2 · GDPR** (founder decision: page reflects launch state, not selling yet). Plus **Read-only access · Workload Identity**.
- The product UI shown (ranked scorecard) is labelled **`// concept`** so it reads as an illustration, not a live screenshot.
- AKS-sourced evidence is always labelled **heuristic / MED** — never dressed up as certainty.

---

## 3. Visual direction

**"Incident Console"** — dark, technical, engineered. Matches the brand already established in the MVP spec (dark navy + teal/cyan). Reference feel: Linear / Sentry / Vercel.

- **Palette:** background `#070b14`–`#0a0f1e` (near-black navy); primary accent teal `#35e0c8`; secondary blue `#3880ff` / indigo `#6366f1`; confidence colors HIGH teal, MED amber `#f5b14c`, LOW slate `#8a98b4`; body text `#e8e8ea` / muted `#9aa3b2`.
- **Type:** `Inter` (headings/body) + `JetBrains Mono` (eyebrows, labels, metadata, technical chips). **Self-hosted** via `@fontsource` (performance + avoids Google Fonts CDN, which matters for the EU/GDPR audience).
- **Tone:** precise engineering vocabulary over marketing fluff — that's what reads as "sophisticated."

---

## 4. Page structure (single page, top → bottom)

1. **Hero** — nav (brand `niftrox/changeops` + `LAUNCHING 2027` status pill); eyebrow; headline; subhead; trajectory chips (Azure today / AWS & GCP next / AI later); **ranked evidence scorecard** (concept) showing 3 multi-source suspects:
   - #1 · 92 · HIGH · deterministic — Web app config change (Activity Log ↔ Resource Graph)
   - #2 · 71 · MED · heuristic — AKS node-pool upgrade (**AKS audit log**)
   - #3 · 54 · LOW — NSG rule change (Activity Log)
   - scroll cue → "HOW IT WORKS"
2. **Use-cases band** — triage in minutes · evidence packs · postmortems & audits.
3. **How it works** — animated pipeline: **01 Connect** (Azure now · AWS/GCP next) → **02 Collect** (Activity Log, Resource Graph, AKS audit; deterministic) → **03 Engines evaluate** (+ AI summary later) → **04 Ranked evidence pack** (scorecard).
4. **Delivery fan-out** — evidence pack → Slack · Teams · Jira · PDF/CSV (live) + incident.io · PagerDuty (soon).
5. **Under the hood** — 4 credibility cards: Deterministic (correlationId joins), Honest (calibrated confidence), Traceable (source-attributed), Isolated (tenant-safe, read-only, workload identity).
6. **Roadmap** — NOW (Azure deeply, 2027) → NEXT (AWS & GCP) → LATER (AI on the deterministic core).
7. **Footer** — brand + launch line; badges SOC 2 · GDPR · Read-only · Workload Identity.

---

## 5. Motion system

Tasteful, "alive but serious." All animation is ambient/illustrative — never blocks reading.

- **Hero background (canvas):** drifting correlation network (nodes + distance-faded links) with periodic **evaluation pulse-waves** + occasional streak particles; multi-blob drifting **aurora**; faint masked grid; **light-sweep**; **cursor-follow glow**; vignette.
- **Hero scorecard:** gentle float; HIGH badge pulse; confidence-bar shimmer.
- **Pipeline:** packets travel along connectors; per-stage micro-animation (cloud signal rings; streaming source chips; spinning engine core + orbits; filling score bars).
- **Delivery:** hub emit pulse → packets down branches → destination "delivered ✓" arrival flash.
- **Lower sections:** ambient drifting glows behind use-cases / flow / roadmap; **scroll-reveal** (fade + rise with stagger via IntersectionObserver); card hover lifts; animated roadmap connector; footer accent line.
- **Accessibility:** everything honors `prefers-reduced-motion: reduce` (freeze animations; reveal content immediately). Mobile uses a lighter particle count.

---

## 6. Responsive behavior (mobile-first, single codebase)

One page; layout adapts by viewport width. Desktop browsers always get the wide layout; phones get the stacked layout. Breakpoint ~768px (tablet-and-up = wide).

- **Hero:** 2-col (text / scorecard) on wide → stacked on mobile; headline scales down.
- **Pipeline:** horizontal 4-stage on wide → **vertical** stack with downward packets on mobile.
- **Delivery:** hub-left + fan-out-right on wide → hub-top + spine + chips grid on mobile.
- **Use-cases / Under the hood / Roadmap:** multi-column → single column; roadmap connector goes vertical.
- Animations preserved in both; lighter on small screens.

---

## 7. Tech & deployment

- **Framework:** Astro (static output). Sections as `.astro` components; one global stylesheet (CSS custom properties for the palette); animation JS as small scripts/islands (canvas network, IntersectionObserver reveal).
- **Fonts:** `@fontsource/inter` + `@fontsource/jetbrains-mono` (self-hosted).
- **Assets:** official Slack / Microsoft Teams / Jira SVG logos (replace the placeholder letter-marks); favicon; OpenGraph/Twitter share image; `niftrox.com` `CNAME` file.
- **Hosting:** **GitHub Pages**, public, served from `Niftrox/niftrox-www` via GitHub Actions (`withastro/action` → `actions/deploy-pages`).
- **Domain:** `niftrox.com` custom domain + GitHub-managed HTTPS. DNS: apex `A`/`AAAA` (or `ALIAS`/`ANAME`) → GitHub Pages IPs, `www` `CNAME` → `<org>.github.io`.
- **Conventions (root CLAUDE.md):** conventional commits; **no Claude/AI attribution anywhere**; no secrets committed.

---

## 8. Accessibility & quality bar

- Semantic landmarks (`header`/`main`/`section`/`footer`), heading hierarchy, `alt`/`aria` on meaningful graphics, decorative canvas marked `aria-hidden`.
- Color contrast AA for text; focus-visible states.
- `prefers-reduced-motion` fully respected.
- Performance: static HTML, minimal JS, self-hosted fonts, lazy/efficient canvas (cap node count; pause when offscreen if practical). Target fast LCP and good Lighthouse scores.

---

## 9. Out of scope (now)

- Any backend, form handling, analytics with PII, cookies/consent banner (no tracking by default).
- Blog, docs, multi-page nav.
- The actual ChangeOps product UI.

---

## 10. Open items to confirm before/at build

- Repo name `niftrox-www` (proposed) and that it's a new **public** repo in the Niftrox org.
- Final OG share image art direction.
- Exact DNS provider steps (provided at deploy time).
