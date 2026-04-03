export type LogLevel = "debug" | "info" | "warn" | "error";

export type LogRecord = {
  service: string;
  level: LogLevel;
  message: string;
  extra?: Record<string, unknown>;
  timestamp: string;
};

export function createLogRecord(service: string, level: LogLevel, message: string, extra?: Record<string, unknown>): LogRecord {
  return {
    service,
    level,
    message,
    extra,
    timestamp: new Date().toISOString()
  };
}
