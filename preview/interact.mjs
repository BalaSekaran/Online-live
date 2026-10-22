import { chromium } from "/opt/npm-tools/node_modules/playwright/index.mjs";
const S = "/tmp/claude-0/-home-claude/28987067-2a41-56dd-804f-a1ca3885d8b3/scratchpad/shots";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const out = [];
for (const [w, h] of [[1440, 900], [320, 700]]) {
  const p = await (await b.newContext({ viewport: { width: w, height: h } })).newPage();
  const errs = []; p.on("pageerror", e => errs.push(e.message)); p.on("console", m => { if (m.type() === "error" && !m.text().includes("404")) errs.push(m.text()); });
  await p.goto("http://127.0.0.1:4321/index.html"); await p.waitForTimeout(900);
  await p.screenshot({ path: `${S}/hero-${w}.png` });
  // Modal
  const hdr = p.locator("header button", { hasText: "Apply Now" });
  await hdr.click(); await p.waitForTimeout(150);
  const dlg = await p.locator('[role=dialog]').count();
  const focused = await p.evaluate(() => document.activeElement?.getAttribute("name"));
  await p.locator('[role=dialog] button[type=submit]').click(); await p.waitForTimeout(100);
  const invalid = await p.locator('[role=dialog] [aria-invalid=true]').count();
  await p.screenshot({ path: `${S}/modal-${w}.png` });
  await p.fill('[role=dialog] input[name=name]', "Test User");
  await p.fill('[role=dialog] input[name=email]', "test@example.com");
  await p.fill('[role=dialog] input[name=phone]', "9876543210");
  await p.selectOption('[role=dialog] select[name=profession]', "Student");
  await p.locator('[role=dialog] button[type=submit]').click(); await p.waitForTimeout(150);
  const alertTxt = await p.locator('[role=dialog] [role=alert]').textContent().catch(() => null);
  await p.keyboard.press("Escape"); await p.waitForTimeout(150);
  const dlgAfter = await p.locator('[role=dialog]').count();
  const back = await p.evaluate(() => document.activeElement?.textContent?.trim());
  const overflow = await p.evaluate(() => document.body.style.overflow);
  out.push({ w, modalOpened: dlg, firstFocus: focused, invalidOnEmptySubmit: invalid, noEndpointMsg: alertTxt?.slice(0, 60), closedOnEsc: dlgAfter === 0, focusReturnedTo: back, scrollUnlocked: overflow === "" });
  // Tabs + accordion
  await p.locator("#curriculum").scrollIntoViewIfNeeded();
  await p.locator('button[role=tab]', { hasText: "AI Modules" }).click();
  const aiPanel = await p.locator("#panel-ai").isVisible();
  await p.locator('button[role=tab]', { hasText: "Core Modules" }).click();
  await p.locator('button[aria-controls="mod-6"]').click();
  const m6 = await p.locator("#mod-6").isVisible();
  await p.locator('button[aria-controls="faq-3"]').click();
  const f3 = await p.locator("#faq-3").isVisible();
  // Anchors
  const anchorTops = {};
  if (w === 1440) for (const id of ["curriculum", "journey", "projects", "pricing", "faqs"]) {
    await p.locator(`header a[href="#${id}"]`).click(); await p.waitForTimeout(900);
    anchorTops[id] = await p.evaluate((id) => Math.round(document.getElementById(id).getBoundingClientRect().top), id);
  }
  // Reveal state after scrolling through
  for (let y = 0; y < 30000; y += 600) { await p.evaluate(y => window.scrollTo({ top: y, behavior: "instant" }), y); await p.waitForTimeout(40); }
  await p.waitForTimeout(800);
  const hidden = await p.evaluate(() => [...document.querySelectorAll(".reveal")].filter(e => getComputedStyle(e).opacity < 0.5).length);
  const notInView = await p.evaluate(() => [...document.querySelectorAll('[data-inview="false"]')].map(e => e.getAttribute("aria-labelledby")));
  const bar = await p.evaluate(() => { const el = document.querySelector("[inert], .fixed.inset-x-0.bottom-0"); return el ? getComputedStyle(el).transform : null; });
  out.push({ w, aiTab: aiPanel, module6Opens: m6, faqOpens: f3, anchorTops, revealStillHidden: hidden, sectionsNeverInView: notInView, mobileBarTransform: bar, errors: errs });
  if (w === 1440) { await p.evaluate(() => document.getElementById("journey").scrollIntoView()); await p.evaluate(() => window.scrollBy(0, 500)); await p.waitForTimeout(500); await p.screenshot({ path: `${S}/journey-live.png` }); }
}
console.log(JSON.stringify(out, null, 1));
await b.close();
