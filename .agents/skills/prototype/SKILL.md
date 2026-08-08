---
name: prototype
description: >-
  Turn a feature idea into an isolated, runnable UI preview that makes product assumptions visible
  without committing to production architecture. Use only when the user explicitly asks to
  "prototype this", "mock up the interface", or "show me what this idea could look like". Not for
  production implementation (use the build skill) or accepted requirements (use the prd skill).
---

# Prototype

Make an idea concrete enough to react to while keeping the existing product behavior intact.

## Inputs

- A feature idea or short brief.
- A runnable application repository.
- Any explicit UI constraints from the user or `AGENTS.md`.

## Process

1. Read the current interface and name the single decision the prototype should make easier. Done when the prototype has one question, not a backlog.
2. Write the assumptions you must fake, including data, states, and interactions. Mark each as unconfirmed. Done when no mock value can be mistaken for a requirement.
3. Choose the smallest isolated surface: a query parameter, a dedicated route, or a separate fixture. Keep the default product path unchanged. Done when the baseline still opens without prototype behavior.
4. Build only the visible path needed to answer the question. Reuse the existing design system and fake data locally. Done when the idea can be demonstrated without adding production storage, services, or migrations.
5. Run the relevant typecheck and production build, then exercise both the default and prototype paths. Done when both paths load and the difference is intentional.
6. Write `docs/prototypes/<slug>.md` with the question, assumptions, entry URL, observations, and decisions still needed. Done when a future requirement writer can separate evidence from invention.

## Output

An isolated runnable preview plus `docs/prototypes/<slug>.md`:

```markdown
# Prototype: <title>

## Question
<the one decision this preview helps make>

## Open it
<command and URL>

## Assumptions
- Unconfirmed: <mocked behavior or value>

## What the preview shows
- <observable interaction or state>

## Decisions for the PRD
- <question the prototype cannot answer>
```

## Hard rules

- Never introduce production persistence, migrations, authentication, or external services. A prototype buys learning, not architecture.
- Never replace the default product path. Isolation keeps the preview reversible and makes before-and-after comparison possible.
- Never present fake values as approved behavior. Label every invented score, threshold, label, and state as unconfirmed.
- Do not add a dependency when existing UI code can answer the prototype question.
- Do not commit unless the user explicitly asks for a commit.

## Handoff

Use the `qna` and `prd` skills to turn reactions to the prototype into accepted requirements. In Codex, invoke `$prd`.
