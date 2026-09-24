# Service / Product Selection

When a business offers multiple services, choosing which to advertise is a research task with a hard gate, not a preference call.

---

## The gate, in order

Apply these in sequence. A service that fails an earlier gate is disqualified before later ones matter.

### Gate 1 — Can it even be targeted?

Query the ad platform's interest/targeting search directly for each service. Do not assume an interest exists because the concept is common.

**Real example:** of 14 services a contractor offered, checking the Meta interest-search API directly showed that **five had no usable interest at all** — excavating, driveways, water features/fountains, log-home construction, and log-home chinking. Advertising these means targeting fully broad (age + location only), and broad targeting is documented as a leading cause of low-quality/junk leads (see `references/failure-modes.md`). These five were disqualified before CPL was even researched.

For services that do have an interest, also pull the **local audience size** at the finalised radius (see `references/location-and-audience.md`). An interest that resolves to a tiny local audience (e.g. under ~40,000 in a metro-scale radius) usually cannot sustain delivery even if it exists.

### Gate 2 — What does the auction cost, and how contested is it?

Get a **channel-labelled** competition signal — see `references/cpl-and-budget.md` for how to source and grade CPL data per channel. At minimum, identify:
- Which services sit in categories with unusually high Google Ads CPL/CPC (a decent competition proxy even when planning for Meta) — this often reveals national-brand or franchise dominance in that category
- Whether large national chains or franchises are known to operate in this exact category and geography (search for their explicit presence in the target metro, don't assume)

**Real example:** windows and roofing showed Google category CPLs of **$200+ and $228+** respectively — by far the two most expensive of the categories checked — and both categories are known to have national franchise players running dedicated regional divisions in the target metro. Both were moved to "do not run on a small daily budget" despite one of them having a plausible-looking but unsourced low CPL claim circulating online (which failed verification — see `references/evidence-standards.md`).

### Gate 3 — Does the season allow delivery?

For each remaining candidate, determine:
- Is there a **hard physical/weather deadline** that could prevent a lead generated now from ever becoming a job this season? (e.g. materials that can't be installed below a certain temperature, ground-freeze cutoffs)
- Is demand for this service **rising, flat, or falling** in the specific weeks the campaign will run? Source this per-service — don't assume all "outdoor" services share one seasonal curve.

A service with a hard deadline isn't automatically disqualified — an honest, near-term deadline can be turned into real (not fabricated) urgency in the ad and landing page. But a service where an October lead literally cannot be built this season, in a campaign ending in August, needs that fact stated plainly to the client.

### Gate 4 — What's the job worth, and what does that imply about acceptable CPL?

Get average project/order value for each candidate service (client's own numbers if available; otherwise sourced third-party estimates, labelled as such and ideally region-specific). A $41 CPL is trivial against a $9,000 job and expensive against a $200 one. Rank candidates partly by **implied CPL-to-value ratio**, not CPL alone.

### Gate 5 — Do we already have assets for it?

Check honestly: real project photos, reviews, a dedicated landing page, proof of licensing/certification if relevant. **A service with a finished funnel and real proof beats a service with a theoretically lower CPL but no assets**, especially on a short timeline — building creative and a landing page from nothing takes real days that a trial budget may not have.

**Real example:** a Windows Installation service was initially recommended on the strength of an unverified low-CPL claim, before that claim was checked and found to trace to a page with no methodology. On re-verification, the measured category data showed windows was one of the *most* contested auctions, not the cheapest — and the business had zero windows photos and no windows content on its site at all. The recommendation was reversed, in writing, once the evidence changed.

---

## Producing the final ranking

Present as a table with every candidate service scored against the five gates, not just a top pick. State plainly which services were **disqualified and why** (targetability, competition, season, value, or assets), and which survived to a final tier. Group survivors into something like:

- **Run now** — passes all five gates, ideally has assets ready
- **Run soon** — good service, missing one asset (e.g. photos) that can be sourced quickly
- **Do not run on this budget** — fails competition or targetability gate, however good the product/margin

Always separate the "what the data supports" ranking from any "what would be nice to also sell" wishlist — don't let upsell potential quietly override a gate failure.
