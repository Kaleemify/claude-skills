---
name: device-consistent-design
description: Use when building a new website/page from scratch, or when auditing and fixing an existing one, to make typography, spacing, layout, components, media, and performance behave as one coherent system that is internally consistent within each device tier (narrow mobile, common mobile, tablet, desktop/laptop) and scales deliberately between tiers — instead of one device's sizing being inherited or stretched onto another. Also covers responsive media loading efficiency, accessibility, and full technical SEO / Core Web Vitals / Lighthouse compliance. Invoke by name when told to build, redesign, or fix a site "using this skill."
---

# Device-Consistent Design

## Purpose

A site is being built or repaired. The requirement is that every visual and structural property of the page — typography, spacing, layout, components, media, performance — forms one coherent, deliberately-designed system per device tier, and that the system scales between tiers in a controlled, well-structured way rather than by accident.

This skill does not hand you numbers. It does not tell you which pixel value, which CSS mechanism, which class name, or which variable-naming convention to use. Those choices belong to you, made fresh for the project in front of you, informed by that project's own content, brand, and density — and by current, real responsive-design and performance research at the time you do the work. What this skill fixes in place is the **shape of the requirement**: what must be internally consistent, at what granularity of device, and what "done" has to survive before you call it finished.

This skill operates in two modes, and both are required, not optional:

- **Prevention** — while creating or editing anything (a new site, a new section, an edit to an existing section, a new or modified component), actively avoid introducing a new inconsistency in the first place.
- **Repair** — when the project already contains inconsistencies (whether from prior manual work or prior AI edits), find and normalize them rather than adding to them.

If anything about the project is ambiguous when you apply this skill — its device-support range, its content density, whether an apparent inconsistency is intentional design or accidental drift — ask before changing anything. Do not guess and proceed.

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

## Device tiers to design for

Do not design for "mobile," "tablet," and "desktop" as three flat buckets. Within mobile alone there is a meaningful range, and the top and bottom of that range must not share the same treatment:

- **Narrow / small mobile** — the low end of currently-supported mobile viewport widths (roughly the smallest phones and smallest browser windows still expected to visit the site, down toward the ~350px class). This tier must be treated as a first-class target, not an afterthought that merely survives without breaking.
- **Common / large mobile** — the viewport range covered by current mainstream large-screen phones (the iPhone XR/14/15/16/17 Pro Max class and equivalently large mainstream Android flagships). This tier has materially more room than the narrow tier and should use it deliberately — it must not simply inherit narrow-mobile's compressed sizing, nor should narrow mobile inherit this tier's larger sizing scaled down. Each is designed on its own terms within one coherent mobile hierarchy.
- **The broad middle of real-world mobile usage** — besides the two edges above, cover the cluster of viewport widths that make up the bulk of actual global mobile traffic (research current, real usage-share data rather than assuming any single device is "the" mobile standard).
- **Tablet** — both the common average tablet sizes and portrait/landscape variation, treated as its own tier rather than a stretched phone layout or a shrunk desktop layout.
- **Desktop / laptop** — the common range of laptop and desktop viewport widths, plus deliberate handling of very wide/large-desktop viewports so content does not stretch into an unreadable or unbalanced layout — a maximum-width system is expected, and it is acceptable for different content types (e.g. a full-bleed section vs. a narrow reading column vs. a wide media block) to have their own distinct maximum widths, as long as that variation is systematic and not arbitrary.

Within every tier, decide breakpoints from the content and layout itself — where text actually wraps badly, where a grid actually gets too tight, where spacing actually starts to look wrong — not from a fixed, memorized list of device models. Use real, current data on common device/viewport clusters to sanity-check that decision, but let the content be the deciding authority. Every tier is subject to the appropriateness check above, individually — a tier does not pass just because it is internally coherent with itself; it must also hold up as reasonable for that device class.

## Inventory real content before designing any scale

Before choosing sizes, spacing, or breakpoints, gather the actual content that will populate the page and treat its worst case as a design input, not an afterthought discovered later:

- The longest heading, longest button/CTA label, longest nav item, and longest form label that will realistically appear.
- Every language/locale the page ships in, if more than one — translated strings are very often longer than the source language and are a leading cause of wrapping and overflow that only appears in that locale. Check each supported locale at the narrowest tier, not only the default language.
- Realistic data extremes: the longest name, price, or number the layout must hold; empty states; and any user-generated or dynamic content the layout must accommodate.
- Any element whose box is shared by multiple pieces of content competing for the same width (e.g. a price block, an icon, and a button text all in one row) — verify the true worst-case combination, not just the default copy.

