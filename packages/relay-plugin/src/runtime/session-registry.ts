import type { SessionStatus } from "@opencode-ai/sdk";

export type SessionSnapshot = {
  sessionID: string;
  status?: SessionStatus;
  updatedAt: number;
};

export class SessionRegistry {
  private readonly sessions = new Map<string, SessionSnapshot>();

  upsert(snapshot: SessionSnapshot): void {
    this.sessions.set(snapshot.sessionID, snapshot);
  }

  get(sessionID: string): SessionSnapshot | undefined {
    return this.sessions.get(sessionID);
  }

  remove(sessionID: string): void {
    this.sessions.delete(sessionID);
  }

  entries(): SessionSnapshot[] {
    return [...this.sessions.values()];
  }
}
