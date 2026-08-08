# Lesson Script: Review Results and Update Documentation

## Metadata

- Duration: 5 minutes.
- Content type: review screencast.
- Learning objective: evaluate an implementation against accepted criteria and persist only verified behavior.
- Materials: `course/06-review-begin`, accepted plan, completed implementation.

## Hook, 0:00 to 0:30

"A green build proves that commands completed. It does not prove that every requirement is covered, the interface behaves correctly, or the documentation describes what was actually shipped."

## Solution, 0:30 to 0:50

"The review skill freezes the scope, runs the repository checks, exercises the user journey, maps every acceptance criterion to evidence, and keeps review separate from implementation."

## Skill introduction, 0:50 to 1:25

Show the headings in `code-review`.

Highlight:

- Scope freeze.
- Required checks.
- Behavior exercise.
- Evidence-backed findings.
- Explicit permission for persisted documentation.

Say: "A reviewer reports defects and gaps. It does not silently repair the code it is judging."

## Demo, 1:25 to 3:35

1. Paste `course/prompts/06-review.md`.
2. Show Codex reading the requirement, solution, plan, and diff.
3. Run tests, typechecking, and the production build.
4. Exercise the sorted list, detail consistency, and reply update in the rendered CRM.
5. Show the acceptance matrix being populated with code and execution evidence.
6. Point out that this prompt explicitly permits writing the review and feature documentation.

## Output, 3:35 to 4:35

Open `docs/reviews/lead-scoring.md` and `docs/features/lead-scoring.md`.

Show:

- The pass verdict and verification commands.
- Evidence for each acceptance criterion.
- Known tradeoffs separated from defects.
- Feature documentation limited to observed behavior.

Say: "The documentation is trustworthy because it was produced from review evidence, not copied from the original intention."

## Activity

Learners choose one acceptance claim and trace it through requirement, test, code, and rendered output.

Success criteria: the evidence chain contains no unsupported jump.

## Recap and next step, 4:35 to 5:00

"You now have a reusable workflow from ambiguity to reviewed software. Clone the pattern into your own repository, then replace the CRM feature with one real task from your backlog."

## Companion materials

- `course/learner-guide/06-review.md`
- `course/prompts/06-review.md`
- `docs/reviews/lead-scoring.md`
- `docs/features/lead-scoring.md`

