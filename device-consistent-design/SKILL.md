---
name: device-consistent-design
description: Use when building a new website/page from scratch, or when auditing and fixing an existing one, to make typography, spacing, layout, components, media, and performance behave as one coherent system that is internally consistent within each device tier (narrow mobile, common mobile, tablet, desktop/laptop) and scales deliberately between tiers — instead of one device's sizing being inherited or stretched onto another. Also covers responsive media loading efficiency, accessibility, and full technical SEO / Core Web Vitals / Lighthouse compliance. Invoke by name when told to build, redesign, or fix a site "using this skill."
---

# Device-Consistent Design

## Quick reference for scoping effort

This skill is split across this file and supporting files under `references/`, so a small task only has to load what it actually needs. Not every invocation needs every reference file read, and not every invocation needs the same depth. Match your depth of engagement — and which reference files you read — to the task:

- **A narrow, single-element fix** (e.g. one button, one section's padding): the Core principle and "Consistency is necessary, but it is not sufficient" below cover what matters most. From `references/design-system-checklist.md`, read only the specific property/role involved (e.g. the one relevant bullet under "What must be internally consistent"), and apply it to that element, its direct equivalents elsewhere, and the tier(s) actually implicated — not the whole site.
- **Adding a new section or component to an existing site, or repairing an inconsistent one**: read `references/design-system-checklist.md` in full — its "How this applies depending on the situation" and "Recognizing drift" sections are the primary guide, so the new or corrected work matches what's already there.
- **Accessibility- or media-specific work**: read `references/accessibility-and-media.md`.
- **SEO/Core Web Vitals work, or final verification of any implementation**: read `references/seo-and-verification.md`.
- **A multi-session/ongoing project, or producing an audit report**: read `references/cross-session-and-reporting.md`.
- **A full build, redesign, or whole-site audit**: read every reference file in full — the entire skill applies at full depth, in the order it's written.

This is a map, not a substitute for the files it points to — when in doubt, read the full relevant file rather than relying on this summary alone.

## Purpose

A site is being built or repaired. The requirement is that every visual and structural property of the page — typography, spacing, layout, components, media, performance — forms one coherent, deliberately-designed system per device tier, and that the system scales between tiers in a controlled, well-structured way rather than by accident.

This skill does not hand you numbers. It does not tell you which pixel value, which CSS mechanism, which class name, or which variable-naming convention to use. Those choices belong to you, made fresh for the project in front of you, informed by that project's own content, brand, and density — and by current, real responsive-design and performance research at the time you do the work. What this skill fixes in place is the **shape of the requirement**: what must be internally consistent, at what granularity of device, and what "done" has to survive before you call it finished.

This skill operates in two modes, and both are required, not optional:

- **Prevention** — while creating or editing anything (a new site, a new section, an edit to an existing section, a new or modified component), actively avoid introducing a new inconsistency in the first place.
- **Repair** — when the project already contains inconsistencies (whether from prior manual work or prior AI edits), find and normalize them rather than adding to them.

If anything about the project is ambiguous when you apply this skill — its device-support range, its content density, whether an apparent inconsistency is intentional design or accidental drift — ask before changing anything. Do not guess and proceed. (See "Judgment: when to ask, and when to just proceed" below for how to tell which findings actually warrant asking.)

## Core principle

**Same visual or semantic priority = same treatment, everywhere it appears at that device tier. Different priority = a difference that is intentional and has a reason. Moving from one device tier to the next = the same hierarchy, scaled deliberately for that tier — never one tier's raw values simply carried over or shrunk by a flat percentage into another.**

Apply that principle to every property that can vary: font size, font weight, line height, letter spacing, padding, margin, gap, container width, gutter, border radius, component height, icon size, touch target size, image dimensions, z-index, motion timing, interaction states. If two elements carry the same role, they must look and behave the same. If a section's heading is smaller or larger than every other section's heading of the same rank, that is a defect unless there is a real, statable design reason for it.

## Consistency is necessary, but it is not sufficient on its own

Being applied uniformly everywhere does not automatically make a value correct. A value can be perfectly consistent across an entire site and still be wrong for its role and device — for example, every heading on mobile can be the same size as every other mobile heading of that rank (fully consistent) while still being objectively oversized for a mobile screen; every section can use the same generous padding (fully consistent) while that padding is still too heavy for the content density of the page. Treat both questions as required, separately, every time:

1. **Is it consistent?** (the Core principle above)
2. **Is it appropriate?** — does it also hold up against the actual content it contains, the device it renders on, the amount of visible content competing for space, and general current UI/UX standards for that kind of element — independent of whether the rest of the site agrees with it?

A value that passes check 1 but fails check 2 is still a defect. Do not report a site as fine, or leave a value unchanged, solely because it is applied consistently — consistency is the easier, necessary half of the check, and it must not be mistaken for the whole of it. This applies in both directions: flag values that are abnormally large for their role and device, and flag values that are abnormally small to the point of harming readability, usability, or touch-target comfort. It applies to every tier without exception — desktop is not exempt from this check merely because it is usually the tier that happens to look most acceptable; verify it on its own merits rather than assuming it by default.

This also governs how equivalence itself is judged: two elements are only the "same role" because of what they visually and functionally do on the page — not because they happen to share the same HTML tag. Two unrelated headings that both happen to be marked up as `<h2>`, or two unrelated paragraphs both marked up as `<p>`, are not automatically equivalent; conversely, elements with different tags can share a role and must then match. Judge equivalence by design role and context, and only then apply the Core principle to whatever set of elements actually share that role.

Priority ordering itself must also hold, not just per-role matching: a lower-priority text style (for example, a caption or a label) must not end up more visually prominent — larger, heavier, or higher-contrast — than a higher-priority style above it in the hierarchy (for example, the heading it supports), unless the design intentionally calls for that specific inversion. If scaling, editing, or a new addition causes that ordering to invert by accident, that is a defect even where each individual value looks reasonable in isolation.

The full, evidence-based method for evaluating appropriateness — grounded in standards rather than gut-feel, checked per device tier and per property — is in `references/design-system-checklist.md`.

## Judgment: when to ask, and when to just proceed

Not every finding justifies stopping to ask, and not every finding is even worth mentioning. Use professional judgment:

- **Proceed automatically, without asking**, when an issue is minor, obvious, low-risk, routine, or can be corrected safely without materially changing the intended design.
- **Ask for confirmation** only when there is meaningful ambiguity, a high-impact decision, multiple materially different valid options, or a change that could noticeably alter the intended design, behavior, usability, accessibility, or overall visual direction.
- **Only fix or ignore something silently when it is genuinely negligible and completely harmless.** A finding qualifies for silence only when it has no meaningful effect on design, consistency, functionality, behavior, content, UX, SEO, or any project decision. If a change could have any meaningful effect on any of those, do not change it silently — mention it or ask, as the situation requires. Do not disturb the person you're working with over things that are truly negligible and harmless, but never use that as a reason to silently change something that actually matters.

If confirmation is genuinely required by the above and no one is available to answer, do not make the risky or subjective change. Preserve the existing safe state, clearly note the open question for when someone is available, and continue with any other part of the task that can proceed safely and independently of that decision.

## When an explicit user choice conflicts with standards or consistency

If a user explicitly requests a specific design choice that conflicts with established UI/UX standards, the project's existing design logic, or the visual consistency this skill otherwise requires, do not silently override the request, and do not automatically reject it either. Briefly explain what may become incorrect, inconsistent, or less effective as a result, then ask the user to choose:

1. **Don't make the change** — keep the current/standard approach.
2. **Make only the requested change** — change exactly that element and leave everything else untouched.
3. **Make the change and adapt related elements** — apply the requested choice, then adjust only the directly related design values/components where necessary so the overall hierarchy, proportions, alignment, spacing, and consistency remain coherent.

If the user chooses option 3, do not redesign unrelated parts of the interface. Only adjust what is genuinely connected to that decision.

## Reference files

The detailed checklists this skill relies on live alongside this file, under `references/`, and are read on demand per "Quick reference for scoping effort" above — not preloaded, so a narrow task doesn't pay for detail it doesn't need:

- **`references/design-system-checklist.md`** — evidence-based appropriateness evaluation; the five device tiers (down to ~350px); the real-content inventory step; the full typography/spacing/containers/breakpoints/components/touch-targets/states/media/readability/z-index/motion/mobile-density checklist; situational guidance (new site, new section, editing, repairing, preserving); and drift-recognition patterns.
- **`references/accessibility-and-media.md`** — color contrast, keyboard navigation, screen-reader semantics, reflow/zoom, motion sensitivity, and responsive media-loading efficiency.
- **`references/seo-and-verification.md`** — technical SEO, Core Web Vitals, and Lighthouse-covered factors built in from the start; and the code-level-first verification method with its browser/runtime fallback.
- **`references/cross-session-and-reporting.md`** — keeping design decisions consistent across sessions on the same project, and the structured findings-reporting format.

## Working method

1. **Back up or snapshot the current state before making changes at this scope.** Normalizing a whole system touches many files/rules at once; make sure the pre-change state is recoverable (via version control or a plain file copy) before starting, and confirm with the requester if the project has no existing version control.
2. **Match the audit's scope to the request.** For a broad task — building a new system, normalizing an existing one, or a general request to fix or review the design — audit the entire site before changing anything, and understand how the current system works and where it has drifted before touching a single value. For a narrow, specific request — a single element, a single section, one clearly-scoped fix — audit only that element and its directly relevant context (other instances of its own role, its immediate surroundings, and the tier behavior it needs to match), rather than the whole site. Only widen the audit if the narrow investigation itself surfaces a genuine system-wide problem.
3. **Do not patch section by section.** A problem in one place is often evidence of a missing or broken system-wide rule — fix the rule, not just the symptom.
4. **Design or normalize per tier, as one system**, using the Core principle above and the device-tier breakdown in `references/design-system-checklist.md`, informed by genuine current research rather than assumption.
5. **Verify continuously across the full width range**, not only at the named tier boundaries — resize through the in-between widths and check that nothing breaks between the tiers you designed for.
6. **Re-audit the whole site after implementing**, the same way it was audited at the start, before calling the work done.
7. **Ask first when something is ambiguous** — an apparent inconsistency that might be intentional, a device-support range that wasn't specified, a tradeoff between two valid approaches. Confirm, then proceed. (See "Judgment: when to ask, and when to just proceed" above.)
