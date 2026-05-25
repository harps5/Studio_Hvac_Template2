import 'server-only';
import { site, type ManualReview } from '@/config/site';

/**
 * Birchmont Studio reusable Google Reviews module.
 *
 * MODE A (live):  set GOOGLE_PLACES_API_KEY env var AND site.googlePlaceId.
 *                 Fetches from the Google Places API (New) at build time,
 *                 cached via Next.js fetch revalidation (24h).
 *
 * MODE B (manual): default. Pulls from site.manualReviews. Use this when
 *                  the client hasn't surfaced a Google Business Profile yet,
 *                  or for prototyping a clone.
 *
 * Both modes return the same `NormalizedReview` shape so the UI doesn't
 * branch. See /config/README.md for setup.
 */

export interface NormalizedReview {
  /** Reviewer first name + last initial. */
  name: string;
  /** Single character used for the avatar fallback. */
  initial: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Review body, trimmed and truncated to ~280 chars for card display. */
  text: string;
  /** Human-readable relative date (e.g. "2 months ago"). */
  relativeDate: string;
  /** ISO date for <time> elements. */
  isoDate: string;
}

export interface ReviewsPayload {
  source: 'google' | 'manual';
  rating: string;            // "4.9"
  count: string;             // "500+"
  countNumeric: number;
  reviews: NormalizedReview[];
}

// ─── Public entry point ───────────────────────────────────────────────────

export async function getReviews(): Promise<ReviewsPayload> {
  const apiKey = process.env[site.googleReviewsApiKeyEnv];
  const placeId = site.googlePlaceId;

  if (apiKey && placeId) {
    try {
      return await fetchFromGoogle(placeId, apiKey);
    } catch (err) {
      // Fail open to manual reviews — production should never show an
      // empty Reviews section because of a transient Places API error.
      console.error('[google-reviews] live fetch failed, falling back to manual:', err);
    }
  }

  return buildManualPayload();
}

// ─── Mode A: Google Places API (New) ──────────────────────────────────────

interface PlacesApiResponse {
  rating?: number;
  userRatingCount?: number;
  reviews?: Array<{
    authorAttribution?: { displayName?: string };
    rating?: number;
    text?: { text?: string };
    relativePublishTimeDescription?: string;
    publishTime?: string;
  }>;
}

async function fetchFromGoogle(placeId: string, apiKey: string): Promise<ReviewsPayload> {
  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
    },
    // Revalidate every 24h. Build-time fetch is cached; ISR refreshes daily.
    next: { revalidate: 86_400 },
  });

  if (!res.ok) {
    throw new Error(`Places API ${res.status}: ${await res.text()}`);
  }

  const data = (await res.json()) as PlacesApiResponse;

  const reviews: NormalizedReview[] = (data.reviews ?? [])
    .slice(0, 6)
    .map((r) => {
      const name = r.authorAttribution?.displayName ?? 'Google reviewer';
      const rating = clampRating(r.rating ?? 5);
      const text = trimReview(r.text?.text ?? '');
      const isoDate = r.publishTime ?? new Date().toISOString();
      const relativeDate = r.relativePublishTimeDescription ?? formatRelative(isoDate);
      return {
        name,
        initial: name.charAt(0).toUpperCase(),
        rating,
        text,
        relativeDate,
        isoDate,
      };
    })
    .filter((r) => r.text.length > 0);

  const rating = data.rating ? data.rating.toFixed(1) : site.aggregateRating.value;
  const countNumeric = data.userRatingCount ?? site.aggregateRating.countNumeric;
  const count = formatCount(countNumeric);

  return {
    source: 'google',
    rating,
    count,
    countNumeric,
    reviews,
  };
}

// ─── Mode B: Manual reviews from /config/site.ts ──────────────────────────

function buildManualPayload(): ReviewsPayload {
  const reviews: NormalizedReview[] = site.manualReviews.map(normalizeManual);
  return {
    source: 'manual',
    rating: site.aggregateRating.value,
    count: site.aggregateRating.count,
    countNumeric: site.aggregateRating.countNumeric,
    reviews,
  };
}

function normalizeManual(r: ManualReview): NormalizedReview {
  return {
    name: r.name,
    initial: r.initial ?? r.name.charAt(0).toUpperCase(),
    rating: r.rating,
    text: trimReview(r.text),
    relativeDate: formatRelative(r.date),
    isoDate: r.date,
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────

function clampRating(n: number): 1 | 2 | 3 | 4 | 5 {
  const r = Math.max(1, Math.min(5, Math.round(n)));
  return r as 1 | 2 | 3 | 4 | 5;
}

function trimReview(text: string, max = 280): string {
  const t = text.trim().replace(/\s+/g, ' ');
  if (t.length <= max) return t;
  return t.slice(0, max - 1).trimEnd() + '…';
}

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const days = Math.floor((Date.now() - then) / 86_400_000);
  if (days < 7) return `${Math.max(days, 1)} day${days === 1 ? '' : 's'} ago`;
  if (days < 30) return `${Math.floor(days / 7)} week${Math.floor(days / 7) === 1 ? '' : 's'} ago`;
  if (days < 365) return `${Math.floor(days / 30)} month${Math.floor(days / 30) === 1 ? '' : 's'} ago`;
  return `${Math.floor(days / 365)} year${Math.floor(days / 365) === 1 ? '' : 's'} ago`;
}

function formatCount(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k+`;
  if (n >= 100) return `${Math.floor(n / 100) * 100}+`;
  return `${n}`;
}
