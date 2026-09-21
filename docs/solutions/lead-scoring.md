# Solution: Lead Scoring

Source: [docs/requirements/lead-scoring.md](../requirements/lead-scoring.md)

## Current path

The application boots an in-memory `LeadRepo` from seed data. `App` creates a `LeadService`, asks it for the lead list, and passes the returned leads to `LeadList`. Selecting a row causes `App` to ask the service for the selected lead and its activities, then passes both to `LeadDetail`. Logging a reply calls `LeadService.logReply`, which records an activity through `LeadRepo`, bumps `lastActivityAt`, and causes `App` to reread the list.

Today `LeadService.listLeads` sorts only by `lastActivityAt` and name. `LeadService.getActivities` reads activity history for detail. `LeadRepo` owns leads and activities, and the existing service tests drive behavior through that interface. The prototype instead supplies deterministic fabricated scores from a prototype-only module, sorts in `App`, and passes optional prototype data into list and detail components.

## Evidence

- Observed: `npm test` passed 3 tests in 1 test file. Existing tests verify recency ordering, name tie-breaking, and reply recording through `LeadRepo` and `LeadService`.
- Observed: `npm run typecheck` passed with no TypeScript errors.
- Observed: `npm run build` passed and produced a Vite production bundle.
- Observed: `LeadRepo` exposes `getLeads`, `getLead`, `getActivities`, and `recordActivity`; activities are the existing durable behavioral input for lead priority.
- Observed: `LeadService.listLeads` currently owns list ordering, while `LeadDetail` receives activity history separately from `App`.
- Observed: the prototype score module fabricates values from lead IDs and selected records rather than calculating from activity history.
- Observed: the accepted requirement explicitly excludes persisting a separate score or score-event ledger, requires existing history at first load, immediate updates, score/recency/name ordering, and no manual tier override.
- Observed: the repository uses strict TypeScript, keeps `LeadRepo` as the data seam, and tests public interfaces rather than internal helpers.

## Decisions

### Score source

- Chosen: derive the score from the complete activity history whenever the service produces lead priority.
- Rejected: persist a separate score ledger or score-event ledger.
- Because: activity history is already the source of truth, every occurrence is available through `LeadRepo`, immediate updates require no synchronization path, historical activity works on first load, and the requirement explicitly excludes a separate ledger. A ledger would introduce duplicate state, replay/backfill rules, correction semantics, and drift risk.

### Score ownership

- Chosen: place scoring policy behind a domain-facing Lead Scoring Module and have `LeadService` own composition, sorting, and presentation-shaped results.
- Rejected: calculate points in `App`, `LeadList`, `LeadDetail`, or formatting helpers.
- Because: list and detail need one calculation and one tier policy. Keeping UI callers unaware of activity weights makes the rule testable through the service contract and prevents the two views from diverging.

### List/detail consistency

- Chosen: have `LeadService` calculate priority from the same activity snapshot used for each returned list item or detail result, and expose the priority as part of both public result shapes.
- Rejected: let `App` calculate list scores while `LeadDetail` calculates its own score from activities.
- Because: one service boundary owns the score, tier, and explanation; both views consume the same result rather than independently interpreting activities.

### Update timing

- Chosen: derive priority on each service read after an activity write.
- Rejected: scheduled recalculation, asynchronous refresh, or a separately invalidated cache.
- Because: the existing write path already rereads after `recordActivity`; read-time derivation reflects the new activity immediately and avoids stale cache invalidation behavior.

### Ordering

- Chosen: sort by score descending, then `lastActivityAt` descending, then lead name ascending.
- Rejected: retain recency-first ordering, use tier-only ordering, or leave equal-score order unspecified.
- Because: the accepted requirement makes score the primary signal, recency is the confirmed tie-breaker, and name gives deterministic output when both values match.

### Prototype retirement

- Chosen: use the prototype as evidence only, then remove its query-selected path, fabricated scoring module, prototype-only component props, and prototype banner once production scoring is accepted. Retain the prototype note as historical design evidence.
- Rejected: keep `?prototype=lead-scoring` as a second scoring implementation or allow mocked values to coexist with production values.
- Because: a permanent parallel path would preserve unconfirmed behavior and create two sources of truth. Retirement must leave the default CRM as the only product path for Lead Scoring.

## Module contracts

The following contracts are intentionally small and are the test surfaces for the changed behavior. Implementations remain unspecified.

### Lead Scoring Module

**Interface**

`scoreActivities(activities: readonly Activity[]): LeadPriority`

`LeadPriority` contains:

- `points: number`
- `tier: 'hot' | 'warm' | 'cold'`
- `contributingActivities: readonly Activity[]`

**Invariants**

