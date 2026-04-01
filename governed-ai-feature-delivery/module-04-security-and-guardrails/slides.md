# Security and Guardrails

**Module 4 — Governed AI Feature Delivery**

---

## The problem we're solving

AI features are vulnerable at multiple trust boundaries.

- <span class="fragment">Prompt injection via user or document input</span>
- <span class="fragment">Sensitive data leakage risks</span>
- <span class="fragment">Unsafe tool invocation</span>
- <span class="fragment">Unvalidated outputs reaching users</span>

<span class="fragment">Now: apply layered controls and safe fallback paths.</span>

---

## Why this matters in delivery

- <span class="fragment">Security failures are usually architecture failures, not prompt mistakes.</span>
- <span class="fragment">Most incidents happen at trust boundaries.</span>
- <span class="fragment">Guardrails must be engineered into the workflow, not bolted on later.</span>
- <span class="fragment">Safe fallback is part of product quality in regulated environments.</span>

---

## Guardrail layers

- <span class="fragment">Input screening and trust labelling</span>
- <span class="fragment">Prompt constraints and system boundaries</span>
- <span class="fragment">Tool permission and parameter constraints</span>
- <span class="fragment">Output validation and refusal handling</span>
- <span class="fragment">Fallback behaviour for uncertain responses</span>

---

### Trust boundary map

| Boundary | Typical examples | Default  level |
| -------- | ---------------- | ------------------- |
| User input | Free text, form fields, uploads | Untrusted |
| Document / retrieved text | OCR, retrieved chunks, attachments | Untrusted |
| Tool responses | External APIs, search tools | Semi-trusted |
| Internal policy / config | Allowlists, schemas, thresholds | Trusted |

---

>Rule: assume untrusted unless explicitly verified otherwise.

---

## Prompt injection: how it enters systems

- <span class="fragment">Direct user messages that attempt to override instructions.</span>
- <span class="fragment">Embedded instructions inside uploaded documents.</span>
- <span class="fragment">Retrieved context that contains adversarial content.</span>
- <span class="fragment">Tool output treated as authority without validation.</span>

---

## Prompt injection: defence patterns

- <span class="fragment">Separate instructions from user and document content structurally.</span>
- <span class="fragment">Use an explicit instruction hierarchy: system over policy over user.</span>
- <span class="fragment">Treat all retrieved and document content as data only, never as instructions.</span>
- <span class="fragment">Reject or sanitise known hostile patterns before prompt assembly.</span>

---

## Input guardrails (pre-call)

- <span class="fragment">Validate payload schema and required fields.</span>
- <span class="fragment">Enforce size, type, and format limits.</span>
- <span class="fragment">Classify and label the trust level of each input source.</span>
- <span class="fragment">Apply PII and sensitive-content detection where required.</span>

<span class="fragment">Failing pre-call is cheap. Failing post-call is not.</span>

---

## Tool guardrails

- <span class="fragment">Allowlist tool access per workflow, not per request.</span>
- <span class="fragment">Constrain tool parameters and output size explicitly.</span>
- <span class="fragment">Set timeout and retry limits per tool.</span>
- <span class="fragment">Require approval gates for high-impact actions.</span>

<span class="fragment">Internal tools still need constraints and observability.</span>

---

## Output guardrails (post-call)

- <span class="fragment">Schema validation for contract correctness.</span>
- <span class="fragment">Policy validation for business and compliance rules.</span>
- <span class="fragment">Confidence and uncertainty thresholds for acceptance.</span>
- <span class="fragment">Redaction before returning output to the frontend.</span>

<span class="fragment">Schema passing is not the same as policy passing. Both are required.</span>

---

## Refusal and fallback design

**When a response is uncertain or non-compliant:**

- <span class="fragment">Refuse unsafe requests with a clear, consistent explanation.</span>
- <span class="fragment">Return a deterministic <code>needs_review</code> shape for ambiguous outputs.</span>
- <span class="fragment">Preserve the response contract so the frontend does not need special-case handling.</span>
- <span class="fragment">Log the reason and trace for follow-up and audit.</span>

<span class="fragment">Refusal and needs-review are safe product behaviours, not error states.</span>

---

## What not to do

- <span class="fragment">Apply one regex and call it prompt injection protection.</span>
- <span class="fragment">Trust model output because the schema parsed once.</span>
- <span class="fragment">Allow unrestricted tool invocation.</span>
- <span class="fragment">Expose raw model output directly to end users.</span>

---

## Security test scenarios

1. <span class="fragment">Injection string embedded in a document body.</span>
2. <span class="fragment">Oversized input payload designed to stress limits.</span>
3. <span class="fragment">Tool response with unexpected or malformed structure.</span>
4. <span class="fragment">Output that passes schema but fails policy validation.</span>
5. <span class="fragment">Low-confidence extraction that should trigger fallback.</span>

---

## Governance and regional context

- <span class="fragment">Controls should produce audit evidence by default, not on request.</span>
- <span class="fragment">Trace retention and response explainability are operational requirements.</span>
- <span class="fragment">Regional deployment constraints (EU/US) may affect tooling and data routing paths.</span>
- <span class="fragment">Guardrails should be reusable patterns shared across features, not per-feature improvisations.</span>

---

## Module 4 lab build target

You will harden an existing workflow by adding:

- <span class="fragment">Input screening and trust labelling</span>
- <span class="fragment">Post-call schema and policy checks</span>
- <span class="fragment">Tool constraints and approval gates</span>
- <span class="fragment">Refusal and fallback behaviour with deterministic response shape</span>
- <span class="fragment">Trace fields covering security-relevant decisions</span>

<span class="fragment">Definition of done: every trust boundary has an explicit control and the fallback path is tested.</span>

---

## Summary

1. <span class="fragment">**Security is boundary design** plus control-flow discipline.</span>
2. <span class="fragment">**Guardrails are layered**: input, prompt, tool, output, fallback.</span>
3. <span class="fragment">**Validation is dual**: schema correctness and policy compliance.</span>
4. <span class="fragment">**Safe fallback** is a success path, not an exception path.</span>

---

### Bridge to Module 5

**What we have now:**

- <span class="fragment">A hardened backend workflow with layered controls at every trust boundary.</span>

**What is next:**

- <span class="fragment">Secure backend outputs still need responsible UX to be useful.</span>

<span class="fragment">Module 5 covers frontend AI UX patterns, including how to present uncertainty clearly without undermining user trust.</span>

---

# Questions?

*Module 4 — Governed AI Feature Delivery*