import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // New teal color palette from Vietnam map
        teal: {
          50: '#F0F9F9',
          100: '#E0F3F3',
          200: '#C4E8E8',
          300: '#A8D8D8', // Light (south)
          400: '#70C0C2',
          500: '#3D9DA1', // Medium (center)
          600: '#2E7A7D',
          700: '#115E67', // Dark (north)
          800: '#0D4A52',
          900: '#0A3A40',
          950: '#052228',
        },
        // Keep legacy colors for compatibility
        green: {
          light: '#86EFAC',
          DEFAULT: '#22C55E',
          dark: '#166534',
        },
        pink: {
          light: '#FECDD3',
          DEFAULT: '#FB7185',
          dark: '#E11D48',
        },
        orange: {
          light: '#FED7AA',
          DEFAULT: '#F97316',
          dark: '#EA580C',
        },
      },
    },
  },
  plugins: [],
}
export default config
