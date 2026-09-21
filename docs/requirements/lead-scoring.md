# Lead Scoring

## Problem

Reps work leads in whatever order they feel like, so high-intent leads can go cold. The current lead list is ordered only by recency and does not make clear who is worth contacting first.

## Solution

Give each lead a numeric score based on its activity and a hot, warm, or cold tier so reps can identify the next lead to contact without opening every record. The score uses these confirmed activity weights:

- Demo booked: 40 points
- Email reply: 30 points
- Pricing-page visit: 20 points
- Logged call: 10 points
- Email open: 5 points

The score and tier are visible wherever a rep reviews lead priority, including the lead list and lead detail.

Tier thresholds are:

- Hot: 70 points or higher
- Warm: 30 through 69 points
- Cold: below 30 points

Scores and tiers update immediately after a new activity is recorded.

All existing recorded activity counts when lead scoring launches.

Scores do not decay when a lead has no new activity.

Sales reps cannot manually override a lead's automatically calculated tier.

When leads have equal scores, the lead with the most recent activity appears first.

## Entry and access

The existing CRM access path remains the entry point for lead work. Every user who can access the CRM can view lead scores and tiers; no separate permission is required.

## User stories

1. As a sales rep, I want leads ordered by their priority score, so that I know who to contact first.
2. As a sales rep, I want to see a lead's score and tier in the list, so that I can compare leads without opening each record.
3. As a sales rep, I want to see the score, tier, and contributing activity in lead detail, so that I can understand why a lead is prioritized.

## Acceptance criteria

- [ ] Each lead's score includes 40 points for every demo booked, 30 points for every email reply, 20 points for every pricing-page visit, 10 points for every logged call, and 5 points for every email open.
- [ ] All existing recorded activity is included when scoring launches.
- [ ] Scores and tiers update immediately after a new activity is recorded.
- [ ] A score of 70 or higher is hot, 30 through 69 is warm, and below 30 is cold.
- [ ] The lead list is ordered by the defined priority score rather than recency alone.
- [ ] The numeric score and hot, warm, or cold tier are visible in the lead list.
- [ ] The numeric score, tier, and the activities contributing to the score are visible in lead detail.
- [ ] A lead's displayed score reflects its recorded activities.
- [ ] Leads with equal scores are ordered by most recent activity.
- [ ] The tier is calculated from the score and cannot be manually overridden by a sales rep.
- [ ] Every user who can access the CRM can view the score and tier without a separate permission.

## Out of scope

- Score decay for inactive leads is not included.
- Changes to lead status, ownership, or other CRM behavior are not included.
- Storage, persistence, migrations, authentication, and implementation choices are not product requirements.

## Open questions

None. No unresolved question remains that would change the required behavior.
