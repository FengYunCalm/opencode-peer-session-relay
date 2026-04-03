import type { RelayPluginConfig } from "../config.js";
import type { A2ARelayHost } from "../a2a/host.js";
import type { RelayRuntime } from "./relay-runtime.js";
import type { SessionRegistry } from "./session-registry.js";

export type RelayPluginState = {
  config: RelayPluginConfig;
  host: A2ARelayHost;
  runtime: RelayRuntime;
  sessionRegistry: SessionRegistry;
  startedAt: number;
};

export function createRelayPluginState(config: RelayPluginConfig, host: A2ARelayHost, runtime: RelayRuntime): RelayPluginState {
  return {
    config,
    host,
    runtime,
    sessionRegistry: runtime.sessionRegistry,
    startedAt: Date.now()
  };
}
