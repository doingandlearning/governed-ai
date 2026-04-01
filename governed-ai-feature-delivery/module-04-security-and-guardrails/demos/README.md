# Demos — Module 4

This runbook standardizes Module 4 demos so guardrails are shown as engineering patterns, not abstract principles.

---

## Demo 1: Prompt Injection Defense Walkthrough

### Purpose
Show how prompt injection enters realistic workflows and how layered controls prevent unsafe behavior.

### Timebox
12-15 minutes

### Setup
- Use the document-processing workflow from earlier modules.
- Prepare one benign input and one injection-style input.
- Have trust boundary map visible.

### Script (suggested flow)
1. Run benign input through baseline workflow.
2. Run injection-style input and show potential failure path.
3. Apply input trust labeling and instruction hierarchy controls.
4. Show updated behavior with hostile content treated as data.
5. Log trace fields that prove guardrails were applied.

### Talk track prompts
- "Where did the hostile instruction enter?"
- "Which layer should neutralize this first?"
- "What evidence do we keep for incident review?"

### Expected audience output
- Participants can identify injection entry points.
- Participants can explain layered mitigation strategy.

### Common failure modes
- Treating retrieved/document text as trusted instruction.
- Single-point filtering with no downstream checks.
- No trace record of security decision outcomes.

---

## Demo 2: Output Validation and Fallback Strategy

### Purpose
Demonstrate deterministic response behavior when output is invalid, non-compliant, or low confidence.

### Timebox
12-15 minutes

### Setup
- Prepare one valid and one policy-invalid model output sample.
- Have schema + policy rules visible.
- Prepare fallback response contract (`needs_review`).

### Script (suggested flow)
1. Show candidate model output before validation.
2. Apply schema validation and policy checks.
3. Accept compliant output path.
4. Trigger fallback for non-compliant output.
5. Show stable response shape and trace metadata for both outcomes.

### Talk track prompts
- "Why is schema-valid output still sometimes unsafe?"
- "When should we refuse vs needs_review?"
- "How does deterministic fallback reduce frontend risk?"

### Expected audience output
- Participants understand dual validation (schema + policy).
- Participants can define fallback trigger conditions.

### Common failure modes
- Returning raw output on validation failure.
- Inconsistent response shape across accepted/fallback paths.
- Missing reason codes for downstream review.

---

## Debrief (3-5 minutes)

Ask:
1. Which guardrail gave the highest risk reduction?
2. Which control is easiest to standardize immediately?
3. Where are you still relying on implicit behavior?

Carry these outputs into Module 5 UX design decisions.
