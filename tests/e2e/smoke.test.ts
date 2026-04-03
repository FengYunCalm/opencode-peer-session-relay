import { describe, expect, it } from "vitest";
import * as shared from "@opencode-peer-session-relay/relay-shared";

describe("relay shared package", () => {
  it("resolves the shared entrypoint", () => {
    expect(shared).toBeDefined();
  });
});
