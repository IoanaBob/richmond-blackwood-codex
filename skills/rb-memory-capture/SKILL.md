---
name: rb-memory-capture
description: Capture Richmond Blackwood company-wide memory with source, status, and review metadata.
---

# RB Memory Capture

Use this when writing durable RB memory.

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
