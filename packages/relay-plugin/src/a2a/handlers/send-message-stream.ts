import type { JsonRpcRequest } from "@opencode-peer-session-relay/a2a-protocol";

import type { TaskEventHub } from "../mapper/outbound-events.js";
import { createSendMessageHandler, type SendMessageDependencies } from "./send-message.js";

function isTerminalStatus(status: string): boolean {
  return ["completed", "failed", "canceled"].includes(status);
}

function emptyEventStream(): AsyncIterable<never> {
  return {
    async *[Symbol.asyncIterator]() {}
  };
}

export function createSendMessageStreamHandler(dependencies: SendMessageDependencies, eventHub: TaskEventHub) {
  const sendMessage = createSendMessageHandler(dependencies);

  return async (request: JsonRpcRequest) => {
    const taskId = `task-stream-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const provisionalEvents = eventHub.stream(taskId);
    const task = await sendMessage(request, taskId);

    if (task.taskId === taskId) {
      return {
        task,
        events: provisionalEvents
      };
    }

    await provisionalEvents[Symbol.asyncIterator]().return?.();

    return {
      task,
      events: isTerminalStatus(task.status) ? emptyEventStream() : eventHub.stream(task.taskId)
    };
  };
}
