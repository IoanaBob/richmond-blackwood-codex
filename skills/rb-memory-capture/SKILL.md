---
name: rb-memory-capture
description: Capture Richmond Blackwood company-wide memory with source, status, and review metadata.
---

# RB Memory Capture

Use this when writing durable RB memory.

## Startup Workflow

1. Read `AGENTS.md`.
2. Read `memory/index.md`.
3. Read `memory/storage-rules.md`.
4. Read `memory/current-state.md`.
5. Skim recent `memory/history.md`.
6. Skim recent `memory/skill-runs.md`.
7. Read `memory/handoff.md`.
8. Check `skills/index.md` for any repo-local skill that applies.

## Required Metadata

Every new memory file or section should include:

- Status.
- Source.
- Imported date.
- Review needed.

## Routing

- General company memory: `memory/`.
- Non-client private company history: `internal/`.
- Client-specific private detail: `clients/<client-reference>/`.
- General SOP/processes: `processes/`.

## Review

Do not mark facts approved unless the user explicitly approves them.

## Closeout Workflow

Before ending a meaningful session:

1. Append a dated entry to `memory/history.md`.
2. Update `memory/skill-runs.md` for every repo-local or plugin skill used.
3. Update `memory/current-state.md` when durable state changed.
4. Update `memory/decisions.md` when a decision was made or reversed.
5. Update `memory/tasks.md` when work opened, completed, or became blocked.
6. Update `memory/handoff.md` with the shortest useful next-session briefing.
7. Report verification performed or skipped.

## Task Timestamp Standard

- Open tasks include `Created`.
- Completed tasks include `Created` and `Completed`.
- Blocked tasks include `Created`, `Blocked`, and `Blocker`.
