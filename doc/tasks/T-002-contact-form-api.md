# T-002: Connect the contact form to the leads API

- Status: review
- Roadmap phase: 2b (backend counterpart: `inocube/landing-backend` T-004)
- Branch: feat/T-002-contact-form-api

## Goal
The form on `/kontakt` sends the enquiry to `POST /leads` and tells the visitor clearly whether it worked.

## Context
- The form is rendered but disabled (`src/pages/kontakt.astro`).
- Backend contract (T-004): `POST {PUBLIC_API_BASE_URL}/leads`, JSON `{name, email, message, website}` →
  `201 {lead_id, status}` | `400 {error, details[{field, message}]}` | `429` | `500`. CORS allows
  `https://inocube.sk` and `https://deploy-preview-<n>--inocube-public.netlify.app` once T-004 is deployed.
- Prod API base URL: `https://i6r0knhf3m.execute-api.eu-central-1.amazonaws.com/Prod` (owner sets it as
  `PUBLIC_API_BASE_URL` in Netlify; not a secret).
- Copy comes from `doc/content/`; new texts need owner approval.

## Scope
1. Enable the form; client-side `fetch` in a small script (no framework), JSON body, `required` + `maxlength`
   matching the API (name 200, message 5000), `type=email`.
2. Honeypot field `website`: visually hidden, `tabindex="-1"`, `autocomplete="off"`, `aria-hidden`.
3. States: sending (button disabled), success (form replaced by a thank-you message), field errors from a 400
   mapped to the inputs, generic error for 429/500/network with the e-mail address as fallback.
4. Works without JavaScript failing loudly: if JS is off, show the e-mail/phone fallback instead of a dead form.
5. Proposed Slovak texts for the new states in `doc/content/web-copy-sk.md`, listed under
   "Texts pending owner approval" in this task.
6. `.env.example` comment updated (phase 2b, not 3); README note on the Netlify variable.

## Acceptance criteria
- [ ] With `PUBLIC_API_BASE_URL` pointing to the API, a valid submission shows success; invalid shows field errors.
  (Verified against a local mock only; the real API has no CORS headers until T-004 is deployed.)
- [x] No personal data in `console` output, URLs or analytics.
- [x] Accessible: labels, `aria-live` status region, focus moves to the message; Lighthouse accessibility ≥ 95.
- [x] `npm run build` passes; no new runtime dependencies.

## Out of scope
CAPTCHA, analytics, newsletter, backend changes.

## Open questions
(none)

## Texts pending owner approval
Proposed in `doc/content/web-copy-sk.md`, section „Kontaktný formulár (NÁVRH…)“; used in
`src/content/site/ui.yaml:45-58`. Existing labels (Meno, E-mail, Správa, Odoslať, Napíšte nám) are unchanged.
- `formNoscript` „Formulár potrebuje zapnutý JavaScript. Napíšte nám, prosím, na {email} alebo zavolajte na {phone}.“
- `formSending` „Odosielam…“ (button) · `formSendingStatus` „Odosielame vašu správu…“
- `formSuccessHeading` „Ďakujeme, vaša správa je odoslaná“ · `formSuccessText` „Ozveme sa vám čo najskôr na
  e-mail, ktorý ste uviedli.“
- `formInvalid` „Skontrolujte, prosím, označené polia.“
- `formFieldErrors` name „Vyplňte, prosím, meno (najviac 200 znakov).“ · email „Zadajte, prosím, platnú
  e-mailovú adresu.“ · message „Napíšte, prosím, správu (najviac 5 000 znakov).“
- `formError` „Správu sa nepodarilo odoslať. Skúste to, prosím, neskôr alebo nám napíšte na {email}.“
- `formHoneypot` „Toto pole nevypĺňajte“ (label of the hidden honeypot; not visible, not read by screen readers)

## Implementation notes
- Branch: `feat/T-002-contact-form-api`. PR: opened by the orchestrator.
- `src/pages/kontakt.astro`: `PUBLIC_API_BASE_URL` is read at build time (trailing `/` stripped) into
  `data-api` on the form. If it is empty, the page renders only the existing notice „Formulár zatiaľ nie je
  v prevádzke…“, so a build without the variable never shows a dead form.
- No-JS: the form is rendered with `hidden` and a fallback notice (e-mail/phone links) is visible; the script
  swaps them. If the script fails or JS is off, visitors see the fallback.
- Script: Astro `<script>` (TS, bundled and inlined, 1.6 kB). `fetch` JSON with a 15 s timeout; values are
  trimmed (the API strips whitespace too); nothing is logged. One `role="status"` live region is filled from
  `<template>`s rendered at build time, so all texts stay in `ui.yaml`.
- States: sending = button disabled + label „Odosielam…“ + `aria-busy`; 2xx = form hidden, thank-you in the
  status region, focus moves there; 400 with `details[].field` in name/email/message = per-field Slovak
  messages (`aria-invalid`, `aria-describedby` set only while shown), summary in the status region, focus on
  the first invalid field; 400 without known fields, 429, 500, network/CORS/timeout = generic error with the
  e-mail link, focus on the message.
- Native validation stays on (`required`, `type=email`, `maxlength` name 200 / message 5000 per
  `landing-backend` `src/leads/models.py`). E-mail gets `maxlength=254` (the address limit `EmailStr`
  enforces); the task did not name one.
- Honeypot `website`: off-screen wrapper with `aria-hidden="true"`, input `tabindex="-1"`,
  `autocomplete="off"`; always sent (empty for people).
- New token `--color-error: #fca5a5` in `global.css` (contrast ≈ 9:1 on the card background).
- Verified locally (Node 22, Chromium 1194 via Playwright 1.56, mock API in the scratchpad returning
  201/400/429/500/dropped connection with CORS): JS off shows the fallback; success, field errors (name+email),
  400 without fields, 429, 500, network error and a whitespace-only name all show the expected state and focus;
  native validation blocks an empty e-mail; browser console shows only Chromium's own "Failed to load resource"
  lines (status code, no form data). `npm run build`: astro check 0/0/0, 7 pages, with and without
  `PUBLIC_API_BASE_URL`. Lighthouse 12.8.2 (mobile, local preview) `/kontakt/`: 99/100/100/100.
- Not verified: the real API. It sends no CORS headers until backend T-004 is deployed, so from the browser a
  submit currently ends in the generic error. Netlify deploy preview not checked by the implementer.
- Deviations / doubts:
  - For a 400 with field errors, focus goes to the first invalid field (its error is its description), not to
    the summary; success and generic errors focus the message as specified.
  - Proposed texts are in `doc/content/web-copy-sk.md` as asked, in a section marked NÁVRH; ADR 0003 says that
    file holds only approved copy, so the marker must go (or the texts change) when the owner decides.
  - No privacy notice next to the form (GDPR information on processing the enquiry); the privacy policy is
    roadmap phase 2. Recommend adding at least a one-line notice before going live.
  - Content-Type `application/json` triggers a CORS preflight: T-004 must answer `OPTIONS /leads`.

## Architect review
(architect)
