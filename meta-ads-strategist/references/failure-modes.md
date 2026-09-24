# Why Meta Campaigns Fail — Diagnosis Procedures

For each failure mode: what actually goes wrong, how to detect it from real account data, and how to prevent it. Use `scripts/account-audit.mjs` to pull the raw numbers referenced here.

Where a specific numeric threshold has been independently verified against a primary source, it's stated with that source. Where it hasn't, that's marked explicitly — don't state an invented number as if it were sourced.

---

## 1. Audience too small — frequency burn

**Mechanism:** a small audience relative to budget forces the platform to show the same ad to the same people repeatedly. Engagement drops as novelty wears off; cost per result rises over the flight even with nothing else changing.

**Diagnostic (verified from a real account):**
```
Reach:      9,900 people
Frequency:  2.94×
Spend:      $309.87 over 9 days
CTR:        started 1.16%, fell to 0.72% by day 9
Leads:      0
```
The CTR decline over the flight, alongside a small reach and climbing frequency, is the signature of this failure — not a creative problem, an audience-size problem. Confirm by checking whether CTR decline correlates with rising frequency (it will, in this failure mode) rather than being flat/noisy (which points elsewhere).

**Verified threshold (Grade A — Meta's own research):** Meta's internal data-science team ("Analytics at Meta") published a study finding conversion likelihood drops **~45% by the 4th exposure** to the same creative, decaying roughly as `(N+1)^-0.43`. There is no "wear-in" period for direct-response objectives — cost per result rises monotonically from the first repeat exposure. Methodology: 30-day observational analysis plus a 7-day experimental split-test across ~26,000 cases. Published 2023-05-10. — [Analytics at Meta, Medium](https://medium.com/@AnalyticsAtMeta/creative-fatigue-how-advertisers-can-improve-performance-by-managing-repeated-exposures-e76a0ea1084d)

The popular "frequency 2.5–3 is the danger zone" rule of thumb circulating in practitioner blogs has **no disclosed methodology or Meta attribution** when checked at source — treat it as folklore, not benchmark. Plan against the exposure-count figure above instead.

**Prevention:** compute projected frequency *before* launch — `(budget ÷ CPM × 1000) ÷ audience size` — using either the account's own historical CPM or a benchmark if no history exists. See `references/location-and-audience.md` § 2 for the full procedure and for how to fix it by re-centring/widening geography rather than just raising budget.

## 2. Audience too broad — junk leads

**Mechanism:** very broad targeting (age + location only, or platform-default broad expansion) lets the algorithm show ads to people with no real connection to the offer. Documented as a leading driver of low-quality form submissions.

**Diagnostic:** high lead volume with low qualification rate; a disproportionate share of leads from clearly mismatched profiles (wrong service area, obviously irrelevant messages, job-seekers, other businesses).

**Prevention:** don't default to broad just because a specific interest doesn't exist for a service — treat that as a disqualifying signal for the service instead (see `references/service-selection.md` Gate 1), and build qualification into the funnel itself (see `references/creative-and-funnel.md` § 5) rather than relying on targeting alone to filter quality.

## 3. Wrong optimisation goal

**Mechanism:** the algorithm optimises hard for whatever event is selected — if that event isn't actually correlated with a good outcome, the campaign will get very efficient at producing the wrong thing.

**Diagnostic (verified from a real account):** an ad set optimising for phone calls, with a zero-friction "Call Now" destination and no qualifying step, produced calls efficiently — but they were predominantly other businesses and agencies, not customers. The campaign was "working" by its own metric while failing the client's actual goal completely.

**Prevention:** before launch, state explicitly what event is being optimised for and confirm out loud that getting *more* of that event is the same thing as getting more of what the client actually wants. If there's any daylight between them, change the destination/objective, not just the messaging.

## 4. Budget arithmetic errors

**Mechanism:** a proposed daily rate × remaining days doesn't match verified remaining budget, so the campaign runs out early — often at the worst possible point in a trial or seasonal window.

**Diagnostic:** always computed, never assumed. See `references/cpl-and-budget.md` § 4 for the exact procedure and a real worked example of a $209.87 shortfall this check caught.

**Prevention:** run the check every time budget or timeline changes, not just once at the start.

## 5. Budget fragmentation across ad sets

**Mechanism:** splitting a limited daily budget across multiple ad sets means each gets too little signal to ever exit the learning phase properly, and near-identical ad sets can end up competing against each other in the same auction.

**Prevention:** prefer one ad set with multiple ads inside it on a limited budget — see `references/campaign-build.md` § 1.

## 6. Tracking/attribution failures

**Mechanism:** duplicate conversion events (pixel + server-side firing the same action without a shared deduplication ID) silently halve reported CPL and corrupt what the algorithm is being trained to find more of. A "success" response from a form handler is not proof the lead reached its actual destination.

**Prevention:** see `references/campaign-build.md` § 5 and `references/evidence-standards.md` § 7 — test in the platform's live event tool, and verify the actual destination inbox/CRM with a real marked test, every time.

## 7. Invented proof / claims risk

**Mechanism:** ad copy or landing pages state something as fact (years in business, licensing, guarantees) that isn't verified against the client's own source — often because it "sounds like what these ads usually say."

**Prevention:** see `references/evidence-standards.md` § 6. Never ships without a verified source or an explicit placeholder.

## 8. Underfunded learning phase

**Mechanism (Grade A — Meta's own documentation):** an ad set needs roughly **50 optimisation events (conversions) within the 7 days following its last significant edit** to reliably exit the learning phase (Shops exception: 17 web purchases or 5 Meta purchases). Below that, delivery stays unstable and expensive — the algorithm never gets enough signal to find who converts. — [Meta Business Help Center — About the Learning Phase](https://www.facebook.com/business/help/112167992830700/)

**Related, also Grade A:** minimum daily budget guidance — *"if you use the cost per result goal bid strategy, your daily budget should be at least 5 times your cost per result goal."* Worked example on Meta's own page: a $5 target cost-per-result implies a $25/day floor. — [Meta Business Help Center — Minimum Budgets](https://www.facebook.com/business/help/203183363050448)

**Derived planning formula** (a synthesis of the two official rules above, not itself an official Meta quote — verify before quoting as Meta's own): `daily budget ≥ (target CPA × 50) ÷ 7`. At a $30 target CPL this implies roughly $214/day to feed the algorithm enough weekly signal to exit learning cleanly. A much lower daily budget can still run and produce results — it will simply take longer, less predictably, to reach stable delivery.

**Prevention:** before committing to a daily rate, check it against both the 5× rule and the 50-events-per-week proxy for the realistic expected CPL. If the daily budget can't plausibly support either, say so to the client explicitly — plan for slower, noisier delivery rather than promising learning-phase stability the budget can't fund. See `references/cpl-and-budget.md` § 5.

## 9. Judging results too early / on too little data

**Mechanism:** reacting to a handful of days or a handful of conversions as if it were a stable trend, when it's within normal noise for that sample size.

**Prevention:** agree kill/scale rules with explicit numeric thresholds *before* launch (see `references/campaign-build.md` § 7), and hold to the platform's learning-phase guidance on not editing too early. State plainly to the client, before the flight, how small the expected sample will be relative to what's needed for real statistical confidence — so a quiet first few days doesn't trigger a panic edit.

## 10. Fake urgency / manipulative tactics

**Mechanism:** fabricated scarcity or "today only" pricing, used on an audience that's primed to distrust exactly this kind of manipulative sales tactic (verify this via the psychology research in `references/location-and-audience.md` § 4), directly damages the trust the campaign is trying to build.

**Prevention:** only ever use real urgency (see `references/creative-and-funnel.md` § 3). If none currently exists, don't invent it — find another honest lever instead (proof, specificity, risk-reversal).

## 11. Channel/timeline mismatch

**Mechanism:** Meta is generally a demand-*generation* channel with a real lag between "sees ad" and "ready to buy," documented as commonly weeks, not days, for considered purchases — while Google/search is closer to demand-*capture*, catching people already searching. A short trial window judged purely on closed sales can look like failure even when lead generation itself is working normally for the channel.

**Prevention:** state this structural mismatch to the client explicitly before launch if the timeline is short, and agree the metric the trial will actually be judged on (see `references/cpl-and-budget.md` § 7).

---

## 12. Q4 seasonal CPM inflation

**Verified (Grade B — named source, partial methodology):** full-year 2025 Meta CPM averaged **$14.19** (median $13.48), up 20% year-over-year. Q4 2025 averaged **$25.49**, roughly 22% above Q1 2025, with November 2025 the peak month at $25.22. Black Friday/Cyber Monday days ran 138% above the annualised average. — [Triple Whale, 2025 Facebook Ads Benchmarks](https://www.triplewhale.com/blog/facebook-ads-benchmarks); Q4 breakout via [Clouted](https://clouted.com/blog/meta-advertising-CPM-inflation-statistics), which cites Triple Whale, Right Side Up, Sovran Benchmarks and Gupta Media by name but was verified only at the aggregator level, not independently re-checked against each underlying report.

**Not found:** isolated August/September figures, a Meta-specific (as opposed to broadcast/TV/CTV) election-year cost effect for Virginia or the DC metro, or any DC-metro/Virginia-specific Meta CPM/CPL figure of any kind. National 2026 midterm ad-spend forecasts exist ($10.4B, Kinetiq) but carry no platform breakdown — do not cite them as a Meta cost signal.

**Prevention:** if a flight crosses into Q4, budget for CPM rising toward the $20s rather than assuming a flat rate held from earlier months. Do not invent a state- or metro-specific multiplier — none is published; adjust only on directional, sourced signals (see `references/cpl-and-budget.md` § 3).

## 13. High-income / affluent-audience cost premium — unquantified

Auction mechanics make it directionally plausible that narrower, higher-income, or luxury-interest audiences draw more advertiser competition and therefore cost more — but **no source could be verified with an actual multiplier or percentage.** A frequently-cited "$35 CPL for affluent targeting" case study was checked directly at its attributed page and **the figure was not present** — another snippet-trap instance.

**Prevention:** state the directional risk to the client if relevant, but do not build a specific "+X%" adjustment into a CPL model without a real source. See `references/evidence-standards.md` § 1.

---

## 14. iOS/ATT signal loss & Conversions API quality

**Mechanism (Grade A — Meta's own documentation):** Apple's App Tracking Transparency policy prohibits certain data collection/sharing without explicit user permission, which "may limit ads personalization and performance reporting" for both app and web conversion events; SKAdNetwork caps measurable app events at 63. — [Meta — Key concepts for iOS 14 impacts](https://www.facebook.com/business/help/387440828988900)

**Official mitigation:** Aggregated Event Measurement (AEM) for web/app events outside SKAdNetwork's scope, alongside domain verification and the Conversions API. (Grade B, not independently opened at source: as of June 2025 Meta reportedly removed the old 8-prioritised-event cap under AEM — treat this specific claim as unconfirmed until checked directly.)

**Diagnostic — Event Match Quality (Grade A):** every CAPI event receives an **Event Match Quality (EMQ) score from 0–10**, driven by which customer parameters are sent — email and Click ID are high-priority; phone, external ID, birthdate, country, and browser ID are medium-priority. Meta's own language: matched events "help you attribute conversions to your ads and deliver them to people who are more likely to convert, which can result in better ad performance and lower cost per action" — i.e. **a low EMQ from missing/partial CAPI parameters degrades both attribution accuracy and optimisation targeting, not just reporting.** — [Meta — About Event Match Quality](https://www.facebook.com/business/help/765081237991954)

**NO PUBLISHED THRESHOLD** for a specific EMQ score below which optimisation is meaningfully broken — Meta states direction ("higher is better") but no numeric cutoff. Similarly, widely-repeated practitioner claims that full CAPI coverage yields "up to 2× more conversions" were **not found on Meta's own Conversions API documentation page** when checked directly and are explicitly not used here.

**Prevention:** send CAPI with the full high/medium-priority parameter set, deduplicated against the browser pixel via a shared event ID (see § 6), and check the actual EMQ score in Events Manager before trusting a campaign's reported CPL — a cheap-looking CPL on poor match quality may be under-attributing, not genuinely cheap.

## 15. Special Ad Category — housing/credit/employment miscategorisation

**Mechanism (Grade A, confirmed directly):** once an ad is flagged into a Special Ad Category, targeting is forcibly restricted:
- Location floors to a **minimum 15-mile (25 km) radius** in the US/Canada — a tighter local radius is simply not allowed
- Age is locked to a fixed **18–65+** — cannot be narrowed
- Gender must include all genders — not editable
- Most interest/behaviour detailed-targeting options become unavailable, and **exclusions of any kind are disallowed entirely**
- Advantage+ lookalike audiences become unavailable
— [Meta — About audiences for credit, employment or housing campaigns](https://en-gb.facebook.com/business/help/2220749868045706)

**Why this matters for home-improvement/financing offers specifically:** category triggers are keyword/content-based (mortgage, loan, financing, housing repair, credit terms) and can **auto-flag an ad even when the advertiser never self-declared the category** — silently collapsing a tightly-targeted local campaign into an all-genders, 15-mile-minimum, no-exclusion audience with no warning beyond a routine ad-review notice.

**Prevention:** check Account Quality / ad status after publishing any ad using financing or repair-adjacent language, for an unexpected Special Ad Category flag. If flagged: either accept the restricted-targeting reality (and re-budget for the wider, unavoidably broader audience it now implies) or rewrite the copy to remove the triggering language and resubmit.

## 16. Account/page quality and ad rejections

**Mechanism (Grade A):** ad review is automated-first and "typically completes within 24 hours, although it may take longer in some cases" — no firm SLA is published, and an ad can be **re-reviewed and pulled even after it was already approved and running.** — [Meta Transparency Center — Advertising Standards](https://transparency.meta.com/policies/ad-standards/)

**Distinct from outright rejection:** Meta separately tracks **quality-based performance throttling** for ads that don't violate policy but still underperform, diagnosed via **Ad Relevance Diagnostics** — three *relative* rankings (Quality, Engagement Rate, Conversion Rate), each scored below-average / average / above-average against competing ads for the same audience, not an absolute score. — [Meta — About Ad Relevance Diagnostics](https://www.facebook.com/business/help/403110480493160), [About Quality Ranking](https://www.facebook.com/business/help/303639570334185)

**Prevention:** check Account Quality (facebook.com/accountquality) proactively as part of routine monitoring, not only when something visibly breaks. If any of the three relevance rankings shows below-average, treat that as the diagnostic signal to fix **creative, landing page, or targeting relevance** — not as evidence of an audience-size problem, which is a different failure mode (§ 1–2).

## 17. Deprecated detailed-targeting exclusions

**Mechanism (Grade A, confirmed directly — this is a genuine, dated policy change, not folklore):** detailed-targeting **exclusions were removed entirely** on a phased timeline — for new ad sets between **29 July 2024 and 31 March 2025**, for boosted posts by **10 June 2025**, and any campaign still relying on them **stops delivering entirely after 15 January 2026.** — [Meta — Updates to Detailed Targeting](https://www.facebook.com/business/help/458835214668072)

**Meta's own stated rationale, with a real figure (Grade A, self-reported by Meta as its justification — not an independent study):** median cost per conversion was **22.6% lower** when detailed-targeting exclusions were *not* used, versus when they were.

**Also relevant:** on 23 June 2025, many detailed-interest categories (sports, film/music genres, car models, food/drink types) were **consolidated into broader groupings** — a specific narrow interest that worked in an older setup may no longer exist as its own selectable item at all.

**What still works:** Advantage+ detailed targeting (unaffected — see § 18), Custom Audience exclusions (a distinct mechanism from detailed-targeting exclusions, still functional), and a limited set of brand-protection/employment-related controls.

**Prevention:** any playbook or past-campaign notes that say "exclude interest/behaviour X at the ad-set level" describe a mechanism that **no longer exists.** The correction is a Custom Audience exclusion or Advantage+ audience controls instead. Verify current interest-search results directly (`scripts/account-audit.mjs --interest "..."`) rather than reusing an old targeting spec that may reference a since-consolidated category.

## 18. Advantage+ automatic audience broadening

**Mechanism (Grade A):** Advantage+ detailed targeting "will show your ad to additional people who we believe are likely to get you more or cheaper results... against your optimization goals." It is **on by default, not an opt-in** — it auto-enables for ad sets using detailed targeting with eligible optimisation goals whenever Meta determines it could improve performance. It does not touch location, age, or gender constraints — only the interest/behaviour layer — and is unavailable for Social Issues/Elections/Politics campaigns. — [Meta — About Advantage+ Detailed Targeting](https://www.facebook.com/business/help/128066880933676)

**Why this matters:** it is effectively a **second, less visible source of the same broad-targeting/junk-lead failure mode described in § 2** — an ad set that looks tightly interest-targeted in Ads Manager can still be quietly expanded beyond that definition by this default. **NO PUBLISHED THRESHOLD** on how much it expands reach — Meta discloses the mechanism, not a percentage or trigger condition.

**Prevention:** deliberately check and decide whether to disable Advantage+ detailed targeting for any test where clean signal on a specific interest matters, or on any account with a known unqualified-lead problem already traced to broad delivery.

---

## Pending expansion

The following failure categories are tracked for future research and are not yet backed by a specific verified source in this file — treat any specific numeric threshold for them as unverified until added here with a citation:

- **Statistical significance / minimum sample size for trusting results** — checked directly; **no official Meta page states a required conversion count or confidence level.** This is a distinct question from the § 8 learning-phase threshold (50 events/7 days is a *delivery-stability* threshold, not a *statistical-confidence* one) — don't conflate the two. Practitioner figures found ("50+", "100+ per variant", "65% confidence", "95% confidence") were inconsistent, uncited at source, and are explicitly not reported as fact here. Standard two-proportion significance testing applies in principle; no Meta-specific number exists to cite.
- **Quantified performance cost of missing/partial Conversions API coverage** — Meta's own developer documentation states no percentage figure; discard any practitioner claim of "up to Nx more conversions" from full CAPI coverage until it's checked at an authoritative source.
- **Numeric EMQ threshold** below which optimisation is measurably degraded — Meta states direction only, no cutoff (§ 14).
- **AEM's June 2025 removal of the 8-event prioritisation cap** — found only via secondary search, not yet confirmed by opening an official Meta page directly. Treat as Grade B until upgraded.
- **Minimum audience headcount** — checked directly against Meta's own "Estimated Audience Size" and "Custom Audiences" help pages; **neither states a minimum population figure.** The widely-repeated "100 people minimum" could not be confirmed on Meta's own documentation. The best verified proxy is indirect: audience size is "sufficient" only if it can plausibly sustain ~50 conversions/week at the campaign's budget and expected conversion rate (see § 8) — there is no standalone headcount threshold to cite.
- **Meta CPM by US state or DMA** — confirmed not to exist in any publicly available benchmark, Meta or third-party. Any geographic cost adjustment has to be built from mechanism-level factors (audience density, income-driven competition), not a published table.

When new research lands (via the skill's own research process, or a user correction), add it here with its source, following `references/evidence-standards.md` § 8.
