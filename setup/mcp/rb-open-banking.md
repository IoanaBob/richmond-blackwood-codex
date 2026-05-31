# RB Open Banking Setup

Status: provisional.
Source: user instruction in Codex chat on 2026-05-31; provider documentation linked below; personal-codex Enable Banking MCP pattern.
Imported: 2026-05-31.
Review: verify provider support and credentials entity by entity before treating any bank rail as connected.

This setup provides read-only bank connectivity infrastructure for Richmond Blackwood legal entities/clients. Entity scope is not based on internal/external classification. The stable key is the Notion Company `Reference` and matching `clients/Companies/<reference>/` folder.

## Scope

Every company entity should be trackable against:

- `wamo`
- `boi_business`
- `wise`

The MCP server supports full setup flows, but live actions require explicit approval in the tool input and should also run with Codex MCP tool approval set to prompt.

Out of scope unless separately approved:

- payment initiation;
- moving money;
- creating new bank accounts;
- storing raw statements or transaction exports in git;
- direct Wamo PSD2 TPP/certificate setup beyond documenting the fallback path.

## What Lives In Git

- MCP server and provider modules under `setup/mcp/rb-open-banking/`.
- Safe registry metadata in `internal/bank-connectivity-registry.md`.
- Setup docs, env variable names, and the `rb-open-banking` skill.

## What Must Stay Local

Do not commit:

- Enable Banking private keys, application secrets, authorization codes, session IDs, account IDs, balances, transactions, or exports.
- Wise tokens, OAuth client secrets, profile-token mappings, raw account details, statements, balances, or transactions.
- Wamo PSD2 certificates, private keys, tokens, account IDs, balances, or transactions.
- Local Codex MCP config in `~/.codex/config.toml`.

Local material should live under:

```text
.codex-local/rb-open-banking/
```

## Provider Routes

### Bank of Ireland Business

Use Enable Banking first for account-information consent and reads. BOI Business access must be authorized through the bank's Open Banking flow and selected accounts must be shared by an authorized Business On Line user.

Primary route:

```text
boi_business -> Enable Banking ASPSP -> read-only balances/transactions
```

### Wamo

Use Enable Banking ASPSP lookup first. If Wamo is unavailable through the selected aggregator, direct Wamo/Salt Edge Berlin Group PSD2 is a fallback only after RB approves the required TPP/certificate/client setup.

Primary route:

```text
wamo -> Enable Banking ASPSP -> read-only balances/transactions
```

Fallback route:

```text
wamo -> direct Berlin Group PSD2 -> only after separate approval
```

### Wise

Use the Wise Business API for profiles, balances, account details, and statements. Prefer one shared token/OAuth route if it can access the relevant business profiles; otherwise configure entity-specific token files.

Primary route:

```text
wise -> Wise Business API -> read-only profiles/balances/account details/statements
```

## Local Environment

Copy only the needed placeholders to ignored `.env.local`.

Shared Enable Banking config:

```text
RB_BANK_ENABLE_BANKING_APP_ID=
RB_BANK_ENABLE_BANKING_PRIVATE_KEY_FILE=.codex-local/rb-open-banking/enable-banking-private.pem
RB_BANK_ENABLE_BANKING_REDIRECT_URL=https://example.com/rb-open-banking/callback
RB_BANK_ENABLE_BANKING_STORE_FILE=.codex-local/rb-open-banking/enable-banking-sessions.json
RB_BANK_ENABLE_BANKING_PSU_IP_ADDRESS=
RB_BANK_ENABLE_BANKING_PSU_USER_AGENT=
```

Shared Wise config:

```text
RB_BANK_WISE_API_BASE_URL=https://api.wise.com
RB_BANK_WISE_TOKEN_FILE=.codex-local/rb-open-banking/wise-token.txt
```

Per-entity routing examples, replacing `AKS` with the Notion Company `Reference` converted to uppercase env-safe form:

```text
RB_BANK_ENTITY_AKS_BOI_ASPSP_NAME=
RB_BANK_ENTITY_AKS_BOI_COUNTRY=IE
RB_BANK_ENTITY_AKS_BOI_SESSION_LABEL=aks-boi-business-operating
RB_BANK_ENTITY_AKS_BOI_SAFE_ALIAS=aks-boi-business-operating

RB_BANK_ENTITY_AKS_WAMO_ROUTE=enable_banking
RB_BANK_ENTITY_AKS_WAMO_ASPSP_NAME=
RB_BANK_ENTITY_AKS_WAMO_COUNTRY=IE
RB_BANK_ENTITY_AKS_WAMO_SESSION_LABEL=aks-wamo-operating
RB_BANK_ENTITY_AKS_WAMO_SAFE_ALIAS=aks-wamo-operating

RB_BANK_ENTITY_AKS_WISE_PROFILE_ID=
RB_BANK_ENTITY_AKS_WISE_TOKEN_FILE=
RB_BANK_ENTITY_AKS_WISE_SAFE_ALIAS=aks-wise-business-eur
```

