import type { PluginInput } from "@opencode-ai/plugin";

import type { RelayTeamWorkerStatus } from "../internal/store/team-store.js";
import type { RelayRuntime } from "./relay-runtime.js";

type TextPartInput = {
  type: "text";
  text: string;
};

type TeamSessionRecord = {
  role: string;
  alias: string;
  sessionID: string;
  title: string;
};

type TeamBootstrapResult = {
  runId: string;
  task: string;
  roomCode: string;
  roomKind: "group";
  managerSessionID: string;
  status: string;
  workerSessions: TeamSessionRecord[];
  nextStep: string;
};

type SessionCreateResponseLike = {
  data?: {
    id?: string;
    title?: string;
  };
};

type SessionApi = {
  create(options?: {
    body?: {
      title?: string;
    };
    query?: {
      directory?: string;
    };
  }): Promise<SessionCreateResponseLike>;
  promptAsync(options: {
    path: { id: string };
    body: {
      noReply?: boolean;
      agent?: string;
      system?: string;
      parts: TextPartInput[];
    };
  }): Promise<unknown>;
};

type TeamWorkerSpec = {
  role: "planner" | "implementer" | "reviewer";
  alias: string;
  mission: string;
};

const defaultWorkerSpecs: TeamWorkerSpec[] = [
  {
    role: "planner",
    alias: "planner",
    mission: "Break the task into a minimal executable plan, post it to the room, and keep planning scoped and concrete."
  },
  {
    role: "implementer",
    alias: "implementer",
    mission: "Drive the first concrete implementation slice that is already clear; if something blocks execution, ask in the room instead of guessing."
  },
  {
    role: "reviewer",
    alias: "reviewer",
    mission: "Define review criteria, inspect proposed implementation directions, and challenge unsafe or weak steps before they spread."
  }
];

export const relayWorkflowSignalPrefixes = {
  ready: "[TEAM_READY]",
  progress: "[TEAM_PROGRESS]",
  blocker: "[TEAM_BLOCKER]",
  done: "[TEAM_DONE]"
} as const;

type RelayWorkflowSignalPayload = {
  source?: string;
  phase?: string;
  note: string;
  progress?: number;
  evidence?: unknown;
  metadata?: Record<string, unknown>;
};

type RelayWorkflowSignalClassification = {
  matched: boolean;
  accepted: boolean;
  rejectionReason?: string;
  status: RelayTeamWorkerStatus;
  note: string;
  ready: boolean;
  source?: string;
  phase?: string;
  progress?: number;
  evidence?: unknown;
  metadata?: Record<string, unknown>;
};

const workflowSignalReservedKeys = new Set(["source", "phase", "note", "summary", "progress", "evidence"]);

function normalizeSignalPayload(raw: string): RelayWorkflowSignalPayload {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { note: "" };
  }

  if (!trimmed.startsWith("{")) {
    return { note: trimmed };
  }

  try {
    const parsed = JSON.parse(trimmed) as Record<string, unknown>;
    const note = typeof parsed.note === "string"
      ? parsed.note.trim()
      : typeof parsed.summary === "string"
        ? parsed.summary.trim()
        : trimmed;
    const source = typeof parsed.source === "string" && parsed.source.trim().length > 0
      ? parsed.source.trim().toLowerCase()
      : undefined;
    const phase = typeof parsed.phase === "string" && parsed.phase.trim().length > 0
      ? parsed.phase.trim()
      : undefined;
    const progress = typeof parsed.progress === "number" && Number.isFinite(parsed.progress)
      ? Math.max(0, Math.min(100, Math.round(parsed.progress)))
      : undefined;
    const metadata = Object.fromEntries(
      Object.entries(parsed).filter(([key]) => !workflowSignalReservedKeys.has(key))
    );

    return {
      source,
      phase,
      note,
      progress,
      evidence: parsed.evidence,
      metadata: Object.keys(metadata).length > 0 ? metadata : undefined
    };
  } catch {
    return { note: trimmed };
  }
}

