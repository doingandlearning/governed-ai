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
- <span class="fragment">They make prompt and model changes safer and faster to adopt.</span>
- <span class="fragment">They provide shared release criteria across teams.</span>
- <span class="fragment">They create audit-ready evidence of quality decisions.</span>

<span class="fragment">Evals are not research infrastructure. They are a delivery discipline.</span>

---

## What to evaluate

- <span class="fragment">Correctness and schema compliance</span>
- <span class="fragment">Safety and refusal behaviour</span>
- <span class="fragment">Hallucination and grounding checks</span>
- <span class="fragment">Latency and cost thresholds</span>

<span class="fragment">If it matters for release, it needs a measurable criterion.</span>

---

## Manual QA vs repeatable evals

| Approach | Strength | Limitation |
| -------- | -------- | ---------- |
| Manual QA | Fast spot-checking | Not scalable, inconsistent coverage |
| Repeatable eval suite | Reliable regression detection | Requires initial dataset setup |

<span class="fragment">Use both. Never rely on manual QA alone for release decisions.</span>

---

## Evaluation dimensions

1. <span class="fragment">Correctness: is output factually and functionally right?</span>
2. <span class="fragment">Format: does output match the schema and contract?</span>
3. <span class="fragment">Safety: does behaviour follow policy and refusal rules?</span>
4. <span class="fragment">Grounding: is the response supported by input or evidence?</span>
5. <span class="fragment">Operational: latency, cost, and error-rate targets.</span>

<span class="fragment">A release decision based on one dimension alone is incomplete.</span>

---

## Golden datasets

- <span class="fragment">Curated input and output cases tied to real workflows.</span>
- <span class="fragment">Include both happy-path cases and failure edge cases.</span>
- <span class="fragment">Version the dataset alongside prompt and model changes.</span>
- <span class="fragment">Start small and representative rather than large and shallow.</span>

<span class="fragment">Ten meaningful cases beat one hundred vague ones.</span>

---

## Designing pass/fail criteria

- <span class="fragment">Define machine-checkable expectations where possible.</span>
- <span class="fragment">Separate hard failures from soft quality thresholds.</span>
- <span class="fragment">Use explicit tolerances for numeric and format variance.</span>
- <span class="fragment">Map each criterion to release risk, not just technical correctness.</span>

---

## Example eval case: extraction

| Field | Expected | Rule |
| ----- | -------- | ---- |
| `documentType` | `invoice` | Exact match required |
| `confidence` | `0..1` | Must be within valid range |
| `entities` | Includes amount and invoice_number | Required keys must be present |
| Refusal behaviour | `needs_review` on low confidence | Policy-compliant fallback required |

<span class="fragment">Each rule maps directly to a release risk. If this case fails, the feature should not ship.</span>

---

## Prompt and model comparison workflow

- <span class="fragment">Run the same dataset across all variants being compared.</span>
- <span class="fragment">Compare accuracy, safety, latency, and cost together.</span>
- <span class="fragment">Promote a variant only if quality improves or remains within acceptable bounds.</span>
- <span class="fragment">Record the rationale for the chosen variant as part of the release record.</span>

---

## Trace-driven debugging

- <span class="fragment">Inspect failed eval traces to find the exact failure stage.</span>
- <span class="fragment">Distinguish prompt issues from parsing issues from policy gate failures.</span>
- <span class="fragment">Turn recurring failures into permanent test cases in the golden dataset.</span>
- <span class="fragment">Use traces to explain release decisions clearly to stakeholders and auditors.</span>

---

## Lightweight eval architecture

- <span class="fragment">Dataset files, a runner, a scorer, and a report output.</span>
- <span class="fragment">Start local, then integrate into CI as a release gate.</span>
- <span class="fragment">Keep the framework simple enough for the product team to own and extend.</span>
- <span class="fragment">Do not over-engineer before the baseline is stable.</span>

<span class="fragment">A simple eval that runs consistently is more valuable than a sophisticated one that does not.</span>

---

## Common eval anti-patterns

- <span class="fragment">Measuring only one dimension, such as accuracy alone.</span>
- <span class="fragment">No safety or refusal checks in the eval suite.</span>
- <span class="fragment">Dataset drift without version tracking alongside prompts and models.</span>
- <span class="fragment">Ignoring latency and cost impact when comparing quality improvements.</span>

---

## Module 6 lab build target

You will create a lightweight eval suite with:

- <span class="fragment">A golden dataset of inputs with expected outputs</span>
- <span class="fragment">Machine-checkable pass/fail rules per case</span>
- <span class="fragment">A prompt or model comparison run on the same dataset</span>
- <span class="fragment">Trace inspection notes for any failed cases</span>
- <span class="fragment">A release recommendation with written rationale</span>

<span class="fragment">Definition of done: the suite runs without manual intervention and produces a clear pass or fail result per case.</span>

---

## Summary

1. <span class="fragment">**If it matters, evaluate it** with repeatable, machine-checkable criteria.</span>
2. <span class="fragment">**Golden datasets** anchor quality across prompt and model changes over time.</span>
3. <span class="fragment">**Traces and evals together** improve debugging speed and governance evidence.</span>
4. <span class="fragment">**Release confidence** comes from measurable evidence, not manual review alone.</span>

---

## Bridge to Module 7

**What we have now:**

- <span class="fragment">A repeatable eval suite that produces evidence-based release recommendations.</span>

**What is next:**

- <span class="fragment">Evaluation results need to gate deployment, not just inform it.</span>
- <span class="fragment">Your first task in Module 7: define which eval criteria become hard CI gates before a release can proceed.</span>

<span class="fragment">Module 7 covers deployment, observability, and governance: shipping AI features safely and maintaining control after release.</span>

---

# Questions?

*Module 6 — Governed AI Feature Delivery*