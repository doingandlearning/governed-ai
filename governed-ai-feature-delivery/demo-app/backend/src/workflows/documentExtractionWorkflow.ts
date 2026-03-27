import {
  buildDocumentExtractionPrompt,
  DOCUMENT_EXTRACTION_PROMPT_VERSION,
} from "../prompts/documentExtractionPrompt";
import type { LlmGateway } from "../gateway/llmGateway";
import type { ExtractRequest, WorkflowResponse } from "../types";
import { validatePreCall } from "../validators/preCallValidator";
import { validatePostCall } from "../validators/postCallValidator";

type WorkflowDeps = {
  gateway: LlmGateway;
  modelIdentifier?: string;
};

export function createDocumentExtractionWorkflow({
  gateway,
  modelIdentifier = "gpt-4o-mini",
}: WorkflowDeps) {
  return {
    execute: async (input: ExtractRequest): Promise<WorkflowResponse> => {
      const traceId = input.traceId ?? createTraceId();

      const pre = validatePreCall(input);
      if (!pre.ok) {
        return {
          status: "needs_review",
          traceId,
          promptVersion: DOCUMENT_EXTRACTION_PROMPT_VERSION,
          modelIdentifier,
          reason: pre.reason ?? "invalid_input",
        };
      }

      const prompt = buildDocumentExtractionPrompt(input.text);
      const gatewayResult = await gateway.invoke({
        traceId,
        promptVersion: DOCUMENT_EXTRACTION_PROMPT_VERSION,
        modelIdentifier,
        prompt,
      });

      const post = validatePostCall(gatewayResult.rawOutput);
      if (!post.ok || !post.data) {
        return {
          status: "needs_review",
          traceId,
          promptVersion: DOCUMENT_EXTRACTION_PROMPT_VERSION,
          modelIdentifier,
          reason: post.reason ?? "validation_failed",
        };
      }

      return {
        status: "accepted",
        traceId,
        promptVersion: DOCUMENT_EXTRACTION_PROMPT_VERSION,
        modelIdentifier,
        data: post.data,
      };
    },
  };
}

function createTraceId(): string {
  return `trc_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}
