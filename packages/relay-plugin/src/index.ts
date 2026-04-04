import type { Plugin } from "@opencode-ai/plugin";
import { tool } from "@opencode-ai/plugin";
import type { Event } from "@opencode-ai/sdk";

import { A2ARelayHost } from "./a2a/host.js";
import { resolveRelayPluginConfig } from "./config.js";
import { buildCompactionContext } from "./runtime/compaction-anchor.js";
import { createRelayPluginState, type RelayPluginState } from "./runtime/plugin-state.js";
import { readRelayPluginState, registerRelayPluginState } from "./runtime/plugin-instance-registry.js";
import { RelayRuntime } from "./runtime/relay-runtime.js";
import { SessionRegistry } from "./runtime/session-registry.js";

export const pluginPackageName = "@opencode-peer-session-relay/relay-plugin";
export const pluginVersion = "0.1.0";

function tryExtractSessionID(event: Event): string | undefined {
  if ("properties" in event && event.properties && typeof event.properties === "object") {
    const maybeSessionID = (event.properties as { sessionID?: unknown }).sessionID;
    if (typeof maybeSessionID === "string") {
      return maybeSessionID;
    }
  }

  return undefined;
}

function parseParticipantSessionIDs(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export const RelayPlugin: Plugin = async (input, options) => {
  const config = resolveRelayPluginConfig(options);
  const projectKey = input.project.id;

  let state: RelayPluginState | undefined = readRelayPluginState(projectKey);

  if (!state) {
    const sessionRegistry = new SessionRegistry();
    const runtime = new RelayRuntime(input, config, sessionRegistry);
    let host: A2ARelayHost;
    host = new A2ARelayHost(config.a2a, {
      readiness: () => ({ ok: true, detail: "relay plugin runtime booted" }),
      health: () => ({
        projectID: projectKey,
        startedAt: new Date().toISOString(),
        activeTaskCount: runtime.taskStore.listActiveTasks().length
      }),
      agentCard: () => runtime.buildAgentCard(host.url),
      rpc: async (payload) => runtime.handleJsonRpc(payload)
    });

    await host.start();
    state = createRelayPluginState(config, host, runtime);
    registerRelayPluginState(projectKey, state);
  }

  return {
    event: async ({ event }) => {
      if (event.type !== "session.status") {
        return;
      }

      const sessionID = tryExtractSessionID(event);
      const status = event.properties.status;
      if (!sessionID) {
        return;
      }

      await state.runtime.onSessionStatus(sessionID, status);
    },
    tool: {
      relay_room_create: tool({
        description: "Create a private or group relay room and return the room code",
        args: {
          kind: tool.schema.string().optional()
        },
        execute: async ({ kind }, context) => {
          const normalizedKind = kind === "group" ? "group" : "private";
          const room = state.runtime.roomStore.createRoom(context.sessionID, normalizedKind);
          state.runtime.ensureDefaultThreadsForRoom(room.roomCode);
          return [
            `Room code: ${room.roomCode}`,
            `Room kind: ${room.kind}`,
            `Creator session: ${room.createdBySessionID}`,
            room.kind === "group"
              ? "Tell other conversations to join this room with an alias."
              : "Tell the other conversation to use the relay-room skill and join this room code."
          ].join("\n");
        }
      }),
      relay_room_join: tool({
        description: "Join a relay room with a room code; group rooms require an alias",
        args: {
          roomCode: tool.schema.string().min(1),
          alias: tool.schema.string().optional()
        },
        execute: async ({ roomCode, alias }, context) => {
          const room = state.runtime.roomStore.joinRoom(roomCode, context.sessionID, alias);
          state.runtime.ensureDefaultThreadsForRoom(room.roomCode);
          const peerSessionID = state.runtime.roomStore.getPeerSessionID(context.sessionID);
          return [
            `Joined room: ${room.roomCode}`,
            `Room kind: ${room.kind}`,
            `Current session: ${context.sessionID}`,
            alias ? `Alias: ${alias}` : undefined,
            `Peer session: ${peerSessionID ?? "waiting"}`
          ].filter(Boolean).join("\n");
        }
      }),
      relay_room_status: tool({
        description: "Show the current relay room binding for this conversation",
        args: {},
        execute: async (_args, context) => {
          const room = state.runtime.roomStore.getRoomBySession(context.sessionID);
          if (!room) {
            return `No relay room is bound to session ${context.sessionID}.`;
          }

          const peerSessionID = state.runtime.roomStore.getPeerSessionID(context.sessionID) ?? "waiting";
          return [
            `Room code: ${room.roomCode}`,
            `Room kind: ${room.kind}`,
            `Status: ${room.status}`,
            `Current session: ${context.sessionID}`,
            `Peer session: ${peerSessionID}`
          ].join("\n");
        }
      }),
      relay_room_send: tool({
        description: "Send a message in the current relay room; group rooms may target a specific alias",
        args: {
          message: tool.schema.string().min(1),
          targetAlias: tool.schema.string().optional()
        },
        execute: async ({ message, targetAlias }, context) => {
          const result = await state.runtime.sendRoomMessage(context.sessionID, message, targetAlias);
          return [
            `Sent to peer session: ${result.peerSessionID}`,
            `Room code: ${result.roomCode}`,
            `Thread ID: ${result.threadId}`,
            `Accepted: ${result.accepted ? "yes" : "no"}`,
            targetAlias ? `Target alias: ${targetAlias}` : undefined,
            result.reason ? `Reason: ${result.reason}` : undefined,
            `Message length: ${message.length}`
          ].filter(Boolean).join("\n");
        }
      }),
      relay_room_members: tool({
        description: "List active members in the current relay room",
        args: {},
        execute: async (_args, context) => {
          const room = state.runtime.roomStore.getRoomBySession(context.sessionID);
          if (!room) {
            throw new Error(`No relay room is bound to session ${context.sessionID}.`);
          }

          return JSON.stringify({
            roomCode: room.roomCode,
            roomKind: room.kind,
            members: state.runtime.listRoomMembers(room.roomCode)
          }, null, 2);
        }
      }),
      relay_room_set_role: tool({
        description: "Set the role of a room member; only the room owner may do this",
        args: {
          targetSessionID: tool.schema.string().min(1),
          role: tool.schema.string().min(1)
        },
        execute: async ({ targetSessionID, role }, context) => {
          const room = state.runtime.roomStore.getRoomBySession(context.sessionID);
          if (!room) {
            throw new Error(`No relay room is bound to session ${context.sessionID}.`);
          }

          const normalizedRole = role === "observer" ? "observer" : role === "owner" ? "owner" : "member";
          const updated = state.runtime.setRoomMemberRole(room.roomCode, context.sessionID, targetSessionID, normalizedRole);
          return JSON.stringify(updated, null, 2);
        }
      }),
      relay_thread_create: tool({
        description: "Create a private or group durable thread inside the current relay room",
        args: {
          kind: tool.schema.string().min(1),
          participantSessionIDs: tool.schema.string().min(1),
          title: tool.schema.string().optional()
        },
        execute: async ({ kind, participantSessionIDs, title }, context) => {
          const room = state.runtime.roomStore.getRoomBySession(context.sessionID);
          if (!room) {
            throw new Error(`No relay room is bound to session ${context.sessionID}.`);
          }

          const participants = parseParticipantSessionIDs(participantSessionIDs);
          if (!participants.includes(context.sessionID)) {
            participants.unshift(context.sessionID);
          }

          const thread = state.runtime.createThread({
            roomCode: room.roomCode,
            kind: kind === "group" ? "group" : "direct",
            createdBySessionID: context.sessionID,
            participantSessionIDs: participants,
            title
          });

          return JSON.stringify(thread, null, 2);
        }
      }),
      relay_thread_list: tool({
        description: "List durable threads for the current relay room or session",
        args: {
          scope: tool.schema.string().optional()
        },
        execute: async ({ scope }, context) => {
          const room = state.runtime.roomStore.getRoomBySession(context.sessionID);
          if (scope === "room" && room) {
            return JSON.stringify(state.runtime.listThreads({ roomCode: room.roomCode }), null, 2);
          }
          return JSON.stringify(state.runtime.listThreads({ sessionID: context.sessionID }), null, 2);
        }
      }),
      relay_message_list: tool({
        description: "List messages from a durable relay thread",
        args: {
          threadId: tool.schema.string().min(1),
          afterSeq: tool.schema.number().int().nonnegative().optional(),
          limit: tool.schema.number().int().positive().optional()
        },
        execute: async ({ threadId, afterSeq, limit }) => {
          return JSON.stringify(state.runtime.listMessages(threadId, afterSeq, limit), null, 2);
        }
      }),
      relay_message_send: tool({
        description: "Append a durable message into a relay thread",
        args: {
          threadId: tool.schema.string().min(1),
          message: tool.schema.string().min(1),
          messageType: tool.schema.string().optional()
        },
        execute: async ({ threadId, message, messageType }, context) => {
          const result = await state.runtime.sendThreadMessage({
            threadId,
            senderSessionID: context.sessionID,
            message,
            messageType
          });
          return JSON.stringify(result, null, 2);
        }
      }),
      relay_message_mark_read: tool({
        description: "Advance the read cursor for the current session in a thread",
        args: {
          threadId: tool.schema.string().min(1),
          seq: tool.schema.number().int().nonnegative()
        },
        execute: async ({ threadId, seq }, context) => {
          return JSON.stringify(state.runtime.markThreadRead(threadId, context.sessionID, seq), null, 2);
        }
      }),
      relay_transcript_export: tool({
        description: "Export the full durable transcript for a thread",
        args: {
          threadId: tool.schema.string().min(1)
        },
        execute: async ({ threadId }) => {
          return JSON.stringify(state.runtime.exportTranscript(threadId), null, 2);
        }
      })
    },
    "experimental.session.compacting": async ({ sessionID }, output) => {
      output.context.push(...buildCompactionContext(state, sessionID));
    }
  };
};

export const server = RelayPlugin;
