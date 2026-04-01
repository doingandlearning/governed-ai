# Demos — Module 3

This runbook standardizes Module 3 demos so teams see explicit decisioning rather than opinion-driven architecture choices.

---

## Demo 1: Applying Workflow vs Agent Decision Matrix

### Purpose
Show how to classify a use case using objective criteria and produce a defensible execution-model decision.

### Timebox
12-15 minutes

### Setup
- Prepare 1-2 sample scenarios (document extraction, email routing).
- Have the decision criteria visible.
- Use a simple score sheet or whiteboard matrix.

### Script (suggested flow)
1. Present the scenario and constraints.
2. Score against criteria: determinism, auditability, tool count, eval readiness, blast radius.
3. Compare pattern options: workflow, bounded tools, agentic.
4. Select preferred pattern and explain trade-offs.
5. Document fallback behavior and observability requirements.

### Talk track prompts
- "What is the minimum autonomy this scenario needs?"
- "What would fail first if this ran in production tomorrow?"
- "Can this be evaluated repeatably?"

### Expected audience output
- Participants can classify a scenario with explicit rationale.
- Participants can articulate control requirements tied to selected pattern.

### Common failure modes
- Choosing agentic because it feels more capable.
- Skipping evaluation feasibility in decision criteria.
- No fallback or traceability plan tied to chosen model.

---

## Demo 2: Refactor Over-Agentic Flow to Bounded Workflow

### Purpose
Demonstrate how to reduce risk by replacing unnecessary autonomy with deterministic orchestration and bounded tools.

### Timebox
12-15 minutes

### Setup
- Prepare a deliberately over-agentic pseudo-flow (many dynamic tools).
- Prepare a refactored deterministic + bounded-tool version.
- Show before/after observability and testing complexity.

### Script (suggested flow)
1. Walk through original over-agentic flow.
2. Identify risk points (dynamic tools, weak boundaries, unclear trace paths).
3. Replace open decisions with explicit workflow steps.
4. Keep only essential tools with strict contracts.
5. Compare auditability, eval complexity, and failure handling before vs after.

### Talk track prompts
- "Which autonomy is adding value vs noise?"
- "Which tool actions require hard constraints?"
- "How does this change incident debugging effort?"

### Expected audience output
- Participants can identify over-agentic hotspots.
- Participants can propose concrete boundary improvements.

### Common failure modes
- Refactor keeps too many unconstrained tools.
- No explicit policy checks for tool parameters.
- Inconsistent response/fallback paths after refactor.

---

## Debrief (3-5 minutes)

Ask:
1. Which criteria changed your initial decision most?
2. Where do you currently overuse autonomy in your stack?
3. What one boundary rule can you standardize immediately?

Capture outputs as inputs for Module 4 guardrail design.
