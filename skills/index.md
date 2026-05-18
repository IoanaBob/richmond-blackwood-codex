# RB Local Skills

Status: provisional.

Repo-local skills for Richmond Blackwood work.

- `rb-source-research`: gather and register context from local repos, Notion, Drive, Slack, Gmail, and public sources.
- `rb-communications`: draft communications in chat, show the sending identity, send directly after approval, and log to Communications.
- `rb-memory-capture`: write durable memory with provisional/approved status.
- `rb-client-file`: route unsanitised client detail to the right client folder.
- `rb-process-maintenance`: update process maps and SOP mirrors.
- `rb-handoff`: prepare next-session handoff.
- `rb-google-auth`: authenticate Drive/Gmail helper access through gcloud without committing credentials.
- `rb-file-uploads`: upload, export, attach, and catalog Drive/Notion-backed files.
- `rb-gmail-drafts`: email-specific sender, thread, signoff, direct-send preview, and gcloud-managed verified Gmail draft fallback rules for `accounting@richmondblackwood.com`.
- `rb-inbound-operating-triage`: master/orchestrator for Gmail-inbox-first and WhatsApp-topic client communication triage, routing each item through focused phase skills and approval gates.
- `rb-inbound-capture`: capture Gmail inbox and WhatsApp topic/checkpoint source items into a no-write source ledger.
- `rb-inbound-classify`: classify captured inbound items into verified no-op, finance, task/correspondence, blocker, approval-required, or out-of-scope.
- `rb-inbound-finance-routing`: handle finance-classified inbound items, including invoices, receipts, expenses, contractor invoices, evidence, and finance blockers.
- `rb-inbound-task-correspondence`: handle non-finance task updates, new tasks, correspondence filing, translations/read notes, and blockers.
- `rb-inbound-closeout`: generate the Slack-ready inbound triage closeout preview from the verified ledger without sending.
- `rb-signature-workflow`: run generic SignNow, Google Doc transform, and PDF signing-plan helper workflows.
- `rb-signature-status-sync`: check SignNow signature status and require signed-file evidence before completion.
- `rb-whatsapp-comms`: read, search, summarize, draft, send, and route WhatsApp communications through the optional local WhatsApp MCP server.
- `rb-whatsapp-inbound-monitor`: manually check saved client WhatsApp chats for new inbound messages, process correspondence attachments, create Notion tasks, notify Slack, and update checkpoints.
- `rb-task-pr`: isolate repository work on a branch and publish it as a PR when requested/appropriate.
- `rb-personal-tax-analysis-de`: prepare German personal tax analysis work for individual clients, including Drive setup, checklist routing, Notion cross-checks, and linked-entity filing.
