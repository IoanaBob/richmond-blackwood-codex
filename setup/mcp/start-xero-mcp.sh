#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/../.." && pwd)"
ENV_FILE="${RB_XERO_ENV_FILE:-${REPO_ROOT}/.env}"
ACTIVE_FILE="${RB_XERO_ACTIVE_CLIENT_FILE:-${REPO_ROOT}/.codex-local/xero-active-client}"

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
CLIENT_ID_VAR="RB_XERO_${CLIENT_KEY}_CLIENT_ID"
CLIENT_SECRET_VAR="RB_XERO_${CLIENT_KEY}_CLIENT_SECRET"
CLIENT_ID="${!CLIENT_ID_VAR:-}"
CLIENT_SECRET="${!CLIENT_SECRET_VAR:-}"

if [[ -z "${CLIENT_ID}" || -z "${CLIENT_SECRET}" ]]; then
  echo "Missing Xero credentials for ${CLIENT_KEY}. Expected ${CLIENT_ID_VAR} and ${CLIENT_SECRET_VAR} in ${ENV_FILE}." >&2
  exit 1
fi

export XERO_CLIENT_ID="${CLIENT_ID}"
export XERO_CLIENT_SECRET="${CLIENT_SECRET}"

NPX_BIN="${RB_XERO_NPX_BIN:-npx}"
exec "${NPX_BIN}" -y @xeroapi/xero-mcp-server@latest
