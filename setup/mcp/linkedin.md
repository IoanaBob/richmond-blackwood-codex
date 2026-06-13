# LinkedIn MCP Setup

Status: provisional.
Source: user instruction in Codex chat on 2026-06-11; GitHub repository `stickerdaniel/linkedin-mcp-server` inspected on 2026-06-11.
Imported: 2026-06-11.
Review: keep the guard in read-only mode for research. Use approved-write mode only for a separate, time-bounded send run after the user approves the exact packet. Current LinkedIn persona is Eran Richmond Blackwood; call booking hands off to Ioana.

This guide sets up a guarded local LinkedIn MCP server for Codex.

The selected upstream is [`stickerdaniel/linkedin-mcp-server`](https://github.com/stickerdaniel/linkedin-mcp-server). As of 2026-06-11, GitHub search by stars showed it as the clear top open-source LinkedIn MCP server found for `linkedin mcp server`:

- Stars: 2,260.
- Forks: 404.
- License: Apache-2.0.
- Language: Python.
- Updated: 2026-06-11.

The upstream README says the project is independent and not affiliated with LinkedIn, uses a logged-in browser session, and warns that LinkedIn's User Agreement prohibits automated access and accounts can be restricted or banned. Treat it as high-risk automation.

## What Lives In Git

- `setup/mcp/linkedin-guard-proxy.mjs`: local MCP stdio proxy that launches the upstream server and filters tools.
- `setup/mcp/linkedin-login.sh`: local helper for status/login/logout against the dedicated Eran Richmond Blackwood browser profile.
- This setup guide and the Codex config snippet below.

Do not vendor the upstream source into this repository. The default launcher uses `uvx mcp-server-linkedin@latest` so the upstream package can be updated independently.

## What Must Stay Local

Do not commit:

- LinkedIn browser profiles, cookies, session state, or screenshots.
- `~/.linkedin-mcp/` contents.
- `~/.codex/config.toml`.
- Any exported LinkedIn message/profile data unless it is intentionally summarized into approved RB Growth Targets, Growth Messages, or Communications records.

The default dedicated profile path is:

```text
~/.linkedin-mcp/eran-richmond-blackwood/profile
```

Use only Eran Richmond Blackwood's LinkedIn session for RB Germany growth unless the user explicitly switches the LinkedIn sender for a run.

When a prospect is ready to book a call, switch scheduling to Ioana. Use Ioana's calendar and meeting invite sender for that booking handoff.

## Guard Policy

Default mode is `read_only`.

In `read_only` mode, the proxy:

- Hides and blocks known write tools such as `send_message` and `connect_with_person`.
- Blocks unknown tools unless they are on the read-only allowlist.
- Adds `rb_linkedin_guard_status` so the active guard mode can be checked from the MCP client.
- Keeps upstream browser/session state isolated to the Eran-specific profile path.

Read-only tools currently allowed:

- `get_person_profile`
- `get_my_profile`
- `get_sidebar_profiles`
- `get_inbox`
- `get_conversation`
- `search_conversations`
- `get_company_profile`
- `get_company_posts`
- `search_companies`
- `get_company_employees`
- `search_jobs`
- `search_people`
- `get_job_details`
- `get_feed`
- `close_session`
- `rb_linkedin_guard_status`

Write mode exists only as a deliberate local override for an approved send run:

```sh
RB_LINKEDIN_MCP_MODE=approved_write
```

Do not enable `approved_write` for normal research or daily planning. Use it only after the LinkedIn growth skill has printed the exact target/message packet, the user has approved that exact packet, and the active account has been verified as Eran Richmond Blackwood immediately before each send.

In this setup, safeguards mean account-protection controls, not a permanent ban on writes. Approved writes are allowed only inside the skill's send stage, with daily quota checks, pacing, warning/restriction stop rules, explicit approval, and Growth Messages logging.

Legacy mode value `unsafe_all` is still accepted by the proxy for backward compatibility, but new local config should use `approved_write`.

## Install Prerequisites

Required:

```sh
which uvx
python3 --version
```

The upstream package currently requires Python 3.12+. `uvx` downloads the package and Patchright browser dependencies on first use.

## Add The Codex MCP Server

Add this to `~/.codex/config.toml`, adjusting the repository path if needed:

```toml
[mcp_servers.linkedin]
command = "node"
args = ["/Users/eranpeer/richmond-blackwood-codex/setup/mcp/linkedin-guard-proxy.mjs"]
startup_timeout_sec = 60.0
tool_timeout_sec = 300.0
default_tools_approval_mode = "approve"

[mcp_servers.linkedin.env]
RB_LINKEDIN_MCP_MODE = "read_only"
RB_LINKEDIN_MCP_UPSTREAM_COMMAND = "/Users/eranpeer/.local/bin/uvx"
RB_LINKEDIN_MCP_USER_DATA_DIR = "/Users/eranpeer/.linkedin-mcp/eran-richmond-blackwood/profile"
RB_LINKEDIN_MCP_TIMEOUT_MS = "10000"
RB_LINKEDIN_MCP_TOOL_TIMEOUT_SECONDS = "300"
RUSTC = "/Users/eranpeer/.rustup/toolchains/stable-x86_64-apple-darwin/bin/rustc"
CARGO = "/Users/eranpeer/.rustup/toolchains/stable-x86_64-apple-darwin/bin/cargo"
UV_HTTP_TIMEOUT = "300"
```

The Codex-side approval mode is intentional. Even read-only LinkedIn tools can expose private inbox/profile context.

After changing `~/.codex/config.toml`, restart or reload Codex so it discovers the `linkedin` MCP server.

## Login And Session Checks

Check whether the Eran profile is already logged in:

```sh
setup/mcp/linkedin-login.sh status
```

Create or refresh the session:

```sh
setup/mcp/linkedin-login.sh login
```

This opens a browser controlled by the upstream MCP package. Log in only as Eran Richmond Blackwood. Complete any LinkedIn mobile confirmation or captcha manually.

Clear the local LinkedIn profile:

```sh
setup/mcp/linkedin-login.sh logout
```

## Usage Rules

- Use the guarded `linkedin` MCP for LinkedIn reads when it is available.
- Do not use browser automation as the default LinkedIn route once the guarded MCP read path works.
- Do not use raw upstream `mcp-server-linkedin` in Codex config unless deliberately debugging the guard.
- Do not send connection requests or messages through LinkedIn MCP while `RB_LINKEDIN_MCP_MODE=read_only`; the guard should block those tools.
- For approved sends, temporarily use `RB_LINKEDIN_MCP_MODE=approved_write` and revert to `read_only` after the send run.
- Every LinkedIn send still follows `skills/rb-germany-growth-linkedin/SKILL.md`: exact packet approval, Eran session verification, daily quota gate, pacing, warning/restriction stop rules, and Growth Messages logging.
- When a call is booked from a LinkedIn thread, use Ioana's calendar/persona for the meeting handoff.

## Verification

Before use:

```sh
node --check setup/mcp/linkedin-guard-proxy.mjs
setup/mcp/linkedin-login.sh status
```

After Codex reload:

- Confirm `linkedin` appears in available MCP tools.
- Call `rb_linkedin_guard_status`.
- Confirm `send_message` and `connect_with_person` are not exposed while `RB_LINKEDIN_MCP_MODE=read_only`.
