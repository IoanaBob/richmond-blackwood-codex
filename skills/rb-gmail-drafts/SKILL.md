---
name: rb-gmail-drafts
description: Use when creating Richmond Blackwood Gmail drafts from accounting@richmondblackwood.com or verifying that sender alias.
---

# RB Gmail Drafts

Use this skill when a Richmond Blackwood email draft must come from `accounting@richmondblackwood.com`.

## Rules

- Create Gmail drafts only. Never send automatically.
- Client-facing drafts must use `From: Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>`.
- The saved Gmail draft must also show `accounting@richmondblackwood.com` in the stored `From` header. If Gmail stores another sender, delete or mark the draft unsafe and stop.
- Use gcloud-managed Gmail API OAuth only. Do not use IMAP, app passwords, or mailbox password storage.
- Sign off as:

```text
Richmond Blackwood Accounting Team
```

- Prefer the Gmail connector for searching and reading messages or threads.
- Use the repo-local helper for creating drafts when the connector cannot select the required sender alias.
- If the Gmail connector is disconnected, ask the user to reconnect it. Do not confuse connector auth failures with local gcloud/OAuth setup unless a repo-local helper is failing.
- Keep replies in the existing Gmail thread whenever possible by passing `--reply-message-id <gmail-message-id>`.

## Helper

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
