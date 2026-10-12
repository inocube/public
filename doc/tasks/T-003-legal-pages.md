# T-003: Privacy policy and imprint pages

- Status: ready
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
- [ ] Both pages build, are in `sitemap.xml`, have unique title/description, pass Lighthouse a11y ≥ 95.
- [ ] Every fact in the texts is in this task, in `company.yaml` or in `doc/content/`; unknown facts are
      `[DOPLNIŤ: …]` placeholders listed under Open questions, never invented.
- [ ] No new runtime dependencies; `npm run build` passes.

## Out of scope
Cookie banner, analytics, English version, team section, backend changes.

## Open questions
Owner to provide (placeholders until then, do not block the PR on them):
- Obchodný register entry: court (Okresný súd …), oddiel Sro, vložka č.
- Statutory body: name of the konateľ (or konatelia).
- Confirm the processor list (AWS, Netlify, SimpleLogin/Proton) is complete.

## Implementation notes
(implementer)

## Architect review
(architect: verdict approved / changes-requested, findings with file:line)
