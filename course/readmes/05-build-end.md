# Video 5 End: Working Lead Scoring Feature

This branch contains the completed product implementation before independent review.

## 1. What this branch contains

1. Real activity-based scoring through the CRM's public service path.
2. List, detail, and reply behavior implemented through tested vertical units.

## 2. What to inspect

- `src/domain/scoring.ts` and `src/domain/scoring.test.ts`.
- `src/services/leadService.ts` and its behavior tests.
- `src/ui/LeadList.tsx`, `LeadRow.tsx`, and `LeadDetail.tsx`.
- `docs/plans/lead-scoring.md`: all three units should be complete.
- The rendered CRM: highest priority first, consistent detail, immediate reply update.

## Verification

Run `npm test`, `npm run typecheck`, and `npm run build`. Eight tests should pass.

## Continue

Switch to `course/06-review-begin` for an evidence-based review of the product change.

