# Tasks

One file per task: `T-xxx-short-name.md`, written by the orchestrator from the current roadmap phase.

Lifecycle: `ready` → `in-progress` → `review` → `changes-requested` ↔ `review` → `approved` → `done`
(owner merged). `blocked` when an open question needs the owner.

Orchestrator writes Goal, Context, Scope, Acceptance criteria, Out of scope. Implementer fills Implementation
notes. Architect fills Architect review. Anyone may add Open questions; the owner answers them.

Run in Claude Code in this repo:

```text
> Use the implementer agent to implement doc/tasks/T-001-astro-rewrite.md
> Use the architect agent to review the PR for T-001
```
