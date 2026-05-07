# Import Log

Status: active.

## 2026-05-07 - Richmond Blackwood Follow-Up Task Rule

Applied:

- Added the rule that Richmond Blackwood action follow-ups must be created in the Notion Tasks database and linked to the relevant company project.
- Recorded `Richmond Blackwood Backlog` as the default project for this repository: `https://www.notion.so/25de4130131481769758f5f2d465a141`.
- Updated the communications process, client backup process, Notion operations process, communications skill, client filing skill, Notion database standards, AGENTS instructions, and handoff memory.

Verification:

- Fetched the Richmond Blackwood Backlog project and an existing linked task to confirm the Tasks data source and core task fields.

## 2026-05-07 - Entity Ownership Rule For Client Records

Applied:

- Corrected the VUN Slack closeout record in RB Communications so it is linked to VANDY UN LIMITED only.
- Updated RB Communications database guidance so each communication belongs to either a company or an individual, not both.
- Added the same either/or ownership rule for communications, bank accounts, assets, and expenses to the client backup process, client filing skill, communications process, communications skill, Notion database standards, storage rules, and client templates.

Verification:

- Directly fetched the VUN Slack closeout record to confirm it is company-only in RB Communications.

## 2026-05-07 - RB Communications Database Correction

Applied:

- Created the canonical `RB Communications` database under RB Client Databases: `https://www.notion.so/c931b1b88ff6412a96c74bd9933da19c`.
- Added company and individual relation fields so each communication record can belong to either a company or an individual, not both.
- Added table views for all communications, by company, by individual, and follow-ups.
- Moved the VUN Slack closeout communication record out of the Everguard/research Communications table and into RB Communications.
- Linked the moved VUN Slack closeout record to VANDY UN LIMITED only because it is a company-operational closeout.
- Updated communication process rules so future RB communication logging uses RB Communications only, with a single owning entity relation.

Verification:

- Directly fetched the new RB Communications database and moved VUN Slack closeout record.
- Directly fetched the moved record to confirm its new RB Communications parent and company-only relation.

## 2026-05-07 - VUN Personal Tax Task Split And Filing Follow-Ups

Applied:

- Narrowed the VUN 2023 + 2024 VAT/tax analysis task in Notion.
- Kept the 2025 personal tax analysis as a separate Notion task because it has a separate spreadsheet/source set.
- Added review comments to the Notion analysis tasks so progress is visible inside Notion.
- Created separate 2023 + 2024 and 2025 personal tax filing follow-up tasks in Notion, assigned to Johnpaul Okolie.
- Set `Dependent on` on each filing follow-up task to the relevant analysis task and added dependency comments.
- Added task-comment and filing-follow-up standards to the client backfill and personal tax process rules.
- Updated VUN and Nathan local routing files to reflect the Notion task changes.

Verification:

- Fetched the updated Notion analysis tasks and new filing tasks to confirm comments, assignment, labels, and VUN project relation.

Follow-up:

- Filing task completion still needs filing evidence before any filed status is recorded.

## 2026-05-07 - VUN Task And Correspondence History Refresh

Applied:

- Fetched the VUN company record, client project, linked task records, and linked correspondence records from Notion.
- Updated VUN task history in `clients/Companies/VUN/client-project.md`, separating active/review tasks, completed/historical tasks, and deleted task records.
- Updated VUN correspondence history in `clients/Companies/VUN/communications.md`, replacing the unresolved link list with dated summaries.
- Added a task/correspondence timeline to `clients/Companies/VUN/history.md`.
- Registered the source pass in `clients/Companies/VUN/source-register.md`.
- Added standard Slack closeout reporting to `processes/knowledge-backup-and-source-control.md` and `skills/rb-client-file/SKILL.md`.
- Sent and corrected the requested closeout in `#rb-client-updates`: `https://eipventuresworkspace.slack.com/archives/C0B1UTJJDLJ/p1778160684561399`.
- Logged the closeout in RB Communications: `https://www.notion.so/359e4130131481c2aa5aed36559669d0`.

Verification:

- Direct Notion page fetches completed for all linked VUN project tasks and company correspondence records.
- `git diff --check` passed.

Follow-up:

