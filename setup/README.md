# Setup And Verification

Status: provisional.

## Required Connectors

- Notion: required for Internal Knowledge Base and Client Databases backup.
- Google Drive: required for source documents and archive/client folder routing.
- Slack: required for operational history and channel context.
- Gmail: required for accounting, invoice, and client communication context.
- SignNow: optional/generic helper support for document upload, review links, and status checks where RB uses SignNow.
- WhatsApp MCP: optional local MCP support for user-controlled WhatsApp access.
- Xero MCP: optional local MCP support for per-client Xero accounting access.
- ElevenLabs MCP: optional local MCP support for voice/audio/agent work.
- n8n MCP: optional remote MCP support for inspecting, testing, and building exposed n8n workflows.
- GitHub or local git: required for repo sync if publishing changes.

## Confirmed On 2026-05-04

- Notion connection works.
- RB Internal Knowledge Base database was fetched.
- Client Databases page was fetched.
- Client Notes & Updates database was fetched.
- Companies database was fetched.

## Local Repo Checks

Run:

```sh
git status --short --branch
npm install
npm run typecheck
git diff --check
```

Also run keyword scans for prior-template business terms before committing.

Helper smoke checks:

```sh
npm run drive:organize -- --help
npm run drive:upload -- --help
npm run drive:export-google-doc-to-drive -- --help
npm run gmail:create-alias-draft -- --help
npm run signnow:upload -- --help
npm run signnow:get-document -- --help
npm run signnow:signature-status -- --help
npm run pdf:prepare-signing-plan -- --help
```

## Local Configuration

Local-only files belong under `.codex-local/` or `.env`; both are ignored by git.

- Gmail API draft helpers use gcloud application-default OAuth with `.codex-local/google-oauth-client.json` when Google's default gcloud OAuth client is blocked for Gmail scopes.
- Do not use Gmail IMAP, app passwords, or stored mailbox passwords for repo-local helpers.
- SignNow helpers use `.env` only for local SignNow API credentials. Never commit or print those values.
- Xero MCP setup uses `.env` only for local per-client custom connection credentials. Never commit or print those values.
- Gmail client-facing drafts must save from `accounting@richmondblackwood.com` as `Richmond Blackwood Accounting Team`.

## Optional Local MCP Servers

Optional repo-pinned MCP setup guides live under `setup/mcp/`.

- WhatsApp MCP: [setup/mcp/whatsapp.md](mcp/whatsapp.md). This enables local WhatsApp Web access for reading messages, downloading media/voice notes, and sending messages/files through a user-controlled WhatsApp account. Its reusable source is pinned as a git submodule; QR login state, SQLite databases, media, and personal Codex config stay local and ignored.
- Xero MCP: [setup/mcp/xero.md](mcp/xero.md). This enables local Codex access to Xero through one static MCP server entry named `xero`, with the active client selected locally before reload. Xero client IDs, client secrets, bearer tokens, OAuth tokens, and personal Codex config stay local and ignored.
- ElevenLabs and n8n MCP: [setup/mcp/elevenlabs-n8n.md](mcp/elevenlabs-n8n.md). This enables local Codex access to the official ElevenLabs MCP server and remote n8n instance-level MCP. API keys, MCP tokens, webhook secrets, live instance URLs if private, client call transcripts, and personal Codex config stay local and ignored.
- ElevenLabs API fallback: use only when the current MCP tools cannot perform a required live edit, and only after explicit user approval for the exact production change.

Quick WhatsApp MCP install path:

```sh
git submodule update --init --recursive
brew install go
brew install ffmpeg
setup/mcp/start-whatsapp-bridge.sh start
```

Scan the QR code from WhatsApp Linked Devices if prompted, add the MCP server snippet from [setup/mcp/whatsapp.md](mcp/whatsapp.md) to `~/.codex/config.toml`, then restart or reload Codex. The background bridge log and PID are stored under `.codex-local/`.

Quick ElevenLabs and n8n MCP setup path:

```sh
which uvx
```

Add the placeholder snippets from [setup/mcp/elevenlabs-n8n.md](mcp/elevenlabs-n8n.md) to `~/.codex/config.toml`, replace the placeholders locally with the ElevenLabs API key and n8n MCP URL/token, enable MCP on the relevant n8n workflows, then restart or reload Codex.

Quick Xero MCP setup path:

```sh
cp .env.example .env
which npx
```

Add the single `xero` MCP entry from [setup/mcp/xero.md](mcp/xero.md) to `~/.codex/config.toml`. Fill one `RB_XERO_<CLIENT_REFERENCE>_CLIENT_ID` / `RB_XERO_<CLIENT_REFERENCE>_CLIENT_SECRET` block per client in `.env`, select the active client with `setup/mcp/select-xero-client.sh KONVI`, then restart or reload Codex. Every Xero request must name the exact client reference, such as `AGL`, before any Xero MCP tool is used.

For the RB calling bot runtime, select an ElevenLabs credential on n8n nodes `Make ElevenLabs Outbound Call` and `Get ElevenLabs Conversation`, then set n8n variable `ELEVENLABS_AGENT_PHONE_NUMBER_ID`. ElevenLabs SIP trunking through Twilio Elastic SIP Trunking is the default outbound path: import the SIP number in ElevenLabs and set `ELEVENLABS_AGENT_PHONE_NUMBER_ID` to that SIP phone-number ID. Set n8n variable `ELEVENLABS_OUTBOUND_CALL_PROVIDER=twilio` only for rollback to the older Twilio Native endpoint. Keep candidate Calls unapproved unless deliberately running controlled synthetic tests.

`RB Calls Live Help` also needs the n8n Slack credential to read the RB calls Slack thread. For private Slack channels, add `groups:history` to the Slack app used by the n8n credential, reinstall the app, and reconnect or refresh the credential. Without that scope, Slack replies can be visible in Slack/Codex but unreadable to n8n.

Current calling-bot startup shape: `RB Calls Voice Execution` strips raw JSON blobs before calling ElevenLabs and sends a plain-text startup brief with direct Company/Individual/Contact summaries plus tax registration/reference context. Other approved records are fetched during the call through n8n workflow `RB Calls Context Lookup`; the ElevenLabs `lookup_call_context` tool runs through the dedicated `Context Lookup Tool` workflow node (`node_rb_lookup_tool_v1`) and `Context Lookup Result` handler (`node_rb_lookup_result_v1`), so the agent should complete Notion lookup before Slack live-help escalation.

If ElevenLabs tool schema or agent workflow edits are not exposed through MCP, follow the API fallback rules in [setup/mcp/elevenlabs-n8n.md](mcp/elevenlabs-n8n.md): read first, patch narrowly, never print/store the API key, and verify by re-reading the live agent/tool state.

## Connector Safety

- Read before writing.
- Fetch database schemas before creating Notion database pages.
- Do not create client Notion pages until the company relation is clear.
- Do not create or move Drive files until the exact destination is clear.
