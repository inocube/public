# Architecture

## Current

Single static page in the repo root: `index.html`, `style.css`, `script.js` (navbar, smooth scroll, reveal
animations), images in `Assets/`, Lucide icons from unpkg, Inter font from Google Fonts. The contact form
posts to FormSubmit with a placeholder address, so **no message is delivered**. Netlify serves the repo root.

## Target

```
GitHub inocube/public ─▶ Netlify build (astro build) ─▶ inocube.sk (static, CDN)
                                                   └▶ deploy preview per PR
Contact form ─ fetch POST ─▶ backend API (api.inocube.sk/leads, landing-backend repo)
```

- Astro static site. Pages: home (positioning, 3 reasons, packages overview, case studies, process, CTA),
  one page per package, case studies, contact. Final page list is set in task T-001.
- Copy in `src/content/` collections, derived from `doc/content/`.
- `PUBLIC_API_BASE_URL` set per Netlify context (preview vs production).
- Domain registered at Websupport, DNS pointing to Netlify.
