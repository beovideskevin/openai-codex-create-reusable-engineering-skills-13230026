#!/usr/bin/env bash
set -euo pipefail

branches=(
  course/00-setup-begin
  course/00-setup-end
  course/01-design-begin
  course/01-design-end
  course/02-prd-begin
  course/02-prd-end
  course/03-research-begin
  course/03-research-end
  course/04-slice-begin
  course/04-slice-end
  course/05-build-begin
  course/05-build-end
  course/06-review-begin
  course/06-review-end
  course/final
)

legacy_brand='re''lay'
legacy_course_unit='lec''ture'

for branch in "${branches[@]}"; do
  git show-ref --verify --quiet "refs/heads/$branch" || {
    echo "missing branch: $branch" >&2
    exit 1
  }

  if git ls-tree -r --name-only "$branch" -- .claude CLAUDE.md | grep -q .; then
    echo "agent-specific legacy files remain in snapshot: $branch" >&2
    exit 1
  fi

  if git grep -I -i -n "$legacy_brand" "$branch" -- >/dev/null 2>&1; then
    echo "legacy CRM branding remains in snapshot: $branch" >&2
    git grep -I -i -n "$legacy_brand" "$branch" -- >&2
    exit 1
  fi

  if git grep -I -i -n "$legacy_course_unit" "$branch" -- >/dev/null 2>&1; then
    echo "deprecated course terminology remains in snapshot: $branch" >&2
    git grep -I -i -n "$legacy_course_unit" "$branch" -- >&2
    exit 1
  fi
done

readme_expectations=(
  'course/00-setup-begin|# Video 0 Begin: Set Up the CRM|## Follow the video'
  'course/00-setup-end|# Video 0 End: Verified CRM Baseline|## 2. What to inspect'
  'course/01-design-begin|# Video 1 Begin: Design Predictable Skills|## Follow the video'
  'course/01-design-end|# Video 1 End: Prototype Skill and Preview|## 2. What to inspect'
  'course/02-prd-begin|# Video 2 Begin: Clarify Requirements and Write the PRD|## Follow the video'
  'course/02-prd-end|# Video 2 End: Accepted Lead Scoring Requirement|## 2. What to inspect'
  'course/03-research-begin|# Video 3 Begin: Research Risks and Specify the Solution|## Follow the video'
  'course/03-research-end|# Video 3 End: Evidence-Backed Technical Solution|## 2. What to inspect'
  'course/04-slice-begin|# Video 4 Begin: Decompose Work into Vertical Slices|## Follow the video'
  'course/04-slice-end|# Video 4 End: Testable Vertical Delivery Plan|## 2. What to inspect'
  'course/05-build-begin|# Video 5 Begin: Build Through Tight Feedback Loops|## Follow the video'
  'course/05-build-end|# Video 5 End: Working Lead Scoring Feature|## 2. What to inspect'
  'course/06-review-begin|# Video 6 Begin: Review and Document the Result|## Follow the video'
  'course/06-review-end|# Video 6 End: Reviewed and Documented Feature|## 2. What to inspect'
  'course/final|# How to Create Reusable Skills in Codex|## Start the course'
)

readme_hashes=()
for expectation in "${readme_expectations[@]}"; do
  IFS='|' read -r branch title required_section <<< "$expectation"
  readme=$(git show "$branch:README.md")

  grep -Fq "$title" <<< "$readme" || {
    echo "unexpected README title in $branch" >&2
    exit 1
  }

  grep -Fq "$required_section" <<< "$readme" || {
    echo "missing README guidance in $branch: $required_section" >&2
    exit 1
  }

  readme_hashes+=("$(git hash-object --stdin <<< "$readme")")
done

unique_readmes=$(printf '%s\n' "${readme_hashes[@]}" | sort -u | wc -l | tr -d ' ')
if [[ "$unique_readmes" -ne "${#readme_expectations[@]}" ]]; then
  echo "snapshot READMEs are not unique: unique=$unique_readmes expected=${#readme_expectations[@]}" >&2
  exit 1
fi

skill_counts=(
  'course/00-setup-begin 1'
  'course/00-setup-end 1'
  'course/01-design-begin 1'
  'course/01-design-end 2'
  'course/02-prd-begin 4'
  'course/02-prd-end 4'
  'course/03-research-begin 6'
  'course/03-research-end 6'
  'course/04-slice-begin 8'
  'course/04-slice-end 8'
  'course/05-build-begin 9'
  'course/05-build-end 9'
  'course/06-review-begin 10'
  'course/06-review-end 10'
  'course/final 10'
)

for item in "${skill_counts[@]}"; do
  read -r branch expected <<< "$item"
  actual=$(git ls-tree -r --name-only "$branch" -- .agents/skills | grep -c '/SKILL.md$' || true)
  metadata=$(git ls-tree -r --name-only "$branch" -- .agents/skills | grep -c '/agents/openai.yaml$' || true)
  if [[ "$actual" -ne "$expected" || "$metadata" -ne "$expected" ]]; then
    echo "unexpected skill package count in $branch: skills=$actual metadata=$metadata expected=$expected" >&2
    exit 1
  fi
