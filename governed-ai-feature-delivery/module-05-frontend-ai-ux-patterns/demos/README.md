# Demos — Module 5

This runbook standardizes Module 5 demos so frontend AI patterns are shown as governance controls, not just UI enhancements.
It assumes:
- `demo-app` is the instructor reference implementation.
- `demo-app-starter/module_5_starter` is the learner baseline.
- Current baseline uses deterministic request/response with explicit UI state transitions.
- SSE/streaming can be discussed as an extension, not required for core module delivery.

---

## Demo 1: Structured Extraction Review Component

### Purpose
Show a task-focused UI component that supports field-level review, edit-before-save, and deterministic state handling.

### Timebox
12-15 minutes

### Setup
- Use output from backend document extraction workflow.
- Prepare component states: `loading`, `accepted`, `needs_review`, `denied`, `error`.
- Keep schema/contract visible while demonstrating.
- Keep backend logs and frontend state telemetry visible side-by-side.

### Script (suggested flow)
1. Render structured extraction fields in review panel.
2. Highlight uncertain fields and explain state badges.
3. Edit one field manually before save.
4. Show action gating for high-impact commit actions.
5. Persist reviewed status with trace reference.
6. Show how frontend state and backend decision events stay aligned.

### Talk track prompts
- "What is the actual decision this UI supports?"
- "Which fields require mandatory review?"
- "How do we prevent one-click unsafe actions?"
- "What must be visible to the user when backend routes to needs_review or denied?"

### Expected audience output
- Participants understand review-before-commit flow.
- Participants can map backend statuses to UI states.
- Participants can identify which UI elements are governance controls, not just presentation.

### Common failure modes
- Displaying generated paragraph text only.
- No distinction between suggested vs approved values.
- Allowing irreversible action without confirmation.

---

## Demo 2: Confidence + Evidence + Streaming States

### Purpose
Demonstrate uncertainty communication and reliable progressive state handling without compromising user trust.

### Timebox
12-15 minutes

### Setup
- Prepare responses with high and low confidence fields.
- Prepare one interrupted/failed request case.
- Include evidence snippets or source references in UI.
- For optional extension, prepare a short note on how the same state model maps to SSE.

### Script (suggested flow)
1. Show confidence bands and per-field uncertainty indicators.
2. Display evidence/source snippet linked to extracted field.
3. Trigger request and show deterministic transitions (`loading` -> terminal state).
4. Show failure path and deterministic fallback UI behavior.
5. Show user path for `needs_review` and `denied` outcomes.
6. (Optional) Explain how this same state model would support SSE (`loading` -> `partial` -> terminal).

### Talk track prompts
- "Why is confidence not enough without evidence?"
- "How do we keep users informed during non-final states?"
- "What should users do when request or stream fails mid-way?"

### Expected audience output
- Participants can design confidence/evidence cues.
- Participants can define reliable state transitions for both request/response and streaming variants.

### Common failure modes
- One confidence score for entire object with no context.
- Treating non-final output as final result.
- Inconsistent UI behavior on failure and fallback outcomes.

---

## Debrief (3-5 minutes)

Ask:
1. Which UI pattern most improved user decision quality?
2. What state transition logic needs to be standardized across teams?
3. Which fallback UI behavior is non-negotiable for production?
4. What would you add before enabling full streaming UX in production?

Capture outputs as evaluation criteria inputs for Module 6.
