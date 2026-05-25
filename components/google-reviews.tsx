import { Star } from 'lucide-react';
import { getReviews, type NormalizedReview } from '@/lib/google-reviews';

export async function GoogleReviews() {
  const payload = await getReviews();
  // Show 3 in the main grid; the rest are kept in payload.reviews
  // for future "show more" or carousel iterations.
  const visible = payload.reviews.slice(0, 3);

  return (
    <section id="reviews" className="bg-white section">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow">What our customers say</p>
          <h2 className="font-display text-display-section uppercase mt-4">
            {payload.count} five-star reviews
          </h2>
        </div>

        <div className="mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-cream-200 pb-8">
          <div className="flex items-baseline gap-4">
            <span className="font-display text-display-stat text-accent leading-none">
              {payload.rating}
            </span>
            <span className="flex items-center gap-1 text-accent" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5" fill="currentColor" strokeWidth={0} />
              ))}
            </span>
          </div>
          <p className="text-muted text-sm">
            Based on {payload.count} Google reviews
            {payload.source === 'manual' && (
              <span className="ml-2 inline-flex items-center rounded-pill border border-cream-200 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-muted">
                curated
              </span>
            )}
          </p>
        </div>

        {visible.length === 0 ? (
          <p className="mt-12 text-muted">Reviews unavailable right now. Please call us at any time.</p>
        ) : (
          <ul role="list" className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {visible.map((r, idx) => (
              <li key={`${r.name}-${idx}`}>
                <ReviewCard review={r} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function ReviewCard({ review }: { review: NormalizedReview }) {
  return (
    <article className="flex h-full flex-col gap-4 p-8 rounded-card-lg bg-cream border border-cream-200">
      <header className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-pill bg-ink text-white font-display text-base"
        >
          {review.initial}
        </span>
        <div>
          <p className="font-semibold leading-tight">{review.name}</p>
          <time dateTime={review.isoDate} className="text-xs text-muted">
            {review.relativeDate}
          </time>
        </div>
        <span
          className="ml-auto flex items-center gap-0.5 text-accent"
          aria-label={`${review.rating} out of 5 stars`}
        >
          {Array.from({ length: review.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4" fill="currentColor" strokeWidth={0} />
          ))}
        </span>
      </header>

      <p className="text-sm leading-relaxed text-ink/90">&ldquo;{review.text}&rdquo;</p>
    </article>
  );
}
