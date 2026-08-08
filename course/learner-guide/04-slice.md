# Video 4: Decompose Work into Testable Vertical Slices

## Problem

Plans often become horizontal task lists such as "add types," "write service," and "build UI." None of those proves user behavior by itself.

## Solution

Use `slice-work` to create a tracer bullet and dependency-ordered vertical units. Use `to-issues` only when a tracker is already connected.

## Start branch

`course/04-slice-begin`

## Skills

### `slice-work`

Maps requirements to observable behavior, creates the thinnest end-to-end unit first, and gives every unit a test, acceptance condition, dependency, and coverage mapping.

### `to-issues` (optional)

Publishes already-settled units to a confirmed tracker project. It preflights capabilities and never re-slices the plan.

## Steps

1. Read the requirement and accepted solution.
2. Copy `course/prompts/04-slice.md` and invoke `$slice-work`.
3. Check that Unit 1 touches policy, service, and visible list output.
4. Check every acceptance criterion in the coverage map.
5. If you have a tracker connector, preview the optional publishing prompt without guessing a destination.

## Expected output

`docs/plans/lead-scoring.md`

The reference plan has three units: prioritize the list, keep detail consistent, and react to a new reply.

## Success check

Each unit can be demonstrated, fits one focused session, and has an explicit blocker state.

## Reference end branch

`course/04-slice-end`

## Save and continue

```bash
git switch -c learner/04-slice
git add -A
git commit -m "Complete video 4"
git switch course/05-build-begin
```
