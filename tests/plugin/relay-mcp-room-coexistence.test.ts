import { afterEach, describe, expect, it } from "vitest";

import { createRelayBridgeMcpServer, RelayRoomOrchestrator } from "../support/relay-plugin-testkit.js";
import { cleanupDatabaseLocation, createTestDatabaseLocation } from "./test-db.js";

const dbLocations: string[] = [];

afterEach(() => {
  dbLocations.splice(0).forEach(cleanupDatabaseLocation);
});

describe("relay MCP room coexistence", () => {
  it("allows the same owner session to create both a group room and a private room", async () => {
    const databasePath = createTestDatabaseLocation("relay-mcp-room-coexistence");
    dbLocations.push(databasePath);
    process.env.RELAY_MCP_DATABASE_PATH = databasePath;

    const server = createRelayBridgeMcpServer();
    expect(server).toBeDefined();

    const { RoomStore } = await import("../../packages/relay-plugin/src/internal/store/room-store.ts");
    const { ThreadStore } = await import("../../packages/relay-plugin/src/internal/store/thread-store.ts");
    const { MessageStore } = await import("../../packages/relay-plugin/src/internal/store/message-store.ts");
    const roomStore = new RoomStore(databasePath);
    const threadStore = new ThreadStore(databasePath);
    const messageStore = new MessageStore(databasePath);
    const orchestrator = new RelayRoomOrchestrator(roomStore, threadStore, messageStore);

    const groupRoom = orchestrator.createRoom("session-owner", "group");
    const privateRoom = orchestrator.createRoom("session-owner", "private");

    expect(groupRoom.kind).toBe("group");
    expect(privateRoom.kind).toBe("private");
    expect(groupRoom.roomCode).not.toBe(privateRoom.roomCode);
    expect(threadStore.listThreadsForRoom(groupRoom.roomCode).some((thread) => thread.title === "room-main")).toBe(true);

    roomStore.close();
    threadStore.close();
    messageStore.close();
    await server.close();
    delete process.env.RELAY_MCP_DATABASE_PATH;
  });
});
