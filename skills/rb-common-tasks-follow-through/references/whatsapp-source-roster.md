# WhatsApp Source Roster

Status: provisional.
Source: prior RB client imports plus operator correction on 2026-05-20 and corrective run `2026-05-21-1006-daily-0800-window`.
Imported: 2026-05-20.
Review: Use this roster with `whatsapp-checkpoint-registry.md`; do not advance checkpoints for routes that were not included in the approved run window.

## Purpose

Stage 3 must use this roster as the minimum WhatsApp coverage checklist for client-speaking common tasks follow-through. A chat being on this roster means it must be considered during discovery; it does not authorize background monitoring, historical backfill, outbound messages, or media downloads beyond the approved run window.

Persistent checkpoint rows live in `whatsapp-checkpoint-registry.md`. The roster answers "which routes must be checked"; the checkpoint registry answers "where the last approved read stopped."

## Required Chat Coverage

| Route label | Current chat ID | Status | Handling rule |
| --- | --- | --- | --- |
| AGL / Byron - `Frasier, Byron \| Richmond Blackwood` | `120363222065866778@g.us` | Known route pointer | Include in Stage 3 discovery when in scope; checkpoint only after successful approved handling and only if persistent checkpoint storage exists. |
| CBMAX / Claudio - `Brivio, Claudio \| Richmond Blackwood` | `120363203209263793@g.us` | Known route pointer | Include in Stage 3 discovery when in scope; checkpoint only after successful approved handling and only if persistent checkpoint storage exists. |
| MHL / Gabriel - `Grey Desk Restructuring` | `120363419842553151@g.us` | Known route pointer | Include in Stage 3 discovery when in scope; checkpoint only after successful approved handling and only if persistent checkpoint storage exists. |
| SVL / Kristjan - `Olafsson, Kristjan \| Richmond Blackwood` | `120363409060100858@g.us` | Known route pointer | Include in Stage 3 discovery when in scope; checkpoint only after successful approved handling and only if persistent checkpoint storage exists. |
| VUN / Eran | `491773931663@s.whatsapp.net` | Known monitored contact checkpoint | Include when VUN/Eran is in scope; checkpoint state is in `whatsapp-checkpoint-registry.md` plus the VUN client file. |
| NACV / Andrei | `120363399321589278@g.us` | Known route pointer from supervised run | Include in Stage 3 discovery when in scope; checkpoint only after successful approved handling and only if persistent checkpoint storage exists. |
| TPL / Pradeep | `120363399422225301@g.us` | Known route pointer from supervised run | Include in Stage 3 discovery when in scope; checkpoint only after successful approved handling and only if persistent checkpoint storage exists. |
| Monochromatic - `Monochromatic \| Richmond Blackwood` | `120363405249757858@g.us` | Resolved route pointer from corrective run | Include in Stage 3 discovery when in scope; checkpoint state is in `whatsapp-checkpoint-registry.md`. |
| Chamberlain / Aaron - `Chamberlain, Aaron \| Richmond Blackwood` | `120363378578862576@g.us` | Resolved route pointer from corrective run | Include in Stage 3 discovery when in scope; checkpoint state is in `whatsapp-checkpoint-registry.md`. |
| PCL / Ricardo | `120363302853461649@g.us` | Resolved route pointer from corrective run | Include in Stage 3 discovery when in scope; checkpoint state is in `whatsapp-checkpoint-registry.md`. |
| CLV / Celine | `120363146867278918@g.us` | Resolved route pointer from corrective run | Include in Stage 3 discovery when in scope; Celine is personal for now per operator instruction; checkpoint state is in `whatsapp-checkpoint-registry.md`. |
| AKS / Ana | `120363365115227969@g.us` | Resolved route pointer from corrective run | Include in Stage 3 discovery when in scope; checkpoint state is in `whatsapp-checkpoint-registry.md`. |
| WEW / Wewrite | `120363268146260451@g.us` | Resolved route pointer from corrective run | Include in Stage 3 discovery when in scope; checkpoint state is in `whatsapp-checkpoint-registry.md`. |
| VUN / Nathan | `120363392073065176@g.us` | Resolved route pointer from corrective run | Include in Stage 3 discovery when in scope; checkpoint state is in `whatsapp-checkpoint-registry.md`. |

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

When checkpointing is allowed, update `whatsapp-checkpoint-registry.md` in the same PR or approved repo write as any process change, and record the resulting route rows in the stage packet and automation memory.
