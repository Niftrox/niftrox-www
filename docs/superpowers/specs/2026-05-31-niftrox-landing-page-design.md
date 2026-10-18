# Design Spec — niftrox.com pre-launch landing page

**Date:** 2026-05-31 (visual direction locked); copy and structure revised 2026-10-18 to the v3 product definition
**Status:** Approved
**Product:** ChangeOps (by Niftrox) — the change-evidence ledger for Azure estates
**Domain:** niftrox.com (public)
**Repo:** `Niftrox/niftrox-www`

---

## 1. Purpose

A single-page, **pre-launch** marketing site for ChangeOps. The product is **in build**; design partners connect in 2027 and paid pilots start in 2028. The page communicates, at a high level, what ChangeOps is and makes a credible impression on two readers: the platform lead who owns an Azure estate and the security or compliance owner who answers auditors. It is **information + motion only**.

### Goals
- Communicate the product thesis: *Azure forgets what changed after 14 days; ChangeOps keeps every change, with who made it and the before and after, for two years, sealed daily, and serves it to engineers, AI assistants over MCP, and auditors.*
- Make a skeptical **platform/SRE engineer** and a **compliance owner** believe this is evidence, not a dashboard.
- Convey the real phases (connect and remember → evidence → compliance tools → enterprise extras when funded) and the three uses (the "nobody changed anything" incident, the period report and sealed packs, the customer's own AI asking over MCP).
- Be **fully responsive** (mobile-first) with rich-but-tasteful animation throughout.

### Non-goals (hard constraints)
- **No inputs / forms** of any kind (no email capture, no waitlist field). A plain `mailto:` link to amir@niftrox.com is the only contact.
- **No pricing**, **no demo**, **no "request access" / "see how it works"** — nothing implying a usable product exists today.
- No login, no app, no backend. Static only.
- Do not overclaim: every feature, source, client and phase on the page comes from the founder manual and MVP specification in `niftrox-docs/`; not-yet-built items are marked "later".

---

## 2. Positioning & messaging

Sourced from `niftrox-docs/changeops-founder-manual-v3.md` (§1 product, §2 buyers, §3 features, §4 stable core, §6 how it works, §10 roadmap, §12 SOC 2) and `changeops-mvp-spec-v3.md` (§8 MCP, §11.17 verify page, §13 security). Authority order per root CLAUDE.md: shipped code → MVP spec / founder manual. Phase years come from the COPS Jira releases (Phase 1 to Nov 2027, Phase 2 to Nov 2028, Phase 3 to Aug 2029, Phase 4 conditional).

- **Positioning line:** The change-evidence ledger for Azure estates: what changed, by whom, with the difference, sealed, for two years.
- **Headline:** "Azure forgets what changed after 14 days. ChangeOps keeps it for two years."
- **Eyebrow:** "The change-evidence ledger for Azure estates"
- **Status pill:** "IN BUILD · DESIGN PARTNERS 2027"
- **Sources shown:** Control plane · Entra ID · Kubernetes · Key Vault · SQL (later).
- **Credibility signals:** the daily Merkle root chained and anchored with an RFC 3161 timestamp; packs that verify offline without an account; admin consent + Reader role + federated workload identity with no secret held; one record per change with actors named after the identity is gone; no model of ChangeOps's own, so the same question returns the same answer; row-level security per tenant; every human and agent call audited.

### Honesty rules (apply in copy)
- The product ships **no tuned ranking scores, confidence labels or summaries of its own**. It returns a deterministic "check this first" order with the reasons shown, one-line difference summaries and churn counts; the customer's agent reasons (manual §1 scope-creep box, §3 B2 and B6, §16 rules 5 and 6).
- **Never sell engineer hours saved**; the page sells the two-year memory, the "nobody changed anything" incident and audit evidence (manual §7).
- **Interfaces shown as delivered:** MCP clients (Claude, ChatGPT, GitHub Copilot, Copilot Studio, Azure SRE Agent), the web app, the REST API and signed webhooks, share links, evidence packs and the period report. **Later (dashed):** evidence delivery into the customer's SIEM and into Vanta or Drata by the customer's own script. No chat, ticketing or incident-tool integrations exist or are planned; share links cover them (manual §3 "not built").
- **Other clouds:** validated in the design, built only when a customer funds them. Never shown as "next".
- **Compliance badges** state the posture, not a certification: "SOC 2 controls from day one", "UK GDPR · EU hosted · DPA", "Read-only · no credentials held", "Sealed daily · RFC 3161".
- The product UI shown (the change record card) is labelled **`// concept`** so it reads as an illustration, not a live screenshot.

---

## 3. Visual direction

**"Evidence Console"** — dark, technical, engineered. Dark navy + teal/cyan. Reference feel: Linear / Sentry / Vercel.

- **Palette:** background `#070b14`–`#0a0f1e` (near-black navy); primary accent teal `#35e0c8`; secondary blue `#3880ff` / indigo `#6366f1`; amber `#f5b14c` and slate `#8a98b4` for secondary states; body text `#e8e8ea` / muted `#9aa3b2`. Diff lines in the record card: removed on a faint rose tint, added on a faint teal tint.
- **Type:** `Inter` (headings/body) + `JetBrains Mono` (eyebrows, labels, metadata, technical chips). **Self-hosted** via `@fontsource` (performance + avoids Google Fonts CDN, which matters for the EU/GDPR audience).
- **Tone:** precise engineering vocabulary over marketing fluff.

---

## 4. Page structure (single page, top → bottom)

1. **Hero** — nav (brand `niftrox/changeops` + status pill); eyebrow; headline; subhead; source chips; **change record card** (concept): a dated network security group rule change by `sp-terraform-prod` (automation identity), two properties as before/after diff lines, "Activity Log + Resource Graph · one record", the next day's "day root anchored · RFC 3161" (a same-day record would still be anchor-pending, spec §8.6); beneath it an MCP strip (Claude → `query_changes` over a past window → 11 changes, the same answer for the same ledger state); scroll cue → "HOW IT WORKS".
2. **Use-cases band** — the "nobody changed anything" incident · every production change last quarter, by whom · your own AI asks the ledger.
3. **How it works** — animated pipeline: **01 Connect** (approve one app, assign Reader; read-only forever) → **02 Collect** (Activity Log, Resource Graph changes, Entra ID audit, AKS and Key Vault audit; raw logs read, kept only inside frozen packs) → **03 Record** (two source chips merge into one record; churn folded) → **04 Seal** (a chain of day blocks, today's stamped; RFC 3161 anchor, verify offline).
4. **Interfaces fan-out** — the ledger → MCP clients · web app · REST API and signed webhooks · share links · evidence packs and the period report (delivered) + SIEM and compliance platform (later).
5. **Under the hood** — 6 credibility cards: Sealed, Read-only, Deterministic, Named, Isolated, Audited.
6. **Roadmap** — NOW to late 2027 (connect, collect, remember) → NEXT 2028 (evidence) → THEN 2029 (into your compliance tools) → LATER when funded (enterprise extras); footnote that dates are targets and the stable core stays fixed.
7. **Footer** — brand + "in build"; the four posture badges; copyright; `mailto:` for design-partner conversations.

---

## 5. Motion system

Tasteful, "alive but serious." All animation is ambient/illustrative — never blocks reading.

- **Page background (canvas):** drifting ambient network (nodes + distance-faded links) with periodic pulse-waves; multi-blob drifting **aurora**; faint masked grid; **cursor-follow glow**; vignette.
- **Hero record card:** gentle float; the seal dot blinks; a packet travels the MCP strip's connector.
- **Pipeline:** packets travel along connectors; per-stage micro-animation (cloud signal rings; streaming source chips; two source chips merging into one record; the chain's newest block stamped).
- **Interfaces:** hub emit pulse → packets down branches → destination "✓" arrival flash.
- **Lower sections:** **scroll-reveal** (fade + rise with stagger via IntersectionObserver); card hover lifts; animated roadmap connector; footer accent line.
- **Accessibility:** everything honors `prefers-reduced-motion: reduce` (freeze animations; reveal content immediately). Mobile uses a lighter particle count.

---

## 6. Responsive behavior (mobile-first, single codebase)

One page; layout adapts by viewport width. Desktop browsers always get the wide layout; phones get the stacked layout. Breakpoint ~768px (tablet-and-up = wide).

- **Hero:** 2-col (text / record card) on wide → stacked on mobile; headline scales down.
- **Pipeline:** horizontal 4-stage on wide → **vertical** stack with downward packets on mobile.
- **Interfaces:** hub-left + fan-out-right on wide → hub-top + spine + stacked chips on mobile.
- **Use-cases / Under the hood / Roadmap:** multi-column → single column; roadmap is 4 → 2 → 1 columns and its connector goes vertical.
- Animations preserved in both; lighter on small screens.

---

## 7. Tech & deployment

- **Framework:** Astro (static output). Sections as `.astro` components; one global stylesheet (CSS custom properties for the palette); animation JS as small scripts (canvas network, IntersectionObserver reveal).
- **Fonts:** `@fontsource/inter` + `@fontsource/jetbrains-mono` (self-hosted).
- **Assets:** favicon and PWA icons; OpenGraph/Twitter share image rendered from the hero; `niftrox.com` `CNAME` file. No third-party logos.
- **Hosting:** **GitHub Pages**, public, served from `Niftrox/niftrox-www` via GitHub Actions (`withastro/action` → `actions/deploy-pages`).
- **Domain:** `niftrox.com` custom domain + GitHub-managed HTTPS. DNS: apex `A`/`AAAA` → GitHub Pages IPs, `www` `CNAME` → `<org>.github.io`.
- **Conventions (root CLAUDE.md):** conventional commits; no secrets committed.

---

## 8. Accessibility & quality bar

- Semantic landmarks (`header`/`main`/`section`/`footer`), heading hierarchy, `alt`/`aria` on meaningful graphics, decorative canvas marked `aria-hidden`.
- Color contrast AA for text; focus-visible states.
- `prefers-reduced-motion` fully respected.
- Performance: static HTML, minimal JS, self-hosted fonts, lazy/efficient canvas (cap node count; pause when hidden). Target fast LCP and good Lighthouse scores.

---

## 9. Out of scope (now)

- Any backend, form handling, analytics with PII, cookies/consent banner (no tracking by default).
- Blog, docs, multi-page nav, the pricing page (a Phase 2 launch artefact per manual §10).
- The actual ChangeOps product UI.
