import type { RelayTeamWorkerStatus } from "../store/team-store.js";

const allowedSignalTransitions: Record<RelayTeamWorkerStatus, RelayTeamWorkerStatus[]> = {
  created: ["ready", "in_progress", "blocked", "completed"],
  bootstrapped: ["ready", "in_progress", "blocked", "completed"],
  joined: ["ready", "in_progress", "blocked", "completed"],
  ready: ["ready", "in_progress", "blocked", "completed"],
  in_progress: ["in_progress", "blocked", "completed"],
  blocked: ["blocked", "in_progress", "completed"],
  completed: ["completed"],
  failed: ["failed"]
};

export function validateWorkerSignalTransition(currentStatus: RelayTeamWorkerStatus, nextStatus: RelayTeamWorkerStatus): { accepted: boolean; rejectionReason?: string } {
  const allowedTargets = allowedSignalTransitions[currentStatus] ?? [];
  if (allowedTargets.includes(nextStatus)) {
    return { accepted: true };
  }

  return {
    accepted: false,
    rejectionReason: `worker transition ${currentStatus} -> ${nextStatus} is not allowed`
  };
}
