# Video 0 Begin: Set Up the CRM

You are at the starting state for the setup video. The goal is to prove that the repository, tests, app, and first Codex skill work on your machine.

## 1. What to do

1. Install the locked dependencies with `npm ci`.
2. Run `npm test` and confirm the baseline is green.
3. Run `npm run typecheck`.
4. Start the app with `npm run dev`, then open `http://localhost:5173`.
5. Open `.agents/skills/skill-design/SKILL.md` and scan its headings only.

## 2. What you should see

- Three passing baseline service tests.
- A working Red30 CRM lead list.
- A lead detail panel and Log reply action.
- One repository skill: `skill-design`.

## Follow the video

1. Identify the setup problem: learners need the same reproducible starting state.
2. Introduce snapshot branches as the solution.
3. Preview the `skill-design` skill.
4. Scan its portable-core, metadata, activation, process, and hard-rule headings.
5. Run the setup commands and open the app.
6. Compare what you see with the checklist above.

Reference result: `course/00-setup-end`.

