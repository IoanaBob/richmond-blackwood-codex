---
name: rb-pdf-form-fill
description: Use when completing official PDF forms for Richmond Blackwood clients from source documents, especially when layout fidelity, translations, evidence gaps, or a final send-ready flattened PDF matter.
---

# RB PDF Form Fill

Use this skill when a PDF questionnaire, tax-office form, authority form, onboarding form, or similar official PDF must be completed cleanly from source material and delivered as a final PDF.

## Ground Rules

- Preserve the original form: page count, linework, boxes, proportions, section order, and official wording.
- Do not invent facts, signatures, dates, account details, document evidence, or legal positions. Mark missing support clearly.
- Do not forge handwritten signatures. Leave signature fields blank unless the user provides an authorized signing method.
- Keep raw client documents and generated working images in temporary local storage or Drive, not git, unless the user explicitly asks for a repo artifact.
- If source documents conflict, use the user-approved source-of-truth order and record any unresolved inconsistency before finalizing.
- Prefer a short in-form answer plus an annex when a truthful answer would become tiny, cramped, or hard to read.

## Workflow

1. Confirm sources and scope.
   - Identify the blank PDF, source spreadsheets/documents, translation sources, and supporting evidence.
   - List the questions that cannot be answered from the available material before filling them.
   - For multilingual forms, use the controlling language source for meaning, then translate only the final answer text required by the target form.
2. Inspect the PDF structure.
   - If the PDF has usable form fields, fill the fields with a PDF library, generate appearances, flatten, and still render visual previews.
   - If the PDF is scanned/static, render each page at high resolution and overlay text on a clean copy of the original page.
   - Rebuild each iteration from the clean original page, not from a previously filled page, so duplicate or ghost text cannot accumulate.
3. Map answers to fields.
   - Build a page-by-page answer map before drawing.
   - Preserve official formatting conventions such as local date format, decimal separators, currency labels, IBAN spacing, and checkbox style.
   - Mark evidence only where the matching supporting file exists or the user says it will be attached.
4. Place text carefully.
   - Match the original document's font family and practical font size as closely as possible, usually Helvetica/Arial-like for official forms.
   - Keep text comfortably inside boxes and away from rules. If a value touches a line, move it or reduce it slightly.
   - For scanned tables, measure row boundaries from the actual page image. Do not assume the scan is perfectly level; use per-column row centers when needed.
   - For dense text boxes, wrap manually with a consistent line height and leave visible whitespace.
   - Never solve a layout problem by making important text unreadably small. Use "siehe Anlage" or a short summary with an annex.
5. Quality check visually.
   - Render the completed PDF back to page images.
   - Inspect every touched page at full page scale.
   - Create zoomed crops for dense tables, totals, checkbox areas, IBAN/account rows, signature/date areas, and any field the user flagged.
   - Verify totals are in the intended row, not floating below a table or sitting on a rule.
   - Compare the final page count with the intended output and check the final file opens as a PDF.
6. Deliver and summarize.
   - Save the final flattened PDF in the location the user requested.
   - Report only the meaningful remaining actions: signature needed, missing proof, evidence to attach, or facts requiring client confirmation.
   - If a supporting evidence list exists, make sure it matches the files actually available.

## Tool Notes

- Use `load_workspace_dependencies` when bundled document/PDF libraries are needed.
- Prefer structured APIs for fillable PDFs and deterministic image/PDF libraries for scanned forms.
- Keep intermediate previews and crops in temporary paths unless they are requested deliverables.
- Run a final mechanical check appropriate to the repo, such as `git diff --check`, when creating or changing a reusable process/skill.
