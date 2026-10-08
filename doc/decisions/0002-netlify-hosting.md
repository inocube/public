# 0002. Hosting stays on Netlify

- Status: Accepted
- Date: 2026-07-02

## Context
The site already runs on Netlify with the domain at Websupport. Netlify's free tier covers a static site and
gives a deploy preview per pull request.

## Decision
Keep Netlify. The backend runs separately on AWS (see landing-backend ADR 0002).

## Consequences
No hosting cost; previews for every PR. The form calls a cross-origin API, so the backend must allow the
site's origins via CORS.
