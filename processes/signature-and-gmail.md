# Signatures And Gmail Drafts

Status: provisional.
Source: neutral connector/helper decisions ported from local `everguard-research-codex`, adapted to RB sender policy.
Imported: 2026-05-05.
Review: confirm RB signing policy, authorized signers, template catalog, and whether SignNow is an active signing system.

## Purpose

Prepare documents, review links, drafts, and communication follow-ups without sending from the wrong account or treating helper output as final business state.

## Gmail Draft Rules

- Draft only unless the user explicitly approves sending through a supported connector.
- Client-facing drafts use `Richmond Blackwood Accounting Team <accounting@richmondblackwood.com>`.
- The saved Gmail draft must show `accounting@richmondblackwood.com` in the stored `From` header.
- If Gmail stores another sender, delete or mark the draft unsafe and stop.
- Sign off as `Richmond Blackwood Accounting Team`.
- Use existing Gmail threads when possible.
- Repo-local Gmail helpers use gcloud-managed Gmail API OAuth only. Do not use IMAP, app passwords, or stored mailbox credentials.

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
npm run signnow:upload -- <file>
npm run signnow:embedded-review-link -- <document-id> --type document
npm run signnow:signature-status -- <document-id>
npm run pdf:prepare-signing-plan -- <source-pdf> <signing-plan-json>
```

## Connector Boundary

Prefer connectors for app-native search/read/send/status operations. Use local helpers for gaps: verified sender drafts, local file upload, field setup, explicit PDF signing plans, and Drive upload/export mechanics.

For WhatsApp and other non-email communications, use [communications.md](communications.md). WhatsApp sends require explicit user instruction and tool approval.
