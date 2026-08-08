# Video 1 prompts

## Create the prototype skill

```text
Use $skill-design to create a repository skill named prototype under .agents/skills.

The skill should turn a feature idea into an isolated, runnable UI preview. It must keep the default product path unchanged, use local fake data only, label every invented value as unconfirmed, write docs/prototypes/<slug>.md, run typecheck and the production build, and avoid production persistence, migrations, authentication, or external services.

Add Codex metadata, disable implicit invocation, validate the skill, and do not commit.
```

## Run the prototype skill

```text
Use $prototype to preview Lead Scoring in this CRM.

The one question is whether a numeric score and hot, warm, or cold tier make the next lead to contact obvious. Keep the default CRM unchanged. Put the preview behind ?prototype=lead-scoring, use clearly mocked local values, sort the preview by mocked score, show priority in the list and detail, and record every assumption in docs/prototypes/lead-scoring.md. Do not add production scoring logic or commit.
```
