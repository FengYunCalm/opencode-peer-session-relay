# Contributing

## Repository scope

This repository maintains the OpenCode A2A relay, including the public A2A contract, plugin runtime, persistence behavior, and supporting docs.

Changes that fit here:

- relay protocol and plugin behavior
- persistence, replay, room, thread, and workflow handling
- tests, docs, and graphify assets that explain the current design

Changes that do not fit here:

- unrelated OpenCode core changes better handled in `OpenCode-source`
- private operator secrets or environment-specific credentials
- changes that bypass the documented plugin-first architecture without clear justification

## Pull request expectations

- Keep changes focused.
- Explain whether the change affects the public A2A surface, internal MCP operations, persistence, or docs only.
- Update README or `docs/` when the public contract or operator workflow changes.
- Respect the repo's committed `graphify-out/` knowledge base workflow.

## Verification

Run the current repository checks before opening a pull request:

```bash
corepack pnpm test
corepack pnpm exec tsc -b --pretty false
```
