import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("relay-plugin package manifest", () => {
  it("only exposes the root export in package.json", () => {
    const packageJsonPath = resolve(__dirname, "../../packages/relay-plugin/package.json");
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8")) as {
      exports?: Record<string, unknown>;
      name?: string;
      private?: boolean;
    };

    expect(packageJson.name).toBe("@opencode-peer-session-relay/relay-plugin");
    expect(packageJson.private).toBe(true);
    expect(packageJson.exports).toEqual({
      ".": "./src/index.ts"
    });
  });
});
