/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy:   '#1C3687',
        navy2:  '#0f1e4e',
        navy3:  '#2a4cc0',
        navy4:  '#e8ecf8',
        red:    '#ED1B2F',
        red2:   '#b8101f',
        gold:   '#C8952A',
        green:  '#00a878',
        purple: '#7c3aed',
        teal:   '#0891b2',
      },
      fontFamily: {
        sans:    ['DM Sans', 'sans-serif'],
        serif:   ['Cormorant Garamond', 'serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
