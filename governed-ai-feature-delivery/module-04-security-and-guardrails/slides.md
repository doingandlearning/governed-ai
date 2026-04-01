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

- <span class="fragment">Input screening and trust labeling</span>
- <span class="fragment">Prompt constraints and system boundaries</span>
- <span class="fragment">Tool permission and parameter constraints</span>
- <span class="fragment">Output validation and refusal handling</span>
- <span class="fragment">Fallback behavior for uncertain responses</span>

---

## Trust boundary map

| Boundary | Typical examples | Default trust level |
| -------- | ---------------- | ------------------- |
| User input | free text, form fields, uploads | Untrusted |
| Document/retrieved text | OCR, retrieved chunks, attachments | Untrusted |
| Tool responses | external APIs, search tools | Semi-trusted |
| Internal policy/config | allowlists, schemas, thresholds | Trusted |

<span class="fragment">Rule: assume untrusted unless proven otherwise.</span>

---

## Prompt injection: how it enters systems

- <span class="fragment">Direct user messages ("ignore previous instructions").</span>
- <span class="fragment">Embedded instructions inside uploaded documents.</span>
- <span class="fragment">Retrieved context that contains adversarial content.</span>
- <span class="fragment">Tool output that is treated as authority without checks.</span>

---

## Prompt injection defense patterns

- <span class="fragment">Separate instructions from user/document content.</span>
- <span class="fragment">Use explicit instruction hierarchy (system > policy > user).</span>
- <span class="fragment">Treat all retrieved/document content as data only.</span>
- <span class="fragment">Reject or sanitize known hostile patterns.</span>

---

## Input guardrails (pre-call)

- <span class="fragment">Validate payload schema and required fields.</span>
- <span class="fragment">Enforce size/type/format limits.</span>
- <span class="fragment">Classify and label trust level of each input source.</span>
- <span class="fragment">Apply PII and sensitive-content detection where needed.</span>

---

## Tool guardrails

- <span class="fragment">Allowlist tool access per workflow.</span>
- <span class="fragment">Constrain tool parameters and output size.</span>
- <span class="fragment">Set timeout/retry limits per tool.</span>
- <span class="fragment">Require approval for high-impact actions.</span>

---

## Output guardrails (post-call)

- <span class="fragment">Schema validation for contract correctness.</span>
- <span class="fragment">Policy validation for business and compliance rules.</span>
- <span class="fragment">Confidence/uncertainty thresholds for acceptance.</span>
- <span class="fragment">Redaction before returning output to frontend.</span>

---

## Refusal and fallback design

**When uncertain or non-compliant:**

- <span class="fragment">Refuse unsafe requests with clear explanation.</span>
- <span class="fragment">Return `needs_review` for ambiguous outputs.</span>
- <span class="fragment">Preserve deterministic response contract.</span>
- <span class="fragment">Log reason and trace for follow-up.</span>

---

## What not to do

- <span class="fragment">One regex and call it "prompt injection protection".</span>
- <span class="fragment">Trust model output because schema parsed once.</span>
- <span class="fragment">Allow unrestricted tool invocation.</span>
- <span class="fragment">Expose raw output directly to end users.</span>

---

## Security test scenarios

1. <span class="fragment">Injection string in document body.</span>
2. <span class="fragment">Oversized input payload.</span>
3. <span class="fragment">Tool response with unexpected structure.</span>
4. <span class="fragment">Valid schema, policy-invalid content.</span>
5. <span class="fragment">Low-confidence extraction requiring fallback.</span>

---

## Governance and regional context

- <span class="fragment">Controls should produce audit evidence by default.</span>
- <span class="fragment">Trace retention and response explainability are operational requirements.</span>
- <span class="fragment">Regional deployment constraints (e.g., EU/US) may affect tooling/data paths.</span>
- <span class="fragment">Guardrails should be reusable patterns, not per-feature improvisation.</span>

---

## Module 4 lab build target

You will harden an existing workflow by adding:

- <span class="fragment">Input screening and trust labeling</span>
- <span class="fragment">Post-call schema + policy checks</span>
- <span class="fragment">Tool constraints</span>
- <span class="fragment">Refusal/fallback behavior</span>
- <span class="fragment">Trace fields for security decisions</span>

---

## Summary

1. <span class="fragment">**Security is boundary design** plus control-flow discipline.</span>
2. <span class="fragment">**Guardrails are layered**: input, prompt, tool, output, fallback.</span>
3. <span class="fragment">**Validation is dual**: schema and policy.</span>
4. <span class="fragment">**Safe fallback** is a success path, not an exception path.</span>

---

## Bridge to Module 5

- <span class="fragment">Secure backend outputs still need responsible UX.</span>
- <span class="fragment">Next: present AI uncertainty clearly in the frontend.</span>

---

# Questions?
