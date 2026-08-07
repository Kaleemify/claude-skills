#!/usr/bin/env node
/**
 * web-quality audit harness.
 *
 * Detects the layout/responsive defect classes that a page-level
 * `scrollWidth > clientWidth` check cannot see:
 *   - content clipped by an overflow container
 *   - text overflowing or overlapping its neighbours
 *   - content trapped behind fixed/sticky chrome
 *   - scroll containers whose content is unreachable
 *   - orphaned grid items in the final row
 *   - columns too narrow to read
 *   - sub-minimum touch targets
 *   - adjacent sections colliding at the seam
 *   - backgrounds unintentionally inset from the viewport edge
 *
 * Usage:
 *   node audit.mjs --base http://localhost:8000
 *   node audit.mjs --base http://localhost:8000 --pages index.html,about.html
 *   node audit.mjs --base http://localhost:8000 --widths 360,768,1440 --interactive
 *   node audit.mjs --base http://localhost:8000 --json report.json
 *
 * This is a floor, not a ceiling. A clean report says nothing about spacing
 * quality, visual hierarchy, or whether the design reads as intended — those
 * require the visual, interactive, seam, and reasonable-person passes in
 * references/inspection-protocol.md.
 */

import { writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const argv = process.argv.slice(2);
const arg = (name, fallback = null) => {
  const i = argv.indexOf(`--${name}`);
  return i !== -1 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : fallback;
};
const flag = (name) => argv.includes(`--${name}`);

const BASE = (arg('base', 'http://localhost:8000')).replace(/\/$/, '');
const WIDTHS = (arg('widths', '360,390,768,1024,1440')).split(',').map(Number);
const SHORT_HEIGHT = Number(arg('short-height', 640));
const MAX_PAGES = Number(arg('max-pages', 25));
const INTERACTIVE = flag('interactive');
const JSON_OUT = arg('json');
const TOUCH_MAX_WIDTH = 900;   // below this, emulate a touch device
const MIN_TAP = 44;            // px
const MIN_PROSE_COL = 150;     // px — narrower than this, prose is unreadable

/* ------------------------------------------------------------------ */
/* Playwright resolution                                               */
/* ------------------------------------------------------------------ */
let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  try {
    const require = createRequire(`${process.cwd()}/`);
    ({ chromium } = require('playwright'));
  } catch {
    console.error(
      'Playwright not found.\n' +
      '  npm i -D playwright && npx playwright install chromium\n' +
      '  (or run this script from a project that already has it)'
    );
    process.exit(2);
  }
}

