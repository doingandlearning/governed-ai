import {
  createMastraManagedGateway,
  createMockLlmGateway,
  createOpenAiLlmGateway,
} from "../features/document-extraction";
import { getRuntimeProfileConfig } from "../config/runtimeProfile";

export function createGatewayForRuntime() {
  const config = getRuntimeProfileConfig();

  const baseGateway =
    config.llmMode === "openai"
      ? createOpenAiLlmGateway({
          apiKey: requireEnv("OPENAI_API_KEY"),
          baseUrl: config.openAiBaseUrl,
          debugLogging: config.debugLlmLogs,
        })
      : createMockLlmGateway({ debugLogging: config.debugLlmLogs });

  if (!config.useMastraRuntime) {
    return baseGateway;
  }

  // Load Mastra only when enabled (stage/prod). Keeps default dev profile
  // working on Node 20 without pulling @mastra/core at startup.
  const { createMastraRuntime } = require("../mastra/runtime") as typeof import("../mastra/runtime");
  return createMastraManagedGateway(createMastraRuntime(), baseGateway);
}

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}
