# Demos — Module 7

This runbook standardizes Module 7 demos so deployment governance is shown as concrete engineering operations.
It assumes:
- `demo-app` is the instructor reference implementation.
- `demo-app-starter/module_7_starter` is the learner baseline.
- Teams carry forward Module 6 eval outputs and prior guardrail/trace contracts as release evidence inputs.

---

## Demo 1: AI Release Checklist and CI Gate Walkthrough

### Purpose
Show how to convert evaluation and governance requirements into practical CI/CD release gates.

### Timebox
12-15 minutes

### Setup
- Prepare sample change bundle (prompt, model, eval dataset updates).
- Have gate policy visible (hard vs soft criteria).
- Prepare one pass and one fail pipeline example.
- Keep version-bundle and release-gate style artifacts visible for walkthrough.

### Script (suggested flow)
1. Show versioned change bundle and metadata.
2. Run through gate checks (quality, safety, latency/cost, trace completeness).
3. Demonstrate pass case and go decision.
4. Demonstrate fail case and blocked release.
5. Show required evidence attached to release decision.
6. Clarify which criteria are hard blockers in CI versus manual review requirements.

### Talk track prompts
- "Which gate should hard-fail every release?"
- "What evidence is required for sign-off?"
- "Who owns each gate when it fails?"

### Expected audience output
- Participants can define hard and soft release gates.
- Participants can tie gate results to go/no-go decisions.
- Participants can map gate failures to named owners and escalation paths.

### Common failure modes
- No explicit thresholds, only qualitative judgment.
- Gate failures with no clear owner or escalation path.
- Releasing prompt/model changes without re-running evals.

---

## Demo 2: Traceability + Rollback/Fallback Strategy

### Purpose
Demonstrate operational response when a release causes degraded behavior in production.

### Timebox
12-15 minutes

### Setup
- Prepare simulated incident: quality regression after release.
- Have trace sample with prompt/model/version provenance.
- Prepare rollback and fallback playbook snippets.
- Prepare kill-switch example path to show immediate containment option.

### Script (suggested flow)
1. Detect regression via alert or post-release eval signal.
2. Inspect traces to localize issue source.
3. Trigger rollback to previous release bundle.
4. Route in-flight risky requests through fallback path.
5. Capture incident notes and follow-up control improvement.
6. Show when kill switch is preferred over rollback (or used first).

### Talk track prompts
- "When do we rollback vs keep release and fallback requests?"
- "Which trace fields are mandatory for fast triage?"
- "How do we prevent this specific regression next release?"
- "What condition triggers kill switch without waiting for full incident analysis?"

### Expected audience output
- Participants understand rollback vs fallback distinction.
- Participants can define minimum incident response steps.
- Participants can explain kill switch role in release governance.

### Common failure modes
- Relying on rollback without request-level fallback.
- Missing provenance in traces, slowing root-cause analysis.
- No post-incident rule added to release gates.

---

## Debrief (3-5 minutes)

Ask:
1. Which gate gives highest protection for lowest overhead?
2. What is currently missing from your release evidence?
3. Which incident response step is least mature today?

Capture outputs for Module 8 final build readiness criteria.
