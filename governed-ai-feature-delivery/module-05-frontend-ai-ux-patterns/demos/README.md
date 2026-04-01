# Demos — Module 5

This runbook standardizes Module 5 demos so frontend AI patterns are shown as governance controls, not just UI enhancements.

---

## Demo 1: Structured Extraction Review Component

### Purpose
Show a task-focused UI component that supports field-level review, edit-before-save, and deterministic state handling.

### Timebox
12-15 minutes

### Setup
- Use output from backend document extraction workflow.
- Prepare component states: accepted, needs_review, error.
- Keep schema/contract visible while demonstrating.

### Script (suggested flow)
1. Render structured extraction fields in review panel.
2. Highlight uncertain fields and explain state badges.
3. Edit one field manually before save.
4. Show action gating for high-impact commit actions.
5. Persist reviewed status with trace reference.

### Talk track prompts
- "What is the actual decision this UI supports?"
- "Which fields require mandatory review?"
- "How do we prevent one-click unsafe actions?"

### Expected audience output
- Participants understand review-before-commit flow.
- Participants can map backend statuses to UI states.

### Common failure modes
- Displaying generated paragraph text only.
- No distinction between suggested vs approved values.
- Allowing irreversible action without confirmation.

---

## Demo 2: Confidence + Evidence + Streaming States

### Purpose
Demonstrate uncertainty communication and progressive rendering without compromising user trust.

### Timebox
12-15 minutes

### Setup
- Prepare responses with high and low confidence fields.
- Prepare one interrupted stream case.
- Include evidence snippets or source references in UI.

### Script (suggested flow)
1. Show confidence bands and per-field uncertainty indicators.
2. Display evidence/source snippet linked to extracted field.
3. Start SSE stream and show state transitions (loading -> partial -> complete).
4. Simulate interruption and show deterministic fallback state.
5. Show user path for needs_review outcome.

### Talk track prompts
- "Why is confidence not enough without evidence?"
- "When should partial output be hidden vs shown?"
- "What should users do when stream fails mid-way?"

### Expected audience output
- Participants can design confidence/evidence cues.
- Participants can define reliable streaming state transitions.

### Common failure modes
- One confidence score for entire object with no context.
- Treating partial stream output as final result.
- Inconsistent UI behavior on stream failure.

---

## Debrief (3-5 minutes)

Ask:
1. Which UI pattern most improved user decision quality?
2. What state transition logic needs to be standardized across teams?
3. Which fallback UI behavior is non-negotiable for production?

Capture outputs as evaluation criteria inputs for Module 6.
