---
name: relay-room
description: Immediately execute private or group relay room operations by directly calling relay room, thread, message, and transcript tools with no exploratory preamble.
license: MIT
compatibility: opencode
metadata:
  audience: operators
  workflow: room-relay
---

# Relay Room Skill

Use this skill when the user wants OpenCode conversations to coordinate through the local relay plugin.

## Core rule

Do not ask the user to manually edit session IDs or configuration files for routine room usage.
When the relay plugin hook is active, room-oriented calls should omit `sessionID` and let OpenCode inject the current session automatically.
The standalone relay MCP compatibility path is **not** an equal substitute for the plugin path: it can store room, thread, and message state, but it does **not** auto-inject messages into OpenCode sessions.

## Tool-first contract

When the user's intent clearly matches one of the operations below, your **first action must be the matching tool call**.

Prefer the relay plugin tools exposed in the current OpenCode session:
- `relay_room_create`
- `relay_room_join`
- `relay_room_status`
- `relay_room_send`
- `relay_room_members`
- `relay_room_set_role`
- `relay_thread_create`
- `relay_thread_list`
- `relay_message_send`
- `relay_message_mark_read`
- `relay_message_list`
- `relay_transcript_export`

These are the relay plugin tool IDs that should be used for normal room operations.
If the session exposes only namespaced aliases, treat `mcp__relay__room_create`, `mcp__relay__room_join`, `mcp__relay__room_status`, `mcp__relay__room_send`, `mcp__relay__room_members`, `mcp__relay__room_set_role`, `mcp__relay__thread_create`, `mcp__relay__thread_list`, `mcp__relay__message_send`, `mcp__relay__message_mark_read`, `mcp__relay__message_list`, and `mcp__relay__transcript_export` as the same standard plugin surface.
Bare `relay_*` tool names and namespaced `mcp__relay__*` aliases are both plugin tools. Do not mistake the namespaced aliases for the standalone compatibility path.
Do not prefer standalone compatibility tools such as `relay_compat_room_create`, `relay_compat_room_send`, or any other `relay_compat_*` names when the plugin tools are available.
For normal relay usage, use `relay_room_*`, `relay_thread_*`, `relay_message_*`, and `relay_transcript_export`, or the equivalent namespaced `mcp__relay__*` aliases, from the plugin surface.

Do **not** before the first tool call:
- search for tools
- explain the workflow
- restate the request
- ask for confirmation
- switch into analysis mode
- attempt MCP server calls using the name `relay-room`

The name `relay-room` is a **skill name**, not an MCP server name.

Only stop immediate execution if:
- a required argument is missing
- the current session truly does not expose the needed relay tools
- the tool call itself fails

## SessionID rule

- For `relay_room_create`, `relay_room_join`, `relay_room_status`, `relay_room_send`, `relay_room_members`, `relay_thread_create`, `relay_thread_list`, `relay_message_send`, and `relay_message_mark_read`, **do not pass `sessionID`, `actorSessionID`, `createdBySessionID`, or `senderSessionID` manually when the tool is being called from a normal OpenCode conversation**.
- The relay plugin's `tool.execute.before` hook is expected to inject the current session automatically.
- Never use placeholders such as `current` or `current-session` for these fields.
- Only provide an explicit real session ID when the user explicitly gives one and asks for a manual compatibility-path call.
- If the user explicitly asks for a standalone/manual compatibility-path call, make clear that it is storage-oriented and does not provide plugin-managed session delivery.

## Reply contract

Your user-facing reply must come **after** the real tool call and must reflect the actual tool output.
Do not fabricate room codes, aliases, thread IDs, peer sessions, or delivery results.

If tools are unavailable, report the missing tool names directly.
Do not say `MCP server "relay-room" not found`.
Do not silently switch to the standalone compatibility path just because the plugin tools are missing.
Do not claim the plugin tools are missing if the session exposes only the namespaced `mcp__relay__*` aliases.

## Private room flow

### Create a private room
If the user says things like:
- create a room
- create a private room
- start a room

Your first action must be:
- call `relay_room_create` (or `mcp__relay__room_create` if that is the plugin alias actually exposed in the session)
- omit `kind` or set `kind="private"`
- omit `sessionID`

### Join a private room
If the user wants to join a private room:
- call `relay_room_join` (or `mcp__relay__room_join` if that is the plugin alias actually exposed in the session)
- pass `roomCode`
- omit `sessionID`
- do not require alias

### Send inside a private room
If the user wants to send to the other side in a private room:
- call `relay_room_send` (or `mcp__relay__room_send` if that is the plugin alias actually exposed in the session)
- pass only `message`
- omit `sessionID`

