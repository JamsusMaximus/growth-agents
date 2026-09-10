# Example: the critics killed the premise

A worked run of `multi-agent-refine` on a PRD, told as mechanism only.

**The draft.** A PRD proposed rebuilding a data pipeline. Its problem statement rested on one remembered incident: someone had once seen a wrong figure, so the pipeline was declared unreliable and a rewrite was scoped.

**Round one.** Four critics ran in parallel: feasibility, what's-missing, devil's-advocate, and a fact-check against the codebase. Three of them converged on the same HIGH finding, which is the signal to trust.

- The premise was an anecdote. Nobody had checked the logs. The pipeline had not been producing wrong figures; it had been producing nothing, because a scheduled job had died and no alert existed.
- The real gap was consumption, not correctness. Nothing read the pipeline's output, which is why nothing noticed when it stopped. A dead pipeline nobody reads is a purpose problem, not a reliability problem.
- The proposed fix was itself a regression. The rewrite moved the job into a serverless function whose duration budget was shorter than the job's run. It would have been cut off partway, returned success, and written a partial result: silent failure with a cleaner interface.

**What changed.** The PRD was not polished. It was rebuilt from evidence: the logs, the empty list of consumers, and the function's documented limits. The scope became an alert plus one named consumer before any rewrite was considered.

**Round two.** One critic re-checked the fixed items only. Clean. Stopped.

**The lesson.** A refine round that only improves the draft has failed if the premise was wrong. Always include a critic whose lens is "is the problem real, and how do we know?"

## Related

- [SKILL.md](SKILL.md): the workflow this run followed
- [observed-asked-unobserved](../../principles/observed-asked-unobserved.md): the anecdote was `unobserved` and should have been labelled so
- [verified-fixed-or-not-closed](../../principles/verified-fixed-or-not-closed.md): each HIGH reached an end state with evidence
