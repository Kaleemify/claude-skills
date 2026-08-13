# SEO, Core Web Vitals, and Verification

Read this when doing SEO/Core Web Vitals work, or when verifying/finishing any implementation.

## Technical SEO and page-quality compliance

Treat technical SEO, Core Web Vitals, accessibility, semantic structure, responsive behavior, crawlability/indexability, agentic-browsing compatibility, and the other factors a Lighthouse-style audit covers as built into the implementation from the start — not as an optional final check bolted on afterward. When building something new, adding a section or component, or changing an existing page, implement it so these are properly considered and optimized from the first pass, rather than shipping an issue and relying on a later audit to catch it.

When auditing or optimizing an existing site, try to verify with Lighthouse or another available, relevant measurement tool first. If no such tool is available, or it fails, errors, or does not return a reliable result, do not stop the workflow — fall back to direct code-level analysis and thoroughly inspect and optimize the relevant implementation that way. Handle automatically whatever can be reliably verified and improved from the code itself. Do not assume or invent a score or result for anything that genuinely cannot be confirmed without the actual measurement tool or runtime — mark that specific item clearly as **unverified** rather than presenting a guess as a result. Tool unavailability is not a reason to stop; it is a reason to fall back to code-level work and be honest about what remains unmeasured.

## Verifying the result

Primary verification and optimization should happen at the code level, not by defaulting to opening a browser and manually inspecting, screenshotting, or repeatedly re-testing every change. Directly and thoroughly analyze and verify components, styles, responsive logic, breakpoints, typography, spacing, padding, margins, sizing, hierarchy, accessibility, performance, and related implementation at the code level. Implement and optimize the code so the result is technically correct, clean, accurate, consistent, and production-ready on its own terms. Where build, lint, type-checking, static analysis, or other reliable code-level checks are available, use them.

Do not make the browser the default verification method. Use browser or runtime verification only when something genuinely cannot be reliably verified from the code itself, or when rendered/runtime behavior specifically needs to be checked (for example, an animation, a runtime interaction, or a rendering edge case that code review alone cannot settle). When you do use it, cover the full device-tier range, including the widths between named tiers, and the locale/content edge cases identified in the content inventory step (see `references/design-system-checklist.md`).

The goal is minimum unnecessary browser/runtime usage and minimum wasted time, while still reaching maximum possible accuracy and completeness through thorough code-level work. State plainly, in the final summary, what was confirmed by code-level analysis versus what genuinely required and received rendered/runtime verification, so the distinction is visible rather than assumed.
