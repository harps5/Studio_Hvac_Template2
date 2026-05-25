# /config — clone playbook

This template is content-driven. To stand up a new HVAC client site,
**`/config/site.ts` is the only file you need to edit.**

## 1. Swap the site config

Open `site.ts` and replace every value under the `site` export with the
client's content:

| Section          | What to change                                              |
|------------------|-------------------------------------------------------------|
| `business`       | Name, phone, email, hours, street address, lat/lng          |
| `serviceArea`    | Communities + response-time microcopy                       |
| `services`       | 6 service cards (kept at 6 to fit the 3×2 grid)             |
| `trustLogos`     | 5–6 certifications. Drop new SVGs in `/public/trust/`       |
| `whyUsStats`     | 4 numeric proof points                                      |
| `whyUsFeatures`  | 4 differentiators with icons from the locked icon set       |
| `processSteps`   | 4 steps. Keep the count at 4 for grid rhythm                |
| `pricing`        | Diagnostic fee + financing terms                            |
| `faq`            | 6 questions, 2–3 sentence answers                           |
| `manualReviews`  | 5 reviews — used until Google Places API is wired           |
| `aggregateRating`| Headline rating + count shown above the reviews grid        |

Type-safety guarantees the structure stays correct. If the build fails
with a TS error in `site.ts`, you've removed a required field.

## 2. Drop image assets in `/public`

Image paths in `site.ts` are absolute (e.g. `/services/furnace.jpg`).
Place the matching files in `public/services/` and `public/trust/`.
See `public/README.md` for shot specs and per-asset direction.

## 3. (Optional) Wire live Google Reviews

Default: the template runs in **Manual mode** and shows the 5 reviews
in `site.manualReviews`. This is fine for prototyping, for clients with
no Google Business Profile yet, or for clients with fewer than ~10
reviews where curation beats automation.

To switch to **Live mode** (recommended once the client has 25+ Google
reviews):

1. In Google Cloud Console: enable the **Places API (New)** and create
   an API key restricted to the site's domains.
2. Find the client's `placeId` via
   [Google's Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id).
3. Set the env var `GOOGLE_PLACES_API_KEY` in `.env.local` (dev) AND
   in the Vercel project (production).
4. Paste the placeId into `site.googlePlaceId` in `site.ts`.

The module in `lib/google-reviews.ts` will detect both values are set
and switch to live fetch automatically. Reviews are cached for 24h via
Next.js `fetch` revalidation. On any API failure it falls back to
`manualReviews` so the section never goes blank.

## 4. Update brand tokens — only if required

`tailwind.config.ts` carries the locked Birchmont Studio palette
(cream / ink navy / burnt orange). If the client's brand demands a
different accent, change `accent.DEFAULT` and `accent.dark` and
nothing else. Do not add new colors. Do not introduce gradients.

If you change the accent, update `DECISIONS.md` with the reason — the
file is the audit trail.

## 5. Update SEO

- `app/layout.tsx` — page title, description, OG tags, JSON-LD `LocalBusiness`
- `app/sitemap.ts` — URL list
- `app/robots.ts` — crawl rules
- Set `NEXT_PUBLIC_SITE_URL` in env vars for canonical URLs

## 6. Deploy

`vercel deploy` from the project root, or push to a branch connected
to a Vercel project. No build-time secrets are required beyond the
optional `GOOGLE_PLACES_API_KEY`.
