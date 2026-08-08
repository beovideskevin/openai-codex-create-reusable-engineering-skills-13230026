# Course design decisions

## Course promise

In 35 minutes, an intermediate software engineer will turn a vague feature request into a reusable Codex workflow library, then use that library to prototype, specify, plan, build, and review a working feature.

## Recommended sequence

The course uses seven five-minute videos:

1. Set up the repository and understand snapshot branches.
2. Design a reusable `prototype` skill with `skill-design`.
3. Clarify the brief and write a PRD with `qna` and `prd`.
4. Research risks and specify module contracts with `research-solution` and `module-design`.
5. Decompose the solution with `slice-work`, with `to-issues` as an optional connector extension.
6. Implement Lead Scoring through the `build` feedback loop.
7. Review the result and persist verified documentation with `code-review`.

## Changes from the original video map

### Add Video 0

Repository setup deserves its own short lesson. It removes installation friction from the first skills lesson while keeping the total runtime at 35 minutes.

### Split the old plan skill

The original `plan` skill owned both technical research and delivery slicing. That is two different jobs with different inputs and completion criteria. The course now uses:

- `research-solution` for evidence, decisions, risks, and module contracts.
- `slice-work` for tracer bullets, dependency order, and requirement coverage.

This split reinforces the course's central lesson: predictable skills have one job.

### Make issue publishing optional

`to-issues` requires a connected tracker and confirmed project. The core lesson finishes with a repository plan, so every learner can complete it. The connector demo is an optional extension for learners who already use Linear or another supported tracker.

### Add a prototype skill

The first skills lesson creates a useful workflow instead of discussing skill anatomy in the abstract. The prototype is isolated behind a query parameter, labels every invented value, and becomes evidence for the requirements conversation.

## Repeated video structure

Every skills lesson uses the same rhythm:

1. Problem and use case.
2. Solution in one or two lines.
3. Skill introduction.
4. High-level skill anatomy.
5. Run the skill.
6. Show the generated output.
7. Recap and bridge.

Repetition is intentional. Learners should leave with a workflow pattern they can apply to their own engineering tasks.
