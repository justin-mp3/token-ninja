---
title: The Hidden Cost of Agentic AI (And Why It's Getting Worse)
date: 2026-04-10
description: Most teams underestimate token spend by 3–5× when they move from single-shot prompts to multi-step agents. Here's why.
author: Justin — Token Ninja
---

Single-shot LLM calls are predictable. You send a prompt, you get a response, you pay for the tokens. Budgeting is straightforward.

Multi-step agents are not.

## How costs compound in agentic systems

When an agent delegates to a sub-agent, that sub-agent receives the full context of the parent — including the entire conversation history, tool call results, and intermediate reasoning. In a 5-step pipeline with 4K tokens per step, you might expect to pay for 20K tokens. In practice, with context accumulation, you often pay for 60–120K tokens.

This isn't a bug. It's the design of how context windows work. But most teams aren't modeling it correctly when they forecast spend.

The compounding gets worse in a few specific failure modes:

**Loop continuation without termination.** An agent that is uncertain about its answer will often retry with minor variations. Each retry consumes the full accumulated context plus the new attempt. A single ambiguous task can produce 5–10 iterations before timing out.

**Over-provisioned context.** Developers provision context "just in case" because they're unsure what the agent will need. A task that needs 8K tokens gets 80K allocated. The excess tokens are wasted on every call.

**Misrouted calls.** A planning step that requires only light reasoning gets sent to GPT-4o. A simple extraction that needs no deep reasoning goes to the same model. The cost ratio between models is often 10–20×, so misrouting matters enormously.

## What the bill actually looks like

We ran a representative 20-task SWE-bench evaluation against our MVP. Without optimization, average token consumption per task was roughly what you'd expect from naive estimation — except that 31% of those tokens were either wasted on unnecessary context, consumed by loop iterations that didn't improve the answer, or spent on calls that didn't require the model they were routed to.

When we applied classification, routing, and trim, we reached the same benchmark scores with ~30% fewer tokens billed. That's not a small optimization. At $85K/month enterprise AI spend, that's over $25K per month of recovered budget.

## Why current tools don't solve this

The natural response to high AI spend is to look at your observability dashboard. You see per-node token counts, latency, and costs broken down by LLM call. This is useful for debugging. It doesn't help you prevent waste.

Knowing that step 4 cost $0.12 after the fact doesn't tell you that step 4 could have been routed to a smaller model, or that its context window was 70% irrelevant, or that the three retries before it could have been terminated after one.

Observability is a rearview mirror. Cost intelligence needs to be a steering wheel.

## What to do right now

Even without a purpose-built tool, there are steps you can take:

1. **Audit your loop termination conditions.** Most agent loops have termination conditions that are too lenient. Tighten them. Add explicit budget counters.

2. **Profile context window usage per step.** Log token counts by step. Identify which steps are consuming disproportionate context and whether that context is actually used.

3. **Model routing by reasoning depth.** Categorize your agent steps by reasoning requirement — planning, retrieval, extraction, synthesis. Route accordingly. Don't send extraction tasks to your most capable (and most expensive) model.

4. **Budget per task, not per session.** Set token budgets at the task level, not just at the API key level. Hard caps prevent runaway loops from destroying your budget.

These are manual steps. The tooling to automate them — to classify, route, trim, and reallocate at the proxy layer — is what we're building at Token Ninja.

The teams that figure this out first will have a meaningful cost advantage. The ones that don't will keep having uncomfortable conversations with their finance teams about why the AI budget is always over.
