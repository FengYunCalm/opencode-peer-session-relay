import type { Artifact, Message, TaskEvent, TaskStatus } from "@opencode-peer-session-relay/a2a-protocol";

import type { AuditStore } from "../internal/store/audit-store.js";
import type { SessionLinkStore } from "../internal/store/session-link-store.js";
import type { StoredRelayTask, TaskStore } from "../internal/store/task-store.js";
import { mapArtifactUpdateEvent, mapTaskStatusEvent, TaskEventHub } from "../a2a/mapper/outbound-events.js";

export class ResponseObserver {
  constructor(
    private readonly taskStore: TaskStore,
    private readonly auditStore: AuditStore,
    private readonly sessionLinkStore: SessionLinkStore,
    private readonly eventHub: TaskEventHub
  ) {}

  accept(taskId: string, sessionID: string): StoredRelayTask {
    this.sessionLinkStore.link(taskId, sessionID);
    const task = this.taskStore.mergeMetadata(taskId, { sessionID });
    this.auditStore.append(taskId, "task.accepted", { sessionID });
    return task;
  }

  updateStatus(taskId: string, status: TaskStatus, message?: Message): TaskEvent {
    const task = this.taskStore.updateStatus(taskId, status, message);
    this.auditStore.append(taskId, "task.status", { status });
    const event = mapTaskStatusEvent(task);
    this.eventHub.emit(taskId, event);
    return event;
  }

  appendArtifact(taskId: string, artifact: Artifact, append = true): TaskEvent {
    const task = this.taskStore.appendArtifact(taskId, artifact, append);
    this.auditStore.append(taskId, "task.artifact", { artifactId: artifact.artifactId, append });
    const event = mapArtifactUpdateEvent(task.taskId, task.contextId, artifact, append);
    this.eventHub.emit(taskId, event);
    return event;
  }
}
