import {
  createDocumentController,
  createMastraManagedGateway,
  createMockLlmGateway,
} from "./features/document-extraction";
import { createMastraRuntime } from "./mastra/runtime";

async function main() {
  const useMastraRuntime = process.env.USE_MASTRA_RUNTIME === "true";
  const baseGateway = createMockLlmGateway();

  const gateway = useMastraRuntime
    ? createMastraManagedGateway(createMastraRuntime(), baseGateway)
    : baseGateway;

  const controller = createDocumentController({ gateway });

  const response = await controller.extractDocument({
    text: "Invoice #INV-1023 due next Friday for 1250 EUR.",
    source: "upload",
  });

  console.log(JSON.stringify(response, null, 2));
}

void main();
