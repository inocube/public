# T-001: Rebuild the site in Astro with the new Slovak copy

- Status: ready (contact details pending, see Open questions)
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
2. Owner: keep the name "Inocube" with the tagline "Innovation inside the Cube" anywhere, or drop the tagline?

## Implementation notes
(implementer)

## Architect review
(architect)
