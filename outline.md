# Two-Day Bootcamp: Governed AI Feature Delivery

## Overview

This bootcamp equips engineers to design, build, evaluate, and deploy AI-powered features using **safe, consistent, and reusable patterns** suitable for regulated environments.

Participants will implement a **realistic AI feature** using the organisation’s stack, while establishing standards for:

- Backend workflows and orchestration
- Prompt design and control
- Tool usage and agent boundaries
- Frontend UX patterns for AI
- Evaluation and quality assurance
- Deployment, observability, and governance

---

## Core Scenario (Lab Thread)

Build an AI-powered **document processing feature** that:

- Accepts input (document or text)
- Extracts structured information
- Classifies or routes content
- Applies validation and guardrails
- Surfaces results in a frontend UI
- Supports evaluation and auditability

This feature evolves across both days.

---

# Day 1 — Governed AI Backend Patterns and Workflow Design

---

## Session 1 — AI Feature Delivery in Regulated Environments

### Objectives

- Understand how AI features differ from traditional backend features
- Define what “safe, auditable, and reusable” means in practice
- Align on system architecture and responsibilities

### Topics

- AI in enterprise systems (internal vs customer-facing)
- Risks in regulated environments (hallucination, PII, audit gaps)
- End-to-end AI request lifecycle
- High-level architecture:
  - TanStack frontend
  - NestJS backend
  - LLM gateway
  - Model providers
  - Evaluation + tracing
- Where logic should live:
  - code vs prompts vs config vs infrastructure

### Output

- Shared architecture diagram
- Agreed delivery model for AI features

---

## Session 2 — Backend Workflow Patterns (NestJS)

### Objectives

- Structure AI logic into reusable backend patterns
- Avoid “LLM calls scattered across the codebase”

### Topics

- Layering:
  - controllers
  - orchestration/workflows
  - prompts
  - validators
  - tool adapters
- Prompt storage in code:
  - versioning
  - reviewability
  - parameterisation
- Structured outputs and schemas
- Validation gates:
  - pre-call
  - post-call
- Gateway usage for:
  - auditability
  - routing
  - logging
- Containerised local development considerations

### Hands-On Lab

- Build a NestJS workflow:
  - Accept input
  - Call LLM via gateway
  - Return structured output

---

## Session 3 — Workflow vs Agent Design

### Objectives

- Decide when to use:
  - deterministic workflows
  - bounded tool usage
  - agents

### Topics

- Workflow vs agent:
  - predictability
  - auditability
  - flexibility
- Tool usage patterns:
  - bounded tools
  - MCPs vs internal/master tools
- Risks of open-ended tool selection
- Decision framework:
  - determinism required?
  - auditability required?
  - number of tools?
  - evaluation difficulty?

### Hands-On Lab

- Extend workflow with:
  - 1–2 tools (e.g. classifier, enrichment)
- Compare with a more agentic approach

---

## Session 4 — Security and Guardrails

### Objectives

- Protect AI features from unsafe inputs and behaviours

### Topics

- Prompt injection:
  - how it works
  - where it enters systems
- Trust boundaries:
  - user input
  - documents
  - tools
- Redaction and sensitive data handling
- Tool constraints and parameter control
- Output validation and refusal strategies
- Fallback behaviour and safe degradation

### Hands-On Lab

- Add guardrails to workflow:
  - input filtering
  - output validation
  - fallback responses

---

# Day 2 — AI UX, Evaluation, and Safe Delivery

---

## Session 5 — Frontend AI UX Patterns (TanStack)

### Objectives

- Move beyond “chat UI” to structured AI experiences

### Topics

- AI UX patterns:
  - assistant panel
  - structured insight cards
  - extraction review interfaces
- Confidence indicators and uncertainty handling
- Showing evidence and explanations
- Redacted views and safe display patterns
- Streaming with SSE:
  - progressive rendering
  - loading states
- When NOT to use chat interfaces

### Hands-On Lab

- Build a TanStack component:
  - display structured output
  - show confidence + explanation
  - support progressive updates

---

## Session 6 — Evaluation and Quality Assurance

### Objectives

- Introduce repeatable evaluation practices for AI features

### Topics

- Why evals matter in teams
- Types of evaluation:
  - correctness
  - format compliance
  - classification accuracy
  - hallucination control
  - safety checks
- Golden datasets and test cases
- Lightweight evaluation patterns
- Introduction to LangSmith:
  - traces
  - comparisons
  - debugging outputs

### Hands-On Lab

- Create evaluation suite:
  - define test inputs
  - expected outputs
  - pass/fail rules
- Compare prompt/model variations

---

## Session 7 — Deployment, Observability, and Governance

### Objectives

- Understand how to safely ship AI features

### Topics

- Prompt versioning
- Model versioning
- Traceability and logging
- Latency, cost, and failure modes
- CI/CD integration:
  - eval gates
  - release checks
- Kill switches and fallback strategies
- Multi-region considerations (EU/US)
- Audit requirements for regulated systems

### Hands-On Lab

- Define deployment checklist:
  - what must be validated before release
  - what must be logged
  - what must be observable

---

## Session 8 — Final Build and Review

### Objectives

- Consolidate all patterns into a single feature

### Activities

Teams combine:

- Backend workflow
- Guardrails
- Tool usage
- Frontend UI
- Evaluation suite
- Observability approach

### Output

- Working AI feature
- Evaluation results
- Reusable architecture pattern

---

# Supporting Concepts (Short Modules / Inserts)

These are covered briefly where relevant:

## RAG and Retrieval

- When retrieval improves workflows
- Embeddings (conceptual)
- Retrieval pipeline shape
- Impact on evals and UX

## Enterprise AI Context

- Internal vs external systems
- Gateway patterns
- Model routing and control

## Governance Context

- Role of auditability
- High-level regulatory considerations (e.g. EU AI Act)

---

# Key Takeaways

By the end of this bootcamp, participants will be able to:

- Design AI features using structured backend workflows in NestJS
- Choose between workflows, tools, and agents appropriately
- Store, version, and manage prompts in code
- Build frontend AI experiences using reusable UX patterns
- Create repeatable evaluation suites for AI behaviour
- Deploy AI features with auditability, observability, and governance controls

---

# Notes for Delivery (Optional Section)

## Emphasis

- Practical patterns over theory
- Reusability over novelty
- Safety and auditability throughout

## Avoid

- Over-indexing on agent complexity
- Deep dives into model internals
- Abstract evaluation theory without application

## Target Audience

- Mid-level to senior engineers
- Familiar with TypeScript, React, and backend APIs
- Some exposure to LLMs

---
