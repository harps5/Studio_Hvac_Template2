import { Phone } from 'lucide-react';
import { site } from '@/config/site';

export function TopUtilityBar() {
  return (
    <div className="w-full bg-ink-900 text-white text-sm">
      <div className="container-x flex h-8 items-center justify-between gap-4">
        <a
          href={`tel:${site.business.phoneE164}`}
          className="inline-flex items-center gap-2 hover:underline underline-offset-4 decoration-accent decoration-2"
        >
          <Phone className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          <span className="font-medium">
            {site.business.hours.emergency} —{' '}
            <span className="tracking-wide">Call {site.business.phone}</span>
          </span>
        </a>
        <span className="hidden md:inline text-muted-dark">
          {site.business.address.city} &amp; Southern Alberta
        </span>
      </div>
    </div>
  );
}
