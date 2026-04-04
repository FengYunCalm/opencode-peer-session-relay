import { describe, expect, it } from "vitest";

import { buildTaskRelayPrompt, buildThreadRelayPrompt } from "../support/relay-plugin-testkit.js";

describe("relay prompt preamble", () => {
  it("builds a task relay prompt with fixed agent-awareness preamble", () => {
    const prompt = buildTaskRelayPrompt({
      sourceSessionID: "session-a",
      taskId: "task-1",
      contextId: "ctx-1",
      content: "Implement feature X"
    });

    expect(prompt).toContain("[AGENT RELAY MESSAGE]");
    expect(prompt).toContain("The sender is another agent, not a human user.");
    expect(prompt).toContain("Task ID: task-1");
    expect(prompt).toContain("Implement feature X");
  });

  it("builds a thread relay prompt with room and thread context", () => {
    const prompt = buildThreadRelayPrompt({
      roomCode: "123456",
      recipientSessionID: "session-b",
      thread: {
        threadId: "thread-1",
        roomCode: "123456",
        kind: "group",
        title: "team-main",
        createdBySessionID: "session-owner",
        createdAt: 1,
        updatedAt: 1
      },
      messages: [
        {
          threadId: "thread-1",
          seq: 1,
          messageId: "relaymsg-1",
          senderSessionID: "session-a",
          messageType: "relay",
          body: { text: "hello group" },
          createdAt: 1
        }
      ],
      senderRoles: {
        "session-a": "member"
      }
    });

    expect(prompt).toContain("Thread Kind: group");
    expect(prompt).toContain("sender_role=member");
    expect(prompt).toContain("hello group");
  });
});
