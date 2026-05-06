# VUN Client Processes

Status: provisional.
Imported: 2026-05-05.
Client reference: `VUN`.

This folder contains VUN-specific process extensions.

Do not duplicate the full Richmond Blackwood process here. Each file should point to the general process it extends and record only the VUN-specific completion, override, blocker, or exception.

## Extension Files

- `process-overrides.md`: active VUN-specific process deltas.

## Extension Format

Use this shape for each entry:

```md
## <Short Rule Name>

Status: provisional | approved | superseded.
Extends: `processes/<general-process>.md`.
Type: completion | override | blocker | exception.
Source: <Notion/Drive/Slack/Gmail/user instruction/local file>.
Review: <what still needs confirmation>.

### Client Quirk

<What is different for VUN.>

### Rule

<What Codex or the operator should do differently.>

### Private Detail Location

<Link to the VUN file/folder where unsanitised supporting detail lives.>
```
