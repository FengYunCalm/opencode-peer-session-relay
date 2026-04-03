import type { AuditStore } from "../../internal/store/audit-store.js";
import type { TaskStore } from "../../internal/store/task-store.js";
import type { TaskEventHub } from "../mapper/outbound-events.js";
import { mapTaskStatusEvent } from "../mapper/outbound-events.js";

export function createCancelTaskHandler(taskStore: TaskStore, auditStore: AuditStore, eventHub: TaskEventHub) {
  return (taskId: string) => {
    const task = taskStore.cancelTask(taskId);
    auditStore.append(taskId, "task.canceled", {});
    eventHub.emit(taskId, mapTaskStatusEvent(task));
    return task;
  };
}
