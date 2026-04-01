# Frontend AI UX Patterns

**Module 5 — Governed AI Feature Delivery**

---

## The problem we're solving

Chat-style output alone is often unclear and hard to verify.

- <span class="fragment">Unclear confidence and uncertainty</span>
- <span class="fragment">Weak evidence visibility</span>
- <span class="fragment">Poor review workflow for structured data</span>
- <span class="fragment">Risky direct action from unverified output</span>

<span class="fragment">Now: build structured, reviewable AI UX patterns.</span>

---

## Why this matters in product delivery

- <span class="fragment">Users act on what the UI communicates, not on backend intent.</span>
- <span class="fragment">Unsafe UX can bypass otherwise strong backend controls.</span>
- <span class="fragment">Trust comes from clarity, not from polished visual design alone.</span>
- <span class="fragment">Frontend standards are needed for consistency across teams.</span>

---

## UI patterns that work

- <span class="fragment">Structured result cards over raw text blocks</span>
- <span class="fragment">Confidence and evidence cues in-context</span>
- <span class="fragment">Editable review step before commit</span>
- <span class="fragment">Streaming states with clear progression</span>

---

## Chat-first vs task-first UX

| Approach | Strength | Risk |
| -------- | -------- | ---- |
| Chat-first UI | fast prototyping | weak structure and poor verification |
| Task-first structured UI | clear review and control | more upfront design effort |

<span class="fragment">For governed features, task-first usually wins.</span>

---

## Structured output presentation

- <span class="fragment">Display typed fields, not paragraphs of generated text.</span>
- <span class="fragment">Separate extracted data from explanatory notes.</span>
- <span class="fragment">Show status per field (accepted, uncertain, missing).</span>
- <span class="fragment">Keep response shape aligned with backend contract.</span>

---

## Confidence and uncertainty design

- <span class="fragment">Confidence is a signal, not a guarantee.</span>
- <span class="fragment">Use bands (high/medium/low) with explicit meaning.</span>
- <span class="fragment">Highlight uncertain fields for review.</span>
- <span class="fragment">Do not hide ambiguity to make UI look "clean".</span>

---

## Evidence and explanation patterns

- <span class="fragment">Show supporting source snippet or reference when possible.</span>
- <span class="fragment">Provide concise "why this was chosen" text.</span>
- <span class="fragment">Link to trace id or audit details for advanced users.</span>
- <span class="fragment">Avoid exposing internal prompt text/policy internals.</span>

---

## Review-before-commit flow

1. <span class="fragment">Render model output in editable structured form.</span>
2. <span class="fragment">Highlight uncertain or policy-sensitive fields.</span>
3. <span class="fragment">Require explicit confirmation for high-impact actions.</span>
4. <span class="fragment">Persist reviewed state and decision metadata.</span>

---

## Redaction and safe display

- <span class="fragment">Mask sensitive fields by default where needed.</span>
- <span class="fragment">Control visibility by role/permission.</span>
- <span class="fragment">Prevent accidental copy/export of protected data.</span>
- <span class="fragment">Keep redaction behavior consistent across components.</span>

---

## Streaming UX with SSE

- <span class="fragment">Show deterministic state stages (queued -> processing -> partial -> complete).</span>
- <span class="fragment">Render partial updates without layout thrash.</span>
- <span class="fragment">Handle stream interruption with clear fallback state.</span>
- <span class="fragment">Never present partial output as final by default.</span>

---

## State model for reliable UX

| UI state | Meaning | User action |
| -------- | ------- | ----------- |
| `loading` | request in progress | wait / cancel |
| `partial` | stream incomplete | monitor progress |
| `needs_review` | uncertain or policy-sensitive output | review/edit/approve |
| `accepted` | validated safe output | continue workflow |
| `error` | request failed | retry/escalate |

---

## What to avoid

- <span class="fragment">One-click actions on unreviewed model output.</span>
- <span class="fragment">Single confidence number with no context.</span>
- <span class="fragment">Inconsistent fallback behavior between screens.</span>
- <span class="fragment">UI contracts that diverge from backend statuses.</span>

---

## UX test scenarios

1. <span class="fragment">High confidence + valid evidence.</span>
2. <span class="fragment">Low confidence on one critical field.</span>
3. <span class="fragment">Policy-blocked field requiring redaction.</span>
4. <span class="fragment">Interrupted SSE stream.</span>
5. <span class="fragment">Fallback response from backend (`needs_review`).</span>

---

## Module 5 lab build target

Build a TanStack component that:

- <span class="fragment">Displays structured extraction output</span>
- <span class="fragment">Shows confidence and evidence</span>
- <span class="fragment">Supports edit-before-save review flow</span>
- <span class="fragment">Handles streaming and fallback states</span>
- <span class="fragment">Uses safe display/redaction where needed</span>

---

## Summary

1. <span class="fragment">**UX is part of governance**: it controls user decisions.</span>
2. <span class="fragment">**Structured UI beats generic chat** for production workflows.</span>
3. <span class="fragment">**Uncertainty must be visible** and reviewable.</span>
4. <span class="fragment">**State discipline** is essential for streaming and fallback reliability.</span>

---

## Bridge to Module 6

- <span class="fragment">Good UX needs measurable quality.</span>
- <span class="fragment">Next: evaluate behavior with repeatable test sets.</span>

---

# Questions?
