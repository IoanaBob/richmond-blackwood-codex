# Current State

Status: provisional.
Imported: 2026-05-04.
Updated: 2026-05-06.

## Repo State

This repository was initialized as the Richmond Blackwood Codex operating repository. The structure has been rebuilt for RB rather than carrying over business-specific content from the reference format.

Current implementation includes:

- Durable storage rules.
- RB process map and SOP mirror.
- Source register and import log.
- Root npm/TypeScript helper layer with Drive, Gmail, generic SignNow, Google Doc transform, PDF signing-plan, and task PR helper scripts.
- Company profile, service positioning, systems context, and internal history.
- Product offerings, pricing signals, historical bundles, and emerging offer catalogue at `internal/product-offerings.md`.
- Reference-based client folder pilot under `clients/Companies/VUN/`.
- VUN/Nathan evidence pointer structure; downloaded/exported client evidence should live in Drive, not git.
- Individual client root pilot under `clients/Individuals/Nathan Mawali A Vandy/`.
- Repo-local skills for RB source research, memory capture, process maintenance, file uploads, Google auth, Gmail drafts, generic signing helpers, signature status sync, task PR, and handoff.
- Optional WhatsApp MCP setup with a pinned `third_party/whatsapp-mcp` submodule, background bridge helper, setup guide, and `rb-whatsapp-comms` skill.
- Communications rule: draft outbound communication in chat, always show sender identity, always show `Subject` and source/reply thread for email, prefer replying in existing email threads, send directly after approval, and log to the Communications database.

## Helper State

The root `package.json` is the local helper registry. Helper scripts are low-level support for connector gaps and verification, not business workflow engines.

Available helper areas:

- Drive organize/upload/export: `skills/rb-file-uploads/scripts/`.
- Gmail sender/thread/signoff rules and verified draft fallback: `skills/rb-gmail-drafts/`.
- Google auth: `skills/rb-google-auth/scripts/`.
- Generic SignNow upload/field/review/status: `skills/rb-signature-workflow/scripts/` and `skills/rb-signature-status-sync/scripts/`.
- Google Doc and PDF mechanical transforms: `drive:transform-google-doc` and `pdf:prepare-signing-plan`.
- Task PR helper: `skills/rb-task-pr/scripts/task_pr.sh`.
- Optional WhatsApp MCP bridge: `setup/mcp/start-whatsapp-bridge.sh`.

Gmail drafts default to `Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>`, always use the repo-local gcloud-managed Gmail API helper path for Gmail drafting actions, and fail closed if Gmail stores another sender.

SignNow helpers are generic mechanics only. RB signer identity, routing order, template catalog, and signing policy are not approved by this port.

WhatsApp MCP is optional and local-only. QR/session state, SQLite databases, downloaded media, transcripts, and personal Codex config must not be committed. Normal WhatsApp reads/sends should use the `whatsapp` MCP tools, not direct REST or SQLite access.

Normal outbound communication should not use software drafts. Compose in chat, show the sender identity, always show `Subject` and source/reply thread for email, prefer replying in existing email threads, send directly through the supported connector/MCP tool after approval, and store the sent communication in the Communications database. The canonical Communications database URL/schema still needs confirmation.

## Notion State

Notion is connected.

Fetched and confirmed:

- RB Internal Knowledge Base database.
- Client Databases hub.
- Client Notes & Updates database.
- Companies database.

General SOP/process backup pages created in the RB Internal Knowledge Base:

- RB Codex Repository Operating Rules: `https://www.notion.so/356e41301314811383fff7212a56a0cd`
- RB Codex Process Map - Provisional: `https://www.notion.so/356e41301314814ab294c21a6eb6d063`
- RB Codex Source Register And Backup Routing: `https://www.notion.so/356e41301314817b9b46e38a767f5735`
- RB Client Reference Folder Standard: `https://www.notion.so/357e41301314812e9e8fdfd53073359e`
- RB Review And PR Workflow: `https://www.notion.so/357e4130131481029be3d17a8ec2eb8b`
- RB Growth Channels And Creative Review: `https://www.notion.so/357e413013148193ab2ff5a48d9aeb8a`
- RB Authority Calling Service Positioning: `https://www.notion.so/357e4130131481d182d9c138fc228e1e`
- RB Client Offboarding Export Package Rule: `https://www.notion.so/357e41301314810a8be3e30267c35ea6`
- RB Product Offerings Pricing And Bundles - Provisional: `https://www.notion.so/357e4130131481618a54c0346ebfd300`
- RB TCSP Authorisation Grant Date: `https://www.notion.so/357e41301314818eb78fe5bd228e7533`

