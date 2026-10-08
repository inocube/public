# T-001: Rebuild the site in Astro with the new Slovak copy

- Status: changes-requested
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
Verdict: changes-requested

Checked: `npm run build` passes (astro check 0/0/0, 7 pages), `npm audit --omit=dev` 0 vulnerabilities, no
external URLs/trackers/`PUBLIC_*` in `dist/`, one inline script (734 B) on `/`, FormSubmit gone, form has no
`action`, contact data matches the owner-approved values, no LinkedIn/photo. Lighthouse not re-run (not
installed locally); implementer's numbers taken on trust. Code quality is good; the issues are copy governance.

Findings (highest first):
1. Medium, hard rule "text comes from doc/content": visible/indexed texts not in the copy and not in the
   approval list: `src/content/site/ui.yaml:6` (homeLabel), `ui.yaml:28-30` and `ui.yaml:33-34` (meta
   descriptions of /referencie/ and /kontakt/), `home.yaml:4` (home title), `src/pages/sluzby/[slug].astro:23`
   (composed description), `src/content/case-studies/low-code-platforma-solvedio.md:20` (public note derived
   from an editorial instruction). Fix: add every one of them to `doc/content/web-copy-sk.md:124` list so the
   owner approves them explicitly, or drop them.
2. Medium, ADR 0003: `doc/content/web-copy-sk.md:124-136` puts unapproved texts into the file that is by
   definition approved. Merging the PR silently approves them. Fix: owner approves (then remove "(na
   schválenie)" in the same PR) or move the list into the PR/task and keep only approved text in doc/content.
3. Medium, acceptance criterion `T-001-astro-rewrite.md:36` and AGENTS.md workflow step 3: Netlify deploy
   preview not checked (branch not pushed). Fix: push, open PR, verify preview routes, `/kontakt` without
   slash redirects, and 404 page; then tick the boxes.
4. Low: acceptance criteria checkboxes (`T-001-astro-rewrite.md:34-40`) are all unticked although most are
   verified. Fix: tick what is verified, leave the preview open until checked.
5. Low: `src/assets/brand/logo-combined.png` and `logo-glow.png` are unused (moved from `Assets/`, never
   imported). Fix: delete them or state why they are kept.
6. Low: `src/content/packages/data-reporting.md:20` links only the onboarding study, but the reference text
   also names "SQL riešenia pre bankové interné aplikácie" (closest match: `system-spravy-obsahu-banka`).
   Fix: add it or confirm with the owner.
7. Low, UX: `src/pages/kontakt.astro:17` repeats the CTA text as lead directly above the same CTA button
   (line 27). Fix: drop the lead or the duplicate (owner preference).

Questions for the owner:
- Approve the UI labels and the texts in finding 1 (including the Solvedio note and "Klienti sú
  anonymizovaní podľa odvetvia a krajiny." shown publicly as a lead on `/` and `/referencie/`)?
- `web-copy-sk.md:35` "stavebnú sporiteľňu v ČR" is more specific than case study 1 ("finančná inštitúcia v
  ČR"); is that level of identification intended?
- Canonical host is `https://inocube.sk` (no www): matches the Netlify primary domain?
