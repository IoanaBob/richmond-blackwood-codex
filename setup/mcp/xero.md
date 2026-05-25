# Xero MCP Setup

Status: provisional.
Source: user instruction on 2026-05-25, official Xero AI Toolkit at `https://developer.xero.com/ai`, Xero AI Toolkit FAQ at `https://developer.xero.com/faq/AI-Toolkit`, and official Xero MCP server README at `https://github.com/XeroAPI/xero-mcp-server`.
Imported: 2026-05-25.
Review: create and verify each client-specific Xero custom connection before using it for RB client work; confirm the active-client switcher is acceptable after the first live Konvi test.

This guide sets up local Codex access to Xero through the official `@xeroapi/xero-mcp-server` package.

RB uses one Codex MCP server entry named `xero`. The repo wrapper starts the official Xero MCP server with the currently selected client reference, so operators do not need one `~/.codex/config.toml` block per client.

Each Xero organisation/client still needs its own Xero Developer custom connection and local `.env` credentials. Client isolation is enforced by selecting an active client before Codex starts the `xero` MCP server, then verifying the returned Xero organisation before any substantive work.

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
- Personal Codex config in `~/.codex/config.toml`.

The shared Xero email login is an operator setup fact only. It is not a credential and does not authorize using one shared Xero custom connection across all clients.

## Prerequisites

Confirm Node.js and `npx` are available:

```bash
node -v
which npx
```

The official Xero MCP package requires Node.js 18 or higher. This repository currently targets Node.js `18.7.0`.

Each Xero organisation/client needs its own Xero Developer custom connection. Create it with the shared Xero login that has access to the relevant organisation, then follow Xero's required custom-connection scope instructions in the official MCP README. RB v1 does not use local scope overrides.

## Local Environment File

Copy the repo template locally:

```bash
cp .env.example .env
```

For each client, repeat the placeholder block with the exact RB client reference:

```bash
RB_XERO_SHARED_LOGIN_EMAIL=PUT_SHARED_XERO_LOGIN_EMAIL_HERE
RB_XERO_ACTIVE_CLIENT_REFERENCE=KONVI
RB_XERO_KONVI_CLIENT_ID=PUT_CLIENT_ID_HERE
RB_XERO_KONVI_CLIENT_SECRET=PUT_CLIENT_SECRET_HERE
```

Set `RB_XERO_SHARED_LOGIN_EMAIL` once as a non-secret operator setup pointer. It does not get passed to the MCP server.

Use uppercase client references in variable names. If a secret contains shell-special characters, quote it in `.env`.

## Add The Single Xero MCP Server To Codex

Add one Xero MCP server entry to `~/.codex/config.toml`. Replace the repository path if needed.

```toml
[mcp_servers.xero]
command = "PUT_REPOSITORY_PATH_HERE/setup/mcp/start-xero-mcp.sh"
startup_timeout_sec = 30
tool_timeout_sec = 120
default_tools_approval_mode = "prompt"
```

The `xero` server starts with the active client reference from:

1. `RB_XERO_CLIENT_REFERENCE` if set in the MCP process environment.
2. `.codex-local/xero-active-client` if created by the selector script.
3. `RB_XERO_ACTIVE_CLIENT_REFERENCE` in `.env`.

To switch the active client without editing `~/.codex/config.toml`:

```bash
setup/mcp/select-xero-client.sh KONVI
```

Restart or reload Codex after switching the active client so the `xero` MCP server restarts with that client's credentials.

## Richmond Blackwood Operating Rules

- Every Xero request must include the exact RB client reference, such as `AGL`.
- If the client reference is missing, stop and ask for it.
- Confirm the requested client reference matches the active local Xero client before using the `xero` MCP tools.
- First call must be `list-organisation-details` or the closest available read-only organisation check.
- Compare the returned Xero organisation to the intended RB client before any other read or write.
- If the organisation is missing, unexpected, or not yet approved as that client's Xero organisation, stop and ask for review.
- Never continue if the active local Xero client differs from the requested client reference.
- Never fall back to bearer-token mode or the first available tenant.
- Xero write actions require explicit user approval naming the client reference, Xero organisation, and intended operation.
- Store only concise business-relevant summaries or route pointers in the repo. Raw Xero exports and evidence belong in Drive or Xero, not git.

## Verification

1. Confirm `.env` exists locally and is ignored by git:

```bash
git check-ignore .env
```

2. Confirm the configured client references are present without printing secrets:

```bash
rg -n "^RB_XERO_.*_CLIENT_ID=|^RB_XERO_ACTIVE_CLIENT_REFERENCE=" .env
```

3. Select the test client:

```bash
setup/mcp/select-xero-client.sh KONVI
```

4. Restart or reload Codex.
5. Ask Codex to list available Xero MCP tools for the single `xero` server.
6. For the active client, run only the read-only organisation check first.
7. Record any approved organisation mapping under the owning client reference folder if the user explicitly approves saving it.

## Known Limits

- The official Xero MCP README describes bearer-token mode for multi-account runtime auth, but RB's default is per-client custom connections for clearer client isolation.
- Custom connections must be created per Xero organisation/client, but `~/.codex/config.toml` needs only one `xero` MCP server entry.
- Switching clients requires selecting the active client and restarting or reloading Codex so the MCP server process restarts with that client's credentials.
- If the MCP server is unavailable, do not bypass it with direct Xero API scripts unless the user explicitly approves a separate implementation plan.
