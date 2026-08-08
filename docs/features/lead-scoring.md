# Lead Scoring

Lead Scoring turns activity history into a visible buying-intent priority for every lead.

## Verified behavior

- Demo booked contributes 50 points.
- Email reply contributes 25 points.
- Pricing-page visit contributes 10 points.
- Logged call contributes 5 points.
- Email open contributes 1 point.
- Every activity occurrence counts.
- Hot begins at 50 points, warm begins at 20 points, and lower scores are cold.
- The lead queue sorts by score descending, last activity descending, then name ascending.
- The list and detail panel display the same score and tier.
- Logging an email reply updates the activity history, adds 25 points, and refreshes the queue immediately.
- Existing history is scored on first load. No separate backfill action is required in this application.

## Verification

```bash
npm test
npm run typecheck
npm run build
```

The completed snapshot passes 8 tests, strict TypeScript, and the production Vite build.
