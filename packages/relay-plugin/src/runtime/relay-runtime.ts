import { existsSync } from "node:fs";
import { join } from "node:path";

import type { PluginInput } from "@opencode-ai/plugin";
import { type Artifact, jsonRpcRequestSchema, type JsonRpcId, type JsonRpcRequest, type Message, type Part, type Task, type TaskEvent } from "@opencode-peer-session-relay/a2a-protocol";
import type { SessionStatus } from "@opencode-ai/sdk";

import { buildRelayAgentCard } from "../a2a/agent-card.js";
import { createCancelTaskHandler } from "../a2a/handlers/cancel-task.js";
import { createGetTaskHandler } from "../a2a/handlers/get-task.js";
import { createSendMessageHandler } from "../a2a/handlers/send-message.js";
import { createSendMessageStreamHandler } from "../a2a/handlers/send-message-stream.js";
import { cancelTaskParamsSchema, getTaskParamsSchema, type InboundRelayRequest } from "../a2a/mapper/inbound-request.js";
import { mapTaskStatusEvent, TaskEventHub } from "../a2a/mapper/outbound-events.js";
import type { A2AHostResponse, JsonValue } from "../a2a/host.js";
import { createRelayOpsMcpServer, type RelayOpsMcp } from "../internal/mcp/server.js";
import { AuditStore } from "../internal/store/audit-store.js";
import { SessionLinkStore } from "../internal/store/session-link-store.js";
import { TaskStore, type StoredRelayTask } from "../internal/store/task-store.js";
import type { RelayPluginConfig } from "../config.js";
import { evaluateDelivery } from "./delivery-gate.js";
import { HumanGuard } from "./human-guard.js";
import { SessionInjector } from "./injector.js";
import { LoopGuard } from "./loop-guard.js";
import { ResponseObserver } from "./response-observer.js";
import type { SessionRegistry } from "./session-registry.js";
import { isRelayPairAllowed } from "../config.js";
import { RoomStore } from "../internal/store/room-store.js";

function jsonRpcSuccess(id: JsonRpcId, result: JsonValue): JsonValue {
  return {
    jsonrpc: "2.0",
    id,
    result
  };
}

function jsonRpcError(id: JsonRpcId | null, code: number, message: string, data?: JsonValue): JsonValue {
  return {
    jsonrpc: "2.0",
    id,
    error: {
      code,
      message,
      data: data ?? null
    }
  };
}

function renderMessagePart(message: Message): string {
  return message.parts
    .map((part) => {
      if ("text" in part) {
        return part.text;
      }
      if ("data" in part) {
        return JSON.stringify(part.data, null, 2);
      }
      if ("url" in part) {
        return `Resource URL: ${part.url}`;
      }
      return part.raw;
    })
    .join("\n\n");
}

function buildTaskPrompt(task: StoredRelayTask): string {
  const requestMessage = task.history[0];
  if (!requestMessage) {
    return `A2A task ${task.taskId} arrived without a request body.`;
  }

  const sourceSessionID = typeof task.metadata.sourceSessionID === "string" ? task.metadata.sourceSessionID : undefined;
  const sections = [
    "An A2A request has been delegated to this OpenCode session.",
    sourceSessionID ? `Source Session ID: ${sourceSessionID}` : undefined,
    `Task ID: ${task.taskId}`,
    task.contextId ? `Context ID: ${task.contextId}` : undefined,
    "Requester content:",
    renderMessagePart(requestMessage)
  ].filter((value): value is string => Boolean(value));

  return sections.join("\n\n");
}

function isTaskForSession(task: StoredRelayTask, sessionID: string): boolean {
  return task.metadata.sessionID === sessionID;
}

function sanitizePart(part: Part): Part {
  return {
    ...part,
    metadata: {}
  };
}

function sanitizeMessage(message: Message | undefined): JsonValue {
  if (!message) {
    return null;
  }

  return {
    ...message,
    metadata: {},
    parts: message.parts.map((part) => sanitizePart(part))
  } as JsonValue;
}

function sanitizeArtifact(artifact: Artifact): JsonValue {
  return {
    ...artifact,
    metadata: {},
    parts: artifact.parts.map((part) => sanitizePart(part))
  } as JsonValue;
}

function sanitizePublicTask(task: Task | StoredRelayTask | null): JsonValue {
  if (!task) {
    return null;
  }

  return {
    ...task,
    metadata: {},
    latestMessage: sanitizeMessage(task.latestMessage) as Task["latestMessage"],
    history: task.history.map((message) => sanitizeMessage(message)) as Task["history"],
    artifacts: task.artifacts.map((artifact) => sanitizeArtifact(artifact)) as Task["artifacts"]
  } as JsonValue;
}

export class RelayRuntime {
  readonly taskStore: TaskStore;
  readonly auditStore: AuditStore;
  readonly sessionLinkStore: SessionLinkStore;
  readonly eventHub = new TaskEventHub();
  readonly humanGuard = new HumanGuard();
  readonly loopGuard = new LoopGuard();
  readonly injector: SessionInjector;
  readonly observer: ResponseObserver;
  readonly sessionRegistry: SessionRegistry;
  readonly roomStore: RoomStore;

