# AGENTS.md: rules for AI agents in the inocube.sk website

Read this first, then `doc/README.md`. Keep this file under ~150 lines.

## Project in one paragraph

Marketing website of Inocube, a small Slovak company selling AI agents, data/reporting and custom
applications to firms and financial institutions in SK/CZ. The site's job is to make visitors book a free
30-minute consultation. It is a static Astro site on Netlify. The contact form will post to the backend API
in `inocube/landing-backend`.

## Where to find things

- Goals: `doc/goals.md` · Structure: `doc/architecture.md` · State: `doc/status.md` · Plan: `doc/roadmap.md`
- Decisions: `doc/decisions/` · Your assignment: `doc/tasks/T-xxx-*.md`
- Approved website copy: `doc/content/` (source of truth for text; do not invent claims, numbers or clients)

## Roles

Orchestrator (Claude in the owner's project) writes tasks. Implementer (`.claude/agents/implementer.md`)
builds one task on a branch and opens a PR. Architect (`.claude/agents/architect.md`) reviews it. Owner
(Roman) answers questions and merges.

## Workflow for a task

1. Read the task fully. Ambiguity on scope or content: write it under `## Open questions`, set
   `Status: blocked`, stop.
2. Branch from fresh `main`: `feat/T-xxx-short-name`. Small Conventional Commits.
3. Before pushing: `npm run build` must pass with no warnings you introduced; check the Netlify preview.
4. Update `doc/status.md` (always) and other docs the change affects.
5. Open a PR with: what changed, preview link, how to verify, and "Why it is built this way" (the owner is a
   senior Angular developer new to Astro: explain Astro-specific choices).
6. Set task `Status: review`. Never merge, never push to `main`.

## Hard rules

- Never commit secrets. `.env` is git-ignored. `PUBLIC_*` variables end up in the browser: no secrets there.
- Text comes from `doc/content/`. Clients are anonymised there on purpose; never add client names, prices,
  quotes or numbers that are not in the approved copy.
- No third-party trackers or analytics without a cookie consent mechanism (GDPR).
- If AI features are added to the site, they must say they are AI (EU AI Act art. 50).
- Do not change `netlify.toml` build settings or DNS without the task saying so.

## Conventions

- Astro, static output (`output: 'static'`). Zero client JS by default; add islands only when needed.
- Content in Markdown content collections under `src/content/`; pages compose components, no copy in
  components.
- Slovak is the default locale at `/`; English will live under `/en/` (Astro i18n routing).
- Accessibility: semantic HTML, alt texts, visible focus, colour contrast AA. Lighthouse ≥ 95 in all four
  categories on the home page.
- SEO: unique title and description per page, Open Graph tags, `sitemap.xml`, canonical URLs.
- Images: Astro `<Image>` with width/height, modern formats.
- Plain CSS (scoped component styles + one global file with design tokens). No CSS framework unless an ADR
  says so.
