# Black Friday Deal Finder 2026

[![Black Friday Deal Finder 2026](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/bounty/black-friday-deal-finder-01)
[![Rank](https://make.fun/badge/black-friday-deal-finder-01/xuyesite/black-friday-deal-finder/rank.svg)](https://make.fun/bounty/black-friday-deal-finder-01)
[![Reward](https://make.fun/badge/black-friday-deal-finder-01/xuyesite/black-friday-deal-finder/reward.svg)](https://make.fun/bounty/black-friday-deal-finder-01)

A static deal-finder site for Black Friday / Cyber Monday 2026: **20 real
deals, each checked on the retailer's own product page on 2026-11-27
(Beijing time)**. No invented prices, no placeholders, no demo data.

## What it is

- `app/index.html` — the site (entry point). Dark, phone-friendly layout.
- `app/data.js` — the 20 deals: title, retailer, category, sale price, the
  retailer's own "was" price, the retailer product-page link, and the check
  time (Beijing, 2026-11-27).
- `app/main.js` — hand-written search, retailer filter, category filter, and
  sorting (biggest discount %, biggest saving $, price low→high / high→low,
  name A–Z). No libraries.
- `app/style.css` — hand-written stylesheet; system fonts only, no external
  assets of any kind. The site loads nothing from the network.
- `deals.csv` — the same 20 deals, columns
  `title,retailer,price,was,discount,link,checked`, generated from `app/data.js`
  so the sheet and the site can never drift apart.

## The deals (verified 2026-11-27, Beijing)

| Retailer | Deals | Categories |
| --- | --- | --- |
| Best Buy | 12 | TVs, Audio, Computing, Wearables, Smart Home |
| Samsung | 2 | TVs |
| Target | 6 | Home, Gaming, Toys, Kitchen |

Biggest discounts: Samsung S84H OLED 65" −57.1% ($899.99, was $2,099.99),
Sony WH-1000XM5 −57.3% ($169.99, was $398.00), Dyson V9 −55.0% ($269.99,
was $599.99). Total savings across all 20 deals: $5,869.26.

Every deal card shows a **real-deal signal**: HOT (40%+ off), GOOD (25–39%
off), OK (under 25% off) — computed from the retailer's own prices — plus
the exact time its price was checked.

## How the prices were verified

Each price was read from the retailer's own product page (Best Buy /
samsung.com / target.com) on 2026-11-27, usually from the page's own
structured price data, and the "was" price is the comparison / regular price
the same page prints. Deals whose price or "was" price could not be
confirmed on the retailer's own page were dropped, not guessed — see
`BUILD-NOTES.md` for the full list, per-deal sources, and what was dropped
(Amazon and Sony pages returned 403; Walmart's redirect hit a bot check;
Meta Quest 3S and the Switch 2 bundle had no reachable new-product page;
Apple Watch Series 12 showed no "was" price).

## Run it locally

```sh
node serve.ts            # serves app/ on http://localhost:8080
```

Or open `app/index.html` directly in a browser. No build step, no backend,
no network requests.

## Hand it in (build the dossier)

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` into the output directory and
writes `dossier.json` with the vendored `vendor/makefun-frontend.ts`
(unchanged from the kit).

## Screenshots

`screenshots/` holds 4 renders of the site (desktop 1280×800 and phone
390×844); see `shots.json` for which view each one shows. The first file by
name is the cover.

## License

MIT — see `LICENSE`.
