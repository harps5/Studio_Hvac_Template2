/**
 * Birchmont Studio — HVAC vertical template
 *
 * THIS IS THE ONLY FILE A STUDIO MEMBER NEEDS TO EDIT TO SPIN UP
 * A NEW HVAC CLIENT.
 *
 * Process:
 *   1. Replace every value in `site` below with the client's content.
 *   2. Drop client image assets into /public matching the referenced paths.
 *   3. Optionally set GOOGLE_PLACES_API_KEY + googlePlaceId to enable
 *      live review fetching. Otherwise manualReviews is used.
 *   4. Update tailwind.config.ts ONLY if the client's brand requires a
 *      different accent. The base palette is locked.
 *
 * See /config/README.md for the full clone playbook.
 */

// ─── Types ────────────────────────────────────────────────────────────────

export interface Hours {
  weekdays: string;
  saturday: string;
  sunday: string;
  emergency: string;
}

export interface BusinessInfo {
  name: string;
  legalName: string;
  tagline: string;
  phone: string;
  phoneE164: string;
  email: string;
  address: {
    street: string;
    city: string;
    region: string;       // short code: 'AB', 'ON'
    postal: string;
    country: string;
    lat: number;
    lng: number;
  };
  /** IANA timezone, e.g. 'America/Toronto'. Used by the weather lib. */
  timezone: string;
  /** Human-readable region phrase used in body copy.
   *  e.g. 'Southern Alberta', 'the GTA', 'Vancouver Island'. */
  serviceRegion: string;
  /** Province/state long name used in legal copy.
   *  e.g. 'Alberta', 'Ontario', 'British Columbia'. */
  regionName: string;
  hours: Hours;
  social: {
    google?: string;
    facebook?: string;
    instagram?: string;
  };
}

export interface ServiceAreaCity {
  name: string;
  responseTime: string;
}

export interface Service {
  slug: string;
  name: string;
  summary: string;
  bullets: string[];
  imagePath: string;
}

export interface TrustLogo {
  name: string;
  src: string;
  alt: string;
}

export interface WhyUsStat {
  value: string;
  label: string;
}

