# Cross-Session Consistency and Reporting

Read this for multi-session/ongoing project work, or when producing an audit report.

## Keeping decisions consistent across sessions, within one project

The specific numbers this skill produces are decided per project, not fixed by the skill — which means two separate sessions working on the same project could otherwise derive slightly different values for the same role. Prevent that by treating the project's own repository as the source of truth for decisions already made:

- Before deriving a new scale or system for a project, check whether the project already documents one (in its own repo/notes, its existing CSS structure and comments, or a prior design-decisions note) and reuse it rather than re-deriving from scratch.
- After establishing or normalizing a system for a project, do not create a new documentation, notes, standards, or decision-record file on your own initiative to hold this — only do so if the user has explicitly requested it or has already authorized maintaining this kind of project documentation. If a suitable existing file already exists (project notes, a README, existing design-system documentation), update it when relevant instead. If no suitable file exists and creating one would genuinely be useful for future sessions, ask for confirmation before creating it, rather than adding it unasked.
- Only re-derive a value from scratch when the existing project record is missing, clearly outdated, or the current task specifically calls it into question — and say so when you do.

## Reporting findings

When this skill is used to audit an existing site, report what was found in a structured, scannable form rather than a general impression — for every issue: its severity, its exact location (page/section/component and the device tier(s) it appears at), the root cause (which shared rule is missing or broken, not just the symptom), and the fix applied or proposed. Group findings by root cause where the same underlying problem produces multiple visible symptoms, and fix the cause once rather than patching each symptom separately. State clearly which findings were fixed, which were intentionally left as designed behavior, and which need a decision from the person who requested the work. Apply the judgment guidance in `SKILL.md` ("Judgment: when to ask, and when to just proceed") to this report itself — omit genuinely negligible findings rather than padding the report with them.

Treat "consistent but questionable" as its own reportable category, distinct from "inconsistent": when a value is applied uniformly (passes the Core principle) but its appropriateness is genuinely unclear even after checking it against the evidence-based standard in `references/design-system-checklist.md` — not a minor or obvious case, which judgment should resolve without asking — report it explicitly and ask before changing it, rather than either silently leaving it or silently changing it. Silent changes to subjective, consistently-applied values are not acceptable when the case is genuinely unclear or high-impact.
