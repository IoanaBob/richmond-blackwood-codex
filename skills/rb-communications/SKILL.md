---
name: rb-communications
description: Use when drafting, sending, or logging Richmond Blackwood communications across Gmail, Slack, WhatsApp, phone follow-ups, Notion comments, or other channels.
---

# RB Communications

Use this skill for any Richmond Blackwood outbound communication.

## Direct-Send Rule

- Draft communication text in chat with the user, not as an app/software draft.
- Always show the sender before the user approves the message.
- After the user approves or explicitly says to send, send directly through the supported connector or MCP tool.
- After sending, store the sent communication in the Communications database.
- Do not create a Gmail, Slack, WhatsApp, Notion, or other software draft for the user to manually hit send unless the user explicitly asks for that exception.

## Required Preview

Before sending, show:

- Channel: Gmail, Slack, WhatsApp, Notion, or other.
- From: exact sender identity, including email address for email.
- To: recipients or destination.
- Cc/Bcc: if email and applicable.
- Subject: if email.
- Attachments/files: if any.
- Message body.

For email, the default sender is:

```text
Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>
```

If a different email sender is needed, stop and confirm it before drafting.

## Send And Log Workflow

1. Gather source context from the relevant connector or user-provided notes.
2. Prepare the message in chat and show the required preview.
3. Ask for approval unless the user already supplied exact final text and explicitly asked to send it.
4. Send directly through the supported connector or MCP tool.
5. Verify the send result when the connector returns a message link, ID, timestamp, or status.
6. Store the communication in the Communications database.
7. If the Communications database is unavailable or its schema is unclear, report the blocker and record it in `memory/open-questions.md`.

## Communications Database Logging

Record enough detail to reconstruct the business action without dumping unnecessary private history:

- Communication time.
- Channel.
- Direction.
- From.
- To / participants.
- Subject or short title.
- Summary.
- Full content when safe and useful.
- Source link, message ID, or thread ID when available.
- Related client/company/person/project if known.
- Follow-up owner, action, deadline, and priority when needed.

Client-specific communication facts must still follow the `clients/<client-reference>/` routing rule when repo storage is needed.
