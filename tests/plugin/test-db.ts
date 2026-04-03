import { rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { randomUUID } from "node:crypto";

export function createTestDatabaseLocation(prefix: string): string {
  return join(tmpdir(), `${prefix}-${randomUUID()}.sqlite`);
}

export function cleanupDatabaseLocation(location: string): void {
  try {
    rmSync(location, { force: true });
  } catch {
    // ignore cleanup errors for test temp files
  }
}
