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
9. For outbound communications, use `skills/rb-communications/SKILL.md`.
10. For client history refreshes, use `skills/rb-client-file/SKILL.md`; after changing repo files, send `#rb-client-updates` a Notion-facing closeout listing only what was added or modified in Notion.

## Caution

Do not mark provisional facts approved without explicit user review.

Do not move or create Drive client documents until group/external classification and company folder are confirmed.

Do not resurrect earlier incorrect non-VUN client backup references. Redo each non-VUN client from the Notion Companies `Reference` property.

New process files from the pre-rebase work are intentionally stashed and should be restored only after review.

Repo-local helpers now exist. Use `rb-gmail-drafts` for email-specific sender, thread, signoff, and verified Gmail draft fallback rules. Gmail email drafting actions that touch Gmail must always use the repo-local gcloud-managed Gmail API helper path. SignNow helpers are generic only; do not infer RB signer identity or signing policy.

Optional WhatsApp MCP is ported but provisional. Use `setup/mcp/start-whatsapp-bridge.sh` only to manage the local bridge and use the `whatsapp` MCP tools for normal WhatsApp reads/sends. Do not commit QR/session state, SQLite databases, downloaded media, transcripts, or personal Codex config. Do not send WhatsApp messages/files without explicit user instruction and tool approval.

Outbound communication drafting happens in chat. Always show the sender identity before approval, including exact `From` name, email address, `Subject`, and source/reply thread for email when thread context exists. Prefer replying in the existing email thread whenever email context exists. After approval, send directly through the supported connector/MCP tool and log the sent communication in RB Communications (`https://www.notion.so/c931b1b88ff6412a96c74bd9933da19c`, data source `collection://3b849ad0-96b7-4972-a1ac-1a0203300e7b`). Do not use the Everguard/research Communications table for RB records. Software drafts are exception-only.

WhatsApp chat IDs may be saved as client communication pointers only after resolving the contact through the MCP tools and disambiguating any multiple matches with the user. File company-client pointers under `clients/Companies/<client-reference>/communications.md`, add a matching client source-register row, and keep the pointer provisional until the contact relationship and preferred-contact status are confirmed.

Manual WhatsApp inbound monitoring now has a provisional process and skill. Use `skills/rb-whatsapp-inbound-monitor/SKILL.md` only when the user explicitly asks to check a saved client chat. For VUN, the saved Eran Peer chat checkpoint starts at 2026-05-05 23:41 IST with no historical backfill; first live run should inspect only messages after that checkpoint and store the latest inspected message ID after successful handling.

VUN task and correspondence history was refreshed on 2026-05-07 from direct Notion page fetches. Future per-client backfills may need direct fetches when bulk Notion export is unavailable.

Connected follow-up tasks should use `Dependent on` on the follow-up task when the follow-up cannot start until the initial task is complete. Use `Is blocking` on the initial task only when that direction is clearer in the existing workflow.

Richmond Blackwood action follow-ups should be created in the Notion Tasks database and linked to the responsible company project. In this repository, use `Richmond Blackwood Backlog` (`https://www.notion.so/25de4130131481769758f5f2d465a141`) unless a more specific RB project is clearly required. Assign the task to the right person from the request, project owner/inherited owner, established process rule, or `internal/people-roles.md`; ask if ownership is unclear.

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
