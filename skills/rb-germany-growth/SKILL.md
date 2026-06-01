---
name: rb-germany-growth
description: Master daily orchestration for the Richmond Blackwood Germany growth system across audience targets and channel skills, with Ioana-only send gates and canonical Communications logging.
---

# RB Germany Growth

Use this skill for the master Germany growth daily run or any coordinated Germany growth work across LinkedIn, Facebook groups, relocation partners, Reddit, Business Partners, Growth Targets, Communications, Compliance Checks, Metrics, and Tasks.

## Hard Gates

- Sender persona is always Ioana.
- Any send-ready action blocks unless the active connector/browser/account session is verified as Ioana immediately before the send.
- Do not infer Ioana from the local operator, mailbox, or workspace user.
- Outbound content is previewed in chat, not saved as an app draft.
- Sends only happen after explicit user approval for the exact message(s).
- Every send, reply, blocker, follow-up, and material state change is recorded in canonical Communications.
- Daily automation advances queues, blockers, tasks, and metrics. It does not send messages.
- Do not create, use, or resurrect the legacy growth partnership data source. If it is active, stop and report a migration blocker.

## Operating Sources

- Task project: `RB Germany Growth System` (`https://www.notion.so/372e41301314817bb344fbb0a11d9ae8`)
- Database home: `RB Client Databases` (`https://www.notion.so/f272baa16c3b45069cbd896624e04b5c`) in the Richmond Blackwood teamspace.
- Audiences: `collection://a02aa29c-be9c-4983-985d-233ed8f6b31b`
- Channels: `collection://0d028144-e767-41fb-aefe-a59237b5dd68`
- Growth Targets: `collection://1b84523e-9d56-47d0-9215-1618efee0b41`
- Business Partners: `collection://f52ad152-d91f-4663-86f1-e63a18edd90a`
- Communications: `collection://1b5e4130-1314-8183-afd8-000b6f4da982`
- Compliance Checks: `collection://3b6e8e51-0d0d-47d3-bf3b-e450363b6c54`
- Metrics: `collection://709de0f5-ac41-4b88-845e-efee49813daf`
- Tasks: `collection://25de4130-1314-8158-af69-000b6c9fb49e`

## Packet Workflow

For live daily runs, use packet stages like the other RB multi-stage skills. Use `/private/tmp/rb-germany-growth/<run-id>/` with `LOCK.md`, `RUN_STATE.md`, and one `stage-XX-<short-name>.md` packet per stage. Print each packet in chat before moving to the next stage.

Shared gates:

- No outbound send happens before Stage 7 exact-message approval.
- No schema migration or database replacement happens from this skill; schema changes require a separate explicit instruction.
- No channel skill may be run in send mode from the daily automation.
- Stop if the worktree becomes conflicted, the legacy partnership source appears active, a new destination is introduced, Ioana identity cannot be verified for a send-ready item, or connector access is degraded in a way that would make state tracking unsafe.

## Routing Rules

- Partnership prospects always go to Business Partners, including Facebook group sponsorship leads, group admins, relocation agents, expat coaches, immigration-adjacent firms, commercial referral partners, and professional firms.
- Non-partner targets go to Growth Targets, including LinkedIn individuals, Reddit communities/posts, and non-commercial research targets.
- Communications is the canonical log for drafts, sends, replies, blockers, and follow-ups.
- `Invoicing Email` on Business Partners is only for a real invoicing/commercial email. Casual contact routes, admin routes, and DM routes belong in Business Partner `Notes` and Communications.
- Growth Business Partners should use `Audience Target`, `Growth Channel`, `Growth Stage`, and `Ioana Gate` when available.
- Growth operating databases live in the Richmond Blackwood teamspace database hub, not under the Germany Growth task project. The project is for task grouping and due-work tracking only.

## Stages

1. Preflight
   - Inspect `git status --short --branch` and pull latest `origin/main` before repo or live-state changes.
   - Read `skills/index.md`, `skills/rb-communications/SKILL.md`, this skill, channel skill files, and `internal/growth-sales-marketing.md`.
   - Fetch Notion schemas for Audiences, Channels, Growth Targets, Business Partners, Communications, Compliance Checks, Metrics, and Tasks.
   - Check that the legacy growth partnership data source is deleted/trashed or unavailable. Block if it is active after migration should be complete.

2. Audience Selection
   - Load the active Audience Target.
   - Default first audience: `Americans in Germany / relocating to Germany`.
   - Load active channel rows linked to that audience.
   - Treat the system as Germany growth overall, not an Americans-only system.

3. Daily Queue
   - Pull due Communications follow-ups for the active audience and growth channels.
   - Pull due Tasks linked to `RB Germany Growth System`.
   - Pull Business Partners matching the active `Audience Target` and active `Growth Stage`.
   - Pull Growth Targets for non-partner LinkedIn, Reddit, and direct research targets.
   - Separate send-ready items from research, reply, blocker, and follow-up work.

4. Channel Work Packets
   - Run each channel skill in read/plan mode:
     - `rb-germany-growth-linkedin`
     - `rb-germany-growth-facebook-groups`
     - `rb-germany-growth-relocation-partners`
     - `rb-germany-growth-reddit`
   - Produce proposed creates/updates for Growth Targets, Business Partners, Communications, Compliance Checks, Metrics, and Tasks.
   - Do not send messages in the daily automation.

5. Compliance And Ioana Gate
   - Verify platform rules, approved claims, commercial approval needs, and sender-session status.
   - Set or preserve Business Partner `Ioana Gate`.
   - Send-ready items with unverified or non-Ioana sessions become blockers, not sends.
   - Promotional posts or sponsorship asks block without a rules basis, admin/moderator approval, or explicit user approval.

6. Draft Packet
   - Prepare exact outbound message previews in chat.
   - Show sender identity as Ioana and the channel/account context.
   - Create/update Communications only as operating log and follow-up state, not as software drafts.
   - Include target URL, Business Partner URL or Growth Target URL, audience, channel, proposed next action, and follow-up date.

7. Approved Send Stage
   - Only run when the user explicitly asks to send approved messages.
   - Re-check the active session immediately before each send.
   - Block any send where Ioana is not verified.
   - Send directly through the supported connector/MCP/browser route after approval.
   - Log the result, URL/message ID, status, and next follow-up in Communications.

8. Follow-Up Advancement
   - Move due dates, statuses, and blockers forward in Communications and Tasks.
   - Update Business Partner `Growth Stage` only when the communication result justifies it.
   - Do not move a partner to `Contacted by Ioana`, `Negotiating`, or `Pilot Active` without supporting Communications evidence.

9. Metrics And Closeout
   - Update Metrics with daily counts by audience and channel.
   - Report created/updated records, blockers, sends skipped, sends completed, and next follow-ups.
   - Record meaningful skill usage in `memory/skill-runs.md`.

## Closeout Checklist

- Business Partners retains icon `🤝` and has `Audience Target`, `Growth Channel`, `Growth Stage`, and `Ioana Gate`.
- Audiences has no active relation to the deleted legacy partnership data source.
- Communications has `Audience Target`, `Growth Channel`, and `Sender Identity`.
- No send happened unless the exact send stage was approved and Ioana was verified.
- The legacy growth partnership data source remains superseded/deleted.
