import { ArrowRight, Check } from 'lucide-react';
import { site, type Service } from '@/config/site';

export function Services() {
  return (
    <section id="services" className="bg-cream section">
      <div className="container-x">
        <div className="max-w-2xl">
          <p className="eyebrow">What we do</p>
          <h2 className="font-display text-display-section uppercase mt-4">
            Complete home comfort solutions
          </h2>
          <p className="mt-6 text-lg text-muted">
            One licensed local team for heating, cooling, hot water, and air
            quality — across {site.business.address.city} and Southern Alberta.
          </p>
        </div>

        <ul
          role="list"
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {site.services.map((service) => (
            <li key={service.slug}>
              <ServiceCard service={service} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="group flex h-full flex-col rounded-card-lg bg-white border border-cream-200 overflow-hidden">
      {/* Image area — swap this <div> with <Image src={service.imagePath} ... />
          once the client supplies real assets. See public/README.md. */}
      <div className="relative aspect-[4/3] bg-ink-800 text-white overflow-hidden">
        <div className="absolute inset-0 flex items-end p-4">
          <span className="rounded-pill bg-white/10 backdrop-blur-sm px-3 py-1 text-[11px] font-semibold tracking-[0.18em] uppercase">
            {service.name}
          </span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-muted-dark text-xs uppercase tracking-[0.18em]">
          {service.imagePath}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-2xl uppercase">{service.name}</h3>
        <p className="mt-3 text-sm text-muted">{service.summary}</p>

        <ul role="list" className="mt-6 flex flex-col gap-2 text-sm">
          {service.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 flex-none text-accent" aria-hidden="true" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <a
          href={`#${service.slug}`}
          className="mt-8 inline-flex items-center gap-1 text-accent font-semibold text-sm uppercase tracking-wide group-hover:gap-2 transition-all"
        >
          Learn more
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </article>
  );
}
