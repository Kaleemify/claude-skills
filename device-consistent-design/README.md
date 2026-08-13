# Device-Consistent Design — About This Skill

**This file is documentation only.** Claude does not read it while doing a task, and nothing in it triggers any action. It exists so a human (or a future you) can understand what this skill is, why it exists, and what it's actually good at, without having to reverse-engineer that from `SKILL.md` and the `references/` files. For the operational content — the rules Claude actually follows — see `SKILL.md` and the files under `references/`.

## What this skill is

A Claude Code skill that keeps a website's entire visual and structural system — typography, spacing, layout, components, accessibility, and performance — consistent across every device size, in three situations: building something new, extending an existing site, and repairing one that has drifted out of consistency.

## The problem it solves

Websites that get edited repeatedly, especially through many separate AI-assisted changes, tend to drift in small, specific ways: one section's heading ends up a different size than every other section's heading of the same rank, a card gets extra padding no other card has, mobile styling quietly inherits desktop's spacing unchanged. Individually these look like small issues; together they make a site feel like it was assembled by several different people who never talked to each other.

There is a second, less obvious problem this skill was specifically built to catch: **a site can be perfectly self-consistent and still be wrong.** If every heading on mobile is the same size as every other mobile heading, that passes a naive consistency check — but if that size is objectively too large for a mobile screen, it is still a defect. This skill treats "is it consistent?" and "is it appropriate?" as two separate, both-required questions, not one.

## How it works

The skill is split across five files so that a small task doesn't have to load — and pay the token/time cost of — content it doesn't need:

- **`SKILL.md`** — always loaded. Contains only what every invocation needs: the Core principle, the consistency-vs-appropriateness distinction, the rule for when to ask versus proceed versus stay silent, the protocol for when a user's explicit choice conflicts with standards, and the working method. About 2,150 words.
- **`references/design-system-checklist.md`** — read for real design/audit work. The evidence-based method for judging appropriateness, the five device tiers, the real-content inventory step, the full property checklist (typography, spacing, containers, breakpoints, components, touch targets, states, media, readability, z-index, motion, mobile density), situational guidance (new site / new section / editing / repairing / preserving), and drift-recognition patterns.
- **`references/accessibility-and-media.md`** — read for accessibility- or media-specific work.
- **`references/seo-and-verification.md`** — read for SEO/Core Web Vitals work, or when verifying any finished implementation.
- **`references/cross-session-and-reporting.md`** — read for multi-session/ongoing project work, or when producing an audit report.

A narrow task (fix one button) only needs `SKILL.md` plus the one relevant bullet of one reference file. A full build or full-site audit reads everything, in order, at full depth. `SKILL.md`'s "Quick reference for scoping effort" section is the map that tells Claude which of this to read for a given task.

## When to use it

- Building a new site or page from scratch.
- Adding a new section or component to an existing site.
- Editing an existing section.
- Repairing a site that has drifted out of consistency (including one that drifted through prior AI-generated edits).
- A narrow, single-element fix, where only that element and its direct equivalents need checking — not the whole site.

## Why it's built this way — everything this skill actually does well

