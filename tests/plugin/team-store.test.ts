import { afterEach, describe, expect, it } from "vitest";

import { TeamStore } from "../support/relay-plugin-testkit.js";
import { cleanupDatabaseLocation, createTestDatabaseLocation } from "./test-db.js";

const dbLocations: string[] = [];
const stores: TeamStore[] = [];

afterEach(() => {
  stores.splice(0).forEach((store) => store.close());
  dbLocations.splice(0).forEach(cleanupDatabaseLocation);
});

describe("team run completion gate", () => {
  it("does not mark the run completed before reviewer final acceptance", () => {
    const databasePath = createTestDatabaseLocation("team-store-review-gate");
    dbLocations.push(databasePath);

    const store = new TeamStore(databasePath);
    stores.push(store);

    const run = store.createRun({
      managerSessionID: "session-manager",
      roomCode: "room-acceptance",
      task: "verify acceptance gate"
    });

    store.addWorker({ runId: run.runId, sessionID: "session-planner", role: "planner", alias: "planner", title: "planner" });
    store.addWorker({ runId: run.runId, sessionID: "session-implementer", role: "implementer", alias: "implementer", title: "implementer" });
    store.addWorker({ runId: run.runId, sessionID: "session-reviewer", role: "reviewer", alias: "reviewer", title: "reviewer" });

    store.markWorkerSignal("session-planner", "room-acceptance", {
      status: "completed",
      ready: true,
      source: "superpowers",
      phase: "planning-complete",
      evidence: ["plan-ready"]
    });

    store.markWorkerSignal("session-implementer", "room-acceptance", {
      status: "completed",
      ready: true,
      source: "omo",
      phase: "cleanup-complete",
      evidence: ["cleanup-finished"]
    });

    store.markWorkerSignal("session-reviewer", "room-acceptance", {
      status: "completed",
      ready: true,
      source: "omo",
      phase: "review-standby",
      evidence: ["criteria-defined"]
    });

    expect(store.getRun(run.runId)?.status).toBe("in_progress");
  });
});
