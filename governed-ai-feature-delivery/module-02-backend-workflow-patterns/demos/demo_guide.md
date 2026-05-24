# Module 2 Demo Guide

## Purpose

This demo runs during slide 7 — after learners have seen the anti-pattern and the layering question, and before the layer ownership debrief table. Its job is to make the architecture tangible: learners should be able to point at real code when discussing the slides that follow.

The demo has four acts:

1. **Code walk** — orient learners to the layer boundaries in the source before anything runs.
2. **The anti-pattern in contrast** — what the governed version is replacing.
3. **The happy path** — a well-formed request moving through every layer.
4. **Failure paths** — what governance controls actually do when they fire.

Each act has a "what to show" and a "what to say" section. Keep commentary brief — the code and trace output do the talking.

---

## Setup

The app runs in `dev` profile by default. This uses the mock LLM gateway, which returns a deterministic invoice response with `confidence: 0.92`. No API key is needed.

Start the server:

```bash
npm run start:dev
```

Keep the terminal visible alongside your editor and HTTP client. Learners should be able to see the formatted trace output as requests land.

All requests go to `http://127.0.0.1:3000/documents/extract` as `POST` with `Content-Type: application/json`.

---

## Act 0 — Code Walk (4 minutes)

Do this before sending any requests. The goal is to give learners a mental map of the layers so that when trace events appear, they can point back to the code that produced them.

Open each file in sequence. Don't explain every line — show structure and move on.

---

### Step 1 — The NestJS controller (`src/nest/documents.controller.ts`)

**What to show:**

Open the file. Point at the `extract` method:

```typescript
@Post("extract")
async extract(@Body() body: ExtractRequest) {
  return documentController.extractDocument(body);
}
```

**What to say:**

> "This is the HTTP boundary. One line. It takes the request and hands it off. No prompt logic, no orchestration, no validation — none of that lives here."

---

### Step 2 — The feature controller (`src/features/document-extraction/controller.ts`)

**What to show:**

Open the file. Point at `extractDocument`:

```typescript
extractDocument: async (input: ExtractRequest): Promise<WorkflowResponse> => {
  logTraceEvent({ stage: "controller", event: "request_received", ... });
  return workflow.execute(input);
}
```

**What to say:**

> "The feature controller logs that a request arrived and immediately delegates to the workflow. It knows nothing about what happens next — that's intentional. The controller's only job is to be a thin entry point with a trace record."

---

### Step 3 — The workflow (`src/features/document-extraction/workflow.ts`)

**What to show:**

Open the file. Scroll slowly from top to bottom without stopping. Don't explain — just let the structure land. Learners should see: feature flag check, pre-call validation, gateway call, post-call validation, confidence check, decision return.

Then pause at the confidence threshold check:

```typescript
if (finalizedData.confidence < confidenceThreshold) {
  return { status: "needs_review", reason: "low_confidence", ... };
}
```

**What to say:**

> "This is where the orchestration lives. The sequence, the branching, the fallback decisions — all here, all testable, none of it hidden in a prompt. Every decision point logs a trace event."

---

### Step 4 — The validators (`src/features/document-extraction/validators.ts`)

**What to show:**

Open the file. Point at the pattern lists at the top:

```typescript
const POLICY_DENY_INPUT_PATTERNS = [/\b\d{3}-\d{2}-\d{4}\b/, ...];
const POLICY_REVIEW_INPUT_PATTERNS = [/password/i, /internal-only/i, ...];
```

Then point at `validatePreCall` and `validatePostCall` as two separate functions.

**What to say:**

> "Policy lives here, not in the prompt. These patterns are reviewable, versionable, and testable in isolation. Changing a policy rule is a code change — it goes through review, not a prompt edit."

---

### Step 5 — The prompt (`src/features/document-extraction/prompt.ts`)

**What to show:**

Open the file. Point at the version constant and the builder function:

```typescript
export const DOCUMENT_EXTRACTION_PROMPT_VERSION = "extract-v1";

export function buildDocumentExtractionPrompt(inputText: string): string {
  return [ ... ].join("\n");
}
```

**What to say:**

> "The prompt is a code artefact with a version label. When this changes, the version changes. That version travels through every trace event — so you always know which prompt produced which output."

---

### Transition

> "Five files, five responsibilities, clear boundaries. Now let's see them run."

---

## Act 1 — The Anti-Pattern in Contrast (1 minute)

### What to show

Return to the slide with the anti-pattern code:

```typescript
@Post("/extract")
async extract(@Body() body: any) {
  const result = await this.llm.invoke(body.text);
  return result;
}
```

### What to say

> "You've just seen five files with distinct responsibilities. This is what it looks like when you collapse all of that into one function. No validation, no versioning, no trace, no fallback. Now let's watch the governed version actually run."

---

## Act 2 — The Happy Path (4 minutes)

### Request

```json
{
  "text": "Invoice #INV-2026 due in 14 days for 980 EUR from ACME Corp.",
  "source": "demo",
  "traceId": "demo-happy-01"
}
```

### What to show

Send the request. Watch the terminal. The trace events will appear in this sequence:

```
controller  ▶ request_received
             source: demo  hasText: true

workflow    ▶ request_received

workflow    ⬡ pre_validation_result
             ok: true

gateway     → invoke_started
             mode: openai

gateway     ← invoke_completed
             tokens: 208

workflow    ⬡ post_validation_result
             ok: true

workflow    ✅ accepted_decision
             traceId: demo-happy-01  promptVersion: extract-v1  model: gpt-4o-mini
```

