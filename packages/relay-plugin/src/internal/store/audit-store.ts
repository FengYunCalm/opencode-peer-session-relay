import { initializeRelaySchema } from "./schema.js";
import { openSqliteDatabase, type SqliteDatabase } from "./sqlite.js";

export type AuditEventRecord = {
  id: number;
  taskId: string;
  eventType: string;
  payload: Record<string, unknown>;
  createdAt: number;
};

export class AuditStore {
  private readonly database: SqliteDatabase;

  constructor(location = ":memory:") {
    this.database = openSqliteDatabase(location);
    initializeRelaySchema(this.database);
  }

  append(taskId: string, eventType: string, payload: Record<string, unknown>): AuditEventRecord {
    const createdAt = Date.now();
    const result = this.database
      .prepare(`INSERT INTO relay_audit_events (task_id, event_type, payload_json, created_at) VALUES (?, ?, ?, ?)`)
      .run(taskId, eventType, JSON.stringify(payload), createdAt) as { lastInsertRowid?: number | bigint };

    return {
      id: Number(result.lastInsertRowid ?? 0),
      taskId,
      eventType,
      payload,
      createdAt
    };
  }

  list(taskId: string): AuditEventRecord[] {
    const rows = this.database
      .prepare(`SELECT id, task_id, event_type, payload_json, created_at FROM relay_audit_events WHERE task_id = ? ORDER BY id ASC`)
      .all(taskId) as Array<{
      id: number;
      task_id: string;
      event_type: string;
      payload_json: string;
      created_at: number;
    }>;

    return rows.map((row) => ({
      id: row.id,
      taskId: row.task_id,
      eventType: row.event_type,
      payload: JSON.parse(row.payload_json) as Record<string, unknown>,
      createdAt: row.created_at
    }));
  }

  close(): void {
    this.database.close();
  }
}
