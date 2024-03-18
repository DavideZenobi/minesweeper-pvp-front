/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fade: {
          'from': { opacity: 0.2 },
          'to': { opacity: 1 },
        }
      },
      animation: {
        fade: 'fade 1s ease-in-out'
      },
      width: {
        '100': '25rem',
        '112': '28rem',
        '120': '30rem',
        '128': '32rem',
        '160': '40rem',
        '200': '50rem'
      },
      maxWidth: {
        '140': '35rem',
        '200': '50rem'
      },
      minWidth: {
        '120': '30rem',
        '200': '50rem'
      },
      listStyleType: {
        'square': 'square'
      }
    },
  },
  plugins: [],
}

