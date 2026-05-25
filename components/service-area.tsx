import { MapPin } from 'lucide-react';
import { site } from '@/config/site';

export function ServiceArea() {
  return (
    <section id="service-area" className="bg-ink-800 text-white section">
      <div className="container-x grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5">
          <p className="eyebrow">Service area</p>
          <h2 className="font-display text-display-section uppercase mt-4">
            Serving Southern Alberta
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
              aria-label="Service area map showing Lethbridge and surrounding communities"
            >
              {/* Abstract regional shape */}
              <path
                d="M 60 80 Q 100 50 200 60 L 540 90 Q 580 200 540 320 L 200 350 Q 80 360 60 280 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeOpacity="0.18"
              />

              {/* ~50km service radius */}
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

              {/* Cities */}
              <g fontFamily="Inter Tight, sans-serif" fontSize="12" textAnchor="middle">
                {/* Lethbridge anchor */}
                <circle cx="300" cy="220" r="8" fill="#C2410C" />
                <circle cx="300" cy="220" r="14" fill="none" stroke="#C2410C" strokeOpacity="0.4" />
                <text x="300" y="250" fontWeight="700" fill="#FFFFFF" letterSpacing="2">
                  LETHBRIDGE
                </text>

                {/* Coaldale (ENE) */}
                <circle cx="370" cy="206" r="3" fill="#FFFFFF" />
                <text x="370" y="198" fill="#9CA3AF">Coaldale</text>

                {/* Taber (E) */}
                <circle cx="495" cy="194" r="3" fill="#FFFFFF" />
                <text x="495" y="186" fill="#9CA3AF">Taber</text>

                {/* Fort Macleod (W) */}
                <circle cx="170" cy="208" r="3" fill="#FFFFFF" />
                <text x="170" y="200" fill="#9CA3AF">Fort Macleod</text>

                {/* Picture Butte (N) */}
                <circle cx="288" cy="135" r="3" fill="#FFFFFF" />
                <text x="288" y="127" fill="#9CA3AF">Picture Butte</text>

                {/* Raymond (S) */}
                <circle cx="320" cy="310" r="3" fill="#FFFFFF" />
                <text x="320" y="330" fill="#9CA3AF">Raymond</text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
