# Video 3 Begin: Research Risks and Specify the Solution

You are at the starting state for the technical research video. The requirement is accepted, but the architecture and risks are not.

## 1. What to do

1. Read `docs/requirements/lead-scoring.md`.
2. Scan the headings in `research-solution` and `module-design`.
3. Copy `course/prompts/03-research.md` and invoke `$research-solution`.
4. Trace the current app, service, repository seam, and tests.
5. Compare deriving scores from activity history with persisting a separate ledger.
6. Review the proposed contracts, rejected options, and mitigations.

## 2. What you should see

- Repository evidence before architectural conclusions.
- A pure scoring policy behind a small contract.
- One shared scored projection for list and detail.
- Explicit risks, rejected alternatives, and signals that would change the decision.
- `docs/solutions/lead-scoring.md`, with no delivery units or implementation code.

## Follow the video

1. Show why a complete PRD can still hide technical risk.
2. Explain evidence-backed research and module contracts as the solution.
3. Introduce `research-solution` and `module-design`.
4. Show their evidence, options, contracts, and risk headings.
5. Run the research prompt against the current repository.
6. Inspect the selected design, rejected options, and risk register.

Reference result: `course/03-research-end`.

