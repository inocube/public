# T-003: Privacy policy and imprint pages

- Status: approved
- Roadmap phase: 2 (legal pages part; team section stays out of scope)
- Branch: feat/T-003-legal-pages

## Goal
The site has a full privacy policy (GDPR art. 13) and an imprint (zákon 22/2004 Z. z. § 4), both linked from
the footer and from the contact form notice, so a visitor sending the form can read how their data is used.

## Context
- Since 2026-10-12 the form on `/kontakt/` sends personal data (name, e-mail, message) to `POST /leads`
  (AWS API Gateway + Lambda + DynamoDB in eu-central-1 Frankfurt; owner gets an e-mail via Amazon SES).
  Retention: until the enquiry is handled, at most 2 years (already stated in the approved form notice
  `formPrivacy` in `src/content/site/ui.yaml`).
- Controller: InoCube s.r.o., Nešporova 1007/7, 927 01 Šaľa, IČO 56282893, DIČ 2122282272,
  IČ DPH SK2122282272, e-mail and phone in `src/content/site/company.yaml`. No DPO appointed.
- Hosting: Netlify (static site; Netlify keeps request logs incl. IP address). No cookies, no analytics, no
  third-party scripts or fonts today; the policy must say so and must not promise anything the site does not do.
- The notification e-mail is delivered to the owner's mailbox `inocube@varga.slmail.me` (SimpleLogin alias
  service, Proton AG, Switzerland, forwards to the owner's mailbox).
- Supervisory authority: Úrad na ochranu osobných údajov SR, Hraničná 12, 820 07 Bratislava.
  Consumer supervision for the imprint: Slovenská obchodná inšpekcia (inšpektorát for Nitriansky kraj).
- Approved copy lives in `doc/content/web-copy-sk.md` (ADR 0003). These pages are new copy: write them there
  in a section marked „(NÁVRH, čaká na schválenie vlastníkom)“ and render them from content, like T-002 did.

## Scope
1. Pages `/ochrana-osobnych-udajov/` and `/impresum/` (Slovak), content in a content collection or YAML,
   not hard-coded in components. Same layout, title/description, canonical, sitemap as other pages.
2. Privacy policy sections: controller and contact; what data (form fields, server logs on Netlify); purposes
   and legal basis (art. 6(1)(b) pre-contract steps, art. 6(1)(f) legitimate interest for logs/security);
   recipients and processors (Amazon Web Services EMEA SARL, data in Frankfurt; Netlify, Inc., USA, under the
   EU-US Data Privacy Framework; Proton AG / SimpleLogin, Switzerland, adequacy decision); transfers outside
   the EU; retention; rights (access, rectification, erasure, restriction, portability, objection, complaint
   to ÚOOÚ SR); no automated decision-making; cookies: none; date of last update.
3. Imprint: legal name, seat, IČO, DIČ, IČ DPH, Obchodný register entry, statutory body, e-mail, phone,
   supervisory body (SOI).
4. Footer: links to both pages. Form notice on `/kontakt/`: add a link to the privacy page (keep the approved
   short text; link text new and listed for approval).
5. Update `doc/status.md`, `doc/roadmap.md` phase 2 line.

## Acceptance criteria
- [x] Both pages build, are in `sitemap.xml`, have unique title/description, pass Lighthouse a11y ≥ 95.
- [x] Every fact in the texts is in this task, in `company.yaml` or in `doc/content/`; unknown facts are
      `[DOPLNIŤ: …]` placeholders listed under Open questions, never invented.
- [x] No new runtime dependencies; `npm run build` passes.

## Out of scope
Cookie banner, analytics, English version, team section, backend changes.

## Open questions
(none) Answered by the owner on 2026-10-12: register entry, konateľ and legal form are in the imprint;
SimpleLogin forwards to Proton Mail (Proton AG, Switzerland), now named in the policy; the 2-year limit also
applies to e-mails and calls; texts approved. Netlify log retention is stated as a criterion
(art. 13(2)(a)); backend logs hold no IP or personal data.

## Implementation notes
- Branch `feat/T-003-legal-pages`, committed locally; the orchestrator pushes and opens the PR.
- New content collection `legal` (`src/content/legal/*.md`, schema in `src/content.config.ts`): frontmatter
  holds title, description and footer order, the Markdown body is the page text. One dynamic route
  `src/pages/[legal].astro` builds `/ochrana-osobnych-udajov/` and `/impresum/` (same pattern as
  `sluzby/[slug].astro`); `BaseLayout` gives title, description, canonical and OG, the sitemap picks them up.
