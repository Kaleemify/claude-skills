# Multi-Source Real-World CPL Research

**Meta does not publish official CPL data broken down by service and location.** That absence is not a stopping point — it's the trigger for this procedure. When `references/cpl-and-budget.md` § 1 finds no Grade-A/B figure at the specificity needed (a service, in or near a target location), **do not report "no data" until this procedure has actually been run and exhausted.** "No official benchmark exists" and "no real-world evidence exists" are different claims — this file is how the second one gets tested honestly instead of assumed.

---

## 1. When this procedure is mandatory

Run it whenever a CPL question can't be answered from:
- The account's own verified history (always the best source — see `references/evidence-standards.md` § 5), or
- A Grade-A category benchmark with disclosed methodology (see `references/cpl-and-budget.md` § 1)

That covers most service+location combinations. **Do not skip to "NO RELIABLE DATA FOUND" just because the first search engine and the first two or three sources didn't have it.** Work through the source-type list in § 3 before concluding the well is dry.

## 2. The source-count ladder

| Target | When to use it |
|---|---|
| **15–20 verified, independent sources** | The default target. Aim here first. |
| **10 verified sources** | Acceptable fallback if 15–20 genuinely isn't reachable after working through § 3 in full. |
| **5 verified sources** | Absolute floor. Below this, state plainly that the sample is thin and treat any average as low-confidence, not a planning number. |
| **0–4 verified sources** | Only reportable as "no reliable data found" **after** every method in § 3 has actually been attempted and the attempts are listed, not merely implied. A blocked search engine or one paywalled forum is not exhaustion. |

**Independent** matters as much as the count. Fifteen posts that all reproduce the same underlying agency blog's number are one source repeated fifteen times, not fifteen sources — see § 5.

## 3. Work through source *types*, not just search results — the method ladder

A single search-engine pass finding nothing is not evidence nothing exists. Before concluding a category is empty, actively try each of these:

1. **Direct web search**, multiple phrasings (the exact service name, colloquial names, "cost per lead," "CPL," "ad spend results," "case study")
2. **Community platforms** — Reddit (r/PPC, r/FacebookAds, r/[the trade], r/smallbusiness, r/Entrepreneur), niche trade forums, Quora, Facebook public groups/pages
3. **Alternate access when the primary site is blocked or paywalled** — this is not optional to skip:
   - Alternate front-ends/mirrors for the platform (e.g. old.reddit.com, other read-only mirrors)
   - A text-rendering proxy (e.g. `r.jina.ai/<url>`) when a direct fetch is blocked
   - The Wayback Machine / web.archive.org for a paywalled or since-removed page
   - A different search engine or search operator (`site:`, quoted phrases) than the first attempt
4. **Video and audio** — YouTube (video descriptions, pinned comments, and the transcript/captions — the actual number is often spoken, not written), podcast show notes, conference talk slides
5. **Professional networks** — LinkedIn posts (marketers and agency owners routinely post real dashboard screenshots), X/Twitter threads
6. **Marketplace evidence** — Upwork/Fiverr gig descriptions and portfolio case studies from freelancers who ran these exact campaigns and disclose numbers to win work
7. **Agency case studies with disclosed spend AND lead count** — not benchmark-range blog posts (see `references/evidence-standards.md` § 1 for how to tell the difference)
8. **Adjacent/comparable geography or trade**, explicitly labelled as a substitution — see § 4

Record which of these eight were actually tried and what happened (found data / found nothing / access blocked) — this record is what makes "no data found" a verified conclusion instead of a shrug. See § 7 for the reporting format.

## 4. When the exact location has nothing — substitute deliberately, don't just widen silently

If no data exists for the precise target location, search **comparable markets** before giving up on geography entirely — and say explicitly that this is what was done:
- Same or adjacent metro area
- A different market with a similar income band, urban/rural mix, and population density
- Same service, different but genuinely comparable US region, if metro-level data doesn't exist at all

Label every substitution plainly in the output ("no [town] data found; using [comparable metro] as the nearest verified proxy, because [income/density/mix] is similar") rather than quietly presenting a different market's number as if it were local.

## 5. Verify every individual source before it counts

Apply `references/evidence-standards.md` § 1 to each one — open the actual page/post/video, don't trust a search snippet or a secondary citation. For each source record:

- Who reported it (name, handle, company — enough to tell it apart from other sources)
- The exact figure, and whether it's stated directly or has to be computed (e.g. spend ÷ leads)
- Service/trade and geography as stated by the source
- Evidence quality: a shown screenshot/dashboard beats stated spend-and-leads beats a bare assertion
- Date (undated figures from years apart shouldn't be averaged together as if contemporaneous)
- Direct URL
- **Channel** — confirm it's actually Meta ad CPL, not Google Ads, not a purchased/shared lead price (see `references/evidence-standards.md` § 3). A source that doesn't clearly state the channel doesn't count.

**Independence check:** before adding a source to the count, check whether it's actually a repost, quote, or citation of a source already in the list. Trace it back. Count the original once.

## 6. Handling outliers and internal inconsistencies

- If a source's own numbers don't add up (e.g. a stated CPL doesn't match its own stated spend ÷ leads), **flag it explicitly rather than silently picking one of the two figures.** An internally inconsistent source is a reason to trust the whole source less, not a reason to quietly average around the discrepancy.
- A number far outside the cluster of the rest isn't automatically wrong, but note *why* it might differ (e.g. a storm-response campaign, a heavily discounted intro rate, an unusually large account) rather than folding it into a plain average as if it were a normal case.

## 7. Computing and reporting the result

1. **List every verified source** in a table (the fields from § 5).
2. **State the count achieved** against the ladder in § 2 — "17 of a 15–20 target," or "8, short of the 10 fallback after exhausting § 3," etc. — so the reader knows how solid the base is, not just what the number is.
3. **Compute mean, median, and range.** Report all three — a median that differs sharply from the mean is itself informative (skew from an outlier or a small cluster).
4. **State a confidence level** tied plainly to the count and source diversity: comfortable at 15+ genuinely independent sources spanning several source types; moderate at 10–14; low at 5–9; a mean below 5 is not a benchmark, it's an anecdote cluster — label it that way.
5. **List what was tried and failed**, from § 3 — this is what separates a verified "thin data" finding from an unverified "I didn't look very hard" one.
6. **Never silently fall back to an unsourced round number** ("$50 sounds about right") if the real average comes out to something less tidy. Report what the sources actually say.

## 8. This procedure does not override the evidence standards — it operationalises them

Everything here still obeys `references/evidence-standards.md` in full: never invent a figure that isn't on a real, checked page; never blend channels; grade sources; state uncertainty honestly. This file exists because "the official data doesn't exist" was, in an earlier pass, treated as permission to stop — it isn't. It's the point at which this broader, more effortful search actually begins.
