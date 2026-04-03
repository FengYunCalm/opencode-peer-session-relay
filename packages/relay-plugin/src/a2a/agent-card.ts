import { agentCardSchema, type AgentCard } from "@opencode-peer-session-relay/a2a-protocol";

import type { RelayPluginConfig } from "../config.js";

export type AgentCardBuildInput = {
  config: RelayPluginConfig;
  version?: string;
  name?: string;
  description?: string;
  url?: string;
};

export function buildRelayAgentCard(input: AgentCardBuildInput): AgentCard {
  const {
    config,
    version = "0.1.0",
    name = "OpenCode A2A Relay",
    description = "Bridges A2A requests into OpenCode sessions",
    url = `http://${config.a2a.host}:${config.a2a.port}${config.a2a.basePath}`
  } = input;

  return agentCardSchema.parse({
    protocolVersion: "1.0",
    name,
    description,
    version,
    url,
    preferredTransport: "http+jsonrpc",
    defaultInputModes: ["text/plain", "application/json"],
    defaultOutputModes: ["text/plain", "application/json"],
    capabilities: {
      streaming: true,
      pushNotifications: false,
      stateTransitionHistory: true,
      humanTakeover: true
    },
    skills: [
      {
        id: "relay-session-bridge",
        name: "Relay Session Bridge",
        description: "Dispatches A2A tasks into OpenCode sessions",
        tags: ["relay", "opencode", "a2a"]
      }
    ],
    securitySchemes: [{ type: "noauth" }],
    extensions: [
      {
        uri: "https://opencode.ai/extensions/human-takeover",
        description: "Marks that human takeover pauses automated continuation",
        required: false
      }
    ]
  });
}
