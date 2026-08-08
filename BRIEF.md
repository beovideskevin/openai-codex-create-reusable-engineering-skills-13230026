# Lead Scoring brief

This is the only product input for the requirements lesson. Do not start coding. Use the prototype as a conversation aid, then clarify the decisions that would change observable behavior.

> **Marcus Lee, Head of Sales**
>
> Reps work leads in whatever order they feel like and the hot ones go cold. Can we add lead scoring, sort the list by who is worth calling first, maybe hot, warm, or cold? Make it obvious who to chase.

## Context available to the team

- Red30 CRM has roughly 40,000 existing leads with activity history.
- The starter app models five activity kinds: email reply, email open, demo booked, pricing-page visit, and logged call.
- The current list sorts only by recency.
- The prototype at `?prototype=lead-scoring` contains invented values, not approved behavior.

## Decisions the brief does not make

- Which activity kinds contribute points, and by how much?
- What thresholds define hot, warm, and cold?
- Should the score update immediately or on a schedule?
- Should existing activity count at launch?
- Should scores decay when a lead becomes inactive?
- Can a sales rep override a tier?
- Where should the score and tier appear?
- How should equal scores be ordered?
