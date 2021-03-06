/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      'liver': '#524948',
      'antique': '#f9eedc',
      'cadet': '#7cb4b8',
      'mellow': '#f6bc79',
      'lime': '#cafe48',
      'code': '#282a36',
      'pale': '#faf5ee',
      'red': '#ff0000',
      'black': '#000000',
    },
    screens: {
      sm: '320px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
