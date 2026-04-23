import { RelayRoomOrchestrator } from "./internal/orchestration/relay-room-orchestrator.js";
import { AuditStore } from "./internal/store/audit-store.js";
import { MessageStore } from "./internal/store/message-store.js";
import { RoomStore, type RelayRoomKind, type RelayRoomMemberRole } from "./internal/store/room-store.js";
import { ThreadStore } from "./internal/store/thread-store.js";

export class RelayMcpService {
  readonly roomStore: RoomStore;
  readonly threadStore: ThreadStore;
  readonly messageStore: MessageStore;
  readonly auditStore: AuditStore;
  readonly orchestrator: RelayRoomOrchestrator;

  constructor(databasePath: string) {
    this.roomStore = new RoomStore(databasePath);
    this.threadStore = new ThreadStore(databasePath);
    this.messageStore = new MessageStore(databasePath);
    this.auditStore = new AuditStore(databasePath);
    this.orchestrator = new RelayRoomOrchestrator(this.roomStore, this.threadStore, this.messageStore, {
      recordDiagnostic: (eventType, payload) => this.auditStore.append("__relay_diagnostics__", eventType, payload),
      resolveNotificationDecision: () => ({ allowed: false, reason: "standalone compatibility path stores messages only" }),
      notifyPrivateRoomPeer: async () => {
        throw new Error("standalone compatibility path does not inject into OpenCode sessions");
      },
      notifyThreadParticipant: async () => {
        throw new Error("standalone compatibility path does not inject into OpenCode sessions");
      }
    });
  }

  close(): void {
    this.auditStore.close();
    this.roomStore.close();
    this.threadStore.close();
    this.messageStore.close();
  }

  createRoom(sessionID: string, kind: RelayRoomKind) {
    return this.orchestrator.createRoom(sessionID, kind);
  }

  joinRoom(roomCode: string, sessionID: string, alias?: string) {
    return this.orchestrator.joinRoom(roomCode, sessionID, alias);
  }

  getRoomStatus(sessionID: string, roomCode?: string) {
    const room = this.orchestrator.resolveRoomForSession(sessionID, roomCode);
    return { room, members: this.roomStore.listMembers(room.roomCode) };
  }

  listRoomMembers(roomCode?: string, sessionID?: string) {
    if (!sessionID && !roomCode) throw new Error("roomCode or sessionID is required to list room members.");
    const room = sessionID ? this.orchestrator.resolveRoomForSession(sessionID, roomCode) : this.roomStore.getRoom(roomCode!);
    if (!room) throw new Error(`Room ${roomCode} does not exist.`);
    return this.roomStore.listMembers(room.roomCode);
  }

  setRoomRole(input: { roomCode?: string; actorSessionID: string; targetSessionID: string; role: RelayRoomMemberRole }) {
    return this.orchestrator.setRoomMemberRole(input.roomCode, input.actorSessionID, input.targetSessionID, input.role);
  }

  createThread(input: { roomCode?: string; createdBySessionID: string; kind: "direct" | "group"; participantSessionIDs: string[]; title?: string }) {
    const uniqueParticipants = [...new Set(input.participantSessionIDs.includes(input.createdBySessionID) ? input.participantSessionIDs : [input.createdBySessionID, ...input.participantSessionIDs])];
    return this.orchestrator.createThread({ ...input, participantSessionIDs: uniqueParticipants });
  }

  listThreads(roomCode?: string, sessionID?: string) {
    return this.orchestrator.listThreads({ roomCode, sessionID });
  }

  listMessages(threadId: string, afterSeq?: number, limit?: number) {
    return this.orchestrator.listMessages(threadId, afterSeq ?? 0, limit ?? 100);
  }

  sendRoomMessage(input: { sessionID: string; roomCode?: string; message: string; targetAlias?: string }) {
    this.auditStore.append("__relay_diagnostics__", "relay.send.entry", {
      surface: "compat",
      tool: "compat_room_send",
      sessionID: input.sessionID,
      roomCode: input.roomCode ?? null,
      targetAlias: input.targetAlias ?? null
    });
    return this.orchestrator.sendRoomMessage(input.sessionID, input.message, input.targetAlias, input.roomCode);
  }

  sendThreadMessage(input: { threadId: string; senderSessionID: string; message: string; messageType?: string }) {
    this.auditStore.append("__relay_diagnostics__", "relay.send.entry", {
      surface: "compat",
      tool: "compat_message_send",
      senderSessionID: input.senderSessionID,
      threadId: input.threadId,
      messageType: input.messageType ?? "relay"
    });
    return this.orchestrator.sendThreadMessage(input);
  }

  markThreadRead(threadId: string, sessionID: string, seq: number) {
    return this.orchestrator.markThreadRead(threadId, sessionID, seq);
  }

  exportTranscript(threadId: string) {
    return this.orchestrator.exportTranscript(threadId);
  }
}
