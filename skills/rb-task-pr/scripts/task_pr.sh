#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'USAGE'
Usage:
  task_pr.sh --task "Short task name" [options] [-- path ...]

Options:
  --task TEXT           Required task title used for branch, commit, and PR title.
  --base BRANCH         Base branch for PR. Defaults to current upstream default, then main.
  --branch NAME         Branch name to use. Defaults to codex/YYYYMMDD-task-slug.
  --commit TEXT         Commit message. Defaults to the task title.
  --body TEXT           PR body. Defaults to a short generated body.
  --ready               Create a ready PR instead of a draft PR.
  --include-dirty       Allow branch creation when worktree already has changes.
  --all                 Stage all changes after branch creation.
  --no-pr               Commit and push, but do not create a PR.
  -h, --help            Show this help.

Paths after -- are staged explicitly. Without paths or --all, the script refuses to stage.

Safety:
  The script refuses to create/switch branches with a dirty worktree unless --include-dirty
  is set. Review git status before using --include-dirty.
USAGE
}

die() {
  echo "task_pr.sh: $*" >&2
  exit 1
}

slugify() {
  printf '%s' "$1" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//; s/-+/-/g' \
    | cut -c 1-48
}

default_base_branch() {
  local remote_ref
  remote_ref="$(git symbolic-ref --quiet --short refs/remotes/origin/HEAD 2>/dev/null || true)"
  if [[ -n "$remote_ref" ]]; then
    printf '%s\n' "${remote_ref#origin/}"
  elif git show-ref --verify --quiet refs/heads/main; then
    printf '%s\n' "main"
  else
    git branch --show-current
  fi
}

task=""
base=""
branch=""
commit_msg=""
body=""
draft_flag="--draft"
include_dirty=false
stage_all=false
create_pr=true
paths=()

while [[ $# -gt 0 ]]; do
  case "$1" in
    --task)
      [[ $# -ge 2 ]] || die "--task requires a value"
      task="$2"
      shift 2
      ;;
    --base)
      [[ $# -ge 2 ]] || die "--base requires a value"
      base="$2"
      shift 2
      ;;
    --branch)
      [[ $# -ge 2 ]] || die "--branch requires a value"
      branch="$2"
      shift 2
      ;;
    --commit)
      [[ $# -ge 2 ]] || die "--commit requires a value"
      commit_msg="$2"
      shift 2
      ;;
    --body)
      [[ $# -ge 2 ]] || die "--body requires a value"
      body="$2"
      shift 2
      ;;
    --ready)
      draft_flag=""
      shift
      ;;
    --include-dirty)
      include_dirty=true
      shift
      ;;
    --all)
      stage_all=true
      shift
      ;;
    --no-pr)
      create_pr=false
      shift
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    --)
      shift
      while [[ $# -gt 0 ]]; do
        paths+=("$1")
        shift
      done
      ;;
    *)
      die "unknown argument: $1"
      ;;
  esac
done

[[ -n "$task" ]] || die "--task is required"
git rev-parse --show-toplevel >/dev/null

base="${base:-$(default_base_branch)}"
commit_msg="${commit_msg:-$task}"
body="${body:-Automated Codex task PR for: $task}"

if [[ -z "$branch" ]]; then
  slug="$(slugify "$task")"
  [[ -n "$slug" ]] || die "task could not be converted into a branch slug"
  branch="codex/$(date +%Y%m%d)-$slug"
fi

dirty_before_branch="$(git status --short)"
current_branch="$(git branch --show-current)"

if [[ "$current_branch" != "$branch" ]]; then
  if [[ -n "$dirty_before_branch" && "$include_dirty" != true ]]; then
    git status --short
    die "worktree is dirty; rerun with --include-dirty only if these changes belong to this task"
  fi
  if git show-ref --verify --quiet "refs/heads/$branch"; then
    git switch "$branch"
  else
    git switch -c "$branch"
  fi
fi

if [[ "${#paths[@]}" -gt 0 ]]; then
  git add -- "${paths[@]}"
elif [[ "$stage_all" == true ]]; then
  git add -A
else
  die "provide --all or explicit paths after -- so task-owned files are selected deliberately"
fi

if git diff --cached --quiet; then
  die "nothing staged to commit"
fi

git status --short
git commit -m "$commit_msg"
git push -u origin "$branch"

if [[ "$create_pr" == true ]]; then
  if ! command -v gh >/dev/null 2>&1; then
    die "pushed branch, but gh is unavailable; create the PR manually"
  fi
  args=(pr create --base "$base" --head "$branch" --title "$task" --body "$body")
  if [[ -n "$draft_flag" ]]; then
    args+=("$draft_flag")
  fi
  gh "${args[@]}"
fi
