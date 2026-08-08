# Prototype: Lead Scoring

Status: superseded by the production implementation. Switch to `course/01-design-end` to run the isolated mocked preview.

## Question

Can a score and tier make the next lead to contact obvious without opening every record?

## Open it

```bash
npm run dev
```

Open `http://localhost:5173/?prototype=lead-scoring`.

## Assumptions

- Unconfirmed: scores range from 0 to 100.
- Unconfirmed: tiers are hot, warm, and cold.
- Unconfirmed: the list sorts by score before recency.
- Unconfirmed: a short reason appears beside the score in the detail view.
- Unconfirmed: the score appears in both the list and lead detail.

## What the preview shows

- The default URL still shows the recency-based CRM.
- The prototype URL shows a priority score and tier for every lead.
- High-scoring leads move to the top of the list.
- Selecting a lead reveals a short explanation for the mocked score.

## Decisions for the PRD

- Which activities contribute points, and by how much?
- What thresholds define each tier?
- Is scoring computed from history or persisted separately?
- Should old activity count at launch?
- Should scores decay?
- Can a sales rep override a tier?
