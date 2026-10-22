import { chromium } from "/opt/npm-tools/node_modules/playwright/index.mjs";
const S = process.env.SHOTS || "/tmp/claude-0/-home-claude/28987067-2a41-56dd-804f-a1ca3885d8b3/scratchpad/shots";
import fs from "node:fs"; fs.mkdirSync(S, { recursive: true });
const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome" });
const widths = (process.env.W || "320,360,375,414,768,1024,1440").split(",").map(Number);
const shoot = process.env.SHOOT ? process.env.SHOOT.split(",").map(Number) : [];
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  const logs = []; page.on("console", (m) => { if (["error", "warning"].includes(m.type())) logs.push(m.type() + ": " + m.text()); });
  page.on("pageerror", (e) => logs.push("pageerror: " + e.message));
  await page.goto("http://127.0.0.1:4321/index.html"); await page.waitForTimeout(400);
  const r = await page.evaluate(() => {
    const vw = innerWidth, de = document.documentElement;
    const over = [];
    const inScroller = (el) => { for (let p = el.parentElement; p; p = p.parentElement) { const cs = getComputedStyle(p); if (/(auto|scroll|hidden)/.test(cs.overflowX) && p !== document.body && p !== de) return true; } return false; };
    document.querySelectorAll("body *").forEach((el) => { const r = el.getBoundingClientRect(); if (r.width && (r.right > vw + 1 || r.left < -1) && !inScroller(el)) over.push(el.tagName + "." + String(el.className).slice(0, 60)); });
    const small = []; document.querySelectorAll("body *").forEach((el) => { if (el.childNodes.length && [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) { const fs = parseFloat(getComputedStyle(el).fontSize); if (fs < 12 && el.offsetParent) small.push(el.tagName + ":" + fs + ":" + el.textContent.trim().slice(0, 25)); } });
    const taps = []; document.querySelectorAll("a,button,select,input").forEach((el) => { const r = el.getBoundingClientRect(); if (el.offsetParent && r.width && (r.height < 43.5 || r.width < 43.5) && !el.closest("[inert]")) taps.push(el.tagName + ":" + Math.round(r.width) + "x" + Math.round(r.height) + ":" + (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 30)); });
    const anchors = [...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute("href")).filter(h => !document.getElementById(h.slice(1)));
    const wraps = [...document.querySelectorAll("button,a")].filter(b => b.className.includes("whitespace-nowrap") && b.scrollWidth > b.clientWidth + 1).map(b => b.textContent.trim());
    const ids = {}; document.querySelectorAll("[id]").forEach(e => ids[e.id] = (ids[e.id] || 0) + 1);
    return { scrollW: de.scrollWidth, vw, height: de.scrollHeight, over: [...new Set(over)].slice(0, 12), small: [...new Set(small)].slice(0, 12), taps: [...new Set(taps)].slice(0, 20), badAnchors: anchors, clipped: wraps, dupIds: Object.entries(ids).filter(([, n]) => n > 1).map(([k]) => k) };
  });
  console.log(`\n== ${w}px  scrollWidth=${r.scrollW} vw=${r.vw} height=${r.height}`);
  for (const k of ["over", "small", "taps", "badAnchors", "clipped", "dupIds"]) if (r[k].length) console.log(" ", k, JSON.stringify(r[k]));
  if (logs.length) console.log("  console:", logs.slice(0, 8));
  if (shoot.includes(w)) await page.screenshot({ path: `${S}/full-${w}.png`, fullPage: true });
  await ctx.close();
}
await browser.close();
