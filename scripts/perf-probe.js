const http = require("http");

const BASE = "http://localhost:3000";
const PAGES = ["/", "/team", "/insights", "/projects", "/publications"];

function fetchTimed(url) {
  return new Promise((resolve) => {
    const start = Date.now();
    let firstByte = null;
    let bytes = 0;
    const req = http.get(url, (res) => {
      res.on("data", (chunk) => {
        if (firstByte === null) firstByte = Date.now() - start;
        bytes += chunk.length;
      });
      res.on("end", () => {
        resolve({
          url,
          status: res.statusCode,
          ttfb: firstByte,
          total: Date.now() - start,
          bytes,
          type: res.headers["content-type"] || "",
        });
      });
    });
    req.on("error", (e) => resolve({ url, error: e.message }));
    req.setTimeout(30000, () => {
      req.destroy();
      resolve({ url, error: "timeout" });
    });
  });
}

function extractAssets(html) {
  const assets = new Set();
  const reHref = /href="(\/[^"]+)"/g;
  const reSrc = /src="(\/[^"]+)"/g;
  const reImg = /\/_next\/image\?url=[^"'\s]+/g;
  let m;
  while ((m = reHref.exec(html))) assets.add(m[1]);
  while ((m = reSrc.exec(html))) assets.add(m[1]);
  while ((m = reImg.exec(html))) assets.add(m[0]);
  return [...assets].filter(
    (a) =>
      a.startsWith("/_next/") ||
      a.startsWith("/images/") ||
      a.endsWith(".js") ||
      a.endsWith(".css") ||
      a.endsWith(".jpg") ||
      a.endsWith(".png") ||
      a.endsWith(".webp") ||
      a.endsWith(".svg")
  );
}

async function probePage(path) {
  console.log("\n===", path, "===");
  const pageRes = await fetchTimed(BASE + path);
  console.log(
    `PAGE  ${pageRes.status}  ttfb=${pageRes.ttfb}ms  total=${pageRes.total}ms  size=${(pageRes.bytes / 1024).toFixed(1)}KB`
  );
  if (pageRes.error) return;

  const html = await new Promise((resolve) => {
    http.get(BASE + path, (res) => {
      let b = "";
      res.on("data", (c) => (b += c));
      res.on("end", () => resolve(b));
    });
  });

  const assets = extractAssets(html);
  console.log(`  found ${assets.length} assets`);

  // Warm up (dev mode first-hit compile)
  const results = [];
  for (const a of assets) {
    const r = await fetchTimed(BASE + a);
    results.push(r);
  }
  results.sort((a, b) => (b.total || 0) - (a.total || 0));
  console.log("  top 10 slowest:");
  for (const r of results.slice(0, 10)) {
    const short = r.url.length > 70 ? r.url.slice(0, 67) + "..." : r.url;
    console.log(
      `    ${String(r.total || "err").padStart(5)}ms  ${String(
        ((r.bytes || 0) / 1024).toFixed(1) + "KB"
      ).padStart(9)}  ${short}`
    );
  }
  const totalBytes = results.reduce((s, r) => s + (r.bytes || 0), 0);
  console.log(
    `  total asset bytes: ${(totalBytes / 1024).toFixed(1)}KB across ${results.length} files`
  );
}

(async () => {
  for (const p of PAGES) await probePage(p);
})();