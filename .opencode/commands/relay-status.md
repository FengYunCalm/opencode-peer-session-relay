---
description: Inspect relay operator status and recent diagnostics
---
Use the internal relay ops surface for this repository.

- If `$ARGUMENTS` contains a task ID, pass it to `relay-status`.
- Otherwise inspect the overall relay state.
- If the result shows paused sessions, recent failures, or the user asked for more detail, also call `relay-diagnostics`.
- Summarize active tasks, room/thread counts, paused sessions, and any notable recent diagnostics.

This command is for operator visibility. It is not the public A2A contract.
