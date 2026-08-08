# Lesson Script: Set Up the CRM

## Metadata

- Duration: 5 minutes.
- Content type: screencast.
- Learning objective: verify a reproducible Codex skills course repository.
- Materials: Git, Node.js, npm, Codex, terminal, browser.

## Hook, 0:00 to 0:30

"A reusable workflow is only useful when everyone starts from the same state. Before we design a skill, we are going to prove the repository, tests, app, and snapshot system all work on your machine."

Show the empty terminal and the course repository URL.

## Solution, 0:30 to 0:50

"Every video has a begin branch and a reference end branch. You do the work on begin, and end is your recovery point."

Show `course/BRANCHES.md` or the learner guide branch table.

## Walkthrough, 0:50 to 3:35

1. Clone the repository at the branch named in the learner guide:

   ```bash
   git clone --branch course/00-setup-begin https://github.com/dswh/lil_codex_reusable_skills.git codex-reusable-skills-crm
   cd codex-reusable-skills-crm
   ```

2. Run:

   ```bash
   npm ci
   npm test
   npm run typecheck
   npm run dev
   ```

3. Open the CRM and point out the leads list, recency ordering, and Log reply action.
4. Show `.agents/skills/skill-design/SKILL.md`.
5. Explain in one sentence: Codex discovers repository skills from `.agents/skills`.
6. Scan only the `skill-design` headings: portable core, Codex metadata, activation, process, hard rules.

Do not explain each rule. The next lesson uses the skill.

## Output, 3:35 to 4:35

Show:

- Three green tests.
- The running CRM.
- The one installed course skill.
- `git branch --list 'course/*'`.

Say: "We now have a known product baseline and a known workflow baseline."

## Activity

Learners run the four setup commands and confirm the same outputs.

Success criteria:

- CRM opens at `http://localhost:5173`.
- Three tests pass.
- TypeScript passes.
- `skill-design` is discoverable.

## Recap and bridge, 4:35 to 5:00

"The repository is ready. Next, we will use one skill to create another skill, then immediately run it against a real product idea."

## Companion materials

- `course/learner-guide/00-setup.md`
- `course/BRANCHES.md`
- `README.md`
