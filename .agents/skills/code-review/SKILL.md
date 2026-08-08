---
name: code-review
description: >-
  Review a requested change against its plan and the project's standards, run available checks,
  and report evidence-backed findings without editing the change. Use only when the user asks to
  "review this", "check my changes", or decide "is this ready". Do not activate merely because a
  unit is finished. Not for producing the change (use the build skill) or duplicating automated
  style checks.
---

# Code Review

Run the change, prove it works, judge it against what it was meant to do, then write the documentation from what you actually saw.

## Inputs

- The plan the change implements: `docs/plans/<slug>.md`. Without it, a deliberate choice reads as a defect.
- The review target. If the working tree has relevant changes, include `git diff`, `git diff --cached`, and untracked files in scope. Otherwise discover the declared or remote default base branch and review the committed branch with `git diff <base>...HEAD`. Never assume the base is named `main`.

## Process

1. Freeze the review scope. For committed branch changes, use an isolated `git worktree` and remove the temporary worktree afterward. For uncommitted changes, inspect the current working tree read-only so the review includes them. Done when the target is complete, no user file was modified, and any temporary worktree is removed.
2. Read `AGENTS.md` and package scripts to identify required checks. Run the configured tests and type checker, the linter when one exists, and the production build when the change affects UI or build configuration or repository guidance requires it. Capture exit codes and record missing checks as `not configured`. Done when every applicable check has a recorded result. Any failed required check fails the review.
3. Exercise the change the way a user would. Done when the result is written down as verified, or as not run with a reason. Never describe behavior you did not observe.
4. Check the diff against the plan's acceptance conditions one by one. Done when every condition is marked met or unmet with a `file:line`.
5. Check the diff for the defects listed below. Done when each finding carries a severity and a `file:line`, because a name only suggests behavior and a line proves it.
6. Return the review to the user. Only when the user explicitly asks to persist review artifacts, write `docs/reviews/<slug>.md` and update `docs/features/<slug>.md` from the behavior verified in steps 2 and 3. Done when the response is complete and any authorized documentation describes only what you ran.

## What to flag

- Comments restating the line below them.
- Handling for errors that cannot occur, or a bare catch-all.
- A wrapper or base class serving exactly one implementation.
- Dead code and leftover debug output.
- Options no caller passes.
- Tests that still pass when you break the code in your head.
- Calls to APIs, flags, or methods that do not exist.
- A new entry point that skips the checks every other entry point performs.

Leave alone: short names in short scopes, defensive code on a genuinely critical path, thorough docs on a public interface, and anything the linter owns.

## Output

Return the review using this template. If persistence was explicitly requested, also write it to `docs/reviews/<slug>.md` and record verified behavior in `docs/features/<slug>.md`.

<review-template>
# Review: <slug>
Checks: tests <pass|fail|not-configured>, lint <pass|fail|not-configured>, types <pass|fail|not-configured>, build <pass|fail|not-applicable|not-configured>
Behavior: verified | not run (<reason>)
Meets the plan: yes | no
Quality: pass | fail

## Findings
- [high|medium|low] path/file.ext:LINE
  <what is wrong, and why it is wrong>

## Do first
1. <highest leverage fix>
</review-template>

## Hard rules

- A failing suite fails the review outright. Why: the verdict should rest on execution, not on reading.
- Cite a line for every claim about behavior. Why: one uncited guess costs the reader's trust in every other finding.
- The author's explanation never lowers a finding. Why: check the code, not the comment.
- Check the vendor's documentation before asserting how an external system behaves. Why: a review that invents a rate limit or a field name is worse than no review, because it gets acted on.
- Do not fix what you find. Why: a reviewer who edits stops being a second opinion.
- Do not write review or feature documentation unless the user explicitly asks for persisted artifacts. Why: a request for review authorizes analysis, not repository edits.
- Documentation records verified behavior only, never intended behavior. Why: documentation nobody ran is a rumor.
