import type { Plugin } from "@opencode-ai/plugin";
import { tool } from "@opencode-ai/plugin";
import type { Event } from "@opencode-ai/sdk";

import { buildRelayPluginInstanceKey, resolveRelayPluginConfig } from "./config.js";
import { buildCompactionContext } from "./runtime/compaction-anchor.js";
import { createRelayPluginState, type RelayPluginState } from "./runtime/plugin-state.js";
import { deleteRelayPluginStartup, readRelayPluginStartup, readRelayPluginState, registerRelayPluginStartup, registerRelayPluginState, registerRelayProjectInstance } from "./runtime/plugin-instance-registry.js";
import { RelayRuntime } from "./runtime/relay-runtime.js";
import { bootstrapRelayWorkflowTeam } from "./runtime/team-workflow.js";
import { createRelayA2AHost } from "./a2a/relay-host-factory.js";
import { isRelayCurrentSessionPlaceholder, shouldInjectRelaySessionID } from "./session-id.js";
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

const relayToolSuffixes = [
  "room_create",
  "room_join",
  "room_status",
  "room_send",
  "room_members",
  "room_set_role",
  "thread_create",
  "thread_list",
  "message_send",
  "message_mark_read",
  "message_list",
  "transcript_export"
] as const;

type RelayToolSuffix = typeof relayToolSuffixes[number];

function getRelayToolSuffix(toolID: string): RelayToolSuffix | undefined {
  for (const suffix of relayToolSuffixes) {
    if (
      toolID === suffix
      || toolID === `relay_${suffix}`
      || toolID.endsWith(`__${suffix}`)
      || toolID.endsWith(`.${suffix}`)
      || toolID.endsWith(`:${suffix}`)
      || toolID.endsWith(`/${suffix}`)
    ) {
      return suffix;
    }
  }

  return undefined;
}

function applyRelaySessionDefaults(toolID: string, args: Record<string, unknown>, sessionID: string) {
  const suffix = getRelayToolSuffix(toolID);
  if (!suffix) {
    return;
  }

  if (["room_create", "room_join", "room_status", "room_send", "room_members"].includes(suffix) && shouldInjectRelaySessionID(args.sessionID)) {
    args.sessionID = sessionID;
  }
  if (suffix === "room_set_role" && shouldInjectRelaySessionID(args.actorSessionID)) {
    args.actorSessionID = sessionID;
  }
  if (suffix === "thread_create" && shouldInjectRelaySessionID(args.createdBySessionID)) {
    args.createdBySessionID = sessionID;
  }
  if (suffix === "thread_list" && (isRelayCurrentSessionPlaceholder(args.sessionID) || (args.roomCode === undefined && shouldInjectRelaySessionID(args.sessionID)))) {
    args.sessionID = sessionID;
  }
  if (suffix === "message_send" && shouldInjectRelaySessionID(args.senderSessionID)) {
    args.senderSessionID = sessionID;
  }
  if (suffix === "message_mark_read" && shouldInjectRelaySessionID(args.sessionID)) {
    args.sessionID = sessionID;
  }
}

