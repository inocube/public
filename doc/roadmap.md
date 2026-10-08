# Roadmap

| # | Phase | State |
|---|---|---|
| 1 | Astro rewrite with new Slovak copy | next (T-001) |
| 2 | Contact details, team, legal pages (privacy policy, imprint) | planned |
| 3 | Contact form connected to backend `POST /leads` | planned, after backend phase 2b |
| 4 | English version, SEO basics, analytics with cookie consent, Google Business Profile | planned |
| 5 | AI assistant widget (labelled as AI), backed by backend phase 6 | idea |

## 1. Astro rewrite
- All approved copy from `doc/content/web-copy-sk.md` is on the site; old generic texts are gone.
- Visual identity kept recognisable (colours, cube logo), modernised layout.
- Lighthouse ≥ 95, mobile-friendly, deploy preview approved by the owner.

## 3. Form connected
- Form posts JSON to `${PUBLIC_API_BASE_URL}/leads`; success and error states; honeypot field; no FormSubmit.
- Works only from allowed origins (backend CORS).

## 4. EN, SEO, analytics
- `/en/` mirrors all pages; language switcher; `hreflang` tags.
- Privacy-friendly analytics only after consent.
