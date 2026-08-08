---
name: slice-work
description: >-
  Decompose an accepted technical solution into dependency-ordered vertical units with testable
  acceptance conditions and complete requirement coverage. Use only when the user asks to "slice
  the work", "break this solution into units", or "create the implementation plan" and both a
  requirement and solution exist. Not for researching technical choices (use research-solution),
  publishing tracker issues (use to-issues), or implementing code (use build).
---

# Slice Work

Turn a settled solution into small increments that each prove useful behavior.

## Inputs

- `docs/requirements/<slug>.md`
- `docs/solutions/<slug>.md`

Reuse the same slug. Do not reopen decisions already settled in the accepted inputs.

## Process

1. List every acceptance criterion and the observable behavior that proves it. Done when no criterion is represented only by a technical task.
2. Trace the solution's module contracts from input to user-visible output. Done when the thinnest path through every required layer is visible.
3. Make Unit 1 that tracer bullet. It must be demonstrable on its own and establish the contracts later units extend. Done when Unit 1 reaches a real output without placeholder layers.
4. Add one vertical increment at a time. Keep each unit to roughly one or two commits and one focused session. Done when no unit is a horizontal bucket such as "all types" or "all UI".
5. Order units by real dependency. Mark a unit parallel-safe only when it waits on nothing unfinished and touches different files from sibling units. Done when every unit has a `Blocked by` line.
6. Map every requirement criterion to at least one unit and every unit back to accepted behavior. Done when there are no orphan criteria or speculative units.
7. Write `docs/plans/<slug>.md` using the template below. Done when another engineer can take the first unblocked unit without the planning conversation.

## Output

```markdown
# Plan: <title>

Requirement: docs/requirements/<slug>.md
Solution: docs/solutions/<slug>.md
Branch: feat/<slug>

## Tracer bullet
<the thinnest end-to-end path>

## Unit 1: <behavioral name>
- Builds: <demonstrable behavior>
- Contracts: <signatures from the solution>
- Test first: <one failing behavior test>
- Acceptance: <observable condition>
- Blocked by: none
- Parallel-safe: no

## Requirement coverage
- <criterion> -> Unit <n>

## Open questions
<empty is the goal>
```

## Hard rules

- Never put research or unresolved architecture into the plan. Send new technical choices back to `research-solution`.
- Never create a horizontal unit that cannot be demonstrated by itself.
- Never let one unit span separate requirements or acceptance moments.
- Never use vague acceptance such as "works" or "is complete". Name what a test or user can observe.
- Never merge or split units while publishing them. Change the plan first so the source of truth remains visible.

## Handoff

Use `to-issues` to publish the units when a tracker is connected, or use `build` to implement the first unblocked unit directly. In Codex, invoke `$to-issues` or `$build`.
