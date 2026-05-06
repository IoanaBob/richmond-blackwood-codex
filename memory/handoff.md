# Handoff

Status: active.
Imported: 2026-05-04.

## Next Session

1. Read `AGENTS.md`, `memory/storage-rules.md`, and `memory/current-state.md`.
2. Skim `memory/history.md` and `memory/skill-runs.md`.
3. Check `skills/index.md` before using repo-local helpers.
4. Review the active VUN company pilot in `clients/Companies/VUN/` and the linked individual pilot in `clients/Individuals/Nathan Mawali A Vandy/`.
5. Resolve `memory/open-questions.md` before creating client Notion pages or Drive folders.
6. Use Notion Companies `Reference` for company folders and Notion legal names for individual folders; do not invent slugs.
7. For growth work, use `internal/growth-sales-marketing.md` and `internal/marketing-creative-review.md`; HubSpot/API account analysis is on-demand only.
8. For WhatsApp work, read `setup/mcp/whatsapp.md` and `skills/rb-whatsapp-comms/SKILL.md` first.

## Caution

Do not mark provisional facts approved without explicit user review.

Do not move or create Drive client documents until group/external classification and company folder are confirmed.

Do not resurrect earlier incorrect non-VUN client backup references. Redo each non-VUN client from the Notion Companies `Reference` property.

New process files from the pre-rebase work are intentionally stashed and should be restored only after review.

Repo-local helpers now exist. Gmail drafts must use `accounting@richmondblackwood.com` as `Richmond Blackwood Accounting Team`. SignNow helpers are generic only; do not infer RB signer identity or signing policy.

Optional WhatsApp MCP is ported but provisional. Use `setup/mcp/start-whatsapp-bridge.sh` only to manage the local bridge and use the `whatsapp` MCP tools for normal WhatsApp reads/sends. Do not commit QR/session state, SQLite databases, downloaded media, transcripts, or personal Codex config. Do not send WhatsApp messages/files without explicit user instruction and tool approval.

## Verification

Last checked 2026-05-04:

- `git diff --check` passed.
- Markdown trailing whitespace scan passed.
- Prior-template business keyword scans passed.

Neutral infrastructure port verification on 2026-05-05:

- `npm install` completed with an `@signnow/api-client` engine warning on Node 18.7.0 and four high-severity npm audit findings.
- `npm run typecheck` passed.
- Helper smoke checks passed.
- `git diff --check` passed.
- Forbidden source carryover scans passed.

WhatsApp MCP port verification on 2026-05-05:

- Submodule status confirmed the pinned compatibility commit.
- `bash -n setup/mcp/start-whatsapp-bridge.sh` passed.
- `go test ./...` passed in `third_party/whatsapp-mcp/whatsapp-bridge` after sandbox escalation for Go build-cache writes.
- `python3 -m py_compile main.py whatsapp.py audio.py` passed in the MCP server.
- `npm run typecheck` passed.
- `git diff --check` passed.
- Source-specific business keyword scan passed.
