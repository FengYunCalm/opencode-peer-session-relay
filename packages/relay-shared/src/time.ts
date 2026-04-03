export function now(): number {
  return Date.now();
}

export function toIsoTime(timestamp: number): string {
  return new Date(timestamp).toISOString();
}
