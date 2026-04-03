import type { RelayOpsMcp } from "../server.js";

export function createRelayReplayTool(server: RelayOpsMcp) {
  return {
    name: "relay-replay",
    execute(taskId: string) {
      return server.replayTask(taskId);
    }
  };
}
