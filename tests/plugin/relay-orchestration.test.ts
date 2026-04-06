import { afterEach, describe, expect, it, vi } from "vitest";

import {
  MessageStore,
  RelayRoomOrchestrator,
  RoomStore,
  ThreadStore
} from "../support/relay-plugin-testkit.js";

import { cleanupDatabaseLocation, createTestDatabaseLocation } from "./test-db.js";

const dbLocations: string[] = [];

afterEach(() => {
  dbLocations.splice(0).forEach(cleanupDatabaseLocation);
});

describe("relay room orchestration", () => {
  it("aligns standalone room creation with default thread provisioning", () => {
    const location = createTestDatabaseLocation("relay-orchestrator-default-threads");
    dbLocations.push(location);

    const roomStore = new RoomStore(location);
    const threadStore = new ThreadStore(location);
    const messageStore = new MessageStore(location);
    const orchestrator = new RelayRoomOrchestrator(roomStore, threadStore, messageStore);

    const room = orchestrator.createRoom("session-owner", "group");
    orchestrator.joinRoom(room.roomCode, "session-a", "alpha");
    orchestrator.joinRoom(room.roomCode, "session-b", "beta");

    const threads = orchestrator.listThreads({ roomCode: room.roomCode }) as Array<{ title?: string; kind: string; participantCount: number }>;
    expect(threads.some((thread) => thread.title === "room-main" && thread.kind === "group" && thread.participantCount === 3)).toBe(true);
    expect(threads.filter((thread) => thread.kind === "direct")).toHaveLength(2);

    roomStore.close();
    threadStore.close();
    messageStore.close();
  });

  it("stores standalone room messages without pretending to auto-inject them into sessions", async () => {
    const location = createTestDatabaseLocation("relay-orchestrator-standalone-send");
    dbLocations.push(location);

    const roomStore = new RoomStore(location);
    const threadStore = new ThreadStore(location);
    const messageStore = new MessageStore(location);
    const orchestrator = new RelayRoomOrchestrator(roomStore, threadStore, messageStore);

    const room = orchestrator.createRoom("session-owner", "private");
    orchestrator.joinRoom(room.roomCode, "session-peer");
    const result = await orchestrator.sendRoomMessage("session-owner", "hello from standalone", undefined, room.roomCode);

    expect(result.accepted).toBe(true);
    expect(result.peerSessionID).toBe("session-peer");
    expect(result.notifiedRecipients).toEqual([]);
    expect(result.queuedRecipients).toEqual([
      {
        sessionID: "session-peer",
        reason: "standalone relay MCP stores messages only; use relay plugin tools for session delivery"
      }
    ]);

    roomStore.close();
    threadStore.close();
    messageStore.close();
  });

  it("resolves private-room peers by explicit room instead of the latest session room", async () => {
    const location = createTestDatabaseLocation("relay-orchestrator-explicit-private-peer");
    dbLocations.push(location);

    const roomStore = new RoomStore(location);
    const threadStore = new ThreadStore(location);
    const messageStore = new MessageStore(location);
    const orchestrator = new RelayRoomOrchestrator(roomStore, threadStore, messageStore);

    const privateRoom = orchestrator.createRoom("session-owner", "private");
    orchestrator.joinRoom(privateRoom.roomCode, "session-private-peer");
    const groupRoom = orchestrator.createRoom("session-owner", "group");
    orchestrator.joinRoom(groupRoom.roomCode, "session-group-a", "alpha");
    orchestrator.joinRoom(groupRoom.roomCode, "session-group-b", "beta");

    const result = await orchestrator.sendRoomMessage("session-owner", "private only", undefined, privateRoom.roomCode);
    expect(result.peerSessionID).toBe("session-private-peer");

    roomStore.close();
    threadStore.close();
    messageStore.close();
  });

  it("keeps persisted messages and records queued recipients when live delivery fails", async () => {
    const location = createTestDatabaseLocation("relay-orchestrator-delivery-failure");
    dbLocations.push(location);

    const roomStore = new RoomStore(location);
    const threadStore = new ThreadStore(location);
    const messageStore = new MessageStore(location);
    const orchestrator = new RelayRoomOrchestrator(roomStore, threadStore, messageStore, {
      resolveNotificationDecision: () => ({ allowed: true, reason: "idle" }),
      notifyPrivateRoomPeer: async () => {
        throw new Error("prompt failed");
      },
      notifyThreadParticipant: async () => {
        throw new Error("prompt failed");
      }
    });

    const room = orchestrator.createRoom("session-owner", "private");
    orchestrator.joinRoom(room.roomCode, "session-peer");
    const result = await orchestrator.sendRoomMessage("session-owner", "keep durable message", undefined, room.roomCode);

    expect(result.notifiedRecipients).toEqual([]);
    expect(result.queuedRecipients).toEqual([
      {
        sessionID: "session-peer",
        reason: "live delivery failed: prompt failed"
      }
    ]);
    expect(orchestrator.listMessages(result.threadId)).toHaveLength(1);

    roomStore.close();
    threadStore.close();
    messageStore.close();
  });

  it("uses the private-room direct delivery hook instead of thread notifications", async () => {
    const location = createTestDatabaseLocation("relay-orchestrator-private-direct-hook");
    dbLocations.push(location);

    const roomStore = new RoomStore(location);
    const threadStore = new ThreadStore(location);
    const messageStore = new MessageStore(location);
    const notifyPrivateRoomPeer = vi.fn().mockResolvedValue(undefined);
    const notifyThreadParticipant = vi.fn().mockResolvedValue(undefined);
    const orchestrator = new RelayRoomOrchestrator(roomStore, threadStore, messageStore, {
      resolveNotificationDecision: () => ({ allowed: true, reason: "idle" }),
      notifyPrivateRoomPeer,
      notifyThreadParticipant
    });

    const room = orchestrator.createRoom("session-owner", "private");
    orchestrator.joinRoom(room.roomCode, "session-peer");

    await orchestrator.sendRoomMessage("session-owner", "hello direct path", undefined, room.roomCode);

    expect(notifyPrivateRoomPeer).toHaveBeenCalledWith({
      sourceSessionID: "session-owner",
      peerSessionID: "session-peer",
      roomCode: room.roomCode,
      message: "hello direct path"
    });
    expect(notifyThreadParticipant).not.toHaveBeenCalled();

    roomStore.close();
    threadStore.close();
    messageStore.close();
  });

  it("uses the private-room direct delivery hook for direct thread sends too", async () => {
    const location = createTestDatabaseLocation("relay-orchestrator-private-thread-direct-hook");
    dbLocations.push(location);

    const roomStore = new RoomStore(location);
    const threadStore = new ThreadStore(location);
    const messageStore = new MessageStore(location);
    const notifyPrivateRoomPeer = vi.fn().mockResolvedValue(undefined);
    const notifyThreadParticipant = vi.fn().mockResolvedValue(undefined);
    const orchestrator = new RelayRoomOrchestrator(roomStore, threadStore, messageStore, {
      resolveNotificationDecision: () => ({ allowed: true, reason: "idle" }),
      notifyPrivateRoomPeer,
      notifyThreadParticipant
    });

    const room = orchestrator.createRoom("session-owner", "private");
    orchestrator.joinRoom(room.roomCode, "session-peer");
    const thread = orchestrator.createThread({
      roomCode: room.roomCode,
      kind: "direct",
      createdBySessionID: "session-owner",
      participantSessionIDs: ["session-owner", "session-peer"]
    });

    await orchestrator.sendThreadMessage({
      threadId: thread.threadId,
      senderSessionID: "session-owner",
      message: "hello direct thread path",
      messageType: "relay"
    });

    expect(notifyPrivateRoomPeer).toHaveBeenCalledWith({
      sourceSessionID: "session-owner",
      peerSessionID: "session-peer",
      roomCode: room.roomCode,
      message: "hello direct thread path"
    });
    expect(notifyThreadParticipant).not.toHaveBeenCalled();

    roomStore.close();
    threadStore.close();
    messageStore.close();
  });
});
