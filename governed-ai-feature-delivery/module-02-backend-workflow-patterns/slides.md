# Backend Workflow Patterns

**Module 2 — Governed AI Feature Delivery**

---

## The problem we're solving

LLM calls scattered across controllers quickly become unmaintainable.

- <span class="fragment">Unclear ownership of prompt logic</span>
- <span class="fragment">Inconsistent validation</span>
- <span class="fragment">Difficult testing and reuse</span>
- <span class="fragment">Weak audit trails</span>

<span class="fragment">Now: design a layered, reusable backend workflow.</span>

---

## What "good" looks like in this module

- <span class="fragment">Deterministic orchestration around model calls</span>
- <span class="fragment">Prompt assets in code with version labels</span>
- <span class="fragment">Pre-call and post-call validation gates</span>
- <span class="fragment">Gateway-mediated calls with trace metadata</span>
- <span class="fragment">Safe fallback path when validation fails</span>

---

## Anti-pattern to avoid

```ts
// Controller calls model directly — no contract boundary
@Post("/extract")
async extract(@Body() body: any) {
  const result = await this.llm.invoke(body.text);
  return result;
}
```

- <span class="fragment">No input validation contract</span>
- <span class="fragment">No prompt version tracking</span>
- <span class="fragment">No output schema enforcement</span>
- <span class="fragment">No trace or audit metadata</span>

---

## Workflow layering in practice

- <span class="fragment">**Controller**: request/response contract only</span>
- <span class="fragment">**Workflow service**: orchestration and decisions</span>
- <span class="fragment">**Prompt module**: versioned prompt assets</span>
- <span class="fragment">**Validators**: pre/post-call checks</span>
- <span class="fragment">**Gateway adapter**: model access and tracing</span>

---

## Layer responsibilities: Controller and Workflow service

| Layer | Owns | Avoids |
| ----- | ---- | ------ |
| Controller | Transport contract, auth context | Orchestration and prompt logic |
| Workflow service | Sequence, branching, retries, fallback | HTTP transport concerns |

---

## Layer responsibilities: Prompt module and Validators

| Layer | Owns | Avoids |
| ----- | ---- | ------ |
| Prompt module | Task instructions, placeholders, version id | Business policy and branching |
| Validators | Schema and policy checks | Model invocation |

---

## Layer responsibilities: Gateway adapter

| Layer | Owns | Avoids |
| ----- | ---- | ------ |
| Gateway adapter | Model routing, trace metadata, audit envelope | Domain decision logic |

<span class="fragment">Each layer has one job. Mixing them is where maintainability breaks down.</span>

---

## Request flow (module 2 implementation path)

1. <span class="fragment">Validate incoming request schema in controller.</span>
2. <span class="fragment">Workflow builds prompt variables and context.</span>
3. <span class="fragment">Gateway call includes trace id and prompt version.</span>
4. <span class="fragment">Model output is parsed into expected schema.</span>
5. <span class="fragment">Post-call validator enforces schema and policy.</span>
6. <span class="fragment">Return accepted output or safe fallback response.</span>

---

## Prompt assets in code

- <span class="fragment">Store prompt templates as code artefacts, not hidden strings.</span>
- <span class="fragment">Attach version metadata for comparison and rollback.</span>
- <span class="fragment">Parameterise fields explicitly — no implicit mutation.</span>
- <span class="fragment">Review prompt changes like behaviour changes: diff, approve, merge.</span>

---

## Structured output contract

| Field | Type | Rule |
| ----- | ---- | ---- |
| `documentType` | enum | Must be one of approved categories |
| `confidence` | number | 0–1, required |
| `entities` | array | Required, max length policy-constrained |
| `summary` | string | Optional, length-limited |

---

<blockquote>Contract first: model output must conform before use.</blockquote>

---

## Validation gates: pre-call

Checks that run **before** the model is invoked:

- <span class="fragment">Input shape and required fields</span>
- <span class="fragment">Size and type constraints</span>
- <span class="fragment">Policy constraints (allowed routes, feature flags)</span>

<span class="fragment">Failing here is cheap. Failing after a model call is not.</span>

---

## Validation gates: post-call

Checks that run **after** the model responds:

- <span class="fragment">Schema and parse validity</span>
- <span class="fragment">Policy checks (allowed categories, content rules)</span>
- <span class="fragment">Confidence threshold — trigger fallback if below minimum</span>

<span class="fragment">Model output is untrusted until it passes post-call validation.</span>

---

## Gateway integration goals

- <span class="fragment">Consistent model invocation contract across features</span>
- <span class="fragment">Prompt and model provenance recorded in trace metadata</span>
- <span class="fragment">Central routing and provider abstraction</span>
- <span class="fragment">Audit-ready request/response envelope</span>

<span class="fragment">The gateway is a governance control point, not just a transport wrapper.</span>

---

## Failure and fallback design

**When validation fails:**

- <span class="fragment">Do not return raw model output.</span>
- <span class="fragment">Return a deterministic "needs review" response.</span>
- <span class="fragment">Persist trace and failure reason for follow-up.</span>
- <span class="fragment">Maintain a UI-safe output contract at all times.</span>

<span class="fragment">Safe fallback is intentional design — not a sign the feature failed.</span>

---

## Testing strategy for workflow modules

- <span class="fragment">**Unit tests**: orchestration branches and decision logic</span>
- <span class="fragment">**Contract tests**: request/response schema conformance</span>
- <span class="fragment">**Validation tests**: rejection and fallback paths</span>
- <span class="fragment">**Integration tests**: gateway adapter stub with trace verification</span>

---

## Module 2 lab build target

You will implement a NestJS endpoint that:

- <span class="fragment">Accepts document input via a validated controller contract</span>
- <span class="fragment">Runs deterministic workflow orchestration in a service layer</span>
- <span class="fragment">Calls the model via gateway with trace metadata and prompt version</span>
- <span class="fragment">Enforces post-call schema and policy checks</span>
- <span class="fragment">Returns an accepted output or a safe fallback response</span>

<span class="fragment">Definition of done: each layer has a clear boundary and the fallback path is tested.</span>

---

## Summary

1. <span class="fragment">**Structure beats ad-hoc calls** for reliability and reuse.</span>
2. <span class="fragment">**Prompts are code artefacts** and must be versioned and reviewed.</span>
3. <span class="fragment">**Validation gates are mandatory** — pre-call and post-call.</span>
4. <span class="fragment">**Gateway integration** enables auditability and trace consistency.</span>

---

## Bridge to Module 3

**What we've built:**

- <span class="fragment">A deterministic, traceable workflow pattern you can reuse across features.</span>

**What's next:**

- <span class="fragment">Decide when deterministic workflows are the right tool — and when they aren't.</span>
- <span class="fragment">Your first task in Module 3: map your workflow against the agent decision framework.</span>

<span class="fragment">Module 3 covers workflow vs agent design: predictability, tool usage, and where agentic behaviour is appropriate.</span>

---

# Questions?

*Module 2 — Governed AI Feature Delivery*