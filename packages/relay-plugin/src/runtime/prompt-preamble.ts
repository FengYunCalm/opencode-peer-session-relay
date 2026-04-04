import type { RelayMessage } from "../internal/store/message-store.js";
import type { RelayRoomMemberRole } from "../internal/store/room-store.js";
import type { RelayThread } from "../internal/store/thread-store.js";

function renderMessageBody(message: RelayMessage): string {
  const text = typeof message.body.text === "string" ? message.body.text : JSON.stringify(message.body, null, 2);
  return [`[seq:${message.seq}] sender=${message.senderSessionID} type=${message.messageType}`, text].join("\n");
}

export function buildTaskRelayPrompt(input: {
  sourceSessionID?: string;
  taskId: string;
  contextId?: string;
  content: string;
}): string {
  const header = [
    "[AGENT RELAY MESSAGE]",
    "You are receiving a relayed agent-to-agent task input.",
    "The sender is another agent, not a human user.",
    input.sourceSessionID ? `Source Session ID: ${input.sourceSessionID}` : undefined,
    `Task ID: ${input.taskId}`,
    input.contextId ? `Context ID: ${input.contextId}` : undefined,
    "Treat the content below as collaborative agent context."
  ].filter((value): value is string => Boolean(value));

  return [...header, "---", input.content].join("\n\n");
}

export function buildThreadRelayPrompt(input: {
  roomCode: string;
  thread: RelayThread;
  recipientSessionID: string;
  messages: RelayMessage[];
  senderRoles: Record<string, RelayRoomMemberRole | undefined>;
  senderAliases?: Record<string, string | undefined>;
}): string {
  const header = [
    "[AGENT RELAY MESSAGE]",
    "You are receiving relayed collaboration messages from another agent through the durable relay warehouse.",
    "The senders are agents, not human users.",
    `Room Code: ${input.roomCode}`,
    `Thread ID: ${input.thread.threadId}`,
    `Thread Kind: ${input.thread.kind}`,
    `Recipient Session ID: ${input.recipientSessionID}`,
    "Read the messages below and continue working from them instead of treating them as direct user chat."
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

  return [...header, "---", ...renderedMessages].join("\n\n");
}