function validateWorkflowSignal(prefix: string, payload: RelayWorkflowSignalPayload): { accepted: boolean; rejectionReason?: string } {
  const note = payload.note.trim();
  if (!note) {
    return { accepted: false, rejectionReason: `${prefix} requires a non-empty note` };
  }

  if (prefix === relayWorkflowSignalPrefixes.ready) {
    return { accepted: true };
  }

  if (!payload.source) {
    return { accepted: false, rejectionReason: `${prefix} requires source` };
  }

  if (!payload.phase) {
    return { accepted: false, rejectionReason: `${prefix} requires phase` };
  }

  if (prefix === relayWorkflowSignalPrefixes.done) {
    const hasEvidence = Array.isArray(payload.evidence)
      ? payload.evidence.length > 0
      : payload.evidence !== undefined && payload.evidence !== null;
    const deliverables = payload.metadata?.deliverables;
    const hasDeliverables = Array.isArray(deliverables) && deliverables.length > 0;

    if (!hasEvidence && !hasDeliverables) {
      return { accepted: false, rejectionReason: `${prefix} requires evidence or deliverables` };
    }
  }

  return { accepted: true };
}

export function classifyRelayWorkflowSignal(message: string): RelayWorkflowSignalClassification {
  const normalized = message.trim();
  if (normalized.startsWith(relayWorkflowSignalPrefixes.blocker)) {
    const payload = normalizeSignalPayload(normalized.slice(relayWorkflowSignalPrefixes.blocker.length));
    const validation = validateWorkflowSignal(relayWorkflowSignalPrefixes.blocker, payload);
    return {
      matched: true,
      accepted: validation.accepted,
      rejectionReason: validation.rejectionReason,
      status: "blocked",
      note: payload.note || normalized,
      ready: false,
      source: payload.source,
      phase: payload.phase,
      progress: payload.progress,
      evidence: payload.evidence,
      metadata: payload.metadata
    };
  }
  if (normalized.startsWith(relayWorkflowSignalPrefixes.done)) {
    const payload = normalizeSignalPayload(normalized.slice(relayWorkflowSignalPrefixes.done.length));
    const validation = validateWorkflowSignal(relayWorkflowSignalPrefixes.done, payload);
    return {
      matched: true,
      accepted: validation.accepted,
      rejectionReason: validation.rejectionReason,
      status: "completed",
      note: payload.note || normalized,
      ready: true,
      source: payload.source,
      phase: payload.phase,
      progress: payload.progress,
      evidence: payload.evidence,
      metadata: payload.metadata
    };
  }
  if (normalized.startsWith(relayWorkflowSignalPrefixes.progress)) {
    const payload = normalizeSignalPayload(normalized.slice(relayWorkflowSignalPrefixes.progress.length));
    const validation = validateWorkflowSignal(relayWorkflowSignalPrefixes.progress, payload);
    return {
      matched: true,
      accepted: validation.accepted,
      rejectionReason: validation.rejectionReason,
      status: "in_progress",
      note: payload.note || normalized,
      ready: true,
      source: payload.source,
      phase: payload.phase,
      progress: payload.progress,
      evidence: payload.evidence,
      metadata: payload.metadata
    };
  }
  if (normalized.startsWith(relayWorkflowSignalPrefixes.ready)) {
    const payload = normalizeSignalPayload(normalized.slice(relayWorkflowSignalPrefixes.ready.length));
    const validation = validateWorkflowSignal(relayWorkflowSignalPrefixes.ready, payload);
    return {
      matched: true,
      accepted: validation.accepted,
      rejectionReason: validation.rejectionReason,
      status: "ready",
      note: payload.note || normalized,
      ready: true,
      source: payload.source,
      phase: payload.phase,
      progress: payload.progress,
      evidence: payload.evidence,
      metadata: payload.metadata
    };
  }
  return {
    matched: false,
    accepted: false,
    status: "joined",
    note: normalized,
    ready: false
  };
}