- **Five device tiers, not three.** Narrow/small mobile (down to roughly ~350px), common/large mobile, the broad middle of real-world mobile usage, tablet, and desktop/laptop — each designed on its own terms. Large-mobile sizing is never simply inherited down into small mobile, and narrow-mobile compression is never simply carried up into large mobile.
- **Real content is inventoried before any scale is chosen.** The longest heading, longest button label, every supported language/locale (translated strings are frequently longer than the source language), realistic data extremes, and worst-case combinations of competing content in one row — checked before design decisions, not discovered as bugs afterward.
- **A full, role-based consistency checklist** covering typography, spacing, containers, breakpoints, components, touch/interaction targets, interactive states, media, readability, z-index/layering, motion, and mobile density — evaluated at every tier and coherently across tiers.
- **Consistency is treated as necessary but not sufficient.** A value can be applied uniformly everywhere and still be objectively wrong for its role and device; this skill checks both, in both directions (too large and too small), and does not exempt desktop from the check just because it usually looks the most acceptable by default.
- **Equivalence is judged by design role, not by HTML tag.** Two elements are not automatically "the same" just because they're both `<h2>` or both `<p>` — and elements with different tags can still share a role and must then match.
- **Priority ordering is protected.** A lower-priority text style (a caption, a label) is not allowed to end up more visually dominant than the higher-priority style it supports, by accident.
- **Appropriateness judgments are evidence-based, not gut-feel.** Grounded in current UI/UX standards, accessibility guidance, established design systems, real device context, and the actual project's own context — stated as "this is inappropriate given [X]," never as "I think this looks too big/small." Checked per device tier and per property (padding, gaps, section spacing, container spacing, alignment, component proportions, button/input sizing, vertical rhythm, visual density), not just raw width/height. Typography is evaluated by role and priority, not as one generic font-size rule. Responsive adaptation is required to be natural and proportional to each tier, not everything mechanically shrunk by the same percentage.
- **Judgment is calibrated, not all-or-nothing.** Minor, obvious, low-risk issues get fixed without interrupting anyone. Meaningfully ambiguous, high-impact, or design-direction-changing issues get flagged and asked about. Only genuinely negligible issues with *no meaningful effect on design, consistency, functionality, behavior, content, UX, SEO, or any project decision* are handled completely silently — anything with a real effect on any of those must be mentioned or asked about, never just quietly changed.
- **A defined fallback when no one is available to answer.** The skill does not stall or guess on a risky/subjective change — it preserves the existing safe state, notes the open question, and keeps working on whatever else can proceed independently.
- **A three-option protocol when a user's explicit choice conflicts with standards.** The skill never silently overrides an explicit request and never silently rejects it either — it explains the tradeoff and lets the person choose: don't change it, change only that element, or change it and adapt only the genuinely connected surrounding elements.
- **Situational behavior, not one-size-fits-all instructions.** Starting fresh, adding a section, editing a section, repairing an inconsistent site, and preserving an already-good one are each handled differently, including an explicit instruction to leave unrelated parts of the interface alone.
- **Drift-recognition heuristics** for existing sites: inline styles overriding a shared rule, the same literal value duplicated across unrelated components, one sibling in a repeating pattern sized differently with no stated reason, and property overrides that interact badly with inherited rules.
- **Accessibility as a first-class requirement**, not folded into touch-target sizing alone: color contrast, keyboard navigation, screen-reader semantics, reflow/zoom behavior, and motion/input sensitivity.
- **Media loading efficiency**: every image, video, icon, and favicon is expected to load at a size appropriate to where it's actually displayed — not one oversized master asset served everywhere regardless of its rendered size.
- **Technical SEO, Core Web Vitals, and Lighthouse-relevant factors are built in from the start**, not audited in as an afterthought — and if a measurement tool isn't available, the skill falls back to code-level analysis and honestly marks unmeasured items as unverified instead of inventing a result.
- **Verification is code-level first.** Static analysis, lint, type-checking, and build tools are the default; opening a browser and manually screenshotting/re-testing everything is the exception, used only when something genuinely can't be confirmed from the code itself — which keeps token and time cost down without sacrificing accuracy.
- **Cross-session consistency without unwanted side effects.** The skill reuses a project's own already-documented decisions across sessions, but will not create a new documentation/notes file in someone's project on its own initiative — only with explicit permission or an existing suitable file to update.
- **Structured, severity-ranked reporting** for every audit finding — location, root cause (not just the symptom), and fix — with negligible findings filtered out rather than padding the report, and a distinct "consistent but questionable" category for cases that are uniform but genuinely uncertain rather than clearly right or wrong.
- **Token-optimized structure.** Splitting the always-relevant core from the situational detail (this file's own subject) means a narrow task loads roughly 2,150 words instead of the full ~5,600-word single-file version this skill used to be, while a full audit still gets everything at full depth.
- **Deployment integrity verified by hash, not by assumption.** Every version of this skill has been checked byte-for-byte (SHA-256) between the local copy and the GitHub-hosted copy before being called "in sync" — never claimed as verified without that evidence.

## How this skill reached its current form

This skill was not written once and left alone — it went through several rounds of a real audit-and-correction process: a full requirement-by-requirement review against an explicit specification, a check for internal contradictions and content bloat, and a final restructuring for token efficiency. Each round's findings were verified against the actual file content (not assumed), and every correction was checked afterward to confirm no prior rule, meaning, or behavior was lost in the process.
