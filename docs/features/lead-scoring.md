# Lead Scoring

## Verified behavior

- The CRM queue displays 28 leads sorted by calculated score, with numeric points and a hot, warm, or cold tier in every row.
- Scores are derived from recorded activity: demo booked 50 points, email reply 25, pricing-page visit 10, logged call 5, and email open 1.
- A lead with no recorded activity receives 0 points and a cold tier.
- Equal scores are ordered by most recent activity, then lead name.
- Opening a lead shows the same score and tier as its queue row and reports the number of recorded activities used.
- Logging a reply updates the visible queue and open detail immediately. During browser verification, Nadia Khan changed from 75 points and hot with two activities to 100 points and hot with three activities; the new reply appeared at the top of the activity list.
- The former `?prototype=lead-scoring` URL now renders the production score-sorted CRM rather than a separate mocked preview.

## Evidence

- `npm test`: 8 tests passed across 2 test files.
- `npm run typecheck`: passed.
- `npm run build`: passed.
- Rendered verification: `http://localhost:5175/` and `http://localhost:5175/?prototype=lead-scoring`.
- Browser actions: selected Nadia Khan, verified `75 points · hot` and two activities, clicked `Log reply`, then verified `100 points · hot`, three activities, and the new reply at the top.
