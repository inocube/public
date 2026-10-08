# inocube.sk website

Company website of Inocube: AI and data connected to clients' existing systems. Hosted on Netlify.
The backend for the contact form lives in [inocube/landing-backend](https://github.com/inocube/landing-backend).

## Commands

Requires Node 22.12+ (see `.nvmrc`). Run in PowerShell from the repo root:

| Command | What it does |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server with hot reload at http://localhost:4321 |
| `npm run build` | Type-check (`astro check`) and build the static site into `dist/` |
| `npm run preview` | Serve the built `dist/` locally to check the production output |

## Layout

| Path | What it is |
|---|---|
| `src/pages/` | Routes (one file per page; `sluzby/[slug].astro` generates one page per package) |
| `src/content/` | Page copy as Markdown/YAML content collections, schemas in `src/content.config.ts` |
| `src/components/`, `src/layouts/` | UI building blocks; `src/styles/global.css` holds the design tokens |
| `src/assets/` | Images processed by Astro (resized, converted to WebP) |
| `public/` | Static files copied as-is (favicon, `robots.txt`) |
| `doc/` | Goals, architecture, status, roadmap, decisions, agent tasks. Start at [`doc/README.md`](doc/README.md) |
| `AGENTS.md` | Rules for AI coding agents working in this repo |

To change a text, edit `doc/content/` first (owner-approved copy), then the matching file in `src/content/`.

## Deploy

Netlify builds every push: pull requests get a deploy preview, `main` goes live. `main` is protected;
changes go through pull requests.