Design and breakpoint decisions made against only the default, shortest, single-language copy are unverified until they have also been checked against this real-content worst case.

## What must be internally consistent (at every tier, and coherently across tiers)

- **Typography** — a full role-based hierarchy covering every text role actually present on the page, including but not limited to: display/hero text, primary page headings, section headings, secondary headings, sub-headings, titles, subtitles, card/component headings, eyebrows/overlines, lead paragraphs, body copy, supporting/secondary copy, descriptions, helper text, form labels, field/input text, placeholder text, button/CTA text, navigation text, captions, small captions, metadata, badges/pills/capsules/chips/tags, numerals/stats/metric labels, quotes/testimonials, list text, footer text, legal/fine-print text, and any other recurring text role found in the actual project. Every element sharing a role must match in size, weight, line-height, and letter-spacing at a given tier, and the whole hierarchy must scale between tiers in a way that preserves relative priority — nothing that was subordinate becomes visually dominant after scaling, and nothing dominant collapses into looking like supporting text (see "Consistency is necessary, but not sufficient" above for the priority-ordering rule this must respect).
- **Spacing** — section padding, container gutters, card/component internal padding, margins between headings/paragraphs/CTAs, gaps in grids and flex layouts, spacing between repeated items (cards, list rows, form fields), and internal spacing for buttons, inputs, and forms specifically. One coherent spacing rhythm per tier, not independently invented values per section — and, per the appropriateness check above, actively flag spacing that is heavier than the content and device justify even where it is applied consistently: examples include a button with padding disproportionate to its label, an input field taller or more heavily padded than its content needs, a card with interior spacing that dwarfs what it contains, a section with vertical whitespace far beyond what separates it from its neighbors, or a mobile layout that has simply inherited desktop-scale spacing unchanged. None of this means smaller is always correct — a legitimately spacious design is not a defect — the requirement is that the scale used is deliberate and appropriate, not merely present everywhere.
- **Containers and layout widths** — a deliberate system of content widths/gutters rather than ad hoc max-widths scattered per section. Multiple width variants are fine (narrow reading column, standard content width, wide media block, full-bleed) as long as the variants are a considered system, not accidents.
- **Breakpoint architecture** — one shared set of breakpoints driving the whole page. No section quietly inventing its own breakpoint that the rest of the page doesn't share, and no duplicate/near-duplicate breakpoints doing the same job in slightly different, conflicting ways.
- **Components** — buttons, inputs, selects, textareas, checkboxes/radios, cards, badges/pills/tags, tabs, accordions, navigation items, tables — consistent height, padding, radius, border treatment, icon size, icon-to-text spacing, and typography within each component type and its size variants (e.g. primary/secondary/small button), across every place that component type appears.
- **Touch and interaction targets** — comfortably tappable on touch devices at every tier where touch is the primary input, without visually inflating the element beyond what its design calls for; hit-area and visible size are not the same thing and both must be handled.
- **Interactive states** — hover, focus-visible, active, and disabled treatment consistent for a given component type everywhere it appears.
- **Media (images, video, icons, favicons)** — sized and scaled consistently for their role, with no distortion, cropping, or overflow at any tier, and aspect ratios preserved deliberately where the design depends on them.
- **Readability** — comfortable line lengths for body and lead text at every tier; text must not stretch edge-to-edge on wide viewports or crush into awkward wraps on narrow ones.
- **Z-index / layering** — one predictable stacking order for fixed/sticky/overlay elements (header, sticky bars, modals, toasts, dropdowns) rather than ad hoc large numbers competing per component.
- **Motion** — consistent transition/animation timing and easing for equivalent interactions, and full respect for reduced-motion preferences.
- **Mobile density** — narrower tiers may legitimately compress spacing and de-emphasize decorative whitespace, but the underlying hierarchy, component minimums (readability, tap targets), and layout integrity must hold all the way down to the narrowest supported width — **nothing should silently disappear, overlap, clip, or force horizontal scrolling at any width in the supported range, including the widths between the named tiers.**

## How this applies depending on the situation

The same principles above apply everywhere, but what you should actually *do* differs by situation. Identify which of these you are in before making changes:

