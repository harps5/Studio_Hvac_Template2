import { Thermometer } from 'lucide-react';
import { site } from '@/config/site';
import { getLocalWeather } from '@/lib/weather';

/**
 * Live local-weather strip. Sits flush under the hero, same dark band
 * family but one tone lighter to read as a "stripe" not a section.
 * If the weather API fails, we degrade to a static locality line — never
 * an empty ribbon.
 */
export async function WeatherStrip() {
  const weather = await getLocalWeather();
  const city = site.business.address.city;

  // Context-aware second-half copy. Cold → push the furnace service anchor.
  // Warm → push the AC anchor. Neutral → push the maintenance service.
  const { contextLabel, anchor } = (() => {
    if (!weather) {
      return { contextLabel: 'Furnace or A/C trouble?', anchor: '#services' };
    }
    if (weather.tempC <= 0) {
      return { contextLabel: 'Furnace running clean?', anchor: '#services' };
    }
    if (weather.tempC >= 22) {
      return { contextLabel: 'A/C keeping up?', anchor: '#services' };
    }
    return { contextLabel: 'Shoulder season — book your tune-up.', anchor: '#services' };
  })();

  return (
    <div className="w-full bg-ink-700 text-white">
      <div className="container-x flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 py-4 text-sm">
        <p className="inline-flex items-center gap-2">
          <Thermometer className="h-4 w-4 text-accent" aria-hidden="true" />
          <span>
            {weather ? (
              <>
                <span className="font-semibold">{city} now: {weather.tempC}°C</span>
                <span className="text-muted-dark"> — {weather.conditions}.</span>
              </>
            ) : (
              <span className="font-semibold">{city} &amp; Southern Alberta.</span>
            )}
          </span>
        </p>

        <p>
          <span className="text-muted-dark">{contextLabel} </span>
          <a
            href={anchor}
            className="font-semibold underline underline-offset-4 decoration-accent decoration-2 hover:text-accent"
          >
            Book a maintenance visit →
          </a>
        </p>
      </div>
    </div>
  );
}
