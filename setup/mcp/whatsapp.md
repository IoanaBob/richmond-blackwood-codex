# WhatsApp MCP Setup

Status: provisional.
Source: neutral WhatsApp MCP setup ported from local `everguard-research-codex`.
Imported: 2026-05-05.
Review: confirm whether Richmond Blackwood wants WhatsApp enabled in Codex, which account should be linked, and where material WhatsApp communication summaries should be logged.

This guide sets up local WhatsApp access for Codex through the repo-pinned `whatsapp-mcp` submodule.

Use this only for WhatsApp accounts the user controls. WhatsApp data is private relationship data: message reads, media downloads, voice-note transcription, sends, and file sends are high-impact operations.

## What Lives In Git

- Submodule: `third_party/whatsapp-mcp`
- Fork used by this repository: `https://github.com/raen79/whatsapp-mcp`
- Upstream source: `https://github.com/lharries/whatsapp-mcp`
- Pinned compatibility commit: `018ea770ca9524c43000910ada7611fa1a503fe6`
- Repo-local bridge patch: `setup/mcp/patches/whatsapp-mcp-localhost-bridge.patch`
- This setup guide and the Codex config snippet below.

The fork is intentional. The upstream project is the base, but as of 2026-05-05 the upstream-pinned WhatsApp dependency failed to connect to WhatsApp Web. The fork contains the minimal compatibility update that reaches the QR pairing step and keeps setup reproducible.

The repo-local bridge patch is applied by `setup/mcp/start-whatsapp-bridge.sh` before build when the submodule source has not already been patched. It keeps the REST bridge bound to `127.0.0.1` by default, supports explicit `WHATSAPP_BRIDGE_HOST` and `WHATSAPP_BRIDGE_PORT` overrides, and keeps Python cache noise ignored inside the submodule.

## What Must Stay Local

Do not commit:

- WhatsApp QR/session state.
- SQLite databases under `third_party/whatsapp-mcp/whatsapp-bridge/store/`.
- Downloaded WhatsApp media.
- Audio transcriptions.
- Personal Codex config in `~/.codex/config.toml`.

The upstream submodule ignores `*.db`, `whatsapp.log`, Python caches, and virtualenv output. Still check `git status` before committing.

## Install Prerequisites

Required:

```bash
brew install go
brew install ffmpeg
```

Already expected from the main setup guide:

```bash
uv --version
python3 --version
```

`ffmpeg` is needed for voice-message handling and converting audio into WhatsApp-compatible Opus Ogg when sending voice notes.

## Initialize The Submodule

Fresh clones must include submodules:

```bash
git clone --recurse-submodules <repo-url>
```

If the repository is already cloned:

```bash
git submodule update --init --recursive
```

The submodule URL should point at the compatibility fork:

```bash
git config --file .gitmodules --get submodule.third_party/whatsapp-mcp.url
```

Expected output:

```text
https://github.com/raen79/whatsapp-mcp.git
```

Confirm the pinned commit:

```bash
git submodule status third_party/whatsapp-mcp
```

Expected commit prefix:

```text
018ea770ca9524c43000910ada7611fa1a503fe6
```

## Start The WhatsApp Bridge

For normal Codex operation, start the bridge as a persistent background process from the repository root:

```bash
setup/mcp/start-whatsapp-bridge.sh start
```

Status and stop commands:

```bash
setup/mcp/start-whatsapp-bridge.sh status
setup/mcp/start-whatsapp-bridge.sh stop
```

The script stores local state under `.codex-local/`, which is ignored by git:

```text
.codex-local/whatsapp-bridge.pid
.codex-local/whatsapp-bridge.log
.codex-local/whatsapp-bridge-bin
.codex-local/go-build-cache/
.codex-local/go/pkg/mod/
.codex-local/com.richmondblackwood.whatsapp-bridge.plist
```

The local bridge binds to `127.0.0.1:8080` by default. Override `WHATSAPP_BRIDGE_HOST` only for deliberate local debugging after reviewing the exposure risk.

When Codex needs to send or read WhatsApp and port `8080` is not listening, Codex should start the bridge with this script outside the sandbox and leave it running in the background.

For direct foreground debugging only:

```bash
cd third_party/whatsapp-mcp/whatsapp-bridge
go run main.go
```

First run shows a QR code. Scan it from WhatsApp on the phone:

