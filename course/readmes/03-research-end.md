# Video 3 End: Evidence-Backed Technical Solution

This branch contains the reference solution and risk register.

## 1. What this branch contains

1. Technical decisions grounded in the current CRM.
2. Small module contracts that leave implementation details open.

## 2. What to inspect

- `docs/solutions/lead-scoring.md`: current path, evidence, selected options, rejected options, contracts, and risks.
- The scoring contract: activities in, points and tier out.
- The service contract: list and detail use the same projection.
- The risk register: read-time scoring is acceptable here, but production scale must be measured.

No delivery sequence or production implementation should appear yet.

## Continue

Switch to `course/04-slice-begin` to turn the accepted solution into testable vertical units.

