#!/usr/bin/env bash
set -euo pipefail

ENV_FILE="${XERO_MCP_ENV_FILE:-$HOME/.codex/xero-mcp.env}"
PACKAGE="${XERO_MCP_PACKAGE:-@xeroapi/xero-mcp-server@latest}"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Xero MCP environment file not found: $ENV_FILE" >&2
  echo "Create it with either XERO_CLIENT_ID plus XERO_CLIENT_SECRET, or XERO_CLIENT_BEARER_TOKEN." >&2
  exit 1
fi

if [[ ! -r "$ENV_FILE" ]]; then
  echo "Xero MCP environment file is not readable: $ENV_FILE" >&2
  exit 1
fi

set -a
# shellcheck disable=SC1090
. "$ENV_FILE"
set +a

if [[ -z "${XERO_CLIENT_BEARER_TOKEN:-}" ]]; then
  if [[ -z "${XERO_CLIENT_ID:-}" || -z "${XERO_CLIENT_SECRET:-}" ]]; then
    echo "Xero MCP needs XERO_CLIENT_ID and XERO_CLIENT_SECRET, or XERO_CLIENT_BEARER_TOKEN." >&2
    exit 1
  fi
fi

if command -v npx >/dev/null 2>&1; then
  exec npx -y "$PACKAGE"
fi

NVM_NPX="$HOME/.nvm/versions/node/v18.7.0/bin/npx"
if [[ -x "$NVM_NPX" ]]; then
  exec "$NVM_NPX" -y "$PACKAGE"
fi

echo "Could not find npx. Install Node.js/npm or set PATH for Codex MCP startup." >&2
exit 1
