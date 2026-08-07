# Build rules

Decisions that prevent defects. Skipping one of these does not fail immediately — it fails later, on someone's phone, in front of the client.

---

## Containers and full-bleed backgrounds

A section usually has **two layers with different width rules**: a background that spans the full viewport, and content constrained to a max width. Conflating them is the most common source of "why is there a white strip on the side."

- Put the background/color/image on the outer section element, which is **never** width-constrained.
- Put the max-width constraint on an **inner wrapper**.
- Applying a container class directly to a section that owns a background will inset that background. If a background is meant to reach both screen edges, verify it does at several widths — including wider than the max-width, where the inset is most visible.
- Beware ancestors with `overflow: hidden`, padding, or margins that silently prevent a child from reaching the edges.

## Grids and item counts

Breakpoints are only half of grid design. **Item count** is the other half.

- For every grid, ask: what does the final row look like when the item count is not divisible by the column count? An orphan item sitting alone at the start of a row looks accidental.
- Decide deliberately: center the trailing items, span the orphan across the row, or choose column counts that divide evenly at each breakpoint.
- This applies to dynamic/content-driven grids especially, where item count changes as content is added.

## Collapsing multi-column layouts

- Any multi-column layout must have an explicit narrow-width treatment. Two columns at 360px gives each column roughly 160px, which is too narrow for prose and forces text to overlap, clip, or wrap into unreadable slivers.
- Prose columns need roughly 280px minimum to read acceptably. Below that, collapse to one column.
- Do not assume a grid "will just reflow." `grid-template-columns: repeat(4, 1fr)` reflows to nothing — it stays four columns at every width until told otherwise. Prefer `repeat(auto-fit, minmax(<readable-min>, 1fr))` when the design allows, or write explicit breakpoints.

## Fixed and sticky chrome

Any element pinned to a viewport edge (header, bottom action bar, cookie banner, floating button) covers content underneath it.

- Reserve space on the scroll container equal to the chrome's height (padding or margin), accounting for safe-area insets on mobile.
- **Then verify the reservation is sufficient** by scrolling to the very bottom of the longest page and confirming the last content element is fully visible and not overlapped.
- Fixed chrome with **variable height** is the trap: text that wraps to a second line at narrow widths makes the bar taller than the space reserved for it, so it starts covering or pushing content. Either prevent the wrap, or measure the height at runtime and set the reservation from the measurement.
- Give pinned chrome an explicit z-index from a documented scale so overlays, menus, and modals stack predictably against it.

## Horizontal scrollers

When a row of items (chips, tabs, cards, filters) cannot fit at narrow widths:

- Use `overflow-x: auto` on the scroll container, never `overflow: hidden` — hidden silently amputates the items past the edge with no way to reach them.
- Make the scrollability visible: let the last item bleed to the edge, or add a fade/shadow affordance. A row that looks complete but is not signals nothing to scroll.
- Do not let the scroll container introduce page-level horizontal scroll; the scrolling belongs to the container.
- Ensure the items do not wrap (`flex-wrap: nowrap`) — wrapping and scrolling are mutually exclusive intents.

## Interactive states drawn outside the box

Selected, active, focus, and hover states frequently draw *outside* an element's own bounds: rings, outlines, offsets, glows, scale transforms.

- If a state ring is drawn outside, the parent must have padding to accommodate it, or the ring must be drawn inside (`box-shadow: inset`, `outline-offset` negative, or a border that replaces rather than surrounds).
- Verify by **actually activating the state** and looking at it. An element in its default state proves nothing about its selected state.
- Ring size should scale with the element. A ring sized for a large control looks broken around a small swatch or dot.

## Panels that can exceed the viewport

Menus, drawers, dropdowns, and modals hold content that may grow taller than the screen.

- Give the panel `max-height` bounded by the viewport and `overflow-y: auto` so its content is reachable.
- Scroll-locking the page while a panel is open is correct — but the lock must not also prevent scrolling **inside** the panel. Lock the page, not the panel.
- Verify with the **largest realistic content**, at the **shortest supported viewport height**. A menu that fits with three items breaks with twelve.
- Account for on-screen keyboards on mobile shrinking the usable height for anything containing an input.

## Components that must adapt, not just shrink

A component designed for a wide viewport is often the wrong component at a narrow one — not merely a smaller version of itself.

- Multi-column mega-menus, image-rich navigation panels, side-by-side comparisons, and dense tables usually need a **different structure** on small screens, not scaled-down geometry.
- Decorative imagery that supports a wide layout becomes noise or bulk on a small one. Remove it from the flow (`display: none`) rather than shrinking it — but confirm removal does not leave an empty grid cell or gap behind.
- Never leave functionality reachable only by hover. Touch devices have no hover; every hover-revealed action needs a tap-accessible path.

## Adjacent sections and rhythm

- Alternating layouts (image-left / image-right) collapse to a single column at narrow widths. When two adjacent sections collapse, the bottom element of one can land directly against the top element of the next — two images touching with no separation reads as one broken image.
- Decide the stacking order per section explicitly at narrow widths, and guarantee separation between sections (spacing, a rule, or alternating backgrounds).
- Keep section vertical rhythm consistent from a spacing scale. Ad-hoc padding per section is visible as unevenness even when no single value looks wrong.

## Spacing and line economy at narrow widths

- Content that comfortably fits one line at narrow widths should not be forced onto two by unnecessary wrappers, block-level display, or oversized gaps. Wasted vertical space reads as unfinished.
- Conversely, do not cram: check that adjacent items have breathing room and are not optically colliding.
- Label/value pairs, meta rows, and inline lists usually want to stay inline at narrow widths with a smaller gap, rather than stacking.
- Horizontal padding should be consistent across sections; a section inset differently from its neighbours is immediately visible.

## Text that must not wrap (or must)

- Elements with a fixed or constrained height must not contain text that can wrap into more lines than that height allows. Either allow the height to grow, shorten the text, or reduce size at narrow widths.
- Test with the **longest real string**, not the shortest placeholder. Titles, names, addresses, and translated copy are longer than sample data.
- Long unbroken strings (URLs, emails, reference codes) need `overflow-wrap: anywhere` or they force horizontal overflow.

## Touch targets and input

- Interactive elements need roughly 44×44px of tappable area on touch devices. Scope the enlargement to touch devices so desktop density is preserved.
- Adjacent tappable elements need enough separation that the wrong one is not hit.
- Inputs need a font-size of at least 16px on mobile to prevent automatic zoom on focus.

## Images and media

- Always set `width`/`height` (or `aspect-ratio`) so layout does not shift as images load.
- Lazy-load below-the-fold media; never lazy-load the hero.
- Verify the **art direction** at narrow widths: a wide crop with the subject in the centre often becomes an empty field on a tall narrow screen. Use `<picture>` with a dedicated crop where it matters, or set `object-position` per breakpoint.
- Serve appropriately sized files. A multi-megabyte image is unacceptable on mobile data regardless of how it looks.

## Verifying as you build

- After changing a component: view it at the narrowest supported width, one mid width, and one wide width **before** considering it done.
- After changing anything shared (header, footer, tokens, base type scale), check at least one page of **every** template — shared changes propagate everywhere.
- Prefer fixing the shared cause over patching each page. If the same fix is being applied a third time, it belongs in the shared layer.