function ensureSessionApi(client: PluginInput["client"]): SessionApi {
  const session = (client as { session?: Partial<SessionApi> }).session;
  if (!session?.create || !session.promptAsync) {
    throw new Error("Current OpenCode plugin client does not expose session.create + session.promptAsync; team bootstrap requires the session API.");
  }

  return session as SessionApi;
}

function extractCreatedSessionID(result: SessionCreateResponseLike, fallbackTitle: string): { sessionID: string; title: string } {
  const session = result?.data;
  if (!session?.id) {
    throw new Error(`OpenCode session.create did not return a session id for ${fallbackTitle}.`);
  }

  return {
    sessionID: session.id,
    title: session.title ?? fallbackTitle
  };
}

function summarizeTask(task: string): string {
  const normalized = task.replace(/\s+/g, " ").trim();
  return normalized.length <= 48 ? normalized : `${normalized.slice(0, 45)}...`;
}

function buildSessionTitle(role: TeamWorkerSpec["role"], task: string): string {
  return `team/${role}: ${summarizeTask(task)}`;
}

function buildWorkerBootstrapPrompt(spec: TeamWorkerSpec, task: string, roomCode: string, managerSessionID: string): string {
  const roleWorkflowGuidance = spec.role === "planner"
    ? "Prefer OpenSpec commands/MCP or locally exposed OpenSpec skills to produce proposal/spec/design/tasks artifacts for this change."
    : spec.role === "implementer"
      ? "Prefer Superpowers-style execution skills already exposed in this session, especially writing-plans / executing-plans / subagent-driven-development style flows when available."
      : "Prefer OMO review/orchestration capabilities already exposed in this session for review, escalation, and quality-focused analysis. Use Superpowers review gates if they are exposed here. Keep interim review on [TEAM_PROGRESS] or [TEAM_BLOCKER], and only emit [TEAM_DONE] when final independent acceptance passes with phase \"final-acceptance-pass\".";

  return [
    `You are the ${spec.role} worker in a relay-backed OpenCode workflow team.`,
    "",
    "Task context:",
    `- Task: ${task}`,
    `- Manager session: ${managerSessionID}`,
    `- Relay room code: ${roomCode}`,
    `- Required alias: ${spec.alias}`,
    "",
    "Bootstrap checklist:",
    "1. Load the `relay-room` skill.",
    `2. Join the relay group room using alias \"${spec.alias}\" via relay_room_join or mcp__relay__room_join. Do not pass sessionID manually.`,
    `3. Send one short ready message to the room after joining using the prefix ${relayWorkflowSignalPrefixes.ready}.`,
    `4. Mission: ${spec.mission}`,
    "",
    "Role guidance:",
    `- Tooling: ${roleWorkflowGuidance}`,
    "- Coordination: Use tools and workflow actions when coordinating through relay messages; do not treat relay input as an end-user chat.",
    "- Capability scope: You may use any actually available local skills/plugins/workflows in this session, especially OpenSpec, Superpowers, and OMO if they are exposed here. BMAD remains optional planning-mode only if actually exposed and the task is large enough.",
    "- Failure mode: If relay tools or required workflow capabilities are missing, report that plainly in your own session instead of inventing success.",
    "",
    "Signal protocol:",
    `${relayWorkflowSignalPrefixes.ready} short ready confirmation after join`,
    `${relayWorkflowSignalPrefixes.progress} JSON payload for structured progress/evidence after real work has started`,
    `${relayWorkflowSignalPrefixes.blocker} JSON payload describing what is blocked and what is needed`,
    `${relayWorkflowSignalPrefixes.done} JSON payload for final completion handoff`,
    "Use this exact JSON shape after the [TEAM_*] prefix:",
    "{\"source\":\"openspec|superpowers|omo\",\"phase\":\"...\",\"note\":\"...\",\"progress\":40,\"evidence\":[\"artifact-1\",\"artifact-2\"],\"handoffTo\":\"manager\",\"deliverables\":[\"spec.md\"]}",
    "Low-quality signals are ignored by the runtime."
  ].join("\n");
}

