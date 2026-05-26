# German Personal Tax ELSTER Filing

Status: provisional.
Source: Byron and Andrei supervised ELSTER filing runs; user process instruction on 2026-05-26.
Imported: 2026-05-26.
Review: Mirror to the RB Internal Knowledge Base after operator review and once the Notion connector is available.

Use this process when transferring a completed or corrected RB German personal-tax analysis into Mein ELSTER.

## Core Rule

ELSTER filing is packet-led. Every page or logical stage gets a screenshot before data entry, a written packet explaining what will be filled and why, then a read-back after entry. Ordinary pages can be internally auto-approved after the packet is complete and source-backed. The final review/submission page is never auto-approved.

## Page Packet Flow

1. Take a screenshot of the current ELSTER page or stage before filling it. Keep screenshots out of git unless the operator explicitly asks to preserve an evidence file.
2. Write one packet for the page/stage with:
   - page or section name;
   - screenshot reference or timestamp;
   - every field to fill or leave blank;
   - value;
   - source;
   - explanation;
   - confidence status;
   - alternatives or review flags.
3. Auto-approve and fill only if all packet items are source-backed and marked ready.
4. Pause for operator review before filling any item with a source conflict, material judgment call, missing evidence, workbook-to-ELSTER discrepancy, attachment/upload, family/support issue, foreign/capital/business-income issue, or new sensitive identifier not already approved for the filing run.
5. Read back the page after filling and note differences before moving to the next page.

## Final Review

On the final ELSTER review/submission page:

1. Stop.
2. Produce or request the ELSTER draft PDF from `Drucken`.
3. Present all page/stage packets one by one, plus a final summary packet with validation result, refund/payment estimate, bank details, imported certificates, workbook deviations, and remaining post-filing tasks.
4. The operator approves the packets and final filing position one by one.
5. Codex does not click `Absenden`. Only the operator clicks final submission.
6. Before the operator clicks final submission, the final ELSTER print/review PDF should be saved to the correct Drive filing folder when tooling allows.
7. After the operator submits, Codex can capture the visible confirmation/protocol information and complete Drive/Notion logging.

## Closeout

After a successful submission, attach the final printed/submission PDF to the Notion Personal Tax Filing `Submission` field, update status and filed date, record payment/refund estimate, add filing-task comments, and verify by read-back.
