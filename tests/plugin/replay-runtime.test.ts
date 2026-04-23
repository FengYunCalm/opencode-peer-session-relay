import { afterEach, describe, expect, it, vi } from "vitest";
import type { PluginInput } from "@opencode-ai/plugin";

import {
  RelayPlugin,
  getRelayPluginStateForTest,
  stopRelayPlugin
} from "../support/relay-plugin-testkit.js";

import { cleanupDatabaseLocation, createTestDatabaseLocation } from "./test-db.js";

const dbLocations: string[] = [];

function createPluginInput(projectID: string, promptAsync = vi.fn().mockResolvedValue({ data: true })): PluginInput {
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
      time: {
        created: Date.now()
      }
    } as PluginInput["project"],
    directory: "C:/relay-project",
    worktree: "C:/relay-project",
    serverUrl: new URL("http://127.0.0.1:4096"),
    $: {} as PluginInput["$"]
  };
}

afterEach(async () => {
  await stopRelayPlugin("project-replay-runtime");
  dbLocations.splice(0).forEach(cleanupDatabaseLocation);
});

describe("relay runtime replay", () => {
  it("replays a failed task through the runtime and redispatches on idle session", async () => {
    const databasePath = createTestDatabaseLocation("replay-runtime");
    dbLocations.push(databasePath);
    const promptAsync = vi.fn().mockResolvedValue({ data: true });
    const hooks = await RelayPlugin(createPluginInput("project-replay-runtime", promptAsync), {
      a2a: { port: 0 },
      runtime: { databasePath }
    });

    await hooks.event?.({
      event: {
        type: "session.status",
        properties: {
          sessionID: "session-replay-1",
          status: { type: "idle" }
        }
      } as never
    });

    const state = getRelayPluginStateForTest("project-replay-runtime")!;
    const createdTask = state.runtime.taskStore.createTask({
      taskId: "task-replay-1",
      requestMessage: {
        messageId: "msg-replay-1",
        role: "user",
        parts: [{ text: "redo this", metadata: { internal: true } }],
        metadata: { internal: true }
      },
      status: "failed",
      metadata: { sessionID: "session-replay-1" }
    });
    state.runtime.sessionLinkStore.link(createdTask.taskId, "session-replay-1");

    const replayed = await state.runtime.replayTask(createdTask.taskId);

    expect(replayed?.status).toBe("submitted");
    expect(promptAsync).toHaveBeenCalledTimes(1);
    expect(promptAsync).toHaveBeenCalledWith({
      path: { id: "session-replay-1" },
      body: {
        system: undefined,
        parts: [
          {
            type: "text",
            text: expect.stringContaining("redo this")
          }
        ]
      }
    });

    await hooks.event?.({
      event: {
        type: "session.status",
        properties: {
          sessionID: "session-replay-1",
          status: { type: "busy" }
        }
      } as never
    });

    expect(state.runtime.taskStore.getTask(createdTask.taskId)?.status).toBe("working");
  });

  it("does not redispatch the same submitted task across repeated idle events", async () => {
    const databasePath = createTestDatabaseLocation("replay-runtime-repeated-idle");
    dbLocations.push(databasePath);

    let resolvePrompt: ((value: { data: true }) => void) | undefined;
    const promptAsync = vi.fn().mockImplementation(
      () => new Promise<{ data: true }>((resolve) => {
        resolvePrompt = resolve;
      })
    );

    const hooks = await RelayPlugin(createPluginInput("project-replay-runtime", promptAsync), {
      a2a: { port: 0 },
      runtime: { databasePath }
    });

    const state = getRelayPluginStateForTest("project-replay-runtime")!;
    state.runtime.taskStore.createTask({
      taskId: "task-replay-race",
      requestMessage: {
        messageId: "msg-replay-race",
        role: "user",
        parts: [{ text: "redo this once", metadata: {} }],
        metadata: {}
      },
      status: "submitted",
      metadata: { sessionID: "session-replay-race" }
    });

    const firstIdle = hooks.event?.({
      event: {
        type: "session.status",
        properties: {
          sessionID: "session-replay-race",
          status: { type: "idle" }
        }
      } as never
    });
    const secondIdle = hooks.event?.({
      event: {
        type: "session.status",
        properties: {
          sessionID: "session-replay-race",
          status: { type: "idle" }
        }
      } as never
    });

    await Promise.resolve();
    expect(promptAsync).toHaveBeenCalledTimes(1);

    resolvePrompt?.({ data: true });
    await Promise.all([firstIdle, secondIdle]);

    await hooks.event?.({
      event: {
        type: "session.status",
        properties: {
          sessionID: "session-replay-race",
          status: { type: "idle" }
        }
      } as never
    });

    expect(promptAsync).toHaveBeenCalledTimes(1);

    await hooks.event?.({
      event: {
        type: "session.status",
        properties: {
          sessionID: "session-replay-race",
          status: { type: "busy" }
        }
      } as never
    });

    expect(state.runtime.taskStore.getTask("task-replay-race")?.status).toBe("working");
  });
});