## Group room flow

### Create a group room
If the user says things like:
- create a group room
- start a group room

Your first action must be:
- call `relay_room_create` with `kind="group"` (or `mcp__relay__room_create` with the same args if that is the plugin alias actually exposed in the session)
- omit `sessionID`

After the tool call:
1. return the room code
2. make clear that the creator is the room owner
3. tell the user other conversations must join with an alias

### Join a group room with alias
If the user says things like:
- join room 123456 as alpha
- join 123456 and use alias beta

Your first action must be:
- call `relay_room_join` (or `mcp__relay__room_join` if that is the plugin alias actually exposed in the session)
- pass `roomCode`
- pass `alias`
- omit `sessionID`

If alias is missing for a group room, ask only for the alias.

### View room members
If the user asks who is in the room:
- call `relay_room_members` (or `mcp__relay__room_members` if that is the plugin alias actually exposed in the session)
- omit `sessionID` when querying the current room from the active conversation

### Change a member role
If the user wants to make someone an observer or member:
- call `relay_room_set_role` (or `mcp__relay__room_set_role` if that is the plugin alias actually exposed in the session)
- only the room owner can do this
- omit `actorSessionID` in a normal conversation and let the hook inject it

## Group messaging behavior

### Broadcast to the whole group
If the user wants everyone in the group to see the message:
- call `relay_room_send` (or `mcp__relay__room_send` if that is the plugin alias actually exposed in the session)
- pass `message`
- do not pass `targetAlias`
- omit `sessionID`

### Direct message a specific group member
If the user wants to privately message one member inside a group room:
- call `relay_room_send` (or `mcp__relay__room_send` if that is the plugin alias actually exposed in the session)
- pass `message`
- pass `targetAlias`
- omit `sessionID`

## Thread/message warehouse tools

Use these when the user explicitly wants durable message/thread operations instead of simple room-send shortcuts:

- `relay_thread_create`
- `relay_thread_list`
- `relay_message_list`
- `relay_message_send`
- `relay_message_mark_read`
- `relay_transcript_export`

When calling these from a normal OpenCode conversation, omit session-bound identity fields and let the relay plugin hook inject them. If only namespaced aliases are exposed, use `mcp__relay__thread_create`, `mcp__relay__thread_list`, `mcp__relay__message_list`, `mcp__relay__message_send`, `mcp__relay__message_mark_read`, and `mcp__relay__transcript_export` as equivalent plugin tools.

## Fast-path examples

### Example: private room creation
User: create a room
First action: call `relay_room_create`

### Example: group room creation
User: create a group room
First action: call `relay_room_create` with `kind="group"`

### Example: join group with alias
User: join room 821053 as alpha
First action: call `relay_room_join` with `roomCode="821053"`, `alias="alpha"`

### Example: group broadcast
User: send this to everyone in the room: start API work today
First action: call `relay_room_send` with `message="start API work today"`

### Example: direct message in group
User: DM alpha: you own integration testing
First action: call `relay_room_send` with `message="you own integration testing"`, `targetAlias="alpha"`

### Example: export transcript
User: export the full transcript for thread_xxx
First action: call `relay_transcript_export` with `threadId="thread_xxx"`

## Failure fallback

If the session does not expose the required relay tools, say that plainly and stop.
Do not pretend the room or thread operation succeeded.
Do not invent a room code.
Do not switch to a fake MCP server path.
Do not switch to the standalone relay MCP compatibility path unless the user explicitly asks for a manual compatibility-path call with real session IDs.

Use a direct fallback like:
- This session does not expose `relay_room_create` / `mcp__relay__room_create`, `relay_room_join` / `mcp__relay__room_join`, `relay_room_status` / `mcp__relay__room_status`, or the related relay plugin tools, so I cannot execute the room action here.

If a relay tool exists but complains that `sessionID` is required, that means the relay plugin hook did not intercept the call. Report that plainly instead of retrying with placeholders like `current`.

## Guardrails

- private room flow must remain unchanged
- group room join must require alias
- creator of a group room is the room owner
- room send in group mode may broadcast or direct-message a specific alias
- use durable thread/message tools when the user explicitly wants warehouse/history operations
- if a required argument is missing, ask only for that missing argument
- if a tool call fails, report the failure plainly and stop guessing
- treat this as an execution skill, not an analysis skill
- do not invent namespaced MCP tool IDs that the current OpenCode session does not actually expose
- do treat exposed `mcp__relay__*` aliases as standard plugin tools rather than as compatibility-path tools
- do not describe the standalone relay MCP compatibility path as auto-injecting or session-aware in the same way as the plugin path
