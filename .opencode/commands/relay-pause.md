---
description: Pause automated relay delivery for a session
---
Use the internal relay ops surface for this repository.

- Treat the first argument as the target `sessionID`.
- Treat any remaining text as the optional reason.
- Call `relay-pause`.
- Then call `relay-status` to confirm the paused state before reporting back.

If no session ID was provided, ask only for the session ID and optional reason.
