export type LoopGuardDecision = {
  duplicate: boolean;
  existingTaskId?: string;
};

export class LoopGuard {
  private readonly seen = new Map<string, { taskId: string; timestamp: number }>();

  constructor(private readonly windowMs = 5 * 60 * 1000) {}

  remember(key: string, taskId: string, now = Date.now()): LoopGuardDecision {
    const existing = this.seen.get(key);

    if (existing && now - existing.timestamp <= this.windowMs) {
      return {
        duplicate: true,
        existingTaskId: existing.taskId
      };
    }

    this.seen.set(key, { taskId, timestamp: now });
    return { duplicate: false };
  }
}
