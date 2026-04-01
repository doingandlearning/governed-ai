# AI Feature Delivery in Regulated Environments

**Module 1 — Governed AI Feature Delivery**

---

## The problem we're solving

AI features behave differently from traditional backend features.

- <span class="fragment">Non-deterministic outputs and quality variance</span>
- <span class="fragment">Model and prompt version drift over time</span>
- <span class="fragment">Hidden risk (hallucination, PII, unsafe actions)</span>
- <span class="fragment">Audit and governance expectations</span>

<span class="fragment">Today: define a safe, reusable architecture.</span>

---

## What "governed" means

- <span class="fragment">Traceable requests</span>
- <span class="fragment">Versioned prompts and models</span>
- <span class="fragment">Validation gates</span>
- <span class="fragment">Clear responsibility boundaries</span>
- <span class="fragment">Repeatable evaluation and release criteria</span>

---

## Why this matters now

- <span class="fragment">AI is already in production paths, internal and client-facing.</span>
- <span class="fragment">Teams need standards, not one-off implementations.</span>
- <span class="fragment">Governance has to be built into delivery, not added later.</span>
- <span class="fragment">Reusable patterns reduce risk and speed up future features.</span>

---

## Traditional vs AI Feature: Output Behavior

| Traditional feature | AI feature               |
| ------------------- | ------------------------ |
| Deterministic      | Probabilistic / variable |

<span class="fragment">Traditional: Same input always gives the same output.</span>  
<span class="fragment">AI: Output can vary with each request, even for identical input.</span>  
<span class="fragment">This uncertainty impacts testability, reliability, and user trust.</span>

---

## Traditional vs AI Feature: Testing Approach

| Traditional feature                 | AI feature                                 |
| ------------------------------------ | ------------------------------------------- |
| Unit/integration mostly enough      | Needs eval datasets + quality thresholds   |

<span class="fragment">Traditional: Unit and integration tests are typically sufficient.</span>  
<span class="fragment">AI: Requires realistic evaluation datasets and measurable quality targets.</span>  
<span class="fragment">Success is about overall averages, not just pass/fail per case.</span>

---

## Traditional vs AI Feature: Change Risk

| Traditional feature     | AI feature                             |
| ----------------------- | --------------------------------------- |
| Mostly code changes    | Code + prompt + model + data drift     |

<span class="fragment">Traditional: Most risk comes from code changes and deployments.</span>  
<span class="fragment">AI: Risk sources include prompt edits, new model versions, and data shifts.</span>  
<span class="fragment">Change and drift can happen outside of mainline code, requiring new controls.</span>

---

## Traditional vs AI Feature: Observability Need

| Traditional feature   | AI feature                                  |
| --------------------- | -------------------------------------------- |
| Logs and metrics     | Logs, traces, prompt/model provenance        |

<span class="fragment">Traditional: Basic logs and service metrics usually suffice for diagnosis.</span>  
<span class="fragment">AI: Also must record which prompt and which model generated each output.</span>  
<span class="fragment">This provenance is key for debugging, trust, and regulatory reviews.</span>

---

<blockquote><b>Key point:</b> AI features require a broader and deeper engineering contract.</blockquote>

<span class="fragment">Same engineering discipline — expanded control surface.</span>

---

## The AI request lifecycle

1. <span class="fragment">User or system submits input.</span>
2. <span class="fragment">Backend workflow prepares context and policy constraints.</span>
3. <span class="fragment">Gateway routes model call and records trace metadata.</span>
4. <span class="fragment">Model returns structured/unstructured response.</span>
5. <span class="fragment">Post-call validation and safety checks run.</span>
6. <span class="fragment">Frontend presents result with confidence/review affordances.</span>

---

## Architecture boundaries (course stack)

