# DECISIONS.md

Audit log for the Birchmont Studio HVAC vertical template. Every
autonomous call made during the initial build is recorded here so it
can be inherited, challenged, or reversed by future maintainers.

---

## 1. Hero headline — Option B over Option A

The brief offered two hero headline patterns:

- **A (Rosendin)**: `FURNACE DOWN. / AC OUT. / WE'RE THERE IN HOURS.`
- **B (Vertex/Hausly)**: `Heating, Cooling & Indoor Air Quality / in Lethbridge & Southern Alberta` (location in orange)

**Picked B.** Reasoning:

- **Tonal coherence.** The page immediately under the hero is 13 sections
  of calm, professional trust signals (weather, trust logos, services,
  why-us, process). Opening with Rosendin-style alarm copy and then
  pivoting to "Honest pricing. No surprises." creates whiplash.
- **Local SEO.** Google's local pack ranks pages that name the service +
  the city in the H1. "FURNACE DOWN" gives Google nothing geographic.
- **House style fit.** The brief asks us to inherit Vertex's discipline.
  Vertex headlines are services + locality, not urgency theatre.
- **Below-the-fold balance.** The Rosendin typographic move still has a
  home — see the FAQ headings and process step titles, which use the
  short-declarative + period pattern at a smaller scale. The move is
  honored without becoming the whole hero.

If a client opens with "we want the urgency hero," swap to A by
replacing the `<h1>` in `components/hero.tsx`. Both patterns work with
the same display font and trust pill.

---

## 2. Reviews module — dual mode with a manual default

`/lib/google-reviews.ts` ships with two modes:

- **A (live)**: Google Places API (New), 24h ISR cache, field-masked
  fetch. Triggered when both `GOOGLE_PLACES_API_KEY` env var AND
  `site.googlePlaceId` are present.
- **B (manual)**: pulls from `site.manualReviews`. Default.

Coulee (the placeholder client) ships with B, populated with 5
realistic Lethbridge reviews. The studio toggles to A by setting the
two values — no code change required. On any live-fetch failure the
module fails open to manual so the section never goes blank.

**Why default to manual?** Most new HVAC clients have <30 Google
reviews when their new site goes live; curated wins until volume
makes it worth automating. The `source: 'manual'` chip in the UI
signals to the studio that they're seeing the fallback view.

---

## 3. Weather — Open-Meteo, no API key

The brief allowed a static placeholder if API integration was out of
scope. I integrated live anyway: Open-Meteo is keyless, free, and the
fetch is cached for 10 minutes. The weather strip degrades to a static
locality line if the request fails, so the build is never blocked on
network. Lethbridge coordinates are sourced from `site.business.address`,
so a client clone in Calgary changes the lat/lng once and the strip
follows.

---

## 4. Spacing scale — convention, not config-level lockout

**First attempt:** I overrode Tailwind's `spacing` config to expose only
the brief's locked scale (4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 192).
The intent was to make `py-14` (56px, off-scale) literally not exist
at the class level.

**Why I reverted:** The override also erased `h-3`, `h-3.5`, `h-5`,
`h-10`, `h-11`, `h-20` — values legitimately needed for icon
dimensions and small chrome. The build would have generated invalid
class names anywhere I used them. Tailwind treats the spacing scale as
a single shared dimension across `p/m/gap/h/w`, so you can't lock
"layout spacing" without also locking icon sizes.

**What I did instead:** restored Tailwind defaults, documented the
locked layout scale as a code-review convention in
`tailwind.config.ts`, and audited the components — `mt-10`, `mt-20`,
`pr-14`, `h-11` violations were snapped to the locked scale. Future
reviews should grep for the disallowed layout values.

---

## 5. Services heading — followed reject list over literal spec

The brief literally specified the Services heading as
`Complete Home Comfort Solutions`. The brief's reject list also
forbids `"comfort solutions" / "discerning" / any condo-brochure language`.

**Resolution:** honored the deeper intent (reject-list rule beats the
literal). The heading is now `Heating, cooling, hot water, air quality.`
— names the work, no puffery, mirrors the Rosendin period-terminated
declarative pattern at section scale.

If the client wants the original heading back, change one string in
`components/services.tsx`.

---

## 6. FAQ — native `<details>`, no client component

