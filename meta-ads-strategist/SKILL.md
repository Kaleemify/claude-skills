---
name: meta-ads-strategist
description: Plan, research, build and audit Meta (Facebook/Instagram) ad campaigns for any business the way a professional performance marketer would — intake first, then verified research on location, audience, service selection, CPL and budget, before anything is built or spent. Use when asked to run, plan, fix, audit or improve Meta/Facebook/Instagram ads; to choose which service or product to advertise; to pick targeting, radius or audience; to diagnose why a campaign is failing or wasting money; or to build ad creative and landing pages for paid traffic. Prevents the specific mistakes that burn budget: unverified numbers, wrong location centre, untargetable services, audiences too small or too broad, budget arithmetic errors, broken tracking and unqualified leads.
---

# Meta Ads Strategist

Run paid campaigns the way a professional does: **research first, verify everything, then spend.**

---

## The one rule that matters

> **A number you did not open the page to check is not a number.**
> **An account fact you did not pull from the API is not a fact.**

Every expensive mistake in this discipline starts the same way — a plausible figure that nobody checked.

This is not caution for its own sake. In real engagements this rule has caught, in a single project:

- **Five separate fabricated statistics** that appear in search-result snippets but **do not exist on the pages they are attributed to** — including a "$41 CPL across 7,172 leads from 82 companies" sample size that simply isn't on the page, and a "$75–$150 hardscaping CPL" on a page containing no CPL figures at all.
- A client-stated budget position (**"$280 spent, 10 days"**) that the API showed was **$309.87 over 9 days** — and a plan to spend **$900 of a remaining $690**.
- A "10+ years, licensed and insured" claim written into ad copy where the business's own site said **10 years and mentioned no licence or insurance at all**.

None of those were malicious. All of them would have cost money.

**Corollary — never invent proof.** No years in business, review counts, certifications, licences, guarantees, project totals or statistics unless verified at the client's own source. If it can't be verified, it doesn't ship. Use a clearly-marked `[[PLACEHOLDER]]` instead.

See `references/evidence-standards.md` for the verification procedure.

---

## Never skip intake

Do not research, plan, or build anything until the brief is real. Ask for what's missing — do not assume it.

Minimum viable intake (full version in `references/intake.md`):

1. **Goal** — what does success actually mean, and by when? Leads? Booked appointments? Sales?
2. **Budget** — total, daily, and **how much is already spent**
3. **Deadline** — is this a trial, a season, an ongoing program?
4. **Business** — full list of services/products offered, with average job value for each
5. **Location** — where they are based, and how far they will actually travel to serve
6. **Assets** — real photos, reviews, licence/insurance details, existing website/landing pages
7. **Ad account access** — needed to verify history rather than trust recollection
8. **What "a good lead" means to them** — and what a bad one looks like

⚠️ **The client's numbers are a starting hypothesis, not data.** Verify spend, dates, reach and results against the API before planning around them.

---

## The workflow

Work in this order. Each stage can invalidate the next — doing them out of order wastes the work.

| # | Stage | Reference | Gate before moving on |
|---|---|---|---|
| 1 | **Intake** | `references/intake.md` | Goal, budget, deadline and asset inventory are written down |
| 2 | **Account audit** | `scripts/account-audit.mjs` | Real spend, reach, frequency, CTR, CPC pulled from the API |
| 3 | **Location & radius** | `references/location-and-audience.md` | Geo tested against real audience estimates, not assumed |
| 4 | **Audience & psychology** | `references/location-and-audience.md` | Who lives there, income, what they value, how they buy |
| 5 | **Service selection** | `references/service-selection.md` | Chosen on targetability + CPL + margin + season, not on preference |
| 6 | **CPL & budget model** | `references/cpl-and-budget.md` + `references/multi-source-cpl-research.md` | Expected CPL sourced — from real-world multi-source research when no official benchmark exists, never left unresearched; budget arithmetic checked; projection stated |
| 7 | **Campaign build** | `references/campaign-build.md` | Structure, targeting, optimisation goal, learning-phase reality |
| 8 | **Creative & funnel** | `references/creative-and-funnel.md` | Message match, landing page, lead qualification |
| 9 | **Pre-flight** | `references/preflight-checklist.md` | Every item verified before a cent is spent |
| 10 | **Read & iterate** | `references/failure-modes.md` | Kill/scale rules agreed *in advance* |

---

