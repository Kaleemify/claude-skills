# Evidence Standards

How to establish that something is true before spending money on it.

---

## 1. The snippet trap

Search engines synthesise answers. The synthesis frequently contains **figures that do not appear on the page being cited.**

This is not rare. In one project, five separate figures failed this check:

| Claimed figure | Where the search attributed it | What was actually on the page |
|---|---|---|
| "$41 CPL across 7,172 leads from 82 land clearing companies, Jun 2025–Feb 2026" | An agency blog | Unsourced ranges only. **That sample size does not exist on the page** |
| "$75–$150 CPL for paver patio / hardscaping" | A marketing agency | **No cost-per-lead figures at all** |
| "~67% invalid traffic on Meta Audience Network" | A lead-quality vendor | A hypothetical illustration, explicitly not research |
| "180 deck/fence leads at $36.36" | A lead-gen company | Page returns **403** — never verifiable |
| "$21,150 / 90 leads / $218.05 CPL" | An agency | **Domain does not resolve.** Figure is uncheckable and still circulating |

**Procedure:** for any figure that will influence a decision, fetch the page and confirm the number is on it. If it is not, discard the figure and record it as rejected. Never carry an unverified number into a plan.

---

## 2. Evidence grading

Label every source. Never average across grades.

| Grade | Definition | How to treat it |
|---|---|---|
| **A** | Disclosed sample size **and** date range **and** methodology | Use for planning |
| **B** | Named source, partial methodology, or a secondary report citing a Grade-A study | Use with the caveat stated |
| **C** | Agency/vendor blog, no methodology, no sample size | Anecdote. Never the basis of a budget |
| **—** | Nothing found | Write **"NO RELIABLE DATA FOUND"** |

**A missing number is more useful than an invented one.** An honest gap can be planned around; a fabricated figure cannot.

---

## 3. Never blend channels

These are three different things and must never be averaged together:

1. **Meta ad CPL** — what it costs you to generate a lead with your own Meta spend
2. **Google Ads CPL** — different auction, different intent, routinely 3–5× higher
3. **Purchased / shared lead price** — what a marketplace charges for a lead they generated, often resold to 3–8 contractors simultaneously

Label every figure with its channel. When only Google data exists for a category, say so explicitly and use it **only as a competition proxy**, never as a Meta target.

---

## 4. Survivorship bias in case studies

Agency case studies are marketing assets. They publish the best account, never the median.

This is measurable. In one review of home-services case studies:

- Independent benchmark CPL for the category: **~$41**
- The same agencies' own published benchmark ranges: **$35–$120**
- Median CPL in their self-published case studies: **~$13**

**Agency case-study results sat roughly 3× below their own stated benchmarks.**

Compounding filters to watch for:
- Only the best account is published
- Cheap results often come from **storm/emergency demand** you cannot plan around
- Very low CPLs usually come from native lead forms with minimal qualification — and those leads are frequently worthless. One documented case: **$3,150 spent, 3 booked appointments, zero qualified opportunities**
- Undated case studies put 2019 CPLs next to current ones
- Reported spend often excludes management fees, which can shift true CPL by 30–50%

**Plan against independent benchmarks. Treat case studies as upside, never as the forecast.**

---

## 5. Verify the account, not the recollection

Clients misremember spend, dates and results — not dishonestly, just imprecisely. Always pull the truth from the API before planning.

Verify at minimum:
- **Total and daily spend** (`insights` with `time_increment=1`)
- **Days actually delivered** — often fewer than the client believes
- **Reach and frequency** — the single best diagnostic of audience sizing
- **CTR, CPC, CPM** against benchmark
- **Actual conversion actions** by type — this reveals what the campaign really optimised for

Real example: a client reported "$280 spent, about 10 days, no leads." The API showed **$309.87 over 9 days, reach 9,900, frequency 2.94, CTR 0.91%, and 9 click-to-call actions.** Those 9 calls were the spam problem the client was complaining about — the campaign had been optimised for calls, and it delivered exactly that. None of this was visible without the API.

Use `scripts/account-audit.mjs`.

---

## 6. Never invent proof

A proof claim is anything a customer could rely on: years in business, licence, insurance, warranty, certifications, review counts, ratings, project totals, response times, timelines.

**Rule:** it ships only if verified at the client's own source (their site, their documentation, or their explicit written confirmation).

Real failure: ad copy shipped reading *"Licensed & insured · 15+ years."* The client's own About page said **"10+ Years Experience"** and mentioned **no licence or insurance anywhere**. Both claims were invented by pattern-matching what contractor ads usually say.

**If it cannot be verified:**
- Leave it out entirely, or
- Use a clearly-marked `[[PLACEHOLDER — needs client confirmation]]`, and
- Add it to a blocking-items list that must be cleared before launch

Never ship a soft version ("licensed and insured" with nothing behind it) as a compromise.

---

## 7. Verify the fix, not the proxy

A success response is not proof that the right thing happened.

Real failure: a contact form was changed to send to a new email address. A test submission returned `{"status":"success"}` and the fix was declared done. The status only meant *mail was sent* — not *to whom*. Emails were still going to the old address.

**Rule:** verify the actual outcome, at the destination.
- Email routing → check the inbox that should receive it
- Tracking → check Events Manager, not just that the code is on the page
- Deployment → re-download the file and compare hashes
- Page rendering → open it and look at it

---

## 8. Capturing corrections

When the user identifies a mistake, that correction is worth more than any research. Handle it like this:

1. **Fix the immediate problem first.**
2. **Extract the general lesson** — what class of mistake was this, not just this instance?
3. **Ask the user** whether it should be added to the skill, and name the file you would put it in.
4. **Only after explicit approval**, edit the reference file and commit.

Never add a learning silently. Never guess the destination file. A skill that accumulates unreviewed edits becomes untrustworthy, and an untrustworthy skill is worse than none.

**Wording that works:**
> "That's a real mistake and I've fixed it. The general lesson looks like: *[lesson]*. Should I add that to `references/[file].md` in the skill, or leave it out?"
