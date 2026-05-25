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
    // CONVENTION (not a hard lock):
    // Layout rhythm — section padding, gaps between sections, gaps between
    // cards — should snap to the Birchmont locked scale:
    //   4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 192
    // In Tailwind tokens that's p/m/gap-{1, 2, 4, 6, 8, 12, 16, 24, 32, 48}.
    // Tailwind's default scale is retained so icon sizes, small chrome paddings,
    // and ad-hoc utility gaps still resolve. The locked scale is a discipline,
    // enforced in review — not by erasing valid tokens at the config layer
    // (which we tried, then reverted: it broke icon dimensions). See DECISIONS §4.
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
        // Hero headline ramp.
        // Tuned per feedback: at a 7/5 grid split, 96px was crowding the third
        // line and 64px read too small. 76px max lands in between, kept in the
        // brief's 64-96 desktop range. Line-height 1.15 and letter-spacing
        // -0.005em give the three-line stack visible breathing room between
        // lines and between letters, without losing the bold-condensed register.
        'display-hero': ['clamp(44px, 6vw, 76px)', { lineHeight: '1.15', letterSpacing: '-0.005em' }],
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
