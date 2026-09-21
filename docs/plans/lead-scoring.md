# Plan: Lead Scoring

Requirement: `docs/requirements/lead-scoring.md`
Solution: `docs/solutions/lead-scoring.md`
Branch: `feat/lead-scoring`

## Tracer bullet

A real activity history is converted into one lead priority, the service returns leads ordered by points, recency, and name, and the existing leads list renders the calculated points and tier. This path proves the core product promise without a ledger, fake values, or a detail-only placeholder.

## Unit 1: Scored leads in the priority list

- Builds: Calculate each lead's priority from every recorded activity, return scored lead projections from the service, sort them by points descending, last activity descending, then name ascending, and show points and tier for every lead in the existing list.
- Contracts: `scoreActivities(activities: readonly Activity[]): LeadScore`; `leadService.listLeads(): readonly ScoredLead[]`; `ScoredLead` contains the existing lead fields plus `points` and `tier`.
- Test first: Given leads with repeated activities, boundary totals of 0, 19, 20, 49, and 50, equal scores with different activity times, and equal scores with equal activity times, assert the service returns the correct points/tier and order. Include a lead with no activity and existing seeded activity without any backfill step.
- Acceptance: Opening the normal leads list shows real calculated points and hot/warm/cold tiers for every lead; the first row is the highest-scoring lead, and ties follow most recent activity then name.
- Blocked by: none
- Parallel-safe: no

## Unit 2: Consistent priority in lead detail

- Builds: Return the same scored lead projection from detail reads and render its points and tier in the detail panel alongside the lead's activity context.
- Contracts: `leadService.getLead(id: string): ScoredLead | undefined`; the detail result uses the same `LeadScore` fields as `listLeads` for the same activity history.
- Test first: Select a lead whose score includes multiple activity kinds and assert the list result and detail result have identical points and tier, including an empty-history lead as 0/cold.
- Acceptance: Selecting any lead shows the same numeric score and tier that appeared in its list row; no UI calculation or alternate value is visible.
- Blocked by: Unit 1
- Parallel-safe: no

## Unit 3: Immediate priority after a reply

- Builds: Preserve the existing reply-recording behavior while ensuring a newly recorded email reply adds 25 points and causes the next service read to reflect the new score and ordering immediately.
- Contracts: `leadService.logReply(leadId: string): Activity`; after the call, `listLeads()` and `getLead(id)` derive priority from the updated activity history.
- Test first: Record a reply for a lower-ranked lead, then assert its points increase by 25, its tier is recalculated if a threshold is crossed, and its position changes when the new score warrants it.
- Acceptance: After a rep logs a reply, the visible list updates in the same interaction to show the added points and any resulting reorder; no scheduled refresh or manual backfill is required.
- Blocked by: Unit 1
- Parallel-safe: no

## Unit 4: Retire the prototype path

- Builds: Replace prototype-only score data and optional UI plumbing with the real scored service output, remove the prototype selector and fabricated scoring module, and preserve the normal signed-in leads entry path.
- Contracts: The production list and detail consume `ScoredLead`; no production caller imports prototype scoring or accepts a prototype-only score contract.
- Test first: Render the normal entry path and verify it shows calculated activity-derived priority; verify the former prototype selector does not expose fabricated values or a second scoring behavior.
- Acceptance: The default leads experience is the only Lead Scoring path, contains no mocked/unconfirmed priority copy, and the historical prototype note remains documentation only.
- Blocked by: Units 1, 2, and 3
- Parallel-safe: no

## Requirement coverage

- Score equals the sum of every activity's points -> Unit 1
- Hot/warm/cold thresholds -> Unit 1
- Sort by score, then last activity, then name -> Unit 1
- List shows numeric score and tier -> Unit 1
- Detail shows the same score and tier -> Unit 2
- Email reply adds 25 points and immediately reorders when needed -> Unit 3
- Existing activity history contributes on first load -> Unit 1
- No-activity lead shows 0 points and cold -> Unit 1
- No score decay -> Units 1 and 3, because both derive from recorded history without time-based reduction
- No manual tier overrides -> Units 1 and 2, because neither contract exposes an override operation
- No configurable weights or thresholds -> Unit 1, because the scoring contract owns fixed policy values
- No separate score or score-event ledger -> Units 1 and 3, because both read activity history through the existing repository seam
- No background backfill job -> Unit 1, because existing history is scored on first read
- No new authentication or permissions -> Unit 4, because the existing access path is retained

## Open questions

None. The accepted requirement and solution specify the unit boundaries and contracts without unresolved technical choices.
