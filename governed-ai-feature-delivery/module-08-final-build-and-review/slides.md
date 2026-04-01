# Final Build and Review

**Module 8 — Governed AI Feature Delivery**

---

## Build objective

Deliver a production-style AI feature with governance built in.

- <span class="fragment">Backend workflow and validation layers</span>
- <span class="fragment">Bounded tool usage where needed</span>
- <span class="fragment">Structured frontend review experience</span>
- <span class="fragment">Evaluation results and release criteria</span>

<span class="fragment">This is not a demo sprint. It is an integration and readiness proof.</span>

---

## Why this final module matters

- <span class="fragment">Isolated module knowledge is not enough for production delivery.</span>
- <span class="fragment">Integration exposes real trade-offs and weak boundaries.</span>
- <span class="fragment">Teams need evidence-backed decisions, not one-time demos.</span>
- <span class="fragment">This is where reusable delivery patterns are proven under pressure.</span>

---

## Final build scope

Your team solution must include:

- <span class="fragment">Backend workflow with clear orchestration boundaries</span>
- <span class="fragment">Guardrails for input, tool, and output paths</span>
- <span class="fragment">Frontend review flow with uncertainty handling</span>
- <span class="fragment">Evaluation suite with quality results</span>
- <span class="fragment">Deployment and governance readiness pack</span>

<span class="fragment">Breadth without evidence does not pass. Depth with evidence does.</span>

---

## Integration architecture checklist

- <span class="fragment">Controller, workflow, and gateway responsibilities are clear and documented</span>
- <span class="fragment">Prompt and model versions are explicit and traceable per run</span>
- <span class="fragment">Validation and fallback paths remain deterministic under failure</span>
- <span class="fragment">UI states align with the backend status contract from Module 5</span>

<span class="fragment">If any boundary is unclear, resolve it before the demo. Unclear boundaries are the most common integration failure.</span>

---

## Evidence required for review

| Evidence type | Example artefacts |
| ------------- | ----------------- |
| Architecture | Component flow diagram and boundary map |
| Quality | Eval pass/fail summary and dataset version |
| Safety | Guardrail rule set and fallback examples |
| Operations | Release gate checklist and rollback/fallback plan |
| Observability | Trace samples with provenance fields |

<span class="fragment">Verbal claims without artefacts are not accepted as evidence.</span>

---

## Review rubric

- <span class="fragment">Correctness and schema reliability across test cases</span>
- <span class="fragment">Safety and trust boundary handling under adversarial input</span>
- <span class="fragment">UX clarity for uncertainty, evidence, and review flow</span>
- <span class="fragment">Observability and deployment readiness with named ownership</span>

---

## Demo expectations

1. <span class="fragment">Show one end-to-end request lifecycle from input to accepted output.</span>
2. <span class="fragment">Show one failure path and the fallback behaviour it triggers.</span>
3. <span class="fragment">Show eval evidence used to support the release decision.</span>
4. <span class="fragment">Show trace evidence for a completed request.</span>
5. <span class="fragment">State the go/no-go recommendation and the rationale behind it.</span>

<span class="fragment">If you cannot show the failure path and the trace, the demo is incomplete.</span>

---

## Common final-build failure modes

- <span class="fragment">Feature works once but lacks repeatable evidence.</span>
- <span class="fragment">Strong backend but unclear or inconsistent frontend review behaviour.</span>
- <span class="fragment">Good eval scores but no operational rollout plan.</span>
- <span class="fragment">Trace data present but not structured to support a release decision.</span>

---

## Team adoption planning

- <span class="fragment">What can become a shared platform default immediately?</span>
- <span class="fragment">What needs one more sprint to harden before wider rollout?</span>
- <span class="fragment">What risks require stakeholder alignment outside the team?</span>
- <span class="fragment">Who owns ongoing quality and governance controls after this course?</span>

<span class="fragment">Adoption planning is what turns training into production impact. Do not skip it.</span>

---

## Course close

- <span class="fragment">Reusable architecture patterns identified and documented</span>
- <span class="fragment">Known next improvements prioritised with owners assigned</span>
- <span class="fragment">Team adoption plan drafted and agreed</span>

<span class="fragment">You leave with a pattern set, not just a prototype. The patterns are the asset.</span>

---

## Summary

1. <span class="fragment">**Integration quality** is the real delivery test, not individual component completeness.</span>
2. <span class="fragment">**Evidence beats opinion** for every release and governance decision.</span>
3. <span class="fragment">**Governance patterns** built here are reusable team assets, not one-off course outputs.</span>
4. <span class="fragment">**Adoption planning** turns training into production impact.</span>

---

# Questions?

*Module 8 — Governed AI Feature Delivery*