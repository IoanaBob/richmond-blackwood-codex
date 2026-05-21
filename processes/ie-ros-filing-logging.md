# IE ROS Filing Logging

Status: provisional.
Source: user instruction in Codex chat on 2026-05-18 and live Notion Filings/Tax payments schema fetched 2026-05-18.
Imported: 2026-05-18.
Review: pilot one completed filing, confirm the `Payment Due` sign convention mismatch, and approve before processing the wider IE backlog.

## Purpose

Record one completed Irish ROS filing in RB Notion with proof, filing date, payment/refund amount, and any required tax-payment task.

## Scope

Use this process for a single filing in the Filings database. Backlog work is a repetition of this one-filing process across IE jurisdiction rows with due dates before the run date.

## Live Notion Surfaces

- Filings database: `https://www.notion.so/f9af3b86b2a3430d8c48c8b0567091e7`.
- IE backlog view: `https://www.notion.so/f9af3b86b2a3430d8c48c8b0567091e7?v=1c8e4130131480e1a46c000cdb4ab729`.
- Filings data source: `collection://ee7ef5c8-6a29-43dd-b2aa-63eddaa98971`.
- Tax payments data source: `collection://1fae4130-1314-81c1-b7dd-000b7ac91166`.
- Simoneta assignee user ID: `b5e3ee56-b550-4959-8ec2-301d6e69e111`.

## Process

1. Fetch the target Filings row and its linked company and filing registration.
2. Confirm the row is IE jurisdiction and, for backlog work, due before the current run date.
3. Open ROS and let the operator complete login.
   - If no certificate is loaded in the browser, open `Manage My Certificates`, have the operator upload/load the `.p12` certificate and enter the password, then return to login.
   - After login, use `TAIN Services` to find the client. If the exact client is visible under `Last 10 Clients Accessed`, opening that row is acceptable.
   - On the client `My Services` page, choose the service that matches the filing, such as `Payroll > View payroll` for payroll filings.
   - If ROS asks for a PREM registration, compare the visible options to Notion context and inspect one at a time. Record the PREM registration that produced the matching filing period.
4. Search ROS for the matching filing by company, registration, tax type, period, due date, or evidence number.
5. If ROS does not show a matching submitted filing, do not mark the Notion row as filed; record the blocker and move to review.
6. If ROS shows a matching submitted filing, download or preserve the filing proof and evidence number. If ROS has no download, a cropped period-summary proof is acceptable when it shows company, registration, period, status/counts, and totals while excluding unnecessary employee identifiers.
7. Attach the proof to the Filings `Submission` property. If a local Notion upload path is unavailable, upload the proof to the verified client Drive folder and set the Notion file property with the Drive URL string.
   - The 2026-05-18 pilot found that the Notion connector accepts URL-backed file properties but does not expose direct local-file upload for this workflow.
   - Store Drive-backed filing proof under `[year] / [filing type folder] / Filing evidence`; for example `2024 / Payroll / Filing evidence`.
8. Read the ROS payment/refund result:
   - Payable to Revenue: enter a negative `Payment Due` value on the Filings row and create a related Tax payments row with a positive `Payment` amount.
   - Refund/repayment: enter a positive `Payment Due` value on the Filings row and create no Tax payments row unless separately instructed.
   - Nil payment: enter `0` only when ROS explicitly confirms nil/no payment.
9. For payable amounts, create a Tax payments row due two weeks after the logging date, assigned to Simoneta, related to the filing, company, and registration. Set `Status (Do not touch!)` to `Due` when the deadline is today or later, and `Overdue` when the deadline has passed. Do not override paid/reconciled status on existing rows.
10. When proof and payment handling are complete, set Filings `Filed on` to the logging date and `Status` to `Filed`.
11. Add a filing page comment with the ROS path, registration used, period, totals, proof file, payment calculation, and Tax payment row.
12. Fetch the updated filing and any created Tax payments row to verify all written fields.
13. Stop after the first pilot filing for operator review before continuing through the backlog.

## Review Notes

- The current Filings `Payment Due` property description says positive means payable and negative means refund. The 2026-05-18 operator instruction for this workflow says payable should be negative and refund should be positive. The pilot must surface this mismatch before the wider backlog is processed.
- The current schema has no boolean `Filed on`; `Filed on` is a date. Completion is represented by setting `Status` to `Filed` after the proof and payment handling are verified.
- ROS credentials, certificates, and credential exports must never be stored in git.
- 2026-05-18 pilot note: EIP payroll in ROS used PREM `3740939BH`; Notion's linked payroll registration showed `Betriebsnummer: 152500094`, which did not appear as a ROS PREM option. Keep such mismatches visible in the filing comment and review notes.
