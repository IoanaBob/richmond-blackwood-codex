---
name: rb-task-pr
description: Use when starting, finishing, or publishing a Richmond Blackwood repository task that should get its own git branch and GitHub pull request.
---

# RB Task PR

Use this skill for repository work that should be isolated and published as a pull request.

## Default Policy

- One meaningful task gets one branch and one PR.
- Use a short task slug in the branch name.
- Never include unrelated user changes in a task PR.
- If the worktree already has changes, identify whether they belong to this task before branching, committing, or pushing.
- Do not run destructive git commands to make the worktree clean.

## Finish And Publish

1. Review `git status --short`, `git diff`, and `git diff --staged`.
2. Run focused validation.
3. Stage only task-owned files.
4. Commit with a concise message.
5. Push with upstream.
6. Open a PR when GitHub tooling is available.

## Helper Script

```bash
skills/rb-task-pr/scripts/task_pr.sh --help
```

The script refuses to stage changes unless the caller passes `--all` or explicit paths after `--`.
