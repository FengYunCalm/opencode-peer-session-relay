import { randomInt } from "node:crypto";

import { initializeRelaySchema } from "./schema.js";
import { openSqliteDatabase, type SqliteDatabase } from "./sqlite.js";

export type RelayRoom = {
  roomCode: string;
  createdBySessionID: string;
  joinedSessionID?: string;
  status: "open" | "active";
  createdAt: number;
  joinedAt?: number;
  updatedAt: number;
};

type RelayRoomRow = {
  room_code: string;
  created_by_session_id: string;
  joined_session_id: string | null;
  status: "open" | "active";
  created_at: number;
  joined_at: number | null;
  updated_at: number;
};

function createRoomCode(): string {
  return `${randomInt(0, 1_000_000)}`.padStart(6, "0");
}

export class RoomStore {
  private readonly database: SqliteDatabase;

  constructor(location = ":memory:") {
    this.database = openSqliteDatabase(location);
    initializeRelaySchema(this.database);
  }

  createRoom(sessionID: string): RelayRoom {
    const existing = this.getRoomBySession(sessionID);
    if (existing) {
      return existing;
    }

    for (let attempt = 0; attempt < 20; attempt += 1) {
      const roomCode = createRoomCode();
      const now = Date.now();

      try {
        this.database
          .prepare(`INSERT INTO relay_rooms (room_code, created_by_session_id, joined_session_id, status, created_at, joined_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)`)
          .run(roomCode, sessionID, null, "open", now, null, now);
        return this.getRoom(roomCode)!;
      } catch {
        // retry on collision
      }
    }

    throw new Error("Failed to allocate a unique relay room code.");
  }

  joinRoom(roomCode: string, sessionID: string): RelayRoom {
    const room = this.getRoom(roomCode);
    if (!room) {
      throw new Error(`Room ${roomCode} does not exist.`);
    }

    if (room.createdBySessionID === sessionID) {
      throw new Error("The room creator cannot join the same room as the peer.");
    }

    if (room.joinedSessionID && room.joinedSessionID !== sessionID) {
      throw new Error(`Room ${roomCode} is already full.`);
    }

    if (room.joinedSessionID === sessionID) {
      return room;
    }

    const now = Date.now();
    this.database
      .prepare(`UPDATE relay_rooms SET joined_session_id = ?, status = ?, joined_at = ?, updated_at = ? WHERE room_code = ?`)
      .run(sessionID, "active", now, now, roomCode);

    return this.getRoom(roomCode)!;
  }

  getRoom(roomCode: string): RelayRoom | undefined {
    const row = this.database
      .prepare(`SELECT * FROM relay_rooms WHERE room_code = ?`)
      .get(roomCode) as RelayRoomRow | undefined;

    return row ? this.hydrate(row) : undefined;
  }

  getRoomBySession(sessionID: string): RelayRoom | undefined {
    const row = this.database
      .prepare(`SELECT * FROM relay_rooms WHERE created_by_session_id = ? OR joined_session_id = ? ORDER BY updated_at DESC LIMIT 1`)
      .get(sessionID, sessionID) as RelayRoomRow | undefined;

    return row ? this.hydrate(row) : undefined;
  }

  getPeerSessionID(sessionID: string): string | undefined {
    const room = this.getRoomBySession(sessionID);
    if (!room || room.status !== "active") {
      return undefined;
    }

    if (room.createdBySessionID === sessionID) {
      return room.joinedSessionID;
    }

    if (room.joinedSessionID === sessionID) {
      return room.createdBySessionID;
    }

    return undefined;
  }

  areSessionsPaired(sourceSessionID: string, targetSessionID: string): boolean {
    const room = this.getRoomBySession(sourceSessionID);
    if (!room || room.status !== "active") {
      return false;
    }

    return (
      (room.createdBySessionID === sourceSessionID && room.joinedSessionID === targetSessionID)
      || (room.createdBySessionID === targetSessionID && room.joinedSessionID === sourceSessionID)
    );
  }

  close(): void {
    this.database.close();
  }

  private hydrate(row: RelayRoomRow): RelayRoom {
    return {
      roomCode: row.room_code,
      createdBySessionID: row.created_by_session_id,
      joinedSessionID: row.joined_session_id ?? undefined,
      status: row.status,
      createdAt: row.created_at,
      joinedAt: row.joined_at ?? undefined,
      updatedAt: row.updated_at
    };
  }
}
