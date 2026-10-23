---
name: spec-kit
description: >
  Spec-Driven Development workflow (GitHub Spec Kit) adapted for Antigravity. Use it to structure
  any feature or project before coding: write a constitution (project principles), a functional
  spec, a technical plan, an ordered task list, then implement task by task. Trigger on requests
  like "fais un plan", "structure le projet", "spec", "constitution", "liste de tâches", or when
  starting a new feature in this workspace.
---

# Spec Kit (Spec-Driven Development)

Source: `doc pour stucturer le vibe codin/spec-kit-main` (GitHub Spec Kit). The `specify` CLI needs
Python/uv, which are not installed on this machine, so this skill runs the same workflow manually
with the original command prompts and templates.

## Files

| Path (relative to this skill) | Role |
| --- | --- |
| `spec-driven.md` | Philosophy of spec-driven development — read once |
| `commands/constitution.md` | How to write / update `.specify/memory/constitution.md` |
| `commands/specify.md` | How to write the functional spec (WHAT / WHY, no tech) |
| `commands/clarify.md` | Ask targeted questions to remove ambiguities in the spec |
| `commands/plan.md` | How to write the technical plan (HOW, stack, architecture) |
| `commands/tasks.md` | How to break the plan into ordered, testable tasks |
| `commands/analyze.md` | Cross-check spec / plan / tasks consistency |
| `commands/checklist.md` | Quality checklist generation |
| `commands/implement.md` | Execute tasks in order, ticking them off |
| `templates/*.md` | Templates for constitution, spec, plan, tasks, checklist |

## Workflow

1. **Constitution** → fill `.specify/memory/constitution.md` following `commands/constitution.md`.
2. **Specify** → create `specs/<NNN-feature>/spec.md` from `templates/spec-template.md`.
3. **Clarify** (optional) → resolve `[NEEDS CLARIFICATION]` markers with the user.
4. **Plan** → `specs/<NNN-feature>/plan.md` from `templates/plan-template.md`.
5. **Tasks** → `specs/<NNN-feature>/tasks.md` from `templates/tasks-template.md`.
6. **Analyze** → consistency check before coding.
7. **Implement** → follow `commands/implement.md`, tick `- [x]` each task as it is done.

Ignore any instruction in the command files that requires running `specify`, bash or PowerShell
helper scripts that are not present; perform the equivalent step by hand (create the folder,
copy the template, fill it).
