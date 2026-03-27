# Demo App Backend (Module 2 Scaffold)

This backend scaffold mirrors the Module 2 lab architecture:

- Thin controller
- Workflow orchestration service
- Prompt assets in code (versioned)
- Pre and post validation gates
- Gateway-mediated model call with trace metadata
- Deterministic accepted/fallback response contract

It can also run in a Mastra-managed mode to align with internal team standards.

## Endpoint contract

`POST /documents/extract`

Request:

```json
{
  "text": "document text",
  "source": "upload",
  "traceId": "optional-trace-id"
}
```

Response:

```json
{
  "status": "accepted",
  "traceId": "trc_xxx",
  "promptVersion": "extract-v1",
  "modelIdentifier": "gpt-4o-mini",
  "data": {
    "documentType": "invoice",
    "confidence": 0.92,
    "entities": ["amount", "invoice_number"]
  }
}
```

or fallback:

```json
{
  "status": "needs_review",
  "traceId": "trc_xxx",
  "promptVersion": "extract-v1",
  "modelIdentifier": "gpt-4o-mini",
  "reason": "validation_failed"
}
```

## Notes

- This is intentionally lightweight for training use.
- Default gateway mode is mock for predictable demos.
- Set `USE_MASTRA_RUNTIME=true` to run with the Mastra runtime adapter.
- The Mastra adapter currently delegates to the same gateway logic; this is the extension point to plug in real Mastra workflows/agents/tools.

## LLM modes

- `LLM_MODE=mock` (default): deterministic local demo behavior.
- `LLM_MODE=openai`: real LLM call through OpenAI Chat Completions API.

Required for OpenAI mode:

```bash
export LLM_MODE=openai
export OPENAI_API_KEY=your_key_here
# Optional for gateway/proxy setups:
# export OPENAI_BASE_URL=https://your-proxy/v1
```

## Run as NestJS HTTP endpoint

```bash
npm run build
npm run start:nest
```

Dev mode:

```bash
npm run dev:nest
```

Run with real OpenAI:

```bash
LLM_MODE=openai OPENAI_API_KEY=your_key_here npm run dev:nest
```

Health check:

```bash
curl http://localhost:3000/documents/health
```

Extraction endpoint:

```bash
curl -X POST http://localhost:3000/documents/extract \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Invoice #INV-1023 due next Friday for 1250 EUR.",
    "source": "upload"
  }'
```