/* ------------------------------------------------------------------ */
/* In-page probes                                                      */
/* ------------------------------------------------------------------ */
const PROBES = () => {
  const MIN_TAP = 44, MIN_PROSE_COL = 150;
  const out = [];
  const vw = document.documentElement.clientWidth;
  const vh = window.innerHeight;

  const path = (el) => {
    if (!el || el === document.body) return 'body';
    const id = el.id ? `#${el.id}` : '';
    if (id) return el.tagName.toLowerCase() + id;
    const cls = typeof el.className === 'string' && el.className.trim()
      ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.')
      : '';
    const parent = el.parentElement;
    const idx = parent ? [...parent.children].filter(c => c.tagName === el.tagName).indexOf(el) : 0;
    return `${el.tagName.toLowerCase()}${cls}${idx > 0 ? `:nth(${idx})` : ''}`;
  };
  const add = (severity, type, el, detail) =>
    out.push({ severity, type, el: path(el), detail });

  const cs = new Map();
  const style = (el) => {
    let s = cs.get(el);
    if (!s) { s = getComputedStyle(el); cs.set(el, s); }
    return s;
  };
  const visible = (el) => {
    const s = style(el);
    if (s.display === 'none' || s.visibility === 'hidden' || +s.opacity === 0) return false;
    const r = el.getBoundingClientRect();
    if (r.width <= 0.5 || r.height <= 0.5) return false;
    // Deliberately parked off-screen (skip links, screen-reader-only text).
    if (r.bottom <= 0 || r.right <= 0 || r.left >= vw) return false;
    if (s.clipPath === 'inset(50%)' || (s.clip && s.clip !== 'auto')) return false;
    return true;
  };
  const isMedia = (el) => /^(IMG|PICTURE|VIDEO|CANVAS|SVG|IFRAME)$/.test(el.tagName);
  // Cropping media with overflow:hidden is a deliberate, ubiquitous pattern.
  // Only flag a clipping container when the clipped content includes text.
  const clipsOnlyMedia = (el) => {
    const kids = [...el.children].filter(visible);
    if (!kids.length) return false;
    return kids.every(k => isMedia(k) || (k.children.length && [...k.children].every(isMedia)));
  };
  const hasOwnText = (el) =>
    [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim().length > 1);

  const all = [...document.body.querySelectorAll('*')].filter(el => {
    const t = el.tagName;
    return t !== 'SCRIPT' && t !== 'STYLE' && t !== 'NOSCRIPT' && t !== 'BR' && visible(el);
  });

  /* 1. page-level horizontal overflow ------------------------------- */
  const de = document.documentElement;
  if (de.scrollWidth - de.clientWidth > 2) {
    let worst = null, max = 0;
    for (const el of all) {
      const r = el.getBoundingClientRect();
      if (r.right > max) { max = r.right; worst = el; }
    }
    add('blocker', 'page-overflow', worst || document.body,
      `page scrolls horizontally by ${Math.round(de.scrollWidth - de.clientWidth)}px; furthest edge at ${Math.round(max)}px vs viewport ${vw}px`);
  }

  /* 2. content clipped by an overflow container ---------------------- */
  /*    overflow:hidden + content wider/taller than the box = amputated */
  for (const el of all) {
    const s = style(el);
    const clipX = (s.overflowX === 'hidden' || s.overflowX === 'clip');
    const clipY = (s.overflowY === 'hidden' || s.overflowY === 'clip');
    if (clipX && el.scrollWidth - el.clientWidth > 2 && el.clientWidth > 0 && !clipsOnlyMedia(el)) {
      add('blocker', 'clipped-x', el,
        `content is ${Math.round(el.scrollWidth - el.clientWidth)}px wider than its box and overflow-x is ${s.overflowX} — the excess is unreachable. Use overflow-x:auto if it should scroll, or let it wrap/shrink.`);
    }
    if (clipY && el.scrollHeight - el.clientHeight > 4 && el.clientHeight > 24 && !clipsOnlyMedia(el)) {
      const tag = el.tagName;
      if (tag !== 'HTML' && tag !== 'BODY') {
        add('major', 'clipped-y', el,
          `content is ${Math.round(el.scrollHeight - el.clientHeight)}px taller than its box and overflow-y is ${s.overflowY} — the excess is unreachable. Allow the height to grow or make it scrollable.`);
      }
    }
  }

  /* 3. scroll container that cannot actually be scrolled ------------- */
  for (const el of all) {
    const s = style(el);
    if (s.overflowY === 'auto' || s.overflowY === 'scroll') {
      if (el.scrollHeight - el.clientHeight > 4 && el.clientHeight >= vh - 2) {
        // scrollable and taller than viewport — fine, just note if it's a panel
      }
    }
    // a panel taller than the viewport with no scroll mechanism at all
    const isPanel = /nav|menu|drawer|dialog|modal|overlay|panel|flyout/i.test(el.className || '') ||
                    el.getAttribute('role') === 'dialog';
    if (isPanel && visible(el)) {
      const r = el.getBoundingClientRect();
      const scrollsSelf = ['auto', 'scroll'].includes(s.overflowY);
      if (r.height > vh + 4 && !scrollsSelf) {
        let ancestorScrolls = false;
        for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
          if (['auto', 'scroll'].includes(style(p).overflowY)) { ancestorScrolls = true; break; }
        }
        if (!ancestorScrolls) {
          add('blocker', 'panel-taller-than-viewport', el,
            `panel is ${Math.round(r.height)}px tall vs ${vh}px viewport with no scrollable ancestor — the lower portion cannot be reached. Bound it with max-height and overflow-y:auto.`);
        }
      }
    }
  }

  /* 4. sibling text elements overlapping ---------------------------- */
  const textEls = all.filter(el => hasOwnText(el) && el.getBoundingClientRect().height < vh);
  const byParent = new Map();
  for (const el of textEls) {
    const p = el.parentElement;
    if (!p) continue;
    if (!byParent.has(p)) byParent.set(p, []);
    byParent.get(p).push(el);
  }
  for (const [, sibs] of byParent) {
    for (let i = 0; i < sibs.length; i++) {
      for (let j = i + 1; j < sibs.length; j++) {
        const a = sibs[i].getBoundingClientRect(), b = sibs[j].getBoundingClientRect();
        const ox = Math.min(a.right, b.right) - Math.max(a.left, b.left);
        const oy = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        if (ox > 4 && oy > 4) {
          add('blocker', 'text-overlap', sibs[i],
            `overlaps sibling ${path(sibs[j])} by ${Math.round(ox)}x${Math.round(oy)}px — text is colliding.`);
        }
      }
    }
  }

  /* 5. text escaping its parent's content box ----------------------- */
  for (const el of textEls) {
    const p = el.parentElement;
    if (!p) continue;
    const ps = style(p);
    if (ps.overflowX !== 'visible') continue;   // clipping is reported by probe 2
    const pr = p.getBoundingClientRect(), r = el.getBoundingClientRect();
    const padL = parseFloat(ps.paddingLeft) || 0, padR = parseFloat(ps.paddingRight) || 0;
    const overRight = r.right - (pr.right - padR);
    const overLeft  = (pr.left + padL) - r.left;
    if (overRight > 2 || overLeft > 2) {
      add('major', 'escapes-parent', el,
        `extends ${Math.round(Math.max(overRight, overLeft))}px beyond its parent's content box (${path(p)}).`);
    }
  }

  /* 6. content permanently trapped behind bottom-pinned chrome ------- */
  /*    Content passing *under* fixed chrome while scrolling is normal.  */
  /*    The defect is content still covered once the page is scrolled    */
  /*    fully to the bottom — i.e. no space was reserved for the bar.    */
  /*    Only runs in the bottom-scrolled pass (window.__wqAtBottom).     */
  if (window.__wqAtBottom) {
    const bottomBars = all
      .filter(el => style(el).position === 'fixed')
      .filter(el => {
        const r = el.getBoundingClientRect();
        return r.width > vw * 0.4 && r.height > 8 && r.bottom >= vh - 4;
      });
    for (const bar of bottomBars) {
      const br = bar.getBoundingClientRect();
      const barZ = +style(bar).zIndex || 0;
      for (const el of all) {
        if (bar.contains(el) || el.contains(bar)) continue;
        if (!hasOwnText(el) && !isMedia(el) && !/^(A|BUTTON)$/.test(el.tagName)) continue;
        const r = el.getBoundingClientRect();
        if (r.height > vh * 0.9) continue;
        const oy = Math.min(r.bottom, br.bottom) - Math.max(r.top, br.top);
        const ox = Math.min(r.right, br.right) - Math.max(r.left, br.left);
        if (oy > 6 && ox > 6 && (+style(el).zIndex || 0) <= barZ) {
          add('blocker', 'trapped-behind-fixed-chrome', el,
            `is still covered by ${path(bar)} with the page scrolled fully to the bottom (overlap ${Math.round(ox)}x${Math.round(oy)}px) — it can never be read. Reserve scroll-container space equal to the bar's height, measured at runtime if the bar can wrap to a second line.`);
        }
      }
    }
  }

  /* 7. orphaned grid items in the final row ------------------------- */
  for (const el of all) {
    const s = style(el);
    if (s.display !== 'grid' && s.display !== 'inline-grid') continue;
    const tracks = s.gridTemplateColumns.split(' ').filter(t => t && t !== 'none').length;
    if (tracks < 2) continue;
    const items = [...el.children].filter(visible);
    if (items.length <= tracks) continue;
    const remainder = items.length % tracks;
    if (remainder === 0) continue;
    const lastRow = items.slice(items.length - remainder);
    const rowLeft = Math.min(...lastRow.map(i => i.getBoundingClientRect().left));
    const rowRight = Math.max(...lastRow.map(i => i.getBoundingClientRect().right));
    const box = el.getBoundingClientRect();
    const leftGap = rowLeft - box.left, rightGap = box.right - rowRight;
    if (Math.abs(leftGap - rightGap) > 24) {
      add('minor', 'grid-orphan', el,
        `${items.length} items in ${tracks} columns leaves ${remainder} in the final row, aligned to one side (gaps ${Math.round(leftGap)}px vs ${Math.round(rightGap)}px). Centre the trailing items, span them, or pick a column count that divides evenly.`);
    }
  }

  /* 8. columns too narrow to read ----------------------------------- */
  for (const [parent, sibs] of byParent) {
    if (sibs.length < 2) continue;
    const ps = style(parent);
    if (!/flex|grid/.test(ps.display)) continue;
    const rows = new Map();
    for (const el of sibs) {
      const top = Math.round(el.getBoundingClientRect().top / 8) * 8;
      if (!rows.has(top)) rows.set(top, []);
      rows.get(top).push(el);
    }
    for (const [, row] of rows) {
      if (row.length < 2) continue;
      for (const el of row) {
        const w = el.getBoundingClientRect().width;
        const txt = el.textContent.trim();
        if (w < MIN_PROSE_COL && txt.length > 25) {
          add('major', 'column-too-narrow', el,
            `is ${Math.round(w)}px wide beside ${row.length - 1} sibling(s) while holding ${txt.length} characters — collapse to a single column at this width.`);
          break;
        }
      }
    }
  }

  /* 9. touch targets ------------------------------------------------ */
  if (vw <= 900) {
    const interactive = all.filter(el =>
      /^(A|BUTTON|SUMMARY)$/.test(el.tagName) ||
      (el.tagName === 'INPUT' && !/hidden/i.test(el.type)) ||
      el.getAttribute('role') === 'button');
    for (const el of interactive) {
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) continue;
      if (r.width < MIN_TAP - 2 || r.height < MIN_TAP - 2) {
        add('minor', 'small-touch-target', el,
          `tap area is ${Math.round(r.width)}x${Math.round(r.height)}px, below the ~${MIN_TAP}px minimum.`);
      }
    }
  }

  /* 10. adjacent sections colliding at the seam --------------------- */
  const sections = [...document.querySelectorAll('section, article > div, main > div')].filter(visible);
  for (let i = 0; i < sections.length - 1; i++) {
    const a = sections[i], b = sections[i + 1];
    if (a.contains(b) || b.contains(a)) continue;
    const ar = a.getBoundingClientRect(), br = b.getBoundingClientRect();
    if (br.top < ar.bottom - 2) continue;
    const gap = br.top - ar.bottom;
    if (gap > 4) continue;
    const lastMedia = [...a.querySelectorAll('img, picture, video')].filter(visible).pop();
    const firstMedia = [...b.querySelectorAll('img, picture, video')].filter(visible)[0];
    if (!lastMedia || !firstMedia) continue;
    const lr = lastMedia.getBoundingClientRect(), fr = firstMedia.getBoundingClientRect();
    if (fr.top - lr.bottom < 6) {
      add('major', 'section-seam-collision', b,
        `media at the top of this section sits ${Math.round(fr.top - lr.bottom)}px below media at the bottom of the previous one — they read as a single broken image. Add separation or alternate the stacking order.`);
    }
  }

  /* 11. background unintentionally inset from the viewport edge ------ */
  const bodyBg = style(document.body).backgroundColor;
  for (const el of sections) {
    const s = style(el);
    const bg = s.backgroundColor;
    const hasOwnBg = bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent' && bg !== bodyBg;
    const hasBgImg = s.backgroundImage && s.backgroundImage !== 'none';
    if (!hasOwnBg && !hasBgImg) continue;
    const r = el.getBoundingClientRect();
    const inset = Math.min(r.left, vw - r.right);
    if (inset > 4 && r.width > vw * 0.5) {
      add('minor', 'inset-background', el,
        `carries its own background but is inset ${Math.round(inset)}px from the viewport edge, leaving a strip of page background beside it. Move the max-width constraint to an inner wrapper so the background can span full width.`);
    }
  }

  return out;
};

