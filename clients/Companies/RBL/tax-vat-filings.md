# Tax, VAT, And Filings

Status: provisional.
Source: Notion company, filing-registration, filing, tax-payment, and task records reviewed on 2026-06-03 and updated/read back on 2026-06-05.
Imported: 2026-06-03; updated 2026-06-05.
Review: Verify live ROS/CRO/Notion status before treating any due, overdue, payment, or filed position as settled.

## Filing Registrations

| Area | Current Notion status | Source | Notes |
| --- | --- | --- | --- |
| Irish tax residence | Ireland on company record | `https://www.notion.so/60b3d344d0734dc5a2e30d012be50804` | Company record has TAIN and GoAML fields populated. |
| Irish VAT | Registered | `https://www.notion.so/175e413013148046a0d1cae8d5287c8c` | Bi-monthly cadence; tax/filing number shown as `IE4222296CH`. |
| VIES | Registered | `https://www.notion.so/175e41301314806c89a3f73d57d407e6` | Updated from `Overdue` to `Registered` on 2026-06-05 after user review; read back in Notion. |
| RTD | Registered | `https://www.notion.so/175e4130131480ea958fcafa1bb89332` | Yearly cadence. |
| Corporation Tax | Registered | `https://www.notion.so/175e4130131480c09fa4c52cbef80c04` | Updated from `Overdue` to `Registered` on 2026-06-05 after user review; read back in Notion. |
| Annual Tax Filing | Registered | `https://www.notion.so/175e413013148060a89cc7735778a798` | Yearly cadence. |
| Annual Returns | Registered | `https://www.notion.so/175e413013148003b532ce53fc152fe3` | Notion due date 2025-08-28; CRO Open Data NARD 2026-08-28 and last annual-return date 2025-08-28. |
| Payroll Tax | Registered | `https://www.notion.so/344e41301314800cb03dd1e3c72261c0` | Updated from `Overdue` to `Registered` on 2026-06-05 after user review; read back in Notion. |
| RBO | Registered | `https://www.notion.so/175e4130131480b89a31cac64d759c25` | One-off registration. |
| TCSP License | Registered | `https://www.notion.so/177e4130131480c5b014ed7909610ef0` | Due 2027-09-20. |
| Auto Enrolment | Registered | `https://www.notion.so/2c6e4130131480358c05fc19f4d98f07` | Comments say RB is enrolled. |

## Current Filing And Payment Status

| Item | Status in Notion | Source | Notes |
| --- | --- | --- | --- |
| RBL VAT3 Mar/Apr 2026 filing | `Filed`; filed on logging date 2026-06-08; ROS Date Filed 2026-05-24 | Filing `https://app.notion.com/p/311e4130131481468a88dd6e928d92ba`; Drive proof `https://drive.google.com/file/d/1UDR_MVlVW1bR3xkXZPI1VuIMyECMdnQq/view?usp=drivesdk` | ROS Revenue Record > Returns > VAT showed registration `4222296CH`, VAT3 period 01/03/2026-30/04/2026, due 19/05/2026, issue 10/04/2026, Date Filed 24/05/2026. Notion `Submission`, `Status`, and `Filed on` read back populated. Payment Due was left unchanged and no Tax payment row was created because the proof page did not show a balance and Charges & Payments was unavailable during the run. Local proof capture was JPEG data in `/private/tmp/rbl-ros-vat3-2026-03-01_2026-04-30-proof.png`, 146183 bytes, SHA-256 `68c1e75016b75f277c3c09ecf353538b897d7fad94d44b3403e5b9574506699c`. |
| RBL PAYE payroll tax Apr 2026 payment | `Paid`; due date 2026-06-02; amount EUR 3,115.26 | `https://www.notion.so/365e413013148122813cd9da7e6530c4` | User confirmed paid on 2026-06-05; Notion status was updated and read back as `Paid`. |
| April 2026 payroll filing | `Filed`; filed on 2026-05-19; due 2026-05-14 | `https://www.notion.so/365e41301314802084b2c53c321ff1bb` | Filing remains filed; linked payment is now read back as paid. |
| Payroll registration | `Registered` | Registration `https://www.notion.so/344e41301314800cb03dd1e3c72261c0`; future filing `https://www.notion.so/372e41301314812392bff3e2d79934f4` | Updated and read back on 2026-06-05. |
| VIES registration | `Registered` | Registration `https://www.notion.so/175e41301314806c89a3f73d57d407e6`; future filing `https://www.notion.so/34fe41301314817b8075c91b78d645ab` | Updated and read back on 2026-06-05. |
| Corporation-tax registration | `Registered` | Registration `https://www.notion.so/175e4130131480c09fa4c52cbef80c04`; future filing `https://www.notion.so/311e41301314811f99b2f65845eb9bd7` | Updated and read back on 2026-06-05. |
| Future VAT filing title/date | Title `RBL - VAT - 19 May 2027`; due-date property 2027-05-19 | `https://www.notion.so/350e41301314813c9fb5eb835a322d45` | User confirmed the due date is correct; title was corrected and read back on 2026-06-05. |

## Annual VAT Cleanup Context

RBL-specific task `RBL - add annual VAT filing rows for 2023 and 2024 corp-tax years` was archived on 2026-06-03.

Source: `https://www.notion.so/373e4130131481f39f77db12e6c43916`.

It was superseded by the consolidated task `File annual VAT for affected RB clients`, whose checklist includes NACV, CLV, AGL, CBMAX, WEW, and PCL. RBL is not in the final checklist.

Source: `https://www.notion.so/373e4130131481e495f1e2d22008e4ed`.

Do not reopen RBL annual-VAT work from the archived duplicate unless a live RBL filing row or authority source shows RBL is actually in scope.
