import { Stethoscope, Wallet } from 'lucide-react';
import { site } from '@/config/site';

export function Pricing() {
  return (
    <section className="bg-cream section">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow">Pricing</p>
          <h2 className="font-display text-display-section uppercase mt-4">
            Honest pricing. No surprises.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <PricingCard
            icon={Stethoscope}
            label="Diagnostic fee"
            headline={site.pricing.diagnosticFee.amount}
            note={site.pricing.diagnosticFee.condition}
            body="Flat fee for an on-site diagnosis. You see the full quote in writing before any work begins, and the diagnostic charge comes right off the invoice when you proceed with the repair."
          />
          <PricingCard
            icon={Wallet}
            label="Financing"
            headline={site.pricing.financing.rate}
            note={`${site.pricing.financing.term} OAC via ${site.pricing.financing.provider}`}
            body="Spread the cost of a furnace, A/C, or heat pump install. Application takes about 5 minutes, no impact on credit to check rates. Longer terms with extended rates also available."
          />
        </div>
      </div>
    </section>
  );
}

function PricingCard({
  icon: Icon,
  label,
  headline,
  note,
  body,
}: {
  icon: typeof Stethoscope;
  label: string;
  headline: string;
  note: string;
  body: string;
}) {
  return (
    <article className="flex flex-col gap-4 p-8 md:p-12 rounded-card-lg bg-white border border-cream-200">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-pill bg-accent text-white">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <span className="eyebrow text-ink">{label}</span>
      </div>
      <p className="font-display text-display-sub text-accent leading-none">{headline}</p>
      <p className="font-semibold text-ink">{note}</p>
      <p className="text-muted leading-relaxed">{body}</p>
    </article>
  );
}
