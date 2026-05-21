# WhatsApp Source Roster

Status: provisional.
Source: prior RB client imports plus operator correction on 2026-05-20.
Imported: 2026-05-20.
Review: Resolve missing chat IDs during the next run; do not advance checkpoints for unresolved/missed chats until they have been read in an approved run.

## Purpose

Stage 3 must use this roster as the minimum WhatsApp coverage checklist for client-speaking common tasks follow-through. A chat being on this roster means it must be considered during discovery; it does not authorize background monitoring, historical backfill, outbound messages, or media downloads beyond the approved run window.

## Required Chat Coverage

| Route label | Current chat ID | Status | Handling rule |
| --- | --- | --- | --- |
| AGL / Byron - `Frasier, Byron \| Richmond Blackwood` | `120363222065866778@g.us` | Known route pointer | Include in Stage 3 discovery when in scope; checkpoint only after successful approved handling and only if persistent checkpoint storage exists. |
| CBMAX / Claudio - `Brivio, Claudio \| Richmond Blackwood` | `120363203209263793@g.us` | Known route pointer | Include in Stage 3 discovery when in scope; checkpoint only after successful approved handling and only if persistent checkpoint storage exists. |
| MHL / Gabriel - `Grey Desk Restructuring` | `120363419842553151@g.us` | Known route pointer | Include in Stage 3 discovery when in scope; checkpoint only after successful approved handling and only if persistent checkpoint storage exists. |
| SVL / Kristjan - `Olafsson, Kristjan \| Richmond Blackwood` | `120363409060100858@g.us` | Known route pointer | Include in Stage 3 discovery when in scope; checkpoint only after successful approved handling and only if persistent checkpoint storage exists. |
| VUN / Eran | `491773931663@s.whatsapp.net` | Known monitored contact checkpoint | Include when VUN/Eran is in scope; this is currently the only persistent repo checkpoint table. |
| NACV / Andrei | `120363399321589278@g.us` | Known route pointer from supervised run | Include in Stage 3 discovery when in scope; checkpoint only after successful approved handling and only if persistent checkpoint storage exists. |
| TPL / Pradeep | `120363399422225301@g.us` | Known route pointer from supervised run | Include in Stage 3 discovery when in scope; checkpoint only after successful approved handling and only if persistent checkpoint storage exists. |
| Monochromatic - `Monochromatic \| Richmond Blackwood` | unresolved | Missed in 2026-05-19 corrective run | Resolve the chat through WhatsApp search in the next run. Do not advance a checkpoint for this route until it has been discovered, read for the approved window, and stored in an approved persistent checkpoint location. |
| Chamberlain / Aaron - `Chamberlain, Aaron \| Richmond Blackwood` | unresolved | Missed in 2026-05-19 corrective run | Resolve the chat through WhatsApp search in the next run. Do not advance a checkpoint for this route until it has been discovered, read for the approved window, and stored in an approved persistent checkpoint location. |
| PCL / Ricardo | unresolved | Missed in 2026-05-19 corrective run | Resolve the chat through WhatsApp search in the next run. Do not advance a checkpoint for this route until it has been discovered, read for the approved window, and stored in an approved persistent checkpoint location. |
| CLV / Celine | unresolved | Missed in 2026-05-19 corrective run | Resolve the chat through WhatsApp search in the next run. Confirm whether this route maps to Selin Ozkohen/CLV or a separate Celine contact. Do not advance a checkpoint until resolved and read in an approved run. |
| AKS / Ana | unresolved | Missed in 2026-05-19 corrective run | Resolve the chat through WhatsApp search in the next run. Do not advance a checkpoint for this route until it has been discovered, read for the approved window, and stored in an approved persistent checkpoint location. |

## Stage 3 Packet Requirement

The Communication Discovery And Read packet must include a WhatsApp coverage checklist with one row per route:

- route label;
- chat ID or `unresolved`;
- discovery result;
- messages found in the approved window;
- whether body/media read was needed;
- blocker if unresolved or inaccessible;
- whether checkpointing is allowed.

Unresolved routes must stay visible as blockers. Do not silently omit a roster route because no stored JID exists.

## Stage 10/11 Checkpoint Rule

Do not advance a WhatsApp checkpoint for any roster route unless all are true:

1. The route was included in Stage 3 discovery for the approved window.
2. The route's messages in the window were read or explicitly confirmed empty.
3. Required Communications/tasks/evidence/replies for that route are complete or explicitly blocked in the packet.
4. A persistent checkpoint table or registry exists for that route.

If any condition is false, record the route as `checkpoint not advanced` in Stage 10/11 packets and carry it into Stage 14 blockers.
