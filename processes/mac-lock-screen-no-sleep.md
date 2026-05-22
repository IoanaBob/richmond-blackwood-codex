# Mac Lock-Screen No-Sleep Setup

Status: provisional.
Source: user instruction in Codex thread on 2026-05-22; local macOS 26.5 `pmset` readback from JP's Mac; RB Internal Knowledge Base page `https://www.notion.so/368e413013148192bdd0ecd41b511bdf`.
Imported: 2026-05-22.
Review: confirm whether RB ever wants battery mode to stay awake too. Current standard is plugged-in only to avoid silent battery drain.

## Purpose

Use this guide when a Mac needs to keep RB work running after the user locks the screen. The goal is to let the display turn off and the session lock, while the computer itself does not enter idle system sleep while connected to power.

## RB Standard

- Use the power-adapter profile as the default. Keep the Mac plugged in before leaving long-running Codex, connector, export, upload, call, or automation work unattended.
- Do not change battery mode by default. Preventing sleep on battery can drain the laptop unexpectedly.
- Lock Screen and display sleep are separate from computer sleep. It is fine for the display to turn off while `sleep` remains `0`.
- Do not close a MacBook lid unless a deliberate clamshell setup is being used with power and the required external display/input setup.
- Use `caffeinate` only for temporary one-off sessions. For recurring RB host machines, set the power profile instead.

## System Settings Checklist

1. Open System Settings.
2. Go to Battery.
3. Open Options, if shown for the Mac and macOS version.
4. Turn on `Prevent automatic sleeping on power adapter when the display is off`, if the option is visible.
5. Go to Lock Screen.
6. Set `Turn display off on power adapter when inactive` to a display-only interval such as 10 minutes.
7. Keep password-on-wake or password-after-display-off enabled according to RB security policy.

## Terminal Apply Command

Run this on the Mac that should stay awake while plugged in:

```bash
sudo pmset -c sleep 0 disksleep 0 standby 0 powernap 0 hibernatemode 0 ttyskeepawake 1 tcpkeepalive 1 womp 1 lowpowermode 0
```

Optional display-only timeout:

```bash
sudo pmset -c displaysleep 10
```

## Verification

Run:

```bash
pmset -g custom
```

Under `AC Power`, verify these values:

```text
sleep                0
disksleep            0
standby              0
powernap             0
hibernatemode        0
ttyskeepawake        1
tcpkeepalive         1
womp                 1
lowpowermode         0
```

`displaysleep` may be any desired display-only timeout. A non-zero display timeout does not mean the computer will sleep.

## Local Baseline Seen Before This Guide

On JP's Mac before the 2026-05-22 update, the power-adapter profile showed `sleep 1`, `disksleep 10`, `powernap 1`, and `displaysleep 10`. If this exact machine needs to revert to its prior local behavior, use that baseline rather than assuming it is Apple's default.

## Troubleshooting

- If the Mac sleeps while locked, re-check that it is on power and that `pmset -g custom` shows `sleep 0` under `AC Power`.
- If work stops only when the lid is closed, treat that as lid/clamshell behavior rather than lock-screen sleep.
- If a managed device profile overrides these settings, record the blocker and ask the device administrator to allow the equivalent no-idle-sleep-on-power policy.
