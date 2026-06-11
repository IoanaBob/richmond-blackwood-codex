#!/usr/bin/env bash
set -euo pipefail

COMMAND="${RB_LINKEDIN_MCP_UPSTREAM_COMMAND:-uvx}"
USER_DATA_DIR="${RB_LINKEDIN_MCP_USER_DATA_DIR:-$HOME/.linkedin-mcp/eran-richmond-blackwood/profile}"
TIMEOUT_MS="${RB_LINKEDIN_MCP_TIMEOUT_MS:-10000}"
TOOL_TIMEOUT_SECONDS="${RB_LINKEDIN_MCP_TOOL_TIMEOUT_SECONDS:-300}"

action="${1:-status}"

case "$action" in
  login)
    exec "$COMMAND" mcp-server-linkedin@latest \
      --login \
      --timeout "$TIMEOUT_MS" \
      --tool-timeout "$TOOL_TIMEOUT_SECONDS" \
      --user-data-dir "$USER_DATA_DIR"
    ;;
  status)
    exec "$COMMAND" mcp-server-linkedin@latest \
      --status \
      --timeout "$TIMEOUT_MS" \
      --tool-timeout "$TOOL_TIMEOUT_SECONDS" \
      --user-data-dir "$USER_DATA_DIR"
    ;;
  logout)
    exec "$COMMAND" mcp-server-linkedin@latest \
      --logout \
      --timeout "$TIMEOUT_MS" \
      --tool-timeout "$TOOL_TIMEOUT_SECONDS" \
      --user-data-dir "$USER_DATA_DIR"
    ;;
  *)
    echo "Usage: setup/mcp/linkedin-login.sh [status|login|logout]" >&2
    exit 64
    ;;
esac
