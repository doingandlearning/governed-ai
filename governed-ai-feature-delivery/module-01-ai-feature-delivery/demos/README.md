# Demos — Module 1

This runbook uses the current demo app in a functionality-first format. For Module 1, do not do a code walkthrough. Show observable behavior, control points, and audit evidence.

---

## Demo 1: Live governed flow (frontend + Nest logs)

### Purpose
Show how a single user action is governed end-to-end, including user-visible state, backend interception points, and traceable decisions.

### Timebox
12-15 minutes

### Setup
- Frontend open in browser (`/documents/extract` UI).
- Nest backend running with console logs visible.
- Keep `slides.md` open on lifecycle/control-point slides for framing only.
- If using real LLM in dev profile, keep `DEBUG_LLM_LOGS=true` so request/response payload logs are visible.

### What to click and what to point out
1. **Start with a likely-pass sample** (`Pass sample: invoice`).
   - In frontend, point out:
     - `Current state` transitions (`loading` -> `accepted`).
     - Result metadata (`traceId`, `promptVersion`, `modelIdentifier`).
     - `Transition telemetry` list as user-facing progress evidence.
   - In Nest logs, point out the sequence:
     - `request_received`
     - `pre_validation_result`
     - `invoke_started` / `invoke_completed`
     - `post_validation_result`
     - `accepted_decision`
2. **Run a policy-review sample** (`Fail sample: policy review`).
   - In frontend, point out `needs_review` state and reason.
   - In Nest logs, show interception before model invocation:
     - `pre_validation_result` with policy-sensitive reason
     - `fallback_decision`
3. **Run a policy-deny sample** (`Fail sample: deny`).
   - In frontend, point out `denied` outcome and reason.
   - In Nest logs, show:
     - `pre_validation_result` with policy-sensitive reason
     - `deny_decision`
4. **(Optional) Switch execution mode** to `bounded_tool`.
   - Run a pass sample again.
   - In Nest logs, point out `bounded_tool_selection` as a governed architecture decision point.

### Talk track prompts
- "The UI never claims success until the backend decides the final status."
- "We intercept risky input early, before spending model calls."
- "Every decision path has trace evidence, not just happy-path outputs."

### Expected audience output
- Participants can describe what the user sees while work is in progress.
- Participants can identify where requests are intercepted/evaluated.
- Participants can map frontend status to backend decision events.

---

## Demo 2: Auditability and control-point narrative

### Purpose
Show how governance turns runtime behavior into explainable evidence for operational and regulatory review.

### Timebox
10-12 minutes

### Control points to call out explicitly
- **Pre-call gate**: input validity and policy-sensitive content checks.
- **Gateway call**: model invocation with trace metadata and optional dev payload logging.
- **Post-call gate**: schema and policy checks on model output.
- **Routing gate**: `accepted` vs `needs_review` vs `denied`, including low-confidence fallback.
- **UX feedback loop**: state + transition telemetry keeps users informed during and after processing.

### Suggested trace fields/events to show
- Identity/provenance: `traceId`, `promptVersion`, `modelIdentifier`
- Lifecycle events: `request_received`, `pre_validation_result`, `post_validation_result`
- Decisions: `accepted_decision`, `fallback_decision`, `deny_decision`
- Gateway diagnostics in dev: `llm_request_payload`, `llm_response_payload`

### Key message
Governance is visible in three places at once:
1. **Backend logs** (why the system made a decision)
2. **Frontend status** (what the user should do next)
3. **Trace metadata** (what an auditor can verify later)

---

## Debrief (3-5 minutes)

Ask:
1. Which interception point prevented the highest-risk failure?
2. Which log/event would you treat as mandatory evidence in your environment?
3. What user-status signal is essential to keep trust during uncertain AI behavior?

Capture answers as design inputs for Module 2 implementation choices.
