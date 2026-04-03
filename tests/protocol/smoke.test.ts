import { describe, expect, it } from "vitest";
import * as protocol from "@opencode-peer-session-relay/a2a-protocol";

describe("a2a protocol package", () => {
  it("resolves the protocol entrypoint", () => {
    expect(protocol).toBeDefined();
  });
});
