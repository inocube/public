# Status

Last updated: 2026-10-08

## Live

- Old single-page site "Innovation inside the Cube" on Netlify. Generic texts, no references, no contact
  details. Contact form goes nowhere (FormSubmit placeholder address).

## In progress

- T-001 Astro rewrite with the new copy and contact details: in review on branch
  `feat/T-001-astro-rewrite` (pages `/`, three package pages, `/referencie/`, `/kontakt/`). Once merged,
  the Astro site replaces the old page. Architect review round 1 is addressed; the owner still has to
  approve the texts listed in the task under "Texts pending owner approval" and answer the owner questions.
  The branch is not on origin yet (push refused with 403), so there is no Netlify deploy preview.

## Known issues

- Contact form on `/kontakt/` is disabled until roadmap phase 3; visitors use the e-mail/phone CTA.
- LinkedIn and owner photo are not on the site yet (not provided).
- The local parent folder `FE\` contains an empty `.git` directory that is not part of this repo; it can be
  deleted.
