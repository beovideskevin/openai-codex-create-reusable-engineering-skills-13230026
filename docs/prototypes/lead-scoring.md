# Lead Scoring Prototype

## Question

Does a numeric score plus a hot, warm, or cold tier make the next lead to contact obvious?

## Preview

- URL: `/?prototype=lead-scoring`
- The default URL remains the existing recency-sorted CRM.
- The preview list is sorted descending by mocked score.
- Priority and score appear in both the list and selected-lead detail.

## Assumptions

All values in this preview are local fake data and are **unconfirmed**. They are not product
decisions or production scoring logic.

- Five representative lead records, names, companies, titles, and owners are mocked and
  **unconfirmed**.
- Scores `92`, `81`, `64`, `38`, and `17` are mocked and **unconfirmed**.
- The tiers `hot`, `warm`, and `cold` are mocked and **unconfirmed**.
- The mapping from score to tier is mocked and **unconfirmed**.
- The activity-based reasons shown in detail are mocked and **unconfirmed**.
- The ordering assumption that descending score indicates contact priority is mocked and
  **unconfirmed**.
- The question that a visible priority signal makes the next contact obvious is unconfirmed until
  tested with users.

## Isolation

The preview is selected only by `prototype=lead-scoring` and uses a static local data set in
`src/ui/LeadScoringPreview.tsx`. It does not read or write the production repository, add scoring
to domain types or services, persist data, run migrations, authenticate users, call external
services, or change the default CRM path.

## Decision

This preview is sufficient to evaluate the single prioritization question. The next experiment
should test whether sales users choose the highest-scored lead consistently and whether the labels
and thresholds are understandable. No production implementation should be inferred from this
prototype.
