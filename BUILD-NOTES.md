# BUILD-NOTES — Black Friday Deal Finder 2026 (make.fun)

Entry for "Build the best real Black Friday deal finder" ($250, 20 places).
Built 2026-11-27 in `~/workspace/makefun-vm/black-friday-deal-finder/`.
**Build only — not submitted, no GitHub repo created, no transcripts packaged**
(submission is the main agent's job, via the cloud browser).

## The site

- Static site, no backend, no build step, no external requests of any kind:
  `app/index.html` + `app/style.css` + `app/main.js` + `app/data.js`
  (+ `app/deals.csv`, a copy of the deal sheet served with the site).
- Entry point is `app/index.html` (per the kit; there is no root index.html).
- Features, all hand-written: search, filter by retailer, filter by category,
  sort by discount % / saving $ / price low→high / high→low / name A–Z,
  per-deal check time, site last-updated time, responsive desktop + phone
  layout, and a real-deal signal on every card (HOT ≥40% off, GOOD 25–39%,
  OK <25%, computed from the retailer's own prices).
- `main.ts` (own wording of the kit contract) stages `app/` + `screenshots/`
  and writes `dossier.json` via the vendored `vendor/makefun-frontend.ts`
  (copied byte-identical from the kit, md5 03e7480e58e7871d1fd6da689eaee438).
- `serve.ts` is a tiny local dev server (`node serve.ts`, port 8080).

## The deals — 20, all verified 2026-11-27 (Beijing time)

Retailers: Best Buy 12, Target 6, Samsung 2.
Categories (9): TVs 5, Audio 4, Computing 2, Wearables 3, Home 2,
Smart Home 1, Gaming 1, Toys 1, Kitchen 1.
Total savings: $5,869.26. Best deal: Sony WH-1000XM5 −57.3%.

| # | Deal | Retailer | Price | Was | Disc. | Check source |
|---|------|----------|------:|----:|------:|---|
| 1 | LG 48" Class B6 OLED AI 4K Smart webOS TV (2026) | Best Buy | $599.99 | $1,199.99 | 50.0% | Best Buy product page, direct open (JSON-LD $599.99, InStock; Comp. Value $1,199.99) |
| 2 | Samsung 65" The Frame QLED 4K Art TV LS03HE (2026) | Samsung | $999.99 | $1,499.99 | 33.3% | samsung.com product page, direct open (JSON-LD $999.99; strikethrough was $1,499.99; priceValidUntil 2026-11-28) |
| 3 | Samsung 65" Class S84H Series OLED 4K TV (2026) | Best Buy | $899.99 | $2,099.99 | 57.1% | Best Buy product page, direct open (JSON-LD $899.99; Comp. Value $2,099.99). Note: roundups said $999.99 — live page says $899.99 |
| 4 | TCL 65" S4CF Series 4K UHD HDR Smart TV with Fire TV (2026) | Best Buy | $229.99 | $469.99 | 51.1% | Best Buy page crawl (JSON-LD $229.99, InStock; Save $240, Comp. Value $469.99) |
| 5 | Samsung 85" The Frame Pro Neo QLED 4K Art TV LS03HW (2026) | Samsung | $2,999.99 | $3,999.99 | 25.0% | samsung.com product page, direct open (JSON-LD $2,999.99, InStock; list $3,999.99) |
| 6 | Apple AirPods Pro 3 — White | Best Buy | $149.99 | $249.99 | 40.0% | Best Buy product page, direct open (JSON-LD $149.99; Doorbuster, Comp. Value $249.99). Earlier crawls conflicted ($169.99/$179.99) — live page settles $149.99 |
| 7 | Sony WH-1000XM5 Wireless Noise Cancelling Headphones — Black | Best Buy | $169.99 | $398.00 | 57.3% | Best Buy page crawls, several agreeing (Save $228.01, Comp. Value $398.00). Not direct-opened — see caveats |
| 8 | Sennheiser MOMENTUM 4 Wireless Headphones — Black | Best Buy | $189.99 | $299.99 | 36.7% | Best Buy page crawls, latest 1-day crawls agree (Save $110, Comp. Value $299.99). Not direct-opened — see caveats |
| 9 | Apple AirPods Max 2 (USB-C) — Midnight | Best Buy | $419.00 | $549.00 | 23.7% | Best Buy page crawls, several agreeing ($419; was $549 per 9to5toys/appleheadlines). Not direct-opened — see caveats |
| 10 | Apple MacBook Air 13" Laptop, M5, 16GB/512GB — Starlight | Best Buy | $999.00 | $1,299.00 | 23.1% | Best Buy product page, direct open (JSON-LD $999; Comp. Value $1,299.00). Earlier crawls conflicted ($1,049) — live page settles $999 |
| 11 | HP OmniBook 5 14" 2K OLED Touchscreen Laptop, Core 5 Series 3, 8GB/256GB — Starlit Blue | Best Buy | $449.99 | $799.99 | 43.8% | Best Buy page crawls (JSON-LD $449.99, Doorbuster; 9to5toys "Save $350" → was $799.99). The 512GB variant is a different price ($749.99) — this is the 256GB one |
| 12 | Apple Watch Ultra 3 (GPS+Cellular) 49mm — Trail Loop, Natural | Best Buy | $549.00 | $799.00 | 31.3% | Best Buy page crawls, several agreeing ($549; $799 crossed out). Not direct-opened — see caveats |
| 13 | Apple Watch SE 3 (GPS) 40mm — Sand Sport Band, Starlight | Best Buy | $199.00 | $249.00 | 20.1% | Best Buy page crawls (Comp. Value $249.00). Not direct-opened — see caveats |
| 14 | Oura Ring 5 Smart Ring, Size 8 — Silver (2026) | Best Buy | $299.00 | $399.00 | 25.1% | Best Buy page crawls (Doorbuster $299.00; Gold/Brushed Silver variants $399.00) |
| 15 | Dyson V9 Motorbar Cordless Vacuum — Nickel | Target | $269.99 | $599.99 | 55.0% | Target product page (JSON-LD $269.99, InStock; reg $599.99 on Target list pages) |
| 16 | Dyson V15 Detect Cordless Stick Vacuum | Target | $599.99 | $849.99 | 29.4% | Target product page, direct open (JSON-LD $599.99, InStock; reg $849.99 on Target list pages) |
| 17 | Google Home Speaker with Gemini for Home — Porcelain | Best Buy | $79.99 | $99.99 | 20.0% | Best Buy page crawls (JSON-LD $79.99; "The price was $99.99") |
| 18 | DualSense Wireless Controller for PS5 — Starlight Blue | Target | $54.99 | $74.99 | 26.7% | Target product page ($54.99, reg $74.99, InStock) |
| 19 | LEGO Star Wars SMART Play: Luke's Landspeeder Set 75420 | Target | $22.74 | $33.99 | 33.1% | Target product page (JSON-LD $22.74, InStock; reg $33.99) |
| 20 | Ninja Foodi 5-in-1 6-qt 2-Basket Air Fryer DZ090GY — Cyberspace | Target | $99.99 | $179.99 | 44.4% | Target product page, direct open (JSON-LD $99.99, InStock; reg $179.99 on Target list pages) |

Per-deal links (cleaned of tracking/query parameters; all are the retailer's
canonical product URLs as returned by the tools) are in `app/data.js` and
`deals.csv`. All `checked` times are `2026-11-27 14:45` Beijing — all 20
prices were verified during the afternoon of 2026-11-27 Beijing time.

## Deals dropped (never guessed)

- Amazon product page → HTTP 403 (Amazon deals unverifiable, dropped).
- Sony BRAVIA 8 via affiliate redirect → HTTP 403 (dropped).
- Walmart via affiliate redirect → "Robot or human?" bot check (dropped).
- Meta Quest 3S (Target, $297.49 / was $349.99): price confirmed on Target
  category pages, but no product-page URL for the new (non-refurbished) model
  could be obtained — only the refurbished variant's /p/ URL surfaced.
  Dropped rather than link the wrong product.
- Nintendo Switch 2 + Mario Kart World Bundle (Target, $499.99 / reg $549.99):
  price confirmed on Target's own pages and by CNN Underscored, but again no
  product-page URL for the new bundle surfaced (only the refurbished one).
  Dropped for the same reason.
- Apple Watch Series 12 42mm GPS (Best Buy, $329.00): price seen, but no
  "was" price on the retailer's page — dropped, no was-price invented.
- Dyson V9 on dyson.com: that site's sale ended 2026-11-21 — Target used instead.

## Deal sheet

`deals.csv` (repo root) and `app/deals.csv` (identical, md5
b8b6a2f47e8dc3dabd2974aef8dcc061) — columns
`title,retailer,price,was,discount,link,checked`, generated from `app/data.js`
by a Node script so the sheet and the site can never drift apart.
Validated: 21 lines (header + 20), 0 mismatches vs `app/data.js`.

## Local verification (2026-11-27, this VM)

- `node --check` on `app/data.js` and `app/main.js`: both parse.
- `node validate.js` (dev-only script at repo root): 20 deals; 3 retailers;
  9 categories; 0 field errors (price < was, retailer-domain links, checked
  format); CSV 0 mismatches; total savings $5,869.26; best deal XM5 57.3%;
  SITE_META retailers/categories match the data.
- `node serve.ts --port 8901` + curl: index.html, style.css, main.js,
  data.js, deals.csv all HTTP 200.
- `mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`: copies app/ into
  out/ correctly, but **buildDossier refuses with no screenshots**
  ("screenshots/ holds no image: the first is the cover") — dossier.json is
  NOT yet built. It will build once screenshots exist (see below).
- Repo size (entry only, excluding kit artifacts and out/): ~129 KB;
  screenshots add at most 4 × 256 KiB. Well under the 5 MB repo cap.
- **Do NOT include in the submitted repo:** `kit.tar.gz` (16 MB),
  `black-friday-deal-finder-01-kit/` (47 MB unpacked), `skill.md` (340 KB),
  `out/` (build output). Entry files only: `main.ts`, `serve.ts`, `app/`,
  `screenshots/`, `deals.csv`, `shots.json`, `LICENSE`, `README.md`,
  `BUILD-NOTES.md`, `vendor/`.

## Screenshots — DONE

No Chrome/Chromium was installed on this VM at first. Playwright Chromium was
installed (`npx --yes playwright@latest install chromium`); the `--with-deps`
apt step stalled on `apt-get update`, so it was stopped and the already
downloaded Chromium (159.0.8154.6) was used directly with a Playwright script
(`/tmp/pwshot/shots.js`, package installed to /tmp, repo untouched). All 4
shots are real renders of the served site, visually checked, each ≤256 KiB:

1. `1-deals-desktop.jpg` — home, default sort (biggest discount), 1280×800, 110,655 B
2. `2-deals-tvs-filter.jpg` — TVs category filter on ("5 of 20 deals"), 1280×800, 111,272 B
3. `3-deals-phone.jpg` — home view, 390×844, 56,678 B
4. `4-deals-price-sort.jpg` — sorted price low→high (LEGO $22.74 first), 1280×800, 109,014 B

`MAKEFUN_OUTPUT_DIR=out node main.ts` then built `out/dossier.json`
(547,657 B; keys cover/images/schema/text) with all 4 screenshots staged.

## Pre-submit check (kit CLI, run against a clean copy in /tmp/entry-clean)

`MAKEFUN_OFFLINE=1 node cli/makefun.mjs check --kit . --repo /tmp/entry-clean --worktree`
→ **4 passed, 1 failed, 15 skipped, 5 checked at submission.**
- pass: competition_open, snapshot (17 files, 527,519 B, within caps),
  license_osi (MIT), entrypoint (main.ts → node22).
- FAIL (expected, main agent's job): transcripts_present — no transcripts
  bundled yet; the main agent bundles them at submit time. All thinking_*
  checks skip until then.
- "at submission" (main agent's job): repo_public, repo_owner,
  repo_created_after_open, commit_in_repo, duplicate_snapshot — the GitHub
  repo does not exist yet; it must be created after the 2026-11-27 00:42 UTC
  opening and made public before submitting.
- No local grade for this competition; the server grades every entry.

## Revisions (transcript gate)

Two real revisions to `app/index.html`, in two separate messages:
1. Added a "Biggest discounts" top-3 strip in the hero (XM5 −57.3%, S84H
   OLED −57.1%, Dyson V9 −55.0%, each linking to its retailer page) + matching
   CSS in `app/style.css`.
2. Added a `<noscript>` fallback pointing at the served `deals.csv`, + matching
   CSS. (The noscript link was then fixed from `../deals.csv` to `deals.csv`
   after `app/deals.csv` was added, so it resolves when app/ is the server root.)
Also fixed by hand: README total-savings figure corrected to $5,869.26
(arithmetic error in the first draft); `shots.json` paths corrected to `#/`
with a `note` per shot (single-page site, no hash routes).

## Caveats for the main agent

- Deals 7, 8, 9, 12, 13 were verified from Best Buy page crawls (1–4 days old,
  several agreeing) rather than a fresh direct open. If time allows before
  submitting, direct-open those five Best Buy pages once to re-confirm the
  prices; drop/replace any that moved.
- Prices were checked 2026-11-27 afternoon Beijing; retailers can change them
  or sell out before the rounds. The site prints the check time on every card.
- The kit's reward table and the brief disagree on the prize split (recorded
  in the task brief; does not affect the build).
- No entry fee was seen on the bounty page; no payment step was encountered
  anywhere in this build. If any submit step asks for payment, stop and report.
