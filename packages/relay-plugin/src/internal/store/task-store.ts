import {
  artifactSchema,
  messageSchema,
  taskSchema,
  type Artifact,
  type Message,
  type Task,
  type TaskStatus
} from "@opencode-peer-session-relay/a2a-protocol";

import { initializeRelaySchema } from "./schema.js";
import { openSqliteDatabase, type SqliteDatabase } from "./sqlite.js";

export type StoredRelayTask = Task & {
  createdAt: number;
  updatedAt: number;
  dedupeKey?: string;
};

export type CreateTaskInput = {
  taskId: string;
  contextId?: string;
  requestMessage: Message;
  status: TaskStatus;
  metadata?: Record<string, unknown>;
  dedupeKey?: string;
};

type RelayTaskRow = {
  task_id: string;
  context_id: string | null;
  status: TaskStatus;
  request_message_json: string;
  latest_message_json: string | null;
  artifacts_json: string;
  metadata_json: string;
  dedupe_key: string | null;
  created_at: number;
  updated_at: number;
};

function parseMessage(value: string | null): Message | undefined {
  if (!value) {
    return undefined;
  }

  return messageSchema.parse(JSON.parse(value));
}

function parseArtifacts(value: string): Artifact[] {
  const parsed = JSON.parse(value) as unknown[];
  return parsed.map((artifact) => artifactSchema.parse(artifact));
}

export class TaskStore {
  private readonly database: SqliteDatabase;

  constructor(location = ":memory:") {
    this.database = openSqliteDatabase(location);
    initializeRelaySchema(this.database);
  }

  transaction<T>(callback: () => T): T {
    return this.database.transaction(callback);
  }

  createTask(input: CreateTaskInput): StoredRelayTask {
    const now = Date.now();
    this.database
      .prepare(
        `INSERT INTO relay_tasks (
          task_id,
          context_id,
          status,
          request_message_json,
          latest_message_json,
          artifacts_json,
          metadata_json,
          dedupe_key,
          created_at,
          updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        input.taskId,
        input.contextId ?? null,
        input.status,
        JSON.stringify(input.requestMessage),
        null,
        JSON.stringify([]),
        JSON.stringify(input.metadata ?? {}),
        input.dedupeKey ?? null,
        now,
        now
      );

    return this.getTask(input.taskId)!;
  }

  getTask(taskId: string): StoredRelayTask | undefined {
    const row = this.database
      .prepare(`SELECT * FROM relay_tasks WHERE task_id = ?`)
      .get(taskId) as RelayTaskRow | undefined;

    if (!row) {
      return undefined;
    }

    return this.hydrate(row);
  }

  getTaskByDedupeKey(dedupeKey: string): StoredRelayTask | undefined {
    const row = this.database
      .prepare(`SELECT * FROM relay_tasks WHERE dedupe_key = ?`)
      .get(dedupeKey) as RelayTaskRow | undefined;

    if (!row) {
      return undefined;
    }

    return this.hydrate(row);
  }

  listActiveTasks(): StoredRelayTask[] {
    const rows = this.database
      .prepare(`SELECT * FROM relay_tasks WHERE status NOT IN ('completed', 'failed', 'canceled') ORDER BY updated_at ASC`)
      .all() as RelayTaskRow[];

    return rows.map((row) => this.hydrate(row));
  }

  updateStatus(taskId: string, status: TaskStatus, latestMessage?: Message): StoredRelayTask {
    const now = Date.now();
    this.database
      .prepare(`UPDATE relay_tasks SET status = ?, latest_message_json = ?, updated_at = ? WHERE task_id = ?`)
      .run(status, latestMessage ? JSON.stringify(latestMessage) : null, now, taskId);

    return this.requireTask(taskId);
  }

  appendArtifact(taskId: string, artifact: Artifact, append = true): StoredRelayTask {
    const current = this.requireTask(taskId);
    const nextArtifacts = append ? [...current.artifacts, artifact] : [artifact];

    this.database
      .prepare(`UPDATE relay_tasks SET artifacts_json = ?, updated_at = ? WHERE task_id = ?`)
      .run(JSON.stringify(nextArtifacts), Date.now(), taskId);

    return this.requireTask(taskId);
  }

  mergeMetadata(taskId: string, patch: Record<string, unknown>): StoredRelayTask {
    const current = this.requireTask(taskId);
    this.database
      .prepare(`UPDATE relay_tasks SET metadata_json = ?, updated_at = ? WHERE task_id = ?`)
      .run(JSON.stringify({ ...current.metadata, ...patch }), Date.now(), taskId);

    return this.requireTask(taskId);
  }

  cancelTask(taskId: string): StoredRelayTask {
    const task = this.requireTask(taskId);
    if (!["submitted", "working", "input-required"].includes(task.status)) {
      throw new Error(`Task ${taskId} is not cancellable from status ${task.status}.`);
    }

    return this.updateStatus(taskId, "canceled");
  }

  close(): void {
    this.database.close();
  }

  private requireTask(taskId: string): StoredRelayTask {
    const task = this.getTask(taskId);

    if (!task) {
      throw new Error(`Task not found: ${taskId}`);
    }

    return task;
  }

  private hydrate(row: RelayTaskRow): StoredRelayTask {
    const requestMessage = messageSchema.parse(JSON.parse(row.request_message_json));
    const latestMessage = parseMessage(row.latest_message_json);
    const artifacts = parseArtifacts(row.artifacts_json);
    const metadata = JSON.parse(row.metadata_json) as Record<string, unknown>;

    const baseTask = taskSchema.parse({
      taskId: row.task_id,
      contextId: row.context_id ?? undefined,
      status: row.status,
      latestMessage,
      artifacts,
      history: [requestMessage],
      metadata
    });

    return {
      ...baseTask,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      dedupeKey: row.dedupe_key ?? undefined
    };
  }
}
