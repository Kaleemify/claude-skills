# Intake

Do not research, plan, or build anything until this is answered. Ask for what's missing — assumptions here compound into every later stage.

Not every field needs its own question to the user — infer what you reasonably can from context, and only ask about what genuinely can't be inferred or verified another way (an ad account, a website, a prior conversation).

---

## 1. Goal — what does success actually mean?

- Leads? Booked appointments? Phone calls? Closed sales? Brand awareness?
- **By when**, specifically — a date, not "soon"
- Is this a **trial** with a go/no-go decision at the end? What does the client need to see to continue funding it?
- What happens if it fails — is this the agency's only shot with this client?

**Why it matters:** "get more leads" and "get 2 closed jobs by August 24 or the client stops paying" require completely different risk tolerance, budget pacing and honesty about what the channel can deliver in the time available.

## 2. Budget — verified, not recalled

- **Total budget**, daily budget if already decided
- **How much has already been spent** — get this from the ad account API, not from memory. See `scripts/account-audit.mjs`
- **How many days have actually elapsed** — same, verify against the API
- Compute remaining budget yourself: `total − verified spend`. Do not accept a client's remembered remaining figure without checking

**Why it matters:** a remembered "$280 spent" was verified at **$309.87** in one real case — a small gap, but the resulting daily-budget plan overspent the true remaining balance by 30%.

## 3. Deadline & pacing

- Fixed end date, or open-ended?
- Given verified remaining budget and target daily spend, **does the arithmetic actually reach the deadline?** Multiply it out: `daily budget × days remaining` vs `budget remaining`. State the mismatch plainly if there is one, and give the corrected options.

## 4. The business — full service/product list

- Every service or product they want considered, not just the obvious ones
- **Average job/order value for each** — this is what makes a CPL meaningful. A $41 CPL is cheap for a $9,000 job and expensive for a $200 one
- Which ones the business is actually equipped to deliver right now (capacity, licensing, materials, crew)

## 5. Location

- Where the business is physically based
- **How far they will actually travel to serve a customer** — do not assume the business's own address is the right ad centre. See `references/location-and-audience.md`
- Any areas to explicitly exclude (out of state, high-cost/low-fit zones)

## 6. Assets — what already exists

- Real project photos (how many, what quality, which services covered)
- Reviews — how many, where, can more be requested
- Licence, insurance, certifications — do these exist and can they be verified at the client's own source
- Existing website / landing pages — are they dedicated funnels or general service pages
- Warranty terms, guarantees — real ones, not assumed ones

**Why it matters:** every proof claim in ad copy or on a landing page must trace to something in this list. See `references/evidence-standards.md` § 6.

## 7. Ad account access

- Get read access to the actual Meta Ads Manager account if a campaign already exists
- Never plan around a client's description of past performance — verify it

## 8. What "a good lead" means to this client

- What does a bad lead look like to them specifically? (Spam, competitors, wrong service area, wrong budget tier, job seekers, marketing agencies pretending to be customers)
- Is there a documented history of lead-quality problems? What caused it? (Often traceable to optimisation goal, CTA friction, or audience — see `references/failure-modes.md`)

---

## Output of this stage

A short written brief covering all eight points above, with every recalled number replaced by a verified one. Do not proceed to research until this exists.
