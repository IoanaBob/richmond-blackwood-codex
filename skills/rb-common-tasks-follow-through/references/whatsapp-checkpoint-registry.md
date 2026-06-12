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
| AGL / Byron - `Frasier, Byron \| Richmond Blackwood` | `120363222065866778@g.us` | common-tasks manual-run only | 2026-06-11 08:00 GMT (09:00 Europe/Dublin) | wa-agl-20260610-193608 | `2026-06-11-0850-jun10-11-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 10-11 08:00 GMT run | AGL expense-reference messages handled; remaining Zoho/source mapping preserved on task. |
| CBMAX / Claudio - `Brivio, Claudio \| Richmond Blackwood` | `120363203209263793@g.us` | common-tasks manual-run only | 2026-06-11 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-11-0850-jun10-11-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 10-11 08:00 GMT run | No in-window messages. |
| MHL / Gabriel - `Grey Desk Restructuring` | `120363419842553151@g.us` | common-tasks manual-run only | 2026-06-11 08:00 GMT (09:00 Europe/Dublin) | wa-mhl-20260610-160926 | `2026-06-11-0850-jun10-11-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 10-11 08:00 GMT run | MHL appointment/payment messages handled; open incorporation task preserves continuing work. |
| SVL / Kristjan - `Olafsson, Kristjan \| Richmond Blackwood` | `120363409060100858@g.us` | common-tasks manual-run only | 2026-06-11 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-11-0850-jun10-11-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 10-11 08:00 GMT run | No in-window messages. |
| VUN / Eran | `491773931663@s.whatsapp.net` | common-tasks manual-run only | 2026-06-11 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-11-0850-jun10-11-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 10-11 08:00 GMT run | No in-window messages. |
| NACV / Andrei | `120363399321589278@g.us` | common-tasks manual-run only | 2026-06-11 08:00 GMT (09:00 Europe/Dublin) | wa-nacv-20260610-212132 | `2026-06-11-0850-jun10-11-0800-gmt` | provisional | Stage 12A approved NACV outgoing Communication log and source-marker remediation for the June 10-11 08:00 GMT run | Outgoing WhatsApp reply logged in Communications; NACV Abrechnung source request task remains open for collection. |
| TPL / Pradeep | `120363399422225301@g.us` | common-tasks manual-run only | 2026-06-11 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-11-0850-jun10-11-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 10-11 08:00 GMT run | No in-window messages. |
| Monochromatic - `Monochromatic \| Richmond Blackwood` | `120363405249757858@g.us` | common-tasks manual-run only | 2026-06-11 08:00 GMT (09:00 Europe/Dublin) | wa-mono-20260610-095236 | `2026-06-11-0850-jun10-11-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 10-11 08:00 GMT run | Monochromatic payment source captured; receipt/evidence follow-through remains deferred. |
| Chamberlain / Aaron - `Chamberlain, Aaron \| Richmond Blackwood` | `120363378578862576@g.us` | common-tasks manual-run only | 2026-06-11 08:00 GMT (09:00 Europe/Dublin) | wa-chamb-20260610-113012 | `2026-06-11-0850-jun10-11-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 10-11 08:00 GMT run | Aaron IHK/payment messages captured; owner review path remains open. |
| PCL / Ricardo | `120363302853461649@g.us` | common-tasks manual-run only | 2026-06-11 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-11-0850-jun10-11-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 10-11 08:00 GMT run | No in-window WhatsApp messages; PCL Gmail route and labels were resolved in Stage 12A/13. |
| CLV / Celine | `120363146867278918@g.us` | common-tasks manual-run only | 2026-06-11 08:00 GMT (09:00 Europe/Dublin) | wa-clv-20260610-151836 | `2026-06-11-0850-jun10-11-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 10-11 08:00 GMT run | CLV timing/upload guidance handled; no reply pending. |
| AKS / Ana | `120363365115227969@g.us` | common-tasks manual-run only | 2026-06-11 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-11-0850-jun10-11-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 10-11 08:00 GMT run | No in-window messages. |
| WEW / Wewrite | `120363268146260451@g.us` | common-tasks manual-run only | 2026-06-11 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-11-0850-jun10-11-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 10-11 08:00 GMT run | No in-window messages. |
| VUN / Nathan | `120363392073065176@g.us` | common-tasks manual-run only | 2026-06-11 08:00 GMT (09:00 Europe/Dublin) | wa-vun-nathan-20260610-155140 | `2026-06-11-0850-jun10-11-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 10-11 08:00 GMT run | VUN/Nathan classification request captured; task snoozed to 2026-06-13. |

## Update Rule

Advance a route's `Last read through` only after the approved run has:

1. included the route in Stage 3 discovery;
2. read or confirmed empty the route window;
3. completed or explicitly blocked all required Communication, task, evidence, translation, reply, and Slack work for messages in the window;
4. written and printed the Stage 10 source-marker plan and Stage 11 results packet;
5. updated this registry and automation memory.

If a run partially succeeds, leave that route's checkpoint unchanged and add the blocker to the stage packet.
