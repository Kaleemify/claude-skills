# claude-skills

Personal [Claude Code](https://claude.com/claude-code) skills.

## Skills

### `web-quality`
Build and verify websites so obvious layout, responsive, and interaction
defects never ship.

- `SKILL.md` — core doctrine and workflow
- `references/build-rules.md` — rules that prevent defects while building
- `references/inspection-protocol.md` — 6-step protocol to find defects afterwards
- `scripts/audit.mjs` — automated probe harness (needs Playwright)

Run the probes:

```bash
node scripts/audit.mjs --base http://localhost:8000 --interactive
```

### `meta-ads-strategist`
Plan, research, build and audit Meta/Facebook ad campaigns for any business
like a professional performance marketer — intake first, then verified
research on location, audience, service selection, CPL and budget, before
anything is built or spent.

- `SKILL.md` — core workflow and the five gates that stop money being wasted
- `references/intake.md` — what to establish before any research starts
- `references/evidence-standards.md` — how to verify a figure instead of trusting a snippet
- `references/location-and-audience.md` — testing radius/centre against the API, audience psychology
- `references/service-selection.md` — the 5-gate process for choosing what to advertise
- `references/cpl-and-budget.md` — sourcing CPL, grading it, and budget-arithmetic checks
- `references/multi-source-cpl-research.md` — the mandatory procedure for real-world CPL research when no official Meta benchmark exists: 15–20 sources ideally (10 fallback, 5 floor), eight source types to work through, verification and averaging method
- `references/campaign-build.md` — structure, targeting, optimisation goal, tracking, kill rules
- `references/creative-and-funnel.md` — message match, offer, proof, lead qualification
- `references/preflight-checklist.md` — final check before a campaign spends money
- `references/failure-modes.md` — diagnosed failure mechanisms with real detection signatures
- `scripts/account-audit.mjs` — pulls verified spend/reach/frequency/targeting from the Meta API

Needs `META_ACCESS_TOKEN` and `META_AD_ACCOUNT_ID` in the environment:

```bash
node scripts/account-audit.mjs                 # verified lifetime spend/reach/frequency
node scripts/account-audit.mjs --daily          # day-by-day CTR decay check
node scripts/account-audit.mjs --adsets         # what's actually live right now
node scripts/account-audit.mjs --interest "patio"   # is this service even targetable?
node scripts/account-audit.mjs --estimate --lat 38.71 --lng -77.80 --radius 30 \
     --interests 6003226176485,6003341788530 --age-min 35 --age-max 65
```

### `device-consistent-design`
Keep a website's typography, spacing, layout, components, media, and
performance consistent within every device tier — from ~350px small
mobile up through large mobile, tablet, and desktop — and scaling
deliberately between tiers, whether building a new page, extending an
existing one, or repairing a site that has drifted. Checks not just
whether values are consistent, but whether they're actually appropriate,
evidence-based rather than by feel.

- `README.md` — plain-language explanation of what this skill is, why it
  exists, and every quality it's built for (documentation only — not read
  during a task)
- `SKILL.md` — the always-loaded core: the consistency-vs-appropriateness
  principle, the ask/proceed/silent judgment rule, the explicit-conflict
  protocol, and the working method
- `references/design-system-checklist.md` — evidence-based appropriateness
  evaluation, the five device tiers, the real-content inventory step, the
  full typography/spacing/component checklist, situational guidance, and
  drift-recognition patterns
- `references/accessibility-and-media.md` — contrast, keyboard nav,
  screen-reader semantics, reflow/zoom, and responsive media-loading
  efficiency
- `references/seo-and-verification.md` — technical SEO/Core Web
  Vitals/Lighthouse factors built in from the start, and the
  code-level-first verification method
- `references/cross-session-and-reporting.md` — keeping design decisions
  consistent across sessions on the same project, and the structured
  findings-report format

Reference files are read on demand, not preloaded — a narrow, single-element
fix only costs the ~2,150-word `SKILL.md` plus whichever one file is
relevant, while a full build or site-wide audit reads everything.

## Install on another machine

```bash
git clone https://github.com/Kaleemify/claude-skills.git ~/.claude/skills
```

If `~/.claude/skills` already exists, clone elsewhere and copy the skill
folders into it instead.
