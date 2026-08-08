---
name: prd
description: >-
  Turn a feature request into a requirement document covering the problem, the behavior, and the
  conditions that prove it works. Use only when the user asks to capture what to build before
  deciding how, with phrases such as "write a PRD", "capture the requirement", or "what are we
  actually building". Do not activate from an ordinary feature implementation request. Not for
  designing the how (use the research-solution skill) or for bugs (write a bug report instead).
---

# PRD

Write what the user gets and how you will know it works. Describe the product, never the implementation.

## Inputs

The feature request, plus the repository for grounding.

## Process

1. Read the repo for the vocabulary and the decisions already in place around the area you are touching. Done when you can use the project's own terms instead of inventing new ones.
2. Use the `qna` skill on everything ambiguous or contradictory. Done when no unanswered question would change a requirement.
3. Write the document to `docs/requirements/<slug>.md`, where `<slug>` names the feature in kebab case: the thing being built, not this document. Done when every section below is filled.

## Output

<prd-template>

## Problem

What the user cannot do today, in their words.

## Solution

What the user can do once this ships, still in their words.

## Entry and access

Whether the user signs in and with what, what someone without access sees, and where they arrive from. Behavior only: not where the product is hosted.

## User stories

1. As a `<role>`, I want `<capability>`, so that `<outcome>`.

## Acceptance criteria

Conditions a test could check, including the edges and the failure behavior.

- [ ] ...

## Out of scope

What this deliberately does not cover, so nobody gilds it.

## Open questions

Decisions nobody has answered yet, each carrying a recommendation and its reason. Empty is the goal.

1. `<question>` Recommendation: `<answer>`, because `<reason>`.

</prd-template>

## Hard rules

- One document covers one deliverable: one name, one job, one core concept, one moment where it is accepted. If the work splits cleanly into two things that ship and get accepted separately, write two documents. Why: this boundary becomes one plan and one branch downstream, and a fuzzy boundary there costs far more than a second file here.
- No implementation. No modules, schemas, file layouts, or library choices. Why: fixing the how this early discards options before anyone has checked which ones are real.
- Ask how the user gets in, never assume it. Resolve it with the `qna` skill like any other decision the user owns, and record an unanswered one as an open question rather than filling in the obvious answer. Why: the obvious answer is whatever the platform makes easiest, which is how an architecture ends up chosen by nobody.
- No file paths and no code. Arithmetic that states a rule is fine and often the only way to make a criterion checkable; a code snippet is not. Why: paths and code are wrong within a week and nobody goes back to update them, while the rule itself is the requirement.
- When a rule changes what someone sees or has to do, and the client never said which way, it is an open question, not a criterion. Why: that choice is theirs, and putting it in the criteria makes it look like they agreed to it.
- Every acceptance criterion is checkable. "Handles errors gracefully" is not one. "Returns 409 when the slug already exists" is. Anything about speed, size, or ease needs a number or it is not a criterion. Why: a criterion that cannot fail proves nothing.

## Handoff

Once the requirement is agreed, continue with the `research-solution` skill. In Codex, invoke `$research-solution`.
