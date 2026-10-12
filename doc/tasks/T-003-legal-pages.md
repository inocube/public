# T-003: Privacy policy and imprint pages

- Status: review
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
Owner to provide (placeholders until then, do not block the PR on them). Register entry, konateľ and legal
form were provided on 2026-10-12 and are in the imprint.
- Confirm the processor list (AWS, Netlify, SimpleLogin/Proton) is complete. In particular: which provider
  hosts the mailbox SimpleLogin forwards to? If it is not Proton, it is another recipient to list.
- Placeholder `[DOPLNIŤ: ako dlho Netlify uchováva záznamy servera]`: how long Netlify keeps request logs
  on the current plan (check the Netlify plan or DPA).
- Does the backend (API Gateway, Lambda, CloudWatch logs) store the visitor's IP address or other request
  data? If yes, the policy must list it under „Aké údaje spracúvame“ with its retention.
- The policy applies the form retention („do vybavenia dopytu, najdlhšie 2 roky“) also to e-mails and phone
  calls, and lists e-mail/phone contact as a data source. Confirm the owner can keep that promise.
- Approve the texts in `doc/content/web-copy-sk.md`, „Právne stránky“ (both pages, the form link text and the
  footer link labels), then drop „(NÁVRH…)“ from the heading.

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
(architect: verdict approved / changes-requested, findings with file:line)
