import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { RelayRoomOrchestrator } from "./internal/orchestration/relay-room-orchestrator.js";
import { RoomStore, type RelayRoomKind, type RelayRoomMemberRole } from "./internal/store/room-store.js";
import { ThreadStore } from "./internal/store/thread-store.js";
import { MessageStore } from "./internal/store/message-store.js";
import { concreteRelaySessionIDSchema } from "./session-id.js";

const roomCreateSchema = z.object({ sessionID: concreteRelaySessionIDSchema, kind: z.enum(["private", "group"]).default("private") });
const roomJoinSchema = z.object({ roomCode: z.string().min(1), sessionID: concreteRelaySessionIDSchema, alias: z.string().optional() });
const roomStatusSchema = z.object({ sessionID: concreteRelaySessionIDSchema, roomCode: z.string().optional() });
const roomSendSchema = z.object({ sessionID: concreteRelaySessionIDSchema, roomCode: z.string().optional(), message: z.string().min(1), targetAlias: z.string().optional() });
const roomMembersSchema = z.object({ roomCode: z.string().optional(), sessionID: concreteRelaySessionIDSchema.optional() });
const roomSetRoleSchema = z.object({ roomCode: z.string().optional(), actorSessionID: concreteRelaySessionIDSchema, targetSessionID: concreteRelaySessionIDSchema, role: z.enum(["owner", "member", "observer"]) });
const threadCreateSchema = z.object({ roomCode: z.string().optional(), createdBySessionID: concreteRelaySessionIDSchema, kind: z.enum(["direct", "group"]), participantSessionIDs: z.array(concreteRelaySessionIDSchema).min(2), title: z.string().optional() });
const threadListSchema = z.object({ roomCode: z.string().optional(), sessionID: concreteRelaySessionIDSchema.optional() });
const messageListSchema = z.object({ threadId: z.string().min(1), afterSeq: z.number().int().nonnegative().optional(), limit: z.number().int().positive().optional() });
const messageSendSchema = z.object({ threadId: z.string().min(1), senderSessionID: concreteRelaySessionIDSchema, message: z.string().min(1), messageType: z.string().optional() });
const markReadSchema = z.object({ threadId: z.string().min(1), sessionID: concreteRelaySessionIDSchema, seq: z.number().int().nonnegative() });
const transcriptExportSchema = z.object({ threadId: z.string().min(1) });

function resolveDatabasePath(): string {
  return process.env.RELAY_MCP_DATABASE_PATH || process.env.RELAY_DATABASE_PATH || "C:\\Users\\MECHREVO\\.config\\opencode\\plugins\\opencode-a2a-relay.sqlite";
}

class RelayMcpService {
  readonly roomStore: RoomStore;
  readonly threadStore: ThreadStore;
  readonly messageStore: MessageStore;
  readonly orchestrator: RelayRoomOrchestrator;

  constructor(databasePath: string) {
    this.roomStore = new RoomStore(databasePath);
    this.threadStore = new ThreadStore(databasePath);
    this.messageStore = new MessageStore(databasePath);
    this.orchestrator = new RelayRoomOrchestrator(this.roomStore, this.threadStore, this.messageStore);
  }

  close(): void {
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
    return this.orchestrator.sendRoomMessage(input.sessionID, input.message, input.targetAlias, input.roomCode);
  }

  sendThreadMessage(input: { threadId: string; senderSessionID: string; message: string; messageType?: string }) {
    return this.orchestrator.sendThreadMessage(input);
  }

  markThreadRead(threadId: string, sessionID: string, seq: number) {
    return this.orchestrator.markThreadRead(threadId, sessionID, seq);
  }

  exportTranscript(threadId: string) {
    return this.orchestrator.exportTranscript(threadId);
  }
}

export function createRelayBridgeMcpServer() {
  const dbPath = resolveDatabasePath();
  const service = new RelayMcpService(dbPath);
  const mcp = new McpServer({ name: "relay", version: "0.1.0" });

  mcp.registerTool("room_create", { description: "Create a private or group room through the standalone compatibility path", inputSchema: roomCreateSchema.shape }, async (args) => ({ content: [{ type: "text", text: JSON.stringify(service.createRoom(args.sessionID, args.kind), null, 2) }] }) as never);
  mcp.registerTool("room_join", { description: "Join a room, optionally with alias for group rooms, through the standalone compatibility path", inputSchema: roomJoinSchema.shape }, async (args) => ({ content: [{ type: "text", text: JSON.stringify(service.joinRoom(args.roomCode, args.sessionID, args.alias), null, 2) }] }) as never);
  mcp.registerTool("room_status", { description: "Show room status for a session on the standalone compatibility path", inputSchema: roomStatusSchema.shape }, async (args) => ({ content: [{ type: "text", text: JSON.stringify(service.getRoomStatus(args.sessionID, args.roomCode), null, 2) }] }) as never);
  mcp.registerTool("room_send", { description: "Store a room-scoped message on the standalone compatibility path; this does not auto-inject into OpenCode sessions", inputSchema: roomSendSchema.shape }, async (args) => ({ content: [{ type: "text", text: JSON.stringify(await service.sendRoomMessage(args), null, 2) }] }) as never);
  mcp.registerTool("room_members", { description: "List room members", inputSchema: roomMembersSchema.shape }, async (args) => ({ content: [{ type: "text", text: JSON.stringify(service.listRoomMembers(args.roomCode, args.sessionID), null, 2) }] }) as never);
  mcp.registerTool("room_set_role", { description: "Set a room member role", inputSchema: roomSetRoleSchema.shape }, async (args) => ({ content: [{ type: "text", text: JSON.stringify(service.setRoomRole(args), null, 2) }] }) as never);
  mcp.registerTool("thread_create", { description: "Create a direct or group thread", inputSchema: threadCreateSchema.shape }, async (args) => ({ content: [{ type: "text", text: JSON.stringify(service.createThread(args), null, 2) }] }) as never);
  mcp.registerTool("thread_list", { description: "List threads by room or session", inputSchema: threadListSchema.shape }, async (args) => ({ content: [{ type: "text", text: JSON.stringify(service.listThreads(args.roomCode, args.sessionID), null, 2) }] }) as never);
  mcp.registerTool("message_list", { description: "List messages for a thread", inputSchema: messageListSchema.shape }, async (args) => ({ content: [{ type: "text", text: JSON.stringify(service.listMessages(args.threadId, args.afterSeq, args.limit), null, 2) }] }) as never);
  mcp.registerTool("message_send", { description: "Append a durable message to a thread", inputSchema: messageSendSchema.shape }, async (args) => ({ content: [{ type: "text", text: JSON.stringify(await service.sendThreadMessage(args), null, 2) }] }) as never);
  mcp.registerTool("message_mark_read", { description: "Advance the read cursor for a thread", inputSchema: markReadSchema.shape }, async (args) => ({ content: [{ type: "text", text: JSON.stringify(service.markThreadRead(args.threadId, args.sessionID, args.seq), null, 2) }] }) as never);
  mcp.registerTool("transcript_export", { description: "Export the full transcript for a thread", inputSchema: transcriptExportSchema.shape }, async (args) => ({ content: [{ type: "text", text: JSON.stringify(service.exportTranscript(args.threadId), null, 2) }] }) as never);

  const shutdown = async () => {
    service.close();
    await mcp.close();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  return mcp;
}

if (import.meta.main) {
  const mcp = createRelayBridgeMcpServer();
  const transport = new StdioServerTransport();
  mcp.connect(transport).catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
