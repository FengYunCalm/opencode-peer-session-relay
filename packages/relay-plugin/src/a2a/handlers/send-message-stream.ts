import type { JsonRpcRequest } from "@opencode-peer-session-relay/a2a-protocol";

import type { TaskEventHub } from "../mapper/outbound-events.js";
import { createSendMessageHandler, type SendMessageDependencies } from "./send-message.js";

export function createSendMessageStreamHandler(dependencies: SendMessageDependencies, eventHub: TaskEventHub) {
  const sendMessage = createSendMessageHandler(dependencies);

  return async (request: JsonRpcRequest) => {
    const taskId = `task-stream-${Date.now()}-${Math.random().toString(16).slice(2)}`;
    const events = eventHub.stream(taskId);
    const task = await sendMessage(request, taskId);

    return {
      task,
      events
    };
  };
}
