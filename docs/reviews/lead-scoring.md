# Review: Lead Scoring

Review target: `course/05-build-begin...course/05-build-end`

Checks: tests pass, lint not configured, types pass, build pass.

Behavior: verified in the rendered app at `http://127.0.0.1:5173/` with a 1440 by 1000 viewport.

Meets the plan: yes.

Quality: pass.

## Acceptance review

- Met: activity weights and tier thresholds live in one exhaustive policy at `src/domain/scoring.ts:12`.
- Met: empty history returns 0 points and cold through the total scoring function at `src/domain/scoring.ts:20`.
- Met: list ordering uses score, recency, and name at `src/services/leadService.ts:22`.
- Met: list and detail use the same scored projection at `src/services/leadService.ts:14`.
- Met: every list row displays points and tier at `src/ui/LeadRow.tsx:30`.
- Met: detail displays the same points and tier at `src/ui/LeadDetail.tsx:29`.
- Met: logging a reply records activity and refreshes scored reads at `src/App.tsx:47`.
- Met: service tests verify existing history, tie-breaking, consistency, and reply updates at `src/services/leadService.test.ts:17`.

## Findings

None.

## Evidence

- `npm test`: 8 tests passed across 2 files.
- `npm run typecheck`: passed.
- `npm run build`: passed, 39 modules transformed.
- Rendered behavior: 28 leads displayed in score order with hot, warm, and cold badges.

## Do first

No corrective work is required for the accepted course scope. Measure list latency before using read-time scoring with production-scale history.