- **Starting a new site or page from scratch.** Establish the tier breakdown, the typography hierarchy, the spacing rhythm, and the component system deliberately and coherently from the first section onward. Every section built after the first must continue following that same established system rather than each one inventing its own.
- **Adding a new section to an existing site.** Before writing any new markup or styling, analyze the surrounding design system — its existing typography roles, spacing rhythm, container widths, and component patterns — and reuse them. The new section must read as though it belongs to the same site. It must not introduce a new font size, spacing value, button style, radius, or container width unless there is a real, statable design reason the existing system does not already cover the need.
- **Editing an existing section.** A content or layout edit must not silently change heading scale, paragraph scale, padding, margins, button/input sizing, gaps, responsive behavior, or visual hierarchy as a side effect. After editing, verify the section still matches its own established role elsewhere on the page, not only that the edit itself looks fine in isolation.
- **Repairing an already-inconsistent site (including one that drifted after prior AI-generated edits).** Audit first (see "Recognizing drift" below), identify the repeated design roles and which values are outlier drift versus intentional pattern, determine the appropriate hierarchy/system from what the majority-correct pattern and general standards indicate, then normalize the outliers to it. This is correction and normalization, not a redesign — do not introduce a new system where a working one already exists and merely needs its outliers fixed.
- **A site or section that is already consistent and well designed.** Preserve it as-is. Do not modify, "improve," or restyle something that is already correct, consistent, and appropriate merely because you are working nearby. Only touch it if it fails the appropriateness check above, or if maintaining consistency with a change you were asked to make genuinely requires it — and in that case, change only what is required, not the surrounding design.

In every situation above, do not change unrelated sections, components, or design decisions that are not implicated by the task or by a genuine consistency/appropriateness defect. The scope of a change should match the scope of the actual problem or request.

## Recognizing drift, not just designing from a blank page

On an existing site, the system has usually not failed everywhere at once — it has drifted in specific, findable ways. Treat the following as red flags that point at a broken shared rule, not an isolated cosmetic detail:

- **An inline `style="..."` attribute setting a size, spacing, or color that a shared class/component rule already governs elsewhere.** This is almost always a one-off patch applied during a past edit rather than an intentional exception — trace what it should have used instead.
- **The same literal value (a font-size, a spacing number, a color) repeated across several unrelated components.** This is evidence of one real shared role that was never consolidated, not several coincidentally-identical decisions — consolidate it, don't leave it duplicated.
- **One instance of a repeating pattern (cards, rows, headings of the same rank) sized or spaced differently from its siblings with no comment or evident reason.** Read the surrounding code for a stated rationale before assuming it's intentional; if none exists, it is very likely drift.
- **A property override that silently interacts badly with an inherited rule** (for example, a color/weight/transform override that only changes one property while an inherited rule still applies a different one to the same element, producing an unintended combined result). Check computed/rendered output, not just the rule you are editing, whenever you touch a property that a more general rule also sets.

When you find one instance of a drifted value, search for every other place the same role appears before fixing only the one you found — a single drifted instance is rarely alone.

## Accessibility

Accessibility is a first-class requirement of this skill, not a subset of touch-target sizing:

- **Color contrast** — text against its background must meet standard contrast requirements at every tier and in every color mode the page supports (including on tinted/dark surfaces and inside components like badges or buttons).
- **Keyboard navigation** — every interactive element must be reachable and operable by keyboard alone, in a logical order, with a visible focus state distinct from hover.
- **Screen-reader semantics** — correct landmark/heading structure, meaningful accessible names/labels for interactive controls and images, and correct use of live regions or state attributes (e.g. expanded/collapsed) for dynamic components — verified against actual rendered semantics, not just markup that looks correct on read-through.
- **Reflow and zoom** — the page must remain usable, without loss of content or function and without horizontal scrolling, when the user zooms or increases text size, at every device tier.
- **Motion and input sensitivity** — respect reduced-motion preferences, and do not rely on hover alone to reveal content or functionality that touch/keyboard users need.

## Media loading efficiency

Every image, video thumbnail, icon, and favicon must be delivered at a resolution and file size appropriate to the space it actually occupies on screen at each device tier and pixel density — not a single oversized master asset loaded everywhere regardless of its rendered size. A small on-page element must not force the download of a needlessly large file; a full-width hero or an element the user can enlarge (zoom, lightbox, expanding a video) must still resolve to a sharp, high-quality result at that larger size, without having forced that larger payload on every visitor who only ever sees the small version. Apply this same discipline to every visual asset on the page, including the favicon and any decorative or background imagery, and use current best practice for responsive/adaptive media delivery, compression, and lazy-loading to achieve it — the specific technique is your call to make per project and per platform.

