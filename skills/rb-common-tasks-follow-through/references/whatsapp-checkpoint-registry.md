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
| AGL / Byron - `Frasier, Byron \| Richmond Blackwood` | `120363222065866778@g.us` | common-tasks manual-run only | 2026-05-26 09:00 Europe/Dublin | Not captured; use timestamp lower bound | `2026-05-26-1206-exact-2026-05-21-26` | provisional | Stage 3 exact-range read, Stage 7 done-row verification, and Stage 10A/11A source-marker correction | Capture exact last message ID next successful run. |
| CBMAX / Claudio - `Brivio, Claudio \| Richmond Blackwood` | `120363203209263793@g.us` | common-tasks manual-run only | 2026-05-26 09:00 Europe/Dublin | Not captured; use timestamp lower bound | `2026-05-26-1206-exact-2026-05-21-26` | provisional | Stage 3 exact-range read, Stage 9 August board-task source note, and Stage 10A/11A source-marker correction | Capture exact last message ID next successful run; client file still says route pointer only. |
| MHL / Gabriel - `Grey Desk Restructuring` | `120363419842553151@g.us` | common-tasks manual-run only | 2026-05-26 09:00 Europe/Dublin | Not captured; use timestamp lower bound | `2026-05-26-1206-exact-2026-05-21-26` | provisional | Stage 3 exact-range read, Stage 3A media recovery, Stage 4D audio transcription, Stage 6 task/Communication write, and Stage 10A/11A source-marker correction | Capture exact last message ID next successful run. |
| SVL / Kristjan - `Olafsson, Kristjan \| Richmond Blackwood` | `120363409060100858@g.us` | common-tasks manual-run only | 2026-05-26 09:00 Europe/Dublin | Not captured; use timestamp lower bound | `2026-05-26-1206-exact-2026-05-21-26` | provisional | Stage 3 exact-range read, Stage 9 TK/freelancer task source notes, and Stage 10A/11A source-marker correction | Capture exact last message ID next successful run. |
| VUN / Eran | `491773931663@s.whatsapp.net` | common-tasks manual-run only | 2026-05-26 09:00 Europe/Dublin | Not captured; use timestamp lower bound | `2026-05-26-1206-exact-2026-05-21-26` | provisional | Stage 3 exact-range read confirmed no messages; Stage 10A/11A source-marker correction | Keep VUN client file as the more specific checkpoint when manually monitoring VUN; capture exact last message ID where available. |
| NACV / Andrei | `120363399321589278@g.us` | common-tasks manual-run only | 2026-05-26 09:00 Europe/Dublin | Not captured; use timestamp lower bound | `2026-05-26-1206-exact-2026-05-21-26` | provisional | Stage 3 exact-range read, Stage 3A media recovery, Stage 12A Ioana owner correction, and Stage 10A/11A source-marker correction | Capture exact last message ID next successful run. |
| TPL / Pradeep | `120363399422225301@g.us` | common-tasks manual-run only | 2026-05-26 09:00 Europe/Dublin | Not captured; use timestamp lower bound | `2026-05-26-1206-exact-2026-05-21-26` | provisional | Stage 3 exact-range read, Stage 3A media recovery, Stage 9 TPL VAT/USt-IdNr. source note, and Stage 10A/11A source-marker correction | Capture exact last message ID next successful run. |
| Monochromatic - `Monochromatic \| Richmond Blackwood` | `120363405249757858@g.us` | common-tasks manual-run only | 2026-05-26 09:00 Europe/Dublin | Not captured; use timestamp lower bound | `2026-05-26-1206-exact-2026-05-21-26` | provisional | Stage 3 exact-range read, Stage 3A invoice recovery, Stage 9 contractor-contract source note/no-May-work routing, and Stage 10A/11A source-marker correction | Capture exact last message ID next successful run. |
| Chamberlain / Aaron - `Chamberlain, Aaron \| Richmond Blackwood` | `120363378578862576@g.us` | common-tasks manual-run only | 2026-05-26 09:00 Europe/Dublin | Not captured; use timestamp lower bound | `2026-05-26-1206-exact-2026-05-21-26` | provisional | Stage 3 exact-range read, Stage 3A media recovery, Stage 8A Aaron owner correction, Stage 9 task source notes, and Stage 10A/11A source-marker correction | Capture exact last message ID next successful run. |
| PCL / Ricardo | `120363302853461649@g.us` | common-tasks manual-run only | 2026-05-26 09:00 Europe/Dublin | Not captured; use timestamp lower bound | `2026-05-26-1206-exact-2026-05-21-26` | provisional | Stage 3 exact-range read confirmed no messages; Stage 10A/11A source-marker correction | Capture exact last message ID where available. |
| CLV / Celine | `120363146867278918@g.us` | common-tasks manual-run only | 2026-05-26 09:00 Europe/Dublin | Not captured; use timestamp lower bound | `2026-05-26-1206-exact-2026-05-21-26` | provisional | Stage 3 exact-range read, Stage 5 routing review, and Stage 10A/11A source-marker correction | Capture exact last message ID next successful run. |
| AKS / Ana | `120363365115227969@g.us` | common-tasks manual-run only | 2026-05-26 09:00 Europe/Dublin | Not captured; use timestamp lower bound | `2026-05-26-1206-exact-2026-05-21-26` | provisional | Stage 3 exact-range read confirmed no messages; Stage 10A/11A source-marker correction | Capture exact last message ID where available. |
| WEW / Wewrite | `120363268146260451@g.us` | common-tasks manual-run only | 2026-05-26 09:00 Europe/Dublin | Not captured; use timestamp lower bound | `2026-05-26-1206-exact-2026-05-21-26` | provisional | Stage 3 exact-range read, Stage 3A media recovery, operator instruction that churned client needs no action, and Stage 10A/11A source-marker correction | Capture exact last message ID next successful run. |
| VUN / Nathan | `120363392073065176@g.us` | common-tasks manual-run only | 2026-05-26 09:00 Europe/Dublin | Not captured; use timestamp lower bound | `2026-05-26-1206-exact-2026-05-21-26` | provisional | Stage 3 exact-range read, Stage 9 VUN VAT/ELSTER source notes, and Stage 10A/11A source-marker correction | Targeted JID read should be used while `list_chats` remains unreliable; capture exact last message ID next successful run. |

## Update Rule

Advance a route's `Last read through` only after the approved run has:

1. included the route in Stage 3 discovery;
2. read or confirmed empty the route window;
3. completed or explicitly blocked all required Communication, task, evidence, translation, reply, and Slack work for messages in the window;
4. written and printed the Stage 10 source-marker plan and Stage 11 results packet;
5. updated this registry and automation memory.

If a run partially succeeds, leave that route's checkpoint unchanged and add the blocker to the stage packet.