- Future task/correspondence refreshes should use the most reliable available Notion read path and keep Slack closeouts Notion-facing.
- Individual-specific personal insolvency and personal tax details may need further routing under `clients/Individuals/Nathan Mawali A Vandy/`.

## 2026-05-05 - WhatsApp Inbound Monitoring Process

Applied:

- Added a manual-run WhatsApp inbound monitoring process with checkpoint, correspondence, task, Slack notification, and blocker handling.
- Added `rb-whatsapp-inbound-monitor` as a repo-local skill and registered it in the skills index.
- Added the WhatsApp Monitoring Checkpoints pattern to VUN communications from setup time, without historical backfill.
- Recorded inbound task assignment defaults in `internal/people-roles.md`.
- Included the local WhatsApp bridge hardening patch in scope: localhost binding by default, configurable host/port, and local Go build caches under `.codex-local/`.

Verification:

- `bash -n setup/mcp/start-whatsapp-bridge.sh` passed.
- `git diff --check` passed.
- Submodule `git diff --check` passed.
- WhatsApp bridge `go test ./...` passed with repo-local Go caches.
- WhatsApp MCP server Python compile passed with repo-local pycache.
- Skill metadata and `skills/index.md` registration were inspected.
- Dry-run scenario coverage was checked in the process document.

Open questions:

- Confirm Eran Peer role/relationship to VUN and preferred-contact status.
- Confirm Notion file-property upload support before the first live run.
- Confirm assignment defaults with the team before approving automation.

## 2026-05-05 - Neutral Operating Infrastructure Port

Imported:

- Root npm/TypeScript helper structure from neutral source patterns.
- Generic Drive, Gmail, Google auth, SignNow, Google Doc transform, PDF signing-plan, and task PR helpers.
- Repo-local skills for helper workflows and memory/skill-run closeout.
- Memory/process docs for Notion standards, file uploads, repo operation, setup/access, and signatures/Gmail.

Adapted:

- Gmail sender defaults to `accounting@richmondblackwood.com`.
- Gmail display/signoff identity defaults to `Richmond Blackwood Accounting Team`.
- Drive docs point to RB general archive and existing RB finance/accounting client folder routing.
- SignNow helpers remain generic mechanics only; no RB signer identity or template policy was invented.

Excluded:

- Source-company auctions, bonds, physical/digital/financial workflows, client names, asset names, seller/buyer confidentiality rules, controlled-sharing rules, and source Notion/Drive IDs.

Verification:

- `npm install` completed with an `@signnow/api-client` engine warning on Node 18.7.0 and four high-severity npm audit findings.
- `npm run typecheck` passed.
- Helper `--help` smoke checks passed.
- `git diff --check` passed.
- Forbidden source carryover scans passed.

## 2026-05-05 - WhatsApp MCP Port

Imported:

- Optional `third_party/whatsapp-mcp` submodule pinned at compatibility commit `018ea770ca9524c43000910ada7611fa1a503fe6`.
- WhatsApp MCP setup guide under `setup/mcp/whatsapp.md`.
- Persistent local bridge helper under `setup/mcp/start-whatsapp-bridge.sh`.
- RB WhatsApp communications skill under `skills/rb-whatsapp-comms/`.
- Communication process/routing rules for WhatsApp reads, sends, media, voice notes, private-data handling, and follow-up capture.

Adapted:

- Removed source-company Communications database, client-record, controlled-sharing, and business-workflow assumptions.
- Replaced source repo paths with RB repo paths.
- Renamed LaunchAgent label to `com.richmondblackwood.whatsapp-bridge`.
- Kept WhatsApp logging destination provisional and routed facts to existing RB client/internal structures only when clear.

Excluded:

- WhatsApp QR/session state, SQLite databases, media, transcriptions, private chat content, test-message details, source company contacts, and source Notion/Drive IDs.

Verification:

- Submodule status confirmed the pinned compatibility commit.
- Bridge script shell syntax passed.
- Go bridge test passed after sandbox escalation for Go build-cache writes.
- Python compile check passed for the MCP server.
- TypeScript check passed.
- `git diff --check` passed.
- Source-specific business keyword scan passed.

Open questions:

