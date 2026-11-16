import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#070707',
        fg: '#F2F2ED',
        dim: '#B9BDB3',
        accent: '#D7FF00',
        subtle: '#3A3A35',
        surface: '#0A0A0A',
      },
      fontFamily: {
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        blink: { '50%': { opacity: '0' } },
        bob: {
          '0%, 100%': { transform: 'translateX(-50%) translateY(0)' },
          '50%': { transform: 'translateX(-50%) translateY(8px)' },
        },
      },
      animation: {
        blink: 'blink 1s steps(1) infinite',
        bob: 'bob 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
