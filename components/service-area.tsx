import { MapPin } from 'lucide-react';
import { site } from '@/config/site';

export function ServiceArea() {
  return (
    <section id="service-area" className="bg-ink-800 text-white section">
      <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <p className="eyebrow">Service area</p>
          <h2 className="font-display text-display-section uppercase mt-4">
            Serving {site.business.serviceRegion}
          </h2>
          <p className="mt-6 text-lg text-muted-dark max-w-prose">
            Same-day service within {site.business.address.city} city limits.
            Most surrounding communities reachable next day or sooner, depending
            on load. Outside the radius? Call us — we will tell you honestly.
          </p>

          <ul role="list" className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {site.serviceArea.map((c) => (
              <li
                key={c.name}
                className="flex items-baseline justify-between border-b border-ink-700 pb-3"
              >
                <span className="flex items-center gap-2 font-display text-xl uppercase tracking-wide">
                  <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                  {c.name}
                </span>
                <span className="text-xs font-semibold tracking-[0.18em] uppercase text-muted-dark">
                  {c.responseTime}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Stylised regional map — abstract, not cartographic.
            Positions are visually approximated; this is not a navigation tool. */}
        <div className="lg:col-span-7">
          <div className="aspect-[3/2] rounded-card-lg border border-ink-700 p-6 bg-ink-900">
            <svg
              viewBox="0 0 600 400"
              className="w-full h-full text-white"
              role="img"
              aria-label={`Service area map showing ${site.business.address.city} and surrounding communities`}
            >
              {/* Abstract regional shape */}
              <path
                d="M 60 80 Q 100 50 200 60 L 540 90 Q 580 200 540 320 L 200 350 Q 80 360 60 280 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeOpacity="0.18"
              />

              {/* ~40km service radius from downtown */}
              <circle
                cx="300"
                cy="220"
                r="135"
                fill="none"
                stroke="#C2410C"
                strokeWidth="1"
                strokeOpacity="0.45"
                strokeDasharray="5 6"
              />

              {/* Cities — positions hand-placed to roughly mirror GTA geography
                  (Toronto center, Etobicoke W, North York N, Scarborough E,
                  Mississauga SW, Vaughan NNW). Not cartographic. */}
              <g fontFamily="Inter Tight, sans-serif" fontSize="12" textAnchor="middle">
                {/* Toronto anchor */}
                <circle cx="300" cy="220" r="8" fill="#C2410C" />
                <circle cx="300" cy="220" r="14" fill="none" stroke="#C2410C" strokeOpacity="0.4" />
                <text x="300" y="250" fontWeight="700" fill="#FFFFFF" letterSpacing="2">
                  TORONTO
                </text>

                {/* Etobicoke (W) */}
                <circle cx="220" cy="230" r="3" fill="#FFFFFF" />
                <text x="220" y="222" fill="#9CA3AF">Etobicoke</text>

                {/* Scarborough (E) */}
                <circle cx="395" cy="205" r="3" fill="#FFFFFF" />
                <text x="395" y="197" fill="#9CA3AF">Scarborough</text>

                {/* North York (N) */}
                <circle cx="305" cy="155" r="3" fill="#FFFFFF" />
                <text x="305" y="147" fill="#9CA3AF">North York</text>

                {/* Mississauga (SW) */}
                <circle cx="135" cy="275" r="3" fill="#FFFFFF" />
                <text x="135" y="295" fill="#9CA3AF">Mississauga</text>

                {/* Vaughan (NNW) */}
                <circle cx="275" cy="95" r="3" fill="#FFFFFF" />
                <text x="275" y="87" fill="#9CA3AF">Vaughan</text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
