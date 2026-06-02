# IE CORE Annual Return Logging

Status: provisional.
Source: user instruction in Codex chat on 2026-05-19 and live CORE/Notion verification for RBL annual return on 2026-05-19.
Imported: 2026-05-19.
Review: confirm the CORE public-record proof standard and whether future rows with misplaced annual-return attachments should be corrected automatically or only surfaced for review.

## Purpose

Record one Irish CRO/CORE annual return filing in RB Notion when public CORE records show the annual return has been filed.

## Scope

Use this process for Irish annual returns in the Filings database. It is separate from ROS tax filing logging because annual returns are checked through CORE/CRO public company records rather than Revenue Online Services.

## Live Surfaces

- CORE public search: `https://core.cro.ie/search`.
- Filings database: `https://www.notion.so/f9af3b86b2a3430d8c48c8b0567091e7`.
- Filings data source: `collection://ee7ef5c8-6a29-43dd-b2aa-63eddaa98971`.

## Process

1. Fetch the target Filings row, linked company, and annual-return filing registration.
2. Confirm the filing is jurisdiction `IE`, type `Annual Returns`, and has a known company CRO/register number.
3. Search CORE by CRO/register number and confirm the company name, type, and status.
4. On the company details page, check `Documents` for the matching annual-return form:
   - `Form B1 - First Annual Return`, `Form B1C - Annual Return General`, or an equivalent annual-return form.
   - Match `Effective from` to the filing due/annual-return date.
   - Use `Registered on` as the filed date when available.
5. Cross-check the CORE `Profile` `Next Annual Return` value against the next Notion annual-return row where one exists.
6. Preserve proof without buying paid CORE documents unless explicitly approved:
   - Screenshot or text proof must show the annual-return row and the next annual return date.
   - Store proof in the verified company Drive folder under `[year] / Annual Returns / Filing evidence`.
   - Attach the Drive proof URL to the Filings `Submission` property.
7. Update the filing:
   - `Status = Filed`.
   - `Filed on = CORE Registered on` date, or logging date if CORE has no registered date.
   - `Payment Due = 0` unless a real payable/refund amount is evidenced.
8. Do not create a Tax payments entry for annual returns unless a real tax payable amount is evidenced and the operator confirms it belongs in Tax payments.
9. Add a Notion page comment with the CORE company number, annual-return form/reference, registered/effective dates, next annual return date, proof URL, payment decision, and any sibling-row mismatch.
10. Fetch the updated Notion filing and verify status, filed date, submission proof, payment amount, and comment before reporting.

## Review Notes

- CORE public listings can prove a filing exists, but paid document downloads should not be purchased without operator approval.
- If a future Notion annual-return row already contains attachments or a filed date that appear to belong to the current filing, do not clear or move them automatically. Record the mismatch for review.
- Use the annual-return registered date for `Filed on` when CORE provides it. This differs from the ROS backlog convention of using the logging date.
