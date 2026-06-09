# Xero MCP Setup

Status: provisional.
Source: user instruction on 2026-05-25, official Xero AI Toolkit at `https://developer.xero.com/ai`, Xero AI Toolkit FAQ at `https://developer.xero.com/faq/AI-Toolkit`, official Xero MCP server README at `https://github.com/XeroAPI/xero-mcp-server`, and npm package `@xeroapi/xero-mcp-server` version `0.0.17` checked on 2026-06-09.
Imported: 2026-05-25.
Review: complete and verify each client-specific Xero OAuth login before using it for RB client work; confirm the active-client switcher is acceptable after the first live client test.

This guide sets up local Codex access to Xero through the official `@xeroapi/xero-mcp-server` package.

RB uses one Codex MCP server entry named `xero`. The repo wrapper starts the official Xero MCP server with the currently selected client reference, so operators do not need one `~/.codex/config.toml` block per client.

RB uses one Xero Developer OAuth app for local Codex access, with its credentials stored in the base checkout `.env`. Each Xero organisation/client still gets its own local OAuth login token under the ignored base checkout `.codex-local/xero/<CLIENT_REFERENCE>/`. The default credential file is the base checkout `.env`, not a transient Codex worktree `.env`; `RB_XERO_ENV_FILE` may override this only for deliberate local testing. Client isolation is enforced by selecting an active client before Codex starts the `xero` MCP server, then verifying the returned Xero organisation before any substantive work.

## What This Enables

- Read Xero organisation details, accounts, contacts, invoices, payments, bank transactions, reports, and payroll records exposed by the Xero MCP server.
- Create or update supported Xero records only after explicit user approval for the exact client and operation.
- Keep client isolation visible through the requested client reference and the active local Xero client selector.

## What Lives In Git

- This setup guide.
- Placeholder `.env.example` fields.
- Local wrapper scripts under `setup/mcp/`.
- Repo-local Xero operating rules in `skills/rb-xero-mcp/SKILL.md`.

## What Must Stay Local

Do not commit or paste into chat:

- `.env` files with real Xero values.
- Xero client IDs or client secrets.
- Xero bearer tokens, OAuth tokens, refresh tokens, or credential dumps.
- Xero login passwords, MFA codes, recovery codes, or screenshots of credentials.
- Xero tenant IDs if the user treats them as private.
- Exported ledger data, report payloads, invoice PDFs, attachments, or client bookkeeping evidence.
- Personal Codex config in `~/.codex/config.toml`.

The shared Xero email login is an operator setup fact only. It is not a credential and does not authorize reusing one Xero tenant token across all clients.

## Prerequisites

Confirm Node.js and `npx` are available:

```bash
node -v
which npx
```

The official Xero MCP package requires Node.js 18 or higher. This repository currently targets Node.js `18.7.0`.

The RB Xero OAuth app needs the local redirect URI before login. The redirect URI must match exactly:

```text
http://localhost:36777/callback
```

## Local Environment File

Copy the repo template locally:

```bash
cp .env.example .env
```

Run that from the base checkout, for example `/Users/eranpeer/richmond-blackwood-codex`. Codex worktrees use that base `.env` by default.

Configure the RB OAuth app once, then use the active client reference to choose which Xero organisation login token is used:

```bash
RB_XERO_SHARED_LOGIN_EMAIL=PUT_SHARED_XERO_LOGIN_EMAIL_HERE
RB_XERO_ACTIVE_CLIENT_REFERENCE=KONVI
RB_XERO_CLIENT_ID=PUT_RB_OAUTH_APP_CLIENT_ID_HERE
RB_XERO_SECRET=PUT_RB_OAUTH_APP_CLIENT_SECRET_HERE
RB_XERO_REDIRECT_URI=http://localhost:36777/callback
RB_XERO_OAUTH_SCOPES="offline_access accounting.settings.read"
```

Set `RB_XERO_SHARED_LOGIN_EMAIL` once as a non-secret operator setup pointer. It does not get passed to the MCP server.

Use uppercase client references for the active-client selector and token folders. If a secret contains shell-special characters, quote it in `.env`.

Optional local overrides:

```bash
RB_XERO_NPX_BIN=/absolute/path/to/npx
RB_XERO_MCP_PACKAGE=@xeroapi/xero-mcp-server@0.0.17
RB_XERO_EIP_TOKEN_FILE=/absolute/path/to/local/eip-oauth-token.json
RB_XERO_OAUTH_SCOPES="offline_access accounting.settings.read accounting.contacts.read accounting.invoices.read"
```

Use `RB_XERO_MCP_PACKAGE` only when a production workflow needs package pinning after review.

