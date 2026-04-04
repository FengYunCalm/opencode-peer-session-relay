import { afterEach, describe, expect, it, vi } from "vitest";
import type { PluginInput } from "@opencode-ai/plugin";

import { RelayPlugin, stopRelayPlugin } from "../support/relay-plugin-testkit.js";
import { cleanupDatabaseLocation, createTestDatabaseLocation } from "./test-db.js";

const dbLocations: string[] = [];

function createPluginInput(projectID = "project-message-tools"): PluginInput {
  return {
    client: {
      session: {
        prompt: vi.fn().mockResolvedValue({ data: true }),
        promptAsync: vi.fn().mockResolvedValue({ data: true })
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
  await stopRelayPlugin("project-message-tools");
  dbLocations.splice(0).forEach(cleanupDatabaseLocation);
});

describe("relay message tools", () => {
  it("exposes room/thread/message/transcript tools on the plugin hook surface", async () => {
    const databasePath = createTestDatabaseLocation("message-tools");
    dbLocations.push(databasePath);

    const hooks = await RelayPlugin(createPluginInput(), {
      a2a: { port: 0 },
      routing: { mode: "pair" },
      runtime: { databasePath }
    });

    expect(Object.keys(hooks.tool ?? {}).sort()).toEqual([
      "relay_message_list",
      "relay_message_mark_read",
      "relay_message_send",
      "relay_room_create",
      "relay_room_join",
      "relay_room_members",
      "relay_room_send",
      "relay_room_set_role",
      "relay_room_status",
      "relay_thread_create",
      "relay_thread_list",
      "relay_transcript_export"
    ]);
  });
});
