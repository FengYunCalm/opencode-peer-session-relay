import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@opencode-peer-session-relay/a2a-protocol": resolve(__dirname, "packages/a2a-protocol/src/index.ts"),
      "@opencode-peer-session-relay/relay-plugin": resolve(__dirname, "packages/relay-plugin/src/index.ts"),
      "@opencode-peer-session-relay/relay-shared": resolve(__dirname, "packages/relay-shared/src/index.ts")
    }
  },
  test: {
    name: "workspace",
    environment: "node",
    include: ["tests/**/*.test.ts"]
  }
});