Point out in the response:

- `status: "accepted"`
- `traceId` matches what was sent
- `promptVersion: "extract-v1"` — the prompt version is in the response
- `modelIdentifier: "gpt-4o-mini"` — the model is recorded
- `data` contains the structured extraction result

### What to say

> "Every step is logged. We know which prompt version ran, which model produced the output, and what both validation results were. If an auditor asks about this request in six months, the trace answers the question without anyone reading source code."

Pause and ask:

> "In your Module 1 audit contract — is this enough? What fields are you missing?"

---

## Act 3 — Failure Paths (6 minutes)

Run each of these in sequence. For each one, point at the trace output first, then the response.

---

### 3a — Pre-call validation failure: input too short

```json
{
  "text": "hi",
  "source": "demo",
  "traceId": "demo-short-01"
}
```

**Trace events:**
```
controller  ▶ request_received
workflow    ▶ request_received
workflow    ⬡ pre_validation_result   ok: false  reason: invalid_input
workflow    ⚠️  fallback_decision
```

**Response:** `status: "needs_review"`, `reason: "invalid_input"`

**What to say:**

> "Failing pre-call is cheap. No model was invoked — you can see gateway is completely absent from the trace. The fallback ran deterministically and the record is complete."

---

### 3b — Pre-call policy deny: SSN pattern

```json
{
  "text": "Please process this claim for John Smith, SSN 123-45-6789, regarding the invoice.",
  "source": "demo",
  "traceId": "demo-ssn-01"
}
```

**Trace events:**
```
controller  ▶ request_received
workflow    ▶ request_received
workflow    ⬡ pre_validation_result   ok: false  reason: policy_sensitive_input
workflow    🚫 deny_decision
```

**Response:** `status: "denied"`, `reason: "policy_sensitive_input"`

**What to say:**

> "This is the difference between review and deny. The SSN pattern is on the deny list in validators.ts — the file you just saw. It never reaches the model. Deterministic, logged, reproducible."

---

### 3c — Pre-call policy review: sensitive keyword

```json
{
  "text": "Attached is the internal-only briefing document for Q3 budget approval.",
  "source": "demo",
  "traceId": "demo-sensitive-01"
}
```

**Trace events:**
```
workflow    ⬡ pre_validation_result   ok: false  reason: policy_sensitive_input
workflow    ⚠️  fallback_decision
```

**Response:** `status: "needs_review"`, `reason: "policy_sensitive_input"`

**What to say:**

> "Same pattern type, different outcome. `internal-only` is on the review list, not the deny list — routes to a human rather than blocking outright. That distinction is a policy decision living in the validators, not buried in a prompt."

---

### 3d — Feature flag kill switch

Update `.env` to disable the feature:

```
FEATURE_DOCUMENT_EXTRACTION_ENABLED=false
```

Restart the server, then send the happy path request again:

```json
{
  "text": "Invoice #INV-2026 due in 14 days for 980 EUR from ACME Corp.",
  "source": "demo",
  "traceId": "demo-killswitch-01"
}
```

**Trace events:**
```
controller  ▶ request_received
workflow    ▶ request_received
workflow    🚫 deny_decision          reason: feature_disabled
```

**Response:** `status: "denied"`, `reason: "feature_disabled"`

**What to say:**

> "One config value, no code change, no deployment. The response shape is identical to any other denied response — the frontend contract holds regardless of why the workflow denied it."

Re-enable the feature in `.env` and restart before continuing.

---

### 3e — Low confidence fallback (optional, if time allows)

Update `.env` to raise the threshold above what the mock returns:

```
CONFIDENCE_THRESHOLD=0.99
```

Restart and send the happy path request. The mock returns `confidence: 0.92`, which is now below the threshold.

**Trace events:**
```
workflow    ⬡ post_validation_result  ok: true
workflow    ⚠️  fallback_decision       reason: low_confidence  threshold: 0.99  observed: 0.92
```

**Response:** `status: "needs_review"`, `reason: "low_confidence"`, with `metadata` showing threshold and observed value.

**What to say:**

> "The model produced a valid, well-formed output — post-call schema validation passed. But the confidence didn't meet the threshold, so the workflow routes to review. The metadata tells a reviewer exactly why: what the threshold was, and what the model actually returned."

Reset `CONFIDENCE_THRESHOLD` in `.env` before continuing.

---

## After the Demo

Return to the slides. The next slide is the layer ownership table.

Ask before revealing it:

> "You've just seen the code and watched it run. Which boundary was clearest to you? Which one would you find hardest to maintain in a real codebase?"

Let two or three people respond, then move to the table.

---

## Troubleshooting

**Server won't start** — confirm `tsx` is available: `npx tsx --version`.

**No trace output** — confirm `APP_PROFILE=dev` is set in `.env`. The `dev` profile enables `debugLlmLogs: true` which produces gateway-level trace events.

**Wrong port** — default is `3000`. Set `PORT=3001` in `.env` and update your request URL if needed.

**Pre-call patterns not firing** — confirm you're sending `Content-Type: application/json` and that `text` is a top-level string field.

**Kill switch not taking effect** — the server must be restarted after `.env` changes for them to be picked up.