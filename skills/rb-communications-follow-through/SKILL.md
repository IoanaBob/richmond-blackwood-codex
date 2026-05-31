---
name: rb-communications-follow-through
description: Use when moving Richmond Blackwood Communications rows forward from the canonical Notion Communications database, including logging cleanup, evidence attachment, reply planning, approved email/Slack/WhatsApp sends, linked task updates, and verified closeout.
---

# RB Communications Follow-Through

Use this skill for focused follow-through on existing Richmond Blackwood Communications rows. It is row-led: start from canonical Communications records, then read only the source context needed to move those rows forward.

This skill does not replace `rb-common-tasks-follow-through`. Use `rb-common-tasks-follow-through` for broad daily Gmail/WhatsApp discovery across task-capable RB Client Databases. Use this skill when the work is to advance known Communications rows.

## Load First

Before live work, read:

1. `references/stage-packet-protocol.md`.
2. `processes/communications.md`.
3. `skills/rb-communications/SKILL.md`.
4. `skills/rb-common-tasks-follow-through/references/rb-client-database-task-registry.md` when a Communication may create or update task-capable rows.

Load only when needed:

- Email sends or Gmail-backed replies: `skills/rb-gmail-drafts/SKILL.md`.
- WhatsApp reads/sends: `skills/rb-whatsapp-comms/SKILL.md`.
- Evidence upload, attachment, or translation file handling: `skills/rb-file-uploads/SKILL.md`.
- Form or questionnaire handling: `skills/rb-form-fill-assist/SKILL.md`.
- Owner routing: `internal/people-roles.md`.

## Source Of Truth

Canonical Communications:

- Database: `https://www.notion.so/1b5e4130131480ab84f3cca356736807`
- Data source: `collection://1b5e4130-1314-8183-afd8-000b6f4da982`

Use only current live fields in v1:

- `Title`
- `Type`
- `Status`
- `Relevance`
- `Sent/Received On`
- `Due Date`
- `Company`
- `Individual`
- `Tasks`
- `Assigned To`
- `Document(s)`
- `Translated Doc(s)`
- `Notes`

Do not change the Notion schema in this skill. If source URL, source message ID, reply status, letter metadata, or another useful field is missing, record it as a schema blocker in the packet. Use `Notes` as a temporary approved fallback only when needed for safe operation.

Do not write new RB records to the old `RB Communications` database at `https://www.notion.so/c931b1b88ff6412a96c74bd9933da19c`.

## Core Rules

- Create or update one canonical Communications row for each material sent, received, internal, system, call, draft, or status event that changes RB client/work context or creates follow-up work.
- Keep Communications current in the same task turn. Progress should not live only in Gmail, Slack, WhatsApp, Drive, repo memory, or a human's head.
- If a communication changes urgency, ownership, closeout condition, evidence state, or reply state, update the owning task-capable row in the same approved pass, not only the Communications row.
- Do not run broad source discovery. Read Gmail, Slack, WhatsApp, Drive, or Notion source context only for the Communications rows in scope.
- Choose one primary client subject relation: `Company`, `Individual`, or neither. Do not set both unless the operator explicitly approves that exact exception.
- Use `Company` for company operations and durable company evidence. Use `Individual` for personal tax, insurance, individual evidence, or individual-specific authority/client matters. Leave both empty for internal, system, spam, no-scope, or non-client-relevant logs.
- Use `Assigned To` only when the Communication row itself has an internal owner. Action ownership normally belongs on the linked task or operational row.
- Set `Relevance` when creating or updating the row: `Ignore`, `Short Living`, or `Long Living`.
- Set `Status` to `Logged` only when the communication logging work is complete. For document communications, this means original evidence is attached in `Document(s)`, required translation output is attached in `Translated Doc(s)`, and `Notes` contains a useful summary.
- Keep `Status` as `In Progress` when routing, evidence, translation, reply, or source-link capture is not complete.
- Do not save credentials, tokens, live SignNow action links, raw WhatsApp transcripts, raw private email bodies, ELSTER certificates, bank secrets, or unsafe sensitive data in git or Notion notes.

## Stage Flow

Run the packet workflow from `references/stage-packet-protocol.md`:

1. Preflight.
2. Communications Inventory.
3. Context Read.
4. Action Packet.
5. Execute Approved Actions.
6. Readback And Closeout.

Every stage writes a Markdown packet under `/private/tmp/rb-communications-follow-through/<run-id>/`, prints the same packet in chat, and stops for approval unless the protocol explicitly says the stage is read-only or already approved.

## Email Sends

For email, RB is self-contained in this repo. Do not delegate email sending to `personal-codex`.

Before sending, show the full preview required by `rb-communications` and `rb-gmail-drafts`:

- Channel: Gmail.
- Operator: active human operator from `RB_CODEX_ACTOR`, or `not required`.
- Source mailbox(es): exact mailbox(es) searched/read.
- From: exact display name and email address.
- To, Cc, and Bcc.
- Subject.
- Source/reply thread.
- Attachments.
- Body.

Default client-facing sender:

```text
Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>
```

After approval, send directly through the RB Gmail helper, using a body file in `/private/tmp` for any non-trivial or sensitive body text:

```bash
npm run gmail:send-email -- --from accounting@richmondblackwood.com --from-name "Richmond Blackwood Accounting Team" --to "client@example.com" --subject "Subject" --body-file /private/tmp/rb-email-body.txt
```

For replies, preserve the Gmail thread when the Gmail message ID is known:

```bash
npm run gmail:send-email -- --from accounting@richmondblackwood.com --from-name "Richmond Blackwood Accounting Team" --reply-message-id GMAIL_MESSAGE_ID --to "client@example.com" --subject "Re: Subject" --body-file /private/tmp/rb-email-body.txt
```

The helper must verify the Gmail send-as alias and verify the sent `From` header. If Gmail sends from another identity, treat the send path as unsafe and stop.

Software drafts are exception-only. If an approved saved draft exists and the user approves sending that exact unchanged draft, use `npm run gmail:send-draft -- --from accounting@richmondblackwood.com DRAFT_ID`.

## Outbound Approval

Do not send Gmail, Slack, WhatsApp, Notion, or other outbound communications until the operator approves the exact message, destination, sender, attachments, and source thread.

If source context changes after approval, stop and issue a revised packet before sending.

## Closeout

After execution, verify every Notion write and send/readback result. Close the run only after the packet lists:

- Communication rows created or updated.
- Task-capable rows created, updated, linked, or left blocked.
- Evidence files attached or blocked.
- Replies sent, snoozed, skipped, or blocked.
- Source IDs, thread IDs, message IDs, and Notion URLs where available.
- Remaining blockers with next owner and unblock action.

Update `memory/skill-runs.md` only when the run changed durable repo memory, helper behavior, process rules, or skill files. Do not write raw source content into memory.
