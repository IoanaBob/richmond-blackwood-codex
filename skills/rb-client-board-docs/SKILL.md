---
name: rb-client-board-docs
description: Prepare Richmond Blackwood client board-of-directors documents and evidence packs. Use when a user asks for a client BOD/board meeting folder, agenda, minutes, board pack, Word/PDF minutes, director signature copy, signed minutes upload, or repeatable client board-document workflow in Google Drive.
---

# RB Client Board Docs

Status: provisional.
Source: Codex BOD document runs for AGL and Drive patterns for AGL/CBMAX.
Imported: 2026-05-25.
Review: Keep live Drive and Notion behavior under review as connector upload/move tools change.

Use this for client board-document work before and after a board meeting.

## Core Rule

When the user asks to organise a client BOD meeting, create the dated meeting folder inside the client's existing Google Drive `Board Meetings` folder before drafting documents. If a matching folder already exists, use it rather than creating a duplicate. Confirm the scheduled meeting time from Google Calendar first, or from the initial agenda if Calendar is unavailable. Keep the agenda, editable minutes, PDF/signing copy, signed copy, attendance evidence, and supporting board-pack files together in that same meeting folder.

## Before The Meeting

1. Resolve the client destination.
   - Use the exact Notion Companies `Reference` and the existing client Drive folder.
   - Prefer the Board Meetings folder already recorded in `clients/Companies/<reference>/drive-locations.md`.
   - If the Board Meetings folder or client Drive destination is unclear, stop and ask; do not create a replacement structure.
2. Create the meeting subfolder.
   - Create the folder yourself in Drive when it does not already exist; do not wait for the user to create it.
   - Check for an existing matching folder first to avoid duplicates.
   - Mirror the client's existing naming style.
   - AGL examples use date folders such as `25.05.2026`.
   - CBMAX examples use `BOD Meeting ...` folders such as `BOD Meeting 21/04/2026`.
3. Draft the agenda in that meeting folder.
   - Use a clean meeting-facing agenda, not a source register.
   - Include only board-worthy items: attendance/quorum, previous minutes, tax residence/governance, filings, payroll/tax compliance, solvency, material contracts, banking/investment approvals, records/evidence, action owners, and next meeting.
   - Keep operational housekeeping out unless it needs a board note, decision, or formal evidence.
   - Do not include provisional/source metadata in the circulated agenda; keep source notes in chat, repo memory, or internal prep notes.
4. Add board-pack support where relevant.
   - Prior minutes for approval.
   - Filing, VAT, payroll, tax-office, contract, finance, bank, or investment support needed for decisions.
   - Attendance or location evidence when useful for Irish central-management-and-control records.
5. Set the transcript follow-up.
   - Confirm the meeting end time from Google Calendar, or from the agenda if Calendar is unavailable.
   - Create the appropriate Codex follow-up/automation for one hour after the scheduled end time.
   - The follow-up should check Notion for the meeting transcript and then proceed to minutes drafting if the transcript is available.
   - If the transcript is still missing one hour after the scheduled end time, message Ioana and the requesting user for the transcript. If the exact recipient/channel is unclear, stop and ask rather than guessing.

## After The Meeting

1. Locate the transcript.
   - Check Notion for the meeting transcript at the scheduled follow-up time.
   - Use the Calendar-confirmed meeting time, or the agenda time if Calendar was unavailable, as the timing source.
   - If the transcript is present, use it as the main meeting extract source and proceed without waiting for a separate user prompt.
   - If it is absent one hour after the scheduled end time, message Ioana and the requesting user for the transcript, then wait for the transcript before drafting final minutes.
2. Draft minutes from meeting extracts.
   - Use actual attendance, decisions, resolutions, and action owners from the meeting.
   - Do not convert proposed agenda resolutions into approved minutes unless the meeting extracts confirm approval.
   - Record remote attendance clearly and flag any Irish tax-residence evidence issue.
3. Produce the editable minutes document.
   - Prefer the same format used in the client's prior board folders.
   - If a polished local `.docx` is needed, use the Documents skill to create, render, and verify it.
   - If the working copy is Google Docs, keep the native Google Doc in the meeting folder.
4. Produce the signing copy.
   - Export the Word/Google Docs minutes to PDF.
   - If LibreOffice is unavailable for DOCX rendering, generate the PDF from the same minutes content, visually inspect the PDF pages, and report the fallback.
   - If using a local helper, use the Drive export/upload path and verify the uploaded PDF by Drive metadata or folder listing.
   - If SignNow or an e-signature flow is requested, use `rb-signature-workflow`; do not send signature requests without explicit user approval.
5. Store the signed copy.
   - Upload the signed PDF back into the same meeting folder.
   - Keep the editable minutes and unsigned PDF unless the user explicitly asks to remove them.
   - Verify the folder contains the expected agenda, editable minutes, signing PDF or signed PDF, and supporting evidence.

## Drive Upload Notes

- Prefer native Google Drive connector tools for discovery, reads, imports, and folder listing.
- When the Drive connector cannot place an uploaded local file into a specific folder, use the repo Drive upload helper or a reviewed Drive API upload fallback after user-approved Google auth.
- If Google auth is expired, use `rb-google-auth` / `gcloud auth login --enable-gdrive-access` only with user approval. Never store tokens or credentials in git.
- For signed minutes, use a clear folder title such as `<date> BOD Minute - signed.pdf`, upload to the meeting folder, and verify by listing the folder.

## Records And Closeout

- Update the relevant client `drive-locations.md`, `source-register.md`, or domain file with the board-folder URL and important evidence pointers when the repo needs durable access.
- Use Drive for raw board packs and signed copies; do not store signed documents or raw evidence in git.
- Update Notion filing/task/status records only when the meeting creates or changes operational state, and verify live read-back.
- Report any blockers plainly: missing Board Meetings folder, unclear Drive destination, missing extracts, unconfirmed signers, unavailable export/upload tooling, or unsigned minutes still awaiting return.

## Example Patterns

- AGL Board Meetings folder: date subfolders containing agenda, editable minutes, and signed/minutes PDF.
- CBMAX Board Meetings folder: `BOD Meeting ...` subfolders containing agenda, editable minutes, signed PDF, and supporting filing documents.
