# Deployment and Governance

**Module 7 — Governed AI Feature Delivery**

---

## The problem we're solving

AI features fail in production when release controls are weak.

- <span class="fragment">Prompt/model changes without traceability</span>
- <span class="fragment">No rollout guardrails or kill switch</span>
- <span class="fragment">Insufficient logging for audits</span>
- <span class="fragment">No eval gates in CI/CD</span>

<span class="fragment">Now: define a safe deployment contract for AI features.</span>

---

## Why this matters operationally

- <span class="fragment">Strong prototypes fail without release controls.</span>
- <span class="fragment">AI changes happen in prompts/models/data, not only code.</span>
- <span class="fragment">Every release needs evidence, not confidence alone.</span>
- <span class="fragment">Governance should reduce incident recovery time and change risk.</span>

---

## Governance-ready release model

- <span class="fragment">Version prompts, models, and eval sets</span>
- <span class="fragment">Require eval thresholds before deploy</span>
- <span class="fragment">Capture traces and decision logs</span>
- <span class="fragment">Provide rollback and fallback playbooks</span>

---

## What "release-ready" means

- <span class="fragment">Quality thresholds pass on current golden dataset.</span>
- <span class="fragment">Safety and refusal behavior validated.</span>
- <span class="fragment">Traceability and provenance fields confirmed.</span>
- <span class="fragment">Rollback/fallback mechanisms tested.</span>
- <span class="fragment">Ownership and on-call response paths clear.</span>

---

## Versioning contract

| Asset | Must be versioned | Why |
| ----- | ----------------- | --- |
| Prompt assets | yes | behavior changes outside app logic |
| Model identifier | yes | quality/cost/latency can shift |
| Eval dataset | yes | prevents moving quality baseline |
| Policy config | yes | compliance behavior changes |

---

## CI/CD AI gates

- <span class="fragment">Block deploy on hard-fail eval criteria.</span>
- <span class="fragment">Enforce minimum pass rate for key dimensions.</span>
- <span class="fragment">Check latency/cost against budget thresholds.</span>
- <span class="fragment">Require trace artifact generation in pipeline.</span>

---

## Example release gate policy

1. <span class="fragment">Schema compliance >= 99%</span>
2. <span class="fragment">Safety/refusal tests: zero hard failures</span>
3. <span class="fragment">Core task accuracy >= target threshold</span>
4. <span class="fragment">P95 latency <= budget limit</span>
5. <span class="fragment">Trace completeness = required fields present</span>

---

## Observability requirements

- <span class="fragment">Request trace id and correlation across services</span>
- <span class="fragment">Prompt/model/version provenance per run</span>
- <span class="fragment">Validation outcomes and reason codes</span>
- <span class="fragment">Tool call intent/result metadata</span>
- <span class="fragment">Fallback/refusal event metrics</span>

---

## Runtime control patterns

- <span class="fragment">Kill switch for immediate risk containment</span>
- <span class="fragment">Canary rollout before broad release</span>
- <span class="fragment">Feature flags by region/customer tier</span>
- <span class="fragment">Fallback path for degraded model behavior</span>

---

## Rollback vs fallback

| Control | Trigger | Effect |
| ------- | ------- | ------ |
| Rollback | bad release behavior across traffic | revert to previous version bundle |
| Fallback | uncertain/failed single request | safe deterministic response path |

<span class="fragment">You usually need both.</span>

---

## Incident response flow

1. <span class="fragment">Detect regression via alerts/evals.</span>
2. <span class="fragment">Triage with trace evidence.</span>
3. <span class="fragment">Activate kill switch or rollback if needed.</span>
4. <span class="fragment">Route affected requests through fallback path.</span>
5. <span class="fragment">Capture post-incident control improvements.</span>

---

## Regional and governance context

- <span class="fragment">Deployment controls may vary by region (EU/US).</span>
- <span class="fragment">Data residency and audit requirements affect rollout design.</span>
- <span class="fragment">Governance evidence should be available on demand.</span>
- <span class="fragment">Release decisions should be explainable to non-engineering stakeholders.</span>

---

## Common release anti-patterns

- <span class="fragment">Shipping prompt/model changes without eval reruns.</span>
- <span class="fragment">No explicit owner for release gate failures.</span>
- <span class="fragment">No rehearsed rollback or kill-switch procedure.</span>
- <span class="fragment">Observability added after incidents, not before release.</span>

---

## Module 7 lab build target

Create a release-readiness pack with:

- <span class="fragment">Versioned change bundle (prompt/model/eval)</span>
- <span class="fragment">Gate criteria and pass/fail outcomes</span>
- <span class="fragment">Traceability and logging requirements</span>
- <span class="fragment">Rollback and fallback playbooks</span>
- <span class="fragment">Go/No-go recommendation</span>

---

## Summary

1. <span class="fragment">**Release-ready AI** requires evidence-backed gates.</span>
2. <span class="fragment">**Version everything that changes behavior.**</span>
3. <span class="fragment">**Observability before launch** enables safe operation.</span>
4. <span class="fragment">**Rollback + fallback** are core reliability patterns.</span>

---

## Bridge to Module 8

- <span class="fragment">We now have all core patterns.</span>
- <span class="fragment">Next: integrate everything in a final build.</span>

---

# Questions?
