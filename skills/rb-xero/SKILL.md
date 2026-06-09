---
name: rb-xero
description: Use when reading, reconciling, reporting, creating, or updating Xero accounting records through the local Xero MCP server for Richmond Blackwood work.
---

# RB Xero

Use this skill when Xero context is needed for Richmond Blackwood accounting work and the local `xero` MCP server is available.

## Setup Reference

- Setup guide: `setup/mcp/xero.md`
- Launcher: `setup/mcp/start-xero-mcp.sh`
- Local credential file: `~/.codex/xero-mcp.env`
- Upstream package: `@xeroapi/xero-mcp-server`

If the `xero` MCP server is not available, do not invent Xero context and do not use browser automation as a workaround. Ask the user to reload Codex after setup, provide the correct Xero Custom Connection credentials or bearer-token path through approved local secret storage, or confirm that a non-Xero source should be used.

## Safety Rules

- Treat Xero as live financial state.
- Read before writing.
- Keep Xero client IDs, client secrets, bearer tokens, refresh tokens, OAuth callback payloads, report exports, invoice PDFs, and attachments out of git and chat.
- Do not create, approve, update, void, delete, or pay anything in Xero without explicit user approval for the exact organisation, record, amount, date, and action.
- Keep MCP tool approval in prompt mode unless the user explicitly approves a narrower trusted automation pattern.
- If a required scope is missing, stop and ask for the app registration or token to be updated. Do not widen scopes blindly and do not switch to the browser.

## Normal Workflow

1. Confirm the source organisation and date range.
2. Use the Xero MCP server for supported reads and writes.
3. For reads, return concise results with Xero source, date range, and relevant record IDs.
4. For writes, draft the exact intended change in chat first.
5. After approval and tool execution, read back the affected record.
6. Store only non-secret pointers and process notes in the appropriate repo file or live RB source of truth.

## Routing

- Client-specific Xero facts belong under `clients/Companies/<client-reference>/` only after confirming the Notion Companies `Reference`.
- Accounting follow-through should update or create the owning operational row in RB Client Databases when required by the process.
- Central Notion Tasks are only for extra action work or when the owning operational row cannot represent the action.
- If the responsible company, project relation, or owner is unclear, record the blocker and ask for review instead of creating unowned work.