  private readonly sendMessage;
  private readonly sendMessageStream;
  private readonly getTask;
  private readonly cancelTask;

  constructor(
    private readonly input: PluginInput,
    private readonly config: RelayPluginConfig,
    sessionRegistry: SessionRegistry
  ) {
    this.sessionRegistry = sessionRegistry;
    const databasePath = config.runtime.databasePath
      ?? (existsSync(input.directory) ? join(input.directory, ".opencode-a2a-relay.sqlite") : ":memory:");
    this.taskStore = new TaskStore(databasePath);
    this.auditStore = new AuditStore(databasePath);
    this.sessionLinkStore = new SessionLinkStore(databasePath);
    this.roomStore = new RoomStore(databasePath);
    this.injector = new SessionInjector(input.client);
    this.observer = new ResponseObserver(this.taskStore, this.auditStore, this.sessionLinkStore, this.eventHub);

    const sendMessageDependencies = {
      taskStore: this.taskStore,
      auditStore: this.auditStore,
      sessionLinkStore: this.sessionLinkStore,
      eventHub: this.eventHub,
      humanGuard: this.humanGuard,
      loopGuard: this.loopGuard,
      routeGuard: async (request: InboundRelayRequest) => this.assertRouteAllowed(request),
      executor: {
        dispatch: async (request: InboundRelayRequest & { taskId: string }) => this.dispatchTask(request)
      }
    };

    this.sendMessage = createSendMessageHandler(sendMessageDependencies);
    this.sendMessageStream = createSendMessageStreamHandler(sendMessageDependencies, this.eventHub);
    this.getTask = createGetTaskHandler(this.taskStore);
    this.cancelTask = createCancelTaskHandler(this.taskStore, this.auditStore, this.eventHub);
  }

  close(): void {
    this.taskStore.close();
    this.auditStore.close();
    this.roomStore.close();
    this.sessionLinkStore.close();
  }

  buildAgentCard(url?: string): JsonValue {
    return buildRelayAgentCard({
      config: this.config,
      version: "0.1.0",
      url
    }) as unknown as JsonValue;
  }

  createInternalOpsMcp(): RelayOpsMcp {
    return createRelayOpsMcpServer(this.taskStore, this.auditStore, {
      replayTask: async (taskId) => this.replayTask(taskId)
    });
  }

  async handleJsonRpc(payload: unknown): Promise<A2AHostResponse> {
    const parsedRequest = jsonRpcRequestSchema.safeParse(payload);
    if (!parsedRequest.success) {
      return {
        kind: "json",
        statusCode: 400,
        body: jsonRpcError(null, -32600, "Invalid JSON-RPC request", parsedRequest.error.flatten() as unknown as JsonValue)
      };
    }

    const request = parsedRequest.data;

    try {
      switch (request.method) {
        case "sendMessage": {
          const task = await this.sendMessage(request);
          return {
            kind: "json",
            body: jsonRpcSuccess(request.id, { task: sanitizePublicTask(task) })
          };
        }
        case "sendMessageStream": {
          const streamRequest: JsonRpcRequest = {
            ...request,
            method: "sendMessage"
          };
          const result = await this.sendMessageStream(streamRequest);
          return {
            kind: "sse",
            events: this.streamTaskEvents(request.id, result.task, result.events)
          };
        }
        case "getTask": {
          const params = getTaskParamsSchema.parse(request.params ?? {});
          const task = this.getTask(params.taskId) ?? null;
          return {
            kind: "json",
            body: jsonRpcSuccess(request.id, { task: sanitizePublicTask(task) })
          };
        }
        case "cancelTask": {
          const params = cancelTaskParamsSchema.parse(request.params ?? {});
          const task = this.cancelTask(params.taskId);
          return {
            kind: "json",
            body: jsonRpcSuccess(request.id, { task: sanitizePublicTask(task) })
          };
        }
        default:
          return {
            kind: "json",
            statusCode: 404,
            body: jsonRpcError(request.id, -32601, `Unsupported method: ${request.method}`)
          };
      }
    } catch (error) {
      return {
        kind: "json",
        statusCode: 500,
        body: jsonRpcError(
          request.id,
          -32603,
          error instanceof Error ? error.message : "Internal server error"
        )
      };
    }
  }

  async onSessionStatus(sessionID: string, status: SessionStatus): Promise<void> {
    this.sessionRegistry.upsert({
      sessionID,
      status,
      updatedAt: Date.now()
    });

    const nextTask = this.taskStore
      .listActiveTasks()
      .filter((task) => task.status === "submitted" && isTaskForSession(task, sessionID))
      .sort((left, right) => left.updatedAt - right.updatedAt)[0];

    if (status.type !== "idle") {
      if (nextTask) {
        this.observer.updateStatus(nextTask.taskId, "working");
      }
      return;
    }

    if (this.humanGuard.isPaused(sessionID)) {
      return;
    }

    if (!nextTask) {
      return;
    }

    await this.dispatchStoredTask(nextTask, sessionID);
  }