Client-specific backups use the company `Reference` from Notion Companies. Do not invent client folder slugs.

Earlier non-VUN provisional client backup references were removed because the referenced pages/folders were incorrect. Redo non-VUN client imports only after reading the Notion Companies `Reference` property and confirming the correct destination.

VUN active pilot source records:

- Company: `https://www.notion.so/175e41301314801eaa61ce1977979936`
- Individual / UBO / director: `https://www.notion.so/182e4130131480cead22dd69fd3f2dc7`
- Client project: `https://www.notion.so/32fe41301314802fb985c5fc39d9e3eb`
- Client dashboard: `https://www.notion.so/1c1e41301314811fb006f5721365780d?v=1c1e41301314816abda0000ca16f7f3e`
- Supplied Drive folder: `https://drive.google.com/drive/folders/1R93FDUsJ6WH2U1Bi_G5TdywAW5xFaFbR`

VUN client evidence storage:

- Repo pointers: `clients/Companies/VUN/backup-locations.md` and `clients/Companies/VUN/drive-locations.md`
- Status: the mistaken git-held export package was removed from the PR branch history. Actual downloaded/exported evidence should be uploaded to or located in Drive and linked from repo files.

Nathan Mawali A Vandy individual root:

- Repo folder: `clients/Individuals/Nathan Mawali A Vandy/`
- Linked company: `clients/Companies/VUN/linked-individuals.md`
- Status: personal correspondence, bank account, assets, expenses, legal/solvency, and personal tax filing context found during the VUN pass has been routed into the individual folder.

## Drive State

General Drive archive folder URL is known. The VUN folder supplied by the user listed no files through the connector, and metadata lookup returned not found. Drive writes remain blocked pending review of access and group/external classification.

The Notion offboarding export task is treated as a historical source for the backup/offboarding split. Recurring backup/export evidence belongs in Drive; offboarding zips are created only when explicitly requested for external handover.

## Review State

All imported RB facts are provisional. Review questions are tracked in [open-questions.md](/Users/ioana/Documents/Codebases/richmond-blackwood-codex/memory/open-questions.md).

The VUN client-reference pass is awaiting user review before senior review, commit, and push workflow starts.

## Verification State

Checks run 2026-05-04:

- `git diff --check`: clean.
- Markdown trailing whitespace scan: clean.
- Prior-template business keyword scans: no remaining matches.
- Client files include Notion backup markers.
- Secret keyword scan only found policy text saying live secrets/tokens/private keys must not be committed.
- TypeScript check skipped because no TypeScript helpers or `package.json` were retained at that time.

Checks run for the 2026-05-05 neutral infrastructure port:

- `npm install`: completed; the final install after removing IMAP/mail-composer dependencies reported zero vulnerabilities and still reported an `@signnow/api-client` engine warning on Node 18.7.0.
- `npm run typecheck`: passed.
- Helper smoke checks passed for Drive organize/upload/export, Gmail alias draft, SignNow upload/get/update/review/status, Google Doc transform, and PDF signing plan.
- `git diff --check`: clean.
- Forbidden source carryover scans found no matches for source company/client/asset names, source sender addresses, source Notion/Drive IDs, or controlled-sharing terminology.

Checks run for the 2026-05-05 WhatsApp MCP port:

- `git submodule status third_party/whatsapp-mcp`: confirmed the pinned compatibility commit.
- `bash -n setup/mcp/start-whatsapp-bridge.sh`: passed.
- `go test ./...` in `third_party/whatsapp-mcp/whatsapp-bridge`: passed after rerunning outside the sandbox so Go could write to its build cache.
- `python3 -m py_compile main.py whatsapp.py audio.py` in the MCP server: passed.
- `npm run typecheck`: passed.
- `git diff --check`: clean.
- Source-specific business keyword scan found no matches outside intentional source-repo references.

Checks run for the 2026-05-06 direct-send communications rule:

- `npm run typecheck`: passed.
- `git diff --check`: clean.
- Gmail draft/delete helper `--help` smoke checks passed.
- Source-specific/conflicting-rule and stale auth-default scans found no problematic matches; remaining IMAP/app-password mentions are intentional prohibitions.

Checks run for the 2026-05-05 VUN recovery branch:

- `git diff --check`: clean.
- `git diff --cached --check`: clean.
- The mistaken VUN git-held evidence commit was removed from the PR branch history before force-push.
- `npm run typecheck`: passed using installed Node 18.17.1 because the repo-pinned Node 18.7.0 is not installed locally.
- Branch pushed and draft PR opened: `https://github.com/IoanaBob/richmond-blackwood-codex/pull/2`.
