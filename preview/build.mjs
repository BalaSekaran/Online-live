// Bundles the page with esbuild + compiles Tailwind v4 from the same globals.css.
import { build } from "/opt/npm-tools/node_modules/esbuild/lib/main.js";
import { compile } from "/opt/npm-tools/node_modules/tailwindcss/dist/lib.mjs";
import fs from "node:fs"; import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const out = path.join(import.meta.dirname, "dist"); fs.mkdirSync(out, { recursive: true });
const NM = "/opt/npm-tools/node_modules";
await build({
  entryPoints: [path.join(import.meta.dirname, "entry.tsx")], bundle: true, outfile: path.join(out, "app.js"),
  jsx: "automatic", format: "esm", minify: false, sourcemap: false, logLevel: "warning",
  alias: { "@": path.join(root, "src") }, nodePaths: [NM],
  define: { "process.env.NEXT_PUBLIC_APPLY_ENDPOINT": JSON.stringify(process.env.EP || ""), "process.env.NODE_ENV": '"development"' },
});
// Tailwind: scan candidates from sources
const files = [];
const walk = (d) => { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name);
  if (f.isDirectory()) { if (!["node_modules", "preview", ".next"].includes(f.name)) walk(p); } else if (/\.(tsx?|css)$/.test(f.name)) files.push(p); } };
walk(path.join(root, "app")); walk(path.join(root, "src"));
const cand = new Set();
for (const f of files) { const src = fs.readFileSync(f, "utf8");
  for (const t of src.split(/[\s"'`]+/)) if (t) { cand.add(t); cand.add(t.replace(/^[{(<>]+|[})<>;,]+$/g, "")); }
  for (const t of src.split(/[\s"'`{}()<>;,]+/)) if (t) cand.add(t); }
const cssPath = path.join(root, "src/css/globals.css");
const compiler = await compile(fs.readFileSync(cssPath, "utf8"), {
  base: root,
  loadStylesheet: async (id, base) => { const p = id === "tailwindcss" ? `${NM}/tailwindcss/index.css` : path.resolve(base, id); return { path: p, base: path.dirname(p), content: fs.readFileSync(p, "utf8") }; },
});
fs.writeFileSync(path.join(out, "app.css"), compiler.build([...cand]));
fs.writeFileSync(path.join(out, "index.html"), `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Preview</title><link rel="stylesheet" href="app.css"></head><body><div id="root"></div><script type="module" src="app.js"></script></body></html>`);
console.log("built", files.length, "files,", cand.size, "candidates");
