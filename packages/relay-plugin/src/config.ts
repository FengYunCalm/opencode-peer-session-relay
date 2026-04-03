import { z } from "zod";

const a2aConfigSchema = z.object({
  enabled: z.boolean().default(true),
  host: z.string().min(1).default("127.0.0.1"),
  port: z.number().int().min(0).max(65535).default(7331),
  basePath: z.string().startsWith("/").default("/a2a"),
  healthPath: z.string().startsWith("/").default("/health"),
  readyPath: z.string().startsWith("/").default("/ready")
});

const runtimeConfigSchema = z.object({
  compactionContextLimit: z.number().int().positive().default(20),
  injectViaNoReply: z.boolean().default(true),
  databasePath: z.string().min(1).optional()
});

export const relayPluginConfigSchema = z.object({
  a2a: z.preprocess(
    (value) => value ?? {},
    a2aConfigSchema.partial().transform((value) => a2aConfigSchema.parse(value))
  ),
  runtime: z.preprocess(
    (value) => value ?? {},
    runtimeConfigSchema.partial().transform((value) => runtimeConfigSchema.parse(value))
  )
});

export type RelayPluginConfig = z.infer<typeof relayPluginConfigSchema>;

export function resolveRelayPluginConfig(input?: unknown): RelayPluginConfig {
  return relayPluginConfigSchema.parse(input ?? {});
}
