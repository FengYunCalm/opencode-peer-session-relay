import { describe, expect, it } from "vitest";

import { agentCardSchema, parseAgentCard } from "@opencode-peer-session-relay/a2a-protocol";

describe("agent card schema", () => {
  it("parses a valid agent card", () => {
    const card = parseAgentCard({
      protocolVersion: "1.0",
      name: "OpenCode Relay",
      description: "Bridges A2A requests into OpenCode sessions",
      version: "0.1.0",
      url: "http://127.0.0.1:7331/a2a",
      defaultInputModes: ["text/plain"],
      defaultOutputModes: ["text/plain", "application/json"],
      capabilities: {
        streaming: true,
        pushNotifications: false,
        stateTransitionHistory: true,
        humanTakeover: true
      },
      skills: [
        {
          id: "relay",
          name: "Peer relay",
          description: "Routes requests into OpenCode sessions"
        }
      ],
      securitySchemes: [{ type: "noauth" }],
      extensions: [
        {
          uri: "https://opencode.ai/extensions/human-takeover",
          description: "Human takeover semantics",
          required: false
        }
      ]
    });

    expect(card.protocolVersion).toBe("1.0");
    expect(card.capabilities.streaming).toBe(true);
  });

  it("rejects an invalid agent card", () => {
    const result = agentCardSchema.safeParse({
      protocolVersion: "1.0",
      name: "Broken card",
      description: "Missing url and security",
      version: "0.1.0",
      defaultInputModes: ["text/plain"],
      defaultOutputModes: ["text/plain"],
      capabilities: {
        streaming: true,
        pushNotifications: false,
        stateTransitionHistory: true,
        humanTakeover: false
      },
      securitySchemes: []
    });

    expect(result.success).toBe(false);
  });
});
