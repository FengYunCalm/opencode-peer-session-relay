import type { RelayPluginState } from "./plugin-state.js";

const pluginStateByProject = new Map<string, RelayPluginState>();

export function registerRelayPluginState(projectID: string, state: RelayPluginState): void {
  pluginStateByProject.set(projectID, state);
}

export function readRelayPluginState(projectID: string): RelayPluginState | undefined {
  return pluginStateByProject.get(projectID);
}

export function deleteRelayPluginState(projectID: string): void {
  pluginStateByProject.delete(projectID);
}
