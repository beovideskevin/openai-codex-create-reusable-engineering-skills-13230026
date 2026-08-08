# Video 5: Implement Features Through Tight Feedback Loops

## Problem

Large agent-generated changes are hard to trust because the code, tests, and assumptions arrive together.

## Solution

Use `build` to take one planned unit at a time through RED, GREEN, typechecking, full tests, and one final refactor.

## Start branch

`course/05-build-begin`

## Skill

### `build`

Names contracts first, writes one failing behavior test, adds the least production code, repeats through the acceptance condition, runs all checks, and records plan status. It does not commit unless explicitly authorized.

## Steps

1. Read `docs/plans/lead-scoring.md`.
2. Copy the Unit 1 prompt from `course/prompts/05-build.md` and invoke `$build`.
3. Watch the scoring test fail before `scoring.ts` exists.
4. Watch it turn green after the policy is added.
5. Invoke `$build` separately with the Unit 2 and Unit 3 prompts.
6. Confirm each invocation stops after its named acceptance condition.
7. Open the rendered CRM and inspect the priority column.

## Expected output

- `src/domain/scoring.ts`
- `src/domain/scoring.test.ts`
- Scored service projections and updated service tests.
- Score and tier in list and detail views.
- 8 passing tests, typecheck, and production build.

## Success check

The visible list order comes from tested domain behavior, not hardcoded prototype values.

## Reference end branch

`course/05-build-end`

## Save and continue

```bash
git switch -c learner/05-build
git add -A
git commit -m "Complete video 5"
git switch course/06-review-begin
```
