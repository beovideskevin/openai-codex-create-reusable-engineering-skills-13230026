# Solution: Lead Scoring

Source: `docs/requirements/lead-scoring.md`

## Current path

`App` creates one in-memory `LeadRepo` and passes it to `createLeadService`. The service reads leads and activities through the repository seam. `listLeads` currently orders raw `Lead` records by `lastActivityAt`, while `logReply` records an `email_reply` activity and updates recency. The list and detail components receive service results and contain no scoring behavior.

## Evidence

- Observed: `npm test` passes three baseline service tests.
- Observed: `LeadRepo.getActivities(leadId)` exposes the complete activity history required by the scoring rules.
- Observed: `ActivityKind` is a closed TypeScript union containing every activity named in the requirement.
- Observed: the application has one in-memory adapter and no database, queue, scheduler, or external service.
- Observed: the list and detail UI both read through `leadService`, so one service projection can keep their score and tier consistent.
- Observed: the prototype uses fake values behind a query parameter and does not constrain the production data model.

## Decisions

- Chosen: derive a score from activity history with a pure function. Rejected: persist a separate score or score-event ledger. Because: derivation satisfies immediate updates and retroactive history without introducing duplicated state.
- Chosen: keep weights and thresholds in one scoring policy module. Rejected: scatter point values through service and UI code. Because: one policy prevents list and detail disagreement.
- Chosen: return scored lead projections from `leadService`. Rejected: add score methods to `LeadRepo`. Because: score is application behavior, while the repository owns leads and activities.
- Chosen: compute on each service read in the course app. Rejected: cache or schedule recomputation. Because: the in-memory dataset is small and the requirement defines no performance target.
- Chosen: sort by score, recency, then name in the service. Rejected: sort in the React component. Because: ordering is observable product behavior and should be testable without the UI.
- Chosen: replace the prototype data with real service output while preserving the same visual placement. Rejected: keep a separate production UI. Because: one component path avoids drift.

## Module contracts

```ts
export type LeadTier = 'hot' | 'warm' | 'cold'

export interface LeadScore {
  points: number
  tier: LeadTier
}

export function scoreActivities(activities: readonly Activity[]): LeadScore

export interface ScoredLead extends Lead, LeadScore {}
```

`scoreActivities` is total for every valid activity array. It returns `{ points: 0, tier: 'cold' }` for an empty array. `leadService.listLeads` and `leadService.getLead` return `ScoredLead` values produced through this one policy.

## Risks

| Risk | Likelihood | Impact | Detection | Mitigation |
| --- | --- | --- | --- | --- |
| List and detail calculate different values | Medium | High | Contract test compares both service outputs | Calculate only in the scoring policy and service projection |
| A new activity kind has no point value | Medium | Medium | TypeScript exhaustiveness fails | Type the weight map as `Record<ActivityKind, number>` |
| Repeated reads become slow with production-scale history | Medium | Medium | Measure list latency with representative data | Keep the policy pure so a future adapter can aggregate or materialize without changing callers |
| Equal scores produce unstable ordering | Medium | Medium | Deterministic ordering test | Tie-break by recency, then name |
| Prototype values leak into production | Low | High | Search for prototype imports in production paths | Remove the prototype scoring module during implementation |
| Reply activity updates recency but not visible priority | Low | High | Service test records a reply and checks points and order | Derive from repository activity on every read |

## Requirement impact

None. The solution preserves every accepted criterion. Performance at 40,000 leads remains a measured deployment concern because the requirement defines no latency target.

## Open questions

None.
