---
name: rb-task-pr
description: Use when starting, finishing, or publishing a Richmond Blackwood repository task that should get its own git branch and GitHub pull request.
---

# RB Task PR

Use this skill for repository work that should be isolated and published as a pull request.

## Default Policy

- One meaningful task gets one branch and one PR.
- Every repository-changing chat or skill run starts with `git status --short --branch`, `git pull origin main`, and a fresh `codex/<task-slug>` branch when the tree is clean.
- Before committing, classify the work into scope buckets: reusable process/skill/helper changes, template/product changes, client-specific records, live-client pilot/application records, and unrelated cleanup. If more than one bucket is present, either split into separate branches/PRs or stop and ask the user which scope should stay in the current PR.
- Do not mix reusable template/process buildout with a client pilot such as VUN/Nathan/Selin records in the same PR unless the user explicitly approves that combined review scope after seeing the file list.
- Do not include broad helper/tooling rewrites in a business-process PR when the same outcome can be achieved with an existing connector, existing spreadsheet, or a small process note.
- Use a short task slug in the branch name.
- Never include unrelated user changes in a task PR.
- If the worktree already has changes, identify whether they belong to this task before branching, committing, or pushing. If changes or conflicts block a clean start, split task-owned work into relevant commits and PRs, communicate PR URLs or blockers, then continue from a clean updated base.
- Do not run destructive git commands to make the worktree clean.
- Ask the user to review before committing unless the user has explicitly instructed this run to push and open a PR as part of closeout.

## Finish And Publish

1. Review `git status --short`, `git diff`, and `git diff --staged`.
2. Run focused validation.
3. Ask the user to review the diff and wait for explicit commit approval unless the current user instruction already authorizes push-and-PR closeout.
4. Stage only task-owned files.
5. Commit with a concise message.
6. Push with upstream.
7. Fetch or otherwise check the branch against `origin/main`.
8. Resolve any conflicts on the task branch, rerun focused validation, and push the corrected branch.
9. Open or update a PR when GitHub tooling is available, then communicate the branch, PR URL, conflict status, validation, and blockers.

## Helper Script

```bash
skills/rb-task-pr/scripts/task_pr.sh --help
```

The script refuses to stage changes unless the caller passes `--all` or explicit paths after `--`.
