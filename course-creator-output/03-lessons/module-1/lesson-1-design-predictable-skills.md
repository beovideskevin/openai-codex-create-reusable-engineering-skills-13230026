# Lesson Script: Design Skills for Predictable Agent Behavior

## Metadata

- Duration: 5 minutes.
- Content type: concept plus screencast.
- Learning objective: design and run a focused reusable skill.
- Materials: `course/01-design-begin`, Codex, running CRM.

## Hook, 0:00 to 0:30

"When we hear a feature idea, the tempting move is to start building production code. The problem is that every unanswered product decision quietly becomes an engineering decision."

Show the baseline CRM and say: "We want to see Lead Scoring before we decide how it works."

## Solution, 0:30 to 0:50

"We will create a prototype skill that makes an idea visible, keeps the default product intact, and writes down every assumption it fakes."

## Skill introduction, 0:50 to 1:25

Open `skill-design/SKILL.md` and show only:

- Portable core.
- Codex metadata.
- Activation.
- Process.
- Hard rules.

Say: "The important design choice is not more instructions. It is one job, a clear trigger, a verifiable output, and safe boundaries."

## Demo, 1:25 to 3:35

1. Paste the first prompt from `course/prompts/01-design.md`.
2. While Codex works, narrate the decisions:
   - Name is a short verb-led action.
   - Frontmatter contains only name and description.
   - Codex metadata lives separately.
   - Implicit invocation is disabled because the skill edits the app.
3. Run the validator.
4. Paste the second prompt to invoke `$prototype` for Lead Scoring.
5. Open the default URL and the prototype query URL side by side.

## Output, 3:35 to 4:35

Show:

- `.agents/skills/prototype/SKILL.md`
- `docs/prototypes/lead-scoring.md`
- Score and tier in the prototype list.
- The assumptions section with every mocked choice labeled unconfirmed.

Say: "The prototype answered one question: priority is easier to scan. It did not decide the scoring rules."

## Activity

Learners change one mocked score or label, reload the prototype, and add the assumption to the prototype document.

Success criteria: default behavior remains unchanged and the new assumption is explicit.

## Recap and bridge, 4:35 to 5:00

"A safe prototype creates better questions. Next, we will use those questions to write requirements that code and tests can actually prove."

## Companion materials

- `course/learner-guide/01-design.md`
- `course/prompts/01-design.md`
- `docs/prototypes/lead-scoring.md`
