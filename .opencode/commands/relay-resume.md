---
description: Resume automated relay delivery for a paused session
---
Use the internal relay ops surface for this repository.

- Treat the first argument as the target `sessionID`.
- Call `relay-resume`.
- Then call `relay-status` to confirm the current paused-session state before reporting back.

If no session ID was provided, ask only for the session ID.
