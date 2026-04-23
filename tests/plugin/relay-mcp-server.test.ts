import { afterEach, describe, expect, it } from "vitest";

import { createRelayBridgeMcpServer, resolveCompatDatabasePath, standaloneCompatToolNames } from "../support/relay-plugin-testkit.js";

const originalRelayMcpDatabasePath = process.env.RELAY_MCP_DATABASE_PATH;
const originalRelayDatabasePath = process.env.RELAY_DATABASE_PATH;
const originalXdgConfigHome = process.env.XDG_CONFIG_HOME;

function restoreEnv(key: string, value: string | undefined): void {
  if (value === undefined) {
    delete process.env[key];
    return;
  }

  process.env[key] = value;
}

afterEach(() => {
  restoreEnv("RELAY_MCP_DATABASE_PATH", originalRelayMcpDatabasePath);
  restoreEnv("RELAY_DATABASE_PATH", originalRelayDatabasePath);
  restoreEnv("XDG_CONFIG_HOME", originalXdgConfigHome);
});

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

  it("resolves the compat database path from env before falling back to config home", () => {
    process.env.RELAY_MCP_DATABASE_PATH = "/tmp/relay-mcp.sqlite";
    process.env.RELAY_DATABASE_PATH = "/tmp/relay.sqlite";
    process.env.XDG_CONFIG_HOME = "/tmp/opencode-config";

    expect(resolveCompatDatabasePath()).toBe("/tmp/relay-mcp.sqlite");

    delete process.env.RELAY_MCP_DATABASE_PATH;
    expect(resolveCompatDatabasePath()).toBe("/tmp/relay.sqlite");

    delete process.env.RELAY_DATABASE_PATH;
    expect(resolveCompatDatabasePath()).toBe("/tmp/opencode-config/opencode/plugins/opencode-a2a-relay.sqlite");
  });
});