- Footer: both pages added at the end of the „Stránky“ list (labels = page titles). Form: new UI text
  `contactPage.formPrivacyLink` rendered as a link after the approved `formPrivacy` text, which is unchanged.
  The link exists only when the form is rendered (with `PUBLIC_API_BASE_URL`); the footer links are always there.
- Deviation: company facts are written literally in the Markdown (like `formPrivacy`), not read from
  `company.yaml`, so the page text is identical to the copy doc. If the address or e-mail changes, update
  `company.yaml`, `ui.yaml` `formPrivacy` and both legal pages. The owner-provided register entry, konateľ
  and legal form are in the copy doc („Kontakt a firemné údaje“) and the imprint, not in `company.yaml`
  (no component uses them; unused schema fields would be dead data).
- Deviation (scope): the policy also covers contact by e-mail and phone (same purpose, basis and recipients),
  since the site invites both. Listed under Open questions for confirmation.
- Not stated because not given: addresses of AWS, Netlify, Proton and SOI; Netlify log fields beyond the IP
  address; SES region. `doc/content/web-copy-sk.md` is now ~280 lines, over the ~200-line guideline in
  `doc/README.md`; splitting the legal texts into `doc/content/legal-sk.md` is an option once approved.
- Verified: `npm run build` (astro check 0/0/0); both pages in `sitemap-0.xml` with unique title,
  description and canonical; no em-dashes. Lighthouse 12.8.2 (mobile, local `astro preview`):
  `/ochrana-osobnych-udajov/` 99/100/100/100, `/impresum/` 100/100/100/100, `/kontakt/` (built with a
  dummy `https://` API URL so the form and its link render) 100/100/100/100. Netlify preview not checked
  (not pushed).

## Architect review
Verdict: changes-requested

Checked: `git diff main...HEAD`; `npm run build` passes (astro check 0/0/0, 9 pages). Both pages are in
`sitemap-0.xml` with unique title, description and canonical. `dist/` has no external scripts, fonts,
stylesheets or cookie/storage code. No new dependencies. Texts match `doc/content/web-copy-sk.md` line by
line; no em-dashes. `[legal].astro` follows the `sluzby/[slug].astro` pattern; it only emits the ids from
`src/content/legal/`, and static routes (index, kontakt, referencie, 404) win over it, so no collision today.

1. Blocking. `src/content/legal/ochrana-osobnych-udajov.md:74` (and copy doc): „Údaje z kontaktného formulára
   ukladáme v Európskej únii.“ is not true as written: the notification e-mail with the form data goes through
   Proton/SimpleLogin (CH) into a mailbox whose provider is not named (line 61-63, Open question 1). Fix: say
   the form database is in the EU (Frankfurt) and a copy arrives by e-mail in our mailbox; name the mailbox
   provider among the recipients (if it is Proton Mail, state that Proton AG also stores the e-mails, CH).
2. Optional. Open question 3 can be closed: API Gateway has no access logging; Lambda logs only the lead id
   and AWS error codes (no IP, no personal data), CloudWatch retention 30 days. Nothing needs adding under
   „Aké údaje spracúvame“; optionally one line on the 30-day operational logs (pseudonymous lead id).
3. Optional. `ochrana-osobnych-udajov.md:78`: the 2-year limit is a promise. Confirm it is enforced (DynamoDB
   TTL or a scheduled delete, mailbox clean-up); if not, add a backend task. Consider noting that data of a
   client who signs a contract is kept longer under accounting/tax law (separate purpose and basis).
4. Optional. `src/content/legal/impresum.md:22`: add the SOI inspektorát address (Nitra) for completeness.
   § 4 items otherwise complete (name, seat, IČO, register entry, IČ DPH, e-mail, phone).
5. Optional. `src/content/site/ui.yaml:61` approved form notice names only AWS as processor; with the new
   link it is acceptable, but it now lists fewer recipients than the policy. Owner may shorten it to point
   to the policy at the next copy revision.
6. Optional. `src/pages/[legal].astro:8-12`: a future legal file named like a static page (e.g. `kontakt.md`)
   would be silently shadowed. A one-line comment in `content.config.ts` next to the `legal` collection
   (ids must not match top-level routes) is enough.

Questions for the owner: which provider hosts the mailbox SimpleLogin forwards to; Netlify log retention on
the current plan (placeholder line 79); confirm Netlify, Inc. is active on the DPF list.

### Orchestrator follow-up (after review)
- Finding 1 (blocking) fixed: the policy no longer says form data stays only in the EU; it names the e-mail
  copy via SimpleLogin and leaves the mailbox provider as a placeholder for the owner.
- Finding 6 fixed: comment on the `legal` collection in `src/content.config.ts`.
- Findings 2-5 optional, not done in this PR. Finding 3 (enforcing the 2-year limit) is a backend task
  candidate (DynamoDB TTL).
