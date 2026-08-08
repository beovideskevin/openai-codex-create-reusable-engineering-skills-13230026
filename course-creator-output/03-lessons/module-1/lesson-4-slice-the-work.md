# Lesson Script: Decompose Work into Testable Vertical Slices

## Metadata

- Duration: 5 minutes.
- Content type: screencast.
- Learning objective: turn an accepted solution into small, dependency-ordered units that each prove user behavior.
- Materials: `course/04-slice-begin`, accepted requirement, accepted solution.

## Hook, 0:00 to 0:30

"Most implementation plans are lists of layers: add types, write a service, build the UI. The problem is that no individual task proves the feature works, so feedback arrives only after everything is assembled."

## Solution, 0:30 to 0:50

"The slicing skill starts with the thinnest end-to-end behavior, orders later units by dependency, and maps every acceptance criterion to a visible proof."

## Skill introduction, 0:50 to 1:25

Show the headings in `slice-work` and briefly preview `to-issues`.

Highlight:

- Observable behavior.
- Tracer bullet.
- Unit anatomy.
- Coverage map.
- Blocker states.

Say: "Publishing issues is optional. The plan must be useful before an external tracker is connected."

## Demo, 1:25 to 3:35

1. Paste `course/prompts/04-slice.md`.
2. Show Codex reading the requirement and technical solution.
3. Pause on Unit 1, which crosses scoring policy, service ordering, and visible list output.
4. Show how Unit 2 reuses the policy for detail consistency.
5. Show how Unit 3 proves the score reacts to a logged reply.
6. Briefly open `to-issues` and point out its connector preflight and preview boundary.

## Output, 3:35 to 4:35

Open `docs/plans/lead-scoring.md` and show:

- Three dependency-ordered units.
- One behavior test and one visible proof per unit.
- Acceptance criteria coverage.
- Explicit blocker states.

Say: "Each unit can fail, pass, and be demonstrated without waiting for the entire feature."

## Activity

Learners identify one horizontal task in the plan and rewrite it as an observable vertical outcome.

Success criteria: the rewritten unit names a user-visible behavior and the test that proves it.

## Recap and bridge, 4:35 to 5:00

"We now have a delivery sequence with fast proof at every step. Next, we will use that sequence as the control surface for implementation."

## Companion materials

- `course/learner-guide/04-slice.md`
- `course/prompts/04-slice.md`
- `docs/plans/lead-scoring.md`