  async sendRoomMessage(sourceSessionID: string, message: string): Promise<{
    peerSessionID: string;
    roomCode: string;
    accepted: boolean;
    reason?: string;
  }> {
    const room = this.roomStore.getRoomBySession(sourceSessionID);
    if (!room) {
      throw new Error(`No relay room is bound to session ${sourceSessionID}.`);
    }

    const peerSessionID = this.roomStore.getPeerSessionID(sourceSessionID);
    if (!peerSessionID) {
      throw new Error(`Room ${room.roomCode} does not have a connected peer yet.`);
    }

    if (this.humanGuard.isPaused(peerSessionID)) {
      return {
        peerSessionID,
        roomCode: room.roomCode,
        accepted: false,
        reason: this.humanGuard.reason(peerSessionID) ?? "peer session is paused by human takeover"
      };
    }

    const knownStatus = this.sessionRegistry.get(peerSessionID)?.status;
    if (knownStatus && knownStatus.type !== "idle") {
      return {
        peerSessionID,
        roomCode: room.roomCode,
        accepted: false,
        reason: evaluateDelivery(knownStatus).reason
      };
    }

    const relayPrompt = [
      `Relayed from paired session ${sourceSessionID}.`,
      `Room code: ${room.roomCode}`,
      "Incoming message:",
      message
    ].join("\n\n");

    await this.injector.submitAsync(peerSessionID, relayPrompt);

    return {
      peerSessionID,
      roomCode: room.roomCode,
      accepted: true
    };
  }

  async replayTask(taskId: string): Promise<StoredRelayTask | undefined> {
    const existing = this.taskStore.getTask(taskId);
    if (!existing) {
      return undefined;
    }

    if (!["failed", "canceled"].includes(existing.status)) {
      throw new Error(`Task ${taskId} is not replayable from status ${existing.status}.`);
    }

    const replayed = this.taskStore.updateStatus(taskId, "submitted", existing.latestMessage);
    this.auditStore.append(taskId, "task.replayed", {});
    this.eventHub.emit(taskId, mapTaskStatusEvent(replayed));

    const sessionID = this.sessionLinkStore.getSessionID(taskId) ?? (typeof replayed.metadata.sessionID === "string" ? replayed.metadata.sessionID : undefined);
    if (!sessionID) {
      return replayed;
    }

    if (this.sessionRegistry.get(sessionID)?.status?.type === "idle" && !this.humanGuard.isPaused(sessionID)) {
      await this.dispatchStoredTask(replayed, sessionID);
      return this.taskStore.getTask(taskId);
    }

    return replayed;
  }

  private async dispatchTask(request: InboundRelayRequest & { taskId: string }): Promise<{ sessionID?: string }> {
    const task = this.taskStore.getTask(request.taskId);
    if (!task) {
      throw new Error(`Task not found: ${request.taskId}`);
    }

    const sessionID = request.sessionID ?? (typeof task.metadata.sessionID === "string" ? task.metadata.sessionID : undefined);
    if (!sessionID) {
      throw new Error("sessionID is required to dispatch a relay task.");
    }

    return this.dispatchStoredTask(task, sessionID);
  }

  private async dispatchStoredTask(task: StoredRelayTask, sessionID: string): Promise<{ sessionID: string }> {
    const decision = evaluateDelivery(this.sessionRegistry.get(sessionID)?.status);
    if (!decision.allowed) {
      this.auditStore.append(task.taskId, "task.deferred", {
        sessionID,
        reason: decision.reason
      });
      return { sessionID };
    }

    try {
      await this.injector.submitAsync(sessionID, buildTaskPrompt(task));
      this.observer.accept(task.taskId, sessionID);
      this.auditStore.append(task.taskId, "task.dispatched", { sessionID });
      return { sessionID };
    } catch (error) {
      this.auditStore.append(task.taskId, "task.dispatch_failed", {
        sessionID,
        message: error instanceof Error ? error.message : "unknown error"
      });
      this.taskStore.updateStatus(task.taskId, "failed");
      throw error;
    }
  }

  private assertRouteAllowed(request: InboundRelayRequest): void {
    if (isRelayPairAllowed(this.config, request.sourceSessionID, request.sessionID)) {
      return;
    }

    if (request.sourceSessionID && request.sessionID && this.roomStore.areSessionsPaired(request.sourceSessionID, request.sessionID)) {
      return;
    }

    throw new Error(
      this.config.routing.mode === "pair"
        ? `Relay pair is not allowed: ${request.sourceSessionID ?? "unknown-source"} -> ${request.sessionID ?? "unknown-target"}`
        : "Relay route is not allowed"
    );
  }

  private async *streamTaskEvents(id: JsonRpcId, task: Task, events: AsyncIterable<TaskEvent>): AsyncIterable<JsonValue> {
    yield jsonRpcSuccess(id, { task: sanitizePublicTask(task) });
    for await (const event of events) {
      yield {
        jsonrpc: "2.0",
        method: "task.event",
        params: event
      } as JsonValue;
    }
  }
}
