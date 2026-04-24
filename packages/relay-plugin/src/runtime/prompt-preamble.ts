import type { RelayMessage } from "../internal/store/message-store.js";
import type { RelayRoomMemberRole } from "../internal/store/room-store.js";
import type { RelayThread } from "../internal/store/thread-store.js";
import { classifyRelayWorkflowSignal, relayWorkflowSignalPrefixes } from "./team-workflow.js";

type ManagerRelayWorkerLink = {
  alias: string;
  role: string;
  sessionID: string;
};

type ManagerRelayStatus = "ready" | "progress" | "blocked" | "done" | "note";

type ManagerRelaySummary = {
  sessionID: string;
  alias: string;
  role?: RelayRoomMemberRole;
  status: ManagerRelayStatus;
  note: string;
  seq: number;
  phase?: string;
  progress?: number;
  handoffTo?: string;
  deliverables?: string[];
};

function encodeDirectorySlug(value: string): string {
  return Buffer.from(value, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function createSessionHref(directory: string, sessionID: string): string {
  return `/${encodeDirectorySlug(directory)}/session/${sessionID}`;
}

function normalizeManagerNote(message: RelayMessage): string {
  const text = typeof message.body.text === "string" ? message.body.text.trim() : JSON.stringify(message.body, null, 2);
  return text.replace(/\s+/g, " ").trim();
}

function summarizeManagerMessage(message: RelayMessage, alias?: string, role?: RelayRoomMemberRole): ManagerRelaySummary {
  const text = typeof message.body.text === "string" ? message.body.text.trim() : JSON.stringify(message.body, null, 2);
  const signal = classifyRelayWorkflowSignal(text);

  if (signal.matched && signal.accepted) {
    const status = text.startsWith(relayWorkflowSignalPrefixes.ready)
      ? "ready"
      : text.startsWith(relayWorkflowSignalPrefixes.progress)
        ? "progress"
        : text.startsWith(relayWorkflowSignalPrefixes.blocker)
          ? "blocked"
          : "done";
    const handoffTo = typeof signal.metadata?.handoffTo === "string" ? signal.metadata.handoffTo : undefined;
    const deliverables = Array.isArray(signal.metadata?.deliverables)
      ? signal.metadata.deliverables.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
      : undefined;

    return {
      sessionID: message.senderSessionID,
      alias: alias ?? message.senderSessionID,
      role,
      status,
      note: signal.note,
      seq: message.seq,
      phase: signal.phase,
      progress: signal.progress,
      handoffTo,
      deliverables: deliverables && deliverables.length > 0 ? deliverables : undefined
    };
  }

  return {
    sessionID: message.senderSessionID,
    alias: alias ?? message.senderSessionID,
    role,
    status: "note",
    note: normalizeManagerNote(message),
    seq: message.seq
  };
}

function buildManagerSummaries(input: {
  messages: RelayMessage[];
  senderRoles: Record<string, RelayRoomMemberRole | undefined>;
  senderAliases?: Record<string, string | undefined>;
  workerLinks: ManagerRelayWorkerLink[];
}): ManagerRelaySummary[] {
  const bySessionID = new Map<string, ManagerRelaySummary>();
  for (const message of input.messages) {
    bySessionID.set(
      message.senderSessionID,
      summarizeManagerMessage(
        message,
        input.senderAliases?.[message.senderSessionID],
        input.senderRoles[message.senderSessionID]
      )
    );
  }

  const summaries: ManagerRelaySummary[] = [];
  for (const worker of input.workerLinks) {
    const summary = bySessionID.get(worker.sessionID);
    if (!summary) {
      continue;
    }
    summaries.push({
      ...summary,
      alias: worker.alias,
      role: summary.role,
      sessionID: worker.sessionID
    });
    bySessionID.delete(worker.sessionID);
  }

  for (const summary of [...bySessionID.values()].sort((left, right) => left.seq - right.seq)) {
    summaries.push(summary);
  }

  return summaries;
}

function renderManagerSummaryLine(summary: ManagerRelaySummary): string {
  const details = [
    summary.phase ? summary.phase : undefined,
    summary.progress !== undefined ? `${summary.progress}%` : undefined
  ].filter(Boolean).join(" · ");
  const status = summary.status === "note" ? "note" : summary.status;
  const prefix = `- ${summary.alias}: ${status}${details ? ` [${details}]` : ""}`;
  return `${prefix} - ${summary.note}`;
}

function buildManagerActionLines(summaries: ManagerRelaySummary[]): string[] {
  const actions: string[] = [];

  for (const summary of summaries) {
    if (summary.status === "blocked") {
      actions.push(`- ${summary.alias}: manager input needed - ${summary.note}`);
      continue;
    }

    if (summary.handoffTo && summary.handoffTo !== "manager") {
      const deliverables = summary.deliverables?.join(", ");
      actions.push(deliverables
        ? `- ${summary.alias}: suggested handoff to ${summary.handoffTo} - ${deliverables}`
        : `- ${summary.alias}: suggested handoff to ${summary.handoffTo}`);
    }
  }

  if (actions.length > 0) {
    return actions;
  }

  if (summaries.some((summary) => summary.status === "progress" || summary.status === "ready")) {
    return ["- no manager action yet; wait for more worker signals or open relay_team_status"];
  }

  if (summaries.length > 0 && summaries.every((summary) => summary.status === "done" || summary.status === "note")) {
    return ["- pass candidate; confirm with relay_team_status, then decide whether to clean up the team"];
  }

  return ["- open relay_team_status for the aggregate state if you need more context"];
}

function buildManagerThreadRelayPrompt(input: {
  roomCode: string;
  thread: RelayThread;
  recipientSessionID: string;
  messages: RelayMessage[];
  senderRoles: Record<string, RelayRoomMemberRole | undefined>;
  senderAliases?: Record<string, string | undefined>;
  directory: string;
  workerLinks: ManagerRelayWorkerLink[];
}): string {
  const workerLinkLine = input.workerLinks.length > 0
    ? input.workerLinks
      .map((worker) => `[${worker.alias}](${createSessionHref(input.directory, worker.sessionID)})`)
      .join(" | ")
    : "none";

  const summaries = buildManagerSummaries({
    messages: input.messages,
    senderRoles: input.senderRoles,
    senderAliases: input.senderAliases,
    workerLinks: input.workerLinks
  });
  const lines = summaries.map((summary) => renderManagerSummaryLine(summary));
  const actionLines = buildManagerActionLines(summaries);

  return [
    "[TEAM UPDATE]",
    `Room: ${input.roomCode}`,
    `Worker sessions: ${workerLinkLine}`,
    "Workers:",
    ...lines,
    "Action:",
    ...actionLines,
    "Details: use relay_team_status for the aggregate view; use transcripts only for raw thread content."
  ].join("\n\n");
}

function renderMessageBody(message: RelayMessage): string {
  const text = typeof message.body.text === "string" ? message.body.text : JSON.stringify(message.body, null, 2);
  return [`[seq:${message.seq}] sender=${message.senderSessionID} type=${message.messageType}`, text].join("\n");
}

function renderPrivateRelayMessage(message: RelayMessage): string {
  return typeof message.body.text === "string" ? message.body.text : JSON.stringify(message.body, null, 2);
}

export function buildTaskRelayPrompt(input: {
  sourceSessionID?: string;
  taskId: string;
  contextId?: string;
  content: string;
}): string {
  const header = [
    "[RELAYED AGENT INPUT]",
    "Sender: another agent (not a human user)",
    input.sourceSessionID ? `Source session: ${input.sourceSessionID}` : undefined,
    `Task ID: ${input.taskId}`,
    input.contextId ? `Context ID: ${input.contextId}` : undefined,
    "Response mode: use tools/workflow actions, not end-user chat replies"
  ].filter((value): value is string => Boolean(value));

  return [...header, "Task content:", input.content].join("\n\n");
}

export function buildThreadRelayPrompt(input: {
  roomCode: string;
  thread: RelayThread;
  roomKind?: "private" | "group";
  recipientSessionID: string;
  messages: RelayMessage[];
  senderRoles: Record<string, RelayRoomMemberRole | undefined>;
  senderAliases?: Record<string, string | undefined>;
  managerView?: {
    directory: string;
    workerLinks: ManagerRelayWorkerLink[];
  };
}): string {
  if (input.roomKind === "private" && input.thread.kind === "direct") {
    const latestSender = input.messages[input.messages.length - 1]?.senderSessionID ?? "unknown-session";
    const renderedMessages = input.messages.map((message) => renderPrivateRelayMessage(message)).join("\n\n");
    return [
      "[RELAYED AGENT INPUT]",
      `Sender: paired agent session ${latestSender} (not a human user)`,
      `Room: ${input.roomCode}`,
      "Response mode: use tools/workflow actions, not end-user chat replies",
      "Message:",
      renderedMessages
    ].join("\n\n");
  }

  if (input.managerView) {
    return buildManagerThreadRelayPrompt({
      roomCode: input.roomCode,
      thread: input.thread,
      recipientSessionID: input.recipientSessionID,
      messages: input.messages,
      senderRoles: input.senderRoles,
      senderAliases: input.senderAliases,
      directory: input.managerView.directory,
      workerLinks: input.managerView.workerLinks
    });
  }

  const header = [
    "[RELAYED AGENT INPUT]",
    "Sender: one or more relay agents (not human users)",
    `Room: ${input.roomCode}`,
    `Thread: ${input.thread.threadId} (${input.thread.kind})`,
    `Recipient session: ${input.recipientSessionID}`,
    "Response mode: use tools/workflow actions, not end-user chat replies"
  ];

  const renderedMessages = input.messages.map((message) => {
    const role = input.senderRoles[message.senderSessionID];
    const alias = input.senderAliases?.[message.senderSessionID];
    const meta = [
      role ? `sender_role=${role}` : undefined,
      alias ? `sender_alias=${alias}` : undefined
    ].filter(Boolean).join(" ");
    return [meta, renderMessageBody(message)].filter(Boolean).join("\n");
  });

  return [...header, "Messages:", ...renderedMessages].join("\n\n");
}
