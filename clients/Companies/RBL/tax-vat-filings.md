# Tax, VAT, And Filings

Status: provisional.
Source: Notion company, filing-registration, filing, tax-payment, and task records reviewed on 2026-06-03.
Imported: 2026-06-03.
Review: Verify live ROS/CRO/Notion status before treating any due, overdue, payment, or filed position as settled.

## Filing Registrations

| Area | Current Notion status | Source | Notes |
| --- | --- | --- | --- |
| Irish tax residence | Ireland on company record | `https://www.notion.so/60b3d344d0734dc5a2e30d012be50804` | Company record has TAIN and GoAML fields populated. |
| Irish VAT | Registered | `https://www.notion.so/175e413013148046a0d1cae8d5287c8c` | Bi-monthly cadence; tax/filing number shown as `IE4222296CH`. |
| VIES | Overdue on registration row | `https://www.notion.so/175e41301314806c89a3f73d57d407e6` | Future VIES filing row exists; verify whether registration status is stale/formula-driven. |
| RTD | Registered | `https://www.notion.so/175e4130131480ea958fcafa1bb89332` | Yearly cadence. |
| Corporation Tax | Overdue on registration row | `https://www.notion.so/175e4130131480c09fa4c52cbef80c04` | Future corporation-tax filing row exists; verify whether registration status is stale/formula-driven. |
| Annual Tax Filing | Registered | `https://www.notion.so/175e413013148060a89cc7735778a798` | Yearly cadence. |
| Annual Returns | Registered | `https://www.notion.so/175e413013148003b532ce53fc152fe3` | Notion due date 2025-08-28; CRO Open Data NARD 2026-08-28 and last annual-return date 2025-08-28. |
| Payroll Tax | Overdue on registration row | `https://www.notion.so/344e41301314800cb03dd1e3c72261c0` | Future payroll-tax filing row exists, but April PAYE payment still showed due in Notion. |
| RBO | Registered | `https://www.notion.so/175e4130131480b89a31cac64d759c25` | One-off registration. |
| TCSP License | Registered | `https://www.notion.so/177e4130131480c5b014ed7909610ef0` | Due 2027-09-20. |
| Auto Enrolment | Registered | `https://www.notion.so/2c6e4130131480358c05fc19f4d98f07` | Comments say RB is enrolled. |

## Current Filing And Payment Issues

| Issue | Status in Notion | Source | Review needed |
| --- | --- | --- | --- |
| RBL PAYE payroll tax Apr 2026 payment | Tax payment row `Due`; due date 2026-06-02; amount EUR 3,115.26 | `https://www.notion.so/365e413013148122813cd9da7e6530c4` | Current date is 2026-06-03. Confirm whether payment was made outside Notion before escalation. |
| April 2026 payroll filing | Filing row `Filed`; filed on 2026-05-19; due 2026-05-14 | `https://www.notion.so/365e41301314802084b2c53c321ff1bb` | Filing is filed, but the linked payment remains the separate live check. |
| Payroll registration marked overdue | Registration row `Overdue`, but future filing row exists | Registration `https://www.notion.so/344e41301314800cb03dd1e3c72261c0`; future filing `https://www.notion.so/372e41301314812392bff3e2d79934f4` | Determine whether the registration status is stale, formula-derived, or tied to the due PAYE payment. |
| VIES registration marked overdue | Registration row `Overdue`, but future filing row exists | Registration `https://www.notion.so/175e41301314806c89a3f73d57d407e6`; future filing `https://www.notion.so/34fe41301314817b8075c91b78d645ab` | Verify live VIES status before opening a duplicate task. |
| Corporation-tax registration marked overdue | Registration row `Overdue`, but future corporation-tax row exists | Registration `https://www.notion.so/175e4130131480c09fa4c52cbef80c04`; future filing `https://www.notion.so/311e41301314811f99b2f65845eb9bd7` | Verify whether the status is stale/formula-driven. |
| Future VAT filing title/date mismatch | Filing title says `RBL - VAT - 19 Apr 2027`, due-date property says 2027-05-19 | `https://www.notion.so/350e41301314813c9fb5eb835a322d45` | Correct title or confirm due-date logic before relying on calendar/title searches. |

## Annual VAT Cleanup Context

RBL-specific task `RBL - add annual VAT filing rows for 2023 and 2024 corp-tax years` was archived on 2026-06-03.

Source: `https://www.notion.so/373e4130131481f39f77db12e6c43916`.

It was superseded by the consolidated task `File annual VAT for affected RB clients`, whose checklist includes NACV, CLV, AGL, CBMAX, WEW, and PCL. RBL is not in the final checklist.

Source: `https://www.notion.so/373e4130131481e495f1e2d22008e4ed`.

Do not reopen RBL annual-VAT work from the archived duplicate unless a live RBL filing row or authority source shows RBL is actually in scope.
