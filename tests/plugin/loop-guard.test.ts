import { describe, expect, it } from "vitest";

import { LoopGuard } from "@opencode-peer-session-relay/relay-plugin";

describe("loop guard", () => {
  it("suppresses duplicates inside the configured window", () => {
    const guard = new LoopGuard(1000);

    const first = guard.remember("session-1:msg-1", "task-1", 1000);
    const second = guard.remember("session-1:msg-1", "task-2", 1500);
    const third = guard.remember("session-1:msg-1", "task-3", 2501);

    expect(first.duplicate).toBe(false);
    expect(second).toEqual({ duplicate: true, existingTaskId: "task-1" });
    expect(third.duplicate).toBe(false);
  });
});
