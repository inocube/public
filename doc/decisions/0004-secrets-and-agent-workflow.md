# 0004. Secrets in .env, agent workflow with architect review

- Status: Accepted
- Date: 2026-10-08

## Context
The repo is public. Work is done by AI agents and the owner wants independent review.

## Decision
- `.env` is git-ignored and holds local values only; `.env.example` documents names. Production values are
  set in Netlify. `PUBLIC_*` variables are visible in the browser and never hold secrets.
- Orchestrator writes tasks, implementer agent opens a PR, architect agent reviews, owner merges.

## Consequences
No secrets in git. Every change has a spec, an explanation and a review.
