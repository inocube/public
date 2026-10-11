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

## Owner steps
1. Netlify: set `PUBLIC_API_BASE_URL` = `https://i6r0knhf3m.execute-api.eu-central-1.amazonaws.com/Prod` for the
   **Production** deploy context only (previews then show the notice and never write prod leads).
2. Approve or change the texts below; then drop the NÁVRH marker in the copy doc and the `ui.yaml` comment.
3. Merge only after backend T-004 (CORS incl. `OPTIONS /leads`) is deployed.

## Texts pending owner approval
Proposed in `doc/content/web-copy-sk.md` („Kontaktný formulár (NÁVRH…)“), used in `src/content/site/ui.yaml:45-61`.
- `formNoscript` „Formulár potrebuje zapnutý JavaScript. Napíšte nám, prosím, na {email} alebo zavolajte na {phone}.“
- `formSending` „Odosielam…“ (button and status) · `formInvalid` „Skontrolujte, prosím, označené polia.“
- `formSuccessHeading` „Ďakujeme, vaša správa je odoslaná“ · `formSuccessText` „Ozveme sa vám čo najskôr na
  e-mail, ktorý ste uviedli.“
- `formFieldErrors` „Vyplňte, prosím, meno (najviac 200 znakov).“ · „Zadajte, prosím, platnú e-mailovú adresu.“ ·
  „Napíšte, prosím, správu (najviac 5 000 znakov).“
- `formError` „Správu sa nepodarilo odoslať. Skúste to, prosím, neskôr alebo nám napíšte na {email}.“
- `formHoneypot` „Toto pole nevypĺňajte“ (hidden honeypot label, not visible or read out)
- `formPrivacy` (GDPR čl. 13, under the button) „Údaje z formulára spracúva InoCube, IČO 56282893, na vybavenie
  vášho dopytu (opatrenia pred uzavretím zmluvy, oprávnený záujem) do jeho vybavenia, najviac 2 roky. Máte právo
  na prístup, opravu, vymazanie, obmedzenie, námietku a sťažnosť na Úrad na ochranu osobných údajov SR;
  kontakt: {email}.“

## Implementation notes
- Branch `feat/T-002-contact-form-api`; PR opened by the orchestrator. Page: `src/pages/kontakt.astro`.
- `PUBLIC_API_BASE_URL` is read at build time into `data-api`; the build fails unless it is `https://`
  (`http://` only for 127.0.0.1/localhost). Empty: only the notice „Formulár zatiaľ nie je v prevádzke…“.
- No-JS: form rendered `hidden`, e-mail/phone fallback visible; the script swaps them. Form has
  `method="post"` and no `action`, so a native submit never puts data in a URL.
- Script (inlined, ~1.7 kB): JSON `fetch`, 15 s timeout via AbortController + setTimeout, values trimmed, no
  logging. One `role="status"` region filled from build-time `<template>`s. Sending: button disabled
  „Odosielam…“ + `aria-busy`. 2xx: form hidden, thank-you focused. 400 with known `details[].field`: Slovak
  per-field errors (`aria-invalid`/`aria-describedby` while shown), focus on the first invalid field (deviation:
  not on the summary). Anything else (429, 500, network, CORS, timeout): generic error with e-mail, focused.
- Native validation: `required`, `type=email`, `maxlength` 200/5000 per backend `models.py`; e-mail 254
  (`EmailStr` limit, not in the task). Honeypot `website` off-screen, `aria-hidden`, `tabindex=-1`, always sent.
- Verified locally (Playwright 1.56 + Chromium 1194, mock API with CORS returning 201/400/429/500/dropped/20 s
  delay): every state, focus, JS-off fallback, timeout after 15 s, native e-mail check; console has no form data.
  Build fails for `api.example.com` and `http://api.example.com`, passes for the prod URL and localhost.
  astro check 0/0/0. Lighthouse 12.8.2 mobile `/kontakt/`: 100/100/100/100.
