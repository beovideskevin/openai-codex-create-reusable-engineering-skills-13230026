---
name: skill-design
description: >-
  Author and audit portable agent skills with focused activation, concise workflows, and optional
  Codex metadata. Use when creating or editing a skill, reviewing skill quality, choosing a skill
  boundary, or making skills work across agent hosts. Triggers: "write a skill", "review this
  skill", "design the skills", "make this agent agnostic". Not for running another skill's
  workflow.
---

# Skill Design

Turn variable agent behavior into a focused, repeatable workflow that follows the open Agent Skills format and works especially well in Codex.

## Portable core

Every skill lives in a lowercase, hyphenated folder containing `SKILL.md`.

Keep `SKILL.md` portable:

- Put only `name` and `description` in YAML frontmatter.
- Match the folder name to `name`.
- Write the body as host-neutral instructions.
- Put reusable detail in `references/`, deterministic operations in `scripts/`, and output material in `assets/` only when needed.
- Refer to another workflow by its skill name. If Codex syntax helps the user, add `In Codex, invoke $skill-name`.

## Codex metadata

Add `agents/openai.yaml` for Codex-facing presentation and policy without coupling the portable workflow to Codex.

- Set `interface.display_name`, `interface.short_description`, and a one-sentence `interface.default_prompt` that explicitly names `$skill-name`.
- Set `policy.allow_implicit_invocation: false` when activation could commit, publish, merge, spend money, or otherwise surprise the user.
- Leave implicit invocation enabled for safe disciplines that provide judgment without expanding the user's requested actions.
- Declare required MCP tools only when the skill truly depends on them.

## Activation

Treat `description` as routing logic. State what the skill does, when it applies, representative trigger phrases, and the neighboring workflow it does not own. Front-load the core use case because hosts may shorten long descriptions.

## Process

1. Determine whether the user asked for an audit or a change. In audit mode, inspect and report findings without editing files. Continue to the remaining steps only in authoring mode or after the user explicitly asks to apply fixes.
2. Write three realistic requests the skill must handle, including one that should not activate it. Done when the boundary is observable.
3. Choose one focused user goal and split apart workflows with different inputs, side effects, or success criteria. Done when the skill has one job.
4. Write the smallest workflow that handles the scenarios. Use imperative steps with explicit inputs, outputs, stop conditions, and completion checks. Done when every step can be verified.
5. Add only the supporting resources the workflow repeatedly needs. Done when every bundled file is referenced by `SKILL.md` and no information is duplicated.
6. Add or refresh `agents/openai.yaml`. Done when its display text and default prompt match the skill.
7. Validate the folder and run the scenarios with a fresh agent. Done when activation and output quality both hold without leaked context.

## Hard rules

- Keep the body under 500 lines, and prefer much less. Move detailed reference material one level down rather than bloating the always-loaded workflow.
- Never use unsupported product-specific frontmatter. Product metadata belongs under `agents/`, where other hosts can ignore it safely.
- Never edit a skill during an audit-only request. Why: asking for findings authorizes analysis, not file changes.
- Never add a script when clear instructions and existing tools are reliable enough. Scripts create maintenance cost and should buy determinism.
- Never hide external writes or destructive actions behind implicit invocation. The user must choose workflows with meaningful side effects.
- Never ship an untested description. A skill that runs well but triggers at the wrong time is still broken.
