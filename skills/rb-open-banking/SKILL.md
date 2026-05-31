---
name: rb-open-banking
description: Use when setting up, configuring, auditing, or using RB multi-entity bank connectivity for Wamo, Bank of Ireland Business, Wise, Enable Banking, or related bank-account registry work.
---

# RB Open Banking

Use this skill for Richmond Blackwood legal-entity bank connectivity, including setup discovery, provider support checks, consent/session setup, Wise profile mapping, and safe registry maintenance.

## Read First

1. `setup/mcp/rb-open-banking.md`
2. `internal/bank-connectivity-registry.md`
3. `memory/systems-and-data.md`
4. `memory/notion-database-standards.md`
5. The relevant `clients/Companies/<reference>/` folder.

## Scope

- Entity key: Notion Company `Reference`.
- Required rails per entity: `wamo`, `boi_business`, `wise`.
- Internal/external classification is not part of bank-connectivity routing.
- BOI Business and Wamo use Enable Banking first for read-only account-information flows.
- Wise uses the Wise Business API for profiles, balances, account details, and statements.
- Direct Wamo/Salt Edge Berlin Group PSD2 is fallback-only and requires separate approval for TPP/certificate/client setup.

## Safety Rules

- Never commit provider keys, tokens, private keys, authorization codes, session IDs, account IDs, IBANs, balances, transactions, statement exports, or raw bank data.
- Keep local provider state under `.codex-local/rb-open-banking/` and local env values in ignored `.env.local`.
- Live API calls require explicit user approval and an `approvalPurpose` tool input.
- Use the smallest useful date/account window for any live read.
- Payment initiation, account creation, and moving money are out of scope unless the user approves a separate workflow.
- Store only safe registry facts in git: entity reference, bank rail, provider route, status, safe alias, Notion pointer, verification date, and blocker.

## Operating Flow

1. Run `npm run mcp:rb-open-banking -- --status` before using the MCP.
2. Load the entity folder and existing Bank Accounts Notion pointers.
3. Run safe entity setup status.
4. For BOI/Wamo, use Enable Banking ASPSP lookup after approval, then record the chosen ASPSP route in `.env.local`.
5. Start authorization only after approval; the user completes the bank consent/account selection.
6. Save the Enable Banking session locally after approval and record only the safe session label in the registry.
7. For Wise, list profiles after approval, map the correct business profile to the entity, and use shared credentials if they can access it.
8. If shared Wise or BOI/Wamo credentials cannot access an entity, use the entity-specific token/session env route.
9. Update `internal/bank-connectivity-registry.md` with safe metadata only.

## Closeout

- Run `node --check setup/mcp/rb-open-banking/server.mjs`.
- Run `npm run mcp:rb-open-banking -- --status`.
- Run `npm run typecheck`.
- Run `git diff --check`.
- Verify `git ls-files .codex-local .env.local` is empty.
- Append durable memory only with safe setup facts and blockers.
