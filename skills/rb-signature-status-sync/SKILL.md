---
name: rb-signature-status-sync
description: Use when checking SignNow document signature status and deciding what RB evidence still needs to be attached before stage completion.
---

# RB Signature Status Sync

Use this skill to inspect SignNow document status without sending invites or creating signing links.

## Workflow

1. Identify the source record and document ID.
2. Run:

```bash
npm run signnow:signature-status -- <document-id>
```

3. Treat `fully_signed` as status evidence only.
4. Retrieve or receive the completed signed file.
5. Upload the signed file to the correct Drive folder.
6. Attach it to the correct Notion `FILES` property.
7. Only then advance any workflow stage.

## Boundaries

Do not store tokenized SignNow action links, signed-file contents, or credential values in repo memory.
