# T-002: Connect the contact form to the leads API

- Status: ready
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
- [ ] No personal data in `console` output, URLs or analytics.
- [ ] Accessible: labels, `aria-live` status region, focus moves to the message; Lighthouse accessibility ≥ 95.
- [ ] `npm run build` passes; no new runtime dependencies.

## Out of scope
CAPTCHA, analytics, newsletter, backend changes.

## Open questions
(none)

## Implementation notes
(implementer)

## Architect review
(architect)