/* ------------------------------------------------------------------ */
/* Crawl + run                                                         */
/* ------------------------------------------------------------------ */
async function discoverPages(page) {
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  const links = await page.evaluate((base) =>
    [...document.querySelectorAll('a[href]')]
      .map(a => a.href)
      .filter(h => h.startsWith(base))
      .map(h => h.replace(base, '').split('#')[0].split('?')[0])
      .filter(h => h && !/\.(pdf|jpg|jpeg|png|webp|svg|zip|mp4)$/i.test(h)),
    BASE);
  return [...new Set(['/', ...links])].slice(0, MAX_PAGES);
}

const browser = await chromium.launch();
const findings = [];
const consoleIssues = [];

const ctxPlain = await browser.newContext();
const scout = await ctxPlain.newPage();

let pages;
const pagesArg = arg('pages');
if (pagesArg) {
  pages = pagesArg.split(',').map(p => (p.startsWith('/') ? p : '/' + p));
} else {
  try { pages = await discoverPages(scout); }
  catch (e) {
    console.error(`Could not reach ${BASE} — is the dev server running?\n${e.message}`);
    process.exit(2);
  }
}
await scout.close();

console.log(`web-quality audit\n  base:   ${BASE}\n  pages:  ${pages.length}\n  widths: ${WIDTHS.join(', ')}\n`);

