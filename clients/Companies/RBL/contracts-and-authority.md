# Contracts And Authority

Status: provisional.
Source: Notion company record `https://www.notion.so/60b3d344d0734dc5a2e30d012be50804`, linked filing registrations, CRO Open Data, internal product-offering memory, and Notion document `RB Porting to Sage Exploration`.
Imported: 2026-06-03.
Review: Confirm official public title wording for RBL principals and verify live regulatory records before external statements.

## Corporate Identity

| Field | Value | Source |
| --- | --- | --- |
| Legal name | RICHMOND BLACKWOOD LIMITED | Notion company; CRO Open Data |
| Reference | RBL | Notion company |
| Company number | 735818 | Notion company; CRO Open Data |
| Company type | LTD - Private Company Limited by Shares | CRO Open Data |
| Company status | Normal | CRO Open Data |
| Incorporated | 2023-02-28 | Notion company; CRO Open Data |
| Tax residence | Ireland | Notion company |
| CRO NARD | 2026-08-28 | CRO Open Data |
| Last accounts date in CRO Open Data | 2024-12-31 | CRO Open Data |
| Registered office per CRO Open Data | Workhub, 77 Camden Street Lower, Dublin 2, D02 XE80 | CRO Open Data |
| Correspondence address in Notion | 77 Camden Street Lower, Dublin, Dublin 2, D02 XE80, Ireland | Notion company |

The fetched Notion company record had `Registered Office Address` blank. CRO Open Data returned the Workhub/Camden Street address. Treat this as a Notion data-quality cleanup item until written back and read back in Notion.

## Authority And Roles

| Relationship | Linked person/entity | Source | Notes |
| --- | --- | --- | --- |
| Directors | Eran Peer; Ioana Surdu-Bob | Notion company relation | Company authority context only in this import. |
| UBOs | Ioana Surdu-Bob; Eran Peer | Notion company relation | Do not copy personal identifiers or private asset/tax records into this company folder. |
| Individual shareholder relation | Ioana Surdu-Bob | Notion company relation | Relationship was observed but not expanded in this pass. |
| Company shareholder relation | Linked company row exists | Notion company relation | Fetch the linked row before naming it or relying on it. |
| Employees relation | Linked employment/employee rows exist | Notion company relation | Fetch employment rows before recording employee-level details. |

## Regulatory And Practice Context

| Registration / authority area | Status | Source | Notes |
| --- | --- | --- | --- |
| TCSP License | Registered | `https://www.notion.so/177e4130131480c5b014ed7909610ef0` | Notion title: `RBL - APP/1509/2023 - TCSP License`; due date 2027-09-20; registration file listed as `RB_TCSP_LICENSE.pdf`. |
| RBO | Registered | `https://www.notion.so/175e4130131480b89a31cac64d759c25` | One-off filing registration. |
| GoAML | Number present in company record | Notion company | Company record has GoAML number `6738`. Verify current status in the relevant authority system before external statements. |
| TAIN | Number present in company record | Notion company | Company record has TAIN `81179D`. Verify before authority-facing use. |
| Auto Enrolment | Registered | `https://www.notion.so/2c6e4130131480358c05fc19f4d98f07` | Comments say RB is now enrolled with Auto enrolment. |

## Service Provider Scope

`RB Porting to Sage Exploration` describes Richmond Blackwood as an Ireland-based TCSP managing company administration, tax filings, incorporations, corporate secretarial matters, board administration, director/secretary services, and cross-jurisdiction work across Ireland, Germany, and the UK.

Source: `https://www.notion.so/33de41301314805ca8c5c4b429df2858`.

Use `internal/product-offerings.md` for product/service catalogue memory. Use client folders and live contract rows for client-specific pricing, scope, and invoicing rules.
