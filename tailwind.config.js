/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#131318',
        'canvas-dark': '#0a0a0d',
        surface: {
          lowest: '#0e0e13',
          low: '#17171d',
          DEFAULT: '#1b1b22',
          high: '#24242c',
          highest: '#30303b',
        },
        brand: {
          DEFAULT: '#f6a000',
          hover: '#ffb326',
          dim: '#c97f00',
          glow: 'rgba(246, 160, 0, 0.18)',
        },
        muted: {
          DEFAULT: 'rgba(255, 255, 255, 0.6)',
          light: 'rgba(255, 255, 255, 0.85)',
          dark: 'rgba(255, 255, 255, 0.4)',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          strong: 'rgba(255, 255, 255, 0.16)',
          brand: 'rgba(246, 160, 0, 0.35)',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-brand': '0 0 25px rgba(246, 160, 0, 0.22)',
        'glow-brand-sm': '0 0 12px rgba(246, 160, 0, 0.18)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
};