Use entity-specific token files only where shared credentials cannot access that entity's profile or bank route.

## Install And Run

Install/update dependencies:

```bash
npm install
```

Safe status check:

```bash
npm run mcp:rb-open-banking -- --status
```

The status output must show only booleans, counts, paths, and registry coverage. It must not print app IDs, tokens, private keys, session IDs, account IDs, balances, or transactions.

## Codex MCP Config

Add this manually to `~/.codex/config.toml`, adjusting the path if needed:

```toml
[mcp_servers.rb_open_banking]
command = "node"
args = [
  "/Users/ioana/.codex/worktrees/895e/richmond-blackwood-codex/setup/mcp/rb-open-banking/server.mjs",
]
startup_timeout_sec = 30
tool_timeout_sec = 120
default_tools_approval_mode = "prompt"
```

Restart or reload Codex after changing the local config.

## Setup Flow Per Entity

1. Read `internal/bank-connectivity-registry.md` and the entity folder under `clients/Companies/<reference>/`.
2. Check Notion Bank Accounts for existing company-owned bank-account records and safe aliases.
3. Run the safe entity status tool:

```text
rb_open_banking_entity_setup_status
```

4. For BOI Business and Wamo, call Enable Banking ASPSP lookup only after approval:

```text
rb_open_banking_enable_banking_list_aspsps
```

5. Add the chosen ASPSP name/country and safe aliases to `.env.local`.
6. Start consent only after approval:

```text
rb_open_banking_enable_banking_start_authorization
```

7. The user completes bank authorization/account selection. Save the returned session only after approval:

```text
rb_open_banking_enable_banking_create_session
```

8. For Wise, first list accessible profiles only after approval:

```text
rb_open_banking_wise_list_profiles
```

9. Configure the entity's Wise profile ID/token route in `.env.local`.
10. Read balances, account details, statements, or transactions only for the approved entity/bank/date window.
11. Update the safe registry with setup status only. Do not copy raw account data into git.

## Tool Safety

Tools that make live API calls require `approvalPurpose`. Use a specific approval text, for example:

```text
Approved by Ioana on 2026-05-31 to list Wise profiles for RB entity setup.
```

The safe tools do not make live bank API calls:

- `rb_open_banking_status`
- `rb_open_banking_entity_setup_status`
- `rb_open_banking_entity_env_status`
- `rb_open_banking_enable_banking_status`
- `rb_open_banking_wise_status`
- `rb_open_banking_wamo_direct_status`

## Provider References

- [Bank of Ireland Open Banking help](https://www.bankofireland.com/accountaccess/help-roi/)
- [Bank of Ireland Developer Hub](https://developer.bankofireland.com/)
- [Wise Business API](https://wise.com/us/business/api)
- [Wise API authentication](https://docs.wise.com/api-docs/features/authentication-access/personal-tokens)
- [Wise profiles API](https://docs.wise.com/api-docs/api-reference/profile)
- [Wise balances API](https://docs.wise.com/api-reference/balance/balancelist)
- [Wise account details API](https://docs.wise.com/api-docs/api-reference/bank-account-details)
- [Wise balance statements API](https://docs.wise.com/api-docs/api-reference/balance-statement)
- [Enable Banking linked accounts](https://enablebanking.com/docs/api/linked-accounts/)
- [Enable Banking FAQ](https://enablebanking.com/docs/faq/)
- [Wamo PSD2 API docs](https://priora.saltedge.com/docs/berlingroup/wamo_eu)

## Verification

Run before closing any implementation change:

```bash
node --check setup/mcp/rb-open-banking/server.mjs
npm run mcp:rb-open-banking -- --status
npm run typecheck
git diff --check
git ls-files .codex-local .env.local
```

After credentials and explicit approval, live verification may include:

- provider credential status;
- ASPSP lookup for BOI/Wamo;
- Wise profile list/read test;
- one narrow balance, transaction, or statement read per approved entity-bank pair.
