# OpenCode A2A Plugin Relay

English | [简体中文](README.zh-CN.md)

A plugin-first A2A relay for OpenCode. This repository exposes an A2A-facing HTTP/JSON-RPC/SSE surface, bridges requests into OpenCode sessions, and keeps MCP as an internal operations capability rather than the public protocol.

Repository: https://github.com/FengYunCalm/opencode-peer-session-relay

## What this repo contains

- `packages/a2a-protocol` — shared A2A schemas and JSON-RPC/task/message/event contracts
- `packages/relay-plugin` — plugin runtime, A2A host, request routing, persistence, replay, and guards
- `packages/relay-shared` — small shared utilities and constants
- `tests/` — protocol, plugin, and end-to-end verification
- `docs/plans/2026-04-03-opencode-a2a-plugin-relay-implementation-plan.md` — implementation plan used to drive the current design

## Current architecture

- **Public contract:** A2A over HTTP JSON-RPC and SSE
- **Runtime shape:** plugin-first; the plugin owns host bootstrap and session bridge logic
- **Delivery gate:** `session.status` is the primary scheduling signal
- **Persistence:** SQLite-backed task, audit, and session-link stores
- **Operations surface:** internal MCP only, not the public agent-to-agent interface

## Implemented capabilities

- Agent Card exposure
- `sendMessage`, `getTask`, `cancelTask`, `sendMessageStream`
- SSE task event streaming
- idle-gated dispatch into OpenCode sessions
- duplicate suppression, human takeover guard, replay path, and audit trail
- public response/event sanitization for task metadata

## Get the code

```bash
git clone https://github.com/FengYunCalm/opencode-peer-session-relay.git
cd opencode-peer-session-relay
```

This README is intentionally source-oriented. It does not claim any npm package, hosted deployment, or public release channel.

## License

MIT
