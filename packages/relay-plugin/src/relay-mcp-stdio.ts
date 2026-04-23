import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createRelayBridgeMcpServer } from "./relay-mcp-server.js";

async function main() {
  const server = createRelayBridgeMcpServer();
  const transport = new StdioServerTransport();
  const shutdown = async () => {
    await server.close();
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
  await server.connect(transport);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
