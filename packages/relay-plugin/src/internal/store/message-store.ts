import { randomUUID } from "node:crypto";

import { initializeRelaySchema } from "./schema.js";
import { isRetryableSqliteError, openSqliteDatabase, type SqliteDatabase } from "./sqlite.js";
import type { RelayThread, RelayThreadParticipant } from "./thread-store.js";

export type RelayMessage = {
  threadId: string;
  seq: number;
  messageId: string;
  senderSessionID: string;
  messageType: string;
  body: Record<string, unknown>;
  createdAt: number;
};

export type RelayTranscript = {
  thread: RelayThread;
  participants: RelayThreadParticipant[];
  messages: RelayMessage[];
};

type RelayMessageRow = {
  thread_id: string;
  seq: number;
  message_id: string;
  sender_session_id: string;
  message_type: string;
  body_json: string;
  created_at: number;
};

function createMessageId(): string {
  return `relaymsg_${randomUUID()}`;
}

function shouldRetryMessageInsert(error: unknown): boolean {
  const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
  return isRetryableSqliteError(error) || message.includes("unique");
}

export class MessageStore {
  private readonly database: SqliteDatabase;

  constructor(location = ":memory:") {
    this.database = openSqliteDatabase(location);
    initializeRelaySchema(this.database);
  }

  transaction<T>(callback: () => T): T {
    return this.database.transaction(callback);
  }

  appendMessage(input: {
    threadId: string;
    senderSessionID: string;
    messageType: string;
    body: Record<string, unknown>;
    messageId?: string;
  }): RelayMessage {
    const createdAt = Date.now();
    const messageId = input.messageId ?? createMessageId();

    for (let attempt = 0; attempt < 5; attempt += 1) {
      try {
        return this.database.transaction(() => {
          const nextSeqRow = this.database
            .prepare(`SELECT COALESCE(MAX(seq), 0) + 1 as next_seq FROM relay_messages WHERE thread_id = ?`)
            .get(input.threadId) as { next_seq: number };
          const seq = nextSeqRow.next_seq;

          this.database
            .prepare(`INSERT INTO relay_messages (thread_id, seq, message_id, sender_session_id, message_type, body_json, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`)
            .run(input.threadId, seq, messageId, input.senderSessionID, input.messageType, JSON.stringify(input.body), createdAt);

          return this.getMessage(input.threadId, seq)!;
        });
      } catch (error) {
        if (attempt < 4 && shouldRetryMessageInsert(error)) {
          continue;
        }
        throw error;
      }
    }

    throw new Error(`Failed to append message to thread ${input.threadId}.`);
  }

  getMessage(threadId: string, seq: number): RelayMessage | undefined {
    const row = this.database
      .prepare(`SELECT * FROM relay_messages WHERE thread_id = ? AND seq = ?`)
      .get(threadId, seq) as RelayMessageRow | undefined;

    return row ? this.hydrate(row) : undefined;
  }

  listMessages(threadId: string, afterSeq = 0, limit?: number): RelayMessage[] {
    const rows = typeof limit === "number"
      ? this.database.prepare(`SELECT * FROM relay_messages WHERE thread_id = ? AND seq > ? ORDER BY seq ASC LIMIT ?`).all(threadId, afterSeq, limit) as RelayMessageRow[]
      : this.database.prepare(`SELECT * FROM relay_messages WHERE thread_id = ? AND seq > ? ORDER BY seq ASC`).all(threadId, afterSeq) as RelayMessageRow[];

    return rows.map((row) => this.hydrate(row));
  }

  getLatestSeq(threadId: string): number {
    const row = this.database
      .prepare(`SELECT COALESCE(MAX(seq), 0) as latest_seq FROM relay_messages WHERE thread_id = ?`)
      .get(threadId) as { latest_seq: number };

    return row.latest_seq;
  }

  exportTranscript(thread: RelayThread, participants: RelayThreadParticipant[]): RelayTranscript {
    return {
      thread,
      participants,
      messages: this.listMessages(thread.threadId)
    };
  }

  close(): void {
    this.database.close();
  }

  private hydrate(row: RelayMessageRow): RelayMessage {
    return {
      threadId: row.thread_id,
      seq: row.seq,
      messageId: row.message_id,
      senderSessionID: row.sender_session_id,
      messageType: row.message_type,
      body: JSON.parse(row.body_json) as Record<string, unknown>,
      createdAt: row.created_at
    };
  }
}
