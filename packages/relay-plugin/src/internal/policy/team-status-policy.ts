import type { RelayTeamRunStatus, RelayTeamWorker } from "../store/team-store.js";

export function reviewerFinalAcceptanceSatisfied(workers: RelayTeamWorker[]): boolean {
  const reviewers = workers.filter((worker) => worker.role === "reviewer");
  if (reviewers.length === 0) {
    return true;
  }

  return reviewers.every((worker) => worker.status === "completed" && worker.workflowPhase === "final-acceptance-pass");
}

export function aggregateTeamRunStatus(workers: RelayTeamWorker[], currentStatus?: RelayTeamRunStatus): RelayTeamRunStatus {
  if (workers.length > 0 && workers.every((worker) => !!worker.cleanedUpAt)) {
    return "cleaned_up";
  }

  const reviewerGateSatisfied = reviewerFinalAcceptanceSatisfied(workers);

  if (currentStatus === "failed") {
    return currentStatus;
  }

  if (currentStatus === "cleaned_up") {
    return currentStatus;
  }

  if (currentStatus === "completed" && reviewerGateSatisfied && workers.every((worker) => worker.status === "completed")) {
    return currentStatus;
  }

  if (workers.length === 0) {
    return "bootstrapping";
  }

  if (workers.some((worker) => worker.status === "failed")) {
    return "failed";
  }

  if (workers.some((worker) => worker.status === "blocked")) {
    return "blocked";
  }

  const allNonReviewerWorkersCompleted = workers
    .filter((worker) => worker.role !== "reviewer")
    .every((worker) => worker.status === "completed");

  if (workers.every((worker) => worker.status === "completed")) {
    return reviewerGateSatisfied ? "completed" : "in_progress";
  }

  if (allNonReviewerWorkersCompleted && !reviewerGateSatisfied) {
    return "in_progress";
  }

  if (workers.some((worker) => worker.status === "in_progress")) {
    return "in_progress";
  }

  if (workers.every((worker) => ["ready", "completed"].includes(worker.status))) {
    return "ready";
  }

  if (workers.some((worker) => ["created", "bootstrapped", "joined"].includes(worker.status))) {
    return "waiting";
  }

  return "bootstrapping";
}