done

checks=(
  'course/00-setup-begin:.agents/skills/skill-design/SKILL.md'
  'course/00-setup-begin:course/learner-guide/Main.md'
  'course/00-setup-begin:course/learner-guide/00-setup.md'
  'course/00-setup-end:.agents/skills/skill-design/agents/openai.yaml'
  'course/01-design-begin:.agents/skills/skill-design/SKILL.md'
  'course/01-design-begin:course/learner-guide/01-design.md'
  'course/01-design-begin:course/prompts/01-design.md'
  'course/01-design-end:.agents/skills/prototype/SKILL.md'
  'course/02-prd-begin:BRIEF.md'
  'course/02-prd-begin:.agents/skills/qna/SKILL.md'
  'course/02-prd-begin:.agents/skills/prd/SKILL.md'
  'course/02-prd-begin:course/learner-guide/02-prd.md'
  'course/02-prd-begin:course/prompts/02-prd.md'
  'course/02-prd-begin:course/recording/02-prd-answer-key.md'
  'course/02-prd-end:docs/requirements/lead-scoring.md'
  'course/03-research-begin:.agents/skills/research-solution/SKILL.md'
  'course/03-research-begin:.agents/skills/module-design/SKILL.md'
  'course/03-research-begin:course/learner-guide/03-research.md'
  'course/03-research-begin:course/prompts/03-research.md'
  'course/03-research-end:docs/solutions/lead-scoring.md'
  'course/04-slice-begin:.agents/skills/slice-work/SKILL.md'
  'course/04-slice-begin:.agents/skills/to-issues/SKILL.md'
  'course/04-slice-begin:course/learner-guide/04-slice.md'
  'course/04-slice-begin:course/prompts/04-slice.md'
  'course/04-slice-end:docs/plans/lead-scoring.md'
  'course/05-build-begin:.agents/skills/build/SKILL.md'
  'course/05-build-begin:course/learner-guide/05-build.md'
  'course/05-build-begin:course/prompts/05-build.md'
  'course/05-build-end:src/domain/scoring.ts'
  'course/06-review-begin:.agents/skills/code-review/SKILL.md'
  'course/06-review-begin:course/learner-guide/06-review.md'
  'course/06-review-begin:course/prompts/06-review.md'
  'course/06-review-end:docs/reviews/lead-scoring.md'
  'course/06-review-end:docs/features/lead-scoring.md'
  'course/final:course/COURSE_DESIGN.md'
  'course/final:course/readmes/06-review-begin.md'
  'course/final:course/readmes/final.md'
  'course/final:course/learner-guide/Main.md'
  'course/final:course-creator-output/03-lessons/module-1/lesson-6-review-and-document.md'
)

for check in "${checks[@]}"; do
  git cat-file -e "$check" || {
    echo "missing snapshot artifact: $check" >&2
    exit 1
  }
done

absences=(
  'course/01-design-begin:.agents/skills/prototype/SKILL.md'
  'course/02-prd-begin:docs/requirements/lead-scoring.md'
  'course/03-research-begin:docs/solutions/lead-scoring.md'
  'course/04-slice-begin:docs/plans/lead-scoring.md'
  'course/05-build-begin:src/domain/scoring.ts'
  'course/06-review-begin:docs/reviews/lead-scoring.md'
  'course/06-review-begin:docs/features/lead-scoring.md'
)

for absence in "${absences[@]}"; do
  if git cat-file -e "$absence" 2>/dev/null; then
    echo "later artifact leaked into begin snapshot: $absence" >&2
    exit 1
  fi
done

for number in 00 01 02 03 04 05 06; do
  begin=$(git for-each-ref --format='%(refname:short)' "refs/heads/course/${number}-*-begin")
  end=$(git for-each-ref --format='%(refname:short)' "refs/heads/course/${number}-*-end")
  git merge-base --is-ancestor "$begin" "$end" || {
    echo "snapshot is not ordered: $begin -> $end" >&2
    exit 1
  }
done

transitions=(
  'course/00-setup-end course/01-design-begin'
  'course/01-design-end course/02-prd-begin'
  'course/02-prd-end course/03-research-begin'
  'course/03-research-end course/04-slice-begin'
  'course/04-slice-end course/05-build-begin'
  'course/05-build-end course/06-review-begin'
)

for transition in "${transitions[@]}"; do
  read -r previous next <<< "$transition"
  git merge-base --is-ancestor "$previous" "$next" || {
    echo "course transition is not ordered: $previous -> $next" >&2
    exit 1
  }
done

echo "verified ${#branches[@]} branches, ${#readme_expectations[@]} unique READMEs, ${#skill_counts[@]} skill sets, ${#checks[@]} artifacts, ${#absences[@]} clean starts, and ${#transitions[@]} transitions"
