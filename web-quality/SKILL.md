---
name: web-quality
description: Build and verify websites so obvious layout, responsive, and interaction defects never ship. Use when building or changing any web page, component, layout, or CSS; when asked to make something responsive or mobile-friendly; and when asked to audit, QA, review, or "check everything" on a site before delivery. Provides build-time rules that prevent defects and an inspection protocol that finds them independently, without the user having to point them out.
---

# Web Quality

Ship pages that a demanding client cannot find obvious faults in.

## The one rule that matters

**Automated checks passing is not evidence that something works. Render it, look at it, and use it.**

Most shipped defects survive because the developer verified a *proxy* for correctness instead of correctness itself. The proxy passes, confidence is declared, and the user finds the bug in ten seconds by scrolling on their phone.

Three specific traps, each of which produces a green check on a broken page:

1. **Page-level overflow as "responsive is done."** `documentElement.scrollWidth > clientWidth` catches only one defect class. Content clipped inside a container, content hidden behind fixed chrome, orphaned grid items, collided sections, and unusable spacing all produce **zero** page-level overflow.
2. **Asserting on state flags instead of rendered outcomes.** `aria-expanded === "true"`, a class name, or a CSS property being correct proves nothing about what the user sees. Assert on measured geometry: height, position, visibility, intersection.
3. **Rationalizing a visual anomaly.** If something looks wrong in a screenshot, it *is* wrong until a second, different method proves otherwise. "Probably a test artifact" is how real bugs ship.

## Two modes

### Building or changing anything

Read `references/build-rules.md` before writing layout CSS or a new component. It is organized by concern (containers, grids, fixed chrome, scroll containers, interactive states, adaptive components) and encodes the decisions that, when skipped, produce defects later.

Non-negotiable while building:

- **Author mobile-first.** Base CSS targets the narrowest supported width; add complexity upward with `min-width` queries. Retrofitting mobile onto desktop CSS is how components end up with no mobile treatment at all.
- **View every new or changed component at the narrowest supported width before calling it done** — not only at desktop. This single habit prevents the largest share of defects.
- **When you change a component, re-verify the component, its container, and the sections directly above and below it.**

### Auditing an existing site

Run the full protocol in `references/inspection-protocol.md`. Summary:

1. **Inventory** — enumerate every page (one per template minimum), every breakpoint, every interactive component.
2. **Automated probes** — `scripts/audit.mjs` catches the defect classes that page-level overflow checks miss.
3. **Visual scan** — walk each page top to bottom at the narrowest width in viewport-height slices. Look at *everything*, not only what you suspect.
4. **Interactive pass** — open, expand, click, scroll, and close every interactive element and inspect the resulting state.
5. **Seam pass** — inspect the boundary between adjacent sections.
6. **Reasonable-person pass** — ask of each screen: would a paying client point at anything here? And does the design look generic, or like a template?

Report findings with severity, location, cause, and fix. Do not report "clean" unless steps 2–6 all ran.

## Running the automated probes

```bash
# serve the site first (any static server), then:
node <skill>/scripts/audit.mjs --base http://localhost:8000
node <skill>/scripts/audit.mjs --base http://localhost:8000 --pages index.html,about.html
node <skill>/scripts/audit.mjs --base http://localhost:8000 --widths 360,768,1440 --interactive
```

Requires Playwright (`node_modules/playwright` in the project, or `npx playwright`). It auto-crawls same-origin links from the base URL when `--pages` is omitted.

It reports: content clipped by overflow, children escaping their parent's box, overlapping text, content trapped behind fixed chrome, unreachable scroll containers, orphaned grid items, columns too narrow to read, sub-minimum touch targets, section seam collisions, and unintended inset backgrounds.

**The probe script is a floor, not a ceiling.** It cannot judge whether spacing looks cheap, whether an icon set matches the brand, or whether a layout reads as premium. Steps 3–6 of the protocol are where those are caught, and they are not optional.

## Reporting

For each finding give: severity (blocker / major / minor), the page and breakpoint, the element, what the user experiences, the root cause, and the fix. Group by root cause — one CSS mistake usually produces defects on many pages, and fixing the cause beats patching each symptom.

When the same defect class appears more than twice, treat it as systemic: fix it at the shared component or token level, then re-run the protocol to confirm every instance cleared.
