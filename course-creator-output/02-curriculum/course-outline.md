# Course Outline: How to Create Reusable Skills in Codex

## 1. Course overview

### Transformation statement

By the end of the course, intermediate software engineers can design focused Codex skills and compose them into a repeatable engineering workflow that turns a vague feature request into reviewed, working software.

### Target audience

Intermediate software engineers who can navigate a TypeScript repository, use Git, and run package scripts, but have not yet systematized their recurring work as agent skills.

### Format and duration

- Self-paced screencast course.
- Seven videos.
- Five minutes per video.
- Total runtime: approximately 35 minutes.
- One continuous CRM case study.

### Prerequisites

- Git.
- Node.js and npm.
- Codex with repository access.
- Familiarity with tests, TypeScript, and basic product requirements.
- Optional: a connected issue tracker for the `to-issues` extension.

## 2. Curriculum map

| Video | Bloom level | Learning objective | Activity | Output |
| --- | --- | --- | --- | --- |
| 0. Set up the CRM | Apply | Verify a branch-based course repository and run its baseline | Clone, install, test, run | Working CRM and green baseline |
| 1. Design predictable skills | Create | Design a focused reusable skill with safe boundaries | Create and run `prototype` | Isolated Lead Scoring preview |
| 2. Clarify requirements | Apply | Use structured Q&A to turn ambiguity into testable behavior | Run `qna` and `prd` | Accepted PRD |
| 3. Research the solution | Analyze | Compare technical choices and specify module contracts | Run `research-solution` | Solution and risk register |
| 4. Slice the work | Create | Decompose a solution into dependency-ordered vertical units | Run `slice-work` | Three-unit delivery plan |
| 5. Build with feedback loops | Apply | Implement planned behavior test-first through public contracts | Run `build` once per unit | Working Lead Scoring feature |
| 6. Review and document | Evaluate | Judge implementation against evidence and accepted criteria | Run `code-review` | Review and feature documentation |

The progression moves from setup, to creating a workflow, to applying composed workflows, to analysis, implementation, and evaluation.

## 3. Lesson details

### Video 0: Set up the CRM

- Objective: verify the course environment from a fresh branch.
- Content type: screencast.
- Duration: 5 minutes.
- Activity: run the starter and confirm 3 tests.
- Assessment: the app loads and baseline checks pass.

### Video 1: Design skills for predictable behavior

- Objective: create a `prototype` skill whose boundaries protect production behavior.
- Content type: concept plus screencast.
- Duration: 5 minutes.
- Activity: invoke `skill-design`, then run the new skill.
- Assessment: default CRM remains unchanged and the prototype URL is visibly different.

### Video 2: Clarify requirements to write thorough PRDs

- Objective: convert the Lead Scoring brief into checkable behavior.
- Content type: interactive screencast.
- Duration: 5 minutes.
- Activity: answer focused Q&A and persist the PRD.
- Assessment: all open questions that would change behavior are resolved.

### Video 3: Research risks and specify the solution

- Objective: select an architecture from evidence and define small contracts.
- Content type: screencast.
- Duration: 5 minutes.
- Activity: run `research-solution` and inspect its decision and risk sections.
- Assessment: the solution contains evidence, rejected options, contracts, and mitigations.

### Video 4: Decompose work into testable vertical slices

- Objective: create small, ordered units that each prove behavior.
- Content type: screencast.
- Duration: 5 minutes.
- Activity: run `slice-work`; optionally preview `to-issues`.
- Assessment: every requirement criterion maps to a unit and every unit has a blocker state.

### Video 5: Implement through tight feedback loops

- Objective: use tests as the control loop while building the planned feature.
- Content type: coding screencast.
- Duration: 5 minutes.
- Activity: run `build` once per unit, show RED, GREEN, and the rendered CRM.
- Assessment: 8 tests, typecheck, and production build pass.

### Video 6: Review results and update documentation

- Objective: evaluate the diff against its plan and record only verified behavior.
- Content type: review screencast.
- Duration: 5 minutes.
- Activity: run `code-review` with persisted outputs enabled.
- Assessment: the review cites evidence and feature documentation matches the running app.

## 4. Assessment strategy

This compact course uses artifact-based assessment instead of quizzes. A learner completes the course when they can show:

1. One new reusable skill with valid metadata.
2. A PRD with checkable acceptance criteria.
3. An evidence-backed technical solution.
4. A vertical-slice plan with complete requirement coverage.
5. A green implementation and rendered feature.
6. A review that separates verified behavior from intention.

The capstone is adapting the same workflow to one feature in the learner's own repository.

## 5. Resource list

- Course repository and snapshot branches.
- Learner guide tabs in `course/learner-guide/`.
- Copy-paste prompts in `course/prompts/`.
- [Skills in ChatGPT and Codex](https://help.openai.com/en/articles/20001066)
- [Agent Skills specification](https://agentskills.io/specification)
- [AGENTS.md](https://agents.md)

## 6. Content production checklist

- [ ] Record each video from its `begin` branch in a fresh worktree.
- [ ] Keep the timer visible to the instructor and stop at five minutes.
- [ ] Show only the relevant headings of each skill.
- [ ] Paste the prepared prompt instead of typing it live.
- [ ] Use the prepared Q&A answer key in Video 2.
- [ ] Show the generated file before explaining details.
- [ ] End on the matching `end` branch output.
- [ ] Mirror learner-guide markdown into the Google document tabs.
