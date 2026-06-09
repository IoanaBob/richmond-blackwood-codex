# Setup And Access

Status: provisional.
Source: neutral setup boundary ported from local `everguard-research-codex`, adapted to RB helpers.
Imported: 2026-05-05.
Review: confirm whether SignNow is an active RB tool before requiring it for all operators.

## Purpose

Keep setup documentation limited to human setup: local tools, connector authentication, local credential-file placement, and health checks.

## Required Local Tools

- Git and GitHub CLI.
- Node.js `v18.7.0` and npm.
- Google Cloud CLI.
- Python 3 when document or validation tooling needs it.
- Poppler PDF tools when PDF inspection/rendering is needed.
- Go, `uv`, and `ffmpeg` when optional WhatsApp MCP is enabled.
- `uvx` when optional ElevenLabs MCP is enabled.
- `npx` when optional Xero MCP is enabled.

## Local Files

Local-only files belong under `.codex-local/`, `.env`, or shared global Codex storage under `~/.codex`. These are outside git.

- `~/.codex/google-personas/<persona-slug>/oauth/authorized_user.json` for shared global per-persona OAuth vault credentials.
- `~/.codex/google-personas/<persona-slug>/gcloud/` for shared global persona gcloud caches.
- `~/.codex/google-oauth-client.richmondblackwood.json` for Richmond Blackwood sender-context OAuth client recovery/reconnect.
- `.codex-local/whatsapp-bridge.*` for optional WhatsApp bridge PID, log, compiled binary, and LaunchAgent plist.
- Base checkout `.codex-local/xero-active-client` for the optional Xero MCP active client reference.
- `.env` for local SignNow helper credentials if SignNow helpers are used.
- Base checkout `.env` for the local RB Xero OAuth app credentials if Xero MCP is used. Codex worktrees use the base checkout `.env` by default; per-client Xero OAuth tokens stay under ignored base checkout `.codex-local/xero/`.
- `~/.codex/config.toml` for personal MCP server configuration, including optional Xero, ElevenLabs, and n8n MCP entries. This file is outside the repo and must not be copied into git.

Never commit credentials, tokens, OAuth JSON files, certificate bundles, private keys, local service secrets, WhatsApp QR/session state, WhatsApp SQLite databases, downloaded WhatsApp media, or transcription artifacts. Do not print or copy Google OAuth vault files or token responses into repo memory.
Never commit ElevenLabs API keys, n8n MCP tokens, n8n API keys, webhook secrets, call recordings, or full call transcripts.
Never commit Xero client IDs, Xero client secrets, bearer tokens, OAuth tokens, MFA codes, recovery codes, or screenshots of Xero credentials.

## Health Checks

```bash
npm install
npm run typecheck
npm run gmail:create-alias-draft -- --help
npm run signnow:upload -- --help
npm run signnow:get-document -- --help
git diff --check
```

If a live service check fails because authentication is missing, complete the relevant auth step. Do not print or commit secrets while debugging.

Optional WhatsApp MCP checks:

```bash
git submodule status third_party/whatsapp-mcp
setup/mcp/start-whatsapp-bridge.sh status
```

Optional ElevenLabs and n8n MCP checks:

```bash
which uvx
rg -n "PUT_ELEVENLABS|PUT_N8N" ~/.codex/config.toml
```

After replacing placeholders locally, restart or reload Codex and verify the `elevenlabs` and `n8n` MCP servers are available before asking Codex to inspect or modify live resources.

Optional Xero MCP checks:

```bash
which npx
git check-ignore .env
rg -n "^RB_XERO_CLIENT_ID=|^RB_XERO_ACTIVE_CLIENT_REFERENCE=|^RB_XERO_REDIRECT_URI=" .env
setup/mcp/select-xero-client.sh KONVI
```

After replacing placeholders locally, add the single `xero` MCP server entry from `setup/mcp/xero.md` to `~/.codex/config.toml`, select the active client, complete `setup/mcp/xero-oauth.mjs login <CLIENT_REFERENCE>`, restart or reload Codex, and verify the `xero` MCP server is available. Every Xero request must include the exact client reference such as `AGL`, and the first Xero MCP call must verify the Xero organisation through a read-only organisation details check.

For the RB calling bot, MCP setup is not enough for runtime calls. n8n also needs a selected ElevenLabs credential on `RB Calls Voice Execution` -> `Make ElevenLabs Outbound Call` and `RB Calls ElevenLabs Events` -> `Get ElevenLabs Conversation`, plus the variable `ELEVENLABS_AGENT_PHONE_NUMBER_ID`. The current workflows use n8n's predefined `ElevenLabs API` credential type; if using an HTTP Header Auth fallback, the header name must be `xi-api-key`. Store credentials and variable values in n8n only, never in git. Preserve the source-level `newCredential('ElevenLabs account 2')` binding on both ElevenLabs HTTP Request nodes; n8n read-backs can omit credential details, but runtime calls fail if the binding is removed or not resolved.

If a required ElevenLabs tool-schema or agent workflow edit is not exposed through MCP, use the direct ElevenLabs API only after explicit user approval for the exact live change. Read current state first, patch narrowly, never print/store the API key, and verify by re-reading the live agent/tool state.
