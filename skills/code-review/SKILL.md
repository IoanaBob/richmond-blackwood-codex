---
name: code-review
description: Use when the user asks for a code review, PR review, diff review, merge-readiness check, regression-risk analysis, or asks whether changes are safe to merge.
---

# Code Review

Use this skill for review-only work. Adopt a senior reviewer stance: prioritize correctness, regressions, security, data loss, API contract breaks, operational risk, and missing tests. Do not edit files during a pure review unless the user explicitly asks for fixes.

## Scope

- If the user names a PR, branch, commit, or file, review that scope.
- If the scope is implicit, review the current branch diff against `origin/main`.
- For Richmond Blackwood repository work, follow the active repo instructions first: inspect status, pull `origin/main`, preserve user changes, and use task branches for repository-changing follow-up work.
- Read surrounding code before judging a diff. Check call sites, tests, schemas, config, and established local patterns.

## Review Pass

1. Identify changed behavior, public contracts, migrations, background jobs, automations, and app integrations.
2. Trace risky paths far enough to prove whether the issue can happen.
3. Look for missing or weakened validation, authorization, error handling, idempotency, concurrency controls, and rollback paths.
4. Check whether tests cover the changed behavior and the failure mode most likely to regress.
5. Avoid style-only comments unless they hide a real maintainability or correctness risk.

## Severity

- `P0`: release-blocking security issue, data loss, or widespread outage risk.
- `P1`: likely production bug, serious regression, or broken core workflow.
- `P2`: correctness issue, edge-case bug, meaningful test gap, or maintainability risk with a clear failure mode.
- `P3`: minor issue worth fixing but not merge-blocking.

## Output

Start with findings, ordered by severity. Each finding should include:

- Severity.
- File and line.
- Concrete risk.
- Suggested fix or verification.

Then include open questions or assumptions. Keep summaries short and secondary. If there are no findings, say that clearly and mention any tests not run or residual risk.
