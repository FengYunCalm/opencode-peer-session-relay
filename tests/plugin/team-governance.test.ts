import { afterEach, describe, expect, it, vi } from "vitest";
import type { PluginInput } from "@opencode-ai/plugin";

import { RelayPlugin, getRelayPluginStateForTest, stopRelayPlugin } from "../support/relay-plugin-testkit.js";
import { cleanupDatabaseLocation, createTestDatabaseLocation } from "./test-db.js";

const dbLocations: string[] = [];

function createPluginInput(projectID = "project-governance", promptAsync = vi.fn().mockResolvedValue({ data: true })): PluginInput {
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
  await stopRelayPlugin("project-governance");
  dbLocations.splice(0).forEach(cleanupDatabaseLocation);
});

describe("team governance", () => {
  it("creates default room-main and owner-member direct threads for group rooms", async () => {
    const databasePath = createTestDatabaseLocation("governance-default-threads");
    dbLocations.push(databasePath);
    const hooks = await RelayPlugin(createPluginInput(), {
      a2a: { port: 0 },
      routing: { mode: "pair" },
      runtime: { databasePath }
    });

    const created = await hooks.tool?.relay_room_create.execute({ kind: "group" }, {
      sessionID: "owner",
      messageID: "m1",
      agent: "build",
      directory: "C:/relay-project",
      worktree: "C:/relay-project",
      abort: new AbortController().signal,
      metadata: () => {},
      ask: async () => {}
    });
    const roomCode = created?.match(/Room code: (\d{6})/)?.[1]!;

    await hooks.tool?.relay_room_join.execute({ roomCode, alias: "alpha" }, {
      sessionID: "member-a",
      messageID: "m2",
      agent: "build",
      directory: "C:/relay-project",
      worktree: "C:/relay-project",
      abort: new AbortController().signal,
      metadata: () => {},
      ask: async () => {}
    });

    const state = getRelayPluginStateForTest("project-governance")!;
    const threads = state.runtime.threadStore.listThreadsForRoom(roomCode);
    expect(threads.some((thread) => thread.kind === "group" && thread.title === "room-main")).toBe(true);
    expect(threads.some((thread) => thread.kind === "direct")).toBe(true);
  });

  it("allows only the room owner to create group threads and set roles", async () => {
    const databasePath = createTestDatabaseLocation("governance-acl");
    dbLocations.push(databasePath);
    const hooks = await RelayPlugin(createPluginInput(), {
      a2a: { port: 0 },
      routing: { mode: "pair" },
      runtime: { databasePath }
    });

    const created = await hooks.tool?.relay_room_create.execute({ kind: "group" }, {
      sessionID: "owner",
      messageID: "m1",
      agent: "build",
      directory: "C:/relay-project",
      worktree: "C:/relay-project",
      abort: new AbortController().signal,
      metadata: () => {},
      ask: async () => {}
    });
    const roomCode = created?.match(/Room code: (\d{6})/)?.[1]!;

    await hooks.tool?.relay_room_join.execute({ roomCode, alias: "alpha" }, {
      sessionID: "member-a",
      messageID: "m2",
      agent: "build",
      directory: "C:/relay-project",
      worktree: "C:/relay-project",
      abort: new AbortController().signal,
      metadata: () => {},
      ask: async () => {}
    });

    await expect(hooks.tool?.relay_thread_create.execute({ kind: "group", participantSessionIDs: "owner,member-a", title: "illegal" }, {
      sessionID: "member-a",
      messageID: "m3",
      agent: "build",
      directory: "C:/relay-project",
      worktree: "C:/relay-project",
      abort: new AbortController().signal,
      metadata: () => {},
      ask: async () => {}
    })).rejects.toThrow(/Only the room owner can create group threads/);

    const updated = await hooks.tool?.relay_room_set_role.execute({ targetSessionID: "member-a", role: "observer" }, {
      sessionID: "owner",
      messageID: "m4",
      agent: "build",
      directory: "C:/relay-project",
      worktree: "C:/relay-project",
      abort: new AbortController().signal,
      metadata: () => {},
      ask: async () => {}
    });
    expect(updated).toContain("observer");

    await expect(hooks.tool?.relay_room_set_role.execute({ targetSessionID: "owner", role: "member" }, {
      sessionID: "member-a",
      messageID: "m5",
      agent: "build",
      directory: "C:/relay-project",
      worktree: "C:/relay-project",
      abort: new AbortController().signal,
      metadata: () => {},
      ask: async () => {}
    })).rejects.toThrow(/Only the room owner can change member roles/);
  });

  it("prevents observers from sending thread messages", async () => {
    const databasePath = createTestDatabaseLocation("governance-observer");
    dbLocations.push(databasePath);
    const hooks = await RelayPlugin(createPluginInput(), {
      a2a: { port: 0 },
      routing: { mode: "pair" },
      runtime: { databasePath }
    });

    const created = await hooks.tool?.relay_room_create.execute({ kind: "group" }, {
      sessionID: "owner",
      messageID: "m1",
      agent: "build",
      directory: "C:/relay-project",
      worktree: "C:/relay-project",
      abort: new AbortController().signal,
      metadata: () => {},
      ask: async () => {}
    });
    const roomCode = created?.match(/Room code: (\d{6})/)?.[1]!;

    await hooks.tool?.relay_room_join.execute({ roomCode, alias: "alpha" }, {
      sessionID: "member-a",
      messageID: "m2",
      agent: "build",
      directory: "C:/relay-project",
      worktree: "C:/relay-project",
      abort: new AbortController().signal,
      metadata: () => {},
      ask: async () => {}
    });

    await hooks.tool?.relay_room_set_role.execute({ targetSessionID: "member-a", role: "observer" }, {
      sessionID: "owner",
      messageID: "m3",
      agent: "build",
      directory: "C:/relay-project",
      worktree: "C:/relay-project",
      abort: new AbortController().signal,
      metadata: () => {},
      ask: async () => {}
    });

    const threads = JSON.parse(await hooks.tool?.relay_thread_list.execute({ scope: "room" }, {
      sessionID: "owner",
      messageID: "m4",
      agent: "build",
      directory: "C:/relay-project",
      worktree: "C:/relay-project",
      abort: new AbortController().signal,
      metadata: () => {},
      ask: async () => {}
    }) as string) as Array<{ threadId: string; kind: string }>;
    const directThread = threads.find((thread) => thread.kind === "direct");

    await expect(hooks.tool?.relay_message_send.execute({ threadId: directThread!.threadId, message: "observer message" }, {
      sessionID: "member-a",
      messageID: "m5",
      agent: "build",
      directory: "C:/relay-project",
      worktree: "C:/relay-project",
      abort: new AbortController().signal,
      metadata: () => {},
      ask: async () => {}
    })).rejects.toThrow(/not allowed to send messages/);
  });
});
