# Video 2: Clarify Requirements and Write the PRD

## Problem

The Lead Scoring request sounds clear until implementation choices appear: weights, thresholds, timing, history, placement, decay, and overrides.

## Solution

Use `qna` to resolve one behavior-changing decision at a time, then use `prd` to record the accepted product promise without architecture.

## Start branch

`course/02-prd-begin`

## Skills

### `qna`

Asks exactly one question, recommends an answer, follows dependencies, and records confirmed decisions without inventing user choices.

### `prd`

Turns the brief and answers into a problem statement, user stories, testable acceptance criteria, deliberate exclusions, and an empty open-question list.

## Steps

1. Read `BRIEF.md`.
2. Open the prototype from Video 1 as conversation evidence.
3. Copy `course/prompts/02-prd.md` and invoke `$prd`.
4. Answer each question with the prepared course decisions or choose your own.
5. Review the generated acceptance criteria for checkability.

## Expected output

`docs/requirements/lead-scoring.md`

The reference output defines activity weights, tier thresholds, immediate updates, retroactive history, list and detail placement, tie-breaking, and explicit out-of-scope behavior.

## Success check

No unanswered question would change observable behavior, and the PRD contains no modules, schemas, or code.

## Reference end branch

`course/02-prd-end`

## Save and continue

```bash
git switch -c learner/02-prd
git add -A
git commit -m "Complete video 2"
git switch course/03-research-begin
```
