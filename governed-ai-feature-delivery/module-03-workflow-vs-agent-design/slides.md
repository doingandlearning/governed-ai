# Workflow vs Agent Design

**Module 3 — Governed AI Feature Delivery**

---

## The problem we're solving

Teams overuse agents where deterministic workflows would be safer.

- <span class="fragment">Unpredictable behaviour</span>
- <span class="fragment">Difficult auditability</span>
- <span class="fragment">Harder testing and eval coverage</span>
- <span class="fragment">Higher operational risk</span>

<span class="fragment">Now: apply a practical decision framework.</span>

---

## Why teams get this wrong

- <span class="fragment">"Agent" sounds more capable, so it is chosen by default.</span>
- <span class="fragment">Execution boundaries are not defined before implementation.</span>
- <span class="fragment">Tool usage is left too open-ended.</span>
- <span class="fragment">Failure and traceability costs are discovered too late.</span>

---

## Three execution patterns

| Pattern | Best for | Trade-off |
| ------- | -------- | --------- |
| Deterministic workflow | Repeatable, auditable tasks | Less flexibility |
| Bounded tools | Controlled external actions | Added orchestration complexity |
| Agentic flow | Open-ended planning and exploration | Harder governance and testing |

---

## Pattern 1: Deterministic workflow

- <span class="fragment">Fixed sequence with explicit branching</span>
- <span class="fragment">Known tool set and output contract</span>
- <span class="fragment">Best for extraction, classification, routing, compliance</span>
- <span class="fragment">Easiest to test, evaluate, and audit</span>

---

## Pattern 2: Bounded tool usage

- <span class="fragment">Tools are permitted but within strict boundaries</span>
- <span class="fragment">Tool contract defined by schema and policy</span>
- <span class="fragment">Good when one or two external enrichments are required</span>
- <span class="fragment">Preserves control while extending capability</span>

---

## Pattern 3: Agentic behaviour

- <span class="fragment">Adaptive planning and dynamic decision chains</span>
- <span class="fragment">Useful for ambiguous, exploratory tasks</span>
- <span class="fragment">Requires stronger observability and guardrails</span>
- <span class="fragment">Highest governance and evaluation overhead</span>

<span class="fragment">Agentic is not the advanced default, it is the high-cost option.</span>

---

## Decision framework

- <span class="fragment">Need deterministic output? Prefer workflow.</span>
- <span class="fragment">Need bounded external actions? Use restricted tools.</span>
- <span class="fragment">Need adaptive multi-step exploration? Consider agent.</span>
- <span class="fragment">If uncertain, start deterministic and evolve with evidence.</span>

---

## Practical decision questions

1. <span class="fragment">Is deterministic behaviour required?</span>
2. <span class="fragment">Is strict auditability required?</span>
3. <span class="fragment">How many tools are truly needed?</span>
4. <span class="fragment">Can quality be evaluated repeatably?</span>
5. <span class="fragment">What is the blast radius if tool calls go wrong?</span>

<span class="fragment">Answer these before implementation — not after.</span>

---

## Workflow vs agent: predictability and auditability

| Dimension | Workflow | Agent |
| --------- | -------- | ----- |
| Predictability | High | Medium / Low |
| Auditability | High | Medium |

<span class="fragment">Lower predictability means harder release criteria and more evaluation overhead.</span>

---

## Workflow vs agent: tooling and testability

| Dimension | Workflow | Agent |
| --------- | -------- | ----- |
| Tool control | Explicit | Dynamic |
| Testability | Straightforward | Harder |
| Failure analysis | Easier | More complex |

<span class="fragment">Dynamic tool selection is a governance cost, not just an implementation detail.</span>

---

## Tool selection boundaries

- <span class="fragment">Allowlist tools — do not permit arbitrary tool execution.</span>
- <span class="fragment">Constrain parameters and payload sizes explicitly.</span>
- <span class="fragment">Define timeouts and retry behaviour per tool.</span>
- <span class="fragment">Log tool call intent and outcome in every trace.</span>

---

## MCP tools vs internal tools

| | MCP tools | Internal / master tools |
| - | --------- | ----------------------- |
| Best for | Standard integrations, broad capability | Policy-sensitive, domain-specific operations |
| Ownership | External or platform-managed | Team-owned with tighter controls |
| Governance | Explicit boundaries required | Explicit boundaries required |

<span class="fragment">The governance obligation is identical — the ownership model is not.</span>

---

## Case study A: Document extraction

**Need:** parse known fields from known document classes

- <span class="fragment">Deterministic workflow is almost always the right pattern</span>
- <span class="fragment">Bounded tools optional for enrichment steps</span>
- <span class="fragment">Agentic pattern introduces unnecessary risk and overhead</span>

---

## Case study B: Email triage and routing

**Need:** classify intent, route to teams, enrich context

- <span class="fragment">Workflow plus bounded tools is usually the strongest pattern</span>
- <span class="fragment">Agent behaviour may be justified for ambiguous edge cases only</span>
- <span class="fragment">Route uncertainty should trigger fallback to human review</span>

---

## Case study C: Open-ended investigation assistant

**Need:** explore documents and systems, propose next actions

- <span class="fragment">Agentic behaviour may be justified here</span>
- <span class="fragment">Requires deeper trace coverage and stronger guardrails</span>
- <span class="fragment">Use approval checkpoints before high-risk actions execute</span>

---

## Migration strategy: workflow first

- <span class="fragment">Start with a deterministic baseline.</span>
- <span class="fragment">Measure where flexibility is actually needed — use evidence, not assumption.</span>
- <span class="fragment">Introduce bounded tools before moving to autonomy.</span>
- <span class="fragment">Add agentic behaviour only when evaluation results support it.</span>

---

## Failure modes to watch

- <span class="fragment">Over-agentic design applied to deterministic problems</span>
- <span class="fragment">Too many tools with weak parameter contracts</span>
- <span class="fragment">No trace path covering dynamic tool decisions</span>
- <span class="fragment">No fallback plan when confidence is low or tool calls fail</span>

---

## What we produce in Module 3

- <span class="fragment">Execution pattern decisions for your key use cases</span>
- <span class="fragment">Tool boundary rules and parameter constraints</span>
- <span class="fragment">A reusable decision checklist for your team</span>
- <span class="fragment">Rationale to carry directly into the security and guardrails module</span>

---

## Summary

1. <span class="fragment">**Agentic is not the default**: choose autonomy only when justified.</span>
2. <span class="fragment">**Workflow first** keeps delivery predictable and auditable.</span>
3. <span class="fragment">**Bounded tools** offer a practical and controllable middle ground.</span>
4. <span class="fragment">**Decision frameworks** replace intuition with defensible engineering rationale.</span>

---

## Bridge to Module 4

**What we've established:**

- <span class="fragment">Execution model decisions with explicit rationale.</span>
- <span class="fragment">Tool boundaries that define your attack surface.</span>

**What's next:**

- <span class="fragment">Regardless of execution model, the same attack vectors apply.</span>
- <span class="fragment">Your first task in Module 4: map your tool boundaries against the threat model.</span>

<span class="fragment">Module 4 covers security and guardrails — securing the end-to-end AI feature path.</span>

---

# Questions?

*Module 3 — Governed AI Feature Delivery*