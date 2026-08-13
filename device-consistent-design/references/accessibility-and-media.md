# Accessibility and Media Efficiency

Read this when the task touches accessibility specifically, touches images/video/icons/favicons specifically, or as part of a full build/audit.

## Accessibility

Accessibility is a first-class requirement of this skill, not a subset of touch-target sizing:

- **Color contrast** — text against its background must meet standard contrast requirements at every tier and in every color mode the page supports (including on tinted/dark surfaces and inside components like badges or buttons).
- **Keyboard navigation** — every interactive element must be reachable and operable by keyboard alone, in a logical order, with a visible focus state distinct from hover.
- **Screen-reader semantics** — correct landmark/heading structure, meaningful accessible names/labels for interactive controls and images, and correct use of live regions or state attributes (e.g. expanded/collapsed) for dynamic components — verified against actual rendered semantics, not just markup that looks correct on read-through.
- **Reflow and zoom** — the page must remain usable, without loss of content or function and without horizontal scrolling, when the user zooms or increases text size, at every device tier.
- **Motion and input sensitivity** — respect reduced-motion preferences, and do not rely on hover alone to reveal content or functionality that touch/keyboard users need.

## Media loading efficiency

Every image, video thumbnail, icon, and favicon must be delivered at a resolution and file size appropriate to the space it actually occupies on screen at each device tier and pixel density — not a single oversized master asset loaded everywhere regardless of its rendered size. A small on-page element must not force the download of a needlessly large file; a full-width hero or an element the user can enlarge (zoom, lightbox, expanding a video) must still resolve to a sharp, high-quality result at that larger size, without having forced that larger payload on every visitor who only ever sees the small version. Apply this same discipline to every visual asset on the page, including the favicon and any decorative or background imagery, and use current best practice for responsive/adaptive media delivery, compression, and lazy-loading to achieve it — the specific technique is your call to make per project and per platform.
