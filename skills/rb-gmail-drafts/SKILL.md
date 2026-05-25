---
name: rb-gmail-drafts
description: Use for Richmond Blackwood email communications from accounting@richmondblackwood.com, including sender identity, signoff, thread handling, direct-send previews, and verified Gmail draft fallback behavior.
---

# RB Gmail Communications And Drafts

Use this skill for Richmond Blackwood email communications, especially when email must come from `accounting@richmondblackwood.com`.

This skill carries the email-specific rules. Use it together with `rb-communications`: draft in chat, show the exact sender, send directly after approval, and log to Communications.

## Rules

- Keep the human operator, Gmail source mailbox, and Gmail sender separate. The active operator is `RB_CODEX_ACTOR` from ignored `.env.local` when operator context matters; it must be a human name from `internal/people-roles.md`, never a mailbox.
- Every Gmail job, packet, or preview must state `Operator`, `Source mailbox(es)`, `From`, and `Thread/source`. If no operator-specific behavior is needed, say `Operator: not required for this Gmail action`.
- Do not assume all Gmail reads come from `accounting@richmondblackwood.com`. Read personal/operator mailboxes only when the job scope explicitly requires them, and label each source mailbox in the packet.
- Do not infer the `From` sender from the active operator. Confirm the sender or use the workflow default.
- Do not create Gmail software drafts as the normal workflow unless the user explicitly asks for that exception or direct send is blocked and the user approves a draft fallback.
- Always show the exact `From` name, email address, `Subject`, and source/reply thread when presenting an email draft in chat.
- Prefer replying in the existing Gmail thread when email context exists. Start a new thread only when no relevant thread exists or the user explicitly asks for a new thread.
- Client-facing email must use `From: Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>` unless the user explicitly confirms another sender.
- If this helper is used as an exception, the saved Gmail draft must also show `accounting@richmondblackwood.com` in the stored `From` header. If Gmail stores another sender, delete or mark the draft unsafe and stop.
- Use repo-local Gmail API helpers with shared global Codex auth storage for Gmail email drafting actions, including verified Gmail draft fallback, sender verification, reply-thread context reads performed by the helper, and unsafe-draft deletion. Do not use IMAP, app passwords, mailbox password storage, or non-helper Gmail draft creation paths.
- A Google auth persona is not the active operator, source mailbox, or sender. It is only the credential route used by the helper.
- Sign off as:

```text
Richmond Blackwood Accounting Team
```

- Prefer the Gmail connector for searching and reading messages or threads only. Do not use the connector to create Gmail software drafts when the repo-local Gmail helper can perform the draft action through gcloud.
- Prefer direct send through the supported Gmail connector/API path after user approval.
- Use the repo-local Gmail API helper with shared global Codex auth storage for verified Gmail draft fallback when the user explicitly asks for a software draft, direct send is unavailable, or sender verification requires the helper.
- If the Gmail connector is disconnected, ask the user to reconnect it. Do not confuse connector auth failures with local gcloud/OAuth setup unless a repo-local helper is failing.
- Keep replies in the existing Gmail thread whenever possible by passing `--reply-message-id <gmail-message-id>` or the connector's thread-aware reply path.

## Chat Preview

Before sending email, show:

- Channel: Gmail.
- Operator: active human operator from `RB_CODEX_ACTOR`, or `not required for this Gmail action`.
- Source mailbox(es): exact mailbox(es) searched/read.
- From: exact display name and email address.
- To.
- Cc/Bcc when applicable.
- Subject: exact subject line.
- Source/reply thread: thread ID, message ID, Gmail link, or source message summary when available.
- Attachments.
- Body.

After approval, send directly through the supported Gmail connector/API path and log the sent email in canonical Communications (`https://www.notion.so/1b5e4130131480ab84f3cca356736807`). If direct send is unavailable and the user approves a fallback, create a verified Gmail draft with the helper below.

## Draft Helper

```bash
npm run gmail:create-alias-draft -- --from accounting@richmondblackwood.com --from-name "Richmond Blackwood Accounting Team" --to "client@example.com" --subject "Subject" --body-file /path/to/body.txt
```

Useful options:

- `--cc`, `--bcc`
- `--html`
- `--attachment /absolute/path/file.pdf`
- `--oauth-client-file ~/.codex/google-oauth-client.richmondblackwood.json` for explicitly approved reauth overrides
- `--reply-message-id <gmail-message-id>`
- `--verify-only`
- `--auth-source auto|vault|adc|gcloud` (defaults to `auto`)
- `--auth-login auto|always|never` (defaults to `never`; do not start reauth without explicit approval)
- `--account-email <google-account>` when the API auth account differs from the `From` sender
- `--persona-slug <slug>` to force a specific `~/.codex/google-personas/<slug>/oauth` vault
- `--allow-non-accounting-sender` only after the user explicitly approves a non-accounting `From`

Do not commit tokens, passwords, or downloaded auth artifacts.
