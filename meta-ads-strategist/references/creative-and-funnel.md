# Creative & Funnel

Ad creative and the landing page are one system, built for the specific audience identified in `references/location-and-audience.md` — never generic templates.

---

## 1. Message match, end to end

The chain must hold without a gap:

```
Audience psychology → Location → Problem → Ad creative → Ad copy →
Offer → Landing page hero → Proof → CTA
```

Ask, concretely, before writing anything:
- What exactly will this person see in the ad?
- Why would *they specifically* click, given the psychology research from `references/location-and-audience.md`?
- What does the very first thing they see on the landing page need to confirm, within seconds, so they don't bounce? (Right service, right area, right problem, why trust this business, what to do next)

If two ad concepts create different expectations (e.g. one shows an aspirational outcome, one shows a relatable problem), the landing page must satisfy **both** in its opening section — don't build a page that only matches one of the ads running against it.

## 2. The offer — chosen from psychology, not habit

Don't default to "Free Estimate" or "Contact Us." Derive the offer from what this specific audience is actually afraid of or wants resolved, using the intake and location research:

- If the buyer's dominant fear is *being pressured/oversold* (common in categories with a documented reputation for aggressive sales tactics), an offer that explicitly promises the opposite — a stated time limit, a written price, no high-pressure follow-up — is often stronger than a generic "free consultation."
- If the buyer's dominant fear is *quality/structural risk* (common in physical build categories), an offer built around expertise and diagnosis ("we'll tell you honestly whether it's a repair or a full rebuild") out-converts a generic price-quote offer.
- If the buyer's need is *urgent and worried* (e.g. visible structural damage), the offer and page order should lead with **self-diagnosis** (help them understand severity) before price — that's what they actually came for.

Keep the exact CTA wording **identical** across ad, button, and landing page confirmation. Any drift there is measurable, avoidable conversion loss.

## 3. Real, honest urgency only

Urgency must be true, or it should not exist. A genuine physical/seasonal deadline (materials that can't be installed below a temperature threshold, a real capacity constraint) is a legitimate and often the *most* persuasive urgency mechanism — it doesn't need dramatizing. A fabricated countdown or "today only" discount is the opposite: it actively damages trust with an audience already primed to distrust manipulative sales tactics, and it should never be used as a substitute for real urgency just because none currently exists.

## 4. Proof — never invented, always labelled

Apply `references/evidence-standards.md` § 6 without exception. If real project photos, reviews, or credentials don't exist yet:
- Leave the section out entirely, or
- Use a clearly-marked placeholder, and
- Track it as a blocking item for launch, communicated to the client explicitly

AI-generated or stock imagery is acceptable for **mood/problem illustration only** (e.g. an ad showing an aspirational outcome or a relatable problem scene), and must never be presented as the business's own completed work. A "before/after" or "our work" claim requires a real photo of real work — no exceptions, because a customer who shows up expecting to see "that exact project" and finds it doesn't exist destroys trust immediately.

## 5. Lead qualification built into the funnel, not bolted on after

- Multi-step forms (a few short steps rather than one long form) generally outperform single long forms on completion, while still collecting the same qualifying data — verify current conversion-rate research for the specific claim before quoting a number.
- Ask the field that's the **actual primary cost driver** for this specific service early (e.g. square footage for a flooring job, height for a retaining wall, count for a window job) — this single field usually matters more for triage than a generic "message" box.
- A budget-range question is a deliberate trade: published research shows it typically *reduces* raw form completion somewhat while *raising* the qualification rate of who does complete it. State this trade explicitly to the client rather than presenting it as a free win — it is chosen because the goal is qualified leads, not maximum volume.
- Never make a service-area mismatch a hard rejection at the form level — flag it for the client's triage instead. A zip-code checker with an incomplete area list can otherwise silently reject genuinely serviceable, high-value leads. Build the area list generously and always give an "we'll confirm" fallback rather than a flat no for anything not on the list.
- Anti-bot mechanics (honeypot field, minimum time-to-submit) belong in the form itself, invisibly, not as user-facing friction.

## 6. Technical delivery of the funnel

- No AI-image "look" in imagery meant to represent the business's real work — see `references/evidence-standards.md`. Photography-specific guidance (camera/lens details, deliberate imperfections, avoiding symmetric/oversaturated defaults) belongs in a project-specific prompt file, not this reference.
- Mobile-first build: verify the **primary CTA and enough context to act on it fit inside the first mobile viewport** — this is the single screen every paid-traffic visitor is guaranteed to see. Test this by measuring actual element position on a real rendered page at common mobile widths, not by assuming a design "should" fit.
- A dedicated paid-traffic landing page should generally have **no site navigation and no links off the page** other than the conversion action — it's a closed funnel, not a website page. Every additional exit is a leak.
- See the `web-quality` skill (if installed) for the full responsive-build and verification discipline — render every page at multiple real widths and drive every interactive element, don't just author CSS and assume it's correct.
