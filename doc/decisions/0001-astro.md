# 0001. Rebuild the site with Astro

- Status: Accepted
- Date: 2026-10-08

## Context
The new copy needs several pages (packages, case studies, contact), Slovak and later English, and good SEO.
A single hand-written `index.html` does not scale to that. The owner is an Angular developer.

## Decision
Use Astro with static output: Markdown content collections for copy, i18n routing, zero client JS by default.
Angular was considered but is heavier for a content site and needs SSR/prerendering for SEO.

## Consequences
Copy edits are Markdown edits. Fast pages and good Lighthouse scores by default. The owner learns Astro;
PRs explain Astro-specific choices.
