---
name: prototype
description: >-
  Turn a feature idea into an isolated, runnable UI preview in an existing product without changing
  the default path. Use for requests to prototype, explore, or validate a feature hypothesis in the
  UI with local fake data. Trigger phrases include "preview this feature", "prototype this idea", and
  "put this behind a query parameter". Do not use for production feature implementation, persisted
  data, migrations, authentication, external integrations, or product-wide design work.
---

# Prototype

Create a disposable UI experiment that answers one feature question while leaving the product's
normal behavior intact.

## Inputs

- A feature idea and the single question the preview should answer.
- The existing application entry point, route or query-parameter conventions, and relevant UI
  components.
- A slug for the preview. Derive a lowercase, hyphenated slug from the feature idea when one is
  not provided.

## Workflow

1. Inspect the existing app entry point and the smallest relevant UI surface. Identify the default
   path and the narrowest query parameter or route that can select the preview without changing
   default behavior.
2. State the preview question, the files to touch, and the isolation boundary before editing. Stop
   and ask for clarification if the feature cannot be demonstrated without production persistence,
   authentication, a migration, an external service, or a change to the default path.
3. Implement the preview behind the chosen explicit selector, such as
   `?prototype=<slug>`. The default URL must render the existing product path exactly as before.
4. Use only deterministic local fake data in the preview. Keep it separate from production data
   adapters, repositories, services, and domain rules. Do not add API calls, environment secrets,
   analytics, persistence, migrations, authentication, or external services.
5. Mark every invented value as `unconfirmed` in the rendered UI. This includes scores, tiers,
   labels, thresholds, statuses, counts, dates, and other assumptions. Do not present fake values
   as accepted product facts.
6. Make the preview runnable through the repository's normal development command and keep its
   controls and layout within the existing UI conventions. Do not add production feature logic to
   support the experiment.
7. Write `docs/prototypes/<slug>.md`. Record the feature question, selector URL, files changed,
   local fake-data assumptions, every invented value and its `unconfirmed` status, what the
   preview demonstrates, what it does not demonstrate, and the decision or next experiment needed.
8. Run the repository typecheck and production build. Run focused tests when the touched behavior
   has an existing test surface. Fix failures caused by the preview before completion.
9. Inspect the final diff. Confirm that the default path is unchanged, all preview data is local,
   every invented value is labeled `unconfirmed`, and no forbidden production infrastructure was
   added. Do not commit changes.

## Outputs

- An isolated, runnable UI preview selected only by its explicit prototype selector.
- The unchanged default product path.
- `docs/prototypes/<slug>.md` containing the complete assumption record.
- Passing typecheck and production-build results, plus focused test results when applicable.

## Completion checks

- Open the default URL and the prototype URL; verify that only the latter activates the preview.
- Verify every invented value visible in the preview has an adjacent or directly associated
  `unconfirmed` label.
- Verify the prototype does not read or write production persistence and makes no external calls.
- Verify `docs/prototypes/<slug>.md` exists and covers every assumption.
- Run `npm run typecheck` and `npm run build`, or the repository-equivalent commands when the
  project documents different commands.

## Non-goals and stop conditions

Do not merge the preview into the default product path, promote fake data into domain behavior, or
silently add production persistence, migrations, authentication, or external services. Stop and
report the blocker if the requested question requires any of those boundaries or if the existing
application cannot expose an isolated selector without a broader routing change.

In Codex, invoke `$prototype` explicitly for this workflow.
