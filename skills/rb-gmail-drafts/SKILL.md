---
name: rb-gmail-drafts
description: Use for Richmond Blackwood email communications from accounting@richmondblackwood.com, including sender identity, signoff, thread handling, direct-send previews, and verified Gmail draft fallback behavior.
---

# RB Gmail Communications And Drafts

Use this skill for Richmond Blackwood email communications, especially when email must come from `accounting@richmondblackwood.com`.

This skill carries the email-specific rules. Use it together with `rb-communications`: draft in chat, show the exact sender, send directly after approval, and log to Communications.

## Rules

- Do not create Gmail software drafts as the normal workflow unless the user explicitly asks for that exception or direct send is blocked and the user approves a draft fallback.
- Always show the exact `From` name and email address when presenting an email draft in chat.
- Client-facing email must use `From: Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>` unless the user explicitly confirms another sender.
- If this helper is used as an exception, the saved Gmail draft must also show `accounting@richmondblackwood.com` in the stored `From` header. If Gmail stores another sender, delete or mark the draft unsafe and stop.
- Use gcloud-managed Gmail API OAuth only. Do not use IMAP, app passwords, or mailbox password storage.
- Sign off as:

```text
Richmond Blackwood Accounting Team
```

- Prefer the Gmail connector for searching and reading messages or threads.
- Prefer direct send through the supported Gmail connector/API path after user approval.
- Use the repo-local helper for verified Gmail draft fallback when the user explicitly asks for a software draft, direct send is unavailable, or sender verification requires the helper.
- If the Gmail connector is disconnected, ask the user to reconnect it. Do not confuse connector auth failures with local gcloud/OAuth setup unless a repo-local helper is failing.
- Keep replies in the existing Gmail thread whenever possible by passing `--reply-message-id <gmail-message-id>`.

## Chat Preview

Before sending email, show:

- Channel: Gmail.
- From: exact display name and email address.
- To.
- Cc/Bcc when applicable.
- Subject.
- Attachments.
- Body.

After approval, send directly through the supported Gmail connector/API path and log the sent email in the Communications database. If direct send is unavailable and the user approves a fallback, create a verified Gmail draft with the helper below.

## Draft Helper

```bash
npm run gmail:create-alias-draft -- --from accounting@richmondblackwood.com --from-name "Richmond Blackwood Accounting Team" --to "client@example.com" --subject "Subject" --body-file /path/to/body.txt
```

Useful options:

- `--cc`, `--bcc`
- `--html`
- `--attachment /absolute/path/file.pdf`
- `--oauth-client-file .codex-local/google-oauth-client.json`
- `--reply-message-id <gmail-message-id>`
- `--verify-only`
- `--auth-login auto|always|never`

Do not commit tokens, passwords, or downloaded auth artifacts.