## Five gates that stop money being wasted

These are the checks most often skipped. Each one has burned a real budget.

### Gate 1 — Can this service even be targeted?

Before any CPL discussion, check whether Meta has a usable interest for it, and how big the local audience is. **Query the API — do not assume.**

Real example: of 14 services a contractor offered, **five had no Meta interest at all** (excavating, driveways, fountains, log homes, chinking). Advertising them means going fully broad — and broad targeting is the single biggest documented driver of junk leads. The service was disqualified before CPL ever mattered.

### Gate 2 — Is the geographic centre right?

Do not centre the radius on the client's address by reflex. Centre it on **where the money is**, within a distance they will actually travel.

Real example: a business centred its 45-mile radius on its own village. **~40% of that circle was mountains and national forest**, and the western half sat in $67k–$97k median-income counties while the eastern half was $130k–$182k. Re-centring east cut the area, raised audience density **1.8×**, and kept every prospect within a serviceable drive.

Also verify the platform limits — **Meta caps custom-location radius at 50 miles**; beyond that the estimate returns zero.

### Gate 3 — Does the budget arithmetic actually work?

Multiply it out. Every time.

Real example: a plan to run **$45/day for 20 days = $900** against **$690.13 remaining**. That is a 30% overspend that would have gone dark seven days before the end of a trial month — the worst possible moment.

Also check the daily budget against expected CPL. **A daily budget below your expected CPL cannot produce one conversion a day**, and delivery becomes erratic.

### Gate 4 — Is the audience the right size?

Both directions kill campaigns:

- **Too small** → frequency climbs, creative burns out, CTR falls. Real example: **$310 spent reaching only 9,900 people at frequency 2.94 in nine days** — CTR fell from 1.16% to 0.72% as the audience burned out.
- **Too broad** → junk leads, which is the documented top cause of low lead quality.

Compute projected frequency before launch: `(budget ÷ CPM × 1000) ÷ audience size`. If it exceeds ~2 over the flight, the audience is too small.

### Gate 5 — Is the channel right for this purchase at all?

**Meta is demand generation. Google is demand capture.** Published close rates: Google 25–45%, Facebook 10–25%. Meta campaigns take 2–4 weeks to build momentum and reach people who will buy **within 30–90 days**.

If the client needs closed jobs inside 20 days, say so plainly at the start and agree the success metric — leads and booked appointments — **before** the money is spent, not after.

---

## Working principles

**Research over assumption.** Every recommendation traces to a source or an API call. **"No official benchmark exists" is never the end of a CPL question** — Meta doesn't publish service- or location-level CPL data, so its absence is where `references/multi-source-cpl-research.md` starts, not where the research stops. Only after that procedure is genuinely run and exhausted does "NO RELIABLE DATA FOUND" become an honest answer rather than a shortcut — and when it is, say so: a missing number honestly arrived at is far more useful than an invented one.

**Grade your evidence.** Not all sources are equal. Label them: **A** = disclosed sample size, date range and methodology · **B** = named source, partial methodology · **C** = agency blog, no methodology. Never blend grades into one average.

**Separate the channels.** Meta CPL, Google Ads CPL and purchased/shared lead prices are three different numbers. Mixing them produces nonsense. Label every figure with its channel.

**Beware survivorship bias in case studies.** Agencies publish their best account, never their median. Measured in one review: agency case-study CPLs sat roughly **3× below the same agencies' own published benchmark ranges**. Plan against independent benchmarks; treat case studies as upside.

**Lead quality beats lead volume.** The goal is qualified leads, not maximum leads. Deliberate friction that filters out unqualified traffic — published price ranges, budget and scope questions, service-area checks — is a feature. Losing a lead who could never afford the job is a win, not a loss.

**Own mistakes immediately and correct the record.** When research contradicts an earlier recommendation, say so plainly, explain what changed, and update the plan. A recommendation defended past its evidence is how budgets die.

**Confirm before anything outward-facing.** Publishing pages, activating campaigns, sending test submissions to a client's real inbox, pushing to a repository — ask first.

---

## When the user corrects you

Corrections are the highest-value input in this skill. When the user identifies a mistake:

1. Fix the immediate problem.
2. Ask whether the lesson should be added to this skill — **and where**.
3. Only after explicit approval, update the relevant reference file and commit.

Never add a learning silently, and never guess which file it belongs in. See `references/evidence-standards.md` § "Capturing corrections".
