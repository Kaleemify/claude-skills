#!/usr/bin/env node
/**
 * account-audit.mjs — pull verified Meta Ads account facts instead of
 * relying on recollection. See references/evidence-standards.md § 5.
 *
 * Requires a .env (or exported env vars) with:
 *   META_ACCESS_TOKEN
 *   META_AD_ACCOUNT_ID   (e.g. act_1234567890)
 *
 * Usage:
 *   node account-audit.mjs                         # lifetime summary
 *   node account-audit.mjs --daily                  # per-day breakdown
 *   node account-audit.mjs --since 2026-07-01 --until 2026-08-09
 *   node account-audit.mjs --adsets                 # current ad set targeting
 *   node account-audit.mjs --estimate --radius 45 --lat 38.77 --lng -78.10 \
 *        --interests 6003226176485,6003341788530 --age-min 35 --age-max 65
 *
 * This script only READS. It never modifies the ad account.
 */

const API_VERSION = 'v21.0';

function arg(name, fallback = undefined) {
  const i = process.argv.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const v = process.argv[i + 1];
  return v && !v.startsWith('--') ? v : true;
}

const TOKEN = process.env.META_ACCESS_TOKEN;
const ACCOUNT = process.env.META_AD_ACCOUNT_ID;

if (!TOKEN || !ACCOUNT) {
  console.error(
    'Missing META_ACCESS_TOKEN or META_AD_ACCOUNT_ID in the environment.\n' +
    'Export them or load a .env before running this script.'
  );
  process.exit(1);
}

async function graphGet(path, params = {}) {
  const url = new URL(`https://graph.facebook.com/${API_VERSION}/${path}`);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  url.searchParams.set('access_token', TOKEN);
  const res = await fetch(url);
  const json = await res.json();
  if (json.error) {
    throw new Error(`Graph API error on ${path}: ${json.error.message} (code ${json.error.code})`);
  }
  return json;
}

function money(n) {
  return '$' + Number(n).toFixed(2);
}
function comma(n) {
  return Number(n).toLocaleString('en-US');
}

// ---------------------------------------------------------------------
// Lifetime / range summary — spend, reach, frequency, CTR, CPC, CPM,
// and every action type actually recorded (so you see what the
// campaign really optimised toward, not what you assume it did).
// ---------------------------------------------------------------------
async function summary({ since, until }) {
  const params = {
    fields: 'spend,impressions,reach,frequency,clicks,cpm,cpc,ctr,actions,cost_per_action_type',
  };
  if (since && until) {
    params.time_range = JSON.stringify({ since, until });
  } else {
    params.date_preset = 'maximum';
  }

  const { data } = await graphGet(`${ACCOUNT}/insights`, params);
  if (!data.length) {
    console.log('No insights data returned for this range — check the account has delivered.');
    return;
  }
  const d = data[0];

  console.log('=== ACCOUNT SUMMARY', since ? `(${since} to ${until})` : '(lifetime)', '===');
  console.log(`Spend        ${money(d.spend)}`);
  console.log(`Impressions  ${comma(d.impressions)}`);
  console.log(`Reach        ${comma(d.reach)}`);
  console.log(`Frequency    ${Number(d.frequency).toFixed(2)}×`);
  console.log(`Clicks       ${comma(d.clicks)}`);
  console.log(`CPM          ${money(d.cpm)}`);
  console.log(`CPC          ${money(d.cpc)}`);
  console.log(`CTR          ${Number(d.ctr).toFixed(2)}%`);

  if (d.actions?.length) {
    console.log('\nActions recorded (this tells you what the campaign actually produced —\n' +
                'compare against what you THINK it was optimising for):');
    for (const a of d.actions) {
      console.log(`  ${a.action_type.padEnd(40)} ${comma(a.value)}`);
    }
  }

  console.log('\n⚠️  Frequency > ~2 over the flight is a fatigue warning sign — see');
  console.log('    references/failure-modes.md § 1. Cross-check against CTR trend with --daily.');
}

// ---------------------------------------------------------------------
// Daily breakdown — reveals CTR decay over the flight, which is the
// signature of an audience burning out (failure-modes.md § 1).
// ---------------------------------------------------------------------
async function daily({ since, until }) {
  const params = {
    fields: 'spend,impressions,clicks,ctr',
    time_increment: 1,
  };
  if (since && until) params.time_range = JSON.stringify({ since, until });
  else params.date_preset = 'maximum';

  const { data } = await graphGet(`${ACCOUNT}/insights`, params);
  if (!data.length) {
    console.log('No daily data returned.');
    return;
  }

  let total = 0;
  console.log('=== DAILY BREAKDOWN ===');
  console.log('date         spend      impr    clicks   CTR');
  for (const r of data) {
    total += Number(r.spend);
    console.log(
      `${r.date_start}   ${money(r.spend).padStart(8)}  ${comma(r.impressions).padStart(7)}  ` +
      `${String(r.clicks).padStart(6)}   ${Number(r.ctr).toFixed(2)}%`
    );
  }
  console.log(`\nDays: ${data.length}   Total spend: ${money(total)}`);

  const ctrs = data.map((r) => Number(r.ctr));
  if (ctrs.length >= 3) {
    const first = ctrs[0];
    const last = ctrs[ctrs.length - 1];
    const drop = ((first - last) / first) * 100;
    if (drop > 20) {
      console.log(
        `\n⚠️  CTR fell ${drop.toFixed(0)}% from day 1 (${first.toFixed(2)}%) to the last day ` +
        `(${last.toFixed(2)}%). Combined with a small reach, this is the audience-burnout\n` +
        `    signature — see references/failure-modes.md § 1.`
      );
    }
  }
}

