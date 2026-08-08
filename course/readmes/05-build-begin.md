# Video 5 Begin: Build Through Tight Feedback Loops

You are at the starting state for the implementation video. The plan is accepted, but production scoring does not exist yet.

## 1. What to do

1. Read `docs/plans/lead-scoring.md` and scan the `build` skill headings.
2. Use the Unit 1 prompt in `course/prompts/05-build.md`.
3. Watch one behavior test fail, add the least code, and watch it pass.
4. Stop at Unit 1's acceptance condition.
5. Invoke `$build` separately for Unit 2 and Unit 3.
6. Finish with tests, typechecking, production build, and the rendered CRM.

## 2. What you should see

- A pure scoring policy with named, tested weights and thresholds.
- Leads sorted by score, recency, then name.
- Matching score and tier in list and detail.
- A logged reply immediately adding 25 points and refreshing the queue.
- Eight passing tests, clean typechecking, and a successful production build.

## Follow the video

1. Show why one large generated diff is difficult to trust.
2. Explain RED, GREEN, and unit stop conditions as the solution.
3. Introduce `build`.
4. Show its contract, feedback-loop, verification, and commit-boundary headings.
5. Run one skill invocation per unit, preserving each RED and GREEN result.
6. Inspect the rendered feature and final verification commands.

Reference result: `course/05-build-end`.

