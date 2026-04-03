import { readRelayPluginState } from "../../runtime/plugin-instance-registry.js";

export function getRelayPluginStateForTest(projectID: string) {
  return readRelayPluginState(projectID);
}
