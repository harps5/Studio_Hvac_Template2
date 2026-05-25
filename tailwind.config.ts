import type { Config } from 'tailwindcss';

/**
 * Birchmont Studio house style — HVAC vertical.
 * Tokens are locked. Do not extend with new color stops or fonts
 * without updating DECISIONS.md.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './config/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    // Reset spacing scale to the locked 4/8/16/24/32/48/64/96/128/192 px scale.
    // Tailwind defaults are intentionally discarded so an engineer can't reach
    // for `py-12` (48) vs `py-14` (56) and quietly break rhythm.
    spacing: {
      0: '0px',
      px: '1px',
      1: '4px',
      2: '8px',
      4: '16px',
      6: '24px',
      8: '32px',
      12: '48px',
      16: '64px',
      24: '96px',
      32: '128px',
      48: '192px',
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0F1E33', // deep navy — structural, not blue-as-accent
          900: '#0A1525',     // footer / deepest band
          800: '#0F1E33',     // hero, process, dark sections
          700: '#1E2F47',     // dark border / divider
        },
        cream: {
          DEFAULT: '#F5F1EB', // body sections, cards
          200: '#E5E0D8',     // border / divider on light
        },
        accent: {
          DEFAULT: '#C2410C', // burnt orange — ONLY accent color
          dark: '#9A340A',    // hover (~10% darker)
        },
        muted: {
          DEFAULT: '#6B7280', // muted text on light
          dark: '#9CA3AF',    // muted text on dark
        },
      },
      fontFamily: {
        // Loaded via next/font/google in app/layout.tsx as CSS variables.
        display: ['var(--font-display)', 'Anton', 'Impact', 'sans-serif'],
        sans: ['var(--font-body)', 'Inter Tight', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Hero headline ramp — locked. Use these classes, not arbitrary text-[].
        'display-hero': ['clamp(40px, 8vw, 96px)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-section': ['clamp(32px, 5vw, 56px)', { lineHeight: '1.0', letterSpacing: '-0.01em' }],
        'display-sub': ['clamp(24px, 3vw, 40px)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
        'display-stat': ['clamp(40px, 6vw, 72px)', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        // Pill only — buttons, chips, tags. Cards use rounded-2xl/3xl explicitly
        // since pill on a rectangular card becomes a stadium shape.
        pill: '999px',
        card: '16px',
        'card-lg': '24px',
      },
      maxWidth: {
        container: '1280px',
        prose: '720px',
      },
    },
  },
  plugins: [],
};

export default config;
