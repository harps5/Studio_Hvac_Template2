import { Phone } from 'lucide-react';
import { site } from '@/config/site';

export function FinalCta() {
  return (
    <section id="book" className="bg-ink-800 text-white section">
      <div className="container-x text-center max-w-3xl mx-auto">
        <h2 className="font-display text-display-section uppercase">
          Furnace or A/C trouble?
          <br />
          <span className="text-accent">We&rsquo;re an hour away.</span>
        </h2>
        <p className="mt-6 text-lg text-muted-dark">
          Same-day repair on most calls across {site.business.address.city} and
          Southern Alberta. Book online or call — we always answer.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#quote" className="btn-primary">Book Service</a>
          <a href={`tel:${site.business.phoneE164}`} className="btn-secondary-dark">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Call {site.business.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
