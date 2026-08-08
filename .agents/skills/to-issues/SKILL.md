---
name: to-issues
description: >-
  Publish each unit of an existing plan to a connected issue tracker as one self-contained issue,
  in dependency order, with blockers wired. Use only when the user explicitly says "create the
  issues", "publish this plan", or "make the tickets". Requires a plan, a connected tracker, and a
  confirmed destination project. A publisher only: it never re-slices. Not for deciding units
  (use the slice-work skill) or writing code (use the build skill).
---

# To Issues

Lift each unit out of the plan into one issue somebody can pick up cold. One unit, one issue.

## Inputs

`docs/plans/<slug>.md`. The unit boundaries are already fixed there. Never redraw them here.

Do not start until both hold:

- **The plan exists.** No plan means no units, and inventing them here bypasses the slicing rules and the requirement mapping that produced them.
- **The tracker is connected and the destination project is known.** Confirm the available connector or MCP tools and the exact team or project before creating anything. Issues published into the wrong project are noise somebody else has to clean up, and unpicking them costs more than asking did.

## Process

1. List the plan's units in dependency order. Done when every unit has a name and a "Blocked by" line you can trace to another unit.
2. Discover the tracker's tools and preflight every required capability without writing: issue creation, destination lookup, label lookup or creation, blocking relations, and ownership. Stop before creating anything if a capability is unavailable, or propose a reduced workflow and wait for explicit approval. Done when the full operation is supported and its destination is confirmed.
3. Rewrite each unit as a brief that stands on its own: what the system does once this unit lands, and the conditions that prove it. Done when the brief reads complete with the plan file closed.
4. Create the issues in the confirmed project, in dependency order, so each blocker can point at an issue that already exists. Tag every issue `feat:<slug>` from the plan, creating the label if it is missing. Record each created ID immediately. Done when every unit is published and labeled.
5. Create each blocker as a relation in the tracker itself, using the real issue IDs from step 4. Done when querying the tracker returns the dependency graph, every unit that waits on another shows it as a blocking relation, and the units that wait on nothing show none.
6. If a runtime failure leaves partial external state, stop all further writes and report exactly which issue IDs and relations exist. Do not delete or retry them without user approval. Done when the user has a recoverable inventory of the partial operation.

## Output

One issue per unit.

<issue-template>
## What to build
<what the system does once this lands, in behavior, not in code>

## Acceptance criteria
- [ ] <a condition a test could check>

## Blocked by
<issue IDs, or "nothing, can start now". This line is a courtesy for a reader; the relation in step 5 is the real thing>
</issue-template>

## Hard rules

- Never guess the destination project, and never publish a first issue to find out whether the connection works. Why: a test ticket in a live project is somebody else's cleanup, and the answer costs one question.
- Never publish from an inferred handoff or because a plan exists. Require direct user authorization in the current request. Why: writing to an external tracker affects other people and cannot be treated as an automatic next step.
- Never paste the plan into an issue. Compactness comes from scoping to one unit, not from trimming sentences. Why: the plan is the source, and duplicating it means two documents that disagree within a week.
- Behavior only. No file paths and no line numbers. Why: they are wrong as soon as the code moves, and whoever picks this up should find the files themselves.
- Publish in dependency order. Why: a blocker naming a unit instead of an issue ID is a dead link the first time somebody opens it.
- A blocker that exists only as text in the issue body is not a blocker. Why: the tracker is what orders the work and what anyone dispatching it reads, so a dependency nobody can query lets the last unit be started first.
- Say who owns the issues, or say that nobody does. Why: an unassigned backlog and a deliberately unclaimed one look identical, and only one of them is a decision.
- One issue is one unit. Never merge two units or split one. Why: either one silently rewrites the phasing the plan decided, and nobody reviews a change nobody can see.
- An issue that overflows the tracker's limits is a unit the plan failed to split. Send it back rather than trimming it to fit.
- Anything that would destroy work stops for sign-off instead of being published. Why: an instruction to delete or overwrite reads as approved once it is sitting in a ticket.

## Handoff

Continue with the `build` skill, taking one issue or working through them in order. In Codex, invoke `$build`.
