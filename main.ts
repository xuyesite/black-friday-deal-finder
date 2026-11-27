// Black Friday Deal Finder 2026 — hand-in program (Node 22+, stdlib only).
//
// What it does: takes this repository's static site (app/) and its screenshots
// (screenshots/) and stages them into the output directory, then writes the
// dossier.json the scorer reads — the screenshots, the first-load files and
// their sizes, and a short outline of the source — using the vendored
// make.fun library in vendor/makefun-frontend.ts, which must stay untouched:
// the scorer rebuilds dossier.json with its own copy of that library and the
// two files have to match byte for byte.
//
// Run it locally (outside the grader, /output is replaced by a folder):
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Then serve the staged site with `node serve.ts` and open
// http://localhost:8080 (the dev server serves app/ from this repo).

import { cpSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

// Folder this file lives in (the repository root).
const repoRoot = fileURLToPath(new URL(".", import.meta.url));

// The grader hands the program /output; locally MAKEFUN_OUTPUT_DIR stands in.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outputDir, { recursive: true });

// Stage the site itself.
cpSync(join(repoRoot, "app"), join(outputDir, "app"), { recursive: true });

// Stage the screenshots, if the folder exists yet.
mkdirSync(join(outputDir, "screenshots"), { recursive: true });
if (existsSync(join(repoRoot, "screenshots"))) {
  cpSync(join(repoRoot, "screenshots"), join(outputDir, "screenshots"), {
    recursive: true,
  });
}

// Write the dossier. The limits below are the scorer's own caps: at most
// 4 screenshots, each at most 256 KiB; at most 993 files/dirs in app/ and
// 16 MiB of app/ files in total; the dossier's text is capped at 160 KiB.
writeFileSync(
  join(outputDir, "dossier.json"),
  buildDossier(outputDir, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
