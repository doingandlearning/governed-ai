# Lab 1: Identify AI Risk Boundaries

## Objective
In this lab, you'll map a governed AI request flow and identify where controls should exist before any implementation begins. You'll practice trust-boundary mapping, validation placement, and audit-focused logging design.

You will:
1. Map an end-to-end request lifecycle for the module scenario.
2. Classify trusted vs untrusted inputs and outputs.
3. Propose validation gates at key control points.
4. Define minimum logging and trace metadata for auditability.
5. Produce a reusable boundary checklist for future modules.

---

## Scenario: Document Intake Assistant

You are part of a team building an AI-powered document intake feature for a regulated environment.

The feature needs to:
- Accept document text from a frontend workflow.
- Extract key structured fields from content.
- Classify document type for routing.
- Return output to a UI for review before save.

This is similar to real enterprise processing where output quality, auditability, and safe fallback behavior matter as much as functionality.

---

## Task 1: Map the Request Lifecycle

Create a simple lifecycle map from user input to frontend display.

**Your task:**
- Draw a 6-8 step flow from input to output.
- Label major components (frontend, backend workflow, gateway, model, validator).
- Identify where policy or business rules are applied.
- Mark where a trace ID should first be created and propagated.

**Hints:**
- Start from the lifecycle slide in Module 1.
- Treat "model call" as one step, not the whole workflow.
- Keep the flow deterministic at this stage.
- Use a whiteboard, Mermaid, or plain bullets.

<details>
<summary>Possible Solution for Task 1</summary>

```text
1) Frontend submits document text + metadata
2) Backend controller validates request shape and auth context
3) Workflow service prepares prompt variables and policy constraints
4) Gateway sends model request with trace metadata
5) Model returns candidate structured output
6) Post-call validator checks schema + policy rules
7) Workflow returns accepted output (or fallback/refusal)
8) Frontend renders structured result for review
```

</details>

---

## Task 2: Identify Trust Boundaries and Risks

Now identify where data should be treated as untrusted and what can go wrong.

**Your task:**
- Mark each input/output in your flow as trusted, semi-trusted, or untrusted.
- Identify at least 4 concrete risks across the flow.
- For each risk, note where it should be caught.
- Include at least one prompt-injection-style risk.

**Hints:**
- User input and document content are untrusted by default.
- Model outputs are untrusted until validated.
- Internal config/policy can be trusted, but only when versioned and controlled.
- Think about hallucination, data leakage, and trace gaps.

<details>
<summary>Possible Solution for Task 2</summary>

```text
Boundary examples:
- Untrusted: user prompt text, uploaded document text
- Semi-trusted: internal service enrichment data
- Untrusted until validated: model output
- Trusted: versioned policy config and schema definitions

Risk examples:
1) Prompt injection in document text -> catch at input screening + instruction hierarchy
2) Hallucinated extracted field -> catch at post-call schema/business validation
3) PII leakage in response -> catch at output redaction filter before UI
4) Missing audit trail -> catch via gateway trace metadata requirements
```

</details>

---

## Task 3: Define Control Points (Validation + Logging)

Turn your map into a minimum governance checklist.

**Your task:**
- Specify at least 2 pre-call validation checks.
- Specify at least 2 post-call validation checks.
- Define minimum fields to log/trace for each request.
- Add a fallback behavior when validation fails.

**Hints:**
- Pre-call checks usually cover input shape, size, and policy constraints.
- Post-call checks usually cover schema, confidence thresholds, and safety policy.
- Keep logs privacy-aware; avoid full sensitive payload dumps.
- A safe fallback can be refusal + human review route.

<details>
<summary>Possible Solution for Task 3</summary>

```text
Pre-call checks:
- Input schema valid (required fields present)
- Document size/type within limits

Post-call checks:
- Output matches extraction schema
- Output passes policy checks (no disallowed fields/content)

Minimum trace/log fields:
- trace_id
- request_timestamp
- prompt_version
- model_identifier
- validation_results (pre/post)
- outcome_status (accepted/fallback/refused)

Fallback:
- Return "needs review" status with non-destructive message
- Persist trace for manual follow-up
```

</details>

---

## Example Output

```text
Lifecycle map complete: 8 steps
Trust boundaries identified: 6
Risks identified: 5
Validation controls defined: pre-call(2), post-call(3)
Trace contract defined: yes
Fallback behavior defined: yes
```

---

## Key Concepts Demonstrated

- **Trust boundaries**: identifying where data must be treated as unsafe by default.
- **Validation gates**: adding deterministic checks around non-deterministic model behavior.
- **Auditability**: defining trace metadata required for governance and incident review.
- **Safe degradation**: failing safely when output quality or policy checks fail.

---

## Facilitator Debrief Prompts

1. Which boundary was most surprising to your team?
2. Where did you initially over-trust model output?
3. What is the minimum trace data needed to explain a bad decision later?
4. What would you standardize immediately across teams?

---

## Next Steps

In Module 2, you will implement this same flow as a structured NestJS workflow with prompt assets in code, gateway integration, and schema-first validation.
