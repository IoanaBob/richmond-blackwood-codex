# Handoff

Status: active.
Imported: 2026-05-04.

## Next Session

1. Read `AGENTS.md`, `memory/storage-rules.md`, and `memory/current-state.md`.
2. Skim `memory/history.md` and `memory/skill-runs.md`.
3. Check `skills/index.md` before using repo-local helpers.
4. Review the active VUN pilot in `clients/VUN/`.
5. Resolve `memory/open-questions.md` before creating client Notion pages or Drive folders.
6. Use Notion Companies `Reference` for client folders; do not invent slugs.
7. For growth work, use `internal/growth-sales-marketing.md` and `internal/marketing-creative-review.md`; HubSpot/API account analysis is on-demand only.

## Caution

Do not mark provisional facts approved without explicit user review.

Do not move or create Drive client documents until group/external classification and company folder are confirmed.

Do not delete earlier name-derived client folders until the user explicitly confirms deletion.

Repo-local helpers now exist. Gmail drafts must use `accounting@richmondblackwood.com` as `Richmond Blackwood Accounting Team`. SignNow helpers are generic only; do not infer RB signer identity or signing policy.

## Verification

Last checked 2026-05-04:

- `git diff --check` passed.
- Markdown trailing whitespace scan passed.
- Prior-template business keyword scans passed.

Neutral infrastructure port verification on 2026-05-05:

- `npm install` completed with an `@signnow/api-client` engine warning on Node 18.7.0 and four high-severity npm audit findings.
- `npm run typecheck` passed.
- Helper smoke checks passed.
- `git diff --check` passed.
- Forbidden source carryover scans passed.