export interface WhyUsFeature {
  icon: 'shield' | 'badge' | 'clock' | 'file-check';
  title: string;
  description: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Pricing {
  diagnosticFee: { amount: string; condition: string };
  financing: { rate: string; term: string; provider: string };
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ManualReview {
  name: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  date: string;        // ISO yyyy-mm-dd
  initial?: string;    // optional, derived if absent
}

export interface SiteConfig {
  business: BusinessInfo;
  serviceArea: ServiceAreaCity[];
  services: Service[];
  trustLogos: TrustLogo[];
  whyUsStats: WhyUsStat[];
  whyUsFeatures: WhyUsFeature[];
  processSteps: ProcessStep[];
  pricing: Pricing;
  faq: FaqItem[];

  // Google Reviews — Mode A (live) requires both fields set.
  // Mode B (manual) is used whenever either is empty.
  googlePlaceId: string;
  googleReviewsApiKeyEnv: 'GOOGLE_PLACES_API_KEY';
  manualReviews: ManualReview[];

  // Aggregate rating shown in the Reviews header. Used as fallback when
  // live API doesn't return numbers, AND for JSON-LD structured data.
  aggregateRating: {
    value: string;        // e.g. "4.9"
    count: string;        // e.g. "500+"
    countNumeric: number; // used in JSON-LD
  };
}

// ─── Coulee HVAC — placeholder content ────────────────────────────────────

export const site: SiteConfig = {
  business: {
    name: 'Coulee HVAC',
    legalName: 'Coulee HVAC Ltd.',
    tagline: "Toronto's trusted HVAC specialists",
    phone: '(416) 555-0100',
    phoneE164: '+14165550100',
    email: 'service@couleehvac.ca',
    address: {
      street: '488 King Street West',
      city: 'Toronto',
      region: 'ON',
      postal: 'M5V 1L9',
      country: 'CA',
      lat: 43.6453,
      lng: -79.4012,
    },
    timezone: 'America/Toronto',
    serviceRegion: 'the GTA',
    regionName: 'Ontario',
    hours: {
      weekdays: 'Mon–Fri 7:00 AM – 7:00 PM',
      saturday: 'Sat 8:00 AM – 4:00 PM',
      sunday: 'Sun Closed (Emergency only)',
      emergency: '24/7 emergency dispatch',
    },
    social: {
      google: 'https://maps.google.com/?cid=PLACEHOLDER',
      facebook: 'https://facebook.com/couleehvac',
      instagram: 'https://instagram.com/couleehvac',
    },
  },

  serviceArea: [
    { name: 'Toronto', responseTime: 'Same day' },
    { name: 'Etobicoke', responseTime: 'Same day' },
    { name: 'North York', responseTime: 'Same day' },
    { name: 'Scarborough', responseTime: 'Same day' },
    { name: 'Mississauga', responseTime: 'Next day available' },
    { name: 'Vaughan', responseTime: 'Next day available' },
  ],

  services: [
    {
      slug: 'furnace',
      name: 'Furnace Installation & Repair',
      summary: 'High-efficiency furnaces installed and serviced across the GTA.',
      bullets: [
        'High-efficiency gas furnace install (95%+ AFUE)',
        'Same-day repair on most makes and models',
        'Annual maintenance plans from $189',
      ],
      imagePath: '/services/furnace.jpg',
    },
    {
      slug: 'central-ac',
      name: 'Central Air Conditioning',
      summary: 'Quiet, efficient central A/C sized correctly for Toronto summers.',
      bullets: [
        'Manual J load calculation on every install',
        'Lennox, Carrier, and Goodman dealer',
        'Spring tune-ups starting at $129',
      ],
      imagePath: '/services/ac.jpg',
    },
    {
      slug: 'heat-pump',
      name: 'Heat Pump Installation',
      summary: 'Cold-climate heat pumps rated for Ontario winters — rebates available.',
      bullets: [
        'Cold-climate models rated to −25 °C',
        'Federal Greener Homes rebate paperwork handled',
        'Hybrid (heat pump + gas furnace) systems available',
      ],
      imagePath: '/services/heat-pump.jpg',
    },
    {
      slug: 'tankless',
      name: 'Tankless Water Heaters',
      summary: 'Endless hot water with a 20-year service life. Gas or electric.',
      bullets: [
        'Navien and Rinnai certified installers',
        'Whole-home flow sizing, not just spec-sheet swap',
        'Removal and recycling of old tank included',
      ],
      imagePath: '/services/tankless.jpg',
    },
    {
      slug: 'iaq',
      name: 'Indoor Air Quality',
      summary: 'HRVs, ERVs, MERV-13 filtration, and humidification for tighter homes.',
      bullets: [
        'HRV / ERV install for new and existing homes',
        'MERV-13 media filter cabinets',
        'Whole-home humidifier and dehumidifier service',
      ],
      imagePath: '/services/iaq.jpg',
    },
    {
      slug: 'emergency',
      name: '24/7 Emergency Service',
      summary: "Furnace out at 2 AM in January? We answer. We dispatch. We're there.",
      bullets: [
        'Live dispatch — no answering service runaround',
        'Most calls on-site within 2 hours',
        'No overtime surcharge for maintenance-plan members',
      ],
      imagePath: '/services/emergency.jpg',
    },
  ],

  // SVGs live in /public/trust/<slug>.svg as monochrome placeholders.
  // Swap each one with the real licensed logo when onboarding the client.
  trustLogos: [
    { name: 'Red Seal',          src: '/trust/red-seal.svg',    alt: 'Red Seal certified' },
    { name: 'TECA',              src: '/trust/teca.svg',        alt: 'Thermal Environmental Comfort Association member' },
    { name: 'Lennox Premier',    src: '/trust/lennox.svg',      alt: 'Lennox Premier Dealer' },
    { name: 'BBB A+',            src: '/trust/bbb.svg',         alt: 'Better Business Bureau A+ rating' },
    { name: 'HRAI',              src: '/trust/hrai.svg',        alt: 'Heating Refrigeration and Air Conditioning Institute of Canada' },
    { name: 'WSIB Ontario',      src: '/trust/wsib.svg',        alt: 'WSIB (Workplace Safety and Insurance Board) Ontario compliant' },
  ],

  whyUsStats: [
    { value: '500+', label: 'Local installs' },
    { value: '15+',  label: 'Years serving the GTA' },
    { value: '4.9★', label: 'Google rating (500+ reviews)' },
    { value: '24/7', label: 'Emergency response' },
  ],

  whyUsFeatures: [
    {
      icon: 'shield',
      title: 'Transparent Pricing',
      description: 'Diagnostic fee disclosed upfront. No surprise bills, no commission-paid technicians.',
    },
    {
      icon: 'badge',
      title: 'Certified Technicians',
      description: 'Red Seal certified, TECA members, and manufacturer-trained on every brand we install.',
    },
    {
      icon: 'clock',
      title: 'Same-Day Service',
      description: 'Most repairs handled the same day. Emergency response within 2 hours, day or night.',
    },
    {
      icon: 'file-check',
      title: 'Written Warranties',
      description: 'Every install backed by the manufacturer warranty plus 1 year of Coulee labour.',
    },
  ],

  processSteps: [
    {
      number: '01',
      title: 'Book Online or Call',
      description: 'Pick a window that works. Or call (403) 555-0100 and a real person answers.',
    },
    {
      number: '02',
      title: 'Diagnose & Quote',
      description: 'On-site diagnosis with a flat $129 fee — waived in full when you proceed with the repair.',
    },
    {
      number: '03',
      title: 'Get the Work Done',
      description: 'Same-day on most repairs. Installs scheduled around your week, not ours.',
    },
    {
      number: '04',
      title: 'Backed by Warranty',
      description: 'Manufacturer warranty plus one year of Coulee labour. We answer the phone after the install.',
    },
  ],

  pricing: {
    diagnosticFee: { amount: '$129', condition: 'Waived with any repair' },
    financing:     { rate: '0%', term: '12 months', provider: 'Financeit' },
  },

  faq: [
    {
      question: 'How fast can you respond to an emergency?',
      answer: 'Most emergency calls within Toronto are on-site within 2 hours. Across the broader GTA we target same-day; overnight calls always reach a live dispatcher, not an answering service.',
    },
    {
      question: 'Do you service my area?',
      answer: 'We service Toronto, Etobicoke, North York, Scarborough, Mississauga, and Vaughan — roughly a 40 km radius from downtown. If you are outside that radius, call us anyway. We can usually still help.',
    },
    {
      question: 'What brands do you install?',
      answer: 'We are a Lennox Premier Dealer and also install Carrier, Goodman, and Daikin. For tankless water heaters we install Navien and Rinnai. We service every major brand regardless of who installed it.',
    },
    {
      question: 'Do you offer financing?',
      answer: 'Yes — 0% for 12 months on approved credit through Financeit. Longer terms with extended rates are also available. Application takes about 5 minutes.',
    },
    {
      question: "What's covered under warranty?",
      answer: 'New installs come with the full manufacturer parts warranty (typically 10 years on furnaces, 10 years on A/C compressors) plus one year of Coulee labour. Maintenance-plan members get parts and labour extended a further year.',
    },
    {
      question: 'How much does a new furnace cost?',
      answer: 'A standard high-efficiency replacement in a typical Toronto home runs $5,800–$8,500 installed, depending on AFUE rating and size. We quote flat, in writing, before any work starts.',
    },
  ],

  // ─── Google Reviews ────────────────────────────────────────────────────
  // Leave googlePlaceId empty to force manual mode.
  // To enable live mode: set the env var named below + paste placeId.
  googlePlaceId: '',
  googleReviewsApiKeyEnv: 'GOOGLE_PLACES_API_KEY',

  manualReviews: [
    {
      name: 'Janelle K.',
      rating: 5,
      text: "Furnace quit at -22°C on a Saturday night. Their tech was at my door inside 90 minutes, had the ignitor swapped and us back up before midnight. Honest, polite, and didn't try to sell me anything I didn't need.",
      date: '2026-01-18',
    },
    {
      name: 'Dave M.',
      rating: 5,
      text: 'Got three quotes for a new A/C. Coulee was the only one who actually did a load calc instead of just looking at the old unit. Install was clean, on time, and they hauled the old equipment away same day.',
      date: '2026-04-22',
    },
    {
      name: 'Priya S.',
      rating: 5,
      text: 'We had them install an HRV in our 1960s bungalow. The lead installer walked us through the controls and humidity settings instead of just leaving a manual. House feels completely different.',
      date: '2026-03-09',
    },
    {
      name: 'Mike R.',
      rating: 5,
      text: "Heat pump install on our property up in Vaughan. They handled all the Greener Homes rebate paperwork and we got the cheque within six weeks. Couldn't have made it easier.",
      date: '2026-02-14',
    },
    {
      name: 'Sarah L.',
      rating: 5,
      text: 'On the maintenance plan now after they fixed a noisy blower motor for a fair price. Two tune-ups a year and the priority dispatch is worth it on its own. Highly recommend.',
      date: '2026-05-02',
    },
  ],

  aggregateRating: {
    value: '4.9',
    count: '500+',
    countNumeric: 512,
  },
};
