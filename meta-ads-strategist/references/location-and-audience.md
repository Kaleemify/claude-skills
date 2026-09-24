# Location, Radius & Audience Psychology

Do not centre a radius on the client's address by reflex, and do not describe "the audience" from general knowledge. Test the geography against the API and research the specific population.

---

## 1. Test geography against the API — never assume

Use the Meta Marketing API `delivery_estimate` endpoint (or Ads Manager's audience estimate) to get real numbers for every candidate configuration. Never reason about radius or targeting from a map in your head.

### What to test

1. **Multiple radii from the client's own address** — e.g. 15/25/35/45 miles — to see how audience scales
2. **Alternative centres** — is the client's address actually where the money is, or just where their office happens to be?
3. **Multi-circle / multiple-city targeting** if the business serves a spread of towns rather than one radius
4. **Zip-code-only targeting** if a small number of specific affluent towns matter more than a radius
5. **Audience density** — compute audience ÷ circle area for each candidate. A denser, smaller circle can outperform a sparse, larger one

### Platform limits to know before testing

- Meta caps custom-location radius — verify the current cap directly against the API (it has been 50 miles; confirm, don't assume it hasn't changed) — a radius request beyond the cap returns a **zero** estimate, which looks like "no audience" but is actually "invalid request"
- Location types (`home`, `recent`, `travel_in`) materially change who is counted — `home` only is usually right for a local service business; including travellers pulls in people who don't live there

### Real example — why this gate exists

A hardscaping business centred its ad radius on its own village. Testing radii on the API showed **45 miles was the practical maximum** (50+ returned zero). But testing *alternative centres* revealed the real problem: **roughly 40% of that 45-mile circle fell on mountains, national forest, and a lower-income county** on the far side from the client's real market. Re-centring on the wealthiest nearby town at a smaller radius **raised audience density by ~1.8×** while keeping every prospect within a servicable drive of the business.

**Procedure:**
1. Get exact lat/long for the client's address and for 2–3 candidate alternative centres (nearest wealthy/relevant towns)
2. Query delivery estimates for each, at 2–3 radii each
3. Compute area (πr²) and density (audience ÷ area) for each config
4. Check verified county/town-level income data for both sides of any large circle — don't assume affluence is evenly distributed (see § 3)
5. Recommend the config with the best density **and** an acceptable maximum travel distance from the business

---

## 2. Frequency math — is the audience the right size?

Before picking a final audience size, project frequency over the flight:

```
projected impressions = (budget ÷ CPM) × 1000
projected frequency   = projected impressions ÷ audience size
```

- **Too small an audience** → frequency climbs fast, creative burns out, CTR falls over the flight. One real account spent its budget reaching only **9,900 people at frequency 2.94** in nine days — CTR fell from 1.16% to 0.72% as the same people saw the ad three times each.
- **Too large an audience relative to budget** → wastes reach on people you'll show the ad to once and never again with a small budget; not itself harmful, but it's a sign the targeting could be tighter for better relevance.
- A frequency **comfortably under ~2** over the full flight is a reasonable planning target absent a more specific, sourced threshold — check `references/failure-modes.md` for the current researched figure before quoting one.

Pull actual CPM from the account's own history if one exists (`scripts/account-audit.mjs`); only fall back to a category benchmark if there's no account history yet.

---

## 3. Do not assume geography-wide homogeneity

A radius or region is never economically uniform. Verify sub-regions independently — county-level or town-level income, homeownership rate, and property values, from Census/ACS-sourced data (e.g. Data USA, Census QuickFacts, FRED), not from a general impression of "that area is rich" or "that area is rural."

**Real example:** a 45-mile radius centred on one town spanned counties with median household incomes from **$67,200 to $181,800** — a 2.7× spread. Advertising the same offer at the same price point to both ends of that spread is a mismatch; the geographic centre should weight toward where the target income band actually lives.

**Also check:** does the ad platform still offer income/wealth targeting in this country? (In the US, Meta's directly-selectable household-income behaviors were removed some years ago — verify current availability before assuming it exists.) If not, **geography is the only lever left** for reaching a specific income band, which is exactly why getting the centre and radius right matters this much.

---

## 4. Audience psychology — research the actual place, don't generalise

"Homeowners like value and trust" is not research. For the specific area:

- **What do local media / real-estate / community sources say about how this community makes decisions?** Local-business loyalty, distrust of national chains, word-of-mouth culture, price sensitivity or lack thereof — these vary enormously by region and are usually documented somewhere (local news, chamber of commerce material, real-estate blogs describing "what living here is like").
- **What do general, sourced studies say about how this income/demographic band chooses a contractor or vendor?** e.g. published research on what affluent homeowners weight most when hiring — often reputation and referrals over price. Cite the actual study, with its sample.
- **What local regulatory, climate or seasonal facts create genuine (not invented) urgency or differentiation?** Building codes, HOA/historic-district rules, weather deadlines, local pest/soil/climate conditions. These make excellent honest ad angles because a national competitor usually can't speak to them credibly.
- **What does the client's own most-relevant trust gap look like against this specific psychology?** If 70%+ of buyers in published research say referrals/reviews matter most, and the client has zero reviews, that gap is often a bigger lever than any ad targeting change. Say so plainly even if it's not what was asked.

Always cite sources for demographic and psychology claims. "Affluent, prefers local business" needs a URL behind it, the same as a CPL figure does.
