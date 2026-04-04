import { afterEach, describe, expect, it } from "vitest";

import { MessageStore, RoomStore, ThreadStore } from "../support/relay-plugin-testkit.js";
import { cleanupDatabaseLocation, createTestDatabaseLocation } from "./test-db.js";

const dbLocations: string[] = [];

afterEach(() => {
  dbLocations.splice(0).forEach(cleanupDatabaseLocation);
});

describe("thread and message stores", () => {
  it("creates direct and group threads with durable messages and cursors", () => {
    const location = createTestDatabaseLocation("thread-message-store");
    dbLocations.push(location);

    const roomStore = new RoomStore(location);
    const threadStore = new ThreadStore(location);
    const messageStore = new MessageStore(location);

    const room = roomStore.createRoom("session-owner");
    roomStore.joinRoom(room.roomCode, "session-a");
    roomStore.joinRoom(room.roomCode, "session-b");

    const directThread = threadStore.ensureDirectThread(room.roomCode, ["session-owner", "session-a"], "session-owner");
    const groupThread = threadStore.createGroupThread(room.roomCode, ["session-owner", "session-a", "session-b"], "session-owner", "team-main");

    const directMessage = messageStore.appendMessage({
      threadId: directThread.threadId,
      senderSessionID: "session-owner",
      messageType: "relay",
      body: { text: "hello a" }
    });
    const groupMessage = messageStore.appendMessage({
      threadId: groupThread.threadId,
      senderSessionID: "session-owner",
      messageType: "relay",
      body: { text: "hello team" }
    });

    expect(directThread.kind).toBe("direct");
    expect(groupThread.kind).toBe("group");
    expect(threadStore.listParticipants(groupThread.threadId)).toHaveLength(3);
    expect(messageStore.listMessages(groupThread.threadId)).toHaveLength(1);
    expect(groupMessage.seq).toBe(1);

    const participant = threadStore.markRead(groupThread.threadId, "session-a", groupMessage.seq);
    expect(participant.lastReadSeq).toBe(1);

    const transcript = messageStore.exportTranscript(groupThread, threadStore.listParticipants(groupThread.threadId));
    expect(transcript.thread.threadId).toBe(groupThread.threadId);
    expect(transcript.messages[0]?.body.text).toBe("hello team");
    expect(directMessage.seq).toBe(1);
  });

  it("exports the full transcript without truncating after 100 messages", () => {
    const location = createTestDatabaseLocation("thread-message-export-full");
    dbLocations.push(location);

    const roomStore = new RoomStore(location);
    const threadStore = new ThreadStore(location);
    const messageStore = new MessageStore(location);

    const room = roomStore.createRoom("session-owner");
    roomStore.joinRoom(room.roomCode, "session-a");
    const thread = threadStore.ensureDirectThread(room.roomCode, ["session-owner", "session-a"], "session-owner");

    for (let index = 0; index < 105; index += 1) {
      messageStore.appendMessage({
        threadId: thread.threadId,
        senderSessionID: index % 2 === 0 ? "session-owner" : "session-a",
        messageType: "relay",
        body: { text: `message-${index + 1}` }
      });
    }

    const transcript = messageStore.exportTranscript(thread, threadStore.listParticipants(thread.threadId));
    expect(transcript.messages).toHaveLength(105);
    expect(transcript.messages[104]?.body.text).toBe("message-105");
  });
});
