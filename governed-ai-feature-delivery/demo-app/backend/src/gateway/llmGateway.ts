type GatewayInvokeInput = {
  traceId: string;
  promptVersion: string;
  modelIdentifier: string;
  prompt: string;
};

type GatewayInvokeResult = {
  modelIdentifier: string;
  rawOutput: unknown;
};

type LlmGateway = {
  invoke: (input: GatewayInvokeInput) => Promise<GatewayInvokeResult>;
};

export type { GatewayInvokeInput, GatewayInvokeResult, LlmGateway };

// Training-safe mock gateway for deterministic workshop behavior.
export function createMockLlmGateway(): LlmGateway {
  return {
    async invoke(input: GatewayInvokeInput): Promise<GatewayInvokeResult> {
      void input.prompt;
      return {
        modelIdentifier: input.modelIdentifier,
        rawOutput: {
          documentType: "invoice",
          confidence: 0.92,
          entities: ["invoice_number", "amount_due"],
          summary: "Invoice detected with billing entities.",
        },
      };
    },
  };
}

type OpenAiGatewayConfig = {
  apiKey: string;
  baseUrl?: string;
};

export function createOpenAiLlmGateway(config: OpenAiGatewayConfig): LlmGateway {
  const baseUrl = config.baseUrl ?? "https://api.openai.com/v1";

  return {
    async invoke(input: GatewayInvokeInput): Promise<GatewayInvokeResult> {
      const response = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.apiKey}`,
        },
        body: JSON.stringify({
          model: input.modelIdentifier,
          temperature: 0,
          response_format: { type: "json_object" },
          messages: [
            {
              role: "system",
              content:
                "Return only valid JSON with keys: documentType, confidence, entities, summary.",
            },
            {
              role: "user",
              content: input.prompt,
            },
          ],
          metadata: {
            traceId: input.traceId,
            promptVersion: input.promptVersion,
          },
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`OpenAI request failed: ${response.status} ${text}`);
      }

      const payload = (await response.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
      };

      const content = payload.choices?.[0]?.message?.content ?? "{}";

      return {
        modelIdentifier: input.modelIdentifier,
        rawOutput: safeJsonParse(content),
      };
    },
  };
}

function safeJsonParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
}
