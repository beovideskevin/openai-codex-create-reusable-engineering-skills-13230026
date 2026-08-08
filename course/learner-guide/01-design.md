# Video 1: Design Skills for Predictable Agent Behavior

## Problem

Feature ideas often jump straight into production code. That hides assumptions and makes a fast experiment expensive to reverse.

## Solution

Use `skill-design` to create a focused `prototype` workflow, then run it to make Lead Scoring visible without changing production architecture.

## Start branch

`course/01-design-begin`

## Skills

### `skill-design`

Creates or audits portable skills. Its core structure covers activation, one-job boundaries, process checks, Codex metadata, validation, and fresh-agent testing.

### `prototype`

The skill created during this lesson. It builds an isolated UI preview, labels fake values as unconfirmed, preserves the default product path, and records decisions for the PRD.

## Steps

1. Open `.agents/skills/skill-design/SKILL.md` and scan the headings.
2. Copy the prompts from `course/prompts/01-design.md`.
3. Invoke `$skill-design` to create `prototype`.
4. Validate the new skill.
5. Invoke `$prototype` for the Lead Scoring idea.
6. Open both the default CRM and `?prototype=lead-scoring`.

## Expected output

- `.agents/skills/prototype/SKILL.md`
- `.agents/skills/prototype/agents/openai.yaml`
- `docs/prototypes/lead-scoring.md`
- An isolated score-and-tier preview at `http://localhost:5173/?prototype=lead-scoring`

## Success check

The default URL still behaves like the baseline, and every mocked prototype decision is labeled unconfirmed.

## Reference end branch

`course/01-design-end`

## Save and continue

After comparing your result, keep it on a learner branch before changing snapshots:

```bash
git switch -c learner/01-design
git add -A
git commit -m "Complete video 1"
git switch course/02-prd-begin
```
