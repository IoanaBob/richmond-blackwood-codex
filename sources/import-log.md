# Import Log

Status: active.

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

## 2026-05-05 - Review Prompt Application

Applied:

- Added client-reference rule: client folders use Notion Companies `Reference`.
- Created active VUN pilot folder at `clients/VUN/`.
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
- Initial private client fragments into `clients/<client-reference>/`.

Notion general backup created:

- RB Codex Repository Operating Rules: `https://www.notion.so/356e41301314811383fff7212a56a0cd`
- RB Codex Process Map - Provisional: `https://www.notion.so/356e41301314814ab294c21a6eb6d063`
- RB Codex Source Register And Backup Routing: `https://www.notion.so/356e41301314817b9b46e38a767f5735`

Superseded note: Notion client backup was created in Client Notes & Updates for exact company matches before the client-reference review instruction:

- CBMAX: `https://www.notion.so/356e413013148123b1fff0e8de5c3c4f`
- Monochromatic: `https://www.notion.so/356e4130131481ae908df5ad201b9082`
- Techpacito: `https://www.notion.so/356e41301314811783a3c755a0c1caba`
- Agile Lincs: `https://www.notion.so/356e413013148130b78ec75395dbb232`
- Pacheco Cruz Limited: `https://www.notion.so/356e413013148142aa57e716cc89ecb6`
- Ana Kova Studio: `https://www.notion.so/356e4130131481868586f20bb01a41b7`

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
