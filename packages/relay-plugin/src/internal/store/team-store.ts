import { randomUUID } from "node:crypto";

import { initializeRelaySchema } from "./schema.js";
import { openSqliteDatabase, type SqliteDatabase } from "./sqlite.js";

export type RelayTeamRunStatus = "bootstrapping" | "waiting" | "ready" | "in_progress" | "blocked" | "completed" | "failed";
export type RelayTeamWorkerStatus = "created" | "bootstrapped" | "joined" | "ready" | "in_progress" | "blocked" | "completed" | "failed";

export type RelayTeamRun = {
  runId: string;
  managerSessionID: string;
  roomCode: string;
  task: string;
  status: RelayTeamRunStatus;
  createdAt: number;
  updatedAt: number;
};

export type RelayTeamWorker = {
  runId: string;
  sessionID: string;
  role: string;
  alias: string;
  title: string;
  status: RelayTeamWorkerStatus;
  lastNote?: string;
  workflowSource?: string;
  workflowPhase?: string;
  progress?: number;
  evidence?: unknown;
  createdAt: number;
  joinedAt?: number;
  readyAt?: number;
  updatedAt: number;
};

type RelayTeamRunRow = {
  run_id: string;
  manager_session_id: string;
  room_code: string;
  task: string;
  status: RelayTeamRunStatus;
  created_at: number;
  updated_at: number;
};

type RelayTeamWorkerRow = {
  run_id: string;
  session_id: string;
  role: string;
  alias: string;
  title: string;
  status: RelayTeamWorkerStatus;
  last_note: string | null;
  workflow_source: string | null;
  workflow_phase: string | null;
  progress: number | null;
  evidence_json: string | null;
  created_at: number;
  joined_at: number | null;
  ready_at: number | null;
  updated_at: number;
};

type RelayTeamWorkerLookupRow = RelayTeamWorkerRow & {
  room_code: string;
  manager_session_id: string;
  run_status: RelayTeamRunStatus;
};

function createRunId(): string {
  return `teamrun_${randomUUID()}`;
}

function serializeEvidence(value: unknown): string | null {
  if (value === undefined) {
    return null;
  }

  return JSON.stringify(value);
}

function deserializeEvidence(value: string | null): unknown {
  if (!value) {
    return undefined;
  }

  try {
    return JSON.parse(value);
  } catch {
    return value;
  }
}

