# Lesson Script: Research Risks and Specify the Solution

## Metadata

- Duration: 5 minutes.
- Content type: screencast.
- Learning objective: evaluate technical alternatives and define stable contracts.
- Materials: `course/03-research-begin`, accepted requirement.

## Hook, 0:00 to 0:30

"A PRD can be complete while the architecture is still dangerous. Should a score be derived from activity or persisted separately? Where does sorting live? How do list and detail avoid disagreeing?"

## Solution, 0:30 to 0:50

"The research skill separates evidence from conclusions, compares alternatives, and uses module design to define the smallest contracts before code exists."

## Skill introduction, 0:50 to 1:25

Show the headings in `research-solution` and `module-design`.

Highlight:

- Current path.
- Evidence.
- Decisions and rejected options.
- Module contracts.
- Risk register.

Say: "We split this from slicing because architecture and delivery sequence are different jobs."

## Demo, 1:25 to 3:35

1. Paste `course/prompts/03-research.md`.
2. Show Codex tracing `App`, `leadService`, `LeadRepo`, and tests.
3. Pause on the derived score versus persisted ledger comparison.
4. Show the chosen contract:

   ```ts
   scoreActivities(activities): LeadScore
   ```

5. Point out that signatures are allowed, implementation is not.

## Output, 3:35 to 4:35

Open `docs/solutions/lead-scoring.md` and show:

- Evidence from the current repo.
- Selected and rejected options.
- Risk of read-time scoring at production scale.
- Mitigation that preserves the public contract.

Say: "The document makes uncertainty visible without turning it into code."

## Activity

Learners challenge one selected option and add the evidence that would change the decision.

Success criteria: the challenge names a measurable signal, not a preference.

## Recap and bridge, 4:35 to 5:00

"The shape is settled. Next, we will cut it into units that prove behavior one vertical slice at a time."

## Companion materials

- `course/learner-guide/03-research.md`
- `course/prompts/03-research.md`
- `docs/solutions/lead-scoring.md`
