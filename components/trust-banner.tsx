import Image from 'next/image';
import { site } from '@/config/site';

/**
 * Trust banner. White band, microcopy + monochrome logo row at 60% opacity.
 * Logos live in /public/trust as placeholder SVGs — swap with licensed
 * assets at client onboarding. See public/README.md.
 */
export function TrustBanner() {
  return (
    <section className="bg-white border-b border-cream-200">
      <div className="container-x py-12 md:py-16">
        <p className="eyebrow text-center text-ink">
          Certified, insured &amp; trusted
        </p>

        <ul
          role="list"
          className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-8 gap-y-6 items-center"
        >
          {site.trustLogos.map((logo) => (
            <li
              key={logo.name}
              className="flex items-center justify-center text-ink opacity-60 hover:opacity-90 transition-opacity"
              title={logo.name}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={60}
                className="h-12 w-auto"
                unoptimized
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