export const RelayPlugin: Plugin = async (input, options) => {
  const config = resolveRelayPluginConfig(options);
  const projectKey = input.project.id;
  const instanceKey = buildRelayPluginInstanceKey(config, projectKey);

  let state: RelayPluginState | undefined = readRelayPluginState(instanceKey);

  if (!state) {
    const existingStartup = readRelayPluginStartup(instanceKey);
    if (existingStartup) {
      state = await existingStartup;
    } else {
      const startup = (async () => {
        const sessionRegistry = new SessionRegistry();
        const runtime = new RelayRuntime(input, config, sessionRegistry);
        const host = createRelayA2AHost(config.a2a, runtime, projectKey);

        await host.start();
        const nextState = createRelayPluginState(config, host, runtime);
        registerRelayPluginState(instanceKey, nextState);
        return nextState;
      })();

      registerRelayPluginStartup(instanceKey, startup);
      try {
        state = await startup;
      } finally {
        deleteRelayPluginStartup(instanceKey);
      }
    }
  }

  registerRelayProjectInstance(projectKey, instanceKey);

  const relayTools = {
    relay_room_create: tool({
      description: "Create a private or group relay room and return the room code",
      args: {
        kind: tool.schema.string().optional()
      },
      execute: async ({ kind }, context) => {
        const normalizedKind = kind === "group" ? "group" : "private";
        const room = state.runtime.createRoom(context.sessionID, normalizedKind);
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
        const room = state.runtime.joinRoom(roomCode, context.sessionID, alias);
        const peerSessionID = state.runtime.getPeerSessionID(context.sessionID, room.roomCode);
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
      args: {
        roomCode: tool.schema.string().optional()
      },
      execute: async ({ roomCode }, context) => {
        const room = state.runtime.resolveRoomForSession(context.sessionID, roomCode);
        const peerSessionID = room.kind === "private" ? (state.runtime.getPeerSessionID(context.sessionID, room.roomCode) ?? "waiting") : "group";
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
        roomCode: tool.schema.string().optional(),
        message: tool.schema.string().min(1),
        targetAlias: tool.schema.string().optional()
      },
      execute: async ({ roomCode, message, targetAlias }, context) => {
        state.runtime.recordDiagnostic("relay.send.entry", {
          surface: "plugin",
          tool: "relay_room_send",
          sessionID: context.sessionID,
          roomCode: roomCode ?? null,
          targetAlias: targetAlias ?? null
        });
        const result = await state.runtime.sendRoomMessage(context.sessionID, message, targetAlias, roomCode);
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
      args: {
        roomCode: tool.schema.string().optional()
      },
      execute: async ({ roomCode }, context) => {
        const members = state.runtime.listRoomMembers(roomCode ?? "", context.sessionID);
        const room = state.runtime.resolveRoomForSession(context.sessionID, roomCode);
        return JSON.stringify({
          roomCode: room.roomCode,
          roomKind: room.kind,
          members
        }, null, 2);
      }
    }),
    relay_room_set_role: tool({
      description: "Set the role of a room member; only the room owner may do this",
      args: {
        roomCode: tool.schema.string().optional(),
        targetSessionID: tool.schema.string().min(1),
        role: tool.schema.string().min(1)
      },
      execute: async ({ roomCode, targetSessionID, role }, context) => {
        const normalizedRole = role === "observer" ? "observer" : role === "owner" ? "owner" : "member";
        const updated = state.runtime.setRoomMemberRole(roomCode, context.sessionID, targetSessionID, normalizedRole);
        return JSON.stringify(updated, null, 2);
      }
    }),
    relay_thread_create: tool({
      description: "Create a private or group durable thread inside the current relay room",
      args: {
        roomCode: tool.schema.string().optional(),
        kind: tool.schema.string().min(1),
        participantSessionIDs: tool.schema.string().min(1),
        title: tool.schema.string().optional()
      },
      execute: async ({ roomCode, kind, participantSessionIDs, title }, context) => {
        const room = state.runtime.resolveRoomForSession(context.sessionID, roomCode);

        const participants = parseParticipantSessionIDs(participantSessionIDs);
        if (!participants.includes(context.sessionID)) {
          participants.unshift(context.sessionID);
        }

        const thread = state.runtime.createThread({
          roomCode,
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
        roomCode: tool.schema.string().optional(),
        scope: tool.schema.string().optional()
      },
      execute: async ({ roomCode, scope }, context) => {
        if (scope === "room") {
          const resolvedRoom = state.runtime.resolveRoomForSession(context.sessionID, roomCode);
          return JSON.stringify(state.runtime.listThreads({ roomCode: resolvedRoom.roomCode }), null, 2);
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
      execute: async ({ threadId, afterSeq, limit }, context) => JSON.stringify(state.runtime.listMessages(threadId, afterSeq, limit, context.sessionID), null, 2)
    }),
    relay_message_send: tool({
      description: "Append a durable message into a relay thread",
      args: {
        threadId: tool.schema.string().min(1),
        message: tool.schema.string().min(1),
        messageType: tool.schema.string().optional()
      },
      execute: async ({ threadId, message, messageType }, context) => {
        state.runtime.recordDiagnostic("relay.send.entry", {
          surface: "plugin",
          tool: "relay_message_send",
          sessionID: context.sessionID,
          threadId,
          messageType: messageType ?? "relay"
        });
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
      execute: async ({ threadId, seq }, context) => JSON.stringify(state.runtime.markThreadRead(threadId, context.sessionID, seq), null, 2)
    }),
    relay_transcript_export: tool({
      description: "Export the full durable transcript for a thread",
      args: {
        threadId: tool.schema.string().min(1)
      },
      execute: async ({ threadId }, context) => JSON.stringify(state.runtime.exportTranscript(threadId, context.sessionID), null, 2)
    }),
    relay_team_start: tool({
      description: "Create a relay-backed workflow team from the current session and bootstrap the default worker sessions",
      args: {
        task: tool.schema.string().min(1)
      },
      execute: async ({ task }, context) => JSON.stringify(await bootstrapRelayWorkflowTeam(input, state.runtime, context.sessionID, task), null, 2)
    }),
    relay_team_status: tool({
      description: "Show the current relay workflow team status for this session or a specific run/room",
      args: {
        runId: tool.schema.string().optional(),
        roomCode: tool.schema.string().optional()
      },
      execute: async ({ runId, roomCode }, context) => JSON.stringify(state.runtime.getTeamStatus(context.sessionID, runId, roomCode), null, 2)
    }),
    relay_team_intervene: tool({
      description: "Issue a manager intervention into the relay workflow team and record it in the workflow timeline",
      args: {
        runId: tool.schema.string().optional(),
        roomCode: tool.schema.string().optional(),
        action: tool.schema.string().min(1),
        targetAlias: tool.schema.string().optional(),
        note: tool.schema.string().min(1),
        handoffTo: tool.schema.string().optional(),
        deliverables: tool.schema.string().optional()
      },
      execute: async ({ runId, roomCode, action, targetAlias, note, handoffTo, deliverables }, context) => {
        const normalizedAction = action === "reassign"
          ? "reassign"
          : action === "unblock"
            ? "unblock"
            : action === "nudge"
              ? "nudge"
              : "retry";
        const parsedDeliverables = deliverables
          ? deliverables.split(",").map((item) => item.trim()).filter(Boolean)
          : undefined;

        return JSON.stringify(await state.runtime.interveneTeam(context.sessionID, {
          runId,
          roomCode,
          action: normalizedAction,
          targetAlias,
          note,
          handoffTo,
          deliverables: parsedDeliverables
        }), null, 2);
      }
    }),
    relay_team_apply_policy: tool({
      description: "Apply one explicit policy decision from relay_team_status through the standard manager intervention path",
      args: {
        runId: tool.schema.string().optional(),
        roomCode: tool.schema.string().optional(),
        action: tool.schema.string().min(1),
        targetAlias: tool.schema.string().optional()
      },
      execute: async ({ runId, roomCode, action, targetAlias }, context) => {
        const normalizedAction = action === "reassign"
          ? "reassign"
          : action === "unblock"
            ? "unblock"
            : action === "nudge"
              ? "nudge"
              : "retry";

        return JSON.stringify(await state.runtime.applyTeamPolicy(context.sessionID, {
          runId,
          roomCode,
          action: normalizedAction,
          targetAlias
        }), null, 2);
      }
    })
  } as const;

  const namespacedRelayTools = {
    "mcp__relay__room_create": relayTools.relay_room_create,
    "mcp__relay__room_join": relayTools.relay_room_join,
    "mcp__relay__room_status": relayTools.relay_room_status,
    "mcp__relay__room_send": relayTools.relay_room_send,
    "mcp__relay__room_members": relayTools.relay_room_members,
    "mcp__relay__room_set_role": relayTools.relay_room_set_role,
    "mcp__relay__thread_create": relayTools.relay_thread_create,
    "mcp__relay__thread_list": relayTools.relay_thread_list,
    "mcp__relay__message_list": relayTools.relay_message_list,
    "mcp__relay__message_send": relayTools.relay_message_send,
    "mcp__relay__message_mark_read": relayTools.relay_message_mark_read,
    "mcp__relay__transcript_export": relayTools.relay_transcript_export,
    "mcp__relay__team_start": relayTools.relay_team_start,
    "mcp__relay__team_status": relayTools.relay_team_status,
    "mcp__relay__team_intervene": relayTools.relay_team_intervene,
    "mcp__relay__team_apply_policy": relayTools.relay_team_apply_policy
  } as const;

  return {
    event: async ({ event }) => {
      if (event.type !== "session.status" && event.type !== "session.idle") {
        return;
      }

      const sessionID = tryExtractSessionID(event);
      if (!sessionID) {
        return;
      }

      const status = event.type === "session.idle" ? { type: "idle" as const } : event.properties.status;

      await state.runtime.onSessionStatus(sessionID, status);
    },
    tool: {
      ...relayTools,
      ...namespacedRelayTools
    },
    "tool.execute.before": async ({ tool, sessionID }, output) => {
      if (!getRelayToolSuffix(tool)) {
        return;
      }

      const args = (output.args ?? {}) as Record<string, unknown>;
      applyRelaySessionDefaults(tool, args, sessionID);
      output.args = args;
    },
    "tool.execute.after": async ({ tool }, _output) => {
      if (!getRelayToolSuffix(tool)) {
        return;
      }

      await state.runtime.flushPendingForKnownIdleSessions();
    },
    "experimental.session.compacting": async ({ sessionID }, output) => {
      output.context.push(...buildCompactionContext(state, sessionID));
    }
  };
};

export const server = RelayPlugin;
