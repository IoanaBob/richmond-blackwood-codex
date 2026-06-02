---
name: rb-client-board-docs
description: Prepare Richmond Blackwood client board-of-directors folders, agendas, minutes, signature packets, signed-copy storage, and evidence closeout through packet-gated Drive/Calendar/Notion workflows. Use when a user asks for a client BOD or board meeting setup, agenda, minutes, board pack, signing copy, signed minutes upload, or repeatable client board-document workflow.
---

# RB Client Board Docs

Status: provisional.
Source: Codex BOD document runs for AGL and Drive patterns for AGL/CBMAX.
Imported: 2026-05-25.
Review: Keep live Drive and Notion behavior under review as connector upload/move tools change.

Use this for client board-document work before, during, and after a board meeting. The workflow is packet-gated: prepare the relevant packet, get approval when the packet proposes a live write/send, execute only the approved payload, then produce the matching results packet.

## Packet Templates

Load only the packet template needed for the current stage:

- Board Meeting Setup Packet: `references/board-meeting-setup-packet.md`
- Board Meeting Setup Results Packet: `references/board-meeting-setup-results-packet.md`
- Minutes Review Packet: `references/minutes-review-packet.md`
- Signature Execution Packet: `references/signature-execution-packet.md`
- Signature Results Packet: `references/signature-results-packet.md`
- Signed Copy Intake And Storage Packet: `references/signed-copy-intake-and-storage-packet.md`
- Final Storage And Closeout Packet: `references/final-storage-and-closeout-packet.md`

## Non-Negotiables

- Use the exact Notion Companies `Reference` and the existing client Drive folder. Do not invent a client slug or replacement Drive structure.
- Do not create or modify Drive folders/files, Calendar events, Notion records, signature packets, or outbound messages until the matching packet has been approved, unless the user explicitly approved that exact action in the current request.
- Confirm the scheduled meeting time from Google Calendar before relying on agenda timing. If the Calendar event is missing or incomplete, propose the Calendar create/update in the setup packet instead of using chairperson outreach as the default path.
- Keep setup/execution separate from signed-copy storage. Sending a document for signature is not the same as receiving and filing the signed copy.
- Do not draft final minutes from agenda proposals alone. Use transcript/extract evidence for actual attendance, decisions, resolutions, and action owners.
- Use Drive for raw board packs, signed copies, attendance evidence, and support files. Repo files keep pointers and status only.
- If signer identity, routing, Board Meetings folder, Calendar state, transcript source, signed-file source, or upload tooling is unclear, record the blocker in the packet and ask for review.

## Stage Flow

1. Setup planning.
   - Load the Board Meeting Setup Packet.
   - Resolve client, Board Meetings parent folder, meeting date/time, Calendar event state, proposed folder name, agenda items, board-pack support, transcript follow-up, and any proposed Calendar updates.
   - Wait for approval before creating folders, documents, Calendar events, or follow-ups.

2. Setup execution.
   - Execute only the approved setup payload.
   - Produce the Board Meeting Setup Results Packet with Drive/Calendar links, read-backs, and blockers.

3. Minutes review.
   - After the meeting, use the setup packet as the source of truth for folder/time expectations.
   - Confirm transcript/extract source and Calendar attendance/timing. If transcript evidence is missing at the scheduled follow-up point, prepare the request-for-transcript communication for approval rather than drafting final minutes.
   - Produce the Minutes Review Packet with editable minutes and review/signing-copy references.

4. Signature execution.
   - After user approval of the minutes, load the Signature Execution Packet.
   - Confirm signer identities, signing route, document version, recipient details, and approval text.
   - Execute only the approved signature send/print/e-sign route and produce the Signature Results Packet.

5. Signed copy storage.
   - Start this stage only after a signed file exists or a signature platform status proves completion and exposes the signed copy.
   - Load the Signed Copy Intake And Storage Packet, then upload/store only the approved signed file in the approved meeting folder.
   - Produce the Final Storage And Closeout Packet with folder listing/read-back and repo/Notion updates.

## Tooling Notes

- Prefer Google Calendar and Google Drive connectors for Calendar reads/proposals, Drive discovery, folder listing, Docs imports, and file metadata read-back.
- Use `rb-file-uploads` for folder-aware Drive upload/export gaps and `rb-google-auth` only when a helper auth route needs explicit user-approved recovery.
- Use `documents:documents` when a polished local `.docx`/PDF artifact needs render-and-verify.
- Use `rb-signature-workflow` for SignNow/e-sign mechanics and `rb-signature-status-sync` for status checks. These tools are generic; this skill still owns the packet gates and client board-document context.
