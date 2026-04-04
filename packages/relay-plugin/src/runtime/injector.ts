export type TextPartInput = {
  type: "text";
  text: string;
};

type SessionPromptPayload = {
  path: { id: string };
  body: {
    noReply?: boolean;
    agent?: string;
    system?: string;
    parts: TextPartInput[];
  };
};

type SessionPromptAsyncPayload = {
  path: { id: string };
  body: {
    noReply?: boolean;
    agent?: string;
    system?: string;
    parts: TextPartInput[];
  };
};

export type SessionPromptClient = {
  session: {
    prompt(options: SessionPromptPayload): Promise<unknown>;
    promptAsync(options: SessionPromptAsyncPayload): Promise<unknown>;
  };
};

export class SessionInjector {
  constructor(private readonly client: SessionPromptClient) {}

  injectAnchor(sessionID: string, text: string, system?: string): Promise<unknown> {
    return this.client.session.prompt({
      path: { id: sessionID },
      body: {
        noReply: true,
        system,
        parts: [{ type: "text", text }]
      }
    });
  }

  injectAsync(sessionID: string, text: string, system?: string): Promise<unknown> {
    return this.client.session.promptAsync({
      path: { id: sessionID },
      body: {
        noReply: true,
        system,
        parts: [{ type: "text", text }]
      }
    });
  }

  submitAsync(sessionID: string, text: string, system?: string): Promise<unknown> {
    return this.client.session.promptAsync({
      path: { id: sessionID },
      body: {
        system,
        parts: [{ type: "text", text }]
      }
    });
  }
}
