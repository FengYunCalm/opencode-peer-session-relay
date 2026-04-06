import { describe, expect, it } from "vitest";

import { createRelayBridgeMcpServer, standaloneCompatToolNames } from "../support/relay-plugin-testkit.js";

describe("relay MCP server entry", () => {
  it("creates a stdio MCP server bridge instance", () => {
    const server = createRelayBridgeMcpServer();
    expect(server).toBeDefined();
    expect(typeof server.connect).toBe("function");
    expect(typeof server.close).toBe("function");
  });

  it("uses compat-prefixed tool names to avoid colliding with plugin relay tools", () => {
    expect(standaloneCompatToolNames).toEqual([
      "compat_room_create",
      "compat_room_join",
      "compat_room_status",
      "compat_room_send",
      "compat_room_members",
      "compat_room_set_role",
      "compat_thread_create",
      "compat_thread_list",
      "compat_message_list",
      "compat_message_send",
      "compat_message_mark_read",
      "compat_transcript_export"
    ]);
  });
});
