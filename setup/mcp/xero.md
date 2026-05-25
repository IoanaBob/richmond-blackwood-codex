# Xero MCP Setup

Status: provisional.
Source: user instruction on 2026-05-25, official Xero AI Toolkit at `https://developer.xero.com/ai`, Xero AI Toolkit FAQ at `https://developer.xero.com/faq/AI-Toolkit`, and official Xero MCP server README at `https://github.com/XeroAPI/xero-mcp-server`.
Imported: 2026-05-25.
Review: create and verify each client-specific Xero custom connection before using it for RB client work.

This guide sets up local Codex access to Xero through the official `@xeroapi/xero-mcp-server` package.

RB uses one local MCP server entry per Xero organisation/client. Do not use one shared Xero MCP entry across all clients.

## What This Enables

- Read Xero organisation details, accounts, contacts, invoices, payments, bank transactions, reports, and payroll records exposed by the Xero MCP server.
- Create or update supported Xero records only after explicit user approval for the exact client and operation.
- Keep client isolation visible through the MCP server name, for example `xero_agl`.

## What Lives In Git

- This setup guide.
- Placeholder `.env.example` fields.
- Repo-local Xero operating rules in `skills/rb-xero-mcp/SKILL.md`.

## What Must Stay Local

Do not commit or paste into chat:

- `.env` files with real Xero values.
- Xero client IDs or client secrets.
- Xero bearer tokens, OAuth tokens, refresh tokens, or credential dumps.
- Xero login passwords, MFA codes, recovery codes, or screenshots of credentials.
- Personal Codex config in `~/.codex/config.toml`.

The shared Xero email login is an operator setup fact only. It is not a credential and does not authorize using a single Xero MCP server for all clients.

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
RB_XERO_AGL_CLIENT_ID=PUT_CLIENT_ID_HERE
RB_XERO_AGL_CLIENT_SECRET=PUT_CLIENT_SECRET_HERE
RB_XERO_AGL_MCP_SERVER=xero_agl
```

Set `RB_XERO_SHARED_LOGIN_EMAIL` once as a non-secret operator setup pointer. It does not get passed to the MCP server.

Use uppercase client references in variable names. If a secret contains shell-special characters, quote it in `.env`.

## Add A Client MCP Server To Codex

Add one MCP server entry per client to `~/.codex/config.toml`. Replace the repository path, client reference, and `npx` path as needed.

```toml
[mcp_servers.xero_agl]
command = "/bin/zsh"
args = [
  "-lc",
  "set -a; source '/Users/ioana/.codex/worktrees/45e0/richmond-blackwood-codex/.env'; export XERO_CLIENT_ID=\"$RB_XERO_AGL_CLIENT_ID\" XERO_CLIENT_SECRET=\"$RB_XERO_AGL_CLIENT_SECRET\"; exec npx -y @xeroapi/xero-mcp-server@latest"
]
startup_timeout_sec = 30
tool_timeout_sec = 120
default_tools_approval_mode = "prompt"
```

For another client, copy the block and change all three references:

- MCP server name, for example `xero_svl`.
- Environment variable prefix, for example `RB_XERO_SVL_`.
- The client custom connection values in local `.env`.

After editing `~/.codex/config.toml`, restart or reload Codex so it discovers the new MCP server.

## Richmond Blackwood Operating Rules

- Every Xero request must include the exact RB client reference, such as `AGL`.
- If the client reference is missing, stop and ask for it.
- Resolve the MCP server from `.env` using `RB_XERO_<CLIENT_REFERENCE>_MCP_SERVER`.
- First call must be `list-organisation-details` or the closest available read-only organisation check.
- Compare the returned Xero organisation to the intended RB client before any other read or write.
- If the organisation is missing, unexpected, or not yet approved as that client's Xero organisation, stop and ask for review.
- Never fall back to a generic `xero` server, a bearer-token server, or the first available tenant.
- Xero write actions require explicit user approval naming the client reference, Xero organisation, and intended operation.
- Store only concise business-relevant summaries or route pointers in the repo. Raw Xero exports and evidence belong in Drive or Xero, not git.

## Verification

1. Confirm `.env` exists locally and is ignored by git:

```bash
git check-ignore .env
```

2. Confirm the expected client server names are present without printing secrets:

```bash
rg -n "^RB_XERO_.*_MCP_SERVER=" .env
```

3. Restart or reload Codex.
4. Ask Codex to list available Xero MCP tools for the specific server.
5. For each configured client, run only the read-only organisation check first.
6. Record any approved organisation mapping under the owning client reference folder if the user explicitly approves saving it.

## Known Limits

- The official Xero MCP README describes bearer-token mode for multi-account runtime auth, but RB's default is per-client custom connections for clearer client isolation.
- Custom connections and MCP server entries must be created per Xero organisation/client.
- If the MCP server is unavailable, do not bypass it with direct Xero API scripts unless the user explicitly approves a separate implementation plan.
