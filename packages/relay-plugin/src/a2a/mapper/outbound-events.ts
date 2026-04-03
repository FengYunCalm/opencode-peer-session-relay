import type { Artifact, Message, Part, TaskArtifactUpdateEvent, TaskEvent, TaskStatusUpdateEvent } from "@opencode-peer-session-relay/a2a-protocol";

import type { StoredRelayTask } from "../../internal/store/task-store.js";

type QueueState = {
  queue: TaskEvent[];
  closed: boolean;
  waiter?: (result: IteratorResult<TaskEvent>) => void;
};

function sanitizePart(part: Part): Part {
  return {
    ...part,
    metadata: {}
  };
}

function sanitizeMessage(message: Message | undefined): Message | undefined {
  if (!message) {
    return undefined;
  }

  return {
    ...message,
    metadata: {},
    parts: message.parts.map((part) => sanitizePart(part))
  };
}

function sanitizeArtifact(artifact: Artifact): Artifact {
  return {
    ...artifact,
    metadata: {},
    parts: artifact.parts.map((part) => sanitizePart(part))
  };
}

export class TaskEventHub {
  private readonly queues = new Map<string, QueueState>();

  stream(taskId: string): AsyncIterable<TaskEvent> {
    const state: QueueState = { queue: [], closed: false };
    this.queues.set(taskId, state);

    const next = async (): Promise<IteratorResult<TaskEvent>> => {
      if (state.queue.length > 0) {
        const value = state.queue.shift()!;
        if (state.closed && state.queue.length === 0) {
          this.queues.delete(taskId);
        }
        return { done: false, value };
      }

      if (state.closed) {
        this.queues.delete(taskId);
        return { done: true, value: undefined };
      }

      return new Promise<IteratorResult<TaskEvent>>((resolve) => {
        state.waiter = resolve;
      });
    };

    return {
      [Symbol.asyncIterator]() {
        return {
          next,
          return: async () => {
            state.closed = true;
            state.waiter?.({ done: true, value: undefined });
            return { done: true, value: undefined };
          }
        };
      }
    };
  }

  emit(taskId: string, event: TaskEvent): void {
    const state = this.queues.get(taskId);

    if (!state) {
      return;
    }

    const isTerminal = event.type === "task-status-update" && ["completed", "failed", "canceled"].includes(event.status);

    if (state.waiter) {
      const waiter = state.waiter;
      state.waiter = undefined;
      waiter({ done: false, value: event });
    } else {
      state.queue.push(event);
    }

    if (isTerminal) {
      state.closed = true;
    }
  }
}

export function mapTaskStatusEvent(task: StoredRelayTask): TaskStatusUpdateEvent {
  return {
    type: "task-status-update",
    taskId: task.taskId,
    contextId: task.contextId,
    status: task.status,
    message: sanitizeMessage(task.latestMessage),
    metadata: {}
  };
}

export function mapArtifactUpdateEvent(
  taskId: string,
  contextId: string | undefined,
  artifact: Artifact,
  append = true
): TaskArtifactUpdateEvent {
  return {
    type: "task-artifact-update",
    taskId,
    contextId,
    artifact: sanitizeArtifact(artifact),
    append,
    metadata: {}
  };
}
