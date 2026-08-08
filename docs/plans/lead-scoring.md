# Plan: Lead Scoring

Requirement: `docs/requirements/lead-scoring.md`
Solution: `docs/solutions/lead-scoring.md`
Branch: `feat/lead-scoring`

## Tracer bullet

Read existing activity through `LeadRepo`, calculate a score and tier through one policy, return scored leads from `leadService`, sort the queue by score, and show the priority in the list.

## Unit 1: Prioritize the leads list

- Status: complete.
- Builds: every existing lead receives a real score and tier, and the list shows the highest score first.
- Contracts: `LeadTier`, `LeadScore`, `scoreActivities(activities)`, and `ScoredLead` from the accepted solution.
- Test first: given leads with different activity histories, `listLeads` returns their expected points and tiers in score order.
- Acceptance: the list displays the numeric score and tier for every lead, including 0 points and cold for no activity.
- Blocked by: none.
- Parallel-safe: no.

## Unit 2: Keep the detail view consistent

- Status: complete.
- Builds: opening a lead shows the same score and tier as its row.
- Contracts: `leadService.getLead(id): ScoredLead | undefined`.
- Test first: the same lead returned from `listLeads` and `getLead` has identical points and tier.
- Acceptance: list and detail show one policy result for the selected lead.
- Blocked by: Unit 1.
- Parallel-safe: no.

## Unit 3: React to a new reply

- Status: complete.
- Builds: logging an email reply adds 25 points and immediately reorders the visible queue when needed.
- Contracts: existing `leadService.logReply(leadId)` plus the scored read contracts from Units 1 and 2.
- Test first: after `logReply`, the target lead's score increases by 25 and its position reflects score, recency, and name tie-breakers.
- Acceptance: the list and open detail update without reload and display the new shared priority.
- Blocked by: Units 1 and 2.
- Parallel-safe: no.

## Requirement coverage

- Sum points for every activity occurrence -> Unit 1.
- Derive hot, warm, and cold tiers -> Unit 1.
- Sort by score, recency, and name -> Unit 1.
- Show score and tier in the list -> Unit 1.
- Show the same priority in detail -> Unit 2.
- Add 25 points and reorder after a reply -> Unit 3.
- Count existing history on first load -> Unit 1.
- Show 0 points and cold with no history -> Unit 1.

## Open questions

None.

## Verification

- `npm test`: 8 tests passed.
- `npm run typecheck`: passed.
- `npm run build`: passed.
