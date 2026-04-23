import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

type RawSqliteStatement = {
  run(...args: unknown[]): unknown;
  get(...args: unknown[]): unknown;
  all(...args: unknown[]): unknown;
};

type RawSqliteDatabase = {
  exec(sql: string): void;
  prepare(sql: string): RawSqliteStatement;
  close(): void;
};

export type SqliteStatement = {
  run(...args: unknown[]): unknown;
  get(...args: unknown[]): unknown;
  all(...args: unknown[]): unknown;
};

export type SqliteDatabase = {
  exec(sql: string): void;
  prepare(sql: string): SqliteStatement;
  transaction<T>(callback: () => T): T;
  close(): void;
};

type SharedSqliteHandle = {
  database: RawSqliteDatabase;
  references: number;
  transactionDepth: number;
};

const sharedDatabaseByLocation = new Map<string, SharedSqliteHandle>();

function isSharedDatabaseLocation(location: string): boolean {
  return location !== ":memory:";
}

export function isRetryableSqliteError(error: unknown): boolean {
  const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
  return message.includes("locked") || message.includes("busy");
}

function configureSqliteDatabase(database: RawSqliteDatabase, location: string): void {
  try {
    database.exec("PRAGMA foreign_keys = ON;");
  } catch {}

  try {
    database.exec("PRAGMA busy_timeout = 5000;");
  } catch {}

  if (location !== ":memory:") {
    try {
      database.exec("PRAGMA journal_mode = WAL;");
    } catch {}

    try {
      database.exec("PRAGMA synchronous = NORMAL;");
    } catch {}
  }
}

function withSqliteRetry<T>(callback: () => T, retries = 5): T {
  let lastError: unknown;

  for (let attempt = 0; attempt < retries; attempt += 1) {
    try {
      return callback();
    } catch (error) {
      lastError = error;
      if (attempt >= retries - 1 || !isRetryableSqliteError(error)) {
        throw error;
      }
    }
  }

  throw lastError;
}

function openBunDatabase(location: string): RawSqliteDatabase {
  const { Database } = require("bun:sqlite") as {
    Database: new (location: string, options?: { create?: boolean; readwrite?: boolean }) => {
      exec(sql: string): void;
      prepare(sql: string): {
        run(...args: unknown[]): unknown;
        get(...args: unknown[]): unknown;
        all(...args: unknown[]): unknown;
      };
      close(): void;
    };
  };

  const database = new Database(location, { create: true });
  return database satisfies RawSqliteDatabase;
}

function openNodeDatabase(location: string): RawSqliteDatabase {
  const { DatabaseSync } = require("node:sqlite") as {
    DatabaseSync: new (location: string) => {
      exec(sql: string): void;
      prepare(sql: string): {
        run(...args: unknown[]): unknown;
        get(...args: unknown[]): unknown;
        all(...args: unknown[]): unknown;
      };
      close(): void;
    };
  };

  const database = new DatabaseSync(location);
  return database satisfies RawSqliteDatabase;
}

function createRawSqliteDatabase(location: string): RawSqliteDatabase {
  try {
    return openBunDatabase(location);
  } catch {
    return openNodeDatabase(location);
  }
}

function acquireSqliteHandle(location: string): { handle: SharedSqliteHandle; release: () => void } {
  if (!isSharedDatabaseLocation(location)) {
    const database = createRawSqliteDatabase(location);
    configureSqliteDatabase(database, location);
    return {
      handle: {
        database,
        references: 1,
        transactionDepth: 0
      },
      release: () => {
        database.close();
      }
    };
  }

  let handle = sharedDatabaseByLocation.get(location);
  if (!handle) {
    handle = {
      database: createRawSqliteDatabase(location),
      references: 0,
      transactionDepth: 0
    };
    configureSqliteDatabase(handle.database, location);
    sharedDatabaseByLocation.set(location, handle);
  }

  handle.references += 1;

  return {
    handle,
    release: () => {
      handle!.references -= 1;
      if (handle!.references > 0) {
        return;
      }

      sharedDatabaseByLocation.delete(location);
      handle!.database.close();
    }
  };
}

export function openSqliteDatabase(location = ":memory:"): SqliteDatabase {
  const { handle, release } = acquireSqliteHandle(location);
  let closed = false;

  return {
    exec(sql) {
      handle.database.exec(sql);
    },
    prepare(sql) {
      const statement = handle.database.prepare(sql);
      return {
        run: (...args) => statement.run(...args),
        get: (...args) => statement.get(...args),
        all: (...args) => statement.all(...args)
      };
    },
    transaction<T>(callback: () => T): T {
      if (handle.transactionDepth > 0) {
        return callback();
      }

      return withSqliteRetry(() => {
        handle.database.exec("BEGIN IMMEDIATE");
        handle.transactionDepth += 1;

        try {
          const result = callback();
          handle.database.exec("COMMIT");
          return result;
        } catch (error) {
          try {
            handle.database.exec("ROLLBACK");
          } catch {}
          throw error;
        } finally {
          handle.transactionDepth -= 1;
        }
      });
    },
    close() {
      if (closed) {
        return;
      }

      closed = true;
      release();
    }
  };
}
