# Xero MCP Setup

Status: provisional.
Source: user instruction on 2026-06-09, XeroAPI `xero-mcp-server` README at `https://github.com/XeroAPI/xero-mcp-server`, npm package `@xeroapi/xero-mcp-server` version `0.0.17`, and Xero developer documentation linked from the upstream README.
Imported: 2026-06-09.
Review: confirm which RB operators should have Xero access, which Xero organisation(s) should be connected, whether Custom Connections or bearer-token auth is preferred, and which write operations require stricter approval.

This guide sets up local Codex access to Xero through the official XeroAPI MCP server.

Use this for RB accounting work where Codex needs to inspect or, after explicit approval, update Xero records. Xero is a financial source of truth. Do not store live client IDs, client secrets, bearer tokens, refresh tokens, exported ledgers, or Xero report payloads in git.

## What This Enables

- Xero MCP: Codex can use `@xeroapi/xero-mcp-server` to call supported Xero accounting and payroll tools through MCP.
- Read operations include accounts, contacts, invoices, payments, bank transactions, manual journals, reports, tax rates, tracking categories, and organisation details.
- Write operations exposed by the upstream server include creating or updating contacts, invoices, credit notes, payments, bank transactions, items, manual journals, quotes, tracking categories/options, and payroll timesheets.

## What Lives In Git

- This setup guide.
- `setup/mcp/start-xero-mcp.sh`, a launcher that reads local credentials from `~/.codex/xero-mcp.env` and then starts the official npm package.
- Placeholder Codex config snippets.

## What Must Stay Local

Do not commit or paste into chat:

- Xero client IDs.
- Xero client secrets.
- Bearer tokens, refresh tokens, or OAuth callback payloads.
- Xero tenant IDs if the user treats them as private.
- Exported ledger data, report payloads, invoice PDFs, attachments, or client bookkeeping evidence.
- Personal Codex config in `~/.codex/config.toml`.

## Prerequisites

Confirm Node.js and npm are available:

```bash
node --version
npm --version
npx --version
```

The upstream MCP server requires Node.js v18 or higher.

## Choose Auth Mode

Use Custom Connections for a single Xero organisation. This is the preferred initial RB setup because it avoids interactive browser auth during ordinary Codex runs.

Use bearer-token mode only when the MCP client is expected to support multiple Xero accounts at runtime and a separate OAuth flow provides the token. The upstream server gives `XERO_CLIENT_BEARER_TOKEN` precedence over `XERO_CLIENT_ID`.

## Create The Xero App

In the Xero developer portal:

1. Create or select the Xero organisation to connect. Use a Demo Company first when testing.
2. Create a Custom Connection app for the target organisation.
3. Add only the scopes needed for the work.
4. Store the client ID and client secret in local secret storage, not in this repository.

Common initial scopes:

```text
accounting.invoices accounting.contacts accounting.settings
```

Broaden scopes only when needed for a specific workflow, such as payments, bank transactions, reports, manual journals, or payroll.

## Add Local Credentials

Create `~/.codex/xero-mcp.env` locally with file permissions restricted to the current user:

```bash
touch ~/.codex/xero-mcp.env
chmod 600 ~/.codex/xero-mcp.env
```

For Custom Connections, add:

```bash
XERO_CLIENT_ID="PUT_XERO_CLIENT_ID_HERE"
XERO_CLIENT_SECRET="PUT_XERO_CLIENT_SECRET_HERE"
XERO_SCOPES="accounting.invoices accounting.contacts accounting.settings"
```

For bearer-token mode instead, add:

```bash
XERO_CLIENT_BEARER_TOKEN="PUT_XERO_BEARER_TOKEN_HERE"
```

Do not add both modes unless intentionally testing bearer-token precedence.

## Add The Codex MCP Server

Add this to `~/.codex/config.toml`, adjusting the repository path if needed:

```toml
[mcp_servers.xero]
command = "PUT_REPO_ABSOLUTE_PATH_HERE/setup/mcp/start-xero-mcp.sh"
startup_timeout_sec = 60
tool_timeout_sec = 300
default_tools_approval_mode = "prompt"
```

After changing `~/.codex/config.toml`, restart or reload Codex so it discovers the `xero` MCP server.

## Richmond Blackwood Operating Rules

- Treat Xero as live financial state. Read before writing, and preserve Xero IDs, dates, currencies, tax rates, and status values exactly.
- Keep MCP tool approval in `prompt` mode unless the user explicitly approves a narrower trusted automation pattern.
- Do not create, approve, update, void, delete, or pay anything in Xero without explicit user approval for the exact organisation, record, amount, date, and action.
- Do not use browser automation for Xero when the MCP/API path supports the task. If MCP credentials are missing or insufficient, stop and ask for the correct credentials or scopes through approved secret storage.
- For client-specific Xero facts, route durable notes only under `clients/Companies/<client-reference>/` after confirming the Notion Companies `Reference`.
- For task-capable accounting work, update or create the owning Notion operational row first when required by RB process. Central Tasks are not a substitute for the owning client data source.
- After any Xero write, read back the affected record, record only non-secret pointers in the repo, and log follow-through in the relevant live RB source of truth.
- When reporting Xero data in chat, include the source organisation, date range, and whether the data was read from Xero live or from a stored repo/Drive pointer.

## Verification

1. Confirm prerequisites:

```bash
node --version
npm --version
npx --version
```

2. Confirm local credential file exists and is not world-readable:

```bash
ls -l ~/.codex/xero-mcp.env
```

3. Start the launcher without printing secrets:

```bash
setup/mcp/start-xero-mcp.sh
```

4. Restart or reload Codex.
5. Ask Codex to list available MCP tools and confirm `xero` appears.
6. Run a small read-only test first, such as listing organisation details or accounts for a Demo Company.
7. Do not test write tools until the user has approved the exact test record and rollback expectation.

## Known Limits

- The upstream Xero MCP server is young and may not cover every Xero API endpoint or accounting edge case.
- Custom Connections are single-organisation oriented.
- Bearer-token mode depends on an external OAuth flow and token lifecycle management.
- Some older Xero scopes are being replaced by more granular scopes. If reads fail with authorization errors, compare the app's scopes against Xero's current OAuth scopes and update the local app registration rather than widening scopes blindly.
- If the npm package changes behavior, pin `XERO_MCP_PACKAGE` locally in `~/.codex/xero-mcp.env` or the MCP environment before using production data.
