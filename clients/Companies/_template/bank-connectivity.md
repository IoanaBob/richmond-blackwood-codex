# Bank Connectivity

Status: template.
Source: RB open-banking setup rules.
Imported: 2026-05-31.
Review: fill safe aliases and Notion bank-account pointers only after entity-specific discovery.

Use this file for safe bank-connectivity routing pointers for this company entity. The canonical cross-entity registry is `../../../internal/bank-connectivity-registry.md`.

Do not store live credentials, tokens, private keys, authorization codes, session IDs, account IDs, IBANs, balances, transactions, statement exports, or raw bank data in git.

## Required Rails

| Bank Rail | Expected Provider Route | Status | Safe Alias | Notion Bank Account Page | Last Verified | Blocker |
| --- | --- | --- | --- | --- | --- | --- |
| wamo | Enable Banking first; Wamo direct PSD2 fallback | unknown | pending | pending | not verified | Discovery not run. |
| boi_business | Enable Banking | unknown | pending | pending | not verified | Discovery not run. |
| wise | Wise Business API | unknown | pending | pending | not verified | Discovery not run. |

## Local Env Routing

Use the Notion Company `Reference` as the env key after converting it to uppercase env-safe form.

Examples:

```text
RB_BANK_ENTITY_<REF>_BOI_ASPSP_NAME=
RB_BANK_ENTITY_<REF>_BOI_SESSION_LABEL=
RB_BANK_ENTITY_<REF>_WAMO_ASPSP_NAME=
RB_BANK_ENTITY_<REF>_WAMO_SESSION_LABEL=
RB_BANK_ENTITY_<REF>_WISE_PROFILE_ID=
RB_BANK_ENTITY_<REF>_WISE_TOKEN_FILE=
```

`<REF>` placeholders belong only in docs. Actual local `.env.local` keys should use the concrete reference, for example `RB_BANK_ENTITY_AKS_WISE_PROFILE_ID`.
