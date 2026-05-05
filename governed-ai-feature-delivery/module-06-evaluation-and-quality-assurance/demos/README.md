# Demos — Module 6

This runbook standardizes Module 6 demos so teams see evaluation as an operational engineering workflow.
It assumes:
- `demo-app` is the instructor reference implementation.
- `demo-app-starter/module_6_starter` is the learner baseline.
- Teams carry forward prior module decisions (workflow boundaries, guardrails, and UX state contracts) into eval criteria.

---

## Demo 1: Build a Golden Dataset for Extraction Quality

### Purpose
Show how to construct a small but meaningful dataset that captures real quality and safety expectations.

### Timebox
12-15 minutes

### Setup
- Use document-processing scenario from earlier modules.
- Prepare 5-8 representative sample inputs.
- Define expected outputs and failure labels in advance.
- Keep existing eval artifacts visible (`dataset`, runner output, and release-gate style summary).

### Script (suggested flow)
1. Select a target behavior (structured extraction + fallback handling).
2. Add normal cases, edge cases, and failure cases.
3. Define expected outputs for each case.
4. Assign pass/fail rules per dimension (correctness, format, safety).
5. Show dataset version tagging and storage pattern.
6. Map at least one case directly to a prior module control (for example low-confidence routing or policy deny path).

### Talk track prompts
- "Which cases matter most for production risk?"
- "What should count as hard failure vs soft warning?"
- "How many cases are enough to start?"

### Expected audience output
- Participants can create a minimal golden dataset.
- Participants can define explicit expected outcomes for each case.

### Common failure modes
- Dataset includes only happy-path examples.
- Expectations are ambiguous or not machine-checkable.
- No versioning for dataset updates.

---

## Demo 2: Prompt/Model Comparison with Trace Inspection

### Purpose
Demonstrate how to compare variants and use traces to explain regressions and release decisions.

### Timebox
12-15 minutes

### Setup
- Prepare two prompt/model variants.
- Run both against the same dataset.
- Have trace views available for failed cases.
- Include token/latency signals in comparison discussion when available.

### Script (suggested flow)
1. Execute baseline variant and collect metrics.
2. Execute candidate variant on identical dataset.
3. Compare accuracy, safety, format compliance, latency/cost.
4. Inspect failed traces to localize differences.
5. Produce a release recommendation with rationale.
6. Show what would become a hard gate in Module 7 versus informational metric only.

### Talk track prompts
- "Did quality improve where it matters most?"
- "Where did safety regress even if accuracy improved?"
- "Would you ship this change today?"

### Expected audience output
- Participants can run fair A/B comparison.
- Participants can tie outcome differences to trace evidence.
- Participants can separate "ship/no-ship" criteria from exploratory metrics.

### Common failure modes
- Comparing variants on different datasets.
- Looking only at one metric.
- Ignoring latency/cost impacts of quality gains.

---

## Debrief (3-5 minutes)

Ask:
1. Which metric changed your release decision most?
2. Which failure case should become a permanent guardrail test?
3. What eval rule will you standardize first across teams?

Capture outputs for Module 7 release-gate design.
