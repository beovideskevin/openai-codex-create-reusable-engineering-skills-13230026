# Review: lead-scoring

Checks: tests pass (8 tests), lint not-configured, types pass, build pass
Behavior: verified
Meets the plan: yes
Quality: fail

## Findings

- [low] src/services/leadService.ts:41-42
  The comment says a reply “just bumps recency” and describes scoring as a future hook, but the reviewed implementation recalculates the lead's score and tier from the newly recorded activity on the next read. The comment is stale and can mislead future maintainers about the current behavior and the Unit 3 contract.

## Do first

1. Update the `logReply` comment to describe recording the activity and allowing the scored read projection to update immediately.

## Acceptance evidence

- Unit 1: The scoring contract and accepted weights are implemented in `src/domain/scoring.ts:3-23`; `src/domain/scoring.test.ts:12-33` verifies every activity occurrence, zero-activity cold behavior, and warm/hot thresholds. `src/services/leadService.ts:14-27` scores every repository lead and sorts by points, last activity, then name. `src/ui/LeadList.tsx:4-38` and `src/ui/LeadRow.tsx:4-42` render the score and tier. `npm test` passed 8 tests.
- Unit 2: `src/services/leadService.ts:30-33` returns the same `ScoredLead` projection for detail reads. `src/services/leadService.test.ts:57-68` compares list and detail points/tier. `src/ui/LeadDetail.tsx:4-31` renders the selected lead's score and tier. Browser verification showed Nadia Khan at `75 points · hot` with two recorded activities.
- Unit 3: `src/services/leadService.ts:41-45` records an email reply, and `src/App.tsx:47-50` refreshes the read path after the action. `src/services/leadService.test.ts:71-84` verifies the reply adds 25 points and moves the lead to the front. In the rendered CRM, Nadia changed from `75 hot` to `100 hot`, the detail changed from two to three activities, and the new reply appeared at the top without reload.
- Prototype retirement: `src/App.tsx:1-64` contains no prototype selector or mocked scoring path; the published diff deletes `src/prototypes/leadScoringPrototype.ts`. Opening `http://localhost:5175/?prototype=lead-scoring` rendered the same production score-sorted CRM rather than a separate preview.

## Required checks

- `npm test`: pass, 2 test files and 8 tests.
- `npm run typecheck`: pass.
- `npm run build`: pass.
- Lint: not configured in `package.json`.
- `git diff --check remotes/origin/course/05-build-begin...remotes/origin/course/05-build-end`: pass.
- Rendered CRM: verified at `http://localhost:5175/` and `http://localhost:5175/?prototype=lead-scoring`.

## Review scope

Reviewed the current clean `course/06-review-begin` tree and the published change from `remotes/origin/course/05-build-begin` to `remotes/origin/course/05-build-end`. No implementation files were changed during review. The local `course/05-build-end` branch is absent, so the remote snapshot and current review tree were used.
