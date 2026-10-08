# inocube.sk website

Company website of Inocube: AI and data connected to clients' existing systems. Hosted on Netlify.
The backend for the contact form lives in [inocube/landing-backend](https://github.com/inocube/landing-backend).

## State

Today: a single static page (`index.html`, `style.css`, `script.js`, `Assets/`). It is being rebuilt with
[Astro](https://astro.build) (task `doc/tasks/T-001-astro-rewrite.md`). After the rewrite this README gets
the Astro commands.

## Layout (after the Astro rewrite)

| Path | What it is |
|---|---|
| `src/pages/` | Routes (one file per page) |
| `src/content/` | Page copy as Markdown content collections (SK now, EN later) |
| `src/components/`, `src/layouts/` | UI building blocks |
| `public/` | Static files copied as-is (images, favicon) |
| `doc/` | Goals, architecture, status, roadmap, decisions, agent tasks. Start at [`doc/README.md`](doc/README.md) |
| `AGENTS.md` | Rules for AI coding agents working in this repo |

## Deploy

Netlify builds every push: pull requests get a deploy preview, `main` goes live. `main` is protected;
changes go through pull requests.
