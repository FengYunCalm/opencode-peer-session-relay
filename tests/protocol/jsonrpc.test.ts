import { describe, expect, it } from "vitest";

import {
  jsonRpcRequestSchema,
  jsonRpcResponseSchema
} from "@opencode-peer-session-relay/a2a-protocol";

describe("jsonrpc schema", () => {
  it("accepts a valid request", () => {
    const result = jsonRpcRequestSchema.parse({
      jsonrpc: "2.0",
      id: "req_1",
      method: "sendMessage",
      params: {
        contextId: "ctx_1"
      }
    });

    expect(result.method).toBe("sendMessage");
  });

  it("accepts a successful response", () => {
    const result = jsonRpcResponseSchema.parse({
      jsonrpc: "2.0",
      id: "req_1",
      result: {
        ok: true
      }
    });

    expect(result.result).toEqual({ ok: true });
  });

  it("rejects a response containing result and error", () => {
    const result = jsonRpcResponseSchema.safeParse({
      jsonrpc: "2.0",
      id: "req_1",
      result: { ok: true },
      error: {
        code: -32603,
        message: "boom"
      }
    });

    expect(result.success).toBe(false);
  });
});
