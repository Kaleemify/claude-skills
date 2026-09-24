# Pre-Flight Checklist

Run through this immediately before activating any campaign or increasing its budget. Every line should be checked against a real, current source — not recalled from earlier in the conversation.

---

## Numbers
- [ ] Total spend to date pulled from the API (not from memory or client recollection)
- [ ] Days actually elapsed pulled from the API
- [ ] Remaining budget computed from the above, not assumed
- [ ] Proposed daily rate × proposed remaining days checked against remaining budget — flagged and corrected if they don't match
- [ ] Daily budget checked against expected CPL (daily budget should comfortably exceed expected CPL, not sit below it)

## Location & audience
- [ ] Radius/centre decision tested against real delivery-estimate figures, not assumed
- [ ] Platform's radius cap confirmed (not silently hitting a zero-estimate wall)
- [ ] Sub-region income/demographic homogeneity checked — large radii verified on both/all sides, not assumed uniform
- [ ] Projected frequency computed for the flight (`(budget ÷ CPM × 1000) ÷ audience size`) and confirmed reasonable, not left unchecked
- [ ] Location type (`home` vs including travellers) deliberately chosen, not left on default

## Service selection
- [ ] Every candidate service checked for a real, resolving interest/targeting option — not assumed to exist because it's a common term
- [ ] Local audience size at the finalised radius checked per service, not just nationally
- [ ] Seasonal/weather deliverability checked per service against the actual flight dates
- [ ] Average job value sourced per service, ideally region-specific
- [ ] Asset readiness (photos, proof, landing page) checked per service before committing budget to it

## CPL & claims
- [ ] Every CPL figure graded (A/B/C) and labelled by channel (Meta vs Google vs purchased-lead)
- [ ] Any headline CPL figure re-verified at its actual source page, not taken from a search snippet or secondary citation
- [ ] Survivorship bias caveat applied to any agency case-study figures
- [ ] No invented proof claims (years, licence, insurance, warranty, review counts) anywhere in creative or landing pages — every claim traced to a verified source or explicitly placeholdered

## Campaign structure
- [ ] Budget not fragmented across more ad sets than the daily spend can realistically support through learning
- [ ] Optimisation goal matches what the client actually wants more of — explicitly checked, not assumed from the nearest-sounding preset
- [ ] Targeting exclusions and options confirmed current against the platform (not reused from an old, possibly-deprecated setup — detailed-targeting exclusions specifically no longer exist as a mechanism; non-compliant ad sets stop delivering after 15 Jan 2026)
- [ ] Advantage+ detailed targeting deliberately kept on or switched off, not left on default without a decision
- [ ] Ad copy checked for financing/repair-adjacent language that could trigger an unintended Special Ad Category flag (forces 15-mile-minimum radius, locked 18–65+ age, no exclusions)
- [ ] Kill/scale rules agreed and written down before launch, with numeric thresholds

## Tracking
- [ ] Pixel and server-side (Conversions API) events share a deduplication ID for the same real-world action
- [ ] Event firing tested in the platform's live event-testing tool before spending real budget
- [ ] Conversions API sent with the full high/medium-priority parameter set; Event Match Quality score checked in Events Manager, not assumed good
- [ ] Lead-destination test: a real, clearly-marked test submission sent and confirmed received, with every field intact, at the actual destination (inbox/CRM) — not inferred from a form's success response
- [ ] Account Quality / Ad Relevance Diagnostics checked after first delivery, not only when something visibly breaks

## Funnel
- [ ] Ad-to-landing-page message match checked for every distinct ad creative running, not just one
- [ ] CTA wording identical across ad, button, and confirmation
- [ ] Primary CTA and enough context to act on it verified to fit within the first mobile viewport, measured on a real render
- [ ] Landing page has no navigation or exits other than the intended conversion action
- [ ] Lead-qualification fields present, and the specific field most correlated with job cost is asked early
- [ ] Anti-bot mechanics in place (honeypot, minimum-time check)
- [ ] Service-area mismatch flags rather than rejects a submission

## Communication
- [ ] Any budget/timeline mismatch communicated to the client explicitly, in writing, before it becomes a surprise
- [ ] Success metric for this flight (leads/appointments vs closed jobs) agreed with the client before launch, especially on a short trial
- [ ] Any structural channel risk (e.g. Meta's demand-generation lag vs a short deadline) stated plainly, not hidden in a footnote
