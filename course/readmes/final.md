# How to Create Reusable Skills in Codex

This is the complete course branch. It contains the instructor package, learner guides, all ten reusable skills, and the finished Lead Scoring CRM.

## Start the course

```bash
git clone --branch course/00-setup-begin https://github.com/dswh/lil_codex_reusable_skills.git codex-reusable-skills-crm
cd codex-reusable-skills-crm
npm ci
```

Follow the videos from `course/00-setup-begin` through `course/06-review-end`. Every snapshot README tells you what to do and what output to expect at that stage.

## Course resources

- Branch map: `course/BRANCHES.md`
- Main learner guide: `course/learner-guide/Main.md`
- Copy-paste prompts: `course/prompts/`
- Recording scripts: `course-creator-output/03-lessons/`
- Complete end state: `course/END_STATE.md`
- Snapshot verification: `scripts/verify-course-branches.sh`

## Final verification

```bash
npm test
npm run typecheck
npm run build
```

The completed CRM should pass eight tests and display activity-based lead score and tier in both list and detail views.

