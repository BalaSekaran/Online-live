import { build } from "/opt/npm-tools/node_modules/esbuild/lib/main.js";
import fs from "node:fs"; import path from "node:path";
const root = path.resolve(import.meta.dirname, "..");
const r = await build({ entryPoints: [path.join(import.meta.dirname, "entry.tsx")], bundle: true, write: false, jsx: "automatic", format: "iife", minify: true,
  alias: { "@": path.join(root, "src") }, nodePaths: ["/opt/npm-tools/node_modules"],
  define: { "process.env.NEXT_PUBLIC_APPLY_ENDPOINT": '""', "process.env.NODE_ENV": '"production"' } });
const js = r.outputFiles[0].text.replace(/<\/script/gi, "<\\/script");
const css = fs.readFileSync(path.join(import.meta.dirname, "dist/app.css"), "utf8");
const html = `<title>EMC Online Full Stack</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600;700&family=Zalando+Sans:wght@400;500;600;700&display=swap">
<style>
:root{--font-zalando:"Zalando Sans";--font-geist-mono:"Geist Mono";color-scheme:light}
${css}
/* Preview only: content is visible at rest; motion stays on interactions. */
.reveal{opacity:1!important;transform:none!important}
.container-x{padding-left:max(clamp(1rem,4vw,2rem),env(safe-area-inset-left,0px));padding-right:max(clamp(1rem,4vw,2rem),env(safe-area-inset-right,0px))}
header.sticky{top:env(safe-area-inset-top,0px)}
</style>
<div id="root"></div>
<script>${js}</script>`;
fs.writeFileSync("/home/claude/emc-online-fullstack-preview.html", html);
console.log((html.length/1024).toFixed(0)+"KB");
