import type { RelayPluginConfig } from "../config.js";
import type { RelayRuntime } from "../runtime/relay-runtime.js";
import { A2ARelayHost } from "./host.js";

export function createRelayA2AHost(config: RelayPluginConfig["a2a"], runtime: RelayRuntime, projectID: string): A2ARelayHost {
  let host: A2ARelayHost;
  host = new A2ARelayHost(config, {
    readiness: () => ({ ok: true, detail: "relay plugin runtime booted" }),
    health: () => ({
      projectID,
      startedAt: new Date().toISOString(),
      activeTaskCount: runtime.taskStore.listActiveTasks().length
    }),
    agentCard: () => runtime.buildAgentCard(host.url),
    rpc: async (payload) => runtime.handleJsonRpc(payload)
  });

  return host;
}
