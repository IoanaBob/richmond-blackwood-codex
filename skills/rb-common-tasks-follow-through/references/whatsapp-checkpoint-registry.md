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
| AGL / Byron - `Frasier, Byron \| Richmond Blackwood` | `120363222065866778@g.us` | common-tasks manual-run only | 2026-06-04 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-04-0933-jun03-04-0800-gmt` | provisional | Stage 3 empty-window read plus Stage 11 source-marker results | No in-window messages. |
| CBMAX / Claudio - `Brivio, Claudio \| Richmond Blackwood` | `120363203209263793@g.us` | common-tasks manual-run only | 2026-06-12 08:00 GMT (09:00 Europe/Dublin) | wa-cbmax-20260611-171147 | `2026-06-12-0818-jun11-12-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 11-12 08:00 GMT run | CBMAX personal-tax and asset access sources logged; active task preserves follow-through. |
| MHL / Gabriel - `Grey Desk Restructuring` | `120363419842553151@g.us` | common-tasks manual-run only | 2026-06-12 08:00 GMT (09:00 Europe/Dublin) | wa-mhl-20260611-104149 | `2026-06-12-0818-jun11-12-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 11-12 08:00 GMT run | MHL signature-completion source logged; related setup task remains open. |
| SVL / Kristjan - `Olafsson, Kristjan \| Richmond Blackwood` | `120363409060100858@g.us` | common-tasks manual-run only | 2026-06-12 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-12-0818-jun11-12-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 11-12 08:00 GMT run | Stage 3 confirmed empty route. |
| VUN / Eran | `491773931663@s.whatsapp.net` | common-tasks manual-run only | 2026-06-12 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-12-0818-jun11-12-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 11-12 08:00 GMT run | Stage 3 confirmed empty route. |
| NACV / Andrei | `120363399321589278@g.us` | common-tasks manual-run only | 2026-06-12 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-12-0818-jun11-12-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 11-12 08:00 GMT run | Stage 3 confirmed empty route for this run. |
| TPL / Pradeep | `120363399422225301@g.us` | common-tasks manual-run only | 2026-06-04 08:00 GMT (09:00 Europe/Dublin) | Not captured; latest read timestamp `2026-06-03T20:40:36+01:00` | `2026-06-04-0933-jun03-04-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 3-4 08:00 GMT run | TPL invoice/payment follow-through handled and snoozed to Simoneta. |
| Monochromatic - `Monochromatic \| Richmond Blackwood` | `120363405249757858@g.us` | common-tasks manual-run only | 2026-06-12 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-12-0818-jun11-12-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 11-12 08:00 GMT run | Stage 3 confirmed empty route. |
| Chamberlain / Aaron - `Chamberlain, Aaron \| Richmond Blackwood` | `120363378578862576@g.us` | common-tasks manual-run only | 2026-06-12 08:00 GMT (09:00 Europe/Dublin) | 3EB027DB1D23B3B1061609 | `2026-06-12-0818-jun11-12-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 11-12 08:00 GMT run | Aaron Finanzamt source logged and task created under AMC routing; no reply sent. |
| PCL / Ricardo | `120363302853461649@g.us` | common-tasks manual-run only | 2026-06-12 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-12-0818-jun11-12-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 11-12 08:00 GMT run | Stage 3 confirmed empty route. |
| CLV / Celine | `120363146867278918@g.us` | common-tasks manual-run only | 2026-06-12 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-12-0818-jun11-12-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 11-12 08:00 GMT run | Stage 3 confirmed empty route. |
| AKS / Ana | `120363365115227969@g.us` | common-tasks manual-run only | 2026-06-12 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-12-0818-jun11-12-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 11-12 08:00 GMT run | Stage 3 confirmed empty route. |
| WEW / Wewrite | `120363268146260451@g.us` | common-tasks manual-run only | 2026-06-12 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-12-0818-jun11-12-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 11-12 08:00 GMT run | Stage 3 confirmed empty route. |
| VUN / Nathan | `120363392073065176@g.us` | common-tasks manual-run only | 2026-06-12 08:00 GMT (09:00 Europe/Dublin) | wa-vun-nathan-20260611-115413 | `2026-06-12-0818-jun11-12-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 11-12 08:00 GMT run | VUN/Nathan follow-up logged and existing task reopened; no reply sent. |

## Update Rule

Advance a route's `Last read through` only after the approved run has:

1. included the route in Stage 3 discovery;
2. read or confirmed empty the route window;
3. completed or explicitly blocked all required Communication, task, evidence, translation, reply, and Slack work for messages in the window;
4. written and printed the Stage 10 source-marker plan and Stage 11 results packet;
5. updated this registry and automation memory.

If a run partially succeeds, leave that route's checkpoint unchanged and add the blocker to the stage packet.
