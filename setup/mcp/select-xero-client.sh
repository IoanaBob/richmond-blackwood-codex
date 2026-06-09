#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 || -z "${1:-}" ]]; then
  echo "Usage: setup/mcp/select-xero-client.sh <CLIENT_REFERENCE>" >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
ENV_FILE="${RB_XERO_ENV_FILE:-${REPO_ROOT}/.env}"
ACTIVE_FILE="${RB_XERO_ACTIVE_CLIENT_FILE:-${REPO_ROOT}/.codex-local/xero-active-client}"
CLIENT_KEY="$(printf '%s' "$1" | tr '[:lower:]' '[:upper:]' | tr -c 'A-Z0-9' '_')"

if [[ -f "${ENV_FILE}" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "${ENV_FILE}"
  set +a
  CLIENT_ID_VAR="RB_XERO_${CLIENT_KEY}_CLIENT_ID"
  CLIENT_SECRET_VAR="RB_XERO_${CLIENT_KEY}_CLIENT_SECRET"
  if [[ -z "${!CLIENT_ID_VAR:-}" || -z "${!CLIENT_SECRET_VAR:-}" ]]; then
    echo "Warning: ${CLIENT_ID_VAR} or ${CLIENT_SECRET_VAR} is missing in ${ENV_FILE}." >&2
  fi
else
  echo "Warning: ${ENV_FILE} does not exist yet. Copy .env.example to .env and add the client credentials." >&2
fi

mkdir -p "$(dirname "${ACTIVE_FILE}")"
printf '%s\n' "${CLIENT_KEY}" > "${ACTIVE_FILE}"
echo "Selected Xero client reference ${CLIENT_KEY}. Restart or reload Codex so the xero MCP server starts with this client."
