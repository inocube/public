# Architecture

## Current (after T-001)

Astro static site (`output: 'static'`), built by Netlify with `npm run build` into `dist/` (Node pinned in
`netlify.toml` and `.nvmrc`). No client-side framework; the only JavaScript is small inline scripts for the
mobile menu and the contact form.

| Route | Source | Content |
|---|---|---|
| `/` | `src/pages/index.astro` | Hero, three reasons, packages overview, process, case-study teasers, CTA |
| `/sluzby/ai-agent/`, `/sluzby/data-reporting/`, `/sluzby/aplikacie-na-mieru/` | `src/pages/sluzby/[slug].astro` | One page per package |
| `/referencie/` | `src/pages/referencie.astro` | All four case studies (anchors per study) |
| `/kontakt/` | `src/pages/kontakt.astro` | Contact and company details, contact form (`POST /leads`) |
| `/ochrana-osobnych-udajov/`, `/impresum/` | `src/pages/[legal].astro` | Privacy policy and imprint (Markdown in `src/content/legal/`) |
| `/404.html` | `src/pages/404.astro` | Not-found page (noindex) |

- Copy: content collections in `src/content/` (`packages`, `caseStudies` as Markdown frontmatter, `legal`
  as Markdown body; `home`, `ui`, `company` as YAML keyed by locale), derived from `doc/content/`.
- CTA: `mailto:` link to the company e-mail; the form on `/kontakt/` is the second channel.
- Contact form: an inline Astro `<script>` (~1.7 kB) posts JSON to `${PUBLIC_API_BASE_URL}/leads` (read at
  build time into `data-api`, set for the Netlify Production context only). Without JS it shows the
  e-mail/phone fallback; without the variable the notice „Formulár zatiaľ nie je v prevádzke…“.
- SEO: per-page title/description, canonical, Open Graph, `@astrojs/sitemap` (`/sitemap-index.xml`),
  `robots.txt`, `lang="sk"`.
- Fonts: Inter variable from `@fontsource-variable/inter`, self-hosted through the Astro Fonts API. No
  external requests, no trackers.

## Target

```
GitHub inocube/public ─▶ Netlify build (astro build) ─▶ inocube.sk (static, CDN)
                                                   └▶ deploy preview per PR
Contact form ─ fetch POST ─▶ backend API (api.inocube.sk/leads, landing-backend repo)
```

- Pages as listed above; English under `/en/` later (Astro i18n is configured with `sk` as the default).
- `PUBLIC_API_BASE_URL` set per Netlify context (preview vs production).
- Domain registered at Websupport, DNS pointing to Netlify.