function aggregateRunStatus(workers: RelayTeamWorker[], currentStatus?: RelayTeamRunStatus): RelayTeamRunStatus {
  if (["failed", "completed"].includes(currentStatus ?? "")) {
    return currentStatus!;
  }

  if (workers.length === 0) {
    return "bootstrapping";
  }
  if (workers.some((worker) => worker.status === "failed")) {
    return "failed";
  }
  if (workers.every((worker) => worker.status === "completed")) {
    return "completed";
  }
  if (workers.some((worker) => worker.status === "blocked")) {
    return "blocked";
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

export class TeamStore {
  private readonly database: SqliteDatabase;

  constructor(location = ":memory:") {
    this.database = openSqliteDatabase(location);
    initializeRelaySchema(this.database);
  }

  createRun(input: { managerSessionID: string; roomCode: string; task: string }): RelayTeamRun {
    const now = Date.now();
    const runId = createRunId();
    this.database
      .prepare(`INSERT INTO relay_team_runs (run_id, manager_session_id, room_code, task, status, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)`)
      .run(runId, input.managerSessionID, input.roomCode, input.task, "bootstrapping", now, now);

    return this.getRun(runId)!;
  }

  addWorker(input: {
    runId: string;
    sessionID: string;
    role: string;
    alias: string;
    title: string;
    status?: RelayTeamWorkerStatus;
    lastNote?: string;
    workflowSource?: string;
    workflowPhase?: string;
    progress?: number;
    evidence?: unknown;
  }): RelayTeamWorker {
    const now = Date.now();
    this.database
      .prepare(`
        INSERT INTO relay_team_workers (run_id, session_id, role, alias, title, status, last_note, workflow_source, workflow_phase, progress, evidence_json, created_at, joined_at, ready_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      .run(
        input.runId,
        input.sessionID,
        input.role,
        input.alias,
        input.title,
        input.status ?? "created",
        input.lastNote ?? null,
        input.workflowSource ?? null,
        input.workflowPhase ?? null,
        input.progress ?? null,
        serializeEvidence(input.evidence),
        now,
        null,
        null,
        now
      );

    this.refreshRunStatus(input.runId);
    return this.requireWorker(input.runId, input.sessionID);
  }

  getRun(runId: string): RelayTeamRun | undefined {
    const row = this.database.prepare(`SELECT * FROM relay_team_runs WHERE run_id = ?`).get(runId) as RelayTeamRunRow | undefined;
    return row ? this.hydrateRun(row) : undefined;
  }

  getRunByRoomCode(roomCode: string): RelayTeamRun | undefined {
    const row = this.database.prepare(`SELECT * FROM relay_team_runs WHERE room_code = ?`).get(roomCode) as RelayTeamRunRow | undefined;
    return row ? this.hydrateRun(row) : undefined;
  }

  getRunForSession(sessionID: string, roomCode?: string, runId?: string): RelayTeamRun | undefined {
    if (runId) {
      return this.getRun(runId);
    }

    const byManager = this.database
      .prepare(`
        SELECT * FROM relay_team_runs
        WHERE manager_session_id = ?
          AND (? IS NULL OR room_code = ?)
        ORDER BY updated_at DESC
        LIMIT 1
      `)
      .get(sessionID, roomCode ?? null, roomCode ?? null) as RelayTeamRunRow | undefined;

    if (byManager) {
      return this.hydrateRun(byManager);
    }

    const byWorker = this.findWorkerRow(sessionID, roomCode);
    return byWorker ? this.getRun(byWorker.run_id) : undefined;
  }

  listWorkers(runId: string): RelayTeamWorker[] {
    const rows = this.database
      .prepare(`SELECT * FROM relay_team_workers WHERE run_id = ? ORDER BY created_at ASC`)
      .all(runId) as RelayTeamWorkerRow[];
    return rows.map((row) => this.hydrateWorker(row));
  }

  markWorkerBootstrapped(sessionID: string): RelayTeamWorker | undefined {
    return this.updateWorkerBySession(sessionID, undefined, (worker) => ({
      status: ["created", "bootstrapped"].includes(worker.status) ? "bootstrapped" : worker.status,
      lastNote: "bootstrap prompt submitted"
    }));
  }

  markWorkerJoined(sessionID: string, roomCode: string, alias?: string): RelayTeamWorker | undefined {
    return this.updateWorkerBySession(sessionID, roomCode, (worker) => ({
      alias: alias?.trim() || worker.alias,
      status: ["created", "bootstrapped", "joined"].includes(worker.status) ? "joined" : worker.status,
      joinedAt: worker.joinedAt ?? Date.now(),
      lastNote: "joined relay room"
    }));
  }

  markWorkerSignal(sessionID: string, roomCode: string, input: {
    status: RelayTeamWorkerStatus;
    note?: string;
    ready: boolean;
    source?: string;
    phase?: string;
    progress?: number;
    evidence?: unknown;
  }): RelayTeamWorker | undefined {
    return this.updateWorkerBySession(sessionID, roomCode, (worker) => ({
      status: input.status,
      readyAt: input.ready ? (worker.readyAt ?? Date.now()) : worker.readyAt,
      lastNote: input.note ?? worker.lastNote,
      workflowSource: input.source ?? worker.workflowSource,
      workflowPhase: input.phase ?? worker.workflowPhase,
      progress: input.progress ?? worker.progress,
      evidence: input.evidence ?? worker.evidence
    }));
  }

  markWorkerFailed(sessionID: string, errorMessage: string, roomCode?: string): RelayTeamWorker | undefined {
    return this.updateWorkerBySession(sessionID, roomCode, () => ({
      status: "failed",
      lastNote: errorMessage
    }));
  }

  markRunFailed(runId: string): RelayTeamRun {
    this.database.prepare(`UPDATE relay_team_runs SET status = ?, updated_at = ? WHERE run_id = ?`).run("failed", Date.now(), runId);
    return this.getRun(runId)!;
  }

  close(): void {
    this.database.close();
  }

  private refreshRunStatus(runId: string): RelayTeamRun {
    const current = this.getRun(runId);
    if (!current) {
      throw new Error(`Team run not found: ${runId}`);
    }

    const nextStatus = aggregateRunStatus(this.listWorkers(runId), current.status);
    this.database.prepare(`UPDATE relay_team_runs SET status = ?, updated_at = ? WHERE run_id = ?`).run(nextStatus, Date.now(), runId);
    return this.getRun(runId)!;
  }

  private requireWorker(runId: string, sessionID: string): RelayTeamWorker {
    const row = this.database
      .prepare(`SELECT * FROM relay_team_workers WHERE run_id = ? AND session_id = ?`)
      .get(runId, sessionID) as RelayTeamWorkerRow | undefined;

    if (!row) {
      throw new Error(`Team worker not found: ${sessionID} in ${runId}`);
    }

    return this.hydrateWorker(row);
  }

  private updateWorkerBySession(
    sessionID: string,
    roomCode: string | undefined,
    mutate: (worker: RelayTeamWorker) => Partial<Pick<RelayTeamWorker, "alias" | "status" | "lastNote" | "joinedAt" | "readyAt" | "workflowSource" | "workflowPhase" | "progress" | "evidence">>
  ): RelayTeamWorker | undefined {
    const row = this.findWorkerRow(sessionID, roomCode);
    if (!row) {
      return undefined;
    }

    const worker = this.hydrateWorker(row);
    const patch = mutate(worker);
    const now = Date.now();
    this.database
      .prepare(`
        UPDATE relay_team_workers
        SET alias = ?, status = ?, last_note = ?, workflow_source = ?, workflow_phase = ?, progress = ?, evidence_json = ?, joined_at = ?, ready_at = ?, updated_at = ?
        WHERE run_id = ? AND session_id = ?
      `)
      .run(
        patch.alias ?? worker.alias,
        patch.status ?? worker.status,
        patch.lastNote ?? worker.lastNote ?? null,
        patch.workflowSource ?? worker.workflowSource ?? null,
        patch.workflowPhase ?? worker.workflowPhase ?? null,
        patch.progress ?? worker.progress ?? null,
        serializeEvidence(patch.evidence ?? worker.evidence),
        patch.joinedAt ?? worker.joinedAt ?? null,
        patch.readyAt ?? worker.readyAt ?? null,
        now,
        worker.runId,
        worker.sessionID
      );

    this.refreshRunStatus(worker.runId);
    return this.requireWorker(worker.runId, worker.sessionID);
  }

  private findWorkerRow(sessionID: string, roomCode?: string): RelayTeamWorkerLookupRow | undefined {
    return this.database
      .prepare(`
        SELECT w.*, r.room_code, r.manager_session_id, r.status as run_status
        FROM relay_team_workers w
        JOIN relay_team_runs r ON r.run_id = w.run_id
        WHERE w.session_id = ?
          AND (? IS NULL OR r.room_code = ?)
        ORDER BY w.updated_at DESC
        LIMIT 1
      `)
      .get(sessionID, roomCode ?? null, roomCode ?? null) as RelayTeamWorkerLookupRow | undefined;
  }

  private hydrateRun(row: RelayTeamRunRow): RelayTeamRun {
    return {
      runId: row.run_id,
      managerSessionID: row.manager_session_id,
      roomCode: row.room_code,
      task: row.task,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }

  private hydrateWorker(row: RelayTeamWorkerRow): RelayTeamWorker {
    return {
      runId: row.run_id,
      sessionID: row.session_id,
      role: row.role,
      alias: row.alias,
      title: row.title,
      status: row.status,
      lastNote: row.last_note ?? undefined,
      workflowSource: row.workflow_source ?? undefined,
      workflowPhase: row.workflow_phase ?? undefined,
      progress: row.progress ?? undefined,
      evidence: deserializeEvidence(row.evidence_json),
      createdAt: row.created_at,
      joinedAt: row.joined_at ?? undefined,
      readyAt: row.ready_at ?? undefined,
      updatedAt: row.updated_at
    };
  }
}
