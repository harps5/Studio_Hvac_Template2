import 'server-only';
import { site } from '@/config/site';

/**
 * Lightweight weather lookup for the local-strip section.
 *
 * Uses Open-Meteo's free, key-less forecast API. Returns null on any
 * failure — the calling component degrades to a static line rather than
 * showing a broken state. Cached for 10 minutes via Next.js fetch.
 */

export interface LocalWeather {
  tempC: number;
  conditions: string;
  isFreezing: boolean;
}

export async function getLocalWeather(): Promise<LocalWeather | null> {
  const { lat, lng } = site.business.address;
  const { timezone } = site.business;

  const url =
    `https://api.open-meteo.com/v1/forecast` +
    `?latitude=${lat}` +
    `&longitude=${lng}` +
    `&current=temperature_2m,weather_code` +
    `&timezone=${encodeURIComponent(timezone)}`;

  try {
    const res = await fetch(url, { next: { revalidate: 600 } });
    if (!res.ok) return null;

    const data = (await res.json()) as {
      current?: { temperature_2m?: number; weather_code?: number };
    };

    const tempC = data.current?.temperature_2m;
    const code = data.current?.weather_code;
    if (typeof tempC !== 'number' || typeof code !== 'number') return null;

    return {
      tempC: Math.round(tempC),
      conditions: describeCode(code),
      isFreezing: tempC <= 0,
    };
  } catch (err) {
    console.error('[weather] open-meteo fetch failed:', err);
    return null;
  }
}

// WMO weather interpretation codes, mapped to short human strings.
// https://open-meteo.com/en/docs (Weather variable documentation)
function describeCode(code: number): string {
  if (code === 0) return 'Clear';
  if (code === 1 || code === 2) return 'Mostly clear';
  if (code === 3) return 'Overcast';
  if (code === 45 || code === 48) return 'Fog';
  if (code >= 51 && code <= 57) return 'Drizzle';
  if (code >= 61 && code <= 67) return 'Rain';
  if (code >= 71 && code <= 77) return 'Snow';
  if (code >= 80 && code <= 82) return 'Rain showers';
  if (code >= 85 && code <= 86) return 'Snow showers';
  if (code >= 95) return 'Thunderstorms';
  return 'Mixed conditions';
}
