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

Client-specific private details must live under `clients/<client-reference>/`.

The folder name must be the exact Notion Companies `Reference` value. Do not invent slugs from company names. For now, apply this rule to company clients only.

Client export/offboarding packages live under `clients/<client-reference>/Client export - <client-reference>/`. They should contain actual downloaded/exported files where possible, with `export-manifest.json` and `download-log.md` tracking source filenames, target paths, and blockers.

General docs may contain pointers only, for example:

```md
Detailed client history: `clients/<client-reference>/tax-vat-filings.md`
Notion backup: <client DB/page URL>
Drive evidence: <client folder URL>
```

Non-client private company details live under `internal/`.

## Notion Routing

General SOPs, operating rules, and process docs:

- Repo: `processes/` plus supporting memory files.
- Notion: RB Internal Knowledge Base at `https://www.notion.so/181e4130131480b6ac6fff8a1379c3fc`.

Client-specific facts:

- Repo: `clients/<client-reference>/`.
- Notion: relevant database/page under Client Databases at `https://www.notion.so/Client-Databases-f272baa16c3b45069cbd896624e04b5c`.
- If the company relation is unclear, do not create the client backup page. Record the pending backup in the client folder and in `memory/open-questions.md`.

## Drive Routing

Use Drive for raw documents or evidence that does not need always-on Codex access.

- General archive folder: `https://drive.google.com/drive/folders/1eSZ263FwINQqW3oIeeRM3F1YY9cQRab5`.
- Client documents: `Richmond Blackwood -> finance and accounting -> <group or external> -> <company name>`.
- Never guess the group/external classification.

## Client Export Packages

- Use `processes/client-offboarding-export.schema.json` as the machine-readable manifest shape.
- Retain source filenames in full, especially signed contracts.
- Store key exported/downloaded client files inside the client-specific export package when access allows.
- Mark blocked or pending downloads explicitly; do not imply a file is present when only its filename is known.
- Require compliance review before any completed package is sent to the client.

## Source Import Workflow

1. Register the source in `sources/source-register.md`.
2. Read the Notion company `Reference` property before creating a client folder.
3. Import general company/process knowledge into `memory/`, `processes/`, or `internal/`.
4. Import private client knowledge only into `clients/<client-reference>/`.
5. Back up general SOP/process content to the Internal Knowledge Base.
6. Back up client-specific content to the relevant client database once the destination is clear.
7. Update `sources/import-log.md` with source, date, scope, and unresolved questions.

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
- Run TypeScript checks only if TypeScript helpers are present.
