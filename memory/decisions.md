# Decisions

Status: provisional.

## 2026-05-04 - Unsanitised Context In Repo

Decision: This repository keeps unsanitised operational context.

Boundaries:

- Private client-specific knowledge goes under `clients/<client-reference>/`.
- Private non-client company history goes under `internal/`.
- Live secrets, tokens, private keys, certificate files, and credential dumps remain excluded.

Source: user instruction on 2026-05-04.
Review: approved as a storage rule by user instruction; exact client Notion and Drive destinations still require review where unclear.

## 2026-05-04 - Notion And Drive Reuse

Decision: Reuse existing Notion and Drive structures.

Targets:

- General SOPs: RB Internal Knowledge Base.
- Client knowledge: Client Databases.
- Non-always-needed docs: general Drive archive.
- Client docs: current RB finance/accounting folder structure.

Source: user instruction on 2026-05-04.
Review: approved as a routing rule by user instruction; specific client mapping remains provisional.
