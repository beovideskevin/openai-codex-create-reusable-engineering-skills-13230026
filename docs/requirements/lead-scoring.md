# Requirement: Lead Scoring

## Problem

Sales reps cannot tell which lead is most worth contacting. The CRM sorts by recent activity, so a low-intent action can outrank a lead who replied or booked a demo.

## Solution

Give every lead a points score and a hot, warm, or cold tier based on activity history. Sort the list by score so the best next conversation is visible immediately.

## Entry and access

Lead Scoring is available in the existing signed-in leads list. It introduces no new role, permission, sign-in flow, or navigation entry.

## Scoring rules

Every recorded activity contributes points:

| Activity | Points |
| --- | ---: |
| Demo booked | 50 |
| Email reply | 25 |
| Pricing-page visit | 10 |
| Call logged | 5 |
| Email open | 1 |

Every occurrence counts. A lead with no activity has 0 points.

Tiers are derived from the total:

- Hot: 50 points or more.
- Warm: 20 to 49 points.
- Cold: fewer than 20 points.

## User stories

1. As a sales rep, I want leads sorted by buying intent so I know who to contact first.
2. As a sales rep, I want to see a lead's points and tier in the list so I can scan the queue quickly.
3. As a sales rep, I want the same priority in the detail panel so I keep context after opening a lead.
4. As a sales rep, I want a newly recorded reply to update priority immediately so the queue reflects the latest intent.

## Acceptance criteria

- [ ] The score equals the sum of points for every activity in the lead's history.
- [ ] A lead with 50 or more points is hot, 20 to 49 is warm, and fewer than 20 is cold.
- [ ] The leads list sorts by score descending, then last activity descending, then name ascending.
- [ ] The list shows the numeric score and tier for every lead.
- [ ] The detail panel shows the same score and tier as the list.
- [ ] Recording an email reply adds 25 points and immediately reorders the list when needed.
- [ ] Existing activity history contributes on first load without a manual backfill step.
- [ ] A lead with no activity displays 0 points and a cold tier.

## Out of scope

- Score decay over time.
- Manual tier overrides.
- User-configurable weights or thresholds.
- Persisting a separate score or score-event ledger.
- A background backfill job.
- New authentication or permissions.

## Open questions

None.
