# Deployment and Governance

**Module 7 — Governed AI Feature Delivery**

---

## The problem we're solving

AI features fail in production when release controls are weak.

- <span class="fragment">Prompt and model changes without traceability</span>
- <span class="fragment">No rollout guardrails or kill switch</span>
- <span class="fragment">Insufficient logging for audits</span>
- <span class="fragment">No eval gates in CI/CD</span>

<span class="fragment">Now: define a safe deployment contract for AI features.</span>

---

## Why this matters operationally

- <span class="fragment">Strong prototypes fail without release controls.</span>
- <span class="fragment">AI changes happen in prompts, models, and data, not only in code.</span>
- <span class="fragment">Every release needs evidence, not confidence alone.</span>
- <span class="fragment">Governance should reduce incident recovery time and change risk.</span>

<span class="fragment">Release discipline is what makes safe iteration possible at scale.</span>

---

## Governance-ready release model

- <span class="fragment">Version prompts, models, and eval sets together</span>
- <span class="fragment">Require eval thresholds before deploy</span>
- <span class="fragment">Capture traces and decision logs</span>
- <span class="fragment">Provide rollback and fallback playbooks</span>

---

## What "release-ready" means

- <span class="fragment">Quality thresholds pass on the current golden dataset.</span>
- <span class="fragment">Safety and refusal behaviour validated.</span>
- <span class="fragment">Traceability and provenance fields confirmed.</span>
- <span class="fragment">Rollback and fallback mechanisms tested.</span>
- <span class="fragment">Ownership and on-call response paths clear.</span>

<span class="fragment">Every one of these must be true. A partial checklist is not a release gate.</span>

---

## Versioning contract

| Asset | Must be versioned | Why |
| ----- | ----------------- | --- |
| Prompt assets | Yes | Behaviour changes outside app logic |
| Model identifier | Yes | Quality, cost, and latency can shift |
| Eval dataset | Yes | Prevents moving the quality baseline |
| Policy config | Yes | Compliance behaviour changes |

---

>If an asset changes behaviour, it must have a version. No exceptions.

---

## CI/CD AI gates

- <span class="fragment">Block deploy on hard-fail eval criteria.</span>
- <span class="fragment">Enforce minimum pass rate for key dimensions.</span>
- <span class="fragment">Check latency and cost against budget thresholds.</span>
- <span class="fragment">Require trace artefact generation in the pipeline.</span>

<span class="fragment">Every gate should have a named owner. Unowned gates get bypassed.</span>

---

## Example release gate policy

1. <span class="fragment">Schema compliance at or above 99%</span>
2. <span class="fragment">Safety and refusal tests: zero hard failures</span>
3. <span class="fragment">Core task accuracy at or above target threshold</span>
4. <span class="fragment">P95 latency at or below budget limit</span>
5. <span class="fragment">Trace completeness: all required fields present</span>

---

## Observability requirements

- <span class="fragment">Request trace id and correlation across services</span>
- <span class="fragment">Prompt, model, and version provenance per run</span>
- <span class="fragment">Validation outcomes and reason codes</span>
- <span class="fragment">Tool call intent and result metadata</span>
- <span class="fragment">Fallback and refusal event metrics</span>

<span class="fragment">Observability design starts before release, not after the first incident.</span>

---

## Runtime control patterns

- <span class="fragment">Kill switch for immediate risk containment</span>
- <span class="fragment">Canary rollout before broad release</span>
- <span class="fragment">Feature flags by region or customer tier</span>
- <span class="fragment">Fallback path for degraded model behaviour</span>

---

## Rollback vs fallback

| Control | Trigger | Effect |
| ------- | ------- | ------ |
| Rollback | Bad release behaviour across traffic | Revert to previous version bundle |
| Fallback | Uncertain or failed single request | Safe deterministic response path |

<span class="fragment">Rollback alone does not protect in-flight uncertain requests. You usually need both.</span>

---

## Incident response flow

1. <span class="fragment">Detect regression via alerts or eval monitoring.</span>
2. <span class="fragment">Triage with trace evidence to locate the failure stage.</span>
3. <span class="fragment">Activate kill switch or rollback if traffic is affected.</span>
4. <span class="fragment">Route affected requests through the fallback path.</span>
5. <span class="fragment">Capture post-incident control improvements as permanent changes.</span>

---

## Regional and governance context

- <span class="fragment">Deployment controls may vary by region (EU/US).</span>
- <span class="fragment">Data residency and audit requirements affect rollout design.</span>
- <span class="fragment">Governance evidence should be available on demand, not assembled after the fact.</span>
- <span class="fragment">Release decisions should be explainable to non-engineering stakeholders.</span>

---

## Common release anti-patterns

- <span class="fragment">Shipping prompt or model changes without rerunning evals.</span>
- <span class="fragment">No explicit owner for release gate failures.</span>
- <span class="fragment">No rehearsed rollback or kill-switch procedure.</span>
- <span class="fragment">Observability added after incidents rather than before release.</span>

---

## Module 7 lab build target

Create a release-readiness pack with:

- <span class="fragment">Versioned change bundle covering prompt, model, and eval identifiers</span>
- <span class="fragment">Gate criteria with pass/fail outcomes for this release</span>
- <span class="fragment">Traceability and logging requirements confirmed</span>
- <span class="fragment">Rollback and fallback playbooks with named triggers</span>
- <span class="fragment">A written go/no-go recommendation with evidence and owner</span>

<span class="fragment">Definition of done: a non-engineer could read this pack and understand whether the feature is safe to release.</span>

---

## Summary

1. <span class="fragment">**Release-ready AI** requires evidence-backed gates, not confidence alone.</span>
2. <span class="fragment">**Version everything** that changes behaviour, not just application code.</span>
3. <span class="fragment">**Observability before launch** enables safe operation and fast incident recovery.</span>
4. <span class="fragment">**Rollback and fallback** are both required, and both must be rehearsed.</span>

---

## Bridge to Module 8

**What we have now:**

- <span class="fragment">A complete governed delivery stack: workflow, guardrails, UX, evals, and deployment.</span>

**What is next:**

- <span class="fragment">Integrate every pattern into a single working AI feature.</span>
- <span class="fragment">Your first task in Module 8: identify the one gap in your current build that carries the most release risk.</span>

<span class="fragment">Module 8 is the final integration and review session. Bring your artefacts.</span>

---

# Questions?

*Module 7 — Governed AI Feature Delivery*