```text
WhatsApp -> Settings -> Linked Devices -> Link a Device
```

If Codex starts or monitors the bridge and the QR code appears in tool output or the bridge log, Codex should relay the QR block directly to the user in chat for scanning. Do not just tell the user that the bridge printed a QR somewhere else.

Keep the bridge running while Codex uses WhatsApp. It exposes the local bridge API on `http://localhost:8080/api` and stores messages locally under `whatsapp-bridge/store/`.

If sync looks broken, stop the bridge and remove only the local store files, then re-authenticate:

```bash
rm -f third_party/whatsapp-mcp/whatsapp-bridge/store/messages.db
rm -f third_party/whatsapp-mcp/whatsapp-bridge/store/whatsapp.db
```

## Add The Codex MCP Server

Add this to `~/.codex/config.toml`, adjusting the repository path if needed:

```toml
[mcp_servers.whatsapp]
command = "/Users/eranpeer/.local/bin/uv"
args = [
  "--directory",
  "/Users/eranpeer/richmond-blackwood-codex/third_party/whatsapp-mcp/whatsapp-mcp-server",
  "run",
  "main.py",
]
startup_timeout_sec = 30
tool_timeout_sec = 120
default_tools_approval_mode = "prompt"
```

The prompt approval mode is intentional. WhatsApp tools can read private messages, download media, and send messages/files. Keep every WhatsApp tool call reviewable unless the user explicitly changes that local policy.

After changing `~/.codex/config.toml`, restart or reload Codex so it discovers the `whatsapp` MCP server.

## Expected Tools

The MCP server exposes tools for:

- Searching contacts.
- Listing chats and messages.
- Fetching message context.
- Downloading media from messages, including voice notes.
- Sending text messages.
- Sending files.
- Sending audio as WhatsApp voice messages when `ffmpeg` is available.

Contact search in this repository's fork searches both the message chat index and the WhatsApp contact store. It returns a stable object with `contacts` and `count`, including `count = 0` for no matches, so the MCP wrapper does not fail on empty search results.

## Richmond Blackwood Operating Rules

- Do not invent WhatsApp context. If the MCP server is unavailable, ask the user to start the bridge, reload Codex, or provide WhatsApp exports/notes.
- Do not send WhatsApp messages or files automatically. Draft the intended message in chat unless the user explicitly asks to send and the tool approval confirms destination and content.
- If contact search is ambiguous, ask which contact is correct before sending.
- For voice notes, download media locally, transcribe or summarize only what is needed, then route the business-relevant summary to the right existing RB destination. Do not commit downloaded media or transcripts.
- Client-specific WhatsApp facts belong under `clients/Companies/<client-reference>/` and should use the exact Notion Companies `Reference` before a client file is created.
- Non-client private company WhatsApp facts belong under `internal/`.
- Do not create a new RB Communications database or Notion structure unless the user approves it. If the logging destination is unclear, record the blocker in `memory/open-questions.md` and ask for review.
- Manual inbound client monitoring uses `processes/whatsapp-inbound-monitoring.md` and `skills/rb-whatsapp-inbound-monitor/SKILL.md`. It must run only from saved checkpoints and only after an explicit user request for the specific client or chat.

## Verification

1. Confirm prerequisites:

```bash
go version
uv --version
ffmpeg -version
```

2. Initialize the submodule.
3. Start the bridge and complete QR authentication.
4. Restart or reload Codex.
5. Use the `whatsapp` MCP tools, not the bridge REST endpoint, for normal test reads or sends.
6. Ask Codex to start the background bridge script if port `8080` is not listening.
7. Ask Codex to list recent WhatsApp chats with a small limit.
8. Ask Codex to search for a known contact.
9. Test media download on a non-sensitive message before using production voice notes.

## Known Limits

- This uses WhatsApp Web multi-device behavior through a third-party MCP server. It is not the official WhatsApp Business Cloud API.
- It depends on a local running bridge process.
- WhatsApp may require re-authentication periodically or after linked-device changes.
- If the MCP server code changes while Codex is running, reload Codex so it restarts the `whatsapp` MCP process with the new code. Killing the stale process during a session can leave the current MCP transport closed until reload.
- The official WhatsApp Business Cloud API is better for a business-owned WhatsApp number and webhook-based future messages, but it does not provide a personal WhatsApp history reader for this local Codex use case.
