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
| AGL / Byron - `Frasier, Byron \| Richmond Blackwood` | `120363222065866778@g.us` | common-tasks manual-run only | 2026-06-10 08:00 GMT (09:00 Europe/Dublin) | `3A31733E5E51E0CCFAE0` | `2026-06-10-0800-jun09-10-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 9-10 08:00 GMT run | COM-007 was logged and closed; TASK-006 preserves the missing source-email blocker. |
| CBMAX / Claudio - `Brivio, Claudio \| Richmond Blackwood` | `120363203209263793@g.us` | common-tasks manual-run only | 2026-06-10 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-10-0800-jun09-10-0800-gmt` | provisional | Stage 3 empty-window read plus Stage 11 source-marker results for the June 9-10 08:00 GMT run | No in-window WhatsApp messages. |
| MHL / Gabriel - `Grey Desk Restructuring` | `120363419842553151@g.us` | common-tasks manual-run only | 2026-06-10 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-10-0800-jun09-10-0800-gmt` | provisional | Stage 3 empty-window read plus Stage 11 source-marker results for the June 9-10 08:00 GMT run | No in-window WhatsApp messages. |
| SVL / Kristjan - `Olafsson, Kristjan \| Richmond Blackwood` | `120363409060100858@g.us` | common-tasks manual-run only | 2026-06-10 08:00 GMT (09:00 Europe/Dublin) | `3EB06F40B88EEDA3B0D1DB` | `2026-06-10-0800-jun09-10-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 9-10 08:00 GMT run | COM-011, TASK-009, and OP-006 preserve corrected invoice follow-up. |
| VUN / Eran | `491773931663@s.whatsapp.net` | common-tasks manual-run only | 2026-06-10 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-10-0800-jun09-10-0800-gmt` | provisional | Existing VUN client checkpoint plus Stage 3 empty-window read and Stage 11 source-marker results for the June 9-10 08:00 GMT run | Keep VUN client file as the more specific checkpoint when manually monitoring VUN. |
| NACV / Andrei | `120363399321589278@g.us` | common-tasks manual-run only | 2026-06-10 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-10-0800-jun09-10-0800-gmt` | provisional | Stage 3 empty-window read plus Stage 11 source-marker results for the June 9-10 08:00 GMT run | No in-window WhatsApp messages. |
| TPL / Pradeep | `120363399422225301@g.us` | common-tasks manual-run only | 2026-06-10 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-10-0800-jun09-10-0800-gmt` | provisional | Stage 3 empty-window read plus Stage 11 source-marker results for the June 9-10 08:00 GMT run | No in-window WhatsApp messages. |
| Monochromatic - `Monochromatic \| Richmond Blackwood` | `120363405249757858@g.us` | common-tasks manual-run only | 2026-06-10 08:00 GMT (09:00 Europe/Dublin) | `3BEA631F6349C66405F4` | `2026-06-10-0800-jun09-10-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 9-10 08:00 GMT run | COM-012, TASK-010, and OP-007 preserve payment-status follow-up. |
| Chamberlain / Aaron - `Chamberlain, Aaron \| Richmond Blackwood` | `120363378578862576@g.us` | common-tasks manual-run only | 2026-06-10 08:00 GMT (09:00 Europe/Dublin) | `3EB09BF1A239EF2C3817F0` | `2026-06-10-0800-jun09-10-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 9-10 08:00 GMT run | COM-010, TASK-008, and OP-005 preserve IHK contribution follow-up. |
| PCL / Ricardo | `120363302853461649@g.us` | common-tasks manual-run only | 2026-06-10 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-10-0800-jun09-10-0800-gmt` | provisional | Stage 3 empty-window read plus Stage 11 source-marker results for the June 9-10 08:00 GMT run | No in-window WhatsApp messages. |
| CLV / Celine | `120363146867278918@g.us` | common-tasks manual-run only | 2026-06-04 08:00 GMT (09:00 Europe/Dublin) | Not captured; latest read timestamp `2026-06-03T18:54:18+01:00` | `2026-06-04-0933-jun03-04-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 3-4 08:00 GMT run | CLV company-investing follow-through assigned to Johnpaul by operator. |
| AKS / Ana | `120363365115227969@g.us` | common-tasks manual-run only | 2026-06-10 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-10-0800-jun09-10-0800-gmt` | provisional | Stage 3 empty-window read plus Stage 11 source-marker results for the June 9-10 08:00 GMT run | No in-window WhatsApp messages. |
| WEW / Wewrite | `120363268146260451@g.us` | common-tasks manual-run only | 2026-06-10 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-10-0800-jun09-10-0800-gmt` | provisional | Stage 3 empty-window read plus Stage 11 source-marker results for the June 9-10 08:00 GMT run | No in-window WhatsApp messages. |
| VUN / Nathan | `120363392073065176@g.us` | common-tasks manual-run only | 2026-06-10 08:00 GMT (09:00 Europe/Dublin) | `3BCDCB64805A364372A6` | `2026-06-10-0800-jun09-10-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 9-10 08:00 GMT run | COM-013, TASK-011, and OP-008 preserve classification and invoice follow-up. |

## Update Rule

Advance a route's `Last read through` only after the approved run has:

1. included the route in Stage 3 discovery;
2. read or confirmed empty the route window;
3. completed or explicitly blocked all required Communication, task, evidence, translation, reply, and Slack work for messages in the window;
4. written and printed the Stage 10 source-marker plan and Stage 11 results packet;
5. updated this registry and automation memory.

If a run partially succeeds, leave that route's checkpoint unchanged and add the blocker to the stage packet.
