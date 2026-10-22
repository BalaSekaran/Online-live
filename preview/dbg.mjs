import { chromium } from "/opt/npm-tools/node_modules/playwright/index.mjs";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const p = await (await b.newContext({ viewport: { width: 375, height: 900 }, reducedMotion: "reduce" })).newPage();
await p.goto("http://127.0.0.1:4321/index.html"); await p.waitForTimeout(300);
console.log(await p.evaluate(() => {
  const out = [];
  document.querySelectorAll("body *").forEach(el => { const r = el.getBoundingClientRect(); if (r.right > innerWidth + 0.5) out.push(el.tagName + "|" + String(el.className).slice(0, 80) + "|" + r.right.toFixed(1)); });
  const inp = [...document.querySelectorAll("input")].filter(i => i.getBoundingClientRect().width < 44).map(i => i.name + ":" + i.type + ":" + i.closest("section,div[role=dialog]")?.getAttribute("aria-labelledby"));
  return { out: out.slice(0, 15), inp };
}));
await b.close();
