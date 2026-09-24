# Campaign Build

Structural decisions to get right before the campaign is ever activated.

---

## 1. Structure — don't fragment a small budget

On a limited daily budget, prefer **one campaign, one ad set, multiple ads inside it** over multiple ad sets. Ads inside one ad set do not split the budget between themselves — the platform allocates spend toward whichever is performing, which is a free, automatic test. Multiple ad sets on a small budget each get too little signal to exit the learning phase and effectively compete against each other in the same auction (overlap), wasting spend on self-competition rather than reach.

Split into a second ad set only when there's a genuinely different audience, objective, or geography that shouldn't share a budget pool — not merely to organise different services or creatives.

## 2. Targeting — verified, not reused blindly

- Confirm the **radius/centre** decision from `references/location-and-audience.md` is reflected exactly
- Confirm **age range** matches who can actually afford/decide on the product, not a wide default
- Confirm **location type** is `home` only, unless there's a specific reason to include travellers/recent visitors
- Confirm any **exclusions** are current — verified example: Meta **removed detailed-targeting exclusions entirely** on a phased timeline through 2024–2025, and any ad set still relying on them **stops delivering after 15 January 2026**. Meta's own stated reason: median cost per conversion ran **22.6% lower** without them. Any old setup or note that says "exclude interest X" is describing a mechanism that no longer exists — use a Custom Audience exclusion instead. See `references/failure-modes.md` § 17
- Confirm the **interest stack** matches what actually exists (from `references/service-selection.md` Gate 1) — don't request an interest that doesn't resolve, and re-check even a previously-working interest: Meta periodically **consolidates narrow interest categories into broader groupings**, so an old targeting spec can silently reference something that no longer exists as its own item
- Check current default settings the platform may auto-apply — **Advantage+ detailed targeting is on by default**, not opt-in, and expands the interest layer beyond what's explicitly selected whenever Meta judges it will improve results. Decide deliberately whether to keep it or disable it, especially on an account with a known unqualified-lead history (it's a second, less visible source of the broad-targeting/junk-lead failure in `references/failure-modes.md` § 2 and § 18)

## 3. Optimisation goal — match it to what "good" means

The optimisation goal determines what the algorithm tries to get more of. It must match the intake's definition of a good outcome (`references/intake.md` § 8), not just the nearest-sounding platform preset.

**Real example, the root cause of an entire failed campaign:** an ad set was optimising for **phone calls with a zero-friction "Call Now" button**, and reported "quality call" as its goal metric — which optimises for call duration, not buyer intent. The result was a stream of long calls that were mostly agencies and other businesses, not customers, because the ad made contacting nearly free of friction with no qualification step at all. The fix was switching objective and destination to a qualifying landing page with a real form, not just changing ad copy.

Before finalising: ask explicitly what event the optimisation goal will chase, and whether reaching more of that event is actually the same thing as reaching more of what the client wants.

## 4. Learning phase — plan around it, don't fight it

- **Verified (Grade A, Meta's own documentation):** an ad set needs roughly **50 optimisation events within the 7 days following its last significant edit** to reliably exit the learning phase (Shops exception: 17 web purchases or 5 Meta purchases). — [Meta Business Help Center](https://www.facebook.com/business/help/112167992830700/)
- **Verified (Grade A):** minimum daily budget guidance — *"your daily budget should be at least 5 times your cost per result goal."* — [Meta Business Help Center](https://www.facebook.com/business/help/203183363050448). Check the planned daily rate against this directly: `daily budget ≥ 5 × target CPL`.
- Combining both official rules gives a useful planning formula (a synthesis, not itself an official Meta quote): `daily budget ≥ (target CPA × 50) ÷ 7`. If the real budget falls well short of this, say so to the client plainly — expect slower, noisier delivery rather than promising learning-phase stability the budget can't fund.
- Understand what edits reset learning (budget changes, targeting changes, creative changes past a certain threshold) — verify current guidance before editing a live ad set.
- **Plan not to touch the ad set for the first several days** after launch. Build this into the pacing plan explicitly, and say so to the client so an early "nothing's happening yet" doesn't trigger a premature edit that resets progress.

## 5. Tracking — verify it fires once, correctly, before spending real money

- Pixel and server-side (Conversions API) events for the same action must share a **deduplication ID** so the platform counts one conversion, not two. Two systems firing the same named event without a shared ID silently halves the reported CPL and trains optimisation on inflated numbers.
- Test in the platform's live event-testing tool before launch, not after. Confirm the intended event fires exactly once per real action.
- Send Conversions API events with the full high/medium-priority parameter set (email and click ID are high-priority; phone, external ID, birthdate, country, browser ID are medium) and check the resulting **Event Match Quality (EMQ) score** in Events Manager — a low score from partial parameters degrades both attribution accuracy and optimisation targeting, not just reporting. See `references/failure-modes.md` § 14
- Confirm the destination for lead data (email, CRM, spreadsheet) actually receives every field the campaign depends on for lead qualification — test with a real, clearly-marked test submission, and check the actual destination, not just that a success response was returned by the form handler.
- After the first ad(s) go live, check **Account Quality** and **Ad Relevance Diagnostics** for an unexpected **Special Ad Category** flag (common trigger: financing/repair-adjacent language) — a flag silently forces a 15-mile-minimum radius, locked 18–65+ age, and no exclusions. See `references/failure-modes.md` § 15–16

## 6. Anti-spam / lead-quality mechanisms, decided at build time

Don't leave lead-quality entirely to post-hoc filtering. Build qualification in from the start:
- A destination that requires real intent (a landing page with a short qualifying form) rather than the lowest-friction path (an unmoderated one-tap call button or a fully pre-filled instant form), when the client's stated problem is exactly this kind of unqualified contact
- Honeypot fields and minimum-time-to-submit checks against bot/automated submissions
- Budget/scope/service-area questions that let genuinely unqualified prospects self-select out **before** they become a lead in the client's inbox, without adding so much friction that qualified prospects also drop off — this is a balance, not a maximise-friction exercise

## 7. Kill / scale rules — set them before launch, not during

Agree numeric rules in advance so decisions during the flight are executions of a plan, not reactions to noise:
- Spend threshold at which an ad/ad-set with zero results gets killed (should be a multiple of expected CPL, not a fixed dollar figure picked at random)
- CPL threshold below which a winner is left alone, not "improved"
- Minimum number of days with zero results before touching *targeting* (rule out landing-page/technical failure first — it's usually not the targeting)
- Explicit agreement **not** to introduce fake urgency (countdown timers, fabricated discounts) under pressure to improve performance — this contradicts an honesty-based positioning and this audience segment specifically distrusts it (see `references/location-and-audience.md` § 4 for how to verify this for a specific audience)
