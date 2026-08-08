---
name: build
description: >-
  Implement one planned unit test-first as a vertical slice, using type checks and focused tests
  as the feedback loop. Use only when the user explicitly asks to implement a planned unit, with
  phrases such as "build this unit", "implement this", or "ship the next unit". Do not activate
  merely because a plan exists. Not for planning the work (use the slice-work skill) or judging
  what was built (use the code-review skill).
---

# Build

Take one unit from the plan and make it real, one failing test at a time.

## Inputs

A published issue carrying a `feat:<slug>` label, or `docs/plans/<slug>.md` directly. Take the first unblocked unit, or the one you were handed.

## Branch

Use a branch explicitly named by the user when one is provided. Otherwise the planned target is `feat/<slug>`, taken from the issue's `feat:<slug>` label or from the plan's slug. Resume it when it exists. Before creating or switching branches, confirm that branch work is part of the request and discover the repository's actual base instead of assuming `main`. Keep every unit of a feature on one branch.

## Process

For the selected unit:

1. Name the unit's seams and their contracts before writing anything. Done when every seam has a signature.
2. Write ONE failing test for the next slice of behavior, run it, and watch it fail. Done when you have seen RED. A test you did not watch fail is not known to test anything.
3. Write the least code that turns it green, then run it again. Done when you have seen GREEN.
4. Repeat from step 2 until the unit's acceptance condition holds. Done when that condition is met, not when the code looks finished.
5. Typecheck and run the touched test file after every green. Done when both are clean.
6. Run the full suite once the unit is complete, then refactor once. Done when the suite is still green after the refactor.
7. Record the unit's status in the plan. Commit only when the user explicitly requested a commit as part of this workflow. Done when the plan shows the unit finished and any authorized commit exists.

Frontend work skips the red-green loop and is implemented directly, then verified by running it. Component props are the contract there.

## When blocked

Stop and ask. Do not guess the decision, and do not widen the unit to route around it. A guessed decision is rework that looks like progress.

## Hard rules

- No production code before a failing test. If the code came first, delete it and start again. Why: code written before the test defines the test, and the test stops being a check.
- Refactor once at the end, never inside a red-green cycle. Why: refactoring while red destroys the signal telling you what broke.
- Fakes, not mocks. Write a `Fake` that honors the contract and assert on behavior. Mock only at a true system edge: network, clock, filesystem. Why: mocking your own code asserts that the implementation has not changed, which is the opposite of what a test is for.
- Test through the contract only, never importing an internal helper into a test. Why: a test that survives a rewrite is the only kind worth keeping.
- Build only what the unit specifies. Anything else you find becomes its own unit. Why: silent additions never get reviewed, because nobody knows they are there.
- Do not hardcode environment-specific paths, credentials, external identifiers, or unexplained magic values. Accepted business rules belong in named, tested domain constants. Why: stable product policy should be visible in code, while environment coupling should remain configurable.
- Never claim it works without running it and showing the output. Why: "should work" is a prediction, not evidence.
- Never create a commit unless the user explicitly authorizes it, and never merge to the repository's protected or default branch. Why: implementation permission does not automatically authorize repository history changes or deployment.

## Handoff

Continue with the `code-review` skill. In Codex, invoke `$code-review`.
