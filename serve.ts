// Black Friday Deal Finder 2026 — tiny local dev server (Node 22+, stdlib only).
//
// Serves app/ on http://localhost:8080 so the site can be opened in a browser
// without any build step: `node serve.ts` (or `node serve.ts --port <n>`).
// It only answers with files inside app/, sends the right MIME type for each,
// and refuses everything else. A dev convenience, not a production server.

import { createReadStream, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const appRoot = resolve(fileURLToPath(new URL("./app", import.meta.url)));

const args = process.argv.slice(2);
const portFlag = args.indexOf("--port");
const wanted = portFlag === -1 ? 8080 : Number(args[portFlag + 1]);
const port =
  Number.isInteger(wanted) && wanted > 0 && wanted < 65536 ? wanted : 8080;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
};

createServer((request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname);
  } catch {
    response.writeHead(400).end("bad request");
    return;
  }
  if (pathname.endsWith("/")) pathname += "index.html";

  // Never serve anything outside app/.
  const file = resolve(join(appRoot, normalize(pathname)));
  if (file !== appRoot && !file.startsWith(appRoot + sep)) {
    response.writeHead(403).end("forbidden");
    return;
  }

  let size;
  try {
    const stats = statSync(file);
    if (!stats.isFile()) throw new Error("not a file");
    size = stats.size;
  } catch {
    response.writeHead(404).end("not found");
    return;
  }

  response.writeHead(200, {
    "content-type": MIME_TYPES[extname(file).toLowerCase()] ?? "application/octet-stream",
    "content-length": size,
    "cache-control": "no-store",
  });
  createReadStream(file).pipe(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`app/ is on http://localhost:${port}`);
});
