#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKTREE_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
if COMMON_GIT_DIR="$(git -C "${WORKTREE_ROOT}" rev-parse --path-format=absolute --git-common-dir 2>/dev/null)"; then
  BASE_REPO_ROOT="$(dirname "${COMMON_GIT_DIR}")"
else
  BASE_REPO_ROOT="${WORKTREE_ROOT}"
fi

ENV_FILE="${RB_XERO_ENV_FILE:-${BASE_REPO_ROOT}/.env}"
ACTIVE_FILE="${RB_XERO_ACTIVE_CLIENT_FILE:-${BASE_REPO_ROOT}/.codex-local/xero-active-client}"
PACKAGE="${RB_XERO_MCP_PACKAGE:-@xeroapi/xero-mcp-server@latest}"

if [[ -f "${ENV_FILE}" ]]; then
  set -a
  # shellcheck disable=SC1090
  source "${ENV_FILE}"
  set +a
fi

CLIENT_REFERENCE="${RB_XERO_CLIENT_REFERENCE:-}"
if [[ -z "${CLIENT_REFERENCE}" && -f "${ACTIVE_FILE}" ]]; then
  CLIENT_REFERENCE="$(tr -d '[:space:]' < "${ACTIVE_FILE}")"
fi
if [[ -z "${CLIENT_REFERENCE}" ]]; then
  CLIENT_REFERENCE="${RB_XERO_ACTIVE_CLIENT_REFERENCE:-}"
fi

if [[ -z "${CLIENT_REFERENCE}" ]]; then
  echo "Missing Xero client reference. Set RB_XERO_ACTIVE_CLIENT_REFERENCE in .env or run setup/mcp/select-xero-client.sh <CLIENT_REFERENCE>." >&2
  exit 1
fi

CLIENT_KEY="$(printf '%s' "${CLIENT_REFERENCE}" | tr '[:lower:]' '[:upper:]' | tr -c 'A-Z0-9' '_')"
TOKEN_FILE_VAR="RB_XERO_${CLIENT_KEY}_TOKEN_FILE"
TENANT_ID_VAR="RB_XERO_${CLIENT_KEY}_TENANT_ID"
TOKEN_FILE="${!TOKEN_FILE_VAR:-}"
TENANT_ID="${!TENANT_ID_VAR:-}"

if [[ -n "${TOKEN_FILE}" || -f "${BASE_REPO_ROOT}/.codex-local/xero/${CLIENT_KEY}/oauth-token.json" ]]; then
  if [[ -z "${TENANT_ID}" ]]; then
    echo "Missing Xero tenant pin for ${CLIENT_KEY}. Set ${TENANT_ID_VAR} in ${ENV_FILE} from the intended Xero OAuth connection before starting MCP." >&2
    exit 1
  fi
  ACCESS_TOKEN="$(node "${SCRIPT_DIR}/xero-oauth.mjs" access-token "${CLIENT_KEY}")"
  export XERO_CLIENT_BEARER_TOKEN="${ACCESS_TOKEN}"
  export XERO_TENANT_ID="${TENANT_ID}"
  unset XERO_CLIENT_ID
  unset XERO_CLIENT_SECRET
else
  echo "Missing Xero OAuth token for ${CLIENT_KEY}. Run setup/mcp/xero-oauth.mjs login ${CLIENT_KEY} using the RB OAuth app credentials in ${ENV_FILE}; expected token under ${BASE_REPO_ROOT}/.codex-local/xero/${CLIENT_KEY}/oauth-token.json." >&2
  exit 1
fi

NPX_BIN="${RB_XERO_NPX_BIN:-npx}"
MCP_BIN="$("${NPX_BIN}" -y -p "${PACKAGE}" sh -c 'command -v xero-mcp-server')"
node "${SCRIPT_DIR}/patch-xero-mcp-tenant.mjs" "${MCP_BIN}"
exec "${MCP_BIN}"
