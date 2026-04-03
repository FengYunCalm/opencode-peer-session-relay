import { describe, expect, it } from "vitest";

import {
  extensionDeclarationSchema,
  messageSchema,
  partSchema,
  taskArtifactUpdateEventSchema,
  taskSchema,
  taskStatusUpdateEventSchema
} from "@opencode-peer-session-relay/a2a-protocol";

describe("task and message models", () => {
  it("validates text, data, and url parts", () => {
    expect(partSchema.safeParse({ text: "hello", metadata: {} }).success).toBe(true);
    expect(partSchema.safeParse({ data: { ok: true }, metadata: {} }).success).toBe(true);
    expect(partSchema.safeParse({ url: "https://example.com/file.txt", mediaType: "text/plain", metadata: {} }).success).toBe(true);
  });

  it("distinguishes message and task responses", () => {
    const message = messageSchema.parse({
      messageId: "msg_1",
      role: "agent",
      parts: [{ text: "done", metadata: {} }],
      metadata: {}
    });

    const task = taskSchema.parse({
      taskId: "task_1",
      status: "working",
      history: [message],
      metadata: {}
    });

    expect(message.kind).toBe("message");
    expect(task.kind).toBe("task");
  });

  it("validates task lifecycle event shapes", () => {
    const statusEvent = taskStatusUpdateEventSchema.parse({
      type: "task-status-update",
      taskId: "task_1",
      status: "completed",
      metadata: {}
    });

    const artifactEvent = taskArtifactUpdateEventSchema.parse({
      type: "task-artifact-update",
      taskId: "task_1",
      artifact: {
        artifactId: "artifact_1",
        name: "final-answer",
        parts: [{ text: "hello", metadata: {} }],
        metadata: {}
      },
      metadata: {}
    });

    expect(statusEvent.status).toBe("completed");
    expect(artifactEvent.artifact.name).toBe("final-answer");
  });

  it("validates extension declarations", () => {
    const extension = extensionDeclarationSchema.parse({
      uri: "https://opencode.ai/extensions/human-takeover",
      description: "Declares human takeover support",
      required: true
    });

    expect(extension.required).toBe(true);
  });
});
