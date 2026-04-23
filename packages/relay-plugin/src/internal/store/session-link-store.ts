import { initializeRelaySchema } from "./schema.js";
import { openSqliteDatabase, type SqliteDatabase } from "./sqlite.js";

export class SessionLinkStore {
  private readonly database: SqliteDatabase;

  constructor(location = ":memory:") {
    this.database = openSqliteDatabase(location);
    initializeRelaySchema(this.database);
  }

  transaction<T>(callback: () => T): T {
    return this.database.transaction(callback);
  }

  link(taskId: string, sessionID: string): void {
    this.database
      .prepare(`INSERT INTO relay_session_links (task_id, session_id, created_at) VALUES (?, ?, ?) ON CONFLICT(task_id) DO UPDATE SET session_id = excluded.session_id`)
      .run(taskId, sessionID, Date.now());
  }

  getSessionID(taskId: string): string | undefined {
    const row = this.database
      .prepare(`SELECT session_id FROM relay_session_links WHERE task_id = ?`)
      .get(taskId) as { session_id: string } | undefined;

    return row?.session_id;
  }

  close(): void {
    this.database.close();
  }
}
