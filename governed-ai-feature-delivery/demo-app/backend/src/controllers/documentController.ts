import type { ExtractRequest, WorkflowResponse } from "../types";
import { createDocumentExtractionWorkflow } from "../workflows/documentExtractionWorkflow";
import type { LlmGateway } from "../gateway/llmGateway";

type ControllerDeps = {
  gateway: LlmGateway;
  modelIdentifier?: string;
};

export function createDocumentController({ gateway, modelIdentifier }: ControllerDeps) {
  const workflow = createDocumentExtractionWorkflow({ gateway, modelIdentifier });

  return {
    // Keep controller thin: delegate orchestration to workflow layer.
    extractDocument: async (input: ExtractRequest): Promise<WorkflowResponse> => {
      return workflow.execute(input);
    },
  };
}
