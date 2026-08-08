# Video 1 Begin: Design Predictable Skills

You are at the starting state for the skill-design video. The product idea is Lead Scoring, but the first job is to design a safe prototyping workflow.

## 1. What to do

1. Open `.agents/skills/skill-design/SKILL.md` and scan its headings.
2. Copy the first prompt from `course/prompts/01-design.md`.
3. Invoke `$skill-design` to create a focused `prototype` skill.
4. Validate the new skill and its Codex metadata.
5. Run the second prompt to preview Lead Scoring without changing the default CRM.

## 2. What you should see

- A new `.agents/skills/prototype/` package.
- An isolated preview at `?prototype=lead-scoring`.
- Mocked score and tier values labeled as unconfirmed.
- Prototype notes in `docs/prototypes/lead-scoring.md`.
- The default CRM URL still behaving exactly as before.

## Follow the video

1. Introduce the risk of turning an untested idea directly into production code.
2. Explain that an isolated prototype is the solution.
3. Introduce `skill-design`.
4. Show only the skill's activation, process, metadata, and hard-rule headings.
5. Run `skill-design`, then run the generated `prototype` skill.
6. Compare the default CRM and the prototype output.

Reference result: `course/01-design-end`.

