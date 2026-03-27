# Demos — Module 1

This runbook standardizes delivery for Module 1 demos so every cohort sees the same architecture and governance story before coding starts.

---

## Demo 1: Architecture Walkthrough

### Purpose
Establish a shared mental model of how AI feature responsibilities are split across frontend, backend workflow, gateway, model, and validation layers.

### Timebox
10-12 minutes

### Setup
- Have `slides.md` open on the architecture and lifecycle sections.
- Use a whiteboard (physical or digital) for live annotation.
- Prepare a simple "document intake" request example (single JSON payload).

### Script (suggested flow)
1. Start with the request entering the frontend and being sent to NestJS.
2. Show where deterministic orchestration lives (workflow service).
3. Show where prompts are defined and versioned in code.
4. Show why the gateway is a control point (traceability, routing, policy enforcement).
5. Show post-call validation and fallback behavior before UI display.
6. Close by identifying 3 trust boundaries in the flow.

### Talk track prompts
- "Which layer should own policy checks?"
- "What should never be hidden inside prompt text only?"
- "If output is wrong, where should it be caught first?"

### Expected audience output
- Participants can explain each architecture layer in one sentence.
- Participants can identify at least 3 trust boundaries.

### Common failure modes
- Treating gateway as optional plumbing only.
- Collapsing orchestration into controller logic.
- Assuming model output is trusted before validation.

---

## Demo 2: AI Request Lifecycle Trace Example

### Purpose
Demonstrate what "governed and auditable" means using a concrete request path and trace metadata contract.

### Timebox
12-15 minutes

### Setup
- Reuse the same document intake scenario from Demo 1.
- Prepare a sample trace payload (real or mock) with key fields.
- Ensure participants can see the request -> response path clearly.

### Sample trace fields to show
- `trace_id`
- `request_timestamp`
- `prompt_version`
- `model_identifier`
- `input_validation_result`
- `output_validation_result`
- `outcome_status` (`accepted`, `fallback`, `refused`)

### Script (suggested flow)
1. Walk the request through each lifecycle stage.
2. Show which metadata is added at each stage.
3. Highlight a failing case (for example invalid schema or policy breach).
4. Show fallback path and explain why it is safer than forced output.
5. Compare what can/cannot be answered in an audit with and without traces.

### Talk track prompts
- "What evidence would we need in a post-incident review?"
- "Which fields are mandatory vs nice-to-have?"
- "What happens if validation fails but UI still renders output?"

### Expected audience output
- Participants can describe minimum trace metadata.
- Participants understand where validation decisions must be recorded.

### Common failure modes
- Logging raw sensitive payloads unnecessarily.
- Missing prompt/model provenance in traces.
- Treating fallback as an exception instead of a design path.

---

## Debrief (3-5 minutes)

Ask:
1. Which boundary in the flow is highest risk?
2. Which control point feels weakest today in your current stack?
3. What would you standardize first after this module?

Capture these as inputs to Module 2 implementation choices.