for (const width of WIDTHS) {
  const touch = width <= TOUCH_MAX_WIDTH;
  const ctx = await browser.newContext({
    viewport: { width, height: touch ? SHORT_HEIGHT : 900 },
    hasTouch: touch,
    isMobile: touch,
    deviceScaleFactor: 1,
  });
  for (const path of pages) {
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(String(e.message).slice(0, 200)));
    page.on('response', r => {
      if (r.status() >= 400) errs.push(`${r.status()} ${r.url().split('/').pop()}`);
    });
    try {
      await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(250);

      let issues = await page.evaluate(PROBES);

      // Second pass scrolled fully to the bottom: the only position at which
      // "content trapped behind bottom-pinned chrome" is distinguishable from
      // content merely scrolling underneath it.
      await page.evaluate(() => {
        window.__wqAtBottom = true;
        window.scrollTo(0, document.documentElement.scrollHeight);
      });
      await page.waitForTimeout(350);
      const atBottom = await page.evaluate(PROBES);
      const seenTop = new Set(issues.map(i => i.type + i.el));
      for (const i of atBottom) {
        if (i.type === 'trapped-behind-fixed-chrome' || !seenTop.has(i.type + i.el)) issues.push(i);
      }
      await page.evaluate(() => { window.__wqAtBottom = false; window.scrollTo(0, 0); });

      if (INTERACTIVE) {
        // Expand every collapsed disclosure, then re-probe: defects inside
        // closed panels are invisible to a default-state scan.
        await page.evaluate(() => {
          document.querySelectorAll('[aria-expanded="false"]').forEach(el => {
            try { el.click(); } catch {}
          });
          document.querySelectorAll('details:not([open])').forEach(d => { d.open = true; });
        });
        await page.waitForTimeout(500);
        const after = await page.evaluate(PROBES);
        const seen = new Set(issues.map(i => i.type + i.el));
        for (const i of after) {
          if (!seen.has(i.type + i.el)) issues.push({ ...i, detail: i.detail + ' [in an expanded/open state]' });
        }
      }

      for (const i of issues) findings.push({ ...i, page: path, width });
      if (errs.length) consoleIssues.push({ page: path, width, errs: [...new Set(errs)].slice(0, 6) });
    } catch (e) {
      findings.push({ severity: 'blocker', type: 'page-load-failed', el: '-', detail: e.message.split('\n')[0], page: path, width });
    }
    await page.close();
  }
  await ctx.close();
  process.stdout.write(`  scanned ${width}px\n`);
}
await browser.close();

