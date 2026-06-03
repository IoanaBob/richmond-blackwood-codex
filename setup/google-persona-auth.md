# Google Persona Auth

Status: provisional.
Source: personal-codex global Google persona auth setup ported on 2026-05-25.
Imported: 2026-05-25.
Review: confirm RB-specific persona slugs and which accounts are approved for source reads or sends.

Use this setup for persona-scoped Gmail, Google Drive, and Google Calendar helper access.

## Global Storage

Actual refresh/access tokens are global-Codex-local and ignored by git:

```text
~/.codex/google-personas/<persona-slug>/
```

Safe status metadata can be recorded in `memory/google-personas.md`; tokens, client secrets, and token responses must never be printed, packetized, committed, or copied into Notion.

## RB-Specific Personas

- `accounting-richmond-blackwood`
- `compliance-richmond-blackwood`
- `ioana-richmond-blackwood`
- `jp-richmond-blackwood`
- `simoneta-richmond-blackwood`

Shared global personas from other local Codex projects may also be present under `~/.codex/google-personas/`. Do not treat those personas as RB actors.

## Execution Rule

For future Google helper runs, treat token/account-token failures as execution-path issues before any auth flow:

```text
CLOUDSDK_CONFIG=~/.codex
```

For persona-scoped Gmail/Drive/Calendar helper work, use the per-persona OAuth vault first:

```text
~/.codex/google-personas/<persona-slug>/oauth/authorized_user.json
```

When the vault is missing, point `CLOUDSDK_CONFIG` at `~/.codex/google-personas/<persona-slug>/gcloud/` or a documented stable company cache, use application-default credentials through gcloud, and try the matching account-token fallback before any browser-auth path. Also check for stale `GOOGLE_APPLICATION_CREDENTIALS` or `CLOUDSDK_AUTH_CREDENTIAL_FILE_OVERRIDE` values that can hijack the intended credentials.

The helpers default to `--auth-login never`. Routine checks should use saved credentials only. Use `--auth-login auto` or `--auth-login always` only when the user explicitly approves an interactive Google auth flow in the current context.

## Commands

Populate the OAuth vault from existing ADC files without OAuth:

```bash
npm run google-auth:sync-oauth-vault
```

Recover sender-context OAuth client files without reauth:

```bash
npm run google-auth:recover-oauth-clients
```

Verify saved global persona readiness without starting OAuth:

```bash
npm run google-auth:verify-personas
```

Reconnect exactly one persona after explicit approval:

```bash
npm run google-auth:reconnect-oauth-vault -- --persona <persona-slug> --interactive
```

Do not ask the user to log in again or start browser reauth when a saved vault/ADC/account-token route is missing or rejected. Record the checked paths and error class, then mark the work blocked on connector-managed auth or a separately approved per-persona OAuth reconnect.
