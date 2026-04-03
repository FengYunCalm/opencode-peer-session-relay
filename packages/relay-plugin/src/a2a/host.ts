import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import type { AddressInfo } from "node:net";

type JsonObject = { [key: string]: JsonValue };
export type JsonValue = string | number | boolean | null | JsonValue[] | JsonObject;

export type A2AHostSnapshot = {
  ok: boolean;
  detail?: string;
};

export type A2AHostJsonResponse = {
  kind: "json";
  statusCode?: number;
  headers?: Record<string, string>;
  body: JsonValue;
};

export type A2AHostSseResponse = {
  kind: "sse";
  statusCode?: number;
  headers?: Record<string, string>;
  events: AsyncIterable<JsonValue>;
};

export type A2AHostResponse = A2AHostJsonResponse | A2AHostSseResponse;

export type A2AHostCallbacks = {
  health?: () => JsonObject;
  readiness?: () => A2AHostSnapshot;
  agentCard?: () => JsonValue;
  rpc?: (payload: unknown) => Promise<A2AHostResponse>;
};

export type A2AHostConfig = {
  enabled: boolean;
  host: string;
  port: number;
  basePath: string;
  healthPath: string;
  readyPath: string;
};

export class A2ARelayHost {
  private server?: ReturnType<typeof createServer>;
  private listeningPort?: number;

  constructor(
    private readonly config: A2AHostConfig,
    private readonly callbacks: A2AHostCallbacks = {}
  ) {}

  get isListening(): boolean {
    return Boolean(this.server?.listening);
  }

  get port(): number | undefined {
    return this.listeningPort;
  }

  get url(): string | undefined {
    if (!this.listeningPort) {
      return undefined;
    }

    return `http://${this.config.host}:${this.listeningPort}${this.config.basePath}`;
  }

  async start(): Promise<string> {
    if (!this.config.enabled) {
      throw new Error("A2A host is disabled by configuration.");
    }

    if (this.server && this.server.listening) {
      return this.url!;
    }

    if (!this.server) {
      this.server = createServer((request, response) => {
        void this.handleRequest(request, response).catch((error) => {
          this.sendJson(response, 500, {
            ok: false,
            error: error instanceof Error ? error.message : "Internal server error"
          });
        });
      });
    }

    await new Promise<void>((resolve, reject) => {
      const onError = (error: Error) => {
        this.server?.off("error", onError);
        reject(error);
      };

      this.server!.once("error", onError);
      this.server!.listen(this.config.port, this.config.host, () => {
        this.server?.off("error", onError);
        const address = this.server?.address();

        if (!address || typeof address === "string") {
          reject(new Error("Unable to resolve A2A host address."));
          return;
        }

        this.listeningPort = (address as AddressInfo).port;
        resolve();
      });
    });

    return this.url!;
  }

  async stop(): Promise<void> {
    if (!this.server || !this.server.listening) {
      this.listeningPort = undefined;
      return;
    }

    await new Promise<void>((resolve, reject) => {
      this.server!.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });

    this.listeningPort = undefined;
  }

  private async handleRequest(request: IncomingMessage, response: ServerResponse): Promise<void> {
    const url = new URL(request.url ?? "/", `http://${request.headers.host ?? `${this.config.host}:${this.config.port}`}`);

    if (request.method === "GET" && url.pathname === this.config.healthPath) {
      this.sendJson(response, 200, {
        ok: true,
        basePath: this.config.basePath,
        ...(this.callbacks.health?.() ?? {})
      });
      return;
    }

    if (request.method === "GET" && url.pathname === this.config.readyPath) {
      const readiness = this.callbacks.readiness?.() ?? { ok: true };
      this.sendJson(response, readiness.ok ? 200 : 503, readiness);
      return;
    }

    if (request.method === "GET" && (url.pathname === this.config.basePath || url.pathname === `${this.config.basePath}/agent-card`)) {
      this.sendJson(response, 200, this.callbacks.agentCard?.() ?? {
        ok: true,
        kind: "a2a-host",
        url: this.url ?? null
      });
      return;
    }

    if (request.method === "POST" && url.pathname === this.config.basePath) {
      if (!this.callbacks.rpc) {
        this.sendJson(response, 501, {
          ok: false,
          error: "RPC handler is not configured"
        });
        return;
      }

      const payload = await this.readJsonBody(request);
      const result = await this.callbacks.rpc(payload);
      if (result.kind === "json") {
        this.sendJson(response, result.statusCode ?? 200, result.body, result.headers);
        return;
      }

      await this.sendSse(response, result);
      return;
    }

    this.sendJson(response, 404, { ok: false, error: "Not found" });
  }

  private async readJsonBody(request: IncomingMessage): Promise<unknown> {
    const chunks: Buffer[] = [];

    for await (const chunk of request) {
      chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
    }

    const raw = Buffer.concat(chunks).toString("utf8");
    if (!raw) {
      return {};
    }

    return JSON.parse(raw);
  }

  private async sendSse(response: ServerResponse, result: A2AHostSseResponse): Promise<void> {
    response.statusCode = result.statusCode ?? 200;
    response.setHeader("content-type", "text/event-stream; charset=utf-8");
    response.setHeader("cache-control", "no-cache, no-transform");
    response.setHeader("connection", "keep-alive");

    for (const [key, value] of Object.entries(result.headers ?? {})) {
      response.setHeader(key, value);
    }

    for await (const event of result.events) {
      response.write(`data: ${JSON.stringify(event)}\n\n`);
    }

    response.end();
  }

  private sendJson(response: ServerResponse, statusCode: number, body: JsonValue, headers?: Record<string, string>): void {
    response.statusCode = statusCode;
    response.setHeader("content-type", "application/json; charset=utf-8");
    for (const [key, value] of Object.entries(headers ?? {})) {
      response.setHeader(key, value);
    }
    response.end(JSON.stringify(body));
  }
}
