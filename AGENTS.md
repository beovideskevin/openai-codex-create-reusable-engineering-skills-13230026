# Red30 CRM course repository

## Mission

Use this CRM to teach intermediate software engineers how to turn recurring engineering work into predictable Codex skills. The product thread running through the course is Lead Scoring.

## Skill model

- Keep portable workflows in `.agents/skills/<skill-name>/SKILL.md`.
- Keep Codex UI metadata in each skill's `agents/openai.yaml`.
- Give every skill one job, explicit inputs, verifiable outputs, and clear stop conditions.
- Use `$skill-name` when showing explicit Codex invocation.
- Do not make an external connector mandatory for the core learner path.

## Course terminology

- Use `video` as the unit name in learner-facing and instructor-facing course content.
- Use `Video` in numbered headings and titles.

## Snapshot rules

- Every video has `course/NN-name-begin` and `course/NN-name-end` branches.
- A begin branch contains only the skills and artifacts needed to start that video.
- An end branch contains the output demonstrated in that video.
- Do not leak a later video's completed artifact into an earlier branch.
- Keep branch setup deterministic from a fresh clone.

## Coding standards

- Use strict TypeScript. Do not introduce `any`.
- Test behavior through public interfaces, not internal helpers.
- Treat `LeadRepo` as the data seam and keep adapters behind it.
- Prefer deep modules with small interfaces.
- Build vertical slices through domain, service, and UI.
- Use domain language from `CONTEXT.md`.
- Keep changes scoped to the active video and its declared output.

## Verification

```bash
npm test
npm run typecheck
npm run build
```

Run the production build for UI changes. Never report a video snapshot as complete without recording the commands that passed.
