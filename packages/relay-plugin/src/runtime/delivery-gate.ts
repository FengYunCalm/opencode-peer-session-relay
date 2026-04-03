import type { SessionStatus } from "@opencode-ai/sdk";

export type DeliveryDecision = {
  allowed: boolean;
  reason: string;
};

export function evaluateDelivery(status?: SessionStatus): DeliveryDecision {
  if (!status) {
    return { allowed: false, reason: "session status is unknown" };
  }

  if (status.type === "idle") {
    return { allowed: true, reason: "session is idle" };
  }

  if (status.type === "retry") {
    return { allowed: false, reason: `session is retrying (${status.attempt})` };
  }

  return { allowed: false, reason: "session is busy" };
}
