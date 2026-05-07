# Richmond Blackwood Codex Instructions

Status: provisional.

These instructions apply to every Codex session in this repository.

## Operating Posture

- Treat this repo as the working memory and source-controlled operating layer for Richmond Blackwood.
- Keep all RB-specific facts provisional until the user explicitly approves them.
- Preserve unsanitised context, but never store live credentials, tokens, private keys, certificate bundles, or credential dumps in git.
- Use existing RB Notion and Drive structures. Do not create replacement structures unless the user approves.
- When the destination is unclear, stop, record the uncertainty, and ask for review.

## Fact Standard

Every meaningful factual claim should include:

- `Status`: `provisional`, `approved`, or `superseded`.
- `Source`: local repo, Notion URL, Drive URL, Slack channel/message, Gmail thread, public URL, or user instruction.
- `Imported`: date of import.
- `Review`: what still needs confirmation.

## Private Data Routing

Company-specific private details must live under `clients/Companies/<client-reference>/`.

The folder name must be the exact Notion Companies `Reference` value. Do not invent slugs from company names. For now, apply this rule to company clients only.

Individual-specific private details must live under `clients/Individuals/<legal-name>/`.

The folder name must be the individual's legal name as recorded in Notion. If Notion includes middle names or initials, preserve that spelling until the user approves a shorter folder name.

Company-to-individual relationships must be represented structurally:

- Company folder: `linked-individuals.md`.
- Individual folder: `linked-companies.md`.
- Individual linked entities: `linked-entities.md`, with bank accounts, tax filings, assets, correspondence, and expenses kept in their matching individual files.

Client backup/export evidence belongs in Drive, not in git. The repo should keep pointers, source registers, and routing notes under `clients/Companies/<client-reference>/` and `clients/Individuals/<legal-name>/`.

General docs may contain pointers only, for example:

```md
Detailed client history: `clients/Companies/<client-reference>/tax-vat-filings.md`
Notion backup: <client DB/page URL>
Drive evidence: <client folder URL>
```

Non-client private company details live under `internal/`.

## Notion Routing

General SOPs, operating rules, and process docs:

- Repo: `processes/` plus supporting memory files.
- Notion: RB Internal Knowledge Base at `https://www.notion.so/181e4130131480b6ac6fff8a1379c3fc`.

Company-specific facts:

- Repo: `clients/Companies/<client-reference>/`.
- Notion: relevant database/page under Client Databases at `https://www.notion.so/Client-Databases-f272baa16c3b45069cbd896624e04b5c`.
- If the company relation is unclear, do not create the client backup page. Record the pending backup in the client folder and in `memory/open-questions.md`.

Individual-specific facts:

- Repo: `clients/Individuals/<legal-name>/`.
- Notion: relevant individual/person and client database records under Client Databases.
- If the linked company or individual identity is unclear, record the uncertainty before filing.

Richmond Blackwood follow-up tasks:

- Follow-ups that require Richmond Blackwood action must be created in the Notion Tasks database, not left only as free-text follow-up fields on communication records.
- Tasks must be linked to the relevant Notion project for the responsible company. In this repository, use the Richmond Blackwood company project unless a more specific RB project is clearly required.
- Current RB project: `Richmond Blackwood Backlog` at `https://www.notion.so/25de4130131481769758f5f2d465a141`.
- Assign the task to the right person from the request, project owner/inherited owner, established process rule, or `internal/people-roles.md`. If the assignee is unclear, stop and ask rather than creating an unowned task.

## Drive Routing

Use Drive for raw documents or evidence that does not need always-on Codex access.

- General archive folder: `https://drive.google.com/drive/folders/1eSZ263FwINQqW3oIeeRM3F1YY9cQRab5`.
- Client documents: `Richmond Blackwood -> finance and accounting -> <group or external> -> <company name>`.
- Never guess the group/external classification.

## Client Backup And Export Packages

- Use Drive as the storage layer for downloaded/exported client files.
- In git, record Drive folder/file URLs, source filenames, Notion filters, and blockers in the relevant client `drive-locations.md`, `backup-locations.md`, `source-register.md`, or domain file.
- Use find-or-create for the Drive export folder. If the expected Drive folder does not exist, create/copy it from the approved Drive template only when the client destination and group/external classification are clear.
- Retain source filenames in full, especially signed contracts.
- Mark blocked or pending downloads explicitly; do not imply a file is present when only its filename is known.
- Offboarding or external handover is separate and only runs when the user explicitly asks for it.