- Not verified: real API (no CORS until T-004) and Netlify previews. Review round 1: findings 1, 3–8 fixed;
  2 and 9 are owner decisions (Owner steps 2; honeypot false positives are silently dropped by the API).

## Architect review
Verdict: changes-requested (round 1, 2026-10-11). `npm ci` (0 vulnerabilities) and `npm run build` pass, astro
check 0/0/0, with and without `PUBLIC_API_BASE_URL` (trailing `/` stripped correctly). Code is sound: no XSS path
(API `details` are only matched against a fixed field list, never rendered; `withContactLinks` escapes), no
logging, PII only in the POST body, double submit guarded, every state (201/400/429/500/network/timeout) ends in
a defined message with focus handled. The blockers are go-live conditions, not code quality.

Findings (most severe first):
1. GDPR, blocker: `src/pages/kontakt.astro:46` collects name, e-mail and free text with no Art. 13 information
   (controller, purpose, legal basis, retention, rights). Merging plus setting the Netlify variable makes the
   form live. Fix: one-line notice under the button (owner-approved text in `doc/content/`), linking to a privacy
   page or listing the basics inline; or keep the variable unset in production until phase 2 delivers it.
2. ADR 0003, merge gate: `doc/content/web-copy-sk.md:124` holds unapproved NÁVRH texts and `src/content/site/
   ui.yaml:43-59` ships them. The task sanctioned this, but the PR must not merge until the owner approves the
   texts and the NÁVRH heading/note and the ui.yaml comment are removed.
3. Deploy previews hit production: CORS will allow `deploy-preview-*` origins, so every preview with the same
   variable writes real leads (and notifications) into the prod backend. Fix: document a separate value for the
   Netlify deploy-preview context (staging API, or unset), see Question 2.
4. `kontakt.astro:14`: the URL is not validated. A value without scheme becomes a relative fetch to inocube.sk,
   `http://` is blocked as mixed content; both fail silently as the generic error in production. Fix: parse with
   `new URL()` at build time and fail the build unless it is `https:` (allow `http://127.0.0.1`/`localhost`).
5. `kontakt.astro:46`: the form has no `method`/`action`, so any native submit (e.g. a future script regression
   before `preventDefault`) would GET name/e-mail/message into the URL. Fix: `method="post"` and `action` pointing
   at the API (or `#`), defence in depth.
6. `kontakt.astro:292`: `AbortSignal.timeout` is missing before Safari 16 / iOS 15; it throws inside `try`, so those
   visitors always get the generic error. Fix: `AbortController` + `setTimeout`, or accept and note it.
7. Docs: `README.md:39` and `.env.example:5-6` say a missing variable shows the e-mail/phone fallback; it shows
   `formNotice` (`kontakt.astro:92`, no links). `.env.example:5` says "phase 2b", `doc/roadmap.md` calls it
   phase 3 (2b is the backend's phase). Align wording.
8. Minor UX/copy: button „Odosielam…“ (1st person singular) vs status „Odosielame…“; the no-JS fallback text
   flashes briefly before the module runs (`kontakt.astro:45`), acceptable trade-off for covering script failure.
9. Honeypot is correct (off-screen, `aria-hidden`, `tabindex=-1`, always sent). Residual risk: some password
   managers/autofill ignore `autocomplete="off"`; the API should drop silently (201) so a false positive is a
   lost lead with no error, which the owner should know.
Not verified by me: real API/CORS preflight (`OPTIONS /leads` must be answered by T-004), Lighthouse, preview.

Questions for the owner
1. Privacy: inline one-line GDPR notice now, or keep the form off in production until the privacy page (phase 2)?
2. Deploy previews: separate `PUBLIC_API_BASE_URL` for the deploy-preview context, or accept test leads in prod?
3. Approve or change the NÁVRH texts (including „Odosielam…“ vs „Odosielame…“).
