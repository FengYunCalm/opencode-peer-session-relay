import { afterEach, describe, expect, it, vi } from "vitest";
import type { PluginInput } from "@opencode-ai/plugin";

import { RelayPlugin, getRelayPluginStateForTest, stopRelayPlugin } from "../support/relay-plugin-testkit.js";
import { cleanupDatabaseLocation, createTestDatabaseLocation } from "./test-db.js";

const dbLocations: string[] = [];

function createPluginInput(projectID = "project-room-tools", promptAsync = vi.fn().mockResolvedValue({ data: true })): PluginInput {
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
  await stopRelayPlugin("project-room-tools");
  dbLocations.splice(0).forEach(cleanupDatabaseLocation);
});

describe("relay room tools", () => {
  it("keeps the old private room flow unchanged", async () => {
    const databasePath = createTestDatabaseLocation("room-tools-private");
    dbLocations.push(databasePath);
    const hooks = await RelayPlugin(createPluginInput(), {
      a2a: { port: 0 },
      routing: { mode: "pair" },
      runtime: { databasePath }
    });

    const created = await hooks.tool?.relay_room_create.execute({}, {
      sessionID: "session-a",
      messageID: "message-a",
      agent: "build",
      directory: "C:/relay-project",
      worktree: "C:/relay-project",
      abort: new AbortController().signal,
      metadata: () => {},
      ask: async () => {}
    });

    expect(created).toContain("Room kind: private");
    const roomCode = created?.match(/Room code: (\d{6})/)?.[1];

    const joined = await hooks.tool?.relay_room_join.execute({ roomCode: roomCode! }, {
      sessionID: "session-b",
      messageID: "message-b",
      agent: "build",
      directory: "C:/relay-project",
      worktree: "C:/relay-project",
      abort: new AbortController().signal,
      metadata: () => {},
      ask: async () => {}
    });

    expect(joined).toContain("Joined room");
    const state = getRelayPluginStateForTest("project-room-tools")!;
    const room = state.runtime.roomStore.getRoomBySession("session-a")!;
    expect(room.kind).toBe("private");
    expect(state.runtime.roomStore.areSessionsPaired("session-a", "session-b")).toBe(true);
  });

  it("creates a group room, joins with alias, and can broadcast or direct-message a member", async () => {
    const databasePath = createTestDatabaseLocation("room-tools-group");
    dbLocations.push(databasePath);
    const promptAsync = vi.fn().mockResolvedValue({ data: true });
    const hooks = await RelayPlugin(createPluginInput("project-room-tools", promptAsync), {
      a2a: { port: 0 },
      routing: { mode: "pair" },
      runtime: { databasePath }
    });

    await hooks.event?.({ event: { type: "session.status", properties: { sessionID: "session-b", status: { type: "idle" } } } as never });
    await hooks.event?.({ event: { type: "session.status", properties: { sessionID: "session-c", status: { type: "idle" } } } as never });

    const created = await hooks.tool?.relay_room_create.execute({ kind: "group" }, {
      sessionID: "session-a",
      messageID: "message-a",
      agent: "build",
      directory: "C:/relay-project",
      worktree: "C:/relay-project",
      abort: new AbortController().signal,
      metadata: () => {},
      ask: async () => {}
    });
    expect(created).toContain("Room kind: group");
    const roomCode = created?.match(/Room code: (\d{6})/)?.[1]!;

    const joinedB = await hooks.tool?.relay_room_join.execute({ roomCode, alias: "alpha" }, {
      sessionID: "session-b",
      messageID: "message-b",
      agent: "build",
      directory: "C:/relay-project",
      worktree: "C:/relay-project",
      abort: new AbortController().signal,
      metadata: () => {},
      ask: async () => {}
    });
    const joinedC = await hooks.tool?.relay_room_join.execute({ roomCode, alias: "beta" }, {
      sessionID: "session-c",
      messageID: "message-c",
      agent: "build",
      directory: "C:/relay-project",
      worktree: "C:/relay-project",
      abort: new AbortController().signal,
      metadata: () => {},
      ask: async () => {}
    });

    expect(joinedB).toContain("Alias: alpha");
    expect(joinedC).toContain("Alias: beta");

    const members = await hooks.tool?.relay_room_members.execute({}, {
      sessionID: "session-a",
      messageID: "message-d",
      agent: "build",
      directory: "C:/relay-project",
      worktree: "C:/relay-project",
      abort: new AbortController().signal,
      metadata: () => {},
      ask: async () => {}
    });
    expect(members).toContain("alpha");
    expect(members).toContain("beta");

    const broadcast = await hooks.tool?.relay_room_send.execute({ message: "all-hands update" }, {
      sessionID: "session-a",
      messageID: "message-e",
      agent: "build",
      directory: "C:/relay-project",
      worktree: "C:/relay-project",
      abort: new AbortController().signal,
      metadata: () => {},
      ask: async () => {}
    });
    expect(broadcast).toContain("Sent to peer session: group");
    expect(promptAsync).toHaveBeenCalledTimes(2);

    const direct = await hooks.tool?.relay_room_send.execute({ message: "private task", targetAlias: "alpha" }, {
      sessionID: "session-a",
      messageID: "message-f",
      agent: "build",
      directory: "C:/relay-project",
      worktree: "C:/relay-project",
      abort: new AbortController().signal,
      metadata: () => {},
      ask: async () => {}
    });
    expect(direct).toContain("Target alias: alpha");
  });
});
