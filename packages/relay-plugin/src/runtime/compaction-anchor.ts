import type { RelayPluginState } from "./plugin-state.js";

export function buildCompactionContext(state: RelayPluginState, sessionID: string): string[] {
  const activeSessions = state.sessionRegistry
    .entries()
    .map((entry) => `- ${entry.sessionID}: ${entry.status?.type ?? "unknown"}`);

  return [
    "## Relay Context",
    `Tracked session: ${sessionID}`,
    `A2A host: ${state.host.url ?? "not-started"}`,
    `Known sessions: ${activeSessions.length === 0 ? "none" : activeSessions.join("; ")}`
  ];
}
