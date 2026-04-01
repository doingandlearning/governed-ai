# Frontend AI UX Patterns

**Module 5 — Governed AI Feature Delivery**

---

## The problem we're solving

Chat-style output alone is often unclear and hard to verify.

- <span class="fragment">Unclear confidence and uncertainty</span>
- <span class="fragment">Weak evidence visibility</span>
- <span class="fragment">Poor review workflow for structured data</span>
- <span class="fragment">Risky direct action on unverified output</span>

<span class="fragment">Now: build structured, reviewable AI UX patterns.</span>

---

## Why this matters in product delivery

- <span class="fragment">Users act on what the UI communicates, not on backend intent.</span>
- <span class="fragment">Unsafe UX can bypass otherwise strong backend controls.</span>
- <span class="fragment">Trust comes from clarity, not from polished visual design alone.</span>
- <span class="fragment">Frontend standards are needed for consistency across teams and features.</span>

<span class="fragment">The frontend is a control layer. Design it like one.</span>

---

## UI patterns that work

- <span class="fragment">Structured result cards over raw text blocks</span>
- <span class="fragment">Confidence and evidence cues shown in context</span>
- <span class="fragment">Editable review step before commit</span>
- <span class="fragment">Streaming states with clear progression</span>

---

## Chat-first vs task-first UX

| Approach | Strength | Risk |
| -------- | -------- | ---- |
| Chat-first UI | Fast prototyping | Weak structure, poor verification |
| Task-first structured UI | Clear review and control | More upfront design effort |

<span class="fragment">For governed features, task-first usually wins.</span>
<span class="fragment">The design effort pays back in auditability and user confidence.</span>

---

## Structured output presentation

- <span class="fragment">Display typed fields, not paragraphs of generated text.</span>
- <span class="fragment">Separate extracted data from explanatory or supporting notes.</span>
- <span class="fragment">Show status per field: accepted, uncertain, or missing.</span>
- <span class="fragment">Keep the frontend response shape aligned to the backend contract.</span>

---

>If the UI contract diverges from the backend contract, both become harder to govern.

---

## Confidence and uncertainty design

- <span class="fragment">Confidence is a signal, not a guarantee.</span>
- <span class="fragment">Use bands (high / medium / low) with explicit, documented meaning.</span>
- <span class="fragment">Highlight uncertain fields so reviewers know where to focus.</span>
- <span class="fragment">Do not hide ambiguity to make the UI look cleaner.</span>

<span class="fragment">Hiding uncertainty does not remove it. It just removes the reviewer's ability to act on it.</span>

---

## Evidence and explanation patterns

- <span class="fragment">Show a supporting source snippet or reference where possible.</span>
- <span class="fragment">Provide concise "why this result" text for key fields.</span>
- <span class="fragment">Link to trace id or audit detail for users who need it.</span>
- <span class="fragment">Do not expose internal prompt text or policy internals.</span>

---

## Review-before-commit flow

1. <span class="fragment">Render model output in an editable structured form.</span>
2. <span class="fragment">Highlight uncertain or policy-sensitive fields clearly.</span>
3. <span class="fragment">Require explicit confirmation before any high-impact action.</span>
4. <span class="fragment">Persist the reviewed state and decision metadata for audit.</span>

<span class="fragment">The user's confirmation is part of the audit trail, not just the UX.</span>

---

## Redaction and safe display

- <span class="fragment">Mask sensitive fields by default where required by policy.</span>
- <span class="fragment">Control field visibility by role and permission level.</span>
- <span class="fragment">Prevent accidental copy or export of protected data.</span>
- <span class="fragment">Apply redaction behaviour consistently across all components, not per screen.</span>

---

## Streaming UX with SSE

- <span class="fragment">Use deterministic state stages: queued, processing, partial, complete.</span>
- <span class="fragment">Render partial updates without layout shift.</span>
- <span class="fragment">Handle stream interruption with a clear fallback state.</span>
- <span class="fragment">Never present partial output as final output.</span>

---

## State model for reliable UX

![alt text](ui_state_model.svg)


---

![alt text](ui_state_machine.svg)

---

>Every state must have a defined user action. Undefined states become support tickets.

---

## What to avoid

- <span class="fragment">One-click actions on unreviewed model output</span>
- <span class="fragment">A single confidence number with no context or band definition</span>
- <span class="fragment">Inconsistent fallback behaviour between screens</span>
- <span class="fragment">UI state contracts that diverge from backend response statuses</span>

---

## UX test scenarios

1. <span class="fragment">High confidence output with valid supporting evidence.</span>
2. <span class="fragment">Low confidence on one critical field requiring review.</span>
3. <span class="fragment">Policy-blocked field requiring redaction before display.</span>
4. <span class="fragment">Interrupted SSE stream at partial completion.</span>
5. <span class="fragment">Fallback response from backend returning <code>needs_review</code>.</span>

---

## Module 5 lab build target

Build a TanStack component that:

- <span class="fragment">Displays structured extraction output with field-level status</span>
- <span class="fragment">Shows confidence bands and supporting evidence</span>
- <span class="fragment">Supports an edit-before-save review flow</span>
- <span class="fragment">Handles streaming states and fallback states explicitly</span>
- <span class="fragment">Applies safe display and redaction where policy requires it</span>

<span class="fragment">Definition of done: every UI state from the state model has a defined, tested rendering path.</span>

---

## Summary

1. <span class="fragment">**UX is part of governance**: it shapes what decisions users make and how.</span>
2. <span class="fragment">**Structured UI beats generic chat** for production workflows that require verification.</span>
3. <span class="fragment">**Uncertainty must be visible** and designed to be acted on, not hidden.</span>
4. <span class="fragment">**State discipline** is essential for streaming, fallback, and audit reliability.</span>

---

## Bridge to Module 6

**What we have now:**

- <span class="fragment">A governed frontend that makes AI output reviewable and auditable.</span>

**What is next:**

- <span class="fragment">Good UX needs measurable quality behind it to be trustworthy over time.</span>
- <span class="fragment">Your first task in Module 6: define what "correct" looks like for your extraction feature using a golden dataset.</span>

<span class="fragment">Module 6 covers evaluation and quality assurance: repeatable test sets, pass/fail criteria, and prompt comparison.</span>

---

# Questions?

*Module 5 — Governed AI Feature Delivery*