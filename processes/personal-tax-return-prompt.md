# Personal Tax Return Prompt

Status: provisional.
Source: user instruction on 2026-05-13 after Mark James Frederick Wilshin 2024 personal-tax correction.
Imported: 2026-05-13.
Review: Use this as a reusable Codex prompt template; tax-year-specific treatment, statutory caps, and final filing eligibility still need professional/operator review.

Use this prompt when asking Codex to prepare a German personal-tax analysis or filing handoff for an individual client. Fill the bracketed fields before sending.

```text
Prepare the personal-tax analysis for [LEGAL NAME] for tax year [YEAR], jurisdiction [COUNTRY].

Primary records and sources:
- Notion individual/person record: [PERSON URL]
- Notion personal-tax filing record: [FILING URL]
- Client/company project, if known: [PROJECT URL]
- Drive source folder from client: [DRIVE FOLDER URL]
- Receipt/invoice subfolders: [FOLDER URLS]
- Existing workbook or client summary document, if any: [URLS]
- Specific operator instructions: [BULLETS]

Important workflow rules:
- Start from the maintained native Google Sheets template, not an old client workbook: RB German Personal Tax Analysis - Machine-Readable Template v1.
- Create a fresh Drive-native copy in the correct filing-year Drive folder.
- Populate only input/source tabs and source rows: Setup, Revenue, Expenses, Deductibles, Tax Credits, Tax Payments, raw export tabs, evidence/source rows, and reviewed rules.
- Do not hardcode client-specific figures into formula/calculation tabs such as Summary, Tax Analysis, PNL, Balance Sheet, Missing Info, or Checks.
- If a formula must change, treat it as a documented template/formula repair and verify the maintained template separately.
- Use actual invoices, receipts, bank/payroll/tax documents, and Notion records as primary evidence. Use client summary docs only as navigation or a secondary clue.
- Every claimed expense row must point to the exact supporting file URL where possible. Do not use a folder URL as evidence for a claimed expense row.
- Do not claim documents that are not business or personal-tax-relevant expenses just because the client uploaded them.
- For Telekom, internet, utilities, rent, or other home costs, follow the operator's route: if the home-office daily allowance is higher or instructed, exclude lower actual home costs and claim the allowance instead. Only include Telekom if it explicitly relates to a mobile-phone line or the operator confirms business relevance.
- For language learning, professional training, equipment, meals, travel, subscriptions, phone costs, and mixed-use costs, record the evidence and business-purpose basis. Flag any business-use percentage or formality issue for final review.
- Verify the tax-year-specific home-office rule, cap, and day count before claiming it. Do not assume a future cap without checking the template/current source.
- Add all operator-stated income adjustments, including partnership/GbR profit or other income, and label support gaps clearly.

Notion and task handling:
- Fetch the Personal Tax Filings row first and inspect Status, Document gathering status, GDrive Docs, Preparation Task, Filing Task, Person, and Due Date.
- Keep the filing row synchronized: update Status, Document gathering status, and GDrive Docs when the evidence/workbook state changes, then read back.
- If Preparation Task is empty, create a separate analysis/preparation task in the Tasks database from the annual personal-tax template, assign it to Ioana Surdu-Bob unless told otherwise, link the correct client project, and link it back through Preparation Task.
- If Filing Task is empty, create a separate filing task assigned to Johnpaul Okolie unless told otherwise, link the same project, set Dependent on to the preparation task, and link it back through Filing Task.
- If a filing task already exists, link the preparation task to it with Dependent on and add the preparation task link in the task body/comment trail.
- Add actual Notion page comments, not database comment fields, for progress, corrections, workbook links, read-back values, and remaining review flags.
- Once the analysis is ready, notify the relevant filing/review people in the filing task comment with the preparation task, workbook, filing record, and remaining flags.

Analysis requirements:
- Reconcile revenue from invoices, payroll, tax certificates, bank exports, and explicit operator instructions.
- Rebuild expenses from actual invoices/receipts, not from a client summary alone.
- Exclude non-business uploads such as naturalization, personal exam, or unrelated administrative invoices unless the operator explicitly says they are claimable.
- Split aggregate receipts into receipt-level rows when needed.
- Apply meal limitation/formality treatment in the workbook and flag final review where required.
- Preserve original currency, FX source/date, and formula-driven EUR values.
- Keep review statuses explicit: Ready, Needs operator review, Needs evidence URL, Not claimed, or the closest existing workbook status.
- Record missing evidence and unresolved assumptions in open questions.

Required verification before final response:
- Read back key ranges from the workbook after editing.
- Confirm formula cells in calculation tabs remain formulas.
- Confirm no claimed Expenses rows use only a folder URL as support.
- Confirm current formula-driven summary values: total revenue, business expenses before home-office, home-office amount, business expenses including home-office, net business PNL, health/care insurance, other personal deductions, and income after deductions.
- Confirm Notion filing relations: Preparation Task, Filing Task, and task dependency.
- Add or update local client records under clients/Individuals/[LEGAL NAME]/ with source pointers, workbook URL, current figures, and remaining review flags.

Final response should include:
- Current workbook URL.
- Filing record URL.
- Preparation and filing task URLs.
- Summary figures.
- What was excluded and why.
- Remaining evidence/review flags.
- Verification performed.
```

Do not ask Codex to "update the old file" unless that is explicitly the task. For new or corrected analyses, ask for a fresh template copy and receipt-backed input rows.
