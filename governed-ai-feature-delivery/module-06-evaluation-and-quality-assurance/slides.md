# Evaluation and Quality Assurance

**Module 6 — Governed AI Feature Delivery**

---

## The problem we're solving

Without evaluation, quality discussions become opinion-based.

- <span class="fragment">No baseline for model or prompt changes</span>
- <span class="fragment">Bugs discovered only in production</span>
- <span class="fragment">No shared quality criteria across teams</span>
- <span class="fragment">Weak release confidence</span>

<span class="fragment">Now: define lightweight, repeatable AI evals.</span>

---

## Why evals matter in teams

- <span class="fragment">They replace opinion with measurable quality signals.</span>
- <span class="fragment">They make prompt/model changes safer and faster.</span>
- <span class="fragment">They provide shared release criteria across teams.</span>
- <span class="fragment">They create audit-ready evidence of quality decisions.</span>

---

## What to evaluate

- <span class="fragment">Correctness and schema compliance</span>
- <span class="fragment">Safety and refusal behavior</span>
- <span class="fragment">Hallucination and grounding checks</span>
- <span class="fragment">Latency and cost thresholds</span>

---

## Manual QA vs repeatable evals

| Approach | Strength | Limitation |
| -------- | -------- | ---------- |
| Manual QA | fast spot-checking | not scalable, inconsistent |
| Repeatable eval suite | reliable regression detection | requires initial setup |

<span class="fragment">Use both, but never rely on manual QA alone.</span>

---

## Evaluation dimensions

1. <span class="fragment">Correctness: is output factually and functionally right?</span>
2. <span class="fragment">Format: does output match schema/contract?</span>
3. <span class="fragment">Safety: does behavior follow policy and refusal rules?</span>
4. <span class="fragment">Grounding: is response supported by input/evidence?</span>
5. <span class="fragment">Operational: latency, cost, and error-rate targets.</span>

---

## Golden datasets

- <span class="fragment">Curated input/output cases tied to real workflows.</span>
- <span class="fragment">Include both "happy path" and failure edge cases.</span>
- <span class="fragment">Version dataset alongside prompt/model changes.</span>
- <span class="fragment">Keep cases small but representative to start.</span>

---

## Designing pass/fail criteria

- <span class="fragment">Define machine-checkable expectations where possible.</span>
- <span class="fragment">Separate hard failures from soft quality thresholds.</span>
- <span class="fragment">Use explicit tolerances for numeric/format variance.</span>
- <span class="fragment">Map each criterion to release risk.</span>

---

## Example eval case (extraction)

| Field | Expected | Rule |
| ----- | -------- | ---- |
| `documentType` | `invoice` | exact match |
| `confidence` | `0..1` | must be valid range |
| `entities` | includes amount + invoice_number | required keys present |
| refusal behavior | `needs_review` on low confidence | policy-compliant fallback |

---

## Prompt/model comparison workflow

- <span class="fragment">Run same dataset across variants.</span>
- <span class="fragment">Compare accuracy, safety, latency, and cost.</span>
- <span class="fragment">Promote only if quality improves or remains acceptable.</span>
- <span class="fragment">Record rationale for chosen variant.</span>

---

## Trace-driven debugging

- <span class="fragment">Inspect failed eval traces for exact failure stage.</span>
- <span class="fragment">Distinguish prompt issue vs parsing issue vs policy gate issue.</span>
- <span class="fragment">Turn recurring failures into permanent test cases.</span>
- <span class="fragment">Use traces to explain release decisions clearly.</span>

---

## Lightweight eval architecture

- <span class="fragment">Dataset file(s) + runner + scorer + report output.</span>
- <span class="fragment">Start local, then integrate into CI.</span>
- <span class="fragment">Keep framework simple enough for team ownership.</span>
- <span class="fragment">Avoid overengineering before baseline is stable.</span>

---

## Common eval anti-patterns

- <span class="fragment">Only measuring one metric (for example accuracy).</span>
- <span class="fragment">No safety/refusal checks in eval suite.</span>
- <span class="fragment">Dataset drift without version tracking.</span>
- <span class="fragment">Ignoring latency/cost impact of quality improvements.</span>

---

## Module 6 lab build target

You will create a lightweight eval suite with:

- <span class="fragment">Golden dataset inputs</span>
- <span class="fragment">Expected outputs and pass/fail rules</span>
- <span class="fragment">Prompt/model comparison run</span>
- <span class="fragment">Trace inspection for failed cases</span>
- <span class="fragment">Release recommendation summary</span>

---

## Summary

1. <span class="fragment">**If it matters, evaluate it** with repeatable criteria.</span>
2. <span class="fragment">**Golden datasets** anchor quality over time.</span>
3. <span class="fragment">**Traces + evals together** improve debugging and governance.</span>
4. <span class="fragment">**Release confidence** comes from measurable evidence.</span>

---

## Bridge to Module 7

- <span class="fragment">Evaluation informs deployment decisions.</span>
- <span class="fragment">Next: ship with governance and observability controls.</span>

---

# Questions?
