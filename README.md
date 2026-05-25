# Birchmont Studio — HVAC vertical template

A production-grade Next.js 14 template for residential HVAC service
businesses. Designed to be cloned and content-swapped per client via
a single config file.

Placeholder client throughout: **Coulee HVAC** (Lethbridge AB).

---

## Quickstart

```bash
# 1. Install
npm install

# 2. Local env
cp .env.example .env.local
# (Optional) set GOOGLE_PLACES_API_KEY for live Google reviews

# 3. Run dev server
npm run dev          # → http://localhost:3000

# 4. Production build
npm run build && npm start

# Type check + lint
npm run typecheck
npm run lint
```

## How to clone for a new client

This template's main feature is that **`/config/site.ts` is the only
file a Studio member needs to edit** to spin up a new HVAC client.

Detailed playbook: see [`/config/README.md`](./config/README.md).

The short version:

1. Branch the template repo.
2. Replace every value in `site` inside `/config/site.ts`.
3. Drop client image assets into `/public/` per `/public/README.md`.
4. Optionally wire `GOOGLE_PLACES_API_KEY` for live Google reviews.
5. Update `NEXT_PUBLIC_SITE_URL` env var.
6. Push and deploy on Vercel.

If the build fails with TypeScript errors after editing `site.ts`,
you've removed a required field — the schema is the spec.

## Design system

Tokens are **locked**. Do not extend without updating `DECISIONS.md`.

| Token       | Value      | Use                                      |
|-------------|------------|------------------------------------------|
| Ink navy    | `#0F1E33`  | Hero, process, footer (structural — not "blue accent") |
| Ink deep    | `#0A1525`  | Footer baseline                          |
| Ink border  | `#1E2F47`  | Dark-section dividers                    |
| Cream       | `#F5F1EB`  | Body sections, cards                     |
| Cream border| `#E5E0D8`  | Light-section dividers                   |
| White       | `#FFFFFF`  | Cards on cream, trust banner             |
| Accent      | `#C2410C`  | **Only** accent — CTAs, emphasis, icons  |
| Muted light | `#6B7280`  | Body muted text on light                 |
| Muted dark  | `#9CA3AF`  | Body muted text on dark                  |

| Font     | Family                     | Use                          |
|----------|----------------------------|------------------------------|
| Display  | Anton (Google Fonts)       | Headlines, section titles, wordmark, stat values |
| Body     | Inter Tight 400/500/600    | Everything else              |

**Spacing scale (layout convention):** `4 / 8 / 16 / 24 / 32 / 48 / 64
/ 96 / 128 / 192`. See `tailwind.config.ts` and `DECISIONS.md §4`.

**Radius:** `rounded-pill` (999px) for buttons + chips; `rounded-card`
(16px) and `rounded-card-lg` (24px) for cards and image frames.

## Architecture

- **App Router** (`/app/page.tsx` is the homepage, composes 14
  section components from `/components/`).
- **Server components by default.** Only `MainNav` is `'use client'`
  (mobile drawer state).
- **Content is config.** `/config/site.ts` is typed and exhaustive.
- **External APIs are wrapped.** `/lib/google-reviews.ts` and
  `/lib/weather.ts` are server-only, cached via Next.js ISR, and
  fail open to safe defaults.
- **Images** are labeled placeholders. Replace with real assets in
  `/public/`; no code change needed.

## Project layout

See [`SUMMARY.md`](./SUMMARY.md) for the file tree and section map.

## What's intentionally not here

See [`DECISIONS.md §12`](./DECISIONS.md). Notable: no booking-form
integration (clients all use different field-service software), no
per-service detail pages (out of scope for the homepage brief), no
OG image (per-client asset).

## Deployment

Deployment target is Vercel.

Required env var: `NEXT_PUBLIC_SITE_URL`.
Optional env var: `GOOGLE_PLACES_API_KEY` (enables live reviews).

`npm run build` produces a fully static-rendered homepage with two
ISR windows: 24h for Google reviews, 10m for weather.

## Documentation

- [`DECISIONS.md`](./DECISIONS.md) — every autonomous call made during the build, with reasoning
- [`SUMMARY.md`](./SUMMARY.md) — final state, file tree, commit history, compliance audit
- [`config/README.md`](./config/README.md) — clone-for-new-client playbook
- [`public/README.md`](./public/README.md) — photography brief and asset specs

## Credits

Built by Birchmont Studio.
