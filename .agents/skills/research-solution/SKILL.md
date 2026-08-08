---
name: research-solution
description: >-
  Research the technical choices and failure risks behind an accepted requirement, then specify
  evidence-backed module contracts without slicing or implementing the work. Use only when the
  user asks to "research the solution", "evaluate the risks", or "design how we should build
  this" and a requirement exists. Not for writing requirements (use prd), decomposing delivery
  units (use slice-work), or writing code (use build).
---

# Research Solution

Turn an accepted product promise into a buildable technical direction whose risks are visible.

## Inputs

`docs/requirements/<slug>.md`, the repository, and its durable guidance.

## Process

1. Trace the current behavior through the modules, data seams, tests, and user interface. Done when every affected runtime path and existing contract is named.
2. List the decisions that could change correctness, reversibility, or operational cost. Include data ownership, computation timing, failure behavior, and interface shape. Done when every material choice has at least two candidates or a documented reason only one exists.
3. Gather evidence from the repository, executed checks, and primary vendor documentation when an external system is involved. Use a disposable directory or worktree for experiments. Done when observations are separate from conclusions.
4. Compare candidates against the requirement and existing architecture. Record the selected option, rejected option, and one-sentence reason. Done when every choice has a falsifiable rationale.
5. Use the `module-design` skill for every new or changed interface. Write signatures and invariants only, with no implementation. Done when callers can depend on a small contract.
6. Build a risk register with likelihood, impact, detection signal, and mitigation. Done when every high-impact failure has a way to detect it before release.
7. Write `docs/solutions/<slug>.md`. Propose any requirement change, but never edit the accepted requirement without approval. Done when the solution contains no unresolved decision that would change its contracts.

## Output

```markdown
# Solution: <title>

Source: docs/requirements/<slug>.md

## Current path
<how behavior flows today>

## Evidence
- Observed: <command, file, or primary source and result>

## Decisions
- Chosen: <option>. Rejected: <option>. Because: <reason>.

## Module contracts
<signatures and invariants only>

## Risks
| Risk | Likelihood | Impact | Detection | Mitigation |

## Requirement impact
<none, or proposed amendment awaiting approval>

## Open questions
<empty is the goal>
```

## Hard rules

- Never state a version, limit, API field, or supported operation from memory. Check a primary source.
- Never mix observations with conclusions. Evidence must remain independently inspectable.
- Never put implementation code or delivery units in the solution. This skill decides shape, not sequence.
- Never run a throwaway in the user's live working tree or delete user files during cleanup.
- Never quietly weaken an acceptance criterion. Surface the conflict and ask for approval.

## Handoff

Use the `slice-work` skill after the solution is accepted. In Codex, invoke `$slice-work`.
