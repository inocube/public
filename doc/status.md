# Status

Last updated: 2026-10-12

## Live

- Astro site from T-001 (merged to `main` in PR #2): `/`, three package pages, `/referencie/`, `/kontakt/`.
- T-002 (merged in PR #3): the contact form on `/kontakt/` posts to `POST /leads` (backend T-004); it
  renders only where the Netlify variable `PUBLIC_API_BASE_URL` is set (Production context).

## In progress

- T-003 privacy policy `/ochrana-osobnych-udajov/` and imprint `/impresum/`, linked from the footer and the
  form notice: in review on branch `feat/T-003-legal-pages`. Texts await owner approval
  (`doc/content/web-copy-sk.md`, „Právne stránky“); one placeholder left (Netlify log retention).

## Known issues

- Texts listed in T-001 under "Texts pending owner approval" are still pending.
- LinkedIn and owner photo are not on the site yet (not provided).
- The local parent folder `FE\` contains an empty `.git` directory that is not part of this repo; it can be
  deleted.
