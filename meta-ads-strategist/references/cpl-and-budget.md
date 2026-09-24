# CPL Research & Budget Modelling

How to arrive at a defensible expected-CPL figure, and how to turn it into a budget plan that doesn't silently fail.

---

## 1. Sourcing CPL — in priority order

1. **The account's own verified history**, if a campaign has already run (see `scripts/account-audit.mjs`). This is always the best available number — it's this business, this geography, this audience, this creative quality.
2. **Grade-A category benchmarks** — a named study with disclosed sample size and date range, for the closest matching category (e.g. "Home & Home Improvement" for a hardscaping business, if no more specific Grade-A data exists). Re-verify the actual figure at source yourself; don't take a secondary citation's word for it.
3. **Grade-B figures**, used with the stated caveat, only when no Grade-A data exists for the category.
4. **The multi-source real-world research procedure — mandatory before concluding no service-level data exists.** Meta does not publish official service-level or location-level CPL data; that absence is the *start* of this step, not the end of the research. Run the full procedure in `references/multi-source-cpl-research.md` — it defines the source-count ladder (15–20 sources ideally, 10 as fallback, 5 as an absolute floor), the eight source-type categories to work through before concluding a search has failed, and how to compute and report a defensible average from what's found. **Do not report "no data exists" on the strength of one search engine and two or three blocked/empty sources** — that procedure exists specifically because that shortcut has happened before and produced a false negative.
5. Only once step 4 has genuinely been run and exhausted — not skipped — treat its output (a verified multi-source average, or a documented, method-by-method "genuinely nothing found") as the answer. If it comes back empty, fall back to the nearest Grade-A category umbrella figure with that caveat stated.

## 2. Never blend channels

Meta CPL, Google CPL, and purchased/shared-lead prices are different numbers from different mechanisms. When only Google or shared-lead data exists for a category, present it labelled as a **competition proxy**, not as a Meta forecast. See `references/evidence-standards.md` § 3.

## 3. Adjust for geography, honestly

**Verified: no published city/county/DMA-level Meta CPM or CPL data exists, anywhere.** This was checked directly — Meta itself does not publish a state/DMA breakdown, and no third-party benchmark provider (checked: AffectGroup, Triple Whale, Clouted, WordStream) segments Meta cost data below the national level. A state-level ranking exists for Google Ads CPC (WordStream), but that's a different channel and must not be used as a Meta proxy (see § 2 above).

**Do not invent a geographic or income-based multiplier.** A commonly-cited "$35 CPL for affluent audience targeting" case study was checked directly at its source page and the figure **was not on the page** — another instance of the snippet trap. The directional claim that narrower/wealthier/more-competitive audiences cost more is mechanistically plausible (more advertiser competition for the same inventory) but **no source anywhere quantifies it.**

**What to actually do instead:**
- State plainly that no location-specific Meta CPM/CPL benchmark exists for this market
- Use the national Grade-A category benchmark as the planning anchor
- Adjust only on the mechanism-level factors that *are* verifiable — audience density (`references/location-and-audience.md` § 1), and confirmed seasonal effects (Q4 CPM is measurably higher — see `references/failure-modes.md` § 12) — never on an invented percentage

## 4. Build the budget model — check the arithmetic every time

This is the single most common real mistake: a rate and a duration that don't fit the remaining budget.

```
1. Get verified total spend so far, from the API (not memory)
2. Compute verified remaining budget = total budget − verified spend
3. Take the proposed daily rate × proposed remaining days
4. Compare directly against verified remaining budget
5. If they don't match, say so explicitly and present corrected options
```

**Real example:** a plan for **$45/day × 20 days = $900** was checked against a verified remaining balance of **$690.13** — a **$209.87 shortfall**. At the proposed rate the budget would exhaust on day 15, seven days before the intended end date, in the final week of a trial month — the worst possible time to go dark. The fix was presented as two explicit, costed options (shorter flight at the preferred rate, vs a lower daily rate to hit the original end date), with a recommendation and the reasoning for it, not a silent adjustment.

## 5. Check the daily budget against expected CPL

A daily budget below the expected CPL cannot reliably produce even one conversion per day — delivery becomes thin and erratic rather than smooth. Compare `daily budget ÷ expected CPL` — if that's meaningfully below 1, flag it and discuss raising the daily rate (shortening the flight) rather than stretching an inadequate daily amount across more days.

## 6. State the projection as a range, honestly

Do not present a single-point lead-volume promise. Model at least: current/measured CPC (if history exists) and the benchmark CPC, translated into a leads range using a benchmark conversion rate and a "better landing page" optimistic rate. Show the arithmetic, not just the conclusion, so the client can see how the range was built.

**Also translate leads into business value**, using a published/typical close-rate range for the channel and the service's real job value — this is usually the number that actually matters to the client, not the CPL in isolation. State this as a range too, and be explicit that it's a model, not a promise.

## 7. State the structural channel mismatch if it exists

Meta is generally a demand-*generation* channel; a meaningful share of leads it generates are from people who are not yet at the point of buying and may convert weeks later, not immediately. If the client's timeline is short, this is a real structural risk to their expectations, not just an execution risk — say so before the campaign runs, and propose the metric the trial should actually be judged on (e.g. leads and booked appointments, not closed jobs) so it's agreed before the money is spent, not disputed after.
