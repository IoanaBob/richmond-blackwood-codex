---
name: rb-signature-workflow
description: Use when preparing generic SignNow review links, signing-field plans, or signature-status helper output for Richmond Blackwood documents.
---

# RB Signature Workflow

Use this skill for generic document-signing mechanics. It does not define a full Richmond Blackwood signing policy, signer identity, routing order, or template catalog.

## Rules

- Do not send SignNow invites or emails automatically.
- First create or collect an internal SignNow review/editor link for user review.
- Only send signing requests after explicit user approval.
- Use app connectors for app-native work when supported, including SignNow managed sends/status, Gmail search/read/thread context, Google Docs content edits, Notion records/pages, and Slack drafts/sends.
- Use repo-local API helpers only for connector gaps and mechanical actions: SignNow local-file upload, explicit field setup, review-link creation, status checks, Drive exports/uploads, and PDF signing-plan preparation.
- Do not invent RB signer identity, routing order, or client-facing signing policy. Record missing signing policy in `memory/open-questions.md`.

## Helpers

- `npm run signnow:upload -- <file>`
- `npm run signnow:get-document -- <document-id>`
- `npm run signnow:update-fields -- <document-id> --fields-json fields.json`
- `npm run signnow:embedded-review-link -- <document-id> --type document`
- `npm run signnow:signature-status -- <document-id>`
- `npm run pdf:prepare-signing-plan -- <source-pdf> <signing-plan-json>`
- `npm run drive:transform-google-doc -- <transform-plan-json> --source-document-id <id> --target-folder-id <id> --title "<title>"`

Helper output is not final business state. A task is complete only when the relevant Drive, Notion, Gmail, SignNow, or Slack state is updated and verified.
