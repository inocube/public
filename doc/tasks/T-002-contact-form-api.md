# T-002: Connect the contact form to the leads API

- Status: approved
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
   "Texts" in this task (approved 2026-10-12).
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
2. ~~Approve the texts below~~ Done 2026-10-12 (legal name confirmed as InoCube s.r.o.).
3. Merge only after backend T-004 (CORS incl. `OPTIONS /leads`) is deployed.

## Texts (approved by the owner on 2026-10-12)
In `doc/content/web-copy-sk.md` („Kontaktný formulár“), used in `src/content/site/ui.yaml:45-62`.
- `formNoscript` „Formulár potrebuje zapnutý JavaScript. Napíšte nám, prosím, na {email} alebo zavolajte na {phone}.“
- `formSending` „Odosielam…“ (button and status) · `formInvalid` „Skontrolujte, prosím, označené polia.“
- `formSuccessHeading` „Ďakujeme, vaša správa je odoslaná“ · `formSuccessText` „Ozveme sa vám čo najskôr na
  e-mail, ktorý ste uviedli.“
- `formFieldErrors` „Vyplňte, prosím, meno (najviac 200 znakov).“ · „Zadajte, prosím, platnú e-mailovú adresu.“ ·
  „Napíšte, prosím, správu (najviac 5 000 znakov).“
- `formError` „Správu sa nepodarilo odoslať. Skúste to, prosím, neskôr alebo nám napíšte na {email}.“
- `formHoneypot` „Toto pole nevypĺňajte“ (hidden honeypot label, not visible or read out)
- `formPrivacy` (GDPR čl. 13, under the button) „Údaje z formulára spracúva InoCube s.r.o., Nešporova 1007/7, 927 01
  Šaľa, IČO 56282893, na vybavenie vášho dopytu (opatrenia pred uzavretím zmluvy, oprávnený záujem) do jeho
  vybavenia, najviac 2 roky. Sprostredkovateľ: Amazon Web Services, dáta v EÚ (Frankfurt). Máte právo na
  prístup, opravu, vymazanie, obmedzenie, prenosnosť, námietku a sťažnosť na Úrad na ochranu osobných údajov
  SR; kontakt: {email}.“

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
Verdict: approved (round 2, 2026-10-11; reviewed e15e0b6, 79d1851). Merge is still gated by Owner steps 1–3
(production-only variable, text approval incl. `formPrivacy`, backend T-004 with `OPTIONS /leads`).
`npm run build` passes (astro check 0/0/0) with no variable and with `https://…/Prod/`. The build fails as
intended for `example.test` and `http://api.example.test`.

Round 1 findings:
- 1 GDPR: fixed. `formPrivacy` sits under the button (`kontakt.astro:97`), escaped, e-mail rendered as a link.
- 3 Previews: fixed in the docs (README, task Owner steps): the variable is set for Production only, so previews
  show the notice. This only holds if the owner sets the variable's scope correctly in Netlify.
- 4 URL check: fixed (`kontakt.astro:15-31`, `new URL`, https, or http only for localhost/127.0.0.1).
- 5 `method="post"` with no action: fixed. A native submit POSTs to `/kontakt/` and nothing reaches the URL.
- 6 Timeout: fixed with AbortController + setTimeout, cleared in `finally`. No regression.
- 7 Docs (README, `.env.example`, architecture, roadmap phase): fixed. 8: „Odosielam…“ unified, the separate
  status text was removed from the schema/YAML, and no references to it remain.
- 2 and 9 are owner items.

Remaining (non-blocking):
- `kontakt.astro:13`: the comment still says a missing variable shows "the e-mail/phone fallback"; it shows
  `formNotice`. Fix it when convenient.
- `formPrivacy` as a short Art. 13 notice is legally sensible: it names the controller and contact, the purpose,
  the legal bases (Art. 6(1)(b)/(f)), retention, the rights and the supervisory authority (ÚOOÚ SR). Before
  approving it, the owner should consider adding:
  - the right to data portability (Art. 20 applies to the 6(1)(b) basis);
  - the recipients (Art. 13(1)(e)), e.g. „sprostredkovateľ: Amazon Web Services, dáta v EÚ (Frankfurt)“;
  - the address, or the full legal name, of the controller.
  Once the privacy page (phase 2) exists, link it from the notice.

Questions for the owner
1. Is InoCube a legal entity, or a trade name of a sole trader? If it is a sole trader, the controller named in
   `formPrivacy` should be the person (name + „InoCube“).
2. Add portability and recipients (AWS, EU region) to `formPrivacy` before approving it?