/* ------------------------------------------------------------------ */
/* Report                                                              */
/* ------------------------------------------------------------------ */
const RANK = { blocker: 0, major: 1, minor: 2 };
const groups = new Map();
for (const f of findings) {
  const key = `${f.severity}|${f.type}|${f.el}`;
  if (!groups.has(key)) groups.set(key, { ...f, widths: new Set(), pages: new Set() });
  groups.get(key).widths.add(f.width);
  groups.get(key).pages.add(f.page);
}
const rows = [...groups.values()].sort((a, b) =>
  RANK[a.severity] - RANK[b.severity] || b.pages.size - a.pages.size);

console.log(`\n${'='.repeat(72)}\n${rows.length} distinct issue(s) across ${pages.length} page(s)\n${'='.repeat(72)}`);

if (!rows.length) {
  console.log('\nNo probe-detectable defects.');
} else {
  let last = '';
  for (const r of rows) {
    if (r.severity !== last) { console.log(`\n── ${r.severity.toUpperCase()} ──`); last = r.severity; }
    const pl = [...r.pages];
    console.log(`\n[${r.type}] ${r.el}`);
    console.log(`  ${r.detail}`);
    console.log(`  widths: ${[...r.widths].sort((a, b) => a - b).join(', ')}px`);
    console.log(`  pages (${pl.length}): ${pl.slice(0, 5).join(', ')}${pl.length > 5 ? ` +${pl.length - 5} more` : ''}`);
    if (pl.length > 2) console.log(`  ! appears on ${pl.length} pages — fix at the shared component/token level`);
  }
}

if (consoleIssues.length) {
  console.log(`\n── CONSOLE / NETWORK ──`);
  for (const c of consoleIssues.slice(0, 12)) console.log(`  ${c.page} @${c.width}px: ${c.errs.join(' | ')}`);
}

console.log(`\n${'-'.repeat(72)}`);
console.log('These probes are a FLOOR. They cannot judge spacing quality, visual');
console.log('hierarchy, imagery, or whether the design reads as intended. Run the');
console.log('visual, interactive, seam, and reasonable-person passes in');
console.log('references/inspection-protocol.md before reporting the site as clean.');

if (JSON_OUT) {
  writeFileSync(JSON_OUT, JSON.stringify(
    rows.map(r => ({ ...r, widths: [...r.widths], pages: [...r.pages] })), null, 2));
  console.log(`\nJSON written to ${JSON_OUT}`);
}

process.exit(rows.some(r => r.severity === 'blocker') ? 1 : 0);