## Technical SEO and page-quality compliance

Once the visual/structural system is in place, verify the page against current technical SEO fundamentals and Core Web Vitals (loading performance, visual stability, interaction responsiveness), and run a full Lighthouse-style audit across performance, accessibility, best practices, and SEO. Investigate and fix what the audit surfaces rather than treating a passing score as the goal in itself — a green number is not proof the page is actually fast or actually accessible; confirm the underlying experience, not just the report.

## Verifying the result

Prefer rendering the real page and inspecting it — across the full device-tier range, including the widths between named tiers, and including every locale/content edge case identified in the content inventory step — over reasoning about the CSS/markup alone. A change is not verified until it has been seen working, not just written.

When rendering/browser-automation tooling is available in the working environment, use it to check actual rendered layout, computed sizes, and screenshots at each tier — this is the standard the rest of this skill assumes.

When that tooling is not available, say so explicitly, and fall back to a disciplined static review instead of skipping verification silently: re-read every rule touched and every rule that shares a selector or cascades onto the same elements, check for the drift patterns above, check breakpoint boundaries against each other by hand, and trace the content inventory's worst cases through the actual CSS logic rather than assuming they fit. State plainly, in the final summary, which parts were confirmed by rendering and which were only confirmed by static review, so the limitation is visible rather than implied to be full verification.

## Keeping decisions consistent across sessions, within one project

The specific numbers this skill produces are decided per project, not fixed by the skill — which means two separate sessions working on the same project could otherwise derive slightly different values for the same role. Prevent that by treating the project's own repository as the source of truth for decisions already made:

- Before deriving a new scale or system for a project, check whether the project already documents one (in its own repo/notes, its existing CSS structure and comments, or a prior design-decisions note) and reuse it rather than re-deriving from scratch.
- After establishing or normalizing a system for a project, leave a short, plain-language record of the decisions made — the tier breakdown used, the role hierarchy and its rationale, and any project-specific exceptions and why they're intentional — committed into the project itself (not into this skill file), so the next session on the same project continues the same system instead of starting over.
- Only re-derive a value from scratch when the existing project record is missing, clearly outdated, or the current task specifically calls it into question — and say so when you do.

## Reporting findings

When this skill is used to audit an existing site, report what was found in a structured, scannable form rather than a general impression — for every issue: its severity, its exact location (page/section/component and the device tier(s) it appears at), the root cause (which shared rule is missing or broken, not just the symptom), and the fix applied or proposed. Group findings by root cause where the same underlying problem produces multiple visible symptoms, and fix the cause once rather than patching each symptom separately. State clearly which findings were fixed, which were intentionally left as designed behavior, and which need a decision from the person who requested the work.

Treat "consistent but questionable" as its own reportable category, distinct from "inconsistent": when a value is applied uniformly (passes the Core principle) but fails the appropriateness check — a case where multiple valid design directions could reasonably apply, or where correcting it is a visible, subjective design decision rather than an obvious bug — report it explicitly and ask before changing it, rather than either silently leaving it or silently changing it. Silent changes to subjective, consistently-applied values are not acceptable even when you believe you know the better answer.

## Working method

1. **Back up or snapshot the current state before making changes at this scope.** Normalizing a whole system touches many files/rules at once; make sure the pre-change state is recoverable (via version control or a plain file copy) before starting, and confirm with the requester if the project has no existing version control.
2. **Audit the entire site before changing anything.** Understand how the current system works, and where it has drifted, before touching a single value.
3. **Do not patch section by section.** A problem in one place is often evidence of a missing or broken system-wide rule — fix the rule, not just the symptom.
4. **Design or normalize per tier, as one system**, using the principle and tier breakdown above, informed by genuine current research rather than assumption.
5. **Verify continuously across the full width range**, not only at the named tier boundaries — resize through the in-between widths and check that nothing breaks between the tiers you designed for.
6. **Re-audit the whole site after implementing**, the same way it was audited at the start, before calling the work done.
7. **Ask first when something is ambiguous** — an apparent inconsistency that might be intentional, a device-support range that wasn't specified, a tradeoff between two valid approaches. Confirm, then proceed.
