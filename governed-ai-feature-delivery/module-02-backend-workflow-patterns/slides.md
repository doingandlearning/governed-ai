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
// Controller calls model directly, no contract boundary
@Post("/extract")
async extract(@Body() body: any) {
  const result = await this.llm.invoke(body.text);
  return result;
}
```

- <span class="fragment">No input validation contract</span>
- <span class="fragment">No prompt version tracking</span>
- <span class="fragment">No output schema enforcement</span>
- <span class="fragment">No trace/audit metadata</span>

---

## Workflow layering in practice

- <span class="fragment">Controller: request/response contract only</span>
- <span class="fragment">Workflow service: orchestration and decisions</span>
- <span class="fragment">Prompt module: versioned prompt assets</span>
- <span class="fragment">Validators: pre/post-call checks</span>
- <span class="fragment">Gateway adapter: model access and tracing</span>

---

## Layer responsibilities at a glance

---

### Controller

- Owns: transport contract, auth context
- Avoids: orchestration and prompt logic

---

### Workflow service

- Owns: sequence, branching, retries, fallback
- Avoids: HTTP transport concerns

---

### Prompt module

- Owns: task instructions, placeholders, version id
- Avoids: business policy and branching

---

### Validators

- Owns: schema + policy checks
- Avoids: model invocation

---

### Gateway adapter

- Owns: model routing, trace metadata, audit envelope
- Avoids: domain decision logic

---

## Request flow (module 2 implementation path)

1. <span class="fragment">Validate incoming request schema in controller.</span>
2. <span class="fragment">Workflow builds prompt variables and context.</span>
3. <span class="fragment">Gateway call includes trace id + prompt version.</span>
4. <span class="fragment">Model output is parsed into expected schema.</span>
5. <span class="fragment">Post-call validator enforces schema and policy.</span>
6. <span class="fragment">Return accepted output or safe fallback response.</span>

---

## Prompt assets in code

- <span class="fragment">Store prompt templates as code artifacts, not hidden strings.</span>
- <span class="fragment">Attach version metadata for comparison and rollback.</span>
- <span class="fragment">Parameterize fields explicitly (no implicit mutation).</span>
- <span class="fragment">Review prompt changes like behavior changes.</span>

---

## Structured output contract

| Field | Type | Rule |
| ----- | ---- | ---- |
| `documentType` | enum | must be one of approved categories |
| `confidence` | number | 0-1 required |
| `entities` | array | required, max length policy-constrained |
| `summary` | string | optional, length-limited |

<span class="fragment">Contract first: model output must conform before use.</span>

---

## Validation gates

### Pre-call
- <span class="fragment">Input shape and required fields</span>
- <span class="fragment">Size and type constraints</span>
- <span class="fragment">Policy constraints (allowed routes, flags)</span>

### Post-call
- <span class="fragment">Schema and parse validity</span>
- <span class="fragment">Policy checks (allowed categories/content)</span>
- <span class="fragment">Confidence/fallback threshold checks</span>

---

## Gateway integration goals

- <span class="fragment">Consistent model invocation contract</span>
- <span class="fragment">Prompt/model provenance in trace metadata</span>
- <span class="fragment">Central place for routing and provider abstraction</span>
- <span class="fragment">Audit-ready request/response envelope</span>

---

## Failure and fallback design

**When validation fails:**

- <span class="fragment">Do not return raw model output.</span>
- <span class="fragment">Return deterministic "needs review" response.</span>
- <span class="fragment">Persist trace and failure reason for follow-up.</span>
- <span class="fragment">Keep UI-safe output contract.</span>

---

## Testing strategy for workflow modules

- <span class="fragment">Unit tests for orchestration branches</span>
- <span class="fragment">Contract tests for request/response schemas</span>
- <span class="fragment">Validation tests for rejection/fallback paths</span>
- <span class="fragment">Integration tests with gateway adapter stub</span>

---

## Module 2 lab build target

You will implement a NestJS endpoint that:

- <span class="fragment">Accepts document input</span>
- <span class="fragment">Runs deterministic workflow orchestration</span>
- <span class="fragment">Calls model via gateway with trace metadata</span>
- <span class="fragment">Enforces post-call schema and policy checks</span>
- <span class="fragment">Returns accepted or fallback response</span>

---

## Summary

1. <span class="fragment">**Structure beats ad-hoc calls** for reliability and reuse.</span>
2. <span class="fragment">**Prompts are code assets** and must be versioned/reviewed.</span>
3. <span class="fragment">**Validation gates are mandatory** around model variability.</span>
4. <span class="fragment">**Gateway integration** enables auditability and trace consistency.</span>

---

## Bridge to Module 3

- <span class="fragment">We can now build deterministic workflows.</span>
- <span class="fragment">Next: decide when those workflows should become agentic.</span>

---

# Questions?
