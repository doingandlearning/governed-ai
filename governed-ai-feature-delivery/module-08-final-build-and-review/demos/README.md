# Demos — Module 8

This runbook standardizes Module 8 demonstrations so final review is evidence-led and comparable across teams.

---

## Demo 1: End-to-End Governed Feature Reference Build

### Purpose
Show a complete reference implementation that integrates all course patterns into one coherent feature.

### Timebox
15-20 minutes

### Setup
- Prepare one end-to-end request scenario.
- Prepare one failure scenario that triggers fallback.
- Have eval summary and trace sample ready.

### Script (suggested flow)
1. Walk architecture and boundary map briefly.
2. Execute normal request path through backend and frontend.
3. Show validation, status transitions, and final user decision flow.
4. Execute failure scenario and show fallback/refusal behavior.
5. Show eval evidence and trace artifact for both paths.
6. State release recommendation and rationale.

### Talk track prompts
- "Which controls prevented unsafe output here?"
- "What evidence makes this deployment decision defensible?"
- "What remains as known risk?"

### Expected audience output
- Participants can connect module concepts into one integrated flow.
- Participants can identify required evidence for production decisions.

### Common failure modes
- Demo focuses on happy path only.
- No artifact evidence shown for quality/safety claims.
- Missing linkage between architecture decisions and operational controls.

---

## Demo 2: Team Review and Architecture Critique Walkthrough

### Purpose
Model how to run a structured, governance-focused review of team solutions using consistent criteria.

### Timebox
12-15 minutes

### Setup
- Use one sample team output (or prepared mock team output).
- Have review rubric visible.
- Prepare 2-3 critique prompts tied to boundary, eval, and deployment readiness.

### Script (suggested flow)
1. Score solution against rubric dimensions.
2. Identify strongest design decision and why.
3. Identify weakest boundary/control and risk impact.
4. Require one concrete improvement action.
5. Capture go/no-go recommendation with residual risk note.

### Talk track prompts
- "What single improvement would reduce most risk?"
- "Does trace/eval evidence support the release decision?"
- "Is ownership clear for post-release monitoring?"

### Expected audience output
- Participants can critique solutions objectively with shared rubric.
- Participants can separate must-fix issues from future improvements.

### Common failure modes
- Feedback is subjective and not criteria-driven.
- Teams over-index on UI polish over safety/evidence.
- No explicit residual risk statement in final recommendation.

---

## Debrief (5 minutes)

Ask:
1. Which rubric dimension caused most friction?
2. What pattern is ready to standardize immediately?
3. What one backlog item is most urgent before production rollout?

Use answers to shape post-course adoption plan.
