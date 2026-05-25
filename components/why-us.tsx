import { ShieldCheck, BadgeCheck, Clock, FileCheck, type LucideIcon } from 'lucide-react';
import { site, type WhyUsFeature } from '@/config/site';

const ICONS: Record<WhyUsFeature['icon'], LucideIcon> = {
  shield: ShieldCheck,
  badge: BadgeCheck,
  clock: Clock,
  'file-check': FileCheck,
};

export function WhyUs() {
  return (
    <section id="why-us" className="bg-white section">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow">Why us</p>
          <h2 className="font-display text-display-section uppercase mt-4">
            Why {site.business.address.city} homeowners choose {site.business.name.split(' ')[0]}
          </h2>
        </div>

        {/* Stats */}
        <dl className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 border-t border-cream-200 pt-12">
          {site.whyUsStats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <dt className="order-2 mt-2 text-sm font-medium tracking-wide text-muted uppercase">
                {stat.label}
              </dt>
              <dd className="order-1 font-display text-display-stat text-accent">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          {site.whyUsFeatures.map((f) => {
            const Icon = ICONS[f.icon];
            return (
              <div
                key={f.title}
                className="flex gap-6 p-8 rounded-card-lg bg-cream border border-cream-200"
              >
                <div className="flex-none">
                  <div className="flex h-12 w-12 items-center justify-center rounded-pill bg-accent text-white">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-2xl uppercase">{f.title}</h3>
                  <p className="mt-3 text-muted">{f.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