export async function bootstrapRelayWorkflowTeam(input: PluginInput, runtime: RelayRuntime, managerSessionID: string, task: string): Promise<TeamBootstrapResult> {
  const normalizedTask = task.trim();
  if (!normalizedTask) {
    throw new Error("Team bootstrap requires a non-empty task.");
  }

  const sessionApi = ensureSessionApi(input.client);
  const room = runtime.createRoom(managerSessionID, "group", { reuseExisting: false });
  const teamRun = runtime.teamStore.createRun({
    managerSessionID,
    roomCode: room.roomCode,
    task: normalizedTask
  });
  runtime.auditStore.append(teamRun.runId, "team.run.created", {
    managerSessionID,
    roomCode: room.roomCode,
    task: normalizedTask
  });

  const workerSessions: TeamSessionRecord[] = [];

  try {
    for (const spec of defaultWorkerSpecs) {
      const fallbackTitle = buildSessionTitle(spec.role, normalizedTask);
      const created = await sessionApi.create({
        body: {
          title: fallbackTitle
        },
        query: {
          directory: input.directory
        }
      });
      const { sessionID, title } = extractCreatedSessionID(created, fallbackTitle);
      runtime.teamStore.addWorker({
        runId: teamRun.runId,
        sessionID,
        role: spec.role,
        alias: spec.alias,
        title,
        lastNote: "session created"
      });
      runtime.auditStore.append(teamRun.runId, "team.worker.created", {
        sessionID,
        role: spec.role,
        alias: spec.alias,
        title
      });
      workerSessions.push({
        role: spec.role,
        alias: spec.alias,
        sessionID,
        title
      });
    }
  } catch (error) {
    runtime.teamStore.markRunFailed(teamRun.runId);
    runtime.auditStore.append(teamRun.runId, "team.run.failed", {
      stage: "session-create",
      message: error instanceof Error ? error.message : "unknown error"
    });
    throw error;
  }

  let currentWorkerSessionID: string | undefined;
  try {
    for (const worker of workerSessions) {
      const spec = defaultWorkerSpecs.find((item) => item.role === worker.role);
      if (!spec) {
        continue;
      }
      currentWorkerSessionID = worker.sessionID;

      await sessionApi.promptAsync({
        path: { id: worker.sessionID },
        body: {
          parts: [
            {
              type: "text",
              text: buildWorkerBootstrapPrompt(spec, normalizedTask, room.roomCode, managerSessionID)
            }
          ]
        }
      });
      runtime.teamStore.markWorkerBootstrapped(worker.sessionID);
      runtime.auditStore.append(teamRun.runId, "team.worker.bootstrapped", {
        sessionID: worker.sessionID,
        role: worker.role,
        alias: worker.alias
      });
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "worker bootstrap failed";
    if (currentWorkerSessionID) {
      runtime.teamStore.markWorkerFailed(currentWorkerSessionID, message, room.roomCode);
      runtime.auditStore.append(teamRun.runId, "team.worker.failed", {
        sessionID: currentWorkerSessionID,
        stage: "bootstrap",
        message
      });
    }
    runtime.teamStore.markRunFailed(teamRun.runId);
    runtime.auditStore.append(teamRun.runId, "team.run.failed", {
      stage: "bootstrap",
      message
    });
    throw error;
  }

  const teamStatus = runtime.getTeamStatus(managerSessionID, teamRun.runId, room.roomCode);

  return {
    runId: teamRun.runId,
    task: normalizedTask,
    roomCode: room.roomCode,
    roomKind: "group",
    managerSessionID,
    status: teamStatus.status,
    workerSessions,
    nextStep: "Workers were created as root OpenCode sessions and bootstrapped asynchronously. Stay in the current session as manager and use relay_team_status plus normal relay plugin tools to monitor or coordinate the room."
  };
}
