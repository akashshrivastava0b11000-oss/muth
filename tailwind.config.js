/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sutra: {
          royal: '#2563EB',
          navy: '#0F2B5B',
          cloud: '#F4F7FC',
          ice: '#DBEAFE',
          sky: '#93C5FD',
          teal: '#14B8A6',
          green: '#22C55E',
          amber: '#F59E0B',
          dark: '#172554',
          slate: '#64748B',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'sutra-sm': '0 1px 3px rgba(15, 43, 91, 0.05)',
        'sutra-md': '0 4px 14px rgba(15, 43, 91, 0.08)',
        'sutra-lg': '0 10px 30px rgba(15, 43, 91, 0.12)',
        'sutra-glow': '0 0 25px rgba(37, 99, 235, 0.25)',
      }
    },
  },
  plugins: [],
}
