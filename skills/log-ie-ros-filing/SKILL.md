---
name: log-ie-ros-filing
description: Log exactly one completed Irish ROS filing into the RB Notion Filings database. Use when checking one IE jurisdiction filing in ROS, downloading or locating the ROS proof of filing, attaching it to the filing record, setting Filed on/Status/Payment Due, and creating any related Tax payments entry for an amount payable.
---

# Log IE ROS Filing

Use this skill for one filing at a time. For a backlog pass, repeat the workflow per eligible Notion row and pause after each pilot row until the operator approves continuation.

## Required Context

- Browser access to `ros.ie`; let the operator complete login and multi-factor prompts. Do not ask for, store, or type ROS credentials unless the operator explicitly takes over and enters them.
- Notion Filings database: `https://www.notion.so/f9af3b86b2a3430d8c48c8b0567091e7`, data source `collection://ee7ef5c8-6a29-43dd-b2aa-63eddaa98971`.
- IE backlog view: `https://www.notion.so/f9af3b86b2a3430d8c48c8b0567091e7?v=1c8e4130131480e1a46c000cdb4ab729`.
- Tax payments data source: `collection://1fae4130-1314-81c1-b7dd-000b7ac91166`.
- Simoneta Notion user: `b5e3ee56-b550-4959-8ec2-301d6e69e111`.

## Eligibility

Only process the target row when all of these are true:

1. The filing jurisdiction is IE, from the `Jurisdiction` rollup or the linked filing registration.
2. The due date is before the current date for backlog work.
3. The filing is not already complete with proof attached, unless the operator is asking to repair a missing field.
4. ROS shows a matching submitted filing or existing ROS proof for the same company, tax type, period, and registration.

If the filing is not present in ROS or matching is uncertain, do not update Notion as filed. Leave a concise blocker in the filing page comments or `Comments` field, depending on the connector capability available.

## Workflow

1. Fetch the Notion filing row and linked filing registration/company records. Capture the filing row URL, title, company, filing registration, type, period, due date, existing `Submission`, `Filed on`, `Payment Due`, and any payment reference or bank-transfer rollups.
2. Open ROS and let the operator log in. Navigate using visible ROS UI, not guessed URLs, and search by registration, company, tax type, period, due date, or evidence number from the filing comments.
   - If the ROS login page says no certificate is loaded, click `Manage My Certificates`, let the operator browse/upload the `.p12` certificate and enter the certificate password, then use `Return to Login`.
   - After login, ROS opens on `TAIN Services` for the agent. Search for the client by registration/name, or use `Last 10 Clients Accessed` when the exact client is visible.
   - After opening the client, ROS shows `My Services`. Use the service matching the filing type, for example `Payroll > View payroll` for payroll filings.
   - If payroll shows multiple PREM registrations, compare the ROS registration options against Notion company/filing-registration context. Inspect one registration at a time and record which PREM registration produced the matching period. Do not update Notion until the matching period is found.
3. Verify the ROS filing exists. Prefer an acknowledgement, submitted return, receipt, statement, or evidence-number page that clearly identifies the filing. If ROS shows only partial or ambiguous evidence, stop for operator review.
4. Download or otherwise preserve the ROS proof of filing. Keep the ROS/source filename where possible and record any ROS evidence number shown. If ROS exposes no download, use a cropped proof image of the period-summary page that includes company, registration, period, status/counts, and totals, and excludes unnecessary employee identifiers.
5. Determine the ROS balance:
   - Amount payable to Revenue: set Filings `Payment Due` to `-abs(amount)` per the 2026-05-18 operator instruction, then create a Tax payments row with `Payment` as `abs(amount)`.
   - Refund/repayment due back: set Filings `Payment Due` to `abs(amount)` and do not create a Tax payments row unless the operator asks.
   - Nil or no visible balance: set `Payment Due` to `0` only when ROS explicitly confirms nil/no payment; otherwise leave it unchanged and record the uncertainty.
6. Attach proof to the correct Filings file property. Filing/submission proof goes in `Submission`; payment, balance, refund, nil-balance, or ROS Charges & Payments evidence goes in `Proof of Payment`. If the operator is repairing a missing `Payment Due` or payment proof field, do not overwrite an existing `Submission` proof; add the new evidence to `Proof of Payment`.
   - If direct Notion local-file upload is unavailable, upload the proof into the verified client Drive folder and set the Notion file property with the Drive URL string. Do not imply the file is attached until read-back verifies it.
   - The 2026-05-18 pilot confirmed the Notion connector can populate a file property from a URL string but does not expose a direct local-file upload parameter. Use the Drive-backed route unless a future connector exposes native upload.
   - For Drive-backed filing or payment proof, store the file under `[year] / [filing type folder] / Filing evidence`; for example `2024 / Payroll / Filing evidence`.
7. If an amount is payable, create one related Tax payments row:
   - `Name`: include company/reference, filing title, and tax type/period.
   - `Payment`: positive amount payable.
   - `date:Due Date:start`: two weeks after the logging date.
   - `Assigned to`: Simoneta user ID.
   - `Filing`: the filing page URL.
   - `Company`: same company relation as the filing.
   - `Registration`: same filing-registration relation when available.
   - `Status (Do not touch!)`: set `Due` when the due date is today or in the future; set `Overdue` when the due date has passed. Leave reconciled/paid states alone when an existing row is already paid.
8. Update the filing only after proof and payment handling are complete:
   - `date:Filed on:start`: current date.
   - `date:Filed on:is_datetime`: `0`.
   - `Status`: `Filed`.
   - `Payment Due`: signed amount from step 5.
   - `Submission`: verified filing proof attachment when filing proof is new.
   - `Proof of Payment`: verified payment/balance/refund evidence attachment when payment handling is new or repaired.
9. Fetch the filing and any created Tax payments row again. Confirm the proof, `Filed on`, `Status`, `Payment Due`, relation, due date, amount, and assignee are visible.
10. Add a concise Notion page comment on the filing with the ROS path, registration used, period, totals, `Submission` proof location, `Proof of Payment` location when applicable, payment calculation, and linked Tax payment.
11. Report exactly what changed and what remains uncertain. The operator-facing closeout must include the Notion filing row URL, `Submission` proof URL when changed, `Proof of Payment` URL when changed, filed status/date, payment amount or explicit payment uncertainty, and any Tax payment row URL for every processed filing. For a pilot/backlog run, stop after one filing for operator review.

## Guardrails

- Current schema note: the Filings `Payment Due` property description, read on 2026-06-08, says negative means the client has to pay and positive means the client needs a refund. This matches the ROS workflow rule: payable to Revenue is negative, refund/repayment due back is positive. If a future schema description diverges, follow explicit operator instruction and surface the mismatch in review.
- The current Filings schema has `Filed on` as a date and `Status` as the filed/completion marker. Treat "mark filed on as true" as: set `Filed on` to the logging date and set `Status` to `Filed`.
- Do not mark `Status` as `Filed` from tax-clearance inference alone; use ROS proof or explicit operator approval.
- Do not create duplicate Tax payments rows. Search/fetch existing relations first when the filing already has a `Tax Payment` relation or an obvious matching payment row.
- For the 2026-05-18 pilot, EIP payroll in ROS used PREM `3740939BH`; the Notion filing registration showed `Betriebsnummer: 152500094`, which did not appear as a ROS PREM option. Treat similar mismatches as review notes rather than silently changing the registration source.
- Do not store ROS credentials, certificates, credential exports, or downloaded credential material in git.
