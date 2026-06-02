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
| AGL / Byron - `Frasier, Byron \| Richmond Blackwood` | `120363222065866778@g.us` | common-tasks manual-run only | 2026-06-02 08:00 GMT (09:00 Europe/Dublin) | `3EB083158CA00714DB2678` | `2026-06-02-0930-jun01-02-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 1-2 08:00 GMT run | C10/C11 handled through Communications, filing/task routing, and Stage 9 task update. |
| CBMAX / Claudio - `Brivio, Claudio \| Richmond Blackwood` | `120363203209263793@g.us` | common-tasks manual-run only | 2026-06-02 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-02-0930-jun01-02-0800-gmt` | provisional | Stage 3 empty-window read plus Stage 11 source-marker results | Client file still says route pointer only. |
| MHL / Gabriel - `Grey Desk Restructuring` | `120363419842553151@g.us` | common-tasks manual-run only | 2026-06-02 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-02-0930-jun01-02-0800-gmt` | provisional | Stage 3 empty-window read plus Stage 11 source-marker results | Existing Gabriel reply task remains action owner; audio transcription intentionally skipped by operator on 2026-05-22. |
| SVL / Kristjan - `Olafsson, Kristjan \| Richmond Blackwood` | `120363409060100858@g.us` | common-tasks manual-run only | 2026-06-02 08:00 GMT (09:00 Europe/Dublin) | `3EB08A2EFCE00093A1571C` | `2026-06-02-0930-jun01-02-0800-gmt` | provisional | Stage 3 read plus Stage 11 source-marker results for the June 1-2 08:00 GMT run | C12/C13 handled through Communications and Stage 9 task updates; exact identifiers remain source-only. |
| VUN / Eran | `491773931663@s.whatsapp.net` | common-tasks manual-run only | 2026-05-21 08:00 Europe/Dublin | Not captured; use timestamp lower bound | `2026-05-21-1006-daily-0800-window` | provisional | Existing VUN client checkpoint plus Stage 3/3E read | Keep VUN client file as the more specific checkpoint when manually monitoring VUN. |
| NACV / Andrei | `120363399321589278@g.us` | common-tasks manual-run only | 2026-06-02 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-02-0930-jun01-02-0800-gmt` | provisional | Stage 3 empty-window read plus Stage 11 source-marker results | Analysis task remains linked; filing input-gathering task was intentionally not updated in prior cleanup. |
| TPL / Pradeep | `120363399422225301@g.us` | common-tasks manual-run only | 2026-06-02 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-02-0930-jun01-02-0800-gmt` | provisional | Stage 3 empty-window read plus Stage 11 source-marker results | Pradeep/Knappschaft task relation was removed from the Communication during prior cleanup. |
| Monochromatic - `Monochromatic \| Richmond Blackwood` | `120363405249757858@g.us` | common-tasks manual-run only | 2026-06-02 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-02-0930-jun01-02-0800-gmt` | provisional | Stage 3 empty-window read plus Stage 11 source-marker results | Capture exact message ID next successful non-empty run. |
| Chamberlain / Aaron - `Chamberlain, Aaron \| Richmond Blackwood` | `120363378578862576@g.us` | common-tasks manual-run only | 2026-06-02 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-02-0930-jun01-02-0800-gmt` | provisional | Stage 3 empty-window read plus Stage 11 source-marker results | Student-loan proof is useful for both personal-tax and garnishment/remaining-balance paths. |
| PCL / Ricardo | `120363302853461649@g.us` | common-tasks manual-run only | 2026-06-02 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-02-0930-jun01-02-0800-gmt` | provisional | Stage 3 empty-window read plus Stage 11 source-marker results | Media in prior cleanup was invoice/receipt auto-forward setup, not AOK evidence. |
| CLV / Celine | `120363146867278918@g.us` | common-tasks manual-run only | 2026-06-02 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-02-0930-jun01-02-0800-gmt` | provisional | Stage 3 empty-window read plus Stage 11 source-marker results | Celine is personal for now per operator instruction. |
| AKS / Ana | `120363365115227969@g.us` | common-tasks manual-run only | 2026-06-02 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-02-0930-jun01-02-0800-gmt` | provisional | Stage 3 empty-window read plus Stage 11 source-marker results | Company-owned per operator instruction. |
| WEW / Wewrite | `120363268146260451@g.us` | common-tasks manual-run only | 2026-06-02 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-02-0930-jun01-02-0800-gmt` | provisional | Stage 3 empty-window read plus Stage 11 source-marker results | VAT Q4 fine dispute context remains on the linked task. |
| VUN / Nathan | `120363392073065176@g.us` | common-tasks manual-run only | 2026-06-02 08:00 GMT (09:00 Europe/Dublin) | No messages in window; use timestamp lower bound | `2026-06-02-0930-jun01-02-0800-gmt` | provisional | Stage 3 empty-window read plus Stage 11 source-marker results | Targeted JID read should be used while `list_chats` remains unreliable. |

## Update Rule

Advance a route's `Last read through` only after the approved run has:

1. included the route in Stage 3 discovery;
2. read or confirmed empty the route window;
3. completed or explicitly blocked all required Communication, task, evidence, translation, reply, and Slack work for messages in the window;
4. written and printed the Stage 10 source-marker plan and Stage 11 results packet;
5. updated this registry and automation memory.

If a run partially succeeds, leave that route's checkpoint unchanged and add the blocker to the stage packet.
