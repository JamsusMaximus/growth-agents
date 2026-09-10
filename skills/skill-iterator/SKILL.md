---
name: skill-iterator
description: |
  Create a new skill or improve an existing one with an eval loop: write test cases
  first, run the skill, grade the outputs with assertions, compare against the previous
  iteration as the baseline, generalise the rule rather than patching the case, and
  promote when a run is clean. Use when the user says "create a skill", "iterate on
  this skill", "improve the skill", "eval the skill", "grade the outputs", "compare
  skill versions", or is editing any SKILL.md and wants to know whether the edit helped.
license: CC-BY-NC-4.0
---

# skill-iterator

Workflow notes for improving a skill without guessing. The harness that runs the loop is Anthropic's `skill-creator` at [github.com/anthropics/skills](https://github.com/anthropics/skills) (Apache-2.0). It is **not vendored here**: install it from upstream, then drive it in this order.

## The loop

1. **Write the test cases before touching the skill.** Three to five realistic prompts the skill should handle, each with a short list of assertions ("output contains a coverage ledger", "no em dashes", "asks the mode question before analysing"). A skill with no test cases is an opinion.
2. **Run the skill on every case.** Save each output as a file in the iteration's folder. Never grade from memory of what the output "probably" said.
3. **Grade with the assertions.** Each assertion passes or fails with the line that proves it. Note what a sharper reviewer would flag that the assertions missed; that becomes a new assertion next round.
4. **Keep the previous iteration as the baseline.** Grade the new outputs beside the old ones, per file. A change that fixes one case and breaks two is a regression, and the side-by-side is the only way to see it.
5. **Generalise the rule, not the case.** When a case fails, ask what class of input it stands for and write the SKILL.md rule for the class. Patching the one prompt makes the skill longer and no better.
6. **Promote when clean.** A round with every assertion passing and no new reviewer notes is the signal. Copy the SKILL.md into its permanent home and archive the iteration folder with its test cases, so the next round starts from evidence.

## Rules that save rounds

- One change per iteration. Two changes and you cannot tell which one moved the grade.
- Keep the description's trigger phrases in a test case of their own: a skill that does not fire is a skill that does not exist.
- Frontmatter stays valid YAML with `name`, `description` and `license` on every iteration. Check it before grading anything else.
- Stop after three rounds and say what is still weak. Endless iteration is the perfectionism this repo exists to interrupt.

If you're in a team: the test cases live with the skill and are reviewed like code; nobody edits a SKILL.md without re-running them.

## Related

- [multi-agent-refine](../multi-agent-refine/SKILL.md): the same discipline applied to a document instead of a skill
- [verified-fixed-or-not-closed](../../principles/verified-fixed-or-not-closed.md): a failing assertion is not closed by "I'll fix that"
- [Licences](../../LICENSES.md): why the harness is linked rather than shipped