The brief said accordion. I used native HTML `<details>`/`<summary>`
instead of a stateful React component. Reasons:

- Keyboard accessibility comes for free (Tab, Enter, Space).
- Works without JS, which matters for SEO crawlers and slow networks.
- Zero hydration cost — the FAQ section stays a server component.
- The `group-open` Tailwind variant gives us a CSS-only rotating
  plus icon affordance.

Cost: animation is harder to do natively than in JS. Acceptable for
"production-grade, don't over-engineer."

---

## 7. Booking system — deferred behind a placeholder anchor

The brief asked for "Book Service" CTAs. It did NOT ask the template
to ship a booking form. HVAC clients all use different field-service
software (Jobber, ServiceTitan, Housecall Pro, plain Calendly), so
building one form would be wrong for every client except the first.

**Resolution:** every "Book Service" / "Get a Quote" CTA points to
`#book`, which scrolls to the FinalCTA section. Inside that section
the primary CTA also points to `#book` (visual no-op) with an inline
`TODO` comment marking exactly where the studio swaps in the client's
booking URL.

---

## 8. Trust logos — monochrome SVG placeholders

Real Lennox, BBB, HRAI, TECA, Red Seal, and WorkSafe logos are
copyrighted and licensed per partnership. Shipping fake-but-real
logos in the template would create a legal liability for any client
who doesn't have those partnerships.

**Resolution:** SVG placeholders in `/public/trust/` that render as
labeled monochrome boxes. They render the same visual rhythm a real
logo row would, and `/public/README.md` documents the source for each
real logo with explicit "swap before launch" instructions.

---

## 9. Service area map — stylized, not cartographic

The brief said "SVG outline map ... subtle, not detailed." A real
map (Google Maps embed, Mapbox tile) would require an API key, a
client component, and ~250KB of map tiles for a section nobody zooms
into.

**Resolution:** an inline SVG with an abstract regional shape, a
dashed orange 50km radius around Lethbridge, and labeled dots for
each community. No JS, no external request, ~2KB. Cities are placed
by visual approximation, not geo coordinates — clearly labeled in
the source comment so nobody mistakes it for navigation data.

---

## 10. Above-the-fold CTA count — four, but intentionally

The Tesla-inspired rule is "binary CTA, two buttons above the fold."
But the brief also specified:

- Nav: two CTAs (`Book Service` ghost + `Get a Quote` filled)
- Hero: two CTAs (`Book Service` filled + `Call` outlined)

That's four distinct CTAs visible above the fold on desktop. I kept
all four because the brief is explicit about both pairs. Each pair
is a binary, and the nav pair vs hero pair operate at different
visual scales. If the count is reviewed and trimmed in the future,
the nav `Get a Quote` is the most droppable — it duplicates the hero
`Book Service` action.

---

## 11. Top-bar phone number — placement choice

The brief says "phone top-left in nav (large, with icon)." I split
this across two layers:

- **Black top utility bar:** `24/7 Emergency Service — Call (403)…`
  as a `tel:` link, far left. Always visible, smallest-friction emergency tap.
- **Main nav (white):** wordmark left, nav center, CTA pair right.
  On mobile the nav collapses and a primary `Call` button appears as
  the leftmost CTA in the header.

Reasoning: putting the phone *in* the white nav at large size, plus
the wordmark, plus 5 nav items, plus 2 CTAs blew out the row at
typical desktop widths. The black utility bar carries the phone in a
universally-present strip without crowding the brand layer.

---

## 12. Deferred / out of scope

Documented here so the next person knows what's intentionally absent:

- **/services/[slug] detail pages.** Each service card has a
  `Learn more →` link wired to `#${slug}` anchors. The brief's spec
  was a homepage. Building 6 sub-pages was out of scope; the slugs
  in `site.services` are ready for routing when the studio expands.
- **/og.jpg.** The metadata references `/og.jpg` for social previews.
  Asset spec is in `public/README.md`; file itself ships empty so it
  can be generated per-client.
- **Booking form integration.** See §7.
- **Real photography.** All image slots are labeled placeholders.
  See `public/README.md`.
- **Multi-page sitemap.** `sitemap.ts` ships with only `/` because
  there is only one route. Expands automatically when the studio
  adds routes.
