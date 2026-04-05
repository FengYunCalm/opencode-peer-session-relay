import { describe, expect, it } from "vitest";

import { createRelayBridgeMcpServer } from "../support/relay-plugin-testkit.js";

describe("relay MCP server entry", () => {
  it("creates a stdio MCP server bridge instance", () => {
    const server = createRelayBridgeMcpServer();
    expect(server).toBeDefined();
    expect(typeof server.connect).toBe("function");
    expect(typeof server.close).toBe("function");
  });
});