## Add The Single Xero MCP Server To Codex

Add one Xero MCP server entry to `~/.codex/config.toml`. Replace the repository path if needed.

```toml
[mcp_servers.xero]
command = "PUT_REPOSITORY_PATH_HERE/setup/mcp/start-xero-mcp.sh"
startup_timeout_sec = 60
tool_timeout_sec = 300
default_tools_approval_mode = "prompt"
```

The `xero` server starts with the active client reference from:

1. `RB_XERO_CLIENT_REFERENCE` if set in the MCP process environment.
2. Base checkout `.codex-local/xero-active-client` if created by the selector script.
3. Base checkout `.env` value `RB_XERO_ACTIVE_CLIENT_REFERENCE`.

To switch the active client without editing `~/.codex/config.toml`:

```bash
setup/mcp/select-xero-client.sh KONVI
```

Restart or reload Codex after switching the active client so the `xero` MCP server restarts with that client's credentials.

## Login To A Client Connection

Run the OAuth login helper from any worktree:

```bash
setup/mcp/xero-oauth.mjs login EIP
```

Open the printed `XERO_AUTH_URL`, complete the Xero login/consent flow using the shared Xero login, and choose the intended Xero organisation. The helper uses the RB OAuth app credentials from `.env` and stores the returned refresh token in the ignored base checkout `.codex-local/xero/EIP/oauth-token.json`.

The MCP launcher refreshes that token automatically and exports only the short-lived access token to the official Xero MCP server process.

Start with `offline_access accounting.settings.read` for initial organisation verification. Add only scopes that are enabled on the RB OAuth app and needed for the approved Xero task. Xero rejects deprecated or unenabled scopes before consent.

If Xero shows `invalid_request` / `Invalid redirect_uri`, update the RB Xero OAuth app to allow the exact `RB_XERO_REDIRECT_URI` value from the base checkout `.env`, then run the login helper again. Do not keep retrying an authorization URL after a redirect URI mismatch; generate a fresh URL from the helper after the app setting is saved.

## Richmond Blackwood Operating Rules

- Every Xero request must include the exact RB client reference, such as `AGL`.
- If the client reference is missing, stop and ask for it.
- Confirm the requested client reference matches the active local Xero client before using the `xero` MCP tools.
- First call must be `list-organisation-details` or the closest available read-only organisation check.
- Compare the returned Xero organisation to the intended RB client before any other read or write.
- If the organisation is missing, unexpected, or not yet approved as that client's Xero organisation, stop and ask for review.
- Never continue if the active local Xero client differs from the requested client reference.
- Never fall back to another client's token or the first available tenant without organisation verification.
- Xero write actions require explicit user approval naming the client reference, Xero organisation, and intended operation.
- Do not use browser automation for Xero when the MCP/API path supports the task. If MCP credentials are missing or insufficient, stop and ask for the correct credentials or scopes through approved secret storage.
- Store only concise business-relevant summaries or route pointers in the repo. Raw Xero exports and evidence belong in Drive or Xero, not git.

## Verification

1. Confirm `.env` exists locally and is ignored by git:

```bash
git check-ignore .env
```

2. Confirm the configured client references are present without printing secrets:

```bash
rg -n "^RB_XERO_CLIENT_ID=|^RB_XERO_ACTIVE_CLIENT_REFERENCE=|^RB_XERO_REDIRECT_URI=" .env
```

3. Select the test client:

```bash
setup/mcp/select-xero-client.sh KONVI
```

4. Complete OAuth login if needed:

```bash
setup/mcp/xero-oauth.mjs login KONVI
```

5. Restart or reload Codex.
6. Ask Codex to list available Xero MCP tools for the single `xero` server.
7. For the active client, run only the read-only organisation check first.
8. Record any approved organisation mapping under the owning client reference folder if the user explicitly approves saving it.

## Known Limits

- The official Xero MCP README describes bearer-token mode for multi-account runtime auth. RB uses that mode after the RB OAuth app login helper refreshes the selected client's short-lived bearer token.
- OAuth login must be completed per Xero organisation/client, but the RB OAuth app credentials and `~/.codex/config.toml` MCP entry are shared.
- Switching clients requires selecting the active client and restarting or reloading Codex so the MCP server process restarts with that client's credentials.
- The upstream Xero MCP server is young and may not cover every Xero API endpoint or accounting edge case.
- Some older Xero scopes are being replaced by more granular scopes. If reads fail with authorization errors, compare the app's scopes against Xero's current OAuth scopes and update the local app registration rather than widening scopes blindly.
- If the MCP server is unavailable, do not bypass it with direct Xero API scripts unless the user explicitly approves a separate implementation plan.
