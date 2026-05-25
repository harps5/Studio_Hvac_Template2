import { Phone, Star } from 'lucide-react';
import { site } from '@/config/site';

/**
 * Hero — locked composition:
 *
 * - Asymmetric left-aligned content, hero visual right (desktop)
 * - Trust pill above headline (orange outlined, with 5 stars)
 * - Headline: services scope + location, location phrase in orange.
 *   We chose this (Option B) over a Rosendin-style triplet because the
 *   page is anchored in calm trust signals immediately below — opening
 *   with "FURNACE DOWN. AC OUT." would create tonal whiplash. The
 *   location-bearing headline is also worth more for local SEO than
 *   urgency theatre. See DECISIONS.md §1.
 * - Subhead names certifications and customer types in plain language
 * - Binary CTA: filled orange + outlined white (no third action)
 */
export function Hero() {
  return (
    <section className="relative bg-ink-800 text-white overflow-hidden lg:min-h-[calc(100svh-96px)] flex items-center">
      <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12 py-16 md:py-24 lg:py-32 items-center w-full">
        {/* Copy */}
        <div className="lg:col-span-7">
          {/* Trust pill */}
          <p
            className="inline-flex items-center gap-2 rounded-pill border-[1.5px] border-accent px-4 py-2"
            aria-label={site.business.tagline}
          >
            <span className="flex items-center gap-0.5 text-accent" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3 w-3" fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase">
              {site.business.tagline}
            </span>
          </p>

          {/* Headline */}
          <h1 className="font-display text-display-hero uppercase mt-8 max-w-[18ch]">
            Heating, Cooling &amp;
            <br />
            Indoor Air Quality
            <br />
            <span className="text-accent">
              in {site.business.address.city} &amp; {site.business.serviceRegion}
            </span>
          </h1>

          {/* Subhead */}
          <p className="mt-12 max-w-prose text-lg leading-relaxed text-muted-dark">
            Red Seal certified technicians and TECA members serving homeowners
            and small commercial across {site.business.serviceRegion}. Furnace,
            A/C, heat pump, and indoor air quality — quoted flat, installed
            clean, backed in writing.
          </p>

          {/* Binary CTA */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <a href="#book" className="btn-primary">Book Service</a>
            <a
              href={`tel:${site.business.phoneE164}`}
              className="btn-secondary-dark"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call {site.business.phone}
            </a>
          </div>
        </div>

        {/* Visual */}
        <div className="lg:col-span-5">
          {/* HERO VISUAL PLACEHOLDER
              Recommended: real photo of branded service van isolated on the
              dark navy hero background (#0F1E33), treated like product
              photography. OR candid documentary photo of a technician in
              branded uniform working on equipment.
              NO stock people, NO handshakes, NO smiles at camera.
              Aspect: 16:10. Replace this <div> with <Image src="/hero/van.jpg" ... />. */}
          <div
            role="img"
            aria-label="Branded service van — placeholder"
            className="relative aspect-[16/10] rounded-card-lg border border-ink-700 bg-ink-900"
          >
            <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
              <div>
                <p className="eyebrow">Hero visual</p>
                <p className="font-display text-2xl md:text-3xl mt-2">
                  Branded service van
                </p>
                <p className="mt-2 text-sm text-muted-dark">
                  Drop the real photo at <code className="text-white">/public/hero/van.jpg</code>.
                  See <code className="text-white">/public/README.md</code> for shot direction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
