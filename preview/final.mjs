import { chromium } from "/opt/npm-tools/node_modules/playwright/index.mjs";
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
for (const w of [1440, 375]) {
  const p = await (await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: "reduce", deviceScaleFactor: w === 375 ? 2 : 1 })).newPage();
  await p.goto("http://127.0.0.1:4321/index.html"); await p.waitForTimeout(500);
  await p.addStyleTag({ content: "[inert]{display:none!important}" });
  await p.screenshot({ path: `/home/claude/online-fullstack-${w === 1440 ? "desktop-1440" : "mobile-375"}.png`, fullPage: true });
}
await b.close();
