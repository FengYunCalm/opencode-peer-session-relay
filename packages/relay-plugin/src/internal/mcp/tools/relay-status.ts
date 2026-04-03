import type { RelayOpsMcp } from "../server.js";

export function createRelayStatusTool(server: RelayOpsMcp) {
  return {
    name: "relay-status",
    execute(taskId?: string) {
      return server.getStatus(taskId);
    }
  };
}
