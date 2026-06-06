---
name: prd-writing
description: Write or revise PRDs, Notion project descriptions, product specs, developer handoff documents, and implementation-plan sections for any project or company from discovery context, examples, and approved scope.
---

# PRD Writing

Use this skill when writing or fixing PRDs, Notion project descriptions, product requirements, implementation plans, or developer handoff specs for any project or company.

## Core Standard

A good PRD is a product decision document and implementation handoff, not a task dump.

It should tell a product, engineering, design, operations, or GTM stakeholder what is being built, for whom, why it matters, what is in and out of scope, how the experience or workflow should behave, and how success will be judged. It should give a developer enough context to build without replaying the discovery conversation while still leaving room for engineering decisions unless a technical decision is already approved.

## Writing Style

- Start sections with concise prose that explains the situation and why the requirement exists.
- Use bullets only where they improve precision: field lists, explicit rules, status values, test cases, assumptions, non-goals, and open decisions.
- Do not make the whole PRD a bullet list or table. If most lines start with `-`, rewrite into narrative.
- Preserve the user's concrete language and examples where they clarify behavior.
- Prefer exact workflow titles over abstract labels. Example: `When a filing accounting period ends, create linked preparation and filing tasks and notify the owner`, not `Detect period ended`.
- Avoid vague implementation verbs such as `sync`, `build model`, `handle`, or `support` unless followed by the exact source, destination, fields, and success behavior.
- Explain branch behavior explicitly: what happens when data is complete, missing, ambiguous, approved, rejected, paid, unpaid, or blocked.
- Do not over-structure. Main template headings are a guideline; add subheadings only when they make the PRD easier to use.
- Keep subheadings under a main heading to 3-5 maximum when they are needed.
- Do not put subheadings under `TL;DR`.
- Add subheadings under `Problem & Opportunity` only when the problem genuinely needs separation, such as multiple user groups, multiple workflows, or distinct market and technical problems.

## PRD Shape

Use the workspace-required headings when they exist, but fill them with product-quality and implementation-quality content. The template is a guideline, not a prison. Choose the fewest subheadings that make the PRD clear.

Every PRD must answer:
- What are we building?
- Who is it for?
- What user or business problem does it solve?
- Why now?
- What is explicitly in scope and out of scope?
- What workflow, user journey, or system behavior should exist?
- What constraints, review gates, edge cases, and failure states matter?
- How will product success, implementation completion, and guardrails be measured?
- What assumptions, dependencies, risks, and open decisions remain?

### TL;DR

Use when the PRD is more than a short page. Write 2-5 sentences or a compact paragraph. Do not add subheadings.

The TL;DR should state the product/workflow, target user or stakeholder, core value, and most important scope boundary.

### Problem & Opportunity

Write narrative first. Explain the current situation, the user/business pain, why the current state is inadequate, and what becomes possible if the project succeeds.

Use short bullets only when they make the problem/opportunity easier to scan. The problem should be specific to the product, workflow, actors, records, systems, market, or user segment involved.

Do not skip the target user. For internal projects, identify the operator/team and downstream stakeholder. For customer-facing products, identify the customer/user segment and their job-to-be-done.

### Go-To-Market Strategy

Use the right GTM shape for the project.

For internal operations or automation projects, this is the internal rollout plan: which team or workflow uses it first, what starts in read-only/draft/review mode, which records or clients are eligible for the pilot, what approval remains required, and how the team learns the workflow is live.

For customer-facing products, this is the market and launch plan: target segment, positioning, channels, lifecycle messaging, sales/customer-success enablement, launch gates, pricing/package implications if any, and how adoption will be measured.

### Success Criteria

Separate success into the right buckets instead of mixing everything together.

Use these labels when helpful:
- Product success metrics: adoption, conversion, cycle time, error reduction, revenue, retention, cost reduction, or other outcome metrics.
- Acceptance criteria: pass/fail behavior that must be true for release.
- Guardrail metrics: things that must not get worse, such as compliance risk, support load, data quality, payment errors, privacy, or user confusion.

Avoid generic success criteria like `workflow is automated`. Good criteria specify what changes, how it is observed, and what counts as done.

### Method

Write the end-to-end workflow in prose so the developer understands the business process. Then add implementation subsections only where useful.

For developer handoff PRDs, include or explicitly cover these topics. They do not all need to be literal headings:
- scope and non-goals;
- user journey or operational workflow;
- source systems and destination systems;
- data model, fields, API contracts, or payloads where known;
- triggers and entry conditions;
- workflow branches and terminal states;
- human review gates and permission requirements;
- external integrations;
- notifications and communication rules;
- evidence, audit trail, and data retention where relevant;
- risks and dependencies;
- test plan;
- assumptions and open decisions.

## Implementation Detail Boundary

Include implementation constraints when they are business requirements, for example:
- Notion is the source of truth for a record type.
- Human submission is mandatory.
- Open banking may request approval but must not execute payment without the required approval path.
- Payslips go to the client-visible field, while payment lists stay internal.

Include concrete technical contracts when the source context supports them or when they are clearly marked as proposed. Good PRDs can include fields, functions, event payloads, API behavior, state machines, and test cases when those details reduce ambiguity.

Do not present invented low-level architecture, library choices, API payloads, database table names, or background-job design as decided fact unless the user or source context provides them. If a data contract is needed but names are unknown, write required fields conceptually and mark naming as an open decision.

## Traceability Rules

Before finalizing, verify every meaningful requirement comes from a clear source:
- user instruction in the current conversation;
- pasted discovery transcript;
- existing Notion page/task;
- approved company process rule;
- explicit external source cited in the answer.

For internal or implementation PRDs, include a short `Source Basis`, `Assumptions`, or `Open Decisions` section unless the user explicitly wants a clean external-facing document. If source basis is not visible in the PRD, state the sources used in the handoff message.

If the user corrected a phrase, use the corrected behavior, not the earlier compressed version.

## Quality Gate

Before writing live content, run this checklist:

- The first paragraph answers what is being built and why.
- The target user, operator, customer, or stakeholder is explicit.
- The intended user or business outcome is explicit.
- Scope and non-goals are explicit.
- The PRD includes concrete product surfaces, source/destination systems, or integrations where relevant.
- The workflow has triggers, branches, and terminal states.
- Missing, ambiguous, or blocked states are described.
- Human review gates are explicit.
- Client-facing communication rules are explicit when communication is involved.
- Product success metrics, acceptance criteria, and guardrails are separated where relevant.
- The test plan covers the happy path plus the relevant failure modes, such as duplicate prevention, missing data, blocked state, permission gates, review gates, eligibility errors, or regression risk.
- Risks and dependencies are explicit.
- Assumptions and open decisions are not hidden in requirements.
- The source basis is visible in the PRD or stated in the handoff.
- The document reads like the user's example PRD: narrative sections supported by bullets, not bullets pretending to be a PRD.
- The structure is not overbuilt: no TL;DR subheadings, and no more than 3-5 subheadings under a main heading unless the user explicitly asks for a deeper technical spec.

If any item fails, revise before updating Notion or handing the PRD to a developer.
