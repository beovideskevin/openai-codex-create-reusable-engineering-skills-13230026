# Video 1 End: Prototype Skill and Preview

This branch contains the reference output from the skill-design lesson.

## 1. What this branch contains

1. A reusable `prototype` skill with portable instructions and Codex metadata.
2. An isolated Lead Scoring preview that does not alter production behavior.

## 2. What to inspect

- `.agents/skills/prototype/SKILL.md`: boundaries, workflow, checks, and stop conditions.
- `.agents/skills/prototype/agents/openai.yaml`: Codex presentation and explicit invocation policy.
- `docs/prototypes/lead-scoring.md`: assumptions and unresolved product decisions.
- `http://localhost:5173/?prototype=lead-scoring`: mocked score and tier UI.
- `http://localhost:5173`: unchanged baseline CRM.

## Continue

Switch to `course/02-prd-begin` to turn the prototype assumptions into accepted behavior.

