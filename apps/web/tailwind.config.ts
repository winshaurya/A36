import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/shared/src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        origin: {
          base: '#0B0D0E',        // Deepest dark charcoal base
          surface: '#131618',     // Secondary surface / cards
          elevated: '#1A1E21',    // Elevated modals / popovers
          overlay: '#22272B',     // Active / hover layers
          border: '#282E33',      // Subtle separation border
          borderSubtle: '#1C2124',
          muted: '#8B949E',       // Secondary muted text
          text: '#F0F3F6',        // High contrast primary text
          accent: '#E84142',      // Avalanche crimson signature accent
          accentHover: '#FF5A5B',
          accentMuted: 'rgba(232, 65, 66, 0.15)',
          emerald: '#10B981',     // Origin / Verified First
          amber: '#F59E0B',       // Earlier Found / Remix
          cyan: '#06B6D4',        // Protocol Indexing
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      borderRadius: {
        DEFAULT: '8px',
        sm: '6px',
        md: '10px',
        lg: '14px',
        xl: '20px',
        full: '9999px',
      },
      boxShadow: {
        originCard: '0 4px 20px -2px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
        originReceipt: '0 20px 40px -15px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(232, 65, 66, 0.2)',
        glow: '0 0 25px -5px rgba(232, 65, 66, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
