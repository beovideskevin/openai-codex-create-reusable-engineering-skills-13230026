# Lesson Script: Clarify Requirements and Write the PRD

## Metadata

- Duration: 5 minutes.
- Content type: interactive screencast.
- Learning objective: turn ambiguity into testable product behavior.
- Materials: `course/02-prd-begin`, prototype, answer key.

## Hook, 0:00 to 0:30

"Make leads hot, warm, or cold sounds like a requirement. It is actually a bundle of unanswered decisions: signals, weights, thresholds, timing, old history, placement, decay, overrides, and tie-breaking."

Show `BRIEF.md` and the prototype assumptions.

## Solution, 0:30 to 0:50

"The Q&A discipline asks one decision at a time. The PRD skill then records only confirmed behavior and turns it into acceptance criteria."

## Skill introduction, 0:50 to 1:25

Show the headings in `qna` and `prd`.

Emphasize:

- One question per turn.
- Recommendation plus reason.
- Answers persist into the working document.
- PRD owns what, not how.

## Demo, 1:25 to 3:35

1. Paste `course/prompts/02-prd.md`.
2. Use the prepared answer key to respond quickly.
3. From 1:25 to 2:05, show two representative question-and-answer turns at normal speed:
   - Which activities and weights?
   - What are the tier thresholds?
4. From 2:05 to 2:45, use short jump cuts through the remaining six one-question turns from the same recorded run.
5. From 2:45 to 3:35, resume at normal speed when the skill writes the PRD.

Editing note: record the complete authentic run first. Remove response latency, but preserve all eight one-question turns and never batch the prepared answers.

## Output, 3:35 to 4:35

Open `docs/requirements/lead-scoring.md` and show:

- Scoring rules table.
- Checkable acceptance criteria.
- Out-of-scope section.
- Empty open-question section.

Say: "Notice what is missing: no scoring service, no database decision, and no file paths. Those belong to the next workflow."

## Activity

Learners change one product decision, then update the affected criterion and out-of-scope boundary.

Success criteria: the change is observable and still contains no implementation choice.

## Recap and bridge, 4:35 to 5:00

"We now know what the feature promises. Next, we will research the technical choices that can keep that promise."

## Companion materials

- `course/learner-guide/02-prd.md`
- `course/prompts/02-prd.md`
- `course/recording/02-prd-answer-key.md`
