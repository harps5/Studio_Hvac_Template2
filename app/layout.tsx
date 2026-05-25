import type { Metadata, Viewport } from 'next';
import { Anton, Inter_Tight } from 'next/font/google';
import { site } from '@/config/site';
import './globals.css';

const display = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

const body = Inter_Tight({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://couleehvac.ca';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.business.name} — Heating, Cooling & IAQ in ${site.business.address.city}`,
    template: `%s — ${site.business.name}`,
  },
  description:
    `Furnace, air conditioning, heat pump, and indoor air quality service across ` +
    `${site.business.address.city} and Southern Alberta. ${site.business.hours.emergency}. ` +
    `Book online or call ${site.business.phone}.`,
  applicationName: site.business.name,
  authors: [{ name: site.business.legalName }],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: siteUrl,
    siteName: site.business.name,
    title: `${site.business.name} — Heating, Cooling & IAQ`,
    description: `Trusted HVAC service across ${site.business.address.city} and Southern Alberta.`,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.business.name,
    description: site.business.tagline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0F1E33',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HVACBusiness',
    name: site.business.legalName,
    image: `${siteUrl}/og.jpg`,
    telephone: site.business.phone,
    email: site.business.email,
    url: siteUrl,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.business.address.street,
      addressLocality: site.business.address.city,
      addressRegion: site.business.address.region,
      postalCode: site.business.address.postal,
      addressCountry: site.business.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.business.address.lat,
      longitude: site.business.address.lng,
    },
    areaServed: site.serviceArea.map((c) => c.name),
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '16:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: site.aggregateRating.value,
      reviewCount: site.aggregateRating.countNumeric,
    },
  };

  return (
    <html lang="en-CA" className={`${display.variable} ${body.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
