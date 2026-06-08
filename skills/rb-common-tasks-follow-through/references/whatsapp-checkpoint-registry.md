# WhatsApp Checkpoint Registry

Status: provisional.
Source: corrective common-tasks run `2026-05-21-1006-daily-0800-window`, operator instructions through 2026-05-22, and repo client route pointers.
Imported: 2026-05-22.
Review: Next run should capture exact last message IDs where the WhatsApp MCP exposes them reliably. Until then, use `Last read through` as the lower-bound checkpoint and targeted JIDs instead of `list_chats`.

## Purpose

This file is the persistent checkpoint table for common-tasks WhatsApp discovery. It exists because several client-speaking WhatsApp routes are used by the common-tasks workflow but do not yet have approved per-client checkpoint tables.

This registry authorizes a narrow read lower bound only. It does not authorize background monitoring, historical backfill, media download outside an approved run window, or outbound WhatsApp messages.

Use with `whatsapp-source-roster.md`:

- the roster defines which routes must be considered;
- this registry defines the last approved read point;
- client files remain the preferred long-term location when the company/individual destination is already approved.

## Common-Tasks Checkpoints

| Route label | Chat JID | Monitor enabled | Last read through | Last read message ID | Last run | Status | Source | Review |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| AGL / Byron - `Frasier, Byron \| Richmond Blackwood` | `120363222065866778@g.us` | common-tasks manual-run only | 2026-06-08 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-08-0951-jun05-08-0800-gmt` | provisional | Stage 3 empty-window read plus Stage 11 source-marker results for the June 5-8 08:00 GMT make-up run | Empty route checked for full window. |
| CBMAX / Claudio - `Brivio, Claudio \| Richmond Blackwood` | `120363203209263793@g.us` | common-tasks manual-run only | 2026-06-08 08:00 GMT (09:00 Europe/Dublin) | `2026-06-05 18:44|2026-06-05 18:49|2026-06-06 08:58|2026-06-06 08:59|2026-06-06 09:35|2026-06-06 18:10` | `2026-06-08-0951-jun05-08-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 5-8 08:00 GMT make-up run | Communications/tasks/reply snooze handled for CBMAX window. |
| MHL / Gabriel - `Grey Desk Restructuring` | `120363419842553151@g.us` | common-tasks manual-run only | 2026-06-08 08:00 GMT (09:00 Europe/Dublin) | `2ACDA8830D68DC852F0B\|3AFB997591E0FF937683\|2A1395B911A9D10762B8\|2A9AB942378E720199F2\|2AF363B892DA8C770951\|2A7EE9608CB527771520\|2AA5401C9A5C9C54BCFE\|2AC14112A6A3D804D7CC\|2A5CE0DD9B91649DC397` | `2026-06-08-0951-jun05-08-0800-gmt` | provisional | Stage 3 read plus Stage 12 corrective MHL audio transcription/review and approved checkpoint correction for the June 5-8 08:00 GMT make-up run | Nine June 6 voice notes downloaded, transcribed, reviewed, and routed to corrected COMM-017/TASK-005; checkpoint advanced after approved corrective update. |
| SVL / Kristjan - `Olafsson, Kristjan \| Richmond Blackwood` | `120363409060100858@g.us` | common-tasks manual-run only | 2026-06-08 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-08-0951-jun05-08-0800-gmt` | provisional | Stage 3 empty-window read plus Stage 11 source-marker results for the June 5-8 08:00 GMT make-up run | Empty route checked for full window. |
| VUN / Eran | `491773931663@s.whatsapp.net` | common-tasks manual-run only | 2026-06-08 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-08-0951-jun05-08-0800-gmt` | provisional | Existing VUN client checkpoint plus Stage 3 empty-window read and Stage 11 source-marker results for the June 5-8 08:00 GMT make-up run | Keep VUN client file as the more specific checkpoint when manually monitoring VUN. |
| NACV / Andrei | `120363399321589278@g.us` | common-tasks manual-run only | 2026-06-08 08:00 GMT (09:00 Europe/Dublin) | `3A4D699248CC38583CE5|3A6E9D67B3F6B09275A8` | `2026-06-08-0951-jun05-08-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 5-8 08:00 GMT make-up run | NACV messages/images routed; follow-up task and reply snooze exist. |
| TPL / Pradeep | `120363399422225301@g.us` | common-tasks manual-run only | 2026-06-08 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-08-0951-jun05-08-0800-gmt` | provisional | Stage 3 empty-window read plus Stage 11 source-marker results for the June 5-8 08:00 GMT make-up run | Empty route checked for full window. |
| Monochromatic - `Monochromatic \| Richmond Blackwood` | `120363405249757858@g.us` | common-tasks manual-run only | 2026-06-08 08:00 GMT (09:00 Europe/Dublin) | `2026-06-05 12:17-17:36` | `2026-06-08-0951-jun05-08-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 5-8 08:00 GMT make-up run | Monochromatic contract action routed to Contract row and task. |
| Chamberlain / Aaron - `Chamberlain, Aaron \| Richmond Blackwood` | `120363378578862576@g.us` | common-tasks manual-run only | 2026-06-08 08:00 GMT (09:00 Europe/Dublin) | `2026-06-05 11:44` | `2026-06-08-0951-jun05-08-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 5-8 08:00 GMT make-up run | Aaron outbound tax prepayment notice logged Done. |
| PCL / Ricardo | `120363302853461649@g.us` | common-tasks manual-run only | 2026-06-08 08:00 GMT (09:00 Europe/Dublin) | `2026-06-05 11:54` | `2026-06-08-0951-jun05-08-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 5-8 08:00 GMT make-up run | PCL outbound tax prepayment notice logged Done. |
| CLV / Celine | `120363146867278918@g.us` | common-tasks manual-run only | 2026-06-08 08:00 GMT (09:00 Europe/Dublin) | `2026-06-05 11:17-15:20` | `2026-06-08-0951-jun05-08-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 5-8 08:00 GMT make-up run | CLV bookkeeping/invoicing action routed to rows/task and reply snooze exists. |
| AKS / Ana | `120363365115227969@g.us` | common-tasks manual-run only | 2026-06-08 08:00 GMT (09:00 Europe/Dublin) | `2026-06-05 11:37` | `2026-06-08-0951-jun05-08-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 5-8 08:00 GMT make-up run | AKS outbound tax prepayment notice logged Done. |
| WEW / Wewrite | `120363268146260451@g.us` | common-tasks manual-run only | 2026-06-08 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-08-0951-jun05-08-0800-gmt` | provisional | Stage 3 empty-window read plus Stage 11 source-marker results for the June 5-8 08:00 GMT make-up run | Empty route checked for full window. |
| VUN / Nathan | `120363392073065176@g.us` | common-tasks manual-run only | 2026-06-08 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-08-0951-jun05-08-0800-gmt` | provisional | Stage 3 empty-window read plus Stage 11 source-marker results for the June 5-8 08:00 GMT make-up run | Empty route checked for full window. |

## Update Rule

Advance a route's `Last read through` only after the approved run has:

1. included the route in Stage 3 discovery;
2. read or confirmed empty the route window;
3. completed or explicitly blocked all required Communication, task, evidence, translation, reply, and Slack work for messages in the window;
4. written and printed the Stage 10 source-marker plan and Stage 11 results packet;
5. updated this registry and automation memory.

If a run partially succeeds, leave that route's checkpoint unchanged and add the blocker to the stage packet.
