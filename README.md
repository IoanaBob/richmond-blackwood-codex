# Richmond Blackwood Codex

Status: provisional until reviewed by Richmond Blackwood leadership.

This repository is the Codex-native operating memory for Richmond Blackwood. It keeps working knowledge, process maps, source registers, handoffs, and client history in a shape that future Codex sessions can read quickly and maintain safely.

This repo intentionally keeps unsanitised operational context. Live secrets, credentials, tokens, private keys, certificate files, and credential dumps are excluded and must stay outside git.

## Startup Protocol

1. Inspect `git status --short --branch`, run `git pull origin main`, and create or switch to a new `codex/<task-slug>` branch before repository-changing or live-state-changing work.
2. If the tree is dirty or the pull creates conflicts, classify changes by task ownership, split task-owned changes into relevant commits and PRs, and report PR URLs or blockers before continuing from a clean updated base.
3. Read [AGENTS.md](/Users/ioana/Documents/Codebases/richmond-blackwood-codex/AGENTS.md).
4. Read [memory/storage-rules.md](/Users/ioana/Documents/Codebases/richmond-blackwood-codex/memory/storage-rules.md).
5. Read [memory/current-state.md](/Users/ioana/Documents/Codebases/richmond-blackwood-codex/memory/current-state.md).
6. Skim [memory/history.md](/Users/ioana/Documents/Codebases/richmond-blackwood-codex/memory/history.md) and [memory/skill-runs.md](/Users/ioana/Documents/Codebases/richmond-blackwood-codex/memory/skill-runs.md).
7. Check [memory/open-questions.md](/Users/ioana/Documents/Codebases/richmond-blackwood-codex/memory/open-questions.md) before filing client or Drive evidence.
8. Check [sources/import-log.md](/Users/ioana/Documents/Codebases/richmond-blackwood-codex/sources/import-log.md) before importing a source twice.
9. For company client work, first read the company `Reference` in Notion, then read the relevant folder under `clients/Companies/<client-reference>/`. For individual work, use the Notion legal name and `clients/Individuals/<legal-name>/`.

## Workspace Actor And Mailboxes

Set the active local workspace actor in ignored `.env.local` when a run needs operator-specific approval, authorship, source-access attribution, Notion assignment, Slack/WhatsApp routing attribution, or closeout context:

```text
RB_WORKSPACE_ACTOR="Ioana Surdu-Bob"
RB_CODEX_ACTOR="Ioana Surdu-Bob"
```

`RB_WORKSPACE_ACTOR` is the preferred name. `RB_CODEX_ACTOR` remains a compatibility alias for older instructions and scratch scripts. Valid actor names are recorded in [internal/people-roles.md](/Users/ioana/Documents/Codebases/richmond-blackwood-codex/internal/people-roles.md). The actor is a human name, not an email address. Shared mailboxes such as `accounting@richmondblackwood.com` are source mailboxes or sending identities, never actors.

Google auth personas are separate again: they are credential routes under the shared global Codex store `~/.codex/google-personas/`, not actors, source mailboxes, or senders by themselves. See [memory/google-auth.md](/Users/ioana/.codex/worktrees/5364/richmond-blackwood-codex/memory/google-auth.md) and [setup/google-persona-auth.md](/Users/ioana/.codex/worktrees/5364/richmond-blackwood-codex/setup/google-persona-auth.md).

For Gmail work, record these separately in packets and previews:

- `Operator`: human workspace actor from `RB_WORKSPACE_ACTOR` or legacy `RB_CODEX_ACTOR`.
- `Source mailbox(es)`: exact mailbox(es) searched/read.
- `From`: exact sender for drafts, sends, and replies.
- `Thread/source`: Gmail thread/message ID or source summary.

## Storage Rules

General SOPs and process knowledge:

- Repo location: `processes/` and `memory/`.
- Notion backup: RB Internal Knowledge Base at `https://www.notion.so/181e4130131480b6ac6fff8a1379c3fc`.

Client-specific knowledge:

- Repo location: `clients/Companies/<client-reference>/`.
- Folder name: exact Notion Companies `Reference` value, not an invented slug.
- Individual-specific repo location: `clients/Individuals/<legal-name>/`.
- Notion backup: relevant page or database under `https://www.notion.so/Client-Databases-f272baa16c3b45069cbd896624e04b5c`.
- Broad docs must link to the client folder instead of repeating private detail.

Documents that do not need always-on Codex access:

