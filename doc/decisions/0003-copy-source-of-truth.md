# 0003. Approved copy is mirrored in doc/content

- Status: Accepted
- Date: 2026-10-08

## Context
Business strategy and offer documents live in the owner's Claude project, which agents on the owner's PC
cannot always read. The build needs the exact texts, and invented claims would hurt credibility.

## Decision
The owner-approved website copy is mirrored in `doc/content/` and is the only source of text for the site.
Strategy documents stay outside the repo.

## Consequences
Agents never invent copy. Copy changes start in `doc/content/` (approved by the owner), then flow to
`src/content/`.