- <span class="fragment">**TanStack frontend**: interaction, review, uncertainty display</span>
- <span class="fragment">**NestJS backend**: orchestration, policy, deterministic workflow steps</span>
- <span class="fragment">**LLM gateway**: routing, traceability, auditability controls</span>
- <span class="fragment">**Model provider**: inference capability, latency/cost trade-offs</span>
- <span class="fragment">**Evaluation layer**: quality checks and regression detection</span>

---

## Where logic should live

| Put it in...          | Typical responsibilities                                  | Example                                   |
| --------------------- | --------------------------------------------------------- | ----------------------------------------- |
| Backend code          | Workflow sequence, retries, policy branching              | Retry if confidence score below threshold |
| Prompt assets in code | Task instructions, output format constraints              | Extraction schema and field definitions   |
| Config                | Model selection, thresholds, feature flags                | Model name, confidence threshold, region  |
| Infrastructure        | Deployment policy, secrets, regional routing, monitoring  | EU/US routing rules, secrets management   |

---

<blockquote>Rule: avoid hiding business rules inside prompts only.</blockquote>

---

## Risk categories to design for

- <span class="fragment">**Hallucination**: plausible but incorrect output</span>
- <span class="fragment">**Data exposure**: leakage of PII or sensitive context</span>
- <span class="fragment">**Trace gaps**: no explainable path from input to decision</span>
- <span class="fragment">**Operational drift**: prompt/model changes with no controls</span>

---

## Regulated environment expectations

- <span class="fragment">You need evidence for how decisions were produced.</span>
- <span class="fragment">You need repeatable release criteria, not judgment calls.</span>
- <span class="fragment">You need clear controls for fallback and rollback.</span>
- <span class="fragment">You need region-aware operations where required (for example EU/US).</span>

---

## Governance is not "slow"

**Common fear:** "Governance will slow us down."

- <span class="fragment">Without standards: every feature reinvents controls.</span>
- <span class="fragment">With standards: teams ship faster using reusable modules.</span>
- <span class="fragment">Auditability and safety become defaults, not special projects.</span>

<span class="fragment">Governance done well is a delivery accelerator.</span>

---

## Core scenario for this course

Build an AI-powered document-processing feature that:

- <span class="fragment">Accepts document/text input</span>
- <span class="fragment">Extracts structured information</span>
- <span class="fragment">Classifies/routes results</span>
- <span class="fragment">Applies validation and guardrails</span>
- <span class="fragment">Surfaces outputs in a reviewable UI</span>

<span class="fragment">This scenario was chosen deliberately: it combines extraction, classification, validation, and review — touching every layer of the governed architecture.</span>

<span class="fragment">The same feature thread runs through all eight modules.</span>

---

## What we deliver by the end of Module 1

- <span class="fragment">Shared architecture diagram</span>
- <span class="fragment">Agreed request lifecycle and control points</span>
- <span class="fragment">Initial definition of "governed" for this organisation</span>
- <span class="fragment">A baseline pattern to reuse in modules 2–8</span>

---

## Summary

1. <span class="fragment">**AI features are different**: they need broader engineering controls.</span>
2. <span class="fragment">**Governed delivery is practical**: boundaries, traceability, validation.</span>
3. <span class="fragment">**Architecture matters early**: where logic lives determines risk.</span>
4. <span class="fragment">**This is the foundation** for workflows, guardrails, UX, evals, and deployment.</span>

---

## Bridge to Module 2

**What we've learned:**

- <span class="fragment">Where responsibilities should sit across the stack.</span>
- <span class="fragment">Which risks and controls must be explicit from day one.</span>

**What's next:**

- <span class="fragment">Implement the backend workflow pattern in NestJS.</span>
- <span class="fragment">Your first task: build the NestJS service skeleton that owns the orchestration boundary. You already know what it's responsible for — now you'll build it.</span>

<span class="fragment">Module 2 turns this architecture into reusable implementation structure.</span>

---

# Questions?

*Module 1 — Governed AI Feature Delivery*