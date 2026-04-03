import type { RelayOpsMcp } from "../server.js";

export function createTaskResource(server: RelayOpsMcp) {
  return {
    name: "relay-task",
    read(taskId: string) {
      return server.readTaskResource(taskId);
    }
  };
}
