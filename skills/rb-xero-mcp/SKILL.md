---
name: rb-xero-mcp
description: Use when reading, verifying, reconciling, creating, or updating Xero data for Richmond Blackwood through a client-specific local Xero MCP server.
---

# RB Xero MCP

Use this skill for any Richmond Blackwood work that touches Xero through MCP.

## Setup Source

- Setup guide: `setup/mcp/xero.md`
- Local credentials template: `.env.example`, copied to ignored `.env`
- Default MCP server naming pattern: `xero_<client-reference>`

## Required Client Reference

Every Xero request must include the exact RB client reference, for example `AGL`.

If the user gives only a company name, person name, Xero organisation name, invoice name, or vague phrase such as "the client", stop and ask for the exact client reference before using Xero.

Do not infer a client reference from a company name unless the user explicitly provided that reference in the same request.

## Server Resolution

1. Convert the provided client reference to uppercase for `.env` lookup, for example `AGL`.
2. Resolve the configured server name from `RB_XERO_<CLIENT_REFERENCE>_MCP_SERVER`.
3. If the server is not configured or the Xero MCP tools are unavailable, ask the user to configure the client-specific MCP server and reload Codex.
4. Do not use a generic `xero` server, bearer-token server, or another client's server as a fallback.

## First Call Verification

Before any substantive Xero read or write:

1. Use the selected Xero MCP server to run `list-organisation-details` or the closest available read-only organisation check.
2. Compare the returned Xero organisation against the intended client reference and any approved local route pointer.
3. If the organisation is missing, unexpected, or not yet approved as that client's Xero organisation, stop and ask for review.

## Safety Rules

- Keep Xero queries narrow: client reference, date range, account/contact/invoice/report target, and small result limits where the tool supports them.
- Xero writes require explicit approval naming the client reference, verified Xero organisation, and intended operation.
- Do not create, update, approve, revert, delete, or post Xero records automatically from implication alone.
- Do not copy raw Xero exports, full ledgers, credential values, or bulk financial data into git.
- Store concise business-relevant summaries or route pointers only under the correct `clients/Companies/<client-reference>/` folder when repo storage is appropriate.
- Use Drive or Xero itself for source documents and detailed evidence.

## Failure Handling

If Xero MCP fails because authentication is missing, credentials are wrong, or the custom connection is not authorized, report the blocker and ask for local setup or review. Do not work around the failure with direct Xero API calls unless the user explicitly approves a separate implementation plan.
