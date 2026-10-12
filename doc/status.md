# Status

Last updated: 2026-10-11

## Live

- Astro site from T-001 (merged to `main` in PR #2): `/`, three package pages, `/referencie/`, `/kontakt/`.
  Contact form on `/kontakt/` is still disabled on `main`; visitors use the e-mail/phone CTA.

## In progress

- T-002 contact form connected to `POST /leads`: in review on branch `feat/T-002-contact-form-api`.
  Backend T-004 (CORS for `inocube.sk`) is deployed and form texts are approved (2026-10-12). Needs the
  Netlify variable `PUBLIC_API_BASE_URL`, meant for the Production context only.

## Known issues

- Contact form has only a one-line GDPR notice (approved); a privacy page is roadmap phase 2.
- Texts listed in T-001 under "Texts pending owner approval" are still pending.
- LinkedIn and owner photo are not on the site yet (not provided).
- The local parent folder `FE\` contains an empty `.git` directory that is not part of this repo; it can be
  deleted.
