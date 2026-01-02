import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
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
