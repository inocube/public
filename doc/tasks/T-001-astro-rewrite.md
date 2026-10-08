# T-001: Rebuild the site in Astro with the new Slovak copy

- Status: review
- Roadmap phase: 1
- Branch: feat/T-001-astro-rewrite

## Goal
inocube.sk presents the new positioning, three service packages and four case studies, and drives visitors to
book a free 30-minute consultation. Built in Astro, deployed by Netlify.

## Context
- Copy: `doc/content/web-copy-sk.md` is the only source of text (ADR 0003).
- Why Astro and the conventions: ADR 0001, `AGENTS.md`.
- The current `index.html` / `style.css` define the visual identity (cube logo, colours, Inter font); keep it
  recognisable but you may modernise layout.
- The form is connected to the backend later (roadmap phase 3). Until then it must not pretend to send.

## Scope
1. Initialise Astro (latest stable, TypeScript strict) in the repo root; move old files out (delete after the
   new site reproduces everything worth keeping; images go to `src/assets/` or `public/`).
2. Content collections in `src/content/` for packages and case studies, filled from `doc/content/`.
3. Pages: `/` (hero, three reasons, packages overview, process, case-study teasers, CTA),
   `/sluzby/ai-agent`, `/sluzby/data-reporting`, `/sluzby/aplikacie-na-mieru`, `/referencie` (all four
   studies), `/kontakt`.
4. Layout with header navigation, footer with contact details and company identifiers, mobile menu without a
   framework (small inline script or CSS only).
5. CTA "Dohodnite si 30-minútovú konzultáciu zdarma": `mailto:` link to the owner's e-mail for now.
6. Contact page: contact details and a form UI that is visibly disabled or replaced by the mailto CTA until
   phase 3. Remove FormSubmit.
7. SEO: per-page title/description, Open Graph, `@astrojs/sitemap`, `robots.txt`, `lang="sk"`.
8. Netlify: `netlify.toml` with `npm run build` and `dist` publish dir; Node version pinned.
9. Docs: README commands, `doc/status.md`, `doc/architecture.md` (final page list).

## Acceptance criteria
- [ ] All copy from `doc/content/web-copy-sk.md` appears on the site, nothing invented.
- [ ] `npm run build` passes; Netlify deploy preview works.
- [ ] Lighthouse ≥ 95 (performance, accessibility, best practices, SEO) on `/` mobile.
- [ ] No client-side framework; total JS on `/` under 10 kB.
- [ ] No external tracking; fonts and icons self-hosted or inlined.
- [ ] PR explains Astro choices (content collections, islands, routing) for an Angular developer.

## Out of scope
English version, analytics, cookie banner, form submission to the API, blog.

## Open questions
1. Owner: contact details for the footer and `/kontakt`: e-mail, phone, address, IČO, DIČ, LinkedIn URL,
   owner photo (optional). Use clearly marked placeholders until provided; do not merge with placeholders.
   **Answered (owner, 2026-10-08):** details are in `doc/content/web-copy-sk.md`, section "Kontakt a firemné
   údaje". LinkedIn and photo are not provided yet: leave them out entirely (no placeholders).
2. Owner: keep the name "Inocube" with the tagline "Innovation inside the Cube" anywhere, or drop the tagline?
   **Answered (owner, 2026-10-08):** keep the tagline "Innovation inside the Cube".

## Implementation notes
- Branch: `feat/T-001-astro-rewrite`. PR:
  https://github.com/inocube/public/compare/main...feat/T-001-astro-rewrite?expand=1 (to be opened by the
  owner; the Netlify deploy preview appears on the PR).
- Stack: Astro 7.3.7, TypeScript strict, `@astrojs/sitemap`, Inter from `@fontsource-variable/inter` via
  the Astro Fonts API (`local` provider). Node 22.12.0 pinned in `netlify.toml` and `.nvmrc`.
- Verified locally: `npm run build` (astro check 0 errors/0 warnings, 7 pages); `npm run preview` served
  all routes (200, unknown route 404). Lighthouse 12.8.2 mobile on the local preview: `/` 99/100/100/100;
  other pages 99–100 perf, 100 in the rest. JS on every page: one inline script of 717 bytes. No external
  requests. Netlify deploy preview not checked (no PR yet).
- Deviations and why:
  - Short UI labels (navigation, "Služby", form notice, 404 text, accessibility labels) are not in the
    approved copy. They are kept in `src/content/site/ui.yaml` / `home.yaml` and listed in
    `doc/content/web-copy-sk.md` under "Navigácia a krátke texty rozhrania (na schválenie)".
  - Home "process" shows the AI-agent package steps (the only numbered process in the copy), labelled
    "Príklad: AI agent pre vašu firmu".
  - Case study 4: the copy's instruction that the figures are about the platform is shown as a note
    ("Tieto čísla sú o platforme, nie o podiele Inocube."); the "na webe ich tak treba aj prezentovať"
    half is an instruction, not site text.
  - Header CTA omitted (the CTA text is too long for the header); the CTA is in the hero, on every package
    page, at the bottom of pages and on `/kontakt/`.
  - The hero image `src/assets/brand/cube.png` is cut from the light logo (`logo-light.png`, formerly
    `Assets/2.png`) with the white background made transparent. Header/footer keep the old site's cube
    mark as inline SVG.
  - The form on `/kontakt/` is a disabled fieldset without `action`; FormSubmit is removed.

## Architect review
(architect)