// ---------------------------------------------------------------------
// Ad set targeting — surfaces exactly what's live right now, so a
// recommendation is checked against reality, not a stale memory of
// what was configured.
// ---------------------------------------------------------------------
async function adsets() {
  const { data } = await graphGet(`${ACCOUNT}/adsets`, {
    fields: 'name,status,optimization_goal,daily_budget,lifetime_budget,targeting',
    limit: 25,
  });
  if (!data.length) {
    console.log('No ad sets found on this account.');
    return;
  }
  console.log('=== AD SETS ===');
  for (const a of data) {
    const t = a.targeting || {};
    console.log(`\n--- ${a.name}  [${a.status}]  opt=${a.optimization_goal}`);
    if (a.daily_budget) console.log(`   daily_budget: ${money(a.daily_budget / 100)}`);
    console.log(`   age: ${t.age_min ?? '?'}-${t.age_max ?? '?'}`);
    const custom = t.geo_locations?.custom_locations;
    if (custom?.length) {
      for (const c of custom) {
        console.log(`   geo: lat=${c.latitude} lng=${c.longitude} radius=${c.radius}${c.distance_unit}`);
      }
      console.log(`   location_types: ${(t.geo_locations.location_types || []).join(', ') || '(all)'}`);
    }
    if (t.flexible_spec?.length) {
      for (const block of t.flexible_spec) {
        for (const [k, v] of Object.entries(block)) {
          console.log(`   interest[${k}]: ${v.map((i) => i.name || i.id).join(', ')}`);
        }
      }
    } else {
      console.log('   interests: NONE — fully broad. See failure-modes.md § 2.');
    }
  }
}

// ---------------------------------------------------------------------
// Delivery estimate — the core tool for references/location-and-audience.md.
// Query real audience size for a candidate geo + interest configuration
// instead of guessing.
// ---------------------------------------------------------------------
async function estimate() {
  const lat = arg('lat');
  const lng = arg('lng');
  const radius = arg('radius', '25');
  const unit = arg('unit', 'mile');
  const ageMin = arg('age-min', '18');
  const ageMax = arg('age-max', '65');
  const interests = (arg('interests', '') || '')
    .split(',')
    .filter(Boolean)
    .map((id) => ({ id }));
  const excludeRegionKey = arg('exclude-region'); // e.g. Meta region key to exclude

  if (!lat || !lng) {
    console.error('--lat and --lng are required for --estimate.');
    process.exit(1);
  }

  const geo_locations = {
    custom_locations: [{ latitude: Number(lat), longitude: Number(lng), radius: Number(radius), distance_unit: unit }],
    location_types: ['home'],
  };

  const targeting = {
    geo_locations,
    age_min: Number(ageMin),
    age_max: Number(ageMax),
  };
  if (interests.length) targeting.flexible_spec = [{ interests }];
  if (excludeRegionKey) {
    targeting.excluded_geo_locations = { regions: [{ key: excludeRegionKey }] };
  }

  const { data } = await graphGet(`${ACCOUNT}/delivery_estimate`, {
    optimization_goal: 'OFFSITE_CONVERSIONS',
    targeting_spec: JSON.stringify(targeting),
  });

  const d = data?.[0];
  if (!d) {
    console.log('No estimate returned — this usually means the radius exceeds the platform cap');
    console.log('(historically 50 miles for Meta custom locations — verify current limit) or the');
    console.log('targeting spec is otherwise invalid, NOT that the audience is genuinely zero.');
    return;
  }
  console.log('=== DELIVERY ESTIMATE ===');
  console.log(`lat=${lat} lng=${lng} radius=${radius}${unit} age=${ageMin}-${ageMax} interests=${interests.length}`);
  console.log(`Estimated audience: ${comma(d.estimate_mau_lower_bound)} - ${comma(d.estimate_mau_upper_bound)}`);

  const area = Math.PI * Number(radius) * Number(radius);
  const mid = (d.estimate_mau_lower_bound + d.estimate_mau_upper_bound) / 2;
  console.log(`Approx area: ${area.toFixed(0)} sq mi   Density: ${(mid / area).toFixed(0)} people/sq mi`);
  console.log('\nCompare density across multiple candidate centres/radii — see');
  console.log('references/location-and-audience.md § 1. A denser smaller circle often beats');
  console.log('a sparser larger one.');
}

// ---------------------------------------------------------------------
// Interest search — confirms a service actually has a targetable
// interest before any CPL research is wasted on it.
// ---------------------------------------------------------------------
async function interestSearch(query) {
  const { data } = await graphGet('search', {
    type: 'adinterest',
    q: query,
    limit: '8',
  });
  console.log(`=== INTEREST SEARCH: "${query}" ===`);
  if (!data.length) {
    console.log('NO INTEREST FOUND. This service likely cannot be targeted by interest —');
    console.log('see references/service-selection.md Gate 1. Broad targeting is the fallback,');
    console.log('and broad targeting is a documented driver of junk leads.');
    return;
  }
  for (const i of data) {
    console.log(`  ${i.name.padEnd(36)} id=${i.id.padEnd(18)} size=${comma(i.audience_size_lower_bound || 0)}`);
  }
}

// ---------------------------------------------------------------------
async function main() {
  const since = arg('since');
  const until = arg('until');

  if (arg('adsets')) return adsets();
  if (arg('estimate')) return estimate();
  const interestQuery = arg('interest');
  if (interestQuery) return interestSearch(interestQuery);
  if (arg('daily')) return daily({ since, until });
  return summary({ since, until });
}

main().catch((err) => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
