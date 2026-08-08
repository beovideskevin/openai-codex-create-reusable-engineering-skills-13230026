# Video 6: Review Results and Update Documentation

## Problem

A green build proves execution, but it does not prove the change matches the plan or that documentation describes observed behavior.

## Solution

Use `code-review` to run required checks, exercise the app, map acceptance criteria to evidence, and persist a review plus feature documentation.

## Start branch

`course/06-review-begin`

## Skill

### `code-review`

Freezes the review scope, runs repository checks, exercises user behavior, cites every finding, and keeps review separate from implementation. It writes documentation only when explicitly requested.

## Steps

1. Read the plan and review skill headings.
2. Copy `course/prompts/06-review.md` and invoke `$code-review`.
3. Allow persisted review and feature documentation for this lesson.
4. Inspect the acceptance review before the verdict.
5. Confirm that feature docs contain only behavior the reviewer ran or tested.

## Expected output

- `docs/reviews/lead-scoring.md`
- `docs/features/lead-scoring.md`
- A pass verdict backed by 8 tests, typechecking, production build, and rendered behavior.

## Success check

Every acceptance claim cites code or execution evidence, and no implementation fix is mixed into the review.

## Reference end branch

`course/06-review-end`

## Save the completed workflow

```bash
git switch -c learner/06-review
git add -A
git commit -m "Complete video 6"
```

Your learner branches now preserve your version of every generated artifact. The `course/*-end` branches remain unchanged reference answers.
