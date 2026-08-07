# Inspection protocol

How to find defects yourself, before the user does.

The premise: a user who scrolls a page on their phone for thirty seconds will find things an automated suite reports as clean. Everything here exists to close that gap. Run all six steps. Declaring "clean" after only step 2 is the failure mode this protocol exists to prevent.

---

## Step 0 — Inventory

Do not audit "the site." Audit an enumerated list, so coverage is checkable rather than assumed.

- **Pages**: every distinct template, plus every hand-authored page. Generated pages (product, category, article) need at least one representative each — but confirm they truly share a template before sampling. Note the total: "14 of 14 templates" is verifiable; "the main pages" is not.
- **Breakpoints**: narrowest supported width (commonly 320 or 360), a common phone (390/414), small tablet (768), large tablet (834/1024), laptop (1280), desktop (1440), and wide (1920). Also test a **short viewport** (e.g. 360×640) — height-dependent defects hide at tall viewport heights.
- **Interactive components**: every menu, dropdown, accordion, modal, overlay, carousel, tab set, filter, form, and toggle. List them explicitly.
- **States**: default, hover, focus, active/selected, open, error, empty, loading, and long-content.

## Step 1 — Reproduce the user's environment

- Emulate a **touch device** (`hasTouch`, `isMobile`) for mobile widths. Hover behaviour, scroll behaviour, and some layout differ from a narrow desktop window. A narrow desktop viewport is not a phone.
- Test with **realistic content volume**: the longest title, the fullest menu, the most items. Sample data hides overflow and height defects.
- Disable nothing that real users have enabled. If animations are gated on `prefers-reduced-motion`, test both.

## Step 2 — Automated probes

Run `scripts/audit.mjs`. It covers the defect classes that page-level overflow checks miss: clipped content, escaped children, overlapping text, content behind fixed chrome, unreachable scroll containers, orphaned grid items, unreadably narrow columns, small touch targets, section seam collisions, inset backgrounds.

Treat its output as a **floor**. Everything it reports is a real defect worth triaging; a clean report means nothing about visual quality, spacing, hierarchy, or whether the design reads as intended.

## Step 3 — Visual scan (the step most often skipped)

**Walk every page top to bottom at the narrowest supported width, in viewport-height slices, and look at every slice.**

- Screenshot in sequential viewport-sized steps and review each one. Do **not** rely on a single full-page screenshot: it renders fixed/sticky elements at one arbitrary position, hides scroll-dependent state, and compresses detail past the point of usefulness.
- Look at parts of the page you have no reason to suspect. Defects concentrate in exactly the sections nobody thought to check — targeted screenshots of components you already suspect will never find them.
- Repeat at one mid width and one wide width. Tablet widths are where "collapses at mobile, fine at desktop" layouts break, because they get neither treatment.
- For each slice ask: is anything cut off, overlapping, misaligned, unevenly spaced, orphaned, touching something it should not, or wasting vertical space?

## Step 4 — Interactive pass

Static screenshots of default states prove nothing about interaction. For every component in the inventory:

- **Open it, and measure the result.** Assert on rendered geometry — height, visibility, position — not on class names, `aria-*` values, or CSS properties. A toggle can set every flag correctly while the panel renders at zero height.
- **Scroll inside it** when its content can exceed the viewport, at a short viewport height. Confirm the last item is reachable.
- **Activate selection states** — click swatches, chips, tabs, filters — and inspect the rendered result for rings, outlines, or transforms escaping their container.
- **Close it**, and confirm the page returns to a clean state: scroll position restored, page scroll unlocked, focus returned, nothing left pinned or hidden.
- **Test on touch**: confirm nothing is reachable only via hover. Confirm tap targets are comfortable.
- **Submit forms** empty, invalid, and valid. Confirm validation fires, that a failure is surfaced to the user, and — critically — that a successful submission actually delivers somewhere rather than only showing a success message.
- **Use the keyboard**: tab through, confirm focus is visible, confirm modals trap focus and Escape closes them.

## Step 5 — Seam pass

Defects at the boundary between two sections are invisible when sections are reviewed one at a time.

- For each pair of adjacent sections at narrow widths, look at the transition. Two media elements meeting with no separation, mismatched background transitions, doubled or collapsed spacing, and inconsistent horizontal insets all show up only here.
- Check the first and last sections of each page against the header and footer, including any fixed chrome.

## Step 6 — Reasonable-person pass

For each screen, ask plainly: **would a paying client point at anything here and ask why it looks like that?**

This catches what no assertion can: spacing that reads as unfinished, an icon that does not match the others, a heading that looks accidentally small, a card that is emptier than its neighbours, imagery that undercuts the positioning, a layout that is technically correct and visually cheap.

If something looks slightly off, it is off. Investigate it rather than explaining it away.

---

## Anti-rationalization

The single behaviour that lets real defects ship: seeing something wrong and constructing a reason it does not count.

- "That's a screenshot artifact" — verify with a second method before accepting. Query the live DOM, take a viewport screenshot at that scroll position, or reproduce it manually.
- "The CSS property is correct, so it must be fine" — the property being right and the user seeing the right thing are different claims. Measure the rendered result.
- "That element is just scrolled out of frame" — scroll to it and confirm.
- "The test passed" — check what the test actually asserted. A test asserting on a state flag can pass against a completely broken feature.

**A visual anomaly is a defect until a second, independent method proves otherwise.** Dismissing anomalies is how a site ships with faults the user finds immediately.

## Reporting

Group findings by **root cause**, not by page. One mistake in a shared component or token produces symptoms across many pages; the report should make that structure obvious so the fix happens once.

For each finding: severity, page(s) and breakpoint(s), element, what the user experiences, root cause, fix.

State coverage explicitly and honestly: which pages, which widths, which components, which steps of this protocol ran. If a step was skipped, say so rather than implying full coverage.

After fixing, **re-run the protocol** — not just the specific check that caught it. Fixes routinely introduce defects elsewhere, particularly when applied to shared components.
