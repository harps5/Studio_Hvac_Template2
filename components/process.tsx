import { site } from '@/config/site';

export function Process() {
  return (
    <section className="bg-ink-700 text-white section">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow">How we work</p>
          <h2 className="font-display text-display-section uppercase mt-4">
            The {site.business.name.split(' ')[0]} process
          </h2>
          <p className="mt-6 text-lg text-muted-dark max-w-prose">
            No mystery, no upsell. Four steps from first call to final invoice.
          </p>
        </div>

        <ol
          role="list"
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {site.processSteps.map((step, idx) => (
            <li
              key={step.number}
              className="relative flex flex-col gap-4 p-8 rounded-card-lg bg-ink-800 border border-ink-700"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-12 w-12 items-center justify-center rounded-pill bg-accent text-white font-display text-xl tracking-wide"
              >
                {step.number}
              </span>
              <h3 className="font-display text-2xl uppercase">{step.title}</h3>
              <p className="text-muted-dark text-sm leading-relaxed">{step.description}</p>

              {/* Trailing arrow between cards on desktop — visual only */}
              {idx < site.processSteps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="hidden lg:block absolute top-12 -right-6 text-accent font-display"
                >
                  →
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
