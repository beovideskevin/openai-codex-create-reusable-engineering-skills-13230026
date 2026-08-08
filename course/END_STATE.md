# Course end state

Reference branch: `course/final`

## Reusable workflow library

The final snapshot contains ten focused skills:

- `skill-design`
- `prototype`
- `qna`
- `prd`
- `research-solution`
- `module-design`
- `slice-work`
- `to-issues`
- `build`
- `code-review`

Each skill has portable `SKILL.md` instructions and Codex metadata in `agents/openai.yaml`.

## Product result

Red30 CRM now:

- Scores every recorded activity through one domain policy.
- Derives hot, warm, and cold tiers.
- Sorts the lead queue by score, recency, and name.
- Shows the same priority in list and detail views.
- Adds 25 points and refreshes the queue when a reply is logged.
- Scores existing history without a separate backfill step.

## Evidence

- 8 tests pass across the scoring policy and service behavior.
- Strict TypeScript passes.
- The production Vite build passes.
- The rendered app shows 28 leads ordered by real scores.
- The review reports no findings within the accepted course scope.

## Course artifacts

- Product brief: `BRIEF.md`
- Prototype notes: `docs/prototypes/lead-scoring.md`
- Requirement: `docs/requirements/lead-scoring.md`
- Technical solution: `docs/solutions/lead-scoring.md`
- Delivery plan: `docs/plans/lead-scoring.md`
- Review: `docs/reviews/lead-scoring.md`
- Feature documentation: `docs/features/lead-scoring.md`
- Learner guide tabs: `course/learner-guide/`
- Recording scripts: `course-creator-output/03-lessons/`
