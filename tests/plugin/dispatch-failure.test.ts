import { afterEach, describe, expect, it, vi } from "vitest";
import type { PluginInput } from "@opencode-ai/plugin";

import {
  RelayPlugin,
  getRelayPluginStateForTest,
  stopRelayPlugin
} from "../support/relay-plugin-testkit.js";
import { cleanupDatabaseLocation, createTestDatabaseLocation } from "./test-db.js";

const dbLocations: string[] = [];

function createPluginInput(projectID: string, promptAsync: ReturnType<typeof vi.fn>): PluginInput {
  return {
    client: {
      session: {
        prompt: vi.fn().mockResolvedValue({ data: true }),
        promptAsync
      }
    } as unknown as PluginInput["client"],
    project: {
      id: projectID,
      worktree: "C:/relay-project",
      time: { created: Date.now() }
    } as PluginInput["project"],
    directory: "C:/relay-project",
    worktree: "C:/relay-project",
    serverUrl: new URL("http://127.0.0.1:4096"),
    $: {} as PluginInput["$"]
  };
}

afterEach(async () => {
  await stopRelayPlugin("project-dispatch-failure");
  dbLocations.splice(0).forEach(cleanupDatabaseLocation);
});

describe("dispatch failure path", () => {
  it("fails without leaving accepted link state when prompt submission throws", async () => {
    const databasePath = createTestDatabaseLocation("dispatch-failure");
    dbLocations.push(databasePath);
    const promptAsync = vi.fn().mockRejectedValue(new Error("submit failed"));
    const hooks = await RelayPlugin(createPluginInput("project-dispatch-failure", promptAsync), {
      a2a: { port: 0 },
      runtime: { databasePath }
    });

    await hooks.event?.({
      event: {
        type: "session.status",
        properties: {
          sessionID: "session-1",
          status: { type: "idle" }
        }
      } as never
    });

    const response = await fetch(getRelayPluginStateForTest("project-dispatch-failure")!.host.url!, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: "req-fail",
        method: "sendMessage",
        params: {
          sessionID: "session-1",
          message: {
            messageId: "msg-fail-1",
            role: "user",
            parts: [{ text: "please fail", metadata: {} }],
            metadata: {}
          }
        }
      })
    });
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body.error.message).toContain("submit failed");

    const state = getRelayPluginStateForTest("project-dispatch-failure")!;
    const task = state.runtime.taskStore.getTaskByDedupeKey("unknown-source->session-1:msg-fail-1");
    expect(task?.status).toBe("failed");
    expect(state.runtime.sessionLinkStore.getSessionID(task!.taskId)).toBeUndefined();
    expect(state.runtime.auditStore.list(task!.taskId).map((event) => event.eventType)).not.toContain("task.accepted");
  });
});
