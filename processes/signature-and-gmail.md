# Signatures And Gmail Drafts

Status: provisional.
Source: neutral connector/helper decisions ported from local `everguard-research-codex`, adapted to RB sender policy.
Imported: 2026-05-05.
Review: confirm RB signing policy, authorized signers, template catalog, and whether SignNow is an active signing system.

## Purpose

Prepare documents, review links, drafts, and communication follow-ups without sending from the wrong account or treating helper output as final business state.

## Gmail Send Rules

- Draft email text in chat with the user, not as a Gmail draft for manual send.
- Always show the exact `From` name, email address, `Subject`, and source/reply thread before asking for approval.
- Prefer replying in the existing Gmail thread when email context exists. Start a new thread only when no relevant thread exists or the user explicitly asks for a new thread.
- After user approval, send directly through the supported Gmail connector/API path and then store the sent email in canonical Communications (`https://www.notion.so/1b5e4130131480ab84f3cca356736807`).
- Client-facing drafts use `Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>`.
- Do not create a Gmail draft unless the user explicitly asks for that exception or direct send is blocked and the user approves a draft fallback.
- If a Gmail draft fallback is used, the saved Gmail draft must show `accounting@richmondblackwood.com` in the stored `From` header. If Gmail stores another sender, delete or mark the draft unsafe and stop.
- Sign off as `Richmond Blackwood Accounting Team`.
- Use existing Gmail threads when possible.
- Gmail email drafting actions that touch Gmail must use the repo-local Gmail API helper path with shared global Codex auth storage, including draft fallback, sender verification, helper reply-context reads, and unsafe-draft deletion. Do not use IMAP, app passwords, stored mailbox credentials, or connector-created Gmail drafts for those actions.
- Google auth defaults to no-login/no-reauth. Use the per-persona OAuth vault under `~/.codex/google-personas/<persona-slug>/oauth/` first, then saved ADC/account-token fallback. Start interactive Google auth only after explicit approval for that exact persona/action.
- Use `skills/rb-gmail-drafts/SKILL.md` for email-specific sender, thread, signoff, and Gmail fallback behavior. The skill is still required for email communications even when the final action is direct send instead of software draft creation.

## SignNow Rules

- SignNow helpers are generic mechanics only.
- Do not send SignNow invites automatically.
- Create or collect a review/editor link before any send.
- Only send signature requests after explicit user approval.
- Do not invent signer identity, routing order, or template policy.
- Fully signed status is not enough by itself; attach the completed signed file to the correct Drive/Notion destination before marking related work complete.

## Helper Commands

```bash
npm run gmail:create-alias-draft -- --from accounting@richmondblackwood.com --from-name "Richmond Blackwood Accounting Team" --to "client@example.com" --subject "Subject" --body-file /path/to/body.txt
npm run google-auth:verify-personas
npm run signnow:upload -- <file>
npm run signnow:embedded-review-link -- <document-id> --type document
npm run signnow:signature-status -- <document-id>
npm run pdf:prepare-signing-plan -- <source-pdf> <signing-plan-json>
```

## Connector Boundary

Prefer connectors for app-native search/read/send/status operations. Use local helpers for gaps: verified sender drafts, local file upload, field setup, explicit PDF signing plans, and Drive upload/export mechanics.

For cross-channel outbound communication rules, use [communications.md](communications.md). WhatsApp sends require explicit user instruction and tool approval.
