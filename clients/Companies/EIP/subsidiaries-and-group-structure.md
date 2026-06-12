# Subsidiaries And Group Structure

Status: provisional.
Source: Notion company record `https://www.notion.so/b394acc6efaa48d3904cd0bad638e64d`, linked company records fetched on 2026-06-05, user instructions on 2026-06-05 and 2026-06-07, and task creation/read-back on 2026-06-07.
Imported: 2026-06-05; updated 2026-06-07.
Review: Use the live group-structure diagram task before relying on direct/indirect/portfolio classifications for legal, tax, banking, or external reporting.

## Holding-Company Context

User instruction on 2026-06-05 describes EIP as the holding company of the venture-builder companies. User review on 2026-06-07 confirmed the currently fetched direct Notion relation should be treated as correct for this pass. The live Notion company relation currently gives the direct subsidiary/shareholder-of set below.

| Related company | Reference | Source | Relationship observed | Notes |
| --- | --- | --- | --- | --- |
| MONOCHROMATIC LIMITED | MONO | `https://www.notion.so/7d2d1876a3024ee0a3e5a3d1825485e0` | Listed in EIP `Shareholder of / Subsidiaries` | Do not duplicate MONO operating detail in EIP. Use `../MONO/`. |
| EVERGUARD RESEARCH LIMITED | EVG | `https://www.notion.so/15fe4130131480079a95fd029aef3511` | Listed in EIP `Shareholder of / Subsidiaries` | Notion business purpose reads as real-estate activity despite legal name and active research/bond/auction operations. Use `../EVG/`. |
| RICHMOND BLACKWOOD LIMITED | RBL | `https://www.notion.so/60b3d344d0734dc5a2e30d012be50804` | Listed in EIP `Shareholder of / Subsidiaries` | Existing repo folder: `clients/Companies/RBL/`. |

## Adjacent Companies

Konvi appears in active EIP intercompany contracts but was not listed as a direct EIP subsidiary in the fetched EIP company relation. Treat Konvi as an intercompany/counterparty context item here, not as a confirmed direct subsidiary, unless ownership source records are fetched and reviewed.

EXOTIC VAULTS FOUNDATION CLG (`../EXV/`) is listed in Notion as held by KONVI HOLDINGS LIMITED, not as a direct EIP subsidiary in the fetched EIP relation. Treat EXV as broader Konvi/KHL internal group context until the group-structure task confirms direct/indirect classifications.

The broader venture-builder structure needs a dedicated ownership pass if EIP's holding-company scope is used for legal, tax, banking, or external reporting.

Live task: `Create EIP group structure diagram` / `https://app.notion.com/p/378e41301314811f8e8edbfaa69afca0`.

Task scope recorded on 2026-06-07: start from EIP and the direct Notion `Shareholder of / Subsidiaries` relation, include MONO, EVG, and RBL as current direct relations, and distinguish direct, indirect, portfolio, and separately owned entities without inferring ownership where source evidence is missing.
