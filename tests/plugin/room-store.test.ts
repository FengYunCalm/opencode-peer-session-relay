import { afterEach, describe, expect, it } from "vitest";

import { RoomStore } from "../support/relay-plugin-testkit.js";
import { cleanupDatabaseLocation, createTestDatabaseLocation } from "./test-db.js";

const dbLocations: string[] = [];

afterEach(() => {
  dbLocations.splice(0).forEach(cleanupDatabaseLocation);
});

describe("room store", () => {
  it("creates a room, tracks members, and preserves pair compatibility", () => {
    const location = createTestDatabaseLocation("room-store");
    dbLocations.push(location);
    const roomStore = new RoomStore(location);

    const room = roomStore.createRoom("session-owner");
    expect(room.roomCode).toMatch(/^\d{6}$/);
    expect(room.status).toBe("open");

    const joined = roomStore.joinRoom(room.roomCode, "session-a");
    expect(joined.status).toBe("active");
    expect(roomStore.getPeerSessionID("session-owner")).toBe("session-a");
    expect(roomStore.areSessionsPaired("session-owner", "session-a")).toBe(true);

    roomStore.joinRoom(room.roomCode, "session-b");
    const members = roomStore.listMembers(room.roomCode);
    expect(members).toHaveLength(3);
    expect(roomStore.getMemberSessionIDs(room.roomCode)).toEqual(["session-owner", "session-a", "session-b"]);
    expect(roomStore.areSessionsPaired("session-owner", "session-b")).toBe(true);
    expect(roomStore.getPeerSessionID("session-owner")).toBeUndefined();
  });
});
