import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createRelayBridgeMcpServer } from "./relay-mcp-server.js";

async function main() {
  const server = createRelayBridgeMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
