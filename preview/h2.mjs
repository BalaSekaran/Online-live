import { chromium } from "/opt/npm-tools/node_modules/playwright/index.mjs";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
for (const w of [375, 1440]) { const p = await (await b.newContext({ viewport: { width: w, height: 900 } })).newPage();
  await p.goto("http://127.0.0.1:4321/index.html"); await p.waitForTimeout(300);
  console.log(w, JSON.stringify(await p.evaluate(() => { const s = new Set(); document.querySelectorAll("section h2").forEach(h => { if (h.classList.contains("sr-only")) return; const c = getComputedStyle(h); s.add(`${c.fontSize}/${c.lineHeight}/${c.letterSpacing}/${c.fontWeight}`); }); return [...s]; }))); }
await b.close();
