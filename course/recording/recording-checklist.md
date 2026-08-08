# Recording checklist

## Before the course

- [ ] Create the new GitHub repository.
- [ ] Push only the `course/*` snapshot branches.
- [ ] Set the learner-facing default branch.
- [ ] Mirror `course/learner-guide/` into the Google document tabs.
- [ ] Confirm Codex discovers repository skills.
- [ ] Increase editor and terminal font sizes for recording.
- [ ] Hide notifications and unrelated browser tabs.

## Before each video

- [ ] Start from the matching `begin` branch in a fresh worktree or clone.
- [ ] Run `npm ci` when the worktree has no dependencies.
- [ ] Run baseline tests.
- [ ] Open the learner guide tab beside the recording window.
- [ ] Copy the prepared prompt.
- [ ] Open only the files needed to show the skill headings and output.
- [ ] Record the complete agent run before editing when a lesson has multiple turns or unit invocations.
- [ ] Use jump cuts to remove response and command latency, while preserving every decision and unit boundary.
- [ ] Set a five-minute timer.

## Five-minute pacing

- 0:00 to 0:30: problem and use case.
- 0:30 to 0:50: solution in one or two lines.
- 0:50 to 1:25: skill purpose and high-level headings.
- 1:25 to 3:35: run the skill and narrate only the decision points.
- 3:35 to 4:35: show the generated output or working feature.
- 4:35 to 5:00: recap, learner action, and bridge.

## After each video

- [ ] Compare the result with the matching `end` branch.
- [ ] Record the output artifact in the edit notes.
- [ ] Confirm no files from a later video appeared.
- [ ] Capture a clean end-state frame for the thumbnail or transition.
