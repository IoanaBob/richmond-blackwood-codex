# Bank Connectivity Registry

Status: provisional.
Source: user instruction in Codex chat on 2026-05-31; local repo company folders.
Imported: 2026-05-31.
Review: run entity-by-entity discovery against Notion Bank Accounts, Enable Banking ASPSP lookup, and Wise profile access before treating any row as connected.

This registry tracks safe metadata only. Do not store live credentials, tokens, private keys, session IDs, account IDs, IBANs, balances, transactions, statement exports, or raw bank data in git.

Every legal entity/client should be trackable against three required rails:

- `wamo`
- `boi_business`
- `wise`

Internal/external classification is not a bank-connectivity dimension. The stable entity key is the Notion Company `Reference` and matching `clients/Companies/<reference>/` folder.

| Entity Reference | Legal Entity | Bank Rail | Provider Route | Status | Safe Alias | Notion Bank Account Page | Last Verified | Blocker |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AGL | See `clients/Companies/AGL` | wamo | Enable Banking first; Wamo direct PSD2 fallback | unknown | pending | pending | not verified | Discovery not run. |
| AGL | See `clients/Companies/AGL` | boi_business | Enable Banking | unknown | pending | pending | not verified | Discovery not run. |
| AGL | See `clients/Companies/AGL` | wise | Wise Business API | unknown | pending | pending | not verified | Discovery not run. |
| AKS | See `clients/Companies/AKS` | wamo | Enable Banking first; Wamo direct PSD2 fallback | unknown | pending | pending | not verified | Discovery not run. |
| AKS | See `clients/Companies/AKS` | boi_business | Enable Banking | unknown | pending | pending | not verified | Discovery not run. |
| AKS | See `clients/Companies/AKS` | wise | Wise Business API | unknown | pending | pending | not verified | Discovery not run. |
| AMC | See `clients/Companies/AMC` | wamo | Enable Banking first; Wamo direct PSD2 fallback | unknown | pending | pending | not verified | Discovery not run. |
| AMC | See `clients/Companies/AMC` | boi_business | Enable Banking | unknown | pending | pending | not verified | Discovery not run. |
| AMC | See `clients/Companies/AMC` | wise | Wise Business API | unknown | pending | pending | not verified | Discovery not run. |
| CBMAX | See `clients/Companies/CBMAX` | wamo | Enable Banking first; Wamo direct PSD2 fallback | unknown | pending | pending | not verified | Discovery not run. |
| CBMAX | See `clients/Companies/CBMAX` | boi_business | Enable Banking | unknown | pending | pending | not verified | Discovery not run. |
| CBMAX | See `clients/Companies/CBMAX` | wise | Wise Business API | unknown | pending | pending | not verified | Discovery not run. |
| CLV | See `clients/Companies/CLV` | wamo | Enable Banking first; Wamo direct PSD2 fallback | unknown | pending | pending | not verified | Discovery not run. |
| CLV | See `clients/Companies/CLV` | boi_business | Enable Banking | unknown | pending | pending | not verified | Discovery not run. |
| CLV | See `clients/Companies/CLV` | wise | Wise Business API | unknown | pending | pending | not verified | Discovery not run. |
| Konvi | See `clients/Companies/Konvi` | wamo | Enable Banking first; Wamo direct PSD2 fallback | unknown | pending | pending | not verified | Discovery not run. |
| Konvi | See `clients/Companies/Konvi` | boi_business | Enable Banking | unknown | pending | pending | not verified | Discovery not run. |
| Konvi | See `clients/Companies/Konvi` | wise | Wise Business API | unknown | pending | pending | not verified | Discovery not run. |
| MHL | See `clients/Companies/MHL` | wamo | Enable Banking first; Wamo direct PSD2 fallback | unknown | pending | pending | not verified | Discovery not run. |
| MHL | See `clients/Companies/MHL` | boi_business | Enable Banking | unknown | pending | pending | not verified | Discovery not run. |
| MHL | See `clients/Companies/MHL` | wise | Wise Business API | unknown | pending | pending | not verified | Discovery not run. |
| NACV | See `clients/Companies/NACV` | wamo | Enable Banking first; Wamo direct PSD2 fallback | unknown | pending | pending | not verified | Discovery not run. |
| NACV | See `clients/Companies/NACV` | boi_business | Enable Banking | unknown | pending | pending | not verified | Discovery not run. |
| NACV | See `clients/Companies/NACV` | wise | Wise Business API | unknown | pending | pending | not verified | Discovery not run. |
| RBL | See `clients/Companies/RBL` | wamo | Enable Banking first; Wamo direct PSD2 fallback | unknown | pending | pending | not verified | Discovery not run. |
| RBL | See `clients/Companies/RBL` | boi_business | Enable Banking | unknown | pending | pending | not verified | Discovery not run. |
| RBL | See `clients/Companies/RBL` | wise | Wise Business API | unknown | pending | pending | not verified | Discovery not run. |
| SVL | See `clients/Companies/SVL` | wamo | Enable Banking first; Wamo direct PSD2 fallback | unknown | pending | pending | not verified | Discovery not run. |
| SVL | See `clients/Companies/SVL` | boi_business | Enable Banking | unknown | pending | pending | not verified | Discovery not run. |
| SVL | See `clients/Companies/SVL` | wise | Wise Business API | unknown | pending | pending | not verified | Discovery not run. |
| TPL | See `clients/Companies/TPL` | wamo | Enable Banking first; Wamo direct PSD2 fallback | unknown | pending | pending | not verified | Discovery not run. |
| TPL | See `clients/Companies/TPL` | boi_business | Enable Banking | unknown | pending | pending | not verified | Discovery not run. |
| TPL | See `clients/Companies/TPL` | wise | Wise Business API | unknown | pending | pending | not verified | Discovery not run. |
| VUN | See `clients/Companies/VUN` | wamo | Enable Banking first; Wamo direct PSD2 fallback | unknown | pending | pending | not verified | Discovery not run; VUN has an existing company bank-account relation pointer in `accounting-bookkeeping-payroll.md`. |
| VUN | See `clients/Companies/VUN` | boi_business | Enable Banking | unknown | pending | pending | not verified | Discovery not run; VUN has an existing company bank-account relation pointer in `accounting-bookkeeping-payroll.md`. |
| VUN | See `clients/Companies/VUN` | wise | Wise Business API | unknown | pending | pending | not verified | Discovery not run; VUN has an existing company bank-account relation pointer in `accounting-bookkeeping-payroll.md`. |
| WEW | See `clients/Companies/WEW` | wamo | Enable Banking first; Wamo direct PSD2 fallback | unknown | pending | pending | not verified | Discovery not run. |
| WEW | See `clients/Companies/WEW` | boi_business | Enable Banking | unknown | pending | pending | not verified | Discovery not run. |
| WEW | See `clients/Companies/WEW` | wise | Wise Business API | unknown | pending | pending | not verified | Discovery not run. |

## Status Values

- `connected`: live API/session access was tested after explicit approval.
- `registered`: entity appears to have the bank/account route but API/session access is not connected.
- `unknown`: discovery has not confirmed whether the entity has the bank route.
- `blocked`: setup cannot continue until a named blocker is resolved.
- `not applicable`: use only after user approval; the default assumption is that all three rails should be trackable.

## Safe Alias Standard

Use a short alias that identifies the entity, bank rail, and account purpose without exposing raw identifiers, for example:

```text
aks-wamo-operating
aks-boi-business-operating
aks-wise-business-eur
```

Raw account IDs, IBANs, BICs, balances, transactions, statement files, API tokens, private keys, OAuth artifacts, authorization codes, and session IDs stay in `.env.local`, `.codex-local/`, provider portals, Notion, Drive, or the bank system as appropriate, not in git.
