# Course snapshot branches

Each video starts from a clean `begin` branch and has a matching reference `end` branch.

| Video | Begin | End | End-state output |
| --- | --- | --- | --- |
| 0. Setup | `course/00-setup-begin` | `course/00-setup-end` | Running baseline CRM with 3 tests |
| 1. Design | `course/01-design-begin` | `course/01-design-end` | `prototype` skill and isolated Lead Scoring preview |
| 2. PRD | `course/02-prd-begin` | `course/02-prd-end` | Accepted Lead Scoring requirement |
| 3. Research | `course/03-research-begin` | `course/03-research-end` | Evidence-backed solution and risk register |
| 4. Slice | `course/04-slice-begin` | `course/04-slice-end` | Three dependency-ordered vertical units |
| 5. Build | `course/05-build-begin` | `course/05-build-end` | Working Lead Scoring with 8 tests |
| 6. Review | `course/06-review-begin` | `course/06-review-end` | Persisted review and verified feature docs |

## Complete course branch

`course/final` contains the instructor package, learner-guide source tabs, copy-paste prompts, recording scripts, all ten skills, and the completed CRM. Use it as the default branch in the new course repository. Learners still start product exercises from the matching `begin` branch.

## Learner workflow

```bash
git switch course/03-research-begin
# Follow the video guide and run the skill.
git diff course/03-research-end
```

Use a fresh clone or disposable worktree for recording so previous video artifacts cannot leak into the next video.

## New remote release

Recommended repository name: `codex-reusable-skills-crm`.

The original repository remote is retained as a recovery source. For the new course repository, push only the `course/*` branches and set `course/final` as the default after review.

```bash
git remote add course-origin <new-repository-url>
git push course-origin 'refs/heads/course/*:refs/heads/course/*'
```

Do not delete the source remote branches until the new remote is verified.
