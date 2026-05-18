---
name: rb-inbound-task-correspondence
description: Handle non-finance Richmond Blackwood inbound items that need task updates, new tasks, correspondence filing, document read/translation notes, or blockers.
---

# RB Inbound Task And Correspondence

Use this handler for `task-correspondence` items from the inbound triage ledger.

## Required Context

- Read action-request and correspondence sections of `processes/inbound-operating-triage.md`.
- Read `internal/people-roles.md` when assigning new tasks.
- Load `skills/rb-file-uploads/SKILL.md` before uploading/attaching documents or translations.

## Task Rules

- Do not force a Correspondence row when the source is only an action request.
- Search the relevant client project/tasks first; update a matching active task rather than creating a duplicate.
- Treat RB-side commitments such as "we will do/check/tell/update/send" or "I will" as RB-owned action unless context shows the work is complete or owned elsewhere.
- Create one task per coherent workstream only when no matching task exists and RB action is required.
- Assign using explicit request, project owner/inherited owner, established process rule, or `internal/people-roles.md`. If ownership is unclear, return a blocker.
- Task descriptions/comments must include actionable source details, not just links.

## Correspondence Rules

- Create/update Correspondence only for true non-invoice correspondence or source documents/messages that should be filed.
- Attach original files once in the verified Drive/Notion destination and read back links.
- For non-English correspondence/documents, create a faithful English translation/read note where supported.
- Any related task must include the useful translated/read information so the assignee can act without opening every file.
- If a document cannot be read, uploaded, translated, or linked, return or update a blocker and do not mark the source complete.

## Completion

- Read back created/updated Notion records, files, and comments.
- Recommend Gmail `Triaged` or WhatsApp checkpoint only after the task/correspondence handling is verified.
- Return closeout section recommendations: `New Correspondence`, `New tasks`, `Updated tasks`, or `Blocked / left open`.

## Output

Return updated ledger rows with:

- task/correspondence result
- created/updated URLs
- assignee and Slack user mapping if known
- source completion marker recommendation
- blocker details when unresolved
