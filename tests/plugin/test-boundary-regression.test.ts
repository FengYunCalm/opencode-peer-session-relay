import { describe, expect, it } from "vitest";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { resolve, relative } from "node:path";

const allowedPackageRootImports = new Set([
  "tests/plugin/smoke.test.ts",
  "tests/plugin/package-surface.test.ts",
  "tests/plugin/package-manifest.test.ts",
  "tests/plugin/test-boundary-regression.test.ts"
]);

const allowedInternalSourceImports = new Set([
  "tests/support/relay-plugin-testkit.ts",
  "tests/plugin/test-boundary-regression.test.ts"
]);

function collectTypeScriptFiles(directory: string): string[] {
  const results: string[] = [];

  for (const entry of readdirSync(directory)) {
    const fullPath = resolve(directory, entry);
    const stats = statSync(fullPath);

    if (stats.isDirectory()) {
      results.push(...collectTypeScriptFiles(fullPath));
      continue;
    }

    if (fullPath.endsWith(".ts")) {
      results.push(fullPath);
    }
  }

  return results;
}

describe("test boundary regression", () => {
  it("limits package-root imports and direct internal-source imports to the approved files", () => {
    const testsRoot = resolve(__dirname, "../../tests");
    const files = collectTypeScriptFiles(testsRoot);

    for (const filePath of files) {
      const normalizedPath = relative(resolve(__dirname, "../../"), filePath).replace(/\\/g, "/");
      const content = readFileSync(filePath, "utf8");

      const importsPackageRoot = content.includes("@opencode-peer-session-relay/relay-plugin");
      const importsInternalSource = content.includes("packages/relay-plugin/src/");

      if (importsPackageRoot) {
        expect(allowedPackageRootImports.has(normalizedPath), `${normalizedPath} should not import the public package root`).toBe(true);
      }

      if (importsInternalSource) {
        expect(allowedInternalSourceImports.has(normalizedPath), `${normalizedPath} should not import package source internals directly`).toBe(true);
      }
    }
  });
});
