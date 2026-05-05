# Storage Rules

Status: provisional.
Source: user instruction on 2026-05-04 plus Notion fetches on 2026-05-04.

## Durable Rule

The repo keeps unsanitised operational context. The only excluded categories are live secrets, tokens, private keys, certificate files, credential dumps, and files whose format makes git an unsafe storage layer.

## Routing Matrix

| Knowledge type | Repo location | Notion backup | Drive location |
| --- | --- | --- | --- |
| General SOPs and process docs | `processes/` and `memory/` | RB Internal Knowledge Base | Only if large evidence or source docs are needed |
| Company-wide private history | `internal/` | RB Internal Knowledge Base if generally useful | General Drive archive if not needed all the time |
| Client-specific private history | `clients/<client-reference>/` | Relevant database/page under Client Databases | Existing RB finance/accounting client folder |
| Client offboarding/key export package | `clients/<client-reference>/Client export - <client-reference>/` | Relevant client backup/page once destination is clear | Existing client Drive folder after compliance review if approved |
| Raw documents not needed in every Codex session | Pointer in repo | Pointer in Notion where relevant | Drive archive or client Drive folder |
| Ambiguous client or filing destination | `memory/open-questions.md` | Do not write yet | Do not move or create yet |

## Client Reference Rule

Client folder names must come from Notion Companies -> `Reference`.

- Do not invent slugs from legal names.
- For now, apply this to company clients only.
- The reference is expected to match Drive files and client project names.
- If a company has no `Reference`, record the blocker and ask for review before creating the folder.

Pilot folder:

- `clients/VUN/` for VANDY UN LIMITED.

## Notion Destinations

General SOP and process destination:

- RB Internal Knowledge Base: `https://www.notion.so/181e4130131480b6ac6fff8a1379c3fc`
- Data source fetched 2026-05-04: `collection://33329c14-e5b7-4e8c-b9c8-3a0bc00e725d`

Client-specific destination hub:

- Client Databases: `https://www.notion.so/Client-Databases-f272baa16c3b45069cbd896624e04b5c`
- Client Notes & Updates data source fetched 2026-05-04: `collection://1eaa70f9-18e8-4d3e-9db1-961850935b73`
- Companies data source fetched 2026-05-04: `collection://7093d403-7026-4978-9f6e-41ab559bc599`

## Drive Destinations

General archive:

- `https://drive.google.com/drive/folders/1eSZ263FwINQqW3oIeeRM3F1YY9cQRab5`

Client-specific evidence:

- `Richmond Blackwood -> finance and accounting -> <group or external> -> <company name>`

Do not infer `<group or external>` from the client name alone. Ask for review if a source does not make it explicit.

## General Docs Must Not Duplicate Client Details

Broad process and memory files should point to private client details instead of repeating them:

```md
Detailed client history: `clients/<client-reference>/history.md`
Notion backup: `clients/<client-reference>/notion-backup.md`
Drive evidence: `clients/<client-reference>/drive-locations.md`
```

## Backup Discipline

- Every client folder keeps a `notion-backup.md`.
- If Notion backup is pending, write the reason and the exact missing decision.
- Every client folder keeps a `drive-locations.md`.
- If Drive backup is pending, write the reason and the exact missing folder/classification.
- Every client export package keeps an `export-manifest.json` and `download-log.md`.
- Client export packages can store actual downloaded/exported client files, but never live secrets, tokens, private keys, certificate bundles, or credential exports.
