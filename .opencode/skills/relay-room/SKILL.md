---
name: relay-room
description: Execute room, thread, and team workflow tasks through the relay plugin surface.
---

# Relay Room

Use this skill inside this repository when the task involves relay rooms, durable threads, or relay-backed team workflows.

Use these rules:
- Stay on the plugin surface for normal execution: `relay_*` or `mcp__relay__*`.
- Do not use `relay_compat_*` for normal room or team execution. That path is compatibility-only and storage-oriented.
- For a new workflow, start with `relay_team_start`.
- For manager coordination, prefer `relay_team_status` first, then use `relay_room_send`, `relay_thread_create`, `relay_message_send`, or `relay_transcript_export` as needed.
- If `relay_team_status` returns `policyDecisions`, prefer `relay_team_apply_policy`; otherwise use `relay_team_intervene`.
- If the request is missing a required `task`, `roomCode`, `threadId`, `sessionID`, or target alias, ask only for that missing field.

Reporting rules:
- Act first, then summarize the result.
- Include `runId`, `roomCode`, or `threadId` when the tool returned one.
- Base coordination updates on actual relay tool output, not assumptions.