- Drive archive: `https://drive.google.com/drive/folders/1eSZ263FwINQqW3oIeeRM3F1YY9cQRab5`.

Client-specific Drive documents:

- Use existing Drive structure only: `Richmond Blackwood -> finance and accounting -> <group or external> -> <company name>`.
- If `<group or external>` or `<company name>` is unclear, record the uncertainty in `memory/open-questions.md` and ask for review before writing or moving files.

## Review Policy

Every Richmond Blackwood fact imported into this repo is marked provisional unless explicitly approved by the user. Approval should be recorded in [memory/decisions.md](/Users/ioana/Documents/Codebases/richmond-blackwood-codex/memory/decisions.md) and in the relevant file.

## Repository Map

- `memory/`: durable company-wide memory, rules, decisions, tasks, and open questions.
- `processes/`: process map and SOP mirror.
- `clients/`: unsanitised per-client history and evidence pointers.
- `internal/`: non-client private company history.
- `sources/`: source register, import log, and connector boundaries.
- `skills/`: repo-local Codex skills adapted for RB work.
- `setup/`: connector setup and verification.
- `third_party/`: pinned external helper sources such as the optional WhatsApp MCP submodule.

## Local Helper Layer

The root `package.json` is the local helper registry. Helpers are support tools for connector gaps and validation, not business workflow engines.

Common checks:

```sh
npm install
npm run typecheck
npm run drive:organize -- --help
npm run gmail:create-alias-draft -- --help
npm run signnow:upload -- --help
```

Gmail drafts default to `Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>`, must use the repo-local Gmail API helper path with shared global Codex auth storage for drafting actions, and must fail closed if Gmail stores another sender. Do not assume Gmail reads come from accounting only; a job may read accounting and personal/operator mailboxes in the same day when each source mailbox is explicit and labelled.

Google helper auth defaults to no-login/no-reauth and uses shared global Codex storage under `~/.codex`: per-persona OAuth vault first, then saved ADC/account-token fallback. Interactive Google auth must be explicitly approved for the exact persona.

SignNow helpers are generic mechanics only; RB signer identity, routing order, and template policy remain provisional until approved.

## Communications Rule

Outbound communications are drafted in chat with Codex, not as software drafts. Every preview must show the sending identity; for email, always show the exact `From` name, email address, `Subject`, source mailbox, and source/reply thread. Email should reply in the existing thread whenever context exists. After approval, Codex should send directly through the supported connector or MCP tool and store the sent communication in the Communications database.

## Optional MCP Layer

WhatsApp MCP setup is documented in [setup/mcp/whatsapp.md](/Users/ioana/Documents/Codebases/richmond-blackwood-codex/setup/mcp/whatsapp.md). It is optional and local-only: QR/session state, SQLite databases, downloaded media, transcripts, and personal Codex config must not be committed.

Normal WhatsApp work should use the `whatsapp` MCP tools after the bridge is running. The bridge can be started with:

```sh
setup/mcp/start-whatsapp-bridge.sh start
```

Do not create a new RB Communications database or send WhatsApp messages/files without explicit user approval.

## Notion Backup Status

Notion is connected. The RB Internal Knowledge Base and Client Databases hub have been fetched and recorded in [sources/source-register.md](/Users/ioana/Documents/Codebases/richmond-blackwood-codex/sources/source-register.md).

General SOP/process backup pages created in the RB Internal Knowledge Base:

- RB Codex Repository Operating Rules: `https://www.notion.so/356e41301314811383fff7212a56a0cd`
- RB Codex Process Map - Provisional: `https://www.notion.so/356e41301314814ab294c21a6eb6d063`
- RB Codex Source Register And Backup Routing: `https://www.notion.so/356e41301314817b9b46e38a767f5735`
- RB Client Reference Folder Standard: `https://www.notion.so/357e41301314812e9e8fdfd53073359e`
- RB Review And PR Workflow: `https://www.notion.so/357e4130131481029be3d17a8ec2eb8b`
- RB Growth Channels And Creative Review: `https://www.notion.so/357e413013148193ab2ff5a48d9aeb8a`
- RB Authority Calling Service Positioning: `https://www.notion.so/357e4130131481d182d9c138fc228e1e`
- RB Product Offerings Pricing And Bundles - Provisional: `https://www.notion.so/357e4130131481618a54c0346ebfd300`
- RB TCSP Authorisation Grant Date: `https://www.notion.so/357e41301314818eb78fe5bd228e7533`

Client-specific backup remains pending where the exact company relation or target database needs review.