- Every activity occurrence contributes exactly its confirmed weight: demo booked 50, email reply 25, pricing-page visit 10, logged call 5, and email open 1.
- An empty activity collection produces 0 points and a cold tier.
- A total of 50 or more is hot; 20 through 49 is warm; below 20 is cold.
- The module does not mutate activity input, persist a score, apply decay, or accept a manual tier override.
- `contributingActivities` represents the complete input used for the score, in a stable order suitable for the detail explanation.

### LeadService Module

**Interface changes**

`listLeads(): readonly LeadListItem[]`

`getLead(id: string): LeadDetail | undefined`

`getActivities(leadId: string): readonly Activity[]`

`logReply(leadId: string): Activity`

`LeadListItem` contains the existing lead display fields plus `priority: LeadPriority`.

`LeadDetail` contains the existing lead fields, its activity history, and the same `priority: LeadPriority` exposed to the list.

**Invariants**

- `listLeads` orders items by priority points descending, `lastActivityAt` descending, then name ascending.
- `getLead(id)` and the matching item from `listLeads()` expose equal priority for the same activity history.
- `priority.contributingActivities` is derived from the lead's recorded activities, not fabricated preview data.
- After `logReply`, a subsequent list or detail read includes the new email-reply points immediately.
- Existing activity history is included on the first read; no manual backfill step is required.
- The service does not expose persistence, migration, authentication, or tier-override operations.

### LeadRepo Module

**Interface impact**

Retain the existing `getLeads`, `getLead`, `getActivities`, and `recordActivity` responsibilities. Do not add score or ledger methods to the repository contract.

**Invariants**

- The repository remains the source of lead and activity facts, not derived priority state.
- `recordActivity` appends the activity and updates the lead's last-activity timestamp as it does today.
- Repository callers cannot observe or mutate a separately stored score.

### UI consumption boundary

The list and detail UI receive priority-shaped results from `LeadService`; they do not import scoring weights, calculate tiers, or read the prototype module. Their contract is to render the supplied numeric score, tier, and contributing-activity explanation consistently.

## Risks

| Risk                                                                                                                                | Likelihood | Impact | Detection                                                                                                                    | Mitigation                                                                                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------ | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Deriving every lead score requires one activity-history read per lead and becomes slow at the stated scale of roughly 40,000 leads. | Medium     | High   | Measure list response time and repository read count with a representative dataset before release.                           | Keep scoring policy independent of storage; if evidence shows the read pattern is unacceptable, introduce a repository-level history aggregation read without introducing a persisted score ledger. |
| List and detail calculate from different activity snapshots and show different priorities.                                          | Medium     | High   | Service contract test compares list and detail priority for the same lead before and after a new activity.                   | Make `LeadService` the only composition boundary for `LeadPriority`; UI receives, rather than derives, priority.                                                                                    |
| Weight or threshold drift changes tiers silently.                                                                                   | Medium     | High   | Table-driven scoring tests cover every activity kind, boundary totals 0, 19, 20, 49, and 50, and repeated activities.        | Keep weights and threshold invariants in the Lead Scoring Module contract and test through its public interface.                                                                                    |
| A new activity updates recency but not the displayed score or ordering.                                                             | Medium     | High   | Exercise `logReply`, reread the list, and assert both points and ordering.                                                   | Derive priority on read after repository mutation and preserve the existing refresh path.                                                                                                           |
| Prototype-only fabricated values remain reachable after production scoring ships.                                                   | Medium     | Medium | Search for the prototype selector/module and open both the default URL and former prototype URL during release verification. | Remove the selector, fabricated module, and optional UI props together; retain only the historical prototype document.                                                                              |
| A lead with no activities receives an invalid or missing tier.                                                                      | Low        | Medium | Service test uses an empty activity history and checks for 0 points and cold.                                                | Make the empty-history invariant explicit in the scoring contract.                                                                                                                                  |
| UI labels imply scores are confirmed while prototype labels or copy remain.                                                         | Medium     | Medium | Render review checks the production list and detail for absence of mocked/unconfirmed copy.                                  | Retire prototype banner and labels with the prototype path; production UI renders only calculated priority.                                                                                         |

## Requirement impact

No requirement amendment is proposed. The selected design directly supports the accepted weights, thresholds, existing-history behavior, immediate updates, score/recency/name ordering, list/detail visibility, no decay, no manual overrides, no ledger, and no new access path.

The solution does make one operational constraint explicit: deriving scores from history may require measurement at the stated lead volume. If that measurement fails, the repository read contract may need an aggregation capability, but the product requirement and no-ledger decision remain unchanged.

## Open questions

None. The solution has no unresolved design decision that would change its stated contracts.
