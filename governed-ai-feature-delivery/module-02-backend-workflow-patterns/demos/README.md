# Demos — Module 2

This runbook standardizes Module 2 delivery so participants see a consistent implementation pattern before lab work.

---

## Demo 1: NestJS Workflow Layering Walkthrough

### Purpose
Show a concrete backend structure that separates controller, workflow orchestration, prompt assets, validation, and gateway integration.

### Timebox
12-15 minutes

### Setup
- Open a prepared sample project (or pseudocode) with layered files.
- Have one request example ready (document extraction input).
- Keep architecture diagram from Module 1 visible for continuity.

### Script (suggested flow)
1. Show controller receiving validated DTO and delegating immediately.
2. Show workflow service orchestrating sequence and decision points.
3. Show prompt module with explicit `promptVersion`.
4. Show validator modules for pre-call and post-call checks.
5. Show gateway adapter interface and invocation metadata.
6. Summarize file/folder structure participants should mirror in lab.

### Talk track prompts
- "What belongs in controller vs workflow service?"
- "Where should prompt version be owned?"
- "What should never bypass validation?"

### Expected audience output
- Participants can explain each backend layer and its ownership.
- Participants can identify one anti-pattern in controller-heavy designs.

### Common failure modes
- Business logic in controller methods.
- Prompt text embedded inline with orchestration code.
- Gateway used directly from multiple layers without a common contract.

---

## Demo 2: Structured Output + Post-Validation Example

### Purpose
Demonstrate how model output is transformed from "candidate" to "accepted" only after schema and policy checks.

### Timebox
12-15 minutes

### Setup
- Prepare one "valid" and one "invalid" model output sample.
- Have output schema and policy constraints visible.
- Prepare fallback response example (`needs_review`).

### Script (suggested flow)
1. Run a request and show candidate model output.
2. Validate schema fields and required types.
3. Run policy checks (allowed categories/content rules).
4. Show accepted path for valid response.
5. Show fallback path for invalid/policy-failing response.
6. Show trace metadata recorded for both outcomes.

### Talk track prompts
- "Why is schema pass not always enough?"
- "What should frontend receive on validation failure?"
- "Which trace fields are mandatory for incident review?"

### Expected audience output
- Participants understand accepted vs needs_review contract.
- Participants can define minimum pre/post validation requirements.

### Common failure modes
- Returning raw model output before validation.
- Logging sensitive payload content without constraints.
- Inconsistent response shape between success and fallback paths.

---

## Debrief (3-5 minutes)

Ask:
1. Which control point gave the most reliability gain?
2. Which part of this pattern is easiest to standardize across teams?
3. What do you need in your codebase to adopt this quickly?

Capture these answers as inputs for Module 3 workflow-vs-agent decisions.
