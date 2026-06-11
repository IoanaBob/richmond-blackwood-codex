#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
bridge_dir="$repo_root/third_party/whatsapp-mcp/whatsapp-bridge"
bridge_repo="$repo_root/third_party/whatsapp-mcp"
bridge_patch="$repo_root/setup/mcp/patches/whatsapp-mcp-localhost-bridge.patch"
state_dir="$repo_root/.codex-local"
pid_file="$state_dir/whatsapp-bridge.pid"
log_file="$state_dir/whatsapp-bridge.log"
qr_code_file="$state_dir/whatsapp-qr-code.txt"
qr_png_file="$state_dir/whatsapp-qr.png"
binary_file="$state_dir/whatsapp-bridge-bin"
plist_file="$state_dir/com.richmondblackwood.whatsapp-bridge.plist"
go_cache_dir="$state_dir/go-build-cache"
go_mod_cache_dir="$state_dir/go/pkg/mod"
launch_label="com.richmondblackwood.whatsapp-bridge"
port="${WHATSAPP_BRIDGE_PORT:-8080}"
bridge_host="${WHATSAPP_BRIDGE_HOST:-127.0.0.1}"
command="${1:-start}"

is_listening() {
  lsof -nP -iTCP:"$port" -sTCP:LISTEN >/dev/null 2>&1
}

pid_is_running() {
  [[ -f "$pid_file" ]] && kill -0 "$(cat "$pid_file")" >/dev/null 2>&1
}

ensure_bridge_patch() {
  if grep -q "WHATSAPP_BRIDGE_HOST" "$bridge_dir/main.go"; then
    return 0
  fi

  if [[ ! -f "$bridge_patch" ]]; then
    echo "Missing WhatsApp bridge patch: $bridge_patch" >&2
    return 1
  fi

  (
    cd "$bridge_repo"
    git apply "$bridge_patch"
  )
  echo "Applied local WhatsApp bridge safety patch."
}

print_status() {
  if is_listening; then
    echo "WhatsApp bridge is listening on port $port."
    return 0
  fi

  if pid_is_running; then
    echo "WhatsApp bridge process $(cat "$pid_file") is running but port $port is not listening yet."
    return 1
  fi

  echo "WhatsApp bridge is not running."
  return 1
}

start_with_launchd() {
  local user_id
  user_id="$(id -u)"

  cat > "$plist_file" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key>
  <string>$launch_label</string>
  <key>ProgramArguments</key>
  <array>
    <string>/bin/zsh</string>
    <string>-lc</string>
    <string>cd "$bridge_dir" &amp;&amp; WHATSAPP_BRIDGE_HOST="$bridge_host" WHATSAPP_BRIDGE_PORT="$port" WHATSAPP_QR_CODE_FILE="$qr_code_file" WHATSAPP_QR_PNG_FILE="$qr_png_file" WHATSAPP_QR_TERMINAL=false exec "$binary_file"</string>
  </array>
  <key>RunAtLoad</key>
  <true/>
  <key>WorkingDirectory</key>
  <string>$bridge_dir</string>
  <key>StandardOutPath</key>
  <string>$log_file</string>
  <key>StandardErrorPath</key>
  <string>$log_file</string>
</dict>
</plist>
PLIST

  launchctl bootout "gui/$user_id" "$plist_file" >/dev/null 2>&1 || true
  if launchctl bootstrap "gui/$user_id" "$plist_file"; then
    launchctl kickstart -k "gui/$user_id/$launch_label" >/dev/null 2>&1 || true
    echo "Started WhatsApp bridge LaunchAgent $launch_label."
  else
    echo "LaunchAgent bootstrap failed; falling back to a background process."
    start_with_nohup
  fi
}

start_with_nohup() {
  (
    cd "$bridge_dir"
    WHATSAPP_BRIDGE_HOST="$bridge_host" WHATSAPP_BRIDGE_PORT="$port" WHATSAPP_QR_CODE_FILE="$qr_code_file" WHATSAPP_QR_PNG_FILE="$qr_png_file" WHATSAPP_QR_TERMINAL=false nohup "$binary_file" >> "$log_file" 2>&1 < /dev/null &
    echo "$!" > "$pid_file"
  )
  echo "Started WhatsApp bridge process $(cat "$pid_file")."
}

start_bridge() {
  mkdir -p "$state_dir" "$go_cache_dir" "$go_mod_cache_dir"

  if is_listening; then
    echo "WhatsApp bridge is already listening on port $port."
    return 0
  fi

  if pid_is_running; then
    echo "WhatsApp bridge process $(cat "$pid_file") is already running. Waiting for port $port..."
  else
    if [[ ! -d "$bridge_dir" ]]; then
      echo "Missing WhatsApp bridge directory: $bridge_dir" >&2
      echo "Run: git submodule update --init --recursive" >&2
      return 1
    fi

    ensure_bridge_patch

    if [[ ! -x "$binary_file" || "$bridge_dir/main.go" -nt "$binary_file" ]]; then
      (
        cd "$bridge_dir"
        GOCACHE="$go_cache_dir" GOMODCACHE="$go_mod_cache_dir" go build -o "$binary_file" .
      )
    fi

    if [[ "$(uname -s)" == "Darwin" ]]; then
      start_with_launchd
    else
      start_with_nohup
    fi
  fi

  for _ in $(seq 1 60); do
    if is_listening; then
      echo "WhatsApp bridge is listening on port $port."
      return 0
    fi
    sleep 1
  done

  echo "WhatsApp bridge did not start listening on port $port within 60 seconds."
  echo "Log: $log_file"
  tail -n 40 "$log_file" || true
  return 1
}

stop_bridge() {
  if [[ "$(uname -s)" == "Darwin" && -f "$plist_file" ]]; then
    launchctl bootout "gui/$(id -u)" "$plist_file" >/dev/null 2>&1 || true
    echo "Stopped WhatsApp bridge LaunchAgent."
  fi

  if pid_is_running; then
    kill "$(cat "$pid_file")"
    rm -f "$pid_file"
    echo "Stopped WhatsApp bridge."
    return 0
  fi

  echo "No tracked WhatsApp bridge process is running."
}

case "$command" in
  start)
    start_bridge
    ;;
  status)
    print_status
    ;;
  stop)
    stop_bridge
    ;;
  restart)
    stop_bridge || true
    start_bridge
    ;;
  *)
    echo "Usage: $0 [start|status|stop|restart]" >&2
    exit 2
    ;;
esac
