# Video 0: Set Up the CRM

## Problem

Agent workflows are difficult to learn when the repository, dependencies, or starting state is uncertain. This lesson gives everyone the same verified baseline.

## Solution

Clone one snapshot branch, install the locked dependencies, run the checks, and open the CRM before touching any skill.

## Start branch

`course/00-setup-begin`

## Steps

```bash
git clone --branch course/00-setup-begin https://github.com/dswh/lil_codex_reusable_skills.git codex-reusable-skills-crm
cd codex-reusable-skills-crm
npm ci
npm test
npm run typecheck
npm run dev
```

Open `http://localhost:5173`.

Then inspect:

```bash
find .agents/skills -maxdepth 2 -name SKILL.md
```

You should see the first repository skill, `skill-design`.

## Expected output

- The Red30 CRM leads list loads.
- Three baseline service tests pass.
- TypeScript passes.
- `.agents/skills/skill-design/SKILL.md` exists.

## Why this matters

Codex scans `.agents/skills/` for repository-scoped skills. The snapshot branches make every demonstration reproducible from the same input.

## Resources

- `README.md`
- `AGENTS.md`
- [Skills in ChatGPT and Codex](https://help.openai.com/en/articles/20001066)

## Reference end branch

`course/00-setup-end`

## Continue

This video makes no repository changes. Continue directly:

```bash
git switch course/01-design-begin
```
