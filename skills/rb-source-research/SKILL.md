---
name: rb-source-research
description: Research Richmond Blackwood context across local repos and connected sources, then register sources and communication route pointers before importing facts.
---

# RB Source Research

Use this when gathering Richmond Blackwood context from local repos, Notion, Google Drive, Slack, Gmail, WhatsApp, or public sources.

## Workflow

1. Read `memory/storage-rules.md`.
2. For every company or individual client task, check the full internal client context before deciding: local client folder, Notion company/individual and operational records, Drive folders/files, and relevant prior communication/source pointers when available.
3. If Notion, Drive, Gmail, Slack, WhatsApp, or another expected source is unavailable, record the blocker and either proceed with a clear caveat or stop when the missing context could change the decision.
4. Register the source in `sources/source-register.md` before importing facts.
5. If WhatsApp is used for a client export/backfill, resolve the relevant contact or group through the WhatsApp MCP and store the selected JID as a pointer in the owning company or individual `communications.md` plus `source-register.md`.
6. If multiple WhatsApp routes are plausible, stop and ask the operator to choose before filing.
7. Separate general process/company knowledge from client-specific private knowledge.
8. Write general knowledge to `memory/`, `processes/`, or `internal/`.
9. Write client-specific detail only to `clients/Companies/<client-reference>/` or individual-specific detail only to `clients/Individuals/<legal-name>/`.
10. Mark facts provisional unless already approved in `memory/decisions.md`.
11. Update `sources/import-log.md`.

## WhatsApp Boundary

Store WhatsApp JIDs and summarized business relevance only. Do not store raw transcripts, media, QR/session state, SQLite databases, credentials, or future-send approval in git.

## Blocking Rule

If the correct Notion DB, Drive folder, client reference, or group/external classification is unclear, record it in `memory/open-questions.md` and ask for review before filing externally.
