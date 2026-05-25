import { Plus } from 'lucide-react';
import { site } from '@/config/site';

export function Faq() {
  return (
    <section id="faq" className="bg-white section">
      <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <p className="eyebrow">FAQ</p>
          <h2 className="font-display text-display-section uppercase mt-4">
            Common questions
          </h2>
          <p className="mt-6 text-muted">
            Can&rsquo;t find your answer? Call us at{' '}
            <a
              href={`tel:${site.business.phoneE164}`}
              className="text-ink font-semibold underline underline-offset-4 decoration-accent decoration-2 hover:text-accent"
            >
              {site.business.phone}
            </a>{' '}
            — a real person answers, 24/7 for emergencies.
          </p>
        </div>

        <ul role="list" className="lg:col-span-8 flex flex-col">
          {site.faq.map((item, idx) => (
            <li key={item.question}>
              <details
                className={`group border-cream-200 ${idx === 0 ? 'border-t' : ''} border-b`}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-left">
                  <span className="font-display text-xl md:text-2xl uppercase">
                    {item.question}
                  </span>
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 flex-none items-center justify-center rounded-pill border-[1.5px] border-ink transition-transform group-open:rotate-45"
                  >
                    <Plus className="h-5 w-5" />
                  </span>
                </summary>
                <p className="pb-6 pr-12 text-muted leading-relaxed">
                  {item.answer}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