- Confirm the RB WhatsApp account/number.
- Superseded on 2026-05-07 when RB Communications was created under RB Client Databases.
- Confirm whether optional WhatsApp MCP should be enabled for all operators or only local Codex workstations.

## 2026-05-05 - WhatsApp Chat ID Filing Process

Applied:

- Added a reusable process for saving WhatsApp chat IDs as client communication pointers.
- Mirrored the workflow into `skills/rb-whatsapp-comms/SKILL.md`.
- Filed the selected VUN WhatsApp chat ID pointer in `clients/Companies/VUN/communications.md`.

Verification:

- `git diff --check` passed.

Open questions:

- Confirm Eran Peer role/relationship to VUN and whether the selected chat ID is the preferred VUN WhatsApp contact.

## 2026-05-05 - VUN And Individual Routing Recovery

Applied:

- Adopted `origin/main` as the workflow/memory/skills authority after PR #1 merged.
- Created recovery branch `codex/vun-client-routing-backup` from `origin/main`.
- Migrated the client tree to `clients/Companies/<client-reference>/` and `clients/Individuals/<legal-name>/`.
- Kept VUN as the active company pilot and Nathan Mawali A Vandy as the active individual pilot.
- Left newly created process files stashed for later review, per user instruction not to commit new process files yet.

Verification:

- `git diff --check` passed.
- `git diff --cached --check` passed.
- `npm run typecheck` passed using installed Node 18.17.1 because the repo-pinned Node 18.7.0 is not installed locally.
- Branch pushed and draft PR opened: `https://github.com/IoanaBob/richmond-blackwood-codex/pull/2`.

Correction:

- The VUN binary evidence commit was later removed from the PR branch history after user review. Downloaded/exported client evidence should live in Drive, with git retaining pointers and blockers only.

## 2026-05-05 - Review Prompt Application

Applied:

- Added client-reference rule: client folders use Notion Companies `Reference`.
- Created active VUN pilot folder at `clients/Companies/VUN/`.
- Imported VUN company, individual, project, dashboard, Drive, and personal tax filing context.
- Added review and PR workflow process from `setup/review-prompts.md`.

Notion general backup created:

- RB Client Reference Folder Standard: `https://www.notion.so/357e41301314812e9e8fdfd53073359e`
- RB Review And PR Workflow: `https://www.notion.so/357e4130131481029be3d17a8ec2eb8b`

Blocked:

- `setup/pending-prompts.md` was referenced by the review prompt but not present on disk.
- Broad deletion of `clients/` was blocked by the sandbox safety reviewer; older name-derived folders remain pending explicit deletion review.
- VUN supplied Drive folder listed no files and metadata lookup by ID returned not found.

## 2026-05-04 - Initial Repo Build

Imported:

- User-approved storage rules from current conversation.
- Existing Notion destination schemas.
- Prior RB memory from local `my-memory`.
- Local landing and backend architecture summaries.
- Slack, Gmail, and Drive search summaries from initial exploration.
- Initial private client fragments into `clients/Companies/<client-reference>/`.

Notion general backup created:

- RB Codex Repository Operating Rules: `https://www.notion.so/356e41301314811383fff7212a56a0cd`
- RB Codex Process Map - Provisional: `https://www.notion.so/356e41301314814ab294c21a6eb6d063`
- RB Codex Source Register And Backup Routing: `https://www.notion.so/356e41301314817b9b46e38a767f5735`

Correction:

- Earlier non-VUN provisional client backup references were removed because the referenced pages/folders were incorrect. Non-VUN client imports must be redone directly from Notion Companies `Reference` records.

Not imported yet:

- Full Slack channel histories.
- Full Gmail threads.
- Full Drive document contents.
- Full Notion client records.
- Raw credential or secret files.

Open routing blockers:

- Client company relation mapping in Notion.
- Client Drive group/external classification.
- Whether client notes should be backed up as one summary per client or per domain database.

## Verification Notes

All RB-specific imported facts remain provisional.

Checks run 2026-05-04:

- `git diff --check`: clean.
- Markdown trailing whitespace scan: clean.
- Prior-template business keyword scans: clean.
- Client backup-marker scan: clean.
- TypeScript check skipped because no TypeScript helpers were retained.