## Source Import Workflow

1. Register the source in `sources/source-register.md`.
2. Read the Notion company `Reference` property before creating a client folder.
3. Import general company/process knowledge into `memory/`, `processes/`, or `internal/`.
4. Import private company-client knowledge only into `clients/Companies/<client-reference>/`.
5. Import private individual-client knowledge only into `clients/Individuals/<legal-name>/`.
6. Back up general SOP/process content to the Internal Knowledge Base.
7. Back up client-specific content to the relevant client database once the destination is clear.
8. Update `sources/import-log.md` with source, date, scope, and unresolved questions.

## Helper And Connector Boundary

- Prefer app connectors for app-native workspace state: Notion records/pages, Drive/Docs reads and edits, Gmail search/read/thread context, Slack reads/drafts/sends, and SignNow supported sends/status/document operations.
- Use repo-local `npm` helpers only for connector gaps and mechanical actions: Drive local upload/export/organize, Gmail drafts that must save from `accounting@richmondblackwood.com`, generic SignNow local-file upload/field/review/status work, and explicit PDF/Google Doc transforms.
- Helper output is support material, not final business state. A task is complete only when the relevant live source of truth is updated, verified, and recorded.
- Email communication rules live in `skills/rb-gmail-drafts/SKILL.md`; email previews must show `Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>` unless the user explicitly confirms another sender. Gmail email drafting actions that touch Gmail must always use the repo-local gcloud-managed Gmail API helper path. If a Gmail draft fallback is used, it must fail closed if Gmail stores another sender.
- SignNow helpers are generic only. Do not invent RB signer identities, routing order, templates, or signing policy.
- Native Google Docs content edits should use the Google Drive/Docs connector when available. Local helpers may export/upload or apply explicit mechanical transforms only when that is the chosen supported path.
- Optional WhatsApp work must use the repo-pinned `whatsapp` MCP path for normal reads, contact search, sends, media, and voice notes. Keep WhatsApp QR/session state, SQLite databases, downloaded media, transcripts, and personal Codex config out of git. Do not send WhatsApp messages/files unless the user explicitly asks and the tool approval confirms recipient and content.

## Outbound Communications

- Draft all outbound communications in chat with the user, not as software drafts for manual send.
- Every communication preview must show the sending identity before approval. For email, always show the exact `From` name, email address, `Subject`, and source/reply thread.
- Prefer replying in the existing email thread whenever email context exists. Start a new email only when there is no relevant thread or the user explicitly asks for a new thread.
- After the user approves or explicitly asks to send, send directly through the supported connector or MCP tool.
- After sending, store the communication in the Communications database. If the database or schema is unavailable, report the blocker and record it in `memory/open-questions.md`.
- Do not create Gmail, Slack, WhatsApp, Notion, or other app drafts unless the user explicitly asks for that exception.

## Memory And Skills

- Check `skills/index.md` before specialized work and open the matching repo-local skill.
- Record meaningful skill usage in `memory/skill-runs.md`.
- Keep `memory/history.md` append-only except for formatting or obvious typo fixes in the most recent entry.
- Timestamp task entries in `memory/tasks.md`: open tasks include `Created`, completed tasks include `Completed`, and blocked tasks include `Blocked` plus `Blocker`.

## Review And PR Workflow

When applying user review suggestions:

1. Apply the requested changes.
2. Ask the user to review.
3. After the user confirms, immediately run a first review from the perspective of a senior team member relevant to the task.
4. Apply findings, structure them into appropriately named commits, and push to the current branch. If no branch exists, create one first.
5. After pushing, run a second review from the architectural perspective as the most senior member of the team.
6. Apply findings and repeat the same commit and push process.
7. When the user says all changes for a PR are complete, run relevant tests and share a PR description with the required headings.

## Repo Workflow

- Prefer small, reviewable edits.
- Keep business truth separate from working hypotheses.
- Preserve existing files and user changes.
- Run `git diff --check` before finishing.
- Run `npm run typecheck` when TypeScript helpers are present or changed.
