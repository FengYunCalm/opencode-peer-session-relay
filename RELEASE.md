# Release Policy

## Release shape

This repository is source-oriented. A release is a tagged source snapshot with a documented public contract, not a hosted service or package claim.

## Versioning

- Use tags only when the public A2A contract and plugin behavior are stable for that snapshot.
- Keep the release notes aligned with README and docs updates.

## Before release

- Run the repository test suite and TypeScript build.
- Refresh `graphify-out/` if code or docs changed in ways that affect the knowledge base.
- Confirm that the plugin-first architecture and the compatibility-only MCP path are still accurately documented.

## Notes

- Do not present the repo as an npm package or hosted deployment unless that is explicitly added later.
- Release notes should call out any cross-session, persistence, or workflow behavior changes.
