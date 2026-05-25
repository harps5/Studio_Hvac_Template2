# /public — image and asset playbook

All paths referenced from `/config/site.ts` resolve under this folder.
Drop client-supplied assets directly here, matching the paths below.

## Hero (`/public/hero/van.jpg`)

- Subject: real client-wrapped service van, driver's three-quarter view
- Treatment: product photography. Isolated on the navy hero background
  (`#0F1E33`) — either shot on cyc with matched lighting, or shot on
  location and background-removed to a flat fill.
- Lighting: even, soft top-light. No hard ground shadow. No environmental
  reflections.
- Aspect: 16:10 (landscape)
- NO people in the cab. NO motion blur. NO tilt.

## Services (`/public/services/<slug>.jpg`)

One image per service card, slug matches the entry in `site.services`:

- `furnace.jpg` — close detail on an installed high-efficiency furnace
  unit, no people, branded service tag visible
- `ac.jpg` — exterior condenser unit on a Lethbridge home pad, clean
- `heat-pump.jpg` — outdoor heat pump in winter conditions (snow OK)
- `tankless.jpg` — wall-mounted tankless unit, clean copper, no clutter
- `iaq.jpg` — HRV/ERV unit or media filter cabinet, clean room context
- `emergency.jpg` — branded van on a residential street at dusk

Aspect: 4:3, ~1200px wide minimum. Quiet, documentary, not aspirational.
**NO stock library images. NO posed technicians. NO smiles at camera.**

## Trust logos (`/public/trust/*.svg`)

Monochrome SVG placeholders ship in this template. **Replace each with
the licensed real logo** before launch:

| File              | Source                                                                          |
|-------------------|---------------------------------------------------------------------------------|
| `red-seal.svg`    | Government of Canada — Red Seal Program brand kit                               |
| `teca.svg`        | Thermal Environmental Comfort Association (request from association)            |
| `lennox.svg`      | Lennox Premier Dealer co-marketing kit (via dealer rep)                         |
| `bbb.svg`         | Better Business Bureau accredited business badge generator                      |
| `hrai.svg`        | Heating Refrigeration and Air Conditioning Institute of Canada (member portal)  |
| `worksafe.svg`    | WorkSafe Alberta logo guidelines (Government of Alberta)                        |

Render in greyscale at 60% opacity (handled in component). Real logos
keep their official aspect ratios — placeholders are sized 160×60.

## Open Graph (`/public/og.jpg`)

- 1200×630 px
- Wordmark + tagline + one trust signal on dark navy
- No phone number (URLs are not crawlable from social previews)
