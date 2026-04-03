import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import type { AuditStore } from "../store/audit-store.js";
import type { TaskStore } from "../store/task-store.js";

export type RelayOpsHandlers = {
  getStatus?: (taskId?: string) => {
    activeTaskCount: number;
    task?: unknown;
  };
  replayTask: (taskId: string) => Promise<unknown> | unknown;
  readTaskResource?: (taskId: string) => {
    uri: string;
    mimeType: string;
    text: string;
  };
};

export type RelayOpsMcp = {
  server: McpServer;
  toolNames: string[];
  readTaskResource(taskId: string): {
    uri: string;
    mimeType: string;
    text: string;
  };
  getStatus(taskId?: string): {
    activeTaskCount: number;
    task?: unknown;
  };
  replayTask(taskId: string): Promise<unknown> | unknown;
};

export function createRelayOpsMcpServer(taskStore: TaskStore, auditStore: AuditStore, handlers: RelayOpsHandlers): RelayOpsMcp {
  const server = new McpServer({
    name: "relay-ops",
    version: "0.1.0"
  });

  const getStatus = handlers.getStatus ?? ((taskId?: string) => ({
    activeTaskCount: taskStore.listActiveTasks().length,
    task: taskId ? taskStore.getTask(taskId) : undefined
  }));

  const readTaskResource = handlers.readTaskResource ?? ((taskId: string) => ({
    uri: `relay://task/${taskId}`,
    mimeType: "application/json",
    text: JSON.stringify(
      {
        task: taskStore.getTask(taskId),
        audit: auditStore.list(taskId)
      },
      null,
      2
    )
  }));

  const replayTask = (taskId: string) => handlers.replayTask(taskId);

  server.registerTool(
    "relay-status",
    {
      description: "Read relay task status",
      inputSchema: { taskId: z.string().optional() }
    },
    async ({ taskId }) => ({
      content: [
        {
          type: "text",
          text: JSON.stringify(getStatus(taskId), null, 2)
        }
      ]
    }) as never
  );

  server.registerTool(
    "relay-replay",
    {
      description: "Replay a recoverable relay task",
      inputSchema: { taskId: z.string() }
    },
    async ({ taskId }) => ({
      content: [
        {
          type: "text",
          text: JSON.stringify(await replayTask(taskId), null, 2)
        }
      ]
    }) as never
  );

  server.resource("relay-task", "relay://task", async () => ({
    contents: [
      {
        uri: "relay://task",
        mimeType: "application/json",
        text: JSON.stringify(taskStore.listActiveTasks(), null, 2)
      }
    ]
  }));

  return {
    server,
    toolNames: ["relay-status", "relay-replay"],
    readTaskResource,
    getStatus,
    replayTask
  };
}
