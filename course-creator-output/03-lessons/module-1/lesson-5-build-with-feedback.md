# Lesson Script: Implement Features Through Tight Feedback Loops

## Metadata

- Duration: 5 minutes.
- Content type: coding screencast.
- Learning objective: implement one planned unit at a time using tests and public behavior as the feedback loop.
- Materials: `course/05-build-begin`, accepted plan.

## Hook, 0:00 to 0:30

"A large generated diff is difficult to review because code, tests, and hidden assumptions arrive at once. If the result is wrong, we do not know which decision broke first."

## Solution, 0:30 to 0:50

"The build skill keeps the loop small: name the contract, write one failing behavior test, add the least production code, turn the test green, then continue to the next planned unit."

## Skill introduction, 0:50 to 1:25

Show the headings in `build`.

Highlight:

- Confirm the unit.
- Name contracts first.
- RED and GREEN evidence.
- Full verification.
- No automatic commit.

Say: "The plan controls scope, and executable behavior controls correctness."

## Demo, 1:25 to 3:35

1. From 1:25 to 2:15, paste the Unit 1 prompt, show the scoring policy test fail before `scoring.ts` exists, turn it green, and show the unit stop at its acceptance condition.
2. From 2:15 to 2:45, jump through the separate Unit 2 invocation, preserving its RED, GREEN, and stop evidence.
3. From 2:45 to 3:10, jump through the Unit 3 invocation and show reply logging refresh the score through the public service path.
4. From 3:10 to 3:35, show the full test, typecheck, and production build commands complete after Unit 3.

Editing note: record all three skill invocations and checks before editing. Keep the first loop at normal speed, remove command latency from the later units, and leave each unit boundary visible.

## Output, 3:35 to 4:35

Open the CRM and show:

- Score and Hot, Warm, or Cold tier in the lead list.
- Highest score first with deterministic tie-breaking.
- Matching score in lead detail.
- A logged reply updating the activity-backed score.

Then show the eight passing tests.

Say: "The final interface is the accumulated result of small proven units, not a single leap."

## Activity

Learners point to one visible behavior and identify the exact automated test that protects it.

Success criteria: the test exercises a public contract and would fail if the visible behavior regressed.

## Recap and bridge, 4:35 to 5:00

"The feature works and the checks are green. Next, we will review it from a fresh perspective and document only what the evidence supports."

## Companion materials

- `course/learner-guide/05-build.md`
- `course/prompts/05-build.md`
- `docs/plans/lead-scoring.md`
