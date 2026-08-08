# Video 3: Research Risks and Specify the Solution

## Problem

A complete PRD still does not tell an engineer where scoring belongs, whether to derive or persist it, or how to keep list and detail results consistent.

## Solution

Use `research-solution` to compare options from evidence, and use `module-design` to define the smallest stable contracts before implementation.

## Start branch

`course/03-research-begin`

## Skills

### `research-solution`

Traces the current system, identifies material choices, gathers evidence, compares options, writes a risk register, and produces a buildable direction without slicing or coding.

### `module-design`

Pushes complexity behind small interfaces and treats those interfaces as the test surface.

## Steps

1. Read the accepted requirement.
2. Scan the two skill files at a heading level.
3. Copy `course/prompts/03-research.md` and invoke `$research-solution`.
4. Inspect the evidence and rejected options before accepting the decisions.
5. Check that module contracts contain signatures and invariants only.

## Expected output

`docs/solutions/lead-scoring.md`

The reference solution selects a pure scoring policy, a service projection, read-time calculation for the course app, deterministic sorting, and a single UI path.

## Success check

Every material choice has evidence, one rejected alternative, and a risk mitigation. No delivery units or implementation code appear.

## Reference end branch

`course/03-research-end`

## Save and continue

```bash
git switch -c learner/03-research
git add -A
git commit -m "Complete video 3"
git switch course/04-slice-begin
```
