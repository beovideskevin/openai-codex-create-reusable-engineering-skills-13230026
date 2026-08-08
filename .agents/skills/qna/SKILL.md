---
name: qna
description: >-
  Resolve ambiguity by asking one question at a time and writing each answer into the document at
  hand. Use when a request, requirement, or plan is unclear, when the user says "qna" or "ask me
  questions", or when you need a decision before writing a PRD, planning, or building. Triggers:
  "qna", "ask me", "this is ambiguous", "pin this down". Not for producing the document itself
  (use the prd, research-solution, or slice-work skill).
---

# QnA

Interview until nothing ambiguous is left. Produce no file of its own. Persist answers only when the surrounding task authorizes edits to a working document.

## Process

1. **Ask exactly one question.** Several at once produces shallow answers to all of them, because the person answers the easiest and skims the rest.
2. **Attach a recommended answer and a one-line reason.** Correcting a proposal is far faster than composing one from nothing.
3. **Read the codebase instead of asking** when the answer already lives there. A question spent on something you could look up buys nothing.
4. **Follow one branch to its end** before opening the next. A choice that hangs off an unresolved choice cannot be made yet.
5. **Name contradictions the moment they surface.** When two answers conflict, put both in front of the user and settle it before continuing.
6. **Persist only when authorized.** If the surrounding `prd`, `research-solution`, or `slice-work` workflow authorizes document edits, write each answer into that working document as it lands. Otherwise keep a clearly labeled decision log in the conversation and ask before writing files.
7. **Stop when no open question would change the artifact.** If a thread is still murky after two passes, record it as an open question and move on rather than circling.

## When there is nobody to ask

An unattended run has no one to answer, so waiting is not available and neither is deciding. When the surrounding task already authorizes artifact edits, write each open question under an "Open questions" heading with your recommended answer and its one-line reason. Without that authorization, return the questions and recommendations in the conversation and do not edit a file. In either case, say explicitly that the decisions remain unanswered. Why: a recommendation stated as a recommendation can be overturned in one line, while the same guess written into a requirement is indistinguishable from a confirmed decision.

## Hard rules

- One question per turn, never batched. Why: batching trades depth for speed, and the depth does not come back.
- Never settle something the user should settle. Recommend, then wait. Where a gap must be filled for the artifact to hold together, record it as an open question with your decision as the recommendation, never as a plain statement of fact. Why: an invented decision is indistinguishable from a confirmed one once it is written down, and a reader coming to the artifact cold cannot tell which is which.
- When persistence is authorized, write each answer into the working document as it lands, not at the end. When it is not, keep the decision log explicit in each response so compaction can preserve it without an unauthorized file edit.
