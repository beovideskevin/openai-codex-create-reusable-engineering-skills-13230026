# How to Create Reusable Skills in Codex

## What you will build

You will turn a vague Lead Scoring request into a complete engineering workflow and a working CRM feature. Along the way, you will collect reusable skills for prototyping, requirements, solution research, slicing, implementation, and review.

## What you will be able to do

By the end, you can:

- Design a skill with a focused trigger and predictable output.
- Compose several skills into an end-to-end engineering workflow.
- Protect product decisions from accidental implementation assumptions.
- Use tests and reviews as feedback loops for agent-generated work.
- Reuse the same workflow in another repository.

## Prerequisites

- Intermediate software engineering experience.
- Git, Node.js, and npm installed.
- Codex with access to the cloned repository.
- Optional: a connected issue tracker for the publishing extension.

## How to use the snapshots

Every video has a `begin` branch and an `end` branch. Start from `begin`, complete the steps, and use `end` only to compare or recover.

The complete guides, prompts, scripts, and end-state report live on `course/final`, which should be the default branch of the released course repository. The guide remains open beside Codex while your exercise worktree uses a lesson snapshot.

```bash
git switch course/01-design-begin
# Complete the video.
git diff course/01-design-end
```

The live prompts tell Codex not to commit. That protects your history during the demonstration. After you inspect the result, save it on your own learner branch before switching snapshots:

```bash
git switch -c learner/01-design
git add -A
git commit -m "Complete video 1"
git switch course/02-prd-begin
```

Use a fresh clone or worktree for a clean rerun. Do not discard an uncommitted exercise just to change snapshots.

## Video map

| Video | Start branch | Main output |
| --- | --- | --- |
| 0. Setup | `course/00-setup-begin` | Running baseline CRM |
| 1. Design | `course/01-design-begin` | Prototype skill and UI preview |
| 2. PRD | `course/02-prd-begin` | Accepted requirement |
| 3. Research | `course/03-research-begin` | Technical solution and risk register |
| 4. Slice | `course/04-slice-begin` | Vertical-slice plan |
| 5. Build | `course/05-build-begin` | Working Lead Scoring feature |
| 6. Review | `course/06-review-begin` | Review and verified documentation |

## Core resources

- [Course repository](https://github.com/dswh/lil_codex_reusable_skills)
- [Skills in ChatGPT and Codex](https://help.openai.com/en/articles/20001066)
- [Agent Skills specification](https://agentskills.io/specification)
- [AGENTS.md](https://agents.md)
- Repository course map: `course/BRANCHES.md`

## Completion challenge

Choose one recurring workflow in your own repository. Design one focused skill for it, test the trigger with realistic requests, and connect it to at least one neighboring skill without combining their jobs.
