---
name: rb-form-fill-assist
description: Use when Richmond Blackwood receives a form, questionnaire, authority letter with response form, or client document that may be partially completed from existing Notion/Gmail/WhatsApp/Drive context before asking a human to act.
---

# RB Form Fill Assist

Use this skill before assigning human follow-up for any inbound form or questionnaire.

The goal is to reduce human work to judgment and missing facts. Codex should read the form, gather known context, draft field-level answers, and identify blockers before routing to an owner.

## Required Inputs

- Source Communication or message URL/id.
- Source file path or Drive/Notion attachment.
- Linked task or operational row.
- Known subject: Company or Individual.
- Required destination: Communication, task, operational row, Drive folder, or authority response.

## Workflow

1. Preserve the source file through `skills/rb-file-uploads/SKILL.md` before treating it as durable evidence.
2. Extract the form text and any fillable fields. If extraction is weak, render pages or OCR enough to identify questions.
3. If the form is not in English, create or propose a Markdown translation and attach it to `Translated Doc(s)` after approval.
4. Build a form-fill research packet before human follow-up.

Packet columns:

- Form section/question.
- Proposed answer.
- Source/evidence used.
- Confidence: `Ready`, `Needs review`, or `Unknown`.
- Sensitive data handling.
- Human owner only if still needed.

5. Use existing RB sources before asking the human:
   - Linked Communication and task content.
   - Company/Individual records.
   - Contracts, Employment, Payroll, Tax/Personal Tax, Filings, Bank/Investment/Asset rows when relevant.
   - Existing Gmail/WhatsApp thread context.
   - Repo client files and `internal/people-roles.md`.
6. Do not copy secrets, one-time passwords, credential-like values, full ID numbers, insurance numbers, or private login values into repo files, Slack, packet summaries, or Notion comments. Record only that sensitive credential-like information exists and where the approved source lives.
7. Route only remaining judgment calls or unavailable facts to the human owner.
8. Do not submit the form, send a reply, upload a filled version, or mark the task complete without approval of the exact form-fill packet.

## Closeout Rules

- Communication status can move to `Done` after the original form is uploaded, translation is attached when required, and Notes contain a useful description.
- The linked task remains open until the filled-form plan is approved, missing facts are resolved, and any required submission/reply is completed.
- If the form cannot be read or the source file is unavailable, create a source-reconstruction blocker instead of assigning a generic human follow-up.
