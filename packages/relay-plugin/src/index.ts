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
        description: "Create a two-session relay room and return the room code",
        args: {},
        execute: async (_args, context) => {
          const room = state.runtime.roomStore.createRoom(context.sessionID);
          return [
            `Room code: ${room.roomCode}`,
            `Creator session: ${room.createdBySessionID}`,
            "Tell the other conversation to use the relay-room skill and join this room code."
          ].join("\n");
        }
      }),
      relay_room_join: tool({
        description: "Join a two-session relay room with a room code",
        args: {
          roomCode: tool.schema.string().min(1)
        },
        execute: async ({ roomCode }, context) => {
          const room = state.runtime.roomStore.joinRoom(roomCode, context.sessionID);
          const peerSessionID = state.runtime.roomStore.getPeerSessionID(context.sessionID);
          return [
            `Joined room: ${room.roomCode}`,
            `Current session: ${context.sessionID}`,
            `Peer session: ${peerSessionID ?? "waiting"}`
          ].join("\n");
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
            `Status: ${room.status}`,
            `Current session: ${context.sessionID}`,
            `Peer session: ${peerSessionID}`
          ].join("\n");
        }
      }),
      relay_room_send: tool({
        description: "Send a message to the paired session in the current relay room",
        args: {
          message: tool.schema.string().min(1)
        },
        execute: async ({ message }, context) => {
          const room = state.runtime.roomStore.getRoomBySession(context.sessionID);
          if (!room) {
            throw new Error(`No relay room is bound to session ${context.sessionID}.`);
          }

          const peerSessionID = state.runtime.roomStore.getPeerSessionID(context.sessionID);
          if (!peerSessionID) {
            throw new Error(`Room ${room.roomCode} does not have a connected peer yet.`);
          }

          const result = await state.runtime.sendRoomMessage(context.sessionID, message);
          return [
            `Sent to peer session: ${result.peerSessionID}`,
            `Room code: ${result.roomCode}`,
            `Accepted: ${result.accepted ? "yes" : "no"}`,
            result.reason ? `Reason: ${result.reason}` : undefined,
            `Message length: ${message.length}`
          ].filter(Boolean).join("\n");
        }
      })
    },
    "experimental.session.compacting": async ({ sessionID }, output) => {
      output.context.push(...buildCompactionContext(state, sessionID));
    }
  };
};

export const server = RelayPlugin;
