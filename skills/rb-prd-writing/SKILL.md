---
name: rb-prd-writing
description: Write or revise Richmond Blackwood PRDs, Notion project descriptions, developer handoff specs, and implementation-plan sections from discovery context, examples, and approved project scope.
---

# RB PRD Writing

Use this skill when writing or fixing RB PRDs, Notion project descriptions, product requirements, implementation plans, or developer handoff specs.

## Core Standard

A good RB PRD is a readable decision document, not a task dump.

It should give a developer enough context to understand the workflow, constraints, branches, and acceptance criteria without needing to replay the discovery conversation. It should still leave engineering room to choose the final architecture unless the user has already made a technical decision.

## Writing Style

- Start sections with concise prose that explains the situation and why the requirement exists.
- Use bullets only where they improve precision: field lists, explicit rules, status values, test cases, assumptions, non-goals, and open decisions.
- Do not make the whole PRD a bullet list or table. If most lines start with `-`, rewrite into narrative.
- Preserve the user's concrete language and examples where they clarify behavior.
- Prefer exact workflow titles over abstract labels. Example: `When a filing accounting period ends, create linked preparation and filing tasks and notify the owner`, not `Detect period ended`.
- Avoid vague implementation verbs such as `sync`, `build model`, `handle`, or `support` unless followed by the exact source, destination, fields, and success behavior.
- Explain branch behavior explicitly: what happens when data is complete, missing, ambiguous, approved, rejected, paid, unpaid, or blocked.

## PRD Shape

Use the workspace-required headings when they exist, but fill them with implementation-quality content.

### Problem & Opportunity

Write a short narrative first. Then use short bullets for:
- Problem: what is broken, manual, risky, confusing, or blocked today.
- Opportunity: what the automation/product unlocks.

The problem should be specific to the workflow, actors, records, and systems involved.

### Go-To-Market Strategy

For internal RB automations, this is the internal rollout plan:
- which team or workflow uses it first;
- what starts in read-only, draft, or review mode;
- which clients/records are eligible for the pilot;
- what human approval remains required;
- how the team will be notified after the workflow is live.

### Success Criteria

Use measurable or pass/fail criteria. Avoid generic success criteria like `workflow is automated`.

Good criteria specify:
- source records selected correctly;
- status transitions updated correctly;
- required links/evidence stored;
- duplicate prevention;
- review gates respected;
- final run summary created;
- no client-facing send or irreversible action happens without approved rules.

### Method

Write the end-to-end workflow in prose so the developer understands the business process. Then add implementation subsections only where useful.

For developer handoff PRDs, include these sections when relevant:
- Summary
- Scope
- Source Systems
- Data Model and Contracts
- Trigger Flow
- Workflow Branches
- Human Review Gates
- External Integrations
- Notifications and Communication Rules
- Evidence and Audit Trail
- Test Plan
- Assumptions
- Open Decisions

## Implementation Detail Boundary

Include implementation constraints when they are business requirements, for example:
- Notion is the source of truth for a record type.
- Human submission is mandatory.
- Open banking may request approval but must not execute payment without the required approval path.
- Payslips go to the client-visible field, while payment lists stay internal.

Do not invent low-level architecture, library choices, API payloads, database table names, or background-job design unless the user or source context provides them. If a data contract is needed but names are unknown, write required fields conceptually and mark naming as an open decision.

## Traceability Rules

Before finalizing, verify every meaningful requirement comes from one of:
- user instruction in the current conversation;
- pasted discovery transcript;
- existing Notion page/task;
- approved RB process rule;
- explicit external source cited in the answer.

If the user corrected a phrase, use the corrected behavior, not the earlier compressed version.

## Quality Gate

Before writing live content, run this checklist:

- The first paragraph answers what is being built and why.
- The PRD includes concrete source systems and destination systems.
- The workflow has triggers, branches, and terminal states.
- Missing, ambiguous, or blocked states are described.
- Human review gates are explicit.
- Client-facing communication rules are explicit when communication is involved.
- Success criteria are testable.
- The test plan covers happy path, duplicate prevention, missing data, blocked state, and permission/review gates.
- Assumptions and open decisions are not hidden in requirements.
- The document reads like the user's example PRD: narrative sections supported by bullets, not bullets pretending to be a PRD.

If any item fails, revise before updating Notion or handing the PRD to a developer.

