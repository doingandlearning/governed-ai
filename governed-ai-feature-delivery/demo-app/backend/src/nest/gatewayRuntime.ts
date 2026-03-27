import { createMockLlmGateway, createOpenAiLlmGateway } from "../gateway/llmGateway";
import { createMastraManagedGateway } from "../gateway/mastraManagedGateway";
import { createMastraRuntime } from "../mastra/runtime";

export function createGatewayForRuntime() {
  const useMastraRuntime = process.env.USE_MASTRA_RUNTIME === "true";
  const llmMode = process.env.LLM_MODE ?? "mock";

  const baseGateway =
    llmMode === "openai"
      ? createOpenAiLlmGateway({
          apiKey: requireEnv("OPENAI_API_KEY"),
          baseUrl: process.env.OPENAI_BASE_URL,
        })
      : createMockLlmGateway();

  return useMastraRuntime ? createMastraManagedGateway(createMastraRuntime(), baseGateway) : baseGateway;
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